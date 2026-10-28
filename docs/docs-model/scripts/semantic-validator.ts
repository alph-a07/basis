import fs from 'node:fs';
import path from 'node:path';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

export interface ValidationResult {
  ok: boolean;
  errors: string[];
}

export class SemanticValidator {
  private ajv: Ajv;
  private componentsSchema: any;
  private intentSchema: any;
  private patchVocabularySchema: any;
  private sidecarSchema: any;

  constructor(schemasDir: string) {
    this.ajv = new Ajv({ allErrors: true, strict: false });
    addFormats(this.ajv);

    this.componentsSchema = JSON.parse(
      fs.readFileSync(path.join(schemasDir, 'components.schema.json'), 'utf-8')
    );
    this.intentSchema = JSON.parse(
      fs.readFileSync(path.join(schemasDir, 'intent.schema.json'), 'utf-8')
    );
    this.patchVocabularySchema = JSON.parse(
      fs.readFileSync(path.join(schemasDir, 'patch-vocabulary.schema.json'), 'utf-8')
    );
    this.sidecarSchema = JSON.parse(
      fs.readFileSync(path.join(schemasDir, 'sidecar.schema.json'), 'utf-8')
    );

    this.ajv.addSchema(this.componentsSchema, 'components');
    this.ajv.addSchema(this.intentSchema, 'intent');
    this.ajv.addSchema(this.patchVocabularySchema, 'patch-vocabulary');
    this.ajv.addSchema(this.sidecarSchema, 'sidecar');
  }

  validateIntent(doc: any): ValidationResult {
    const errors: string[] = [];
    const valid = this.ajv.validate('intent', doc);
    if (!valid && this.ajv.errors) {
      for (const err of this.ajv.errors) {
        errors.push(`[schema] intent${err.instancePath}: ${err.message}`);
      }
    }

    this.checkMajorVersion(doc.schemaVersion, 'intent', errors);
    return { ok: errors.length === 0, errors };
  }

  validatePatchVocabulary(doc: any): ValidationResult {
    const errors: string[] = [];
    const valid = this.ajv.validate('patch-vocabulary', doc);
    if (!valid && this.ajv.errors) {
      for (const err of this.ajv.errors) {
        errors.push(`[schema] patch-vocabulary${err.instancePath}: ${err.message}`);
      }
    }

    this.checkMajorVersion(doc.schemaVersion, 'patch-vocabulary', errors);
    return { ok: errors.length === 0, errors };
  }

  validateSidecarMdx(content: string, filePath: string): ValidationResult {
    const errors: string[] = [];
    // Extract frontmatter between --- and ---
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!match) {
      errors.push(`[sidecar] ${filePath}: Missing frontmatter fences (---)`);
      return { ok: false, errors };
    }

    const frontmatterRaw = match[1];
    const body = match[2];

    // Simple YAML parser for the sidecar schema structure
    let frontmatter: any;
    try {
      frontmatter = this.parseSimpleYaml(frontmatterRaw);
    } catch (e: any) {
      errors.push(`[sidecar] ${filePath}: Failed to parse YAML frontmatter: ${e.message}`);
      return { ok: false, errors };
    }

    const valid = this.ajv.validate('sidecar', frontmatter);
    if (!valid && this.ajv.errors) {
      for (const err of this.ajv.errors) {
        errors.push(`[sidecar schema] ${filePath}${err.instancePath}: ${err.message}`);
      }
    }

    // Required ## Accessibility section in body
    if (!/^##\s+Accessibility\b/m.test(body)) {
      errors.push(`[sidecar] ${filePath}: Missing required '## Accessibility' heading in markdown body`);
    }

