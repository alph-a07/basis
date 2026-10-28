import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SemanticValidator } from '@basis/docs-model/validator';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const schemasDir = path.resolve(currentDir, '../../docs-model/schemas');
const validator = new SemanticValidator(schemasDir);

console.log('Testing that validating loader catches invalid data...');

const invalidDoc = {
  schemaVersion: '0.2.0',
  provenance: 'fixture',
  source: { commit: 'test' },
  components: [
    {
      id: 'broken-button',
      name: 'BasisButton',
      family: 'Actions',
      kind: 'component',
      lifecycle: { status: 'stable', addedIn: '0.1.0' }, // stable requires report!
      summary: '', // empty summary!
      description: 'Broken button',
      package: 'io.github.alph_a07.basis.components.actions',
      sourceUrl: 'https://example.com',
      overview: {
        quickStartSample: 'BasisButton()',
        anatomy: { parts: [] },
        variants: [],
        states: [],
      },
      api: { signatures: [], samples: [] },
      overrides: {
        universalFields: ['inventedField'], // invented field!
        matrix: [],
      },
      accessibility: {
        role: 'Button',
        touchTarget: { minWidthDp: 48, minHeightDp: 48, enforced: true },
        reducedMotion: { respectsReducedMotion: true },
      },
    },
  ],
};

const result = validator.validateComponents(invalidDoc);

if (result.ok) {
  console.error('❌ Validation unexpectedly passed on invalid document!');
  process.exit(1);
}

console.log(`✅ Validating loader successfully rejected invalid data with ${result.errors.length} errors:`);
result.errors.forEach((err) => console.log(`   - ${err}`));
console.log('🎉 Loader validation check passed!\n');
