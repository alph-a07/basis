import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkSpecimenTokens, getValidResolverTokens } from './check-specimen-vars.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('Testing P2.2 Specimens contracts and token enforcement...');

// 1. Verify resolver tokens load properly
const validTokens = getValidResolverTokens();
assert.ok(validTokens.size > 100, `Expected > 100 valid tokens from resolver, got ${validTokens.size}`);
console.log(`✅ Loaded ${validTokens.size} valid tokens from docs-runtime resolver`);

// 2. Verify all specimen components exist
const specimensDir = path.resolve(__dirname, '../src/components/specimens');
const requiredSpecimens = [
  'Button.astro',
  'Card.astro',
  'Input.astro',
  'Chips.astro',
  'Switch.astro',
  'ListItem.astro',
  'IllustrativeNote.astro',
];

for (const file of requiredSpecimens) {
  const filePath = path.join(specimensDir, file);
  assert.ok(fs.existsSync(filePath), `Required specimen component missing: ${file}`);
  const content = fs.readFileSync(filePath, 'utf-8');
  assert.ok(content.length > 100, `Specimen component ${file} must have meaningful content`);
  console.log(`✅ Specimen component present: ${file}`);
}

// 3. Verify real specimens pass the token checker with zero invalid tokens
const result = checkSpecimenTokens(specimensDir, validTokens);
assert.strictEqual(result.valid, true, `Specimen components must contain only valid --b-* tokens. Found invalid: ${JSON.stringify(result.invalidTokens)}`);
assert.ok(result.totalReferences > 100, `Expected > 100 token references in specimens, found ${result.totalReferences}`);
assert.ok(result.uniqueTokens.length >= 35, `Expected >= 35 unique tokens used across specimens, found ${result.uniqueTokens.length}`);
console.log(`✅ All real specimens passed: ${result.totalReferences} references across ${result.uniqueTokens.length} unique tokens`);

// 4. Verify that deliberately wrong var names fail the check
const tempBadFilePath = path.join(specimensDir, '_temp_invalid_specimen_test.astro');
try {
  fs.writeFileSync(
    tempBadFilePath,
    `<div style="color: var(--b-color-fake-specimen-token); background: var(--b-surface-nonexistent);"></div>`,
    'utf-8'
  );

  const failCheck = checkSpecimenTokens(tempBadFilePath, validTokens);
  assert.strictEqual(failCheck.valid, false, 'checkSpecimenTokens must report invalid = false for bogus tokens');
  assert.strictEqual(failCheck.invalidTokens.length, 2, 'Must catch exactly 2 invalid tokens');
  assert.ok(
    failCheck.invalidTokens.some((t) => t.token === '--b-color-fake-specimen-token'),
    'Must catch --b-color-fake-specimen-token'
  );
  assert.ok(
    failCheck.invalidTokens.some((t) => t.token === '--b-surface-nonexistent'),
    'Must catch --b-surface-nonexistent'
  );
  console.log('✅ Check correctly catches and rejects deliberately invalid token names');
} finally {
  if (fs.existsSync(tempBadFilePath)) {
    fs.unlinkSync(tempBadFilePath);
  }
}

// 5. Verify no specimen uses --d-* tokens (isolation test)
for (const file of requiredSpecimens) {
  const filePath = path.join(specimensDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  assert.ok(
    !content.includes('--d-'),
    `Specimen ${file} must not reference docs chrome tokens (--d-*). Only --b-* tokens allowed.`
  );
}
console.log('✅ Specimen style isolation verified: zero --d-* tokens used');

// 6. Verify required interactive states are supported in specimen components
const interactiveSpecimens = ['Button.astro', 'Card.astro', 'Input.astro', 'Chips.astro', 'Switch.astro', 'ListItem.astro'];
for (const file of interactiveSpecimens) {
  const content = fs.readFileSync(path.join(specimensDir, file), 'utf-8');
  assert.ok(content.includes('hover'), `${file} must handle hover state`);
  assert.ok(content.includes('focus'), `${file} must handle focus state`);
  assert.ok(content.includes('disabled'), `${file} must handle disabled state`);
}
console.log('✅ Interactive state handling (default, hover, focus, disabled) verified across all specimens');

// 7. Verify IllustrativeNote provides informative role and accessible message
const noteContent = fs.readFileSync(path.join(specimensDir, 'IllustrativeNote.astro'), 'utf-8');
assert.ok(noteContent.includes('role="note"'), 'IllustrativeNote must have role="note"');
assert.ok(noteContent.includes('--b-'), 'IllustrativeNote must be styled with --b-* tokens');
console.log('✅ IllustrativeNote verified');

console.log('\n🎉 P2.2 Specimens verification complete and passing!');
