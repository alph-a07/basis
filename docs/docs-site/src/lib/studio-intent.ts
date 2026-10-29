/**
 * studio-intent.ts - Single source of truth for the Intent Studio local intent.
 *
 * Drives the control panel (P2.5). Mutations come from `control-change` CustomEvents
 * (detail: {path, name, value}) emitted by the control components. Every mutation
 * serializes to the exact kotlinx.serialization interchange shape the real resolver
 * accepts (verified against docs-runtime):
 *   - ColorSpec        -> { type: FQ ".Hex", value: "#RRGGBB" }
 *   - FontFamilyRef    -> { type: FQ ".Catalog", id: "inter" }
 *   - ThemeMode        -> "Light" | "Dark" (plain enum)
 *   - domains/interactions -> PascalCase enum name strings
 *
 * The store exposes:
 *   - current intent + typed mutations (pure reductions)
 *   - debounced resolve() into the `--b-*` preview scope (browser runtime load)
 *   - violations, report, and a last-good token set on failure
 */

export type ColorSpecInput = { type: string; value: string };
export type FontFamilyRefInput = { type: string; id: string };

export interface ResolvedSuccess {
  ok: true;
  tokens: { css: string; light: Record<string, string>; dark: Record<string, string> };
  report: ResolutionReport;
}

export interface ResolvedFailure {
  ok: false;
  violations: ThemeViolation[];
}

export type ResolveResult = ResolvedSuccess | ResolvedFailure;

/** Mirror of ThemeInterchange resolution report output. `modes` decodes to a JSON array. */
export interface ResolutionReport {
  entries: ReportEntry[];
  modes: string[];
  fontAssignment: unknown;
  baseVersion: number;
}

export interface ReportEntry {
  path: string;
  stage: string;
  status: string;
  message: string;
  requested?: string | null;
  enforced?: string | null;
}

export interface ThemeViolation {
  path: string;
  message: string;
}

/** Mutable intent held by the store, in resolver-interchange JSON form. */
export interface IntentState {
  identity?: {
    brandColor?: ColorSpecInput | null;
    supportingColors?: ColorSpecInput[];
    presence?: string | null; // BrandPresence enum name
    typography?: {
      candidates?: FontFamilyRefInput[];
      structure?: FontFamilyRefInput | null;
      content?: FontFamilyRefInput | null;
      metadata?: FontFamilyRefInput | null;
    } | null;
    deriveColors?: boolean;
  } | null;
  mood?: {
    preset?: string | null; // MoodPreset enum name
    knobs?: Record<string, number | null>; // MoodKnobs, null = inherit preset
  } | null;
  domain?: {
    domains?: string[]; // ProductDomain enum names
    interactions?: string[]; // InteractionPattern enum names
  } | null;
  control?: {
    mode?: {
      preferred?: string | null; // "Light" | "Dark"
      targets?: string[];
    };
    tokens?: { paths?: Record<string, unknown> };
    components?: Record<string, unknown>;
  } | null;
}

export interface StudioIntentStore {
  intent: IntentState;
  lastGood: ResolvedSuccess | null;
  current: ResolveResult | null;
  setBrandColor: (hex: string | null) => void;
  addSupportingColor: (hex: string) => void;
  setSupportingColors: (hexes: string[]) => void;
  removeSupportingColor: (index: number) => void;
  setPresence: (value: string | null) => void;
  setDeriveColors: (value: boolean) => void;
  setTypographyFamily: (role: 'candidates' | 'structure' | 'content' | 'metadata', id: string) => void;
  setMoodPreset: (value: string | null) => void;
  setKnob: (id: string, value: number | null) => void;
  setDomains: (values: string[]) => void;
  setInteractions: (values: string[]) => void;
  setMode: (preferred: 'Light' | 'Dark' | null, targets: string[]) => void;
  reset: () => void;
}

/** FQ serial-name prefix for kotlinx sealed-interface discriminators (single source: basis-theme ColorSpec). */
const COLOR_SPEC_DISCRIMINATOR =
  'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex';
const FONT_FAMILY_DISCRIMINATOR =
  'io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef.Catalog';

/** Default empty intent (valid, resolves to base defaults). */
export const DEFAULT_INTENT: IntentState = {};

/**
 * Reduces a raw `control-change` event against the intent state.
 * Pure: returns a new intent, does not mutate. Used by the event bridge and tests.
 */
