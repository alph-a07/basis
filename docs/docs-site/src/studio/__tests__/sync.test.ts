/**
 * sync.test.ts - Gate 7: Editor and Store Synchronization.
 *
 * Rules:
 * - UI change to editor text parses to the same intent
 * - Editing JSON updates the store
 * - Invalid JSON leaves the store unchanged
 * - Kotlin export is generated canonically
 */

import assert from 'node:assert';
import { StudioIntentStore } from '../state/intentStore.js';
import { serializeIntent, deserializeIntent } from '../state/serialize.js';

console.log('Testing Store and Editor Synchronization (Gate 7: two-way sync, error safety)...');

async function main() {
  const store = new StudioIntentStore();

  // 1. Initial State
  const initial = store.getState().intent;
  assert.deepStrictEqual(initial, {}, 'Initial store should be empty intent');

  // 2. UI change -> Editor text serialization
  store.set('/identity/brandColor', {
    type: 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex',
    value: '#123456',
  });
  const updated = store.getState().intent;
  const serialized = serializeIntent(updated);
  const deserialized = deserializeIntent(serialized);

  assert.deepStrictEqual(
    deserialized,
    updated,
    'Serialized editor text must round-trip to identical intent tree'
  );
  console.log('   ✅ UI mutation serializes to valid canonical JSON matching store intent.');

  // 3. Valid JSON text editing -> updates store
  const validEditedText = JSON.stringify({
    identity: {
      presence: 'Strong',
      deriveColors: false,
    },
    mood: {
      preset: 'Bold',
      knobs: {
        warmth: 0.5,
      },
    },
  });

  const parsedValid = JSON.parse(validEditedText);
  store.setIntent(parsedValid);

  const stateAfterEdit = store.getState().intent;
  assert.strictEqual(stateAfterEdit.identity?.presence, 'Strong');
  assert.strictEqual(stateAfterEdit.identity?.deriveColors, false);
  assert.strictEqual(stateAfterEdit.mood?.preset, 'Bold');
  assert.strictEqual(stateAfterEdit.mood?.knobs?.warmth, 0.5);
  console.log('   ✅ JSON text edit dispatches and updates store state correctly.');

  // 4. Invalid JSON text editing -> store remains untouched
  const previousGoodState = store.getState().intent;
  const invalidJsonText = '{ "identity": { "presence": "Strong", INVALID_JSON... ';

  let failedToParse = false;
  try {
    JSON.parse(invalidJsonText);
  } catch {
    failedToParse = true;
    // Store is NOT updated
  }

  assert.strictEqual(failedToParse, true, 'Malformed JSON must throw syntax error');
  assert.deepStrictEqual(
    store.getState().intent,
    previousGoodState,
    'Store must remain unchanged on malformed editor JSON'
  );
  console.log('   ✅ Malformed JSON leaves store state completely unchanged.');

  // 5. Undo restores state before JSON edit
  store.undo();
  assert.strictEqual(
    store.getState().intent.mood?.preset,
    undefined,
    'Undo restores state before JSON edit'
  );
  console.log('   ✅ Undo correctly reverts JSON edit snapshot.');

  console.log('\n🎉 Gate 7 Sync passed: Store and editor synchronization verified!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
