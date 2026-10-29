import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert';
import { JSDOM } from 'jsdom';
import axe from 'axe-core';
import { loadIntentDoc } from '../src/lib/load-intent.js';
import { deriveControlSpecs } from '../src/lib/control-generator.js';
import { studioUiConfig } from '../src/config/studio-ui.js';
import type { IntentDocument } from '@basis/docs-model';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');

console.log('Testing P2.1 Control Generator, Specs & UI Components...');

// ---------------------------------------------------------------------------
// 1. Derivation from generated intent.json
// ---------------------------------------------------------------------------
console.log('1. Verifying control specs derivation from real intent facts...');
const intentDoc = loadIntentDoc();
const specs = deriveControlSpecs(intentDoc, studioUiConfig);

// Verify control types
assert.strictEqual(specs.identity.brandColor.type, 'color', 'brandColor must be color control');
assert.strictEqual(specs.identity.supportingColors.type, 'color-list', 'supportingColors must be color-list control');
assert.strictEqual(specs.identity.supportingColors.maxItems, 3, 'supportingColors maxItems must be 3');
assert.strictEqual(specs.identity.presence.type, 'single-choice', 'presence must be single-choice control');
assert.strictEqual(specs.identity.presence.options.length, 4, 'presence must have 4 options');
assert.strictEqual(specs.identity.deriveColors.type, 'toggle', 'deriveColors must be toggle control');
assert.strictEqual(specs.identity.deriveColors.defaultValue, true, 'deriveColors default must be true');

assert.strictEqual(specs.mood.preset.type, 'single-choice', 'preset must be single-choice control');
assert.strictEqual(specs.mood.preset.options.length, 7, 'preset must have 7 options');

assert.strictEqual(specs.mood.knobs.length, 8, 'must have 8 mood knob specs');
for (const knob of specs.mood.knobs) {
  assert.strictEqual(knob.type, 'knob', `Knob ${knob.id} must have type 'knob'`);
  assert.strictEqual(knob.min, -1.0, `Knob ${knob.id} min must be -1.0`);
  assert.strictEqual(knob.max, 1.0, `Knob ${knob.id} max must be 1.0`);
  assert.strictEqual(knob.step, 0.05, `Knob ${knob.id} step must be 0.05`);
  assert.strictEqual(knob.defaultValue, null, `Knob ${knob.id} must have defaultValue null (unset / inherit preset)`);
  assert(knob.negativeLabel.length > 0, `Knob ${knob.id} must have negativeLabel`);
  assert(knob.positiveLabel.length > 0, `Knob ${knob.id} must have positiveLabel`);
  assert(knob.summary.length > 0, `Knob ${knob.id} must have KDoc summary`);
}

assert.strictEqual(specs.domain.domains.type, 'multi-choice', 'domains must be multi-choice');
assert.strictEqual(specs.domain.domains.options.length, 10, 'domains must have 10 options');
assert.strictEqual(specs.domain.interactions.type, 'multi-choice', 'interactions must be multi-choice');
assert.strictEqual(specs.domain.interactions.options.length, 11, 'interactions must have 11 options');

console.log('   ✅ All 6 control types correctly derived from real intent facts.');

// ---------------------------------------------------------------------------
// 2. Acceptance test: adding an entry (12th interaction) renders new chip without code change
// ---------------------------------------------------------------------------
console.log('2. Verifying dynamic derivation when adding a 12th interaction...');
const modifiedIntent: IntentDocument = JSON.parse(JSON.stringify(intentDoc));
const twelfthInteraction = {
  id: 'LiveStreaming',
  label: 'Live Streaming',
  summary: 'Real-time broadcast and interactive viewer participation.',
};
// Add 12th interaction to test data
(modifiedIntent.domain.interactions as any).push(twelfthInteraction);

