/**
 * resolveClient.ts - JavaScript facade wrapper for docs-runtime.
 *
 * Enforces:
 * 1. The facade is the only source of resolution. No JS math or re-implementation.
 * 2. Fail loudly: validate response shape and throw clear error if drifted.
 * 3. Sequence calls; discard stale responses.
 * 4. Measure execution time.
 * 5. Track last-good state: keep rendering last-good theme on ok:false while surfacing violations.
 */

import { serializeIntent, type BasisIntentState } from './serialize';

export interface TokenMap {
  css: string;
  light: Record<string, string>;
  dark: Record<string, string>;
  kinds: Record<string, string>;
  groups: Record<string, string>;
}

export interface ReportEntry {
  path: string;
  stage: string;
  status: 'Honored' | 'Modulated' | 'OverriddenByConstraint' | 'Rejected' | 'Absent' | string;
  message: string;
  requested: string | null;
  enforced: string | null;
}

export interface FontAssignments {
  structure: any;
  content: any;
  metadata: any;
  unusedCandidates: any[];
}

export interface ResolutionReport {
  entries: ReportEntry[];
  baseVersion: number;
  modes: string[];
  fontAssignments: FontAssignments;
}

export interface ThemeViolation {
  path: string;
  message: string;
}

export type StudioSuccessResult = {
  ok: true;
  tokens: TokenMap;
  report: ResolutionReport;
  violations: ThemeViolation[]; // Rejections from report
  durationMs: number;
};

export type StudioFailureResult = {
  ok: false;
  violations: ThemeViolation[];
  durationMs: number;
};

export type StudioResult = StudioSuccessResult | StudioFailureResult;

export interface DocsRuntimeApi {
  resolve(intentJson: string): string;
  resolveWithPrefix(intentJson: string, prefix: string): string;
  emitCss(intentJson: string, prefix?: string, lightSelector?: string, darkSelector?: string): string;
  tokenPathToCssVar(path: string, prefix?: string): string;
}

const RUNTIME_JS_FILES = [
  'kotlin-kotlin-stdlib.js',
  'kotlin_org_jetbrains_kotlin_kotlin_dom_api_compat.js',
  'kotlinx-serialization-kotlinx-serialization-core.js',
  'kotlinx-serialization-kotlinx-serialization-json.js',
  'Basis-basis-theme.js',
  'Basis-docs-runtime.js',
] as const;

function getGlobalApi(): DocsRuntimeApi | null {
  if (typeof window === 'undefined') return null;
  const w = window as any;
  const ns = w['Basis:docs-runtime'] ?? w['Basis_docs_runtime'] ?? w['Basis-docs-runtime'] ?? {};
  return ns.io?.github?.alph_a07?.basis?.docs?.runtime ?? null;
}

let cachedRuntime: DocsRuntimeApi | null = null;

/**
 * Loads docs-runtime in either browser (DOM/window) or Node.js environment.
 */
export async function loadDocsRuntime(): Promise<DocsRuntimeApi> {
  if (cachedRuntime) return cachedRuntime;

  if (typeof window !== 'undefined') {
    // 1. Check if already loaded globally (e.g. from inline script tags)
    const existing = getGlobalApi();
    if (existing) {
      cachedRuntime = existing;
      return existing;
    }

    const baseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL ? import.meta.env.BASE_URL : '/').replace(/\/$/, '');
    // 2. Load the 6 UMD artifacts in strict dependency order via script tags
    for (const file of RUNTIME_JS_FILES) {
      const src = `${baseUrl}/docs-runtime/${file}`;
      if (!document.querySelector(`script[src="${src}"]`)) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = src;
          script.async = false;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error(`Failed to load ${src}`));
          document.head.appendChild(script);
        });
      }
    }

    const api = getGlobalApi();
    if (!api) {
      throw new Error('docs-runtime bundles loaded but namespace io.github.alph_a07.basis.docs.runtime was not found.');
    }
    cachedRuntime = api;
    return api;
  }

  // Node.js environment (for tests)
  try {
    const { createRequire } = await import('node:module');
    const path = await import('node:path');
    const fs = await import('node:fs');
    const require = createRequire(import.meta.url);

    let dir = process.cwd();
    let root = dir;
    while (dir !== path.dirname(dir)) {
      if (fs.existsSync(path.join(dir, 'settings.gradle.kts')) || fs.existsSync(path.join(dir, 'basis-theme'))) {
        root = dir;
        break;
      }
      dir = path.dirname(dir);
    }

    let resolvedPath = path.resolve(
      root,
      'docs/docs-runtime/build/dist/js/productionLibrary/Basis-docs-runtime.js',
    );
    if (!fs.existsSync(resolvedPath)) {
      const publicPath = path.resolve(root, 'docs/docs-site/public/docs-runtime/Basis-docs-runtime.js');
      if (fs.existsSync(publicPath)) {
        resolvedPath = publicPath;
      }
    }

    const mod = require(resolvedPath);
    const api = mod.io.github.alph_a07.basis.docs.runtime;
    if (!api) {
      throw new Error(`Node require succeeded but io.github.alph_a07.basis.docs.runtime was missing.`);
    }
    cachedRuntime = api;
    return api;
  } catch (err) {
    throw new Error(`Failed to load docs-runtime in Node environment: ${String(err)}`);
  }
}

