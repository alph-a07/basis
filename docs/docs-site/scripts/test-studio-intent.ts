import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import {
  applyControlChange,
  serializeIntent,
  createStudioIntentStore,
  type IntentState,
  type ResolvedSuccess,
  type ResolveResult,
} from '../src/lib/studio-intent.js';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function captureStore() {
  let snapshot: { intent: IntentState; lastGood: ResolvedSuccess | null; current: ResolveResult | null } | null = null;
  const setState = (
    fn: (s: { intent: IntentState; lastGood: ResolvedSuccess | null; current: ResolveResult | null }) => void,
  ) => {
    const s: { intent: IntentState; lastGood: ResolvedSuccess | null; current: ResolveResult | null } = {
      intent: snapshot ? snapshot.intent : {},
      lastGood: null,
      current: null,
    };
    fn(s);
    snapshot = s;
  };
  const store = createStudioIntentStore(setState);
  return {
    store,
    get snapshot() {
      return snapshot ?? { intent: {}, lastGood: null, current: null };
    },
  };
}

console.log('Testing P2.5 Intent Store (mutations, serialization, debounced resolve)...\n');

// ---------------------------------------------------------------------------
// 1. ColorSpec interchange shape (single source: docs-runtime)
// ---------------------------------------------------------------------------
console.log('1. Verifying intent serializes to the resolver interchange shape...');
const { store: s1 } = captureStore();
s1.setBrandColor('#6750A4');
s1.setPresence('Strong');
s1.setDeriveColors(false);

const serialized = serializeIntent((s1 as any).intent);
const parsed = JSON.parse(serialized);
assert.deepStrictEqual(parsed.identity.brandColor, {
  type: 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex',
  value: '#6750A4',
});
assert.strictEqual(parsed.identity.presence, 'Strong');
assert.strictEqual(parsed.identity.deriveColors, false);

// nulls are stripped (absent !== null for resolver)
s1.setBrandColor(null);
const parsed2 = JSON.parse(serializeIntent((s1 as any).intent));
assert.strictEqual(parsed2.identity.brandColor, undefined, 'Null brandColor must be stripped from JSON');
assert.strictEqual(parsed2.identity.presence, 'Strong');
console.log('   ✅ ColorSpec Hex discriminator + null stripping match resolver intake.\n');

// ---------------------------------------------------------------------------
// 2. Mood knobs with explicit null (unset / inherit preset)
// ---------------------------------------------------------------------------
console.log('2. Verifying mood knobs preserve null as explicit unset...');
const { store: s2 } = captureStore();
s2.setMoodPreset('Bold');
s2.setKnob('warmth', 0.5);
s2.setKnob('chroma', null);

const k = JSON.parse(serializeIntent((s2 as any).intent));
assert.strictEqual(k.mood.preset, 'Bold');
assert.strictEqual(k.mood.knobs.warmth, 0.5);
assert.strictEqual(k.mood.knobs.chroma, null, 'null knob must serialize (inherit preset)');
console.log('   ✅ Null knob preserved; preset set independently.\n');

// ---------------------------------------------------------------------------
// 3. Domains & interactions as PascalCase enum strings
// ---------------------------------------------------------------------------
console.log('3. Verifying domain/interaction enum serialization...');
const { store: s3 } = captureStore();
s3.setDomains(['Finance', 'Health']);
s3.setInteractions(['AuthOnboarding', 'FormsEntry']);
const d = JSON.parse(serializeIntent((s3 as any).intent));
assert.deepStrictEqual(d.domain.domains, ['Finance', 'Health']);
assert.deepStrictEqual(d.domain.interactions, ['AuthOnboarding', 'FormsEntry']);
console.log('   ✅ Domains and interactions serialize as enum name strings.\n');

// ---------------------------------------------------------------------------
// 4. Full intent round-trips against the real resolver (docs-runtime)
// ---------------------------------------------------------------------------
console.log('4. Verifying a full intent resolves against the real docs-runtime artifact...');
const runtimePath = path.resolve(
  __dirname,
  '../../docs-runtime/build/dist/js/productionLibrary/Basis-docs-runtime.js',
);
assert(
  fs.existsSync(runtimePath),
  `docs-runtime JS artifact must exist at ${runtimePath}. Run ./gradlew :docs-runtime:compileKotlinJs first.`,
);
const runtime = require(runtimePath);
const api = runtime.io.github.alph_a07.basis.docs.runtime;
assert.equal(typeof api.resolveWithPrefix, 'function');

