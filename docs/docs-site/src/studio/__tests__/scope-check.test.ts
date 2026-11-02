/**
 * scope-check.test.ts - Non-Negotiable Rule 4.
 *
 * Rule: Two style scopes, never mixed. The Studio shell is styled only with the docs
 * --d-* / --docs-* tokens. The phone-frame screen is styled only with the Studio's
 * resolved --b-* tokens. A static check fails if shell CSS references --b-* or scene
 * CSS references --d-*.
 */

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

console.log('Testing Style Scope Isolation (Rule 4: Shell CSS 0 --b-*, Scene CSS 0 --d-*)...');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const stylesDir = path.resolve(__dirname, '../../styles');

const shellCssPath = path.join(stylesDir, 'studio.css');
const sceneCssPath = path.join(stylesDir, 'studio-scene.css');

assert.ok(fs.existsSync(shellCssPath), `Shell CSS must exist at ${shellCssPath}`);
assert.ok(fs.existsSync(sceneCssPath), `Scene CSS must exist at ${sceneCssPath}`);

const shellCss = fs.readFileSync(shellCssPath, 'utf8');
const sceneCss = fs.readFileSync(sceneCssPath, 'utf8');

// 1. Verify Shell CSS contains 0 references to --b-*
const bInShell = [...shellCss.matchAll(/--b-[a-zA-Z0-9_-]+/g)].map((m) => m[0]);
console.log(`1. Shell CSS (--b-* references): ${bInShell.length}`);
if (bInShell.length > 0) {
  console.error('❌ Found --b-* references in Shell CSS:', bInShell);
  assert.fail(`Shell CSS must not reference --b-* tokens (Rule 4 violation).`);
}
assert.strictEqual(bInShell.length, 0, 'Shell CSS must have 0 --b-* references');
console.log('   ✅ Shell CSS has 0 --b-* references.');

// 2. Verify Scene CSS contains 0 references to --d-* or --docs-*
const dInScene = [...sceneCss.matchAll(/--(d|docs)-[a-zA-Z0-9_-]+/g)].map((m) => m[0]);
console.log(`2. Scene CSS (--d-* / --docs-* references): ${dInScene.length}`);
if (dInScene.length > 0) {
  console.error('❌ Found docs tokens in Scene CSS:', dInScene);
  assert.fail(`Scene CSS must not reference docs tokens (Rule 4 violation).`);
}
assert.strictEqual(dInScene.length, 0, 'Scene CSS must have 0 docs token references');
console.log('   ✅ Scene CSS has 0 --d-* / --docs-* references.');

console.log('\n🎉 Rule 4 Scope Check passed: Two style scopes are strictly separated!');
