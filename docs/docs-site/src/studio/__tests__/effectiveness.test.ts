import assert from 'node:assert';
import { loadIntentDoc } from '../../lib/load-intent.js';
import { buildControlRegistry } from '../controls/registry.js';
import {
  loadDocsRuntime,
  resolveSafe,
} from '../state/resolveClient';
import {
  setByPointer,
} from '../state/intentStore';
import {
  serializeIntent,
  deserializeIntent,
  type BasisIntentState,
} from '../state/serialize';
import { diffTokens } from '../state/tokenDiff';

console.log('Testing Control Effectiveness (Gate 3: provable token changes against real facade, no mocks)...\n');

async function runEffectivenessTests() {
  const runtime = await loadDocsRuntime();
  assert(runtime, 'docs-runtime must be loaded');

  const intentDoc = loadIntentDoc();
  const registry = buildControlRegistry(intentDoc);

  // -------------------------------------------------------------------------
  // 1. Per-control effectiveness from registry
  // -------------------------------------------------------------------------
  console.log('1. Verifying every control provably changes resolved output...');
  let totalControlsTested = 0;
  let inertControlsCount = 0;

  for (const [pointer, ctrl] of registry) {
    const baseIntent: BasisIntentState = JSON.parse(JSON.stringify(ctrl.preconditions ?? {}));
    const { result: baseResult } = await resolveSafe(baseIntent, 'b', runtime);
    assert.strictEqual(baseResult.ok, true, `Base precondition must resolve ok:true for ${pointer}`);

    if (ctrl.intentionallyInert) {
      inertControlsCount++;
      console.log(`   ℹ️ [Inert] ${pointer}: ${ctrl.intentionallyInert}`);
      // Still verify that mutations serialize and resolve cleanly
      for (const mut of ctrl.mutations) {
        const mutatedIntent = setByPointer(baseIntent, pointer, mut.value);
        const { result: mutResult } = await resolveSafe(mutatedIntent, 'b', runtime);
        assert.strictEqual(mutResult.ok, true, `Inert control ${pointer} mutation must resolve ok:true`);

        const rt = deserializeIntent(serializeIntent(mutatedIntent));
        assert.deepStrictEqual(rt, mutatedIntent, `Round trip mismatch for ${pointer}`);
      }
      continue;
    }

    for (const mut of ctrl.mutations) {
      // For toggles, if the mutation value matches base default, toggle base to verify both directions
      let effectiveBase = baseIntent;
      if (ctrl.controlKind === 'toggle' && mut.value === true) {
        effectiveBase = setByPointer(baseIntent, pointer, false);
      }
      const { result: currentBaseResult } = await resolveSafe(effectiveBase, 'b', runtime);
      const mutatedIntent = setByPointer(effectiveBase, pointer, mut.value);
      const { result: mutResult } = await resolveSafe(mutatedIntent, 'b', runtime);
      assert.strictEqual(mutResult.ok, true, `Mutation '${mut.label}' for ${pointer} must resolve ok:true`);

      if (currentBaseResult.ok && mutResult.ok) {
        const diffLight = diffTokens(currentBaseResult.tokens.light, mutResult.tokens.light);
        const diffDark = diffTokens(currentBaseResult.tokens.dark, mutResult.tokens.dark);
        const reportChanged = JSON.stringify(currentBaseResult.report) !== JSON.stringify(mutResult.report);
        const hasEffect = diffLight.totalChanged > 0 || diffDark.totalChanged > 0 || reportChanged;

        assert(
          hasEffect,
          `Control ${pointer} mutation '${mut.label}' produced no token diff and no report change.`,
        );
      }

      // Round trip verification
      const rt = deserializeIntent(serializeIntent(mutatedIntent));
      assert.deepStrictEqual(rt, mutatedIntent, `Round trip mismatch for ${pointer} mutation '${mut.label}'`);
    }

    totalControlsTested++;
    console.log(`   ✅ Proven effective: ${pointer} (${ctrl.mutations.length} mutations verified)`);
  }

  console.log(`\n   Summary: ${totalControlsTested} controls effective, ${inertControlsCount} documented as inert.\n`);

  // -------------------------------------------------------------------------
  // 2. Knob extremes (+0.8 vs -0.8 vs unset)
  // -------------------------------------------------------------------------
  console.log('2. Verifying knob extreme values (+0.8 and -0.8) produce distinct results from each other and unset...');
  const { result: emptyRes } = await resolveSafe({}, 'b', runtime);
  assert(emptyRes.ok);

  const knobIds = [
    'warmth',
    'chroma',
    'contrast',
    'density',
    'roundness',
    'typographyExpressiveness',
    'motionEnergy',
    'playfulness',
  ];

  for (const kid of knobIds) {
    const { result: posRes } = await resolveSafe({ mood: { knobs: { [kid]: 0.8 } } }, 'b', runtime);
    const { result: negRes } = await resolveSafe({ mood: { knobs: { [kid]: -0.8 } } }, 'b', runtime);
    assert(posRes.ok && negRes.ok);

    const posDiff = diffTokens(emptyRes.tokens.light, posRes.tokens.light);
    const negDiff = diffTokens(emptyRes.tokens.light, negRes.tokens.light);
    const extremeDiff = diffTokens(posRes.tokens.light, negRes.tokens.light);

    assert(posDiff.totalChanged > 0, `Knob ${kid} at +0.8 must differ from unset`);
    assert(negDiff.totalChanged > 0, `Knob ${kid} at -0.8 must differ from unset`);
    assert(extremeDiff.totalChanged > 0, `Knob ${kid} at +0.8 must differ from -0.8`);

    console.log(
      `   ✅ Knob '${kid}': +0.8 changes ${posDiff.totalChanged}, -0.8 changes ${negDiff.totalChanged}, between extremes: ${extremeDiff.totalChanged} tokens`,
    );
  }

  // -------------------------------------------------------------------------
  // 3. Mood presets vs Neutral
  // -------------------------------------------------------------------------
  console.log('\n3. Verifying all 6 presets differ from Neutral archetype...');
  const { result: neutralRes } = await resolveSafe({ mood: { preset: 'Neutral' } }, 'b', runtime);
  assert(neutralRes.ok);

  const otherPresets = ['Calm', 'Professional', 'Bold', 'Playful', 'Minimal', 'Expressive'];
  for (const p of otherPresets) {
    const { result: pRes } = await resolveSafe({ mood: { preset: p } }, 'b', runtime);
    assert(pRes.ok);
    const pDiff = diffTokens(neutralRes.tokens.light, pRes.tokens.light);
    assert(pDiff.totalChanged > 0, `Preset ${p} must differ from Neutral`);
    console.log(`   ✅ Preset '${p}': differs from Neutral in ${pDiff.totalChanged} tokens`);
  }

  // -------------------------------------------------------------------------
  // 4. All 10 Domains and 11 Interactions alone produce changes
  // -------------------------------------------------------------------------
  console.log('\n4. Verifying every ProductDomain (10) and InteractionPattern (11) alone produces token/report changes...');
  const domains = [
    'Finance',
    'Health',
    'Social',
    'Productivity',
    'Commerce',
    'Media',
    'Education',
    'Travel',
    'Utilities',
    'Other',
  ];
  for (const d of domains) {
    const { result: dRes } = await resolveSafe({ domain: { domains: [d] } }, 'b', runtime);
    assert(dRes.ok);
    const dDiff = diffTokens(emptyRes.tokens.light, dRes.tokens.light);
    const reportDiff = JSON.stringify(emptyRes.report) !== JSON.stringify(dRes.report);
    assert(dDiff.totalChanged > 0 || reportDiff, `Domain ${d} must change tokens or report`);
    console.log(`   ✅ Domain '${d}': changed ${dDiff.totalChanged} tokens, report modified: ${reportDiff}`);
  }

  const interactions = [
    'DataNavigation',
    'FormsEntry',
    'ChatMessaging',
    'ContentFeed',
    'ContentReading',
    'SearchDiscovery',
    'MediaBrowse',
    'DashboardMonitoring',
    'CheckoutCommerce',
    'AuthOnboarding',
    'SettingsAdmin',
  ];
  for (const it of interactions) {
    const { result: itRes } = await resolveSafe({ domain: { interactions: [it] } }, 'b', runtime);
    assert(itRes.ok);
    const itDiff = diffTokens(emptyRes.tokens.light, itRes.tokens.light);
    const reportDiff = JSON.stringify(emptyRes.report) !== JSON.stringify(itRes.report);
    assert(itDiff.totalChanged > 0 || reportDiff, `Interaction ${it} must change tokens or report`);
    console.log(`   ✅ Interaction '${it}': changed ${itDiff.totalChanged} tokens, report modified: ${reportDiff}`);
  }

  // -------------------------------------------------------------------------
  // 5. Semantic cases
  // -------------------------------------------------------------------------
  console.log('\n5. Verifying semantic cases mirrored from Kotlin resolver test suite...');

  // 5.1 Empty intent resolves
  const { result: emptyCheck } = await resolveSafe({}, 'b', runtime);
  assert.strictEqual(emptyCheck.ok, true, 'Empty intent must resolve ok: true');
  console.log('   ✅ Empty intent resolves cleanly.');

  // 5.2 Explicit overrides beat mood-derived values
  const { result: boldRes } = await resolveSafe({ mood: { preset: 'Bold' } }, 'b', runtime);
  const { result: overrideRes } = await resolveSafe(
    {
      mood: { preset: 'Bold' },
      control: {
        tokens: {
          paths: {
            'spacing.level4': {
              type: 'io.github.alph_a07.basis.theme.intent.controls.overrides.OverrideValue.Dp',
              value: 40.0,
            },
          },
        },
      },
    },
    'b',
    runtime,
  );
  assert(boldRes.ok && overrideRes.ok);
  assert.notStrictEqual(
    boldRes.tokens.light['--b-spacing-level4'],
    overrideRes.tokens.light['--b-spacing-level4'],
  );
  assert.strictEqual(overrideRes.tokens.light['--b-spacing-level4'], '40px');
  console.log('   ✅ Explicit token override beats mood preset values.');

  // 5.3 Constraints applied after overrides
  const { result: constraintRes } = await resolveSafe(
    {
      control: {
        tokens: {
          paths: {
            'size.control.level1': {
              type: 'io.github.alph_a07.basis.theme.intent.controls.overrides.OverrideValue.Dp',
              value: 24.0,
            },
          },
        },
        constraints: {
          minTouchTarget: { minSize: 48.0 },
        },
      },
    },
    'b',
    runtime,
  );
  assert(constraintRes.ok);
  assert.strictEqual(constraintRes.tokens.light['--b-size-control-level1'], '48px');
  console.log('   ✅ Constraints applied after overrides (minTouchTarget enforced 48px over 24px override).');

  // 5.4 4 supporting colors produces violations
  const { result: excessSupportingRes } = await resolveSafe(
    {
      identity: {
        brandColor: {
          type: 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex',
          value: '#1976D2',
        },
        supportingColors: [
          { type: 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex', value: '#388E3C' },
          { type: 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex', value: '#F57C00' },
          { type: 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex', value: '#7B1FA2' },
          { type: 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex', value: '#D32F2F' },
        ],
      },
    },
    'b',
    runtime,
  );
  assert(excessSupportingRes.ok);
  assert(
    excessSupportingRes.violations.some((v) => v.path.includes('supportingColors')),
    '4 supporting colors must produce rejection violation in report',
  );
  console.log('   ✅ 4 supporting colors produces violation rejection in report.');

  // 5.5 NaN knob produces violation
  const { result: nanKnobRes } = await resolveSafe(
    {
      mood: {
        knobs: {
          warmth: 'NaN' as any,
        },
      },
    },
    'b',
    runtime,
  );
  assert(nanKnobRes.ok);
  assert(
    nanKnobRes.violations.some((v) => v.path.includes('warmth')),
    'NaN knob must produce violation rejection in report',
  );
  console.log('   ✅ NaN knob produces violation rejection in report.');

  // 5.6 deriveColors = false yields achromatic base
  const { result: achromaRes } = await resolveSafe(
    {
      identity: {
        deriveColors: false,
      },
    },
    'b',
    runtime,
  );
  assert(achromaRes.ok);
  const surface = achromaRes.tokens.light['--b-color-surface-default'];
  assert(surface.includes('oklch('), 'Must format as oklch');
  // Check chroma is 0
  const match = surface.match(/oklch\(([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)/);
  assert(match && parseFloat(match[2]) === 0, 'Achromatic base must have 0 chroma');
  console.log(`   ✅ deriveColors = false yields achromatic base: ${surface}.`);

  console.log('\n🎉 Gate 3 Effectiveness passed: All controls proven effective against real facade!\n');
}

runEffectivenessTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
