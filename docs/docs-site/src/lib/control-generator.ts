/**
 * control-generator.ts - Derives Studio & Landing UI control specs from extracted Intent metadata.
 *
 * Single source of truth:
 * - Intent vocabulary, bounds, labels, and KDoc summaries are read from generated intent.json
 * - UI hints (step granularity, ordering, curated fonts) are injected from studio-ui.ts
 *
 * Implements the six control types:
 * 1. Single Choice (Presence, Presets)
 * 2. Multi Choice (Domains, Interactions)
 * 3. Tri-state Knob (Mood Knobs with explicit unset / inherit preset state)
 * 4. Color (Brand Color)
 * 5. Color List with max (Supporting Colors, max 3)
 * 6. Toggle (Derive Colors)
 * Plus Font selection.
 */

import type { IntentDocument, FieldDoc, ChoiceDoc, KnobDoc } from '@basis/docs-model';
import { studioUiConfig, type StudioUiConfig } from '../config/studio-ui';
import type {
  ChoiceOption,
  ColorControlSpec,
  ColorListControlSpec,
  FontControlSpec,
  KnobControlSpec,
  MultiChoiceControlSpec,
  SingleChoiceControlSpec,
  StudioControlSpecs,
  ToggleControlSpec,
} from '../types/controls';

function findField(fields: FieldDoc[] | undefined, id: string): FieldDoc | undefined {
  return fields?.find((f) => f.id === id);
}

/**
 * Derives complete typed control specifications from an IntentDocument and optional UI hints.
 */
