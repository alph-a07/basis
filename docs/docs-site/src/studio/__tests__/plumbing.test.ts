import assert from 'node:assert';
import {
  serializeIntent,
  deserializeIntent,
  type BasisIntentState,
} from '../state/serialize';
import {
  setByPointer,
  unsetByPointer,
  getByPointer,
  StudioIntentStore,
} from '../state/intentStore';
import {
  loadDocsRuntime,
  resolveSafe,
  validateFacadeResponse,
} from '../state/resolveClient';

console.log('Testing Studio Plumbing (Gate 2: round-trip, pointer mutation, undo/redo, facade shape with kinds)...\n');

// 1. Serialization & Round trip
console.log('1. Testing serialization & deserialization round-trip...');
const sampleIntent: BasisIntentState = {
  identity: {
    brandColor: {
      type: 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex',
      value: '#6750A4',
    },
    presence: 'Strong',
    deriveColors: false,
    supportingColors: [
      {
        type: 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex',
        value: '#388E3C',
      },
    ],
  },
  mood: {
    preset: 'Bold',
    knobs: {
      warmth: 0.5,
      chroma: -0.2,
      density: 0.8,
    },
  },
  domain: {
    domains: ['Finance', 'Health'],
    interactions: ['DataNavigation', 'FormsEntry'],
  },
  control: {
    mode: {
      preferred: 'Dark',
      targets: ['Light', 'Dark'],
    },
  },
};

const json = serializeIntent(sampleIntent);
const roundTripped = deserializeIntent(json);
assert.deepStrictEqual(roundTripped, sampleIntent, 'Deserialized intent must match original');
console.log('   ✅ Intent serialization round-trips identically.\n');

// 2. JSON Pointer Path Helpers
console.log('2. Testing JSON pointer immutable mutations (set/unset/get)...');
let testObj: any = {};
testObj = setByPointer(testObj, '/mood/knobs/warmth', 0.75);
assert.strictEqual(getByPointer(testObj, '/mood/knobs/warmth'), 0.75);

testObj = setByPointer(testObj, '/identity/brandColor/value', '#1976D2');
assert.strictEqual(getByPointer(testObj, '/identity/brandColor/value'), '#1976D2');

testObj = unsetByPointer(testObj, '/mood/knobs/warmth');
assert.strictEqual(getByPointer(testObj, '/mood/knobs/warmth'), undefined);
assert.strictEqual(testObj.mood.knobs.warmth, undefined);

// Array pointer mutation
testObj = setByPointer(testObj, '/identity/supportingColors/0/value', '#F57C00');
assert.strictEqual(testObj.identity.supportingColors[0].value, '#F57C00');
testObj = unsetByPointer(testObj, '/identity/supportingColors/0');
assert.strictEqual(testObj.identity.supportingColors.length, 0);
console.log('   ✅ JSON pointer get, set, unset correctly manipulate immutable tree.\n');

// 3. Undo / Redo & 50 Snapshot Cap in Store
console.log('3. Testing StudioIntentStore history, undo, redo, and reset...');
const store = new StudioIntentStore({ mood: { preset: 'Neutral' } });
assert.strictEqual(store.canUndo(), false);
assert.strictEqual(store.canRedo(), false);

store.set('/mood/knobs/warmth', 0.2, true);
assert.strictEqual(store.canUndo(), true);
assert.strictEqual(store.canRedo(), false);

store.set('/mood/knobs/warmth', 0.5, true);
assert.strictEqual(store.getState().intent.mood?.knobs?.warmth, 0.5);

store.undo();
assert.strictEqual(store.getState().intent.mood?.knobs?.warmth, 0.2);
assert.strictEqual(store.canRedo(), true);

store.redo();
assert.strictEqual(store.getState().intent.mood?.knobs?.warmth, 0.5);

// Reset as single undoable entry
store.reset();
assert.deepStrictEqual(store.getState().intent, {});
assert.strictEqual(store.canUndo(), true);
store.undo();
assert.strictEqual(store.getState().intent.mood?.knobs?.warmth, 0.5);

// Test 50 snapshots cap
for (let i = 0; i < 60; i++) {
  store.set('/mood/knobs/warmth', i * 0.01, true);
}
assert(store.getState().history.length <= 50, 'History must be capped at 50 snapshots');
store.destroy();
console.log('   ✅ Store history (50 cap, undo, redo, reset) behaves correctly.\n');

// 4. Facade Response Validator & Real Facade Resolution with Kinds & Groups
console.log('4. Testing facade response validator and resolveSafe against real Kotlin facade...');
const validResponse = {
  ok: true,
  tokens: {
    css: ':root {}',
    light: { '--b-test': 'value' },
    dark: { '--b-test': 'value' },
    kinds: { '--b-test': 'color' },
    groups: { '--b-test': 'color' },
  },
  report: {
    entries: [],
    modes: ['Light', 'Dark'],
    fontAssignments: {},
  },
};
assert.doesNotThrow(() => validateFacadeResponse(validResponse));

// Drift detection
assert.throws(() => validateFacadeResponse({ ok: true, tokens: {} }), /missing 'css' string/);
assert.throws(() => validateFacadeResponse({ ok: false }), /missing 'violations' array/);
assert.throws(
  () =>
    validateFacadeResponse({
      ok: true,
      tokens: { css: '', light: {}, dark: {} },
      report: { entries: [], modes: [] },
    }),
  /missing 'kinds' metadata map/,
);

// Real resolution in Node environment
async function testRealFacade() {
  const runtime = await loadDocsRuntime();
  assert(runtime, 'Docs runtime should load in Node environment');

  const { result } = await resolveSafe(sampleIntent, 'b');
  assert.strictEqual(result.ok, true, 'Real facade should resolve sampleIntent ok: true');
  if (result.ok) {
    assert(result.tokens.light['--b-color-surface-default'], 'Light tokens map must be populated');
    assert(result.tokens.dark['--b-color-surface-default'], 'Dark tokens map must be populated');
    assert(result.tokens.kinds['--b-color-surface-default'], 'Kinds map must be populated');
    assert.strictEqual(result.tokens.kinds['--b-color-surface-default'], 'color');
    assert.strictEqual(result.tokens.kinds['--b-spacing-level4'], 'dimension');
    assert.strictEqual(result.tokens.kinds['--b-radius-level2'], 'radius');
    assert.strictEqual(result.tokens.kinds['--b-depth-level2'], 'shadow');
    assert.strictEqual(result.tokens.kinds['--b-motion-feedback'], 'duration');
    assert.strictEqual(result.tokens.kinds['--b-typography-structure-level1-family'], 'font-family');
    assert(result.tokens.groups['--b-color-surface-default'], 'Groups map must be populated');
    assert(result.tokens.css.includes(':root, [data-theme="light"]'), 'CSS must include light block');
    assert(result.tokens.css.includes('[data-theme="dark"]'), 'CSS must include dark block');
    assert(result.report.entries.length > 0, 'Report must contain stage entries');
    console.log(`   Resolution latency: ${result.durationMs.toFixed(2)}ms`);
  }

  // Malformed JSON test
  const malformedRaw = runtime.resolve('{ malformed json }');
  const malformedParsed = JSON.parse(malformedRaw);
  assert.strictEqual(malformedParsed.ok, false);
  assert.strictEqual(malformedParsed.violations[0].path, 'intent');

  console.log('   ✅ Real facade resolution and error contracts passed.\n');
}

testRealFacade().then(() => {
  console.log('🎉 Gate 2 passed: All plumbing tests green!\n');
});