const Q = 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex';
const FFR = 'io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef.Catalog';
const fullIntent = {
  identity: {
    brandColor: { type: Q, value: '#2ea043' },
    presence: 'Strong',
    deriveColors: true,
    supportingColors: [{ type: Q, value: '#388E3C' }],
    typography: { structure: { type: FFR, id: 'inter' } },
  },
  mood: { preset: 'Bold', knobs: { warmth: 0.2, chroma: -0.5 } },
  domain: { domains: ['Finance'], interactions: ['AuthOnboarding'] },
  control: { mode: { preferred: 'Light', targets: ['Light', 'Dark'] } },
};
const resJson = api.resolveWithPrefix(JSON.stringify(fullIntent), 'b');
const res = JSON.parse(resJson);
assert.strictEqual(res.ok, true, 'Full intent must resolve ok:true');
assert.ok(res.tokens.light['--b-color-brand-primary'], 'Must emit brand primary token');
assert.strictEqual(res.report.modes.length, 2, 'Must emit Light + Dark modes');
console.log('   ✅ Full intent resolves; light/dark token maps populated from real resolver.\n');

// ---------------------------------------------------------------------------
// 5. Violations surfaced on the resolver path (4 supporting colors -> Rejected report)
// ---------------------------------------------------------------------------
console.log('5. Verifying store intent serializes 4 supporting colors; resolver reports Rejections...');
const { store: s5 } = captureStore();
s5.setBrandColor('#2ea043');
s5.addSupportingColor('#111111');
s5.addSupportingColor('#222222');
s5.addSupportingColor('#333333');
s5.addSupportingColor('#444444');

const badRes = JSON.parse(api.resolveWithPrefix(JSON.stringify((s5 as any).intent), 'b'));
assert.strictEqual(badRes.ok, true, '4 supporting colors: resolver clamps to 3 and stays ok:true (extras rejected in report)');
const rejected = badRes.report.entries.filter((e: { status: string }) => e.status === 'Rejected');
assert.ok(rejected.length >= 1, 'Should report at least one Rejected entry for the 4th supporting color');
console.log('   ✅ 4 supporting colors serialize; resolver reports Rejections:', rejected.length, '\n');

// ---------------------------------------------------------------------------
// 6. Malformed JSON surfaces {ok:false, violations} (no throw)
// ---------------------------------------------------------------------------
console.log('6. Verifying malformed JSON yields {ok:false, violations} without throwing...');
const malformedRes = JSON.parse(api.resolveWithPrefix('{not valid json', 'b'));
assert.strictEqual(malformedRes.ok, false, 'Malformed JSON must resolve ok:false');
assert.ok(malformedRes.violations?.length >= 1, 'Malformed JSON must carry violations');
console.log('   ✅ Malformed JSON -> {ok:false, violations:[...]} (no throw).\n');

// ---------------------------------------------------------------------------
// 7. applyControlChange reduces events by path/name
// ---------------------------------------------------------------------------
console.log('7. Verifying applyControlChange dispatch-by-path reduction...');
const base: IntentState = { mood: { knobs: {} } };
const r1 = applyControlChange(base, 'mood.knobs', 'warmth', 0.8);
assert.strictEqual(r1.mood?.knobs?.warmth, 0.8);
const r2 = applyControlChange(r1, 'mood.knobs', 'chroma', null);
assert.strictEqual(r2.mood?.knobs?.chroma, null);
const r3 = applyControlChange(r2, 'identity', 'presence', 'Dominant');
assert.strictEqual(r3.identity?.presence, 'Dominant');
const r4 = applyControlChange(r3, 'identity', 'brandColor', '#ff0000');
assert.deepStrictEqual(r4.identity?.brandColor, {
  type: 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex',
  value: '#ff0000',
});
console.log('   ✅ Path-based dispatch handles knobs, presence, brandColor, and null.\n');

console.log('🎉 All P2.5 intent store requirements passed.');