    return { ok: errors.length === 0, errors };
  }

  validateComponents(doc: any, patchVocabDoc?: any): ValidationResult {
    const errors: string[] = [];

    const valid = this.ajv.validate('components', doc);
    if (!valid && this.ajv.errors) {
      for (const err of this.ajv.errors) {
        errors.push(`[schema] components${err.instancePath}: ${err.message}`);
      }
    }

    this.checkMajorVersion(doc.schemaVersion, 'components', errors);

    const validUniversalFields = patchVocabDoc
      ? new Set(patchVocabDoc.universalFields.map((f: any) => f.name))
      : new Set([
          'surface', 'content', 'border', 'radius', 'typography',
          'padding', 'gap', 'depth', 'prominence', 'treatment'
        ]);

    const validExtraFamilies = patchVocabDoc
      ? new Map(patchVocabDoc.extraFamilies.map((ef: any) => [ef.family, new Set(ef.fields.map((f: any) => f.name))]))
      : new Map([
          ['Surface', new Set(['depth', 'borderWidth'])],
          ['Icon', new Set(['size'])],
          ['Divider', new Set(['thickness'])],
          ['Interactive', new Set(['motion'])],
          ['Spacer', new Set(['size'])],
        ]);

    if (Array.isArray(doc.components)) {
      for (const comp of doc.components) {
        this.validateComponentSemantic(comp, validUniversalFields, validExtraFamilies as any, errors);
      }
    }

    return { ok: errors.length === 0, errors };
  }

  private validateComponentSemantic(
    comp: any,
    validUniversalFields: Set<string>,
    extraFamilyFields: Map<string, Set<string>>,
    errors: string[]
  ) {
    const id = comp.id || 'unknown';

    // 1. Summary
    if (!comp.summary || typeof comp.summary !== 'string' || comp.summary.trim() === '') {
      errors.push(`[semantic] ${id}: Component must have a non-empty KDoc summary`);
    }

    // 2. Lifecycle
    if (comp.lifecycle) {
      if (comp.lifecycle.status === 'deprecated' && !comp.lifecycle.deprecatedIn) {
        errors.push(`[semantic] ${id}: Lifecycle 'deprecated' status requires 'deprecatedIn' version`);
      }
      if (comp.lifecycle.status === 'discontinued' && !comp.lifecycle.discontinuedIn) {
        errors.push(`[semantic] ${id}: Lifecycle 'discontinued' status requires 'discontinuedIn' version`);
      }
      if (comp.lifecycle.status === 'stable') {
        if (!comp.accessibility?.report) {
          errors.push(`[semantic] ${id}: Lifecycle 'stable' status requires accessibility.report`);
        }
      }
    }

    // 3. Anatomy bounds keys must be part ids
    if (comp.overview?.anatomy) {
      const partIds = new Set((comp.overview.anatomy.parts || []).map((p: any) => p.id));
      if (comp.overview.anatomy.bounds) {
        for (const boundKey of Object.keys(comp.overview.anatomy.bounds)) {
          if (!partIds.has(boundKey)) {
            errors.push(
              `[semantic] ${id}: Anatomy bounds key '${boundKey}' does not match any declared part id (${Array.from(partIds).join(', ')})`
            );
          }
        }
      }
    }

    // 4. Matrix variant and state ids
    const variantIds = new Set((comp.overview?.variants || []).map((v: any) => v.id));
    const stateIds = new Set((comp.overview?.states || []).map((s: any) => s.id));

    if (comp.overrides?.matrix) {
      for (const entry of comp.overrides.matrix) {
        if (entry.variant !== '*' && !variantIds.has(entry.variant)) {
          errors.push(
            `[semantic] ${id}: Matrix variant '${entry.variant}' does not exist in component variants (${Array.from(variantIds).join(', ')})`
          );
        }
        if (entry.state !== '*' && !stateIds.has(entry.state)) {
          errors.push(
            `[semantic] ${id}: Matrix state '${entry.state}' does not exist in component states (${Array.from(stateIds).join(', ')})`
          );
        }
      }
    }

    // 5. Gallery references
    if (comp.overview?.gallery) {
      for (const item of comp.overview.gallery) {
        if (!variantIds.has(item.variant)) {
          errors.push(
            `[semantic] ${id}: Gallery entry references non-existent variant '${item.variant}'`
          );
        }
        if (!stateIds.has(item.state)) {
          errors.push(
            `[semantic] ${id}: Gallery entry references non-existent state '${item.state}'`
          );
        }
      }
    }

    // 6. Overrides fields existence in vocabulary
    if (comp.overrides?.universalFields) {
      for (const field of comp.overrides.universalFields) {
        if (!validUniversalFields.has(field)) {
          errors.push(
            `[semantic] ${id}: Override universalField '${field}' does not exist in patch-vocabulary.json`
          );
        }
      }
    }

    if (comp.overrides?.extraFamily) {
      if (!extraFamilyFields.has(comp.overrides.extraFamily)) {
        errors.push(
          `[semantic] ${id}: Override extraFamily '${comp.overrides.extraFamily}' is not recognized`
        );
      }
    }
  }

  private checkMajorVersion(version: string | undefined, docName: string, errors: string[]) {
    if (!version || typeof version !== 'string') {
      errors.push(`[version] ${docName}: Missing schemaVersion`);
      return;
    }
    const major = version.split('.')[0];
    if (major !== '0') {
      errors.push(
        `[version] ${docName}: Unsupported major schemaVersion '${version}' (expected 0.x.x)`
      );
    }
  }

  private parseSimpleYaml(yamlStr: string): any {
    const result: any = {};
    const lines = yamlStr.split(/\r?\n/);
    let currentKey = '';
    let currentArray: string[] | null = null;
    let currentObject: any = null;
    let inSubKey = '';

    for (let line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      if (line.startsWith('  ') && currentObject) {
        const subTrimmed = line.trim();
        if (subTrimmed.endsWith(':')) {
          inSubKey = subTrimmed.slice(0, -1).trim();
          currentObject[inSubKey] = [];
        } else if (subTrimmed.startsWith('- ') && inSubKey) {
          const val = subTrimmed.slice(2).replace(/^["']|["']$/g, '');
          currentObject[inSubKey].push(val);
        }
        continue;
      }

      if (trimmed.endsWith(':')) {
        currentKey = trimmed.slice(0, -1).trim();
        currentArray = null;
        currentObject = {};
        result[currentKey] = currentObject;
      } else if (trimmed.includes(':')) {
        const colonIdx = trimmed.indexOf(':');
        const key = trimmed.slice(0, colonIdx).trim();
        const value = trimmed.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
        result[key] = value;
        currentKey = '';
      }
    }
    return result;
  }
}