export function applyControlChange(state: IntentState, path: string, name: string, value: unknown): IntentState {
  const next: IntentState = JSON.parse(JSON.stringify(state ?? {}));

  switch (path.split('.')[0]) {
    case 'identity': {
      if (!next.identity) next.identity = {};
      switch (name) {
        case 'brandColor':
          next.identity.brandColor = value ? { type: COLOR_SPEC_DISCRIMINATOR, value: value as string } : null;
          break;
        case 'supportingColors':
          next.identity.supportingColors = (value as string[]).map((h: string) => ({
            type: COLOR_SPEC_DISCRIMINATOR,
            value: h,
          }));
          break;
        case 'presence':
          next.identity.presence = value ? (value as string) : null;
          break;
        case 'deriveColors':
          next.identity.deriveColors = value as boolean;
          break;
      }
      break;
    }
    case 'mood': {
      if (!next.mood) next.mood = { knobs: {} };
      if (!next.mood.knobs) next.mood.knobs = {};
      if (name === 'preset') {
        next.mood.preset = value ? (value as string) : null;
      } else {
        next.mood.knobs[name] = value as number | null;
      }
      break;
    }
    case 'domain': {
      if (!next.domain) next.domain = {};
      if (name === 'domains') next.domain.domains = value as string[];
      else if (name === 'interactions') next.domain.interactions = value as string[];
      break;
    }
  }
  return next;
}

/** Serializes the intent state to the interchange JSON the resolver accepts. Strips nulls. */
export function serializeIntent(state: IntentState): string {
  return JSON.stringify(stripNulls(state));
}

/** Removes null/undefined values so the resolver never sees JSON null where an absent value is expected. */
function stripNulls(obj: unknown): unknown {
  if (obj === null || obj === undefined) return undefined;
  if (Array.isArray(obj)) return obj.map(stripNulls).filter((v) => v !== undefined);
  if (typeof obj === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      const stripped = stripNulls(v);
      if (stripped !== undefined) out[k] = stripped;
    }
    return out;
  }
  return obj;
}

interface DocsRuntimeApi {
  resolve: (intentJson: string) => string;
  resolveWithPrefix: (intentJson: string, prefix: string) => string;
  emitCss: (intentJson: string, prefix?: string, lightSelector?: string, darkSelector?: string) => string;
}

/** UMD load order for docs-runtime artifacts (verified dependency graph). */
const RUNTIME_JS_FILES = [
  'kotlin-kotlin-stdlib.js',
  'kotlin_org_jetbrains_kotlin_kotlin_dom_api_compat.js',
  'kotlinx-serialization-kotlinx-serialization-core.js',
  'kotlinx-serialization-kotlinx-serialization-json.js',
  'Basis-basis-theme.js',
  'Basis-docs-runtime.js',
] as const;

const RUNTIME_BASE = '/docs-runtime/';

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function getGlobalApi(): DocsRuntimeApi | null {
  const w = window as { Basis_docs_runtime?: unknown };
  const ns =
    (w.Basis_docs_runtime as { io?: { github?: { alph_a07?: { basis?: { docs?: { runtime?: DocsRuntimeApi } } } } } }) ??
    {};
  return ns.io?.github?.alph_a07?.basis?.docs?.runtime ?? null;
}

let runtimePromise: Promise<DocsRuntimeApi> | null = null;

/** Loads the docs-runtime UMD artifacts in dependency order and returns the API. */
export function loadDocsRuntime(): Promise<DocsRuntimeApi> {
  const existing = getGlobalApi();
  if (existing) return Promise.resolve(existing);
  if (!isBrowser()) return Promise.reject(new Error('docs-runtime can only load in a browser.'));
  if (!runtimePromise) {
    runtimePromise = new Promise<DocsRuntimeApi>((resolve, reject) => {
      let loaded = 0;
      let failed = false;
      RUNTIME_JS_FILES.forEach((file) => {
        if (failed) return;
        const script = document.createElement('script');
        script.src = RUNTIME_BASE + file;
        script.async = false; // preserve load order for UMD globals
        script.onload = () => {
          if (failed) return;
          loaded++;
          if (loaded === RUNTIME_JS_FILES.length) {
            const api = getGlobalApi();
            if (api) resolve(api);
            else reject(new Error('docs-runtime loaded but global API not found.'));
          }
        };
        script.onerror = () => {
          failed = true;
          reject(new Error(`Failed to load docs-runtime artifact: ${file}`));
        };
        document.head.appendChild(script);
      });
    });
  }
  return runtimePromise;
}

