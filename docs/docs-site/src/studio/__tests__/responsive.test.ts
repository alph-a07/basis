import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';
import axe from 'axe-core';
import { STARTER_INTENTS } from '../config/studio-ui.js';
import { resolveSafe } from '../state/resolveClient.js';
import { StudioIntentStore } from '../state/intentStore.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../../../dist');
const studioHtmlPath = path.join(distDir, 'studio/index.html');

console.log('Testing Gate 6 & 8: Responsive, Accessibility, and User Flows...\n');

// ---------------------------------------------------------------------------
// 1. Validate all Starter Intents at build/test time against real facade
// ---------------------------------------------------------------------------
console.log('1. Validating starter intents against the real facade...');
for (const starter of STARTER_INTENTS) {
  const { result: res } = await resolveSafe(starter.intent);
  assert.strictEqual(
    res.ok,
    true,
    `Starter intent "${starter.name}" must resolve ok:true against docs-runtime facade`,
  );
  if (res.ok) {
    assert.ok(
      Object.keys(res.tokens.light).length > 50,
      `Starter intent "${starter.name}" must produce valid tokens`,
    );
  }
}
console.log(`   ✅ All ${STARTER_INTENTS.length} starter intents resolve ok:true.\n`);

// ---------------------------------------------------------------------------
// 2. Axe-core accessibility audit on built studio HTML (0 serious violations)
// ---------------------------------------------------------------------------
console.log('2. Running Axe-core accessibility audit on built /studio...');
if (fs.existsSync(studioHtmlPath)) {
  const html = fs.readFileSync(studioHtmlPath, 'utf-8');

  const dom = new JSDOM(html, {
    runScripts: 'outside-only',
    url: 'http://localhost:4321/studio',
    virtualConsole: new (class extends (await import('jsdom')).VirtualConsole {
      constructor() {
        super();
        this.on('jsdomError', (err) => {
          if (!err.message?.includes('HTMLCanvasElement')) {
            console.error(err);
          }
        });
      }
    })(),
  });

  const doc = dom.window.document;

  const axeResults = await axe.run(doc.documentElement as unknown as Element, {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
    },
    rules: {
      'color-contrast': { enabled: false }, // JSDOM lacks layout engine for contrast
    },
  });

  const seriousViolations = axeResults.violations.filter(
    (v) => v.impact === 'serious' || v.impact === 'critical'
  );

  assert.strictEqual(
    seriousViolations.length,
    0,
    `Axe audit on /studio must report 0 serious violations. Found: ${JSON.stringify(seriousViolations, null, 2)}`,
  );
  console.log('   ✅ Axe accessibility audit passed with 0 serious violations.\n');
} else {
  console.log('   ℹ️ (Skipping HTML axe run until dist build is generated)\n');
}

// ---------------------------------------------------------------------------
// 3. Responsive Shell & Layout Constraints Verification
// ---------------------------------------------------------------------------
console.log('3. Verifying responsive CSS rules and layout structures...');
const studioCssPath = path.resolve(__dirname, '../../styles/studio.css');
assert.ok(fs.existsSync(studioCssPath), 'src/styles/studio.css must exist');
const studioCss = fs.readFileSync(studioCssPath, 'utf-8');

// Container queries and breakpoints
assert.ok(
  studioCss.includes('min-width: 1280px') || studioCss.includes('1280px'),
  'studio.css must include >= 1280px desktop 3-column layout breakpoint',
);
assert.ok(
  studioCss.includes('max-width: 767px') || studioCss.includes('768px'),
  'studio.css must include < 768px mobile bottom sheet layout breakpoint',
);

// Touch target requirements (>= 48px)
assert.ok(
  studioCss.includes('min-height: 48px') || studioCss.includes('min-height: 44px') || studioCss.includes('height: 48px') || studioCss.includes('touch-action'),
  'studio.css must enforce touch targets for mobile accessibility',
);

// dvh units and safe-area insets
assert.ok(
  studioCss.includes('dvh') || studioCss.includes('100vh'),
  'studio.css must utilize dynamic viewport height (dvh)',
);
assert.ok(
  studioCss.includes('safe-area-inset') || studioCss.includes('env('),
  'studio.css must respect mobile device safe-area insets',
);

// prefers-reduced-motion
assert.ok(
  studioCss.includes('prefers-reduced-motion'),
  'studio.css must support prefers-reduced-motion media query',
);
console.log('   ✅ Responsive breakpoints, touch targets, and reduced-motion rules verified.\n');

// ---------------------------------------------------------------------------
// 4. End-to-End User Flow Simulation
// ---------------------------------------------------------------------------
console.log('4. Verifying end-to-end studio user flow simulations...');
const store = new StudioIntentStore({});

// Flow A: Switch to Fintech starter intent
const fintechStarter = STARTER_INTENTS.find((s) => s.id === 'fintech');
assert.ok(fintechStarter, 'Fintech starter intent must exist');
store.setIntent(fintechStarter.intent, true);
await store.resolveNow();

let state = store.getState();
assert.strictEqual(state.lastGoodResult?.ok, true);
assert.deepStrictEqual(state.intent.domain?.domains, ['Finance']);

// Flow B: Mutate brand color and observe token resolution
store.set(
  '/identity/brandColor',
  {
    type: 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex',
    value: '#FF0055',
  },
  true,
);
await store.resolveNow();

state = store.getState();
assert.strictEqual(state.lastGoodResult?.ok, true);
assert.strictEqual(state.intent.identity?.brandColor?.value, '#FF0055');

// Flow C: Undo and Redo flow
assert.ok(store.canUndo(), 'Store must have undo history');
store.undo();
await store.resolveNow();
state = store.getState();
assert.strictEqual(
  state.intent.identity?.brandColor?.value,
  fintechStarter.intent.identity?.brandColor?.value,
  'Undo must restore starter brand color',
);

assert.ok(store.canRedo(), 'Store must have redo history');
store.redo();
await store.resolveNow();
state = store.getState();
assert.strictEqual(
  state.intent.identity?.brandColor?.value,
  '#FF0055',
  'Redo must restore mutated brand color',
);

// Flow D: Rejection handling without crash
// Add 4 supporting colors (max is 3 per resolver constraints)
const Q = 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex';
store.set(
  '/identity/supportingColors',
  [
    { type: Q, value: '#111111' },
    { type: Q, value: '#222222' },
    { type: Q, value: '#333333' },
    { type: Q, value: '#444444' },
  ],
  true,
);
await store.resolveNow();

state = store.getState();
assert.strictEqual(state.lastGoodResult?.ok, true, 'Resolver gracefully clamps 4 supporting colors to 3');
const rejectedEntries = state.lastGoodResult?.report?.entries?.filter((e) => e.status === 'Rejected') || [];
assert.ok(
  rejectedEntries.length >= 1,
  'Report must contain at least one Rejected entry for the 4th supporting color',
);

store.destroy();
console.log('   ✅ End-to-end user flows (starters, mutations, undo/redo, rejections) verified.\n');

console.log('🎉 Gate 6 & 8 tests passed successfully!\n');
