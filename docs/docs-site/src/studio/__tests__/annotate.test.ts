/**
 * annotate.test.ts - Build check for data-annotate anchors.
 *
 * Rule (Section 4.3): A build check fails if a data-annotate var does not exist in the facade output.
 */

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveSafe } from '../state/resolveClient.js';

console.log('Testing Scene Annotate Anchors (Section 4.3: validate data-annotate vars against facade)...');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sceneDir = path.resolve(__dirname, '../scene');

async function main() {
  const res = await resolveSafe({});
  assert.strictEqual(res.result.ok, true, 'Empty intent must resolve');
  if (!res.result.ok) return;

  const validTokens = new Set<string>(Object.keys(res.result.tokens.light));

  // Find all .tsx files in sceneDir
  const files: string[] = [];
  function scan(dir: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scan(fullPath);
      } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
        files.push(fullPath);
      }
    }
  }
  scan(sceneDir);

  const annotatedVars = new Set<string>();
  for (const file of files) {
    const code = fs.readFileSync(file, 'utf8');
    const matches = code.matchAll(/data-annotate=["'](--b-[a-zA-Z0-9_-]+)["']/g);
    for (const m of matches) {
      annotatedVars.add(m[1]);
    }
  }

  console.log(`Found ${annotatedVars.size} unique data-annotate anchors in scene code.`);

  const invalidVars: string[] = [];
  for (const v of annotatedVars) {
    if (!validTokens.has(v)) {
      invalidVars.push(v);
    }
  }

  if (invalidVars.length > 0) {
    console.error('❌ Invalid data-annotate vars found:', invalidVars);
    assert.fail(`Invalid data-annotate vars not present in facade: ${invalidVars.join(', ')}`);
  }

  console.log('   ✅ All data-annotate vars exist in facade output:');
  for (const v of annotatedVars) {
    console.log(`      ✓ ${v}`);
  }

  console.log('\n🎉 Annotate build check passed: 100% of annotation anchors are valid facade tokens!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
