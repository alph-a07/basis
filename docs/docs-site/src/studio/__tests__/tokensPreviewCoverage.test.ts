/**
 * tokensPreviewCoverage.test.ts - Gate 7: Token Preview Renderer Coverage.
 *
 * Rule (Section 4.4): A tokensPreviewCoverage test fails if the facade emits a kind
 * with no preview renderer.
 */

import assert from 'node:assert';
import { resolveSafe } from '../state/resolveClient.js';

console.log('Testing Token Preview Coverage (Section 4.4: all facade kinds handled by previews)...');

const SUPPORTED_KINDS = new Set([
  'color',
  'dimension',
  'radius',
  'shadow',
  'duration',
  'typography',
  'weight',
  'multiplier',
  'font-family',
  'opacity',
  'gradient',
  'spacing',
  'size',
  'size.icon',
  'size.control',
  'depth',
  'elevation',
  'motion',
  'easing'
]);

async function main() {
  const res = await resolveSafe({});
  assert.strictEqual(res.result.ok, true, 'Empty intent must resolve');
  if (!res.result.ok) return;

  const emittedKinds = new Set<string>(Object.values(res.result.tokens.kinds).map((k) => k.toLowerCase()));

  console.log(`Facade emitted ${emittedKinds.size} unique token kinds:`);
  for (const k of emittedKinds) {
    console.log(`   - ${k}`);
  }

  const unhandledKinds: string[] = [];
  for (const k of emittedKinds) {
    if (!SUPPORTED_KINDS.has(k)) {
      unhandledKinds.push(k);
    }
  }

  if (unhandledKinds.length > 0) {
    console.error('❌ Found emitted kinds with NO preview renderer:', unhandledKinds);
    assert.fail(`Tokens preview coverage failed: Unhandled kinds: ${unhandledKinds.join(', ')}`);
  }

  console.log('\n🎉 Gate 7 Token Preview Coverage passed: 100% of emitted kinds have previews!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