export function deriveControlSpecs(
  intent: IntentDocument,
  config: StudioUiConfig = studioUiConfig
): StudioControlSpecs {
  const identityFields = intent.identity?.fields ?? [];
  const brandField = findField(identityFields, 'brandColor');
  const supportingField = findField(identityFields, 'supportingColors');
  const presenceField = findField(identityFields, 'presence');
  const deriveColorsField = findField(identityFields, 'deriveColors');
  const typographyField = findField(identityFields, 'typography');

  // 1. Color: Brand Color
  const brandColorSpec: ColorControlSpec = {
    type: 'color',
    id: 'brandColor',
    label: brandField?.label ?? 'Brand Color',
    summary: brandField?.summary ?? 'Primary brand color, in any supported intake color space.',
    path: 'identity.brandColor',
    defaultValue: null,
    placeholder: '#2ea043',
  };

  // 2. Color List: Supporting Colors
  const supportingColorsSpec: ColorListControlSpec = {
    type: 'color-list',
    id: 'supportingColors',
    label: supportingField?.label ?? 'Supporting Colors',
    summary:
      supportingField?.summary ??
      'Secondary brand anchors; at most three are honored and extras are rejected during normalization.',
    path: 'identity.supportingColors',
    maxItems: intent.identity?.supportingColors?.max ?? 3,
    defaultValues: [],
  };

  // 3. Single Choice: Brand Presence
  const presenceOptions: ChoiceOption[] = (intent.identity?.presence ?? []).map((p: ChoiceDoc) => ({
    id: p.id,
    label: p.label,
    summary: p.summary,
  }));

  const presenceSpec: SingleChoiceControlSpec = {
    type: 'single-choice',
    id: 'presence',
    label: presenceField?.label ?? 'Presence',
    summary: presenceField?.summary ?? 'How evident the brand color should be in semantic roles.',
    path: 'identity.presence',
    options: presenceOptions,
    defaultValue: 'Balanced',
    allowEmpty: true,
  };

  // 4. Toggle: Derive Colors
  const deriveColorsSpec: ToggleControlSpec = {
    type: 'toggle',
    id: 'deriveColors',
    label: deriveColorsField?.label ?? 'Derive Colors',
    summary:
      deriveColorsField?.summary ??
      'When true (default), colors are synthesized from mood, brand, and domain signals.',
    path: 'identity.deriveColors',
    defaultValue: true,
  };

  // 5. Font: Typography
  const typographySpec: FontControlSpec = {
    type: 'font',
    id: 'typography',
    label: typographyField?.label ?? 'Typography',
    summary: typographyField?.summary ?? 'Brand typeface intent, as candidates, role pins, or both.',
    path: 'identity.typography',
    options: config.curatedFonts,
    defaultValue: 'inter',
  };

  // 6. Single Choice: Mood Preset
  const presetOptions: ChoiceOption[] = (intent.mood?.presets ?? []).map((p: ChoiceDoc) => ({
    id: p.id,
    label: p.label,
    summary: p.summary,
  }));

  const presetSpec: SingleChoiceControlSpec = {
    type: 'single-choice',
    id: 'preset',
    label: 'Mood Preset',
    summary: 'Named archetype driving the base mood profile.',
    path: 'mood.preset',
    options: presetOptions,
    defaultValue: 'Neutral',
    allowEmpty: true,
  };

  // 7. Tri-state Knobs: Mood Knobs
  const knobSpecs: KnobControlSpec[] = (intent.mood?.knobs ?? []).map((k: KnobDoc) => {
    const step = config.knobSteps[k.id] ?? config.defaultKnobStep ?? 0.05;
    return {
      type: 'knob',
      id: k.id,
      label: k.label,
      summary: k.summary,
      path: `mood.knobs.${k.id}`,
      negativeLabel: k.negativeLabel,
      positiveLabel: k.positiveLabel,
      min: k.min ?? -1.0,
      max: k.max ?? 1.0,
      step,
      defaultValue: null, // explicit unset / inherit preset
    };
  });

  // Sort knobs if ordering is specified in hints
  if (config.order?.knobs) {
    const knobOrder = config.order.knobs;
    knobSpecs.sort((a, b) => {
      const idxA = knobOrder.indexOf(a.id);
      const idxB = knobOrder.indexOf(b.id);
      if (idxA === -1 && idxB === -1) return 0;
      if (idxA === -1) return 1;
      if (idxB === -1) return -1;
      return idxA - idxB;
    });
  }

  // 8. Multi Choice: Product Domains
  const domainOptions: ChoiceOption[] = (intent.domain?.domains ?? []).map((d: ChoiceDoc) => ({
    id: d.id,
    label: d.label,
    summary: d.summary,
  }));

  const domainsSpec: MultiChoiceControlSpec = {
    type: 'multi-choice',
    id: 'domains',
    label: 'Product Domains',
    summary: 'Product-domain labels, blended by conservative rules.',
    path: 'domain.domains',
    options: domainOptions,
    defaultValues: [],
  };

  // 9. Multi Choice: Interaction Patterns
  const interactionOptions: ChoiceOption[] = (intent.domain?.interactions ?? []).map((i: ChoiceDoc) => ({
    id: i.id,
    label: i.label,
    summary: i.summary,
  }));

  const interactionsSpec: MultiChoiceControlSpec = {
    type: 'multi-choice',
    id: 'interactions',
    label: 'Interaction Patterns',
    summary: 'Interaction-pattern labels, blended by weighted means.',
    path: 'domain.interactions',
    options: interactionOptions,
    defaultValues: [],
  };

  // 10. Control fields (Read-only for Studio v1 per locked decision D-5)
  const controlFields = intent.control?.fields ?? [];
  const tokensField = findField(controlFields, 'tokens');
  const componentsField = findField(controlFields, 'components');

  return {
    identity: {
      brandColor: brandColorSpec,
      supportingColors: supportingColorsSpec,
      presence: presenceSpec,
      deriveColors: deriveColorsSpec,
      typography: typographySpec,
    },
    mood: {
      preset: presetSpec,
      knobs: knobSpecs,
    },
    domain: {
      domains: domainsSpec,
      interactions: interactionsSpec,
    },
    control: {
      tokensReadOnly: {
        id: 'tokens',
        label: tokensField?.label ?? 'Tokens',
        summary: tokensField?.summary ?? 'Sparse typed token overrides mirroring the token tree.',
      },
      componentsReadOnly: {
        id: 'components',
        label: componentsField?.label ?? 'Components',
        summary: componentsField?.summary ?? 'Per-component, variant, and state style patches.',
      },
    },
  };
}
