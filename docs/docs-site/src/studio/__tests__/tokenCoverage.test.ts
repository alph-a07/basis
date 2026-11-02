/**
 * tokenCoverage.test.ts - Gate 5: Token Universe Coverage.
 *
 * Rule: Compute the token universe = tokens for the empty intent ∪ every token changed by any mutation in 5.2;
 * fail if any token has neither a consumer in TOKEN_INDEX nor a NOT_VISUAL_ALLOWLIST reason.
 */

import assert from 'node:assert';
import { resolveSafe } from '../state/resolveClient.js';
import { TOKEN_INDEX } from '../scene/tokenIndex.js';
import { NOT_VISUAL_ALLOWLIST } from '../config/studio-ui.js';

console.log('Testing Token Universe Coverage (Gate 5: exhaustive scene token consumption)...');

async function main() {
  // 1. Resolve empty intent
  const emptyRes = await resolveSafe({});
  assert.strictEqual(emptyRes.result.ok, true, 'Empty intent must resolve');
  if (!emptyRes.result.ok) return;

  const tokenUniverse = new Set<string>(Object.keys(emptyRes.result.tokens.light));

  // 2. Sample mutations across presets, knobs, domains, brand colors to ensure token universe is complete
  const sampleIntents: Record<string, any>[] = [
    { mood: { preset: 'Bold' } },
    { mood: { preset: 'Calm' } },
    { mood: { preset: 'Professional' } },
    { mood: { knobs: { warmth: 0.8, chroma: 0.8, contrast: 0.8, density: 0.8 } } },
    { mood: { knobs: { warmth: -0.8, chroma: -0.8, contrast: -0.8, density: -0.8 } } },
    { identity: { brandColor: { type: 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex', value: '#FF0055' }, presence: 'Dominant' } },
    { domain: { domains: ['Finance', 'Health'], interactions: ['DataNavigation', 'FormsEntry'] } },
    { control: { mode: { preferred: 'Dark', targets: ['Light', 'Dark'] } } }
  ];

  for (const intent of sampleIntents) {
    const res = await resolveSafe(intent);
    if (res.result.ok) {
      for (const token of Object.keys(res.result.tokens.light)) {
        tokenUniverse.add(token);
      }
    }
  }

  console.log(`\n1. Computed Token Universe size: ${tokenUniverse.size} tokens`);

  // 3. Verify every token in universe has a consumer or an allowlist reason
  const missingConsumers: string[] = [];
  const coveredTokens: string[] = [];
  const allowlistedTokens: string[] = [];

  for (const token of tokenUniverse) {
    const consumers = TOKEN_INDEX[token] || [];
    if (consumers.length > 0) {
      coveredTokens.push(token);
    } else if (NOT_VISUAL_ALLOWLIST[token]) {
      allowlistedTokens.push(token);
    } else {
      missingConsumers.push(token);
    }
  }

  console.log(`2. Verifying token consumption in scene:`);
  console.log(`   - Consumed directly in scene CSS: ${coveredTokens.length}`);
  console.log(`   - Explicitly documented in NOT_VISUAL_ALLOWLIST: ${allowlistedTokens.length}`);

  if (missingConsumers.length > 0) {
    console.error(`\n❌ Scene gaps detected! The following ${missingConsumers.length} tokens have no consumers:`);
    for (const token of missingConsumers) {
      console.error(`   - ${token}`);
    }
    assert.fail(`Token coverage failed: ${missingConsumers.length} tokens lack scene consumers.`);
  }

  console.log(`\n🎉 Gate 5 Token Coverage passed: 100% of Token Universe is consumed!`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
