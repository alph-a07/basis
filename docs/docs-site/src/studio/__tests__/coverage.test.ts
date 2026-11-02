import assert from 'node:assert';
import { loadIntentDoc } from '../../lib/load-intent.js';
import { buildControlRegistry } from '../controls/registry.js';

console.log('Testing Coverage (Gate 3: walk intent.json leaves, fail if any leaf lacks control)...\n');

const intentDoc = loadIntentDoc();
assert(intentDoc, 'intent.json must exist');

const registry = buildControlRegistry(intentDoc);
assert(registry.size > 0, 'Registry must not be empty');

console.log(`Loaded ${registry.size} control definitions from intent.json.\n`);

// 1. Identity fields
console.log('1. Verifying Identity axis leaf coverage...');
const identityFields = intentDoc.identity?.fields || [];
assert(identityFields.length >= 5, 'Identity axis must declare at least 5 fields');

for (const f of identityFields) {
  const pointer = `/identity/${f.id}`;
  const ctrl = registry.get(pointer);
  assert(ctrl, `Missing control for identity leaf: ${pointer}`);
  assert.strictEqual(ctrl.path, pointer);
  assert(ctrl.label && ctrl.label.length > 0, `Control ${pointer} must have a label`);
  assert(ctrl.summary && ctrl.summary.length > 0, `Control ${pointer} must have a KDoc summary`);
  assert(ctrl.mutations && ctrl.mutations.length >= 2, `Control ${pointer} must define >= 2 mutations`);
  console.log(`   ✅ Leaf covered: ${pointer} (${ctrl.label})`);
}

// 2. Mood Preset & Knobs
console.log('\n2. Verifying Mood axis leaf coverage (Preset + 8 Knobs)...');
const presetCtrl = registry.get('/mood/preset');
assert(presetCtrl, 'Missing control for /mood/preset');
assert.strictEqual(presetCtrl.choices?.length, 7, 'Mood preset must have exactly 7 choices');
console.log(`   ✅ Leaf covered: /mood/preset (7 presets)`);

const knobs = intentDoc.mood?.knobs || [];
assert.strictEqual(knobs.length, 8, 'Mood knobs must contain all 8 axes');
for (const k of knobs) {
  const pointer = `/mood/knobs/${k.id}`;
  const ctrl = registry.get(pointer);
  assert(ctrl, `Missing control for knob leaf: ${pointer}`);
  assert(ctrl.negativeLabel, `Knob ${pointer} must have negativeLabel`);
  assert(ctrl.positiveLabel, `Knob ${pointer} must have positiveLabel`);
  assert(ctrl.mutations && ctrl.mutations.length >= 2, `Knob ${pointer} must define >= 2 mutations`);
  console.log(`   ✅ Leaf covered: ${pointer} [${ctrl.negativeLabel} <-> ${ctrl.positiveLabel}]`);
}

// 3. Domain & Interaction Patterns
console.log('\n3. Verifying Domain and Interaction axis leaf coverage...');
const domainsCtrl = registry.get('/domain/domains');
assert(domainsCtrl, 'Missing control for /domain/domains');
assert.strictEqual(domainsCtrl.choices?.length, 10, 'Domains must have 10 choices');
console.log(`   ✅ Leaf covered: /domain/domains (10 domains)`);

const interactionsCtrl = registry.get('/domain/interactions');
assert(interactionsCtrl, 'Missing control for /domain/interactions');
assert.strictEqual(interactionsCtrl.choices?.length, 11, 'Interactions must have 11 choices');
console.log(`   ✅ Leaf covered: /domain/interactions (11 interaction patterns)`);

// 4. Control subtree
console.log('\n4. Verifying Control axis leaf coverage...');
const controlFields = intentDoc.control?.fields || [];
assert(controlFields.length >= 5, 'Control axis must declare tokens, components, mode, fonts, constraints');
for (const f of controlFields) {
  const pointer = `/control/${f.id}`;
  const ctrl = registry.get(pointer);
  assert(ctrl, `Missing control for control subtree leaf: ${pointer}`);
  assert(ctrl.mutations && ctrl.mutations.length >= 2, `Control ${pointer} must define >= 2 mutations`);
  console.log(`   ✅ Leaf covered: ${pointer} (${ctrl.label})`);
}

console.log('\n🎉 Gate 3 Coverage passed: 100% of BasisIntent leaves have registry controls!\n');