/** Build the full store bound to a setter for re-rendering. */
export function createStudioIntentStore(
  setState: (fn: (s: { intent: IntentState; lastGood: ResolvedSuccess | null; current: ResolveResult | null }) => void) => void,
): StudioIntentStore {
  let intent: IntentState = JSON.parse(JSON.stringify(DEFAULT_INTENT));
  let lastGood: ResolvedSuccess | null = null;
  let current: ResolveResult | null = null;
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  let resolveScheduled = false;

  const emit = () =>
    setState((s) => {
      s.intent = JSON.parse(JSON.stringify(intent));
      s.lastGood = lastGood;
      s.current = current;
    });

  async function resolveDebounced() {
    if (!resolveScheduled) return;
    try {
      const api = await loadDocsRuntime();
      const json = serializeIntent(intent);
      const raw = api.resolveWithPrefix(json, 'b');
      const result = JSON.parse(raw) as ResolveResult;
      current = result;
      if (result.ok) lastGood = result;
      emit();
    } catch (e) {
      current = { ok: false, violations: [{ path: 'intent', message: String(e) }] };
      emit();
    } finally {
      resolveScheduled = false;
    }
  }

  function scheduleResolve() {
    resolveScheduled = true;
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      void resolveDebounced();
    }, 200);
  }

  function mutate(patch: (i: IntentState) => void) {
    patch(intent);
    emit();
    scheduleResolve();
  }

  return {
    intent: JSON.parse(JSON.stringify(intent)),
    lastGood,
    current,
    setBrandColor: (hex) =>
      mutate((i) => {
        if (!i.identity) i.identity = {};
        i.identity.brandColor = hex ? { type: COLOR_SPEC_DISCRIMINATOR, value: hex } : null;
      }),
    addSupportingColor: (hex) =>
      mutate((i) => {
        if (!i.identity) i.identity = {};
        if (!i.identity.supportingColors) i.identity.supportingColors = [];
        i.identity.supportingColors.push({ type: COLOR_SPEC_DISCRIMINATOR, value: hex });
      }),
    setSupportingColors: (hexes) =>
      mutate((i) => {
        if (!i.identity) i.identity = {};
        i.identity.supportingColors = hexes.map((h) => ({ type: COLOR_SPEC_DISCRIMINATOR, value: h }));
      }),
    removeSupportingColor: (index) =>
      mutate((i) => {
        if (!i.identity?.supportingColors) return;
        i.identity.supportingColors.splice(index, 1);
      }),
    setPresence: (value) => mutate((i) => { if (!i.identity) i.identity = {}; i.identity.presence = value; }),
    setDeriveColors: (value) => mutate((i) => { if (!i.identity) i.identity = {}; i.identity.deriveColors = value; }),
    setTypographyFamily: (role, id) =>
      mutate((i) => {
        if (!i.identity) i.identity = {};
        if (!i.identity.typography) i.identity.typography = {};
        const ref = { type: FONT_FAMILY_DISCRIMINATOR, id };
        switch (role) {
          case 'candidates':
            if (!i.identity.typography.candidates) i.identity.typography.candidates = [];
            i.identity.typography.candidates = [ref];
            break;
          case 'structure': i.identity.typography.structure = ref; break;
          case 'content': i.identity.typography.content = ref; break;
          case 'metadata': i.identity.typography.metadata = ref; break;
        }
      }),
    setMoodPreset: (value) => mutate((i) => { if (!i.mood) i.mood = {}; i.mood.preset = value; }),
    setKnob: (id, value) =>
      mutate((i) => {
        if (!i.mood) i.mood = { knobs: {} };
        if (!i.mood.knobs) i.mood.knobs = {};
        i.mood.knobs[id] = value;
      }),
    setDomains: (values) => mutate((i) => { if (!i.domain) i.domain = {}; i.domain.domains = values; }),
    setInteractions: (values) => mutate((i) => { if (!i.domain) i.domain = {}; i.domain.interactions = values; }),
    setMode: (preferred, targets) => mutate((i) => { if (!i.control) i.control = {}; i.control.mode = { preferred, targets }; }),
    reset: () => {
      intent = JSON.parse(JSON.stringify(DEFAULT_INTENT));
      emit();
      scheduleResolve();
    },
  };
}

/**
 * Wires the `control-change` events from a container into the store.
 * Call once the controls are mounted. Returns an unmount function.
 */
export function bindControlEvents(
  container: HTMLElement,
  store: StudioIntentStore,
): () => void {
  function handler(e: Event) {
    const detail = (e as CustomEvent<{ path: string; name: string; value: unknown }>).detail;
    if (!detail) return;
    switch (detail.name) {
      case 'brandColor': store.setBrandColor(detail.value as string | null); break;
      case 'supportingColors': store.setSupportingColors(detail.value as string[]); break;
      case 'presence': store.setPresence(detail.value as string | null); break;
      case 'deriveColors': store.setDeriveColors(detail.value as boolean); break;
      case 'preset': store.setMoodPreset(detail.value as string | null); break;
      default:
        if (detail.path?.startsWith('mood.knobs.')) {
          store.setKnob(detail.name, detail.value as number | null);
        } else if (detail.name === 'domains') {
          store.setDomains(detail.value as string[]);
        } else if (detail.name === 'interactions') {
          store.setInteractions(detail.value as string[]);
        }
    }
  }
  container.addEventListener('control-change', handler);
  return () => container.removeEventListener('control-change', handler);
}

// Dev-only global hook for inspection.
if (typeof window !== 'undefined') {
  (window as { __basisStudioIntent?: unknown }).__basisStudioIntent = {
    createStudioIntentStore,
    serializeIntent,
    applyControlChange,
  };
}