const dynamicSpecs = deriveControlSpecs(modifiedIntent, studioUiConfig);
assert.strictEqual(
  dynamicSpecs.domain.interactions.options.length,
  12,
  'Interactions control spec must dynamically include the 12th interaction'
);
const lastOpt = dynamicSpecs.domain.interactions.options[11];
assert.strictEqual(lastOpt.id, 'LiveStreaming');
assert.strictEqual(lastOpt.label, 'Live Streaming');
assert.strictEqual(lastOpt.summary, twelfthInteraction.summary);
console.log('   ✅ Adding a 12th interaction dynamically derives 12 chips with no site code change.');

// ---------------------------------------------------------------------------
// 3. Inspect built studio page HTML
// ---------------------------------------------------------------------------
console.log('3. Inspecting built studio HTML in dist/studio/index.html...');
const studioHtmlPath = path.join(distDir, 'studio/index.html');
assert(fs.existsSync(studioHtmlPath), `Studio HTML must exist at ${studioHtmlPath}`);

const studioHtml = fs.readFileSync(studioHtmlPath, 'utf-8');
const dom = new JSDOM(studioHtml, { runScripts: 'outside-only' });
const doc = dom.window.document;

// Verify ChoiceChips presence
const presenceRadios = doc.querySelectorAll('#control-presence .choice-chip[role="radio"]');
assert.strictEqual(presenceRadios.length, 4, 'Presence must render 4 radio chips');

const presetRadios = doc.querySelectorAll('#control-preset .choice-chip[role="radio"]');
assert.strictEqual(presetRadios.length, 7, 'Preset must render 7 radio chips');

const domainCheckboxes = doc.querySelectorAll('#control-domains .choice-chip[role="checkbox"]');
assert.strictEqual(domainCheckboxes.length, 10, 'Domains must render 10 checkbox chips');

const interactionCheckboxes = doc.querySelectorAll('#control-interactions .choice-chip[role="checkbox"]');
assert.strictEqual(interactionCheckboxes.length, 11, 'Interactions must render 11 checkbox chips');

// ---------------------------------------------------------------------------
// 4. Verify explicit "unset (inherit preset)" state on Knob control
// ---------------------------------------------------------------------------
console.log('4. Verifying Knob explicit unset (inherit preset) state...');
const knobFields = doc.querySelectorAll('.knob-slider-field');
assert.strictEqual(knobFields.length, 8, 'Studio must render 8 knob sliders');

knobFields.forEach((knobEl) => {
  const isUnset = knobEl.getAttribute('data-is-unset');
  assert.strictEqual(isUnset, 'true', 'Default knob state must be is-unset="true"');
  assert(knobEl.classList.contains('is-unset'), 'Knob container must have is-unset class');

  const readout = knobEl.querySelector('.knob-value-readout');
  assert(readout && readout.textContent?.includes('Inherit'), 'Readout must show Inherit when unset');

  const inheritBtn = knobEl.querySelector('.knob-inherit-btn') as HTMLButtonElement | null;
  assert(inheritBtn, 'Inherit button must exist');
  assert.strictEqual(inheritBtn.getAttribute('aria-pressed'), 'true', 'Inherit button aria-pressed must be true when unset');
  assert(inheritBtn.disabled, 'Inherit button should be disabled when already unset');

  const range = knobEl.querySelector('.knob-range-input') as HTMLInputElement | null;
  assert(range, 'Range input must exist');
  assert.strictEqual(range.getAttribute('min'), '-1', 'Range min must be -1');
  assert.strictEqual(range.getAttribute('max'), '1', 'Range max must be 1');
  assert.strictEqual(range.getAttribute('step'), '0.05', 'Range step must be 0.05');

  const edgeNegative = knobEl.querySelector('.edge-negative');
  const edgePositive = knobEl.querySelector('.edge-positive');
  assert(edgeNegative && (edgeNegative.textContent?.length ?? 0) > 0, 'Negative edge label must be present');
  assert(edgePositive && (edgePositive.textContent?.length ?? 0) > 0, 'Positive edge label must be present');
});
console.log('   ✅ All 8 knobs verify explicit unset (inherit preset) state and directional labels.');

