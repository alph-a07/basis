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

console.log('\n🎉 P2.1 Control Generator specifications passed successfully!\n');