/**
 * Validates the raw JSON shape returned by the facade. Throws loudly on drift.
 */
export function validateFacadeResponse(parsed: any): void {
  if (!parsed || typeof parsed !== 'object') {
    throw new Error(`Facade returned non-object response: ${JSON.stringify(parsed)}`);
  }

  if (typeof parsed.ok !== 'boolean') {
    throw new Error(`Facade response missing boolean 'ok' field: ${JSON.stringify(parsed)}`);
  }

  if (parsed.ok === false) {
    if (!Array.isArray(parsed.violations)) {
      throw new Error(`Facade failure response missing 'violations' array: ${JSON.stringify(parsed)}`);
    }
    for (const v of parsed.violations) {
      if (!v || typeof v.path !== 'string' || typeof v.message !== 'string') {
        throw new Error(`Invalid violation item in facade response: ${JSON.stringify(v)}`);
      }
    }
    return;
  }

  // parsed.ok === true
  if (!parsed.tokens || typeof parsed.tokens !== 'object') {
    throw new Error(`Facade success response missing 'tokens' object: ${JSON.stringify(parsed)}`);
  }
  if (typeof parsed.tokens.css !== 'string') {
    throw new Error(`Facade tokens missing 'css' string: ${JSON.stringify(parsed.tokens)}`);
  }
  if (!parsed.tokens.light || typeof parsed.tokens.light !== 'object') {
    throw new Error(`Facade tokens missing 'light' map: ${JSON.stringify(parsed.tokens)}`);
  }
  if (!parsed.tokens.dark || typeof parsed.tokens.dark !== 'object') {
    throw new Error(`Facade tokens missing 'dark' map: ${JSON.stringify(parsed.tokens)}`);
  }
  if (!parsed.tokens.kinds || typeof parsed.tokens.kinds !== 'object') {
    throw new Error(`Facade tokens missing 'kinds' metadata map: ${JSON.stringify(parsed.tokens)}`);
  }
  if (!parsed.tokens.groups || typeof parsed.tokens.groups !== 'object') {
    throw new Error(`Facade tokens missing 'groups' metadata map: ${JSON.stringify(parsed.tokens)}`);
  }

  if (!parsed.report || typeof parsed.report !== 'object') {
    throw new Error(`Facade success response missing 'report' object: ${JSON.stringify(parsed)}`);
  }
  if (!Array.isArray(parsed.report.entries)) {
    throw new Error(`Facade report missing 'entries' array: ${JSON.stringify(parsed.report)}`);
  }
  if (!Array.isArray(parsed.report.modes)) {
    throw new Error(`Facade report missing 'modes' array: ${JSON.stringify(parsed.report)}`);
  }
}

let latestCallId = 0;

/**
 * Executes safe resolution against the real Kotlin docs-runtime facade.
 */
export async function resolveSafe(
  intent: BasisIntentState,
  prefix: string = 'b',
  runtimeOverride?: DocsRuntimeApi,
): Promise<{ result: StudioResult; isStale: boolean }> {
  const callId = ++latestCallId;
  const start = typeof performance !== 'undefined' ? performance.now() : Date.now();

  const api = runtimeOverride ?? (await loadDocsRuntime());
  const intentJson = serializeIntent(intent);

  let rawJson: string;
  try {
    rawJson = api.resolveWithPrefix(intentJson, prefix);
  } catch (err) {
    const durationMs = (typeof performance !== 'undefined' ? performance.now() : Date.now()) - start;
    return {
      result: {
        ok: false,
        violations: [{ path: 'intent', message: String(err) }],
        durationMs,
      },
      isStale: callId !== latestCallId,
    };
  }

  const durationMs = (typeof performance !== 'undefined' ? performance.now() : Date.now()) - start;
  let parsed: any;
  try {
    parsed = JSON.parse(rawJson);
  } catch (err) {
    throw new Error(`Facade response was not valid JSON: ${rawJson}`);
  }

  validateFacadeResponse(parsed);

  if (!parsed.ok) {
    return {
      result: {
        ok: false,
        violations: parsed.violations,
        durationMs,
      },
      isStale: callId !== latestCallId,
    };
  }

  // In Kotlin, rejections are captured in report.entries with status == "Rejected"
  const reportViolations: ThemeViolation[] = (parsed.report.entries as ReportEntry[])
    .filter((e) => e.status === 'Rejected')
    .map((e) => ({ path: e.path, message: e.message }));

  const result: StudioSuccessResult = {
    ok: true,
    tokens: parsed.tokens,
    report: parsed.report,
    violations: reportViolations,
    durationMs,
  };

  return {
    result,
    isStale: callId !== latestCallId,
  };
}