// ---------------------------------------------------------------------------
// 5. Verify tooltips show KDoc summary
// ---------------------------------------------------------------------------
console.log('5. Verifying tooltips display extracted KDoc summaries...');
// Check presence tooltips
intentDoc.identity.presence.forEach((p) => {
  const chip = doc.querySelector(`#control-presence-opt-${p.id}`);
  assert(chip, `Chip for presence ${p.id} must exist`);
  const tooltipId = chip.getAttribute('aria-describedby');
  assert(tooltipId, `Chip ${p.id} must have aria-describedby`);
  const tooltipEl = doc.getElementById(tooltipId);
  assert(tooltipEl, `Tooltip element ${tooltipId} must exist`);
  assert.strictEqual(tooltipEl.textContent?.trim(), p.summary, `Tooltip for presence ${p.id} must equal KDoc summary`);
});

// Check knob tooltips
intentDoc.mood.knobs.forEach((k) => {
  const knobEl = doc.getElementById(`knob-${k.id}`);
  assert(knobEl, `Knob ${k.id} must exist`);
  const tooltipEl = knobEl.querySelector('.knob-tooltip');
  assert(tooltipEl, `Tooltip for knob ${k.id} must exist`);
  assert.strictEqual(tooltipEl.textContent?.trim(), k.summary, `Knob ${k.id} tooltip must equal KDoc summary`);
});

// Check interaction tooltips
intentDoc.domain.interactions.forEach((i) => {
  const chip = doc.querySelector(`#control-interactions-opt-${i.id}`);
  assert(chip, `Chip for interaction ${i.id} must exist`);
  const tooltipId = chip.getAttribute('aria-describedby');
  assert(tooltipId, `Chip ${i.id} must have aria-describedby`);
  const tooltipEl = doc.getElementById(tooltipId);
  assert(tooltipEl, `Tooltip element ${tooltipId} must exist`);
  assert.strictEqual(tooltipEl.textContent?.trim(), i.summary, `Tooltip for interaction ${i.id} must equal KDoc summary`);
});
console.log('   ✅ Tooltips across all controls accurately display real KDoc summaries.');

// ---------------------------------------------------------------------------
// 6. Verify keyboard operability
// ---------------------------------------------------------------------------
console.log('6. Verifying keyboard operability attributes...');
// Radiogroup has roving tabindex: selected or first is 0, rest is -1
const presenceChips = Array.from(doc.querySelectorAll('#control-presence .choice-chip'));
const tabZeroCount = presenceChips.filter((c) => (c as HTMLElement).tabIndex === 0).length;
assert.strictEqual(tabZeroCount, 1, 'Radiogroup must have exactly one tabindex=0 item for keyboard navigation');

// Checkbox group has tabindex 0 on all items
const domainChips = Array.from(doc.querySelectorAll('#control-domains .choice-chip'));
domainChips.forEach((c) => {
  assert.strictEqual((c as HTMLElement).tabIndex, 0, 'Every checkbox chip must have tabindex=0');
});

// Switch toggle has role="switch" and aria-checked
const switchBtn = doc.querySelector('#toggle-deriveColors-switch');
assert(switchBtn, 'deriveColors switch must exist');
assert.strictEqual(switchBtn.getAttribute('role'), 'switch');
assert.strictEqual(switchBtn.getAttribute('aria-checked'), 'true');
assert.strictEqual((switchBtn as HTMLElement).tabIndex, 0);

console.log('   ✅ Keyboard navigation attributes (tabindex, roving focus, ARIA roles) verified.');

// ---------------------------------------------------------------------------
// 7. Run Axe accessibility audit on the controls in Studio page
// ---------------------------------------------------------------------------
console.log('7. Running Axe accessibility audit on Studio page...');
const axeResults = await axe.run(doc.documentElement, {
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
  },
});

if (axeResults.violations.length > 0) {
  console.error('Axe violations found:');
  axeResults.violations.forEach((v) => {
    console.error(`- [${v.id}] ${v.help}: ${v.nodes.map((n) => n.html).join(', ')}`);
  });
  assert.strictEqual(axeResults.violations.length, 0, 'Axe audit must report zero violations');
}
console.log('   ✅ Axe accessibility audit passed with 0 violations!');

console.log('\n🎉 All P2.1 Control Generator requirements passed successfully!\n');
