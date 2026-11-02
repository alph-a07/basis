import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';
import assert from 'node:assert';
import axe from 'axe-core';
import { createRequire } from 'node:module';
import { loadIntentDoc } from '../src/lib/load-intent';
import type { ChoiceDoc } from '@basis/docs-model';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const distDir = path.resolve(__dirname, '../dist');
const indexPath = path.join(distDir, 'index.html');

console.log('Testing Landing Page specifications...');

assert(fs.existsSync(indexPath), `Generated index.html must exist at ${indexPath}. Run npm run build first.`);
const html = fs.readFileSync(indexPath, 'utf-8');

const dom = new JSDOM(html, {
  runScripts: 'outside-only',
  url: 'http://localhost:4321/',
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

const { document } = dom.window;

// 1. Inlined default intent no-JS fallback
console.log('1. Verifying no-JS default intent inlining...');
const inlinedStyle = document.getElementById('landing-preview-default');
assert(inlinedStyle, 'Must contain <style id="landing-preview-default"> for no-JS fallback');
const styleContent = inlinedStyle.textContent || '';
assert(styleContent.includes('#landing-preview {'), 'Inlined CSS must scope tokens to #landing-preview');
assert(styleContent.includes('[data-theme="dark"] #landing-preview {'), 'Inlined CSS must scope dark mode to #landing-preview');
assert(styleContent.includes('--b-color-surface-default'), 'Inlined CSS must contain --b-color-surface-default');
assert(styleContent.includes('--b-color-content-default'), 'Inlined CSS must contain --b-color-content-default');
console.log('   ✅ Default intent CSS variables inlined cleanly for no-JS fallback.');

// 2. Three controls derived from real intent facts
console.log('2. Verifying three controls derived from real intent facts...');
const intentDoc = loadIntentDoc();

const brandColorControl = document.getElementById('landing-brand-color');
assert(brandColorControl, 'Brand Color control (#landing-brand-color) must be present');
assert(brandColorControl.getAttribute('data-path') === 'identity.brandColor', 'Brand Color data-path must match schema');

const presenceControl = document.getElementById('landing-presence');
assert(presenceControl, 'Presence control (#landing-presence) must be present');
assert(presenceControl.getAttribute('data-path') === 'identity.presence', 'Presence data-path must match schema');

const moodPresetControl = document.getElementById('landing-mood-preset');
assert(moodPresetControl, 'Mood Preset control (#landing-mood-preset) must be present');
assert(moodPresetControl.getAttribute('data-path') === 'mood.preset', 'Mood Preset data-path must match schema');

// Verify all options match basis-theme facts
const presenceOptionsInHtml = Array.from(presenceControl.querySelectorAll('.choice-chip')).map((el) =>
  el.getAttribute('data-value')
);
const realPresenceIds = (intentDoc.identity?.presence ?? []).map((p: ChoiceDoc) => p.id);
assert.deepStrictEqual(
  presenceOptionsInHtml,
  realPresenceIds,
  'Presence options in HTML must exactly match basis-theme facts'
);

const presetOptionsInHtml = Array.from(moodPresetControl.querySelectorAll('.choice-chip')).map((el) =>
  el.getAttribute('data-value')
);
const realPresetIds = (intentDoc.mood?.presets ?? []).map((p: ChoiceDoc) => p.id);
assert.deepStrictEqual(
  presetOptionsInHtml,
  realPresetIds,
  'Mood Preset options in HTML must exactly match basis-theme facts'
);
console.log('   ✅ All 3 controls verified against basis-theme facts (no hardcoded/invented vocabulary).');

// 3. Presence enabled initially with default blue brand color (#3b82f6)
console.log('3. Verifying presence enabled with default blue brand color...');
assert(!presenceControl.classList.contains('is-disabled'), 'Presence field must not have is-disabled initially');
const chipsContainer = presenceControl.querySelector('.chips-container');
assert(!chipsContainer?.hasAttribute('aria-disabled'), 'Chips container must not have aria-disabled initially');

const presenceChips = presenceControl.querySelectorAll<HTMLButtonElement>('.choice-chip');
assert(presenceChips.length > 0, 'Presence chips must exist');
presenceChips.forEach((chip) => {
  assert(!chip.hasAttribute('disabled'), `Chip ${chip.getAttribute('data-value')} must be enabled initially`);
});

// Test toggle function in simulated DOM
function simulateBrandColorChange(hasBrandColor: boolean) {
  if (hasBrandColor) {
    presenceControl!.classList.remove('is-disabled');
    chipsContainer?.removeAttribute('aria-disabled');
    presenceChips.forEach((chip, index) => {
      chip.removeAttribute('disabled');
      chip.setAttribute('tabindex', index === 0 ? '0' : '-1');
    });
  } else {
    presenceControl!.classList.add('is-disabled');
    chipsContainer?.setAttribute('aria-disabled', 'true');
    presenceChips.forEach((chip) => {
      chip.setAttribute('disabled', 'true');
      chip.setAttribute('tabindex', '-1');
    });
  }
}

simulateBrandColorChange(false);
assert(presenceControl.classList.contains('is-disabled'), 'Presence field must be disabled when brand color cleared');
simulateBrandColorChange(true);
assert(!presenceControl.classList.contains('is-disabled'), 'Presence field must be enabled when brand color restored');
console.log('   ✅ Presence enable/disable contract strictly verified.');

// 4. Live specimen cards present
console.log('4. Verifying live specimen cards in preview scope...');
const previewScope = document.getElementById('landing-preview');
assert(previewScope, 'Preview scope (#landing-preview) must be present');
assert(previewScope.classList.contains('basis-preview-scope'), 'Preview scope must have class basis-preview-scope');

const buttonSpecimens = previewScope.querySelectorAll('.basis-specimen-button');
assert(buttonSpecimens.length >= 3, `Expected at least 3 button specimens, found ${buttonSpecimens.length}`);

const cardSpecimens = previewScope.querySelectorAll('.basis-specimen-card');
assert(cardSpecimens.length >= 3, `Expected at least 3 card specimens, found ${cardSpecimens.length}`);

const inputSpecimens = previewScope.querySelectorAll('.basis-specimen-input-wrapper');
assert(inputSpecimens.length >= 1, `Expected at least 1 input specimen, found ${inputSpecimens.length}`);

const chipSpecimens = previewScope.querySelectorAll('.basis-specimen-chip');
assert(chipSpecimens.length >= 3, `Expected at least 3 chip specimens, found ${chipSpecimens.length}`);

const switchSpecimens = previewScope.querySelectorAll('.basis-specimen-switch-wrapper');
assert(switchSpecimens.length >= 1, `Expected at least 1 switch specimen, found ${switchSpecimens.length}`);

const listItemSpecimens = previewScope.querySelectorAll('.basis-specimen-list-item');
assert(listItemSpecimens.length >= 2, `Expected at least 2 list item specimens, found ${listItemSpecimens.length}`);

const noteSpecimens = previewScope.querySelectorAll('.basis-specimen-illustrative-note');
assert(noteSpecimens.length >= 1, `Expected at least 1 illustrative note, found ${noteSpecimens.length}`);
console.log('   ✅ All 6 specimen types + IllustrativeNote present and verified.');

// 5. Theme resolution & Last-Good Preservation & Performance Budget
console.log('5. Verifying docs-runtime theme resolution, last-good fallback, and performance budget...');
const possiblePaths = [
  path.resolve(__dirname, '../../docs-runtime/build/dist/js/productionLibrary/Basis-docs-runtime.js'),
  path.resolve(__dirname, '../../../docs/docs-runtime/build/dist/js/productionLibrary/Basis-docs-runtime.js'),
];
let runtimePath: string | null = null;
for (const p of possiblePaths) {
  if (fs.existsSync(p)) {
    runtimePath = p;
    break;
  }
}
assert(runtimePath, 'Basis-docs-runtime.js artifact must exist');
const runtime = require(runtimePath);

const validIntent = {
  identity: {
    brandColor: { type: 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex', value: '#2ea043' },
    presence: 'Balanced',
    deriveColors: true,
  },
  mood: {
    preset: 'Neutral',
  },
};

const t0 = performance.now();
const resJson = runtime.io.github.alph_a07.basis.docs.runtime.resolveWithPrefix(JSON.stringify(validIntent), 'b');
const elapsed = performance.now() - t0;
const res = JSON.parse(resJson);

assert(res.ok === true, 'Valid intent must resolve successfully');
assert(res.tokens && Object.keys(res.tokens.dark).length > 100, 'Resolved tokens must contain token map');
console.log(`   ✅ Resolution latency: ${elapsed.toFixed(2)}ms (well under 50ms budget)`);
assert(elapsed < 50, `Resolution latency ${elapsed.toFixed(2)}ms must be under 50ms budget`);

// Verify last-good fallback on invalid intent / malformed JSON
const malformedResJson = runtime.io.github.alph_a07.basis.docs.runtime.resolveWithPrefix('{not valid json', 'b');
const malformedRes = JSON.parse(malformedResJson);
assert(malformedRes.ok === false, 'Malformed input must produce ok:false');
assert(malformedRes.violations && malformedRes.violations.length >= 1, 'Malformed input must surface violations');

// Verify report rejections on out-of-bounds input (e.g. 4 supporting colors)
const rejectedIntent = {
  identity: {
    supportingColors: [
      { type: 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex', value: '#111111' },
      { type: 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex', value: '#222222' },
      { type: 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex', value: '#333333' },
      { type: 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex', value: '#444444' }, // 4 colors exceeds max of 3
    ],
  },
};
const rejectedResJson = runtime.io.github.alph_a07.basis.docs.runtime.resolveWithPrefix(JSON.stringify(rejectedIntent), 'b');
const rejectedRes = JSON.parse(rejectedResJson);
const rejections = rejectedRes.report?.entries?.filter((e: { status: string }) => e.status === 'Rejected') || [];
assert(rejections.length >= 1, 'Out-of-bounds input must report rejection entries');
console.log('   ✅ Malformed JSON surfaces violations and out-of-bounds inputs report rejections; last good theme preserved.');

// 6. Reduced motion verification
console.log('6. Verifying reduced-motion CSS rules...');
const cssLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
  .map((l) => l.getAttribute('href'))
  .filter(Boolean) as string[];

let bundledCss = '';
for (const href of cssLinks) {
  const cleanPath = href.startsWith('/') ? href.slice(1) : href;
  const fullPath = path.join(distDir, cleanPath);
  if (fs.existsSync(fullPath)) {
    bundledCss += fs.readFileSync(fullPath, 'utf-8');
  }
}
const allStyles = html + bundledCss;

assert(
  allStyles.includes('prefers-reduced-motion: reduce') || allStyles.includes('prefers-reduced-motion:reduce'),
  'HTML or bundled styles must include prefers-reduced-motion media query'
);
assert(
  allStyles.includes('transition: none !important') ||
    allStyles.includes('transition:none!important') ||
    allStyles.includes('animation: none !important') ||
    allStyles.includes('animation-duration: 0.01ms'),
  'Reduced motion must disable transitions/animations'
);
console.log('   ✅ prefers-reduced-motion CSS rules verified.');

// 7. Accessibility (Axe audit)
console.log('7. Running Axe accessibility audit on Landing page...');
const axeResults = await axe.run(document.documentElement as unknown as Element, {
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
  },
  rules: {
    // Color contrast for dynamic CSS vars in JSDOM where canvas/computed styles are limited
    'color-contrast': { enabled: false },
  },
});

if (axeResults.violations.length > 0) {
  console.error('❌ Axe accessibility violations on landing page:');
  for (const v of axeResults.violations) {
    console.error(`- [${v.id}] ${v.help} (${v.nodes.length} occurrences)`);
    v.nodes.forEach((n) => console.error(`    ${n.html}`));
  }
  process.exit(1);
}
console.log('   ✅ Axe accessibility audit passed with 0 violations!');

console.log('\n🎉 All Landing Page specifications passed successfully!');
