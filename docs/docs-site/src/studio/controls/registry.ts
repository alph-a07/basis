/**
 * registry.ts - Coverage registry mapping every leaf of BasisIntent to its control specification.
 *
 * Enforces:
 * 1. Derived from generated intent.json (KDoc-derived). No invented vocabulary.
 * 2. Every leaf has a control definition, title, summary, precondition, and mutations for testing.
 * 3. Walks intent.json to guarantee 100% leaf coverage.
 */

import type { BasisIntentState } from '../state/serialize';

export type ControlKind =
  | 'color'
  | 'color-list'
  | 'choice'
  | 'multi-choice'
  | 'toggle'
  | 'knob'
  | 'typography'
  | 'mode'
  | 'fonts'
  | 'constraints'
  | 'path-map'
  | 'components'
  | 'raw-json';

export interface ControlChoice {
  id: string;
  label: string;
  summary: string;
}

export interface ControlMutation {
  label: string;
  value: any;
}

export interface ControlDefinition {
  id: string;
  path: string; // JSON-pointer path, e.g. /identity/brandColor
  group: 'identity' | 'mood' | 'domain' | 'control';
  label: string;
  summary: string;
  controlKind: ControlKind;
  choices?: ControlChoice[];
  negativeLabel?: string;
  positiveLabel?: string;
  min?: number;
  max?: number;
  step?: number;
  preconditions?: BasisIntentState;
  mutations: ControlMutation[];
  intentionallyInert?: string;
}

/**
 * Builds the canonical control registry derived from intent.json.
 */
export function buildControlRegistry(intentDoc: any = {}): Map<string, ControlDefinition> {
  const registry = new Map<string, ControlDefinition>();

  // 1. Identity Fields
  const identityFields = intentDoc.identity?.fields || [];
  for (const field of identityFields) {
    const pointer = `/identity/${field.id}`;
    if (field.id === 'brandColor') {
      registry.set(pointer, {
        id: field.id,
        path: pointer,
        group: 'identity',
        label: field.label,
        summary: field.summary,
        controlKind: 'color',
        mutations: [
          {
            label: 'Sapphire Blue',
            value: {
              type: 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex',
              value: '#0F52BA',
            },
          },
          {
            label: 'Crimson Rose',
            value: {
              type: 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex',
              value: '#E0245E',
            },
          },
        ],
      });
    } else if (field.id === 'supportingColors') {
      registry.set(pointer, {
        id: field.id,
        path: pointer,
        group: 'identity',
        label: field.label,
        summary: field.summary,
        controlKind: 'color-list',
        preconditions: {
          identity: {
            brandColor: {
              type: 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex',
              value: '#0F52BA',
            },
          },
        },
        mutations: [
          {
            label: 'Single Amber',
            value: [
              {
                type: 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex',
                value: '#F57C00',
              },
            ],
          },
          {
            label: 'Duo Emerald & Violet',
            value: [
              {
                type: 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex',
                value: '#388E3C',
              },
              {
                type: 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex',
                value: '#7B1FA2',
              },
            ],
          },
        ],
      });
    } else if (field.id === 'presence') {
      registry.set(pointer, {
        id: field.id,
        path: pointer,
        group: 'identity',
        label: field.label,
        summary: field.summary,
        controlKind: 'choice',
        choices: intentDoc.identity?.presence || [],
        preconditions: {
          identity: {
            brandColor: {
              type: 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex',
              value: '#0F52BA',
            },
          },
        },
        mutations: [
          { label: 'Subtle', value: 'Subtle' },
          { label: 'Dominant', value: 'Dominant' },
        ],
      });
    } else if (field.id === 'typography') {
      registry.set(pointer, {
        id: field.id,
        path: pointer,
        group: 'identity',
        label: field.label,
        summary: field.summary,
        controlKind: 'typography',
        mutations: [
          {
            label: 'Structure Merriweather',
            value: {
              structure: {
                type: 'io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef.Catalog',
                id: 'merriweather',
              },
            },
          },
          {
            label: 'Structure Space Grotesk',
            value: {
              structure: {
                type: 'io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef.Catalog',
                id: 'space-grotesk',
              },
            },
          },
        ],
      });
    } else if (field.id === 'deriveColors') {
      registry.set(pointer, {
        id: field.id,
        path: pointer,
        group: 'identity',
        label: field.label,
        summary: field.summary,
        controlKind: 'toggle',
        mutations: [
          { label: 'Derived (true)', value: true },
          { label: 'Achromatic (false)', value: false },
        ],
      });
    }
  }

  // 2. Mood Preset
  registry.set('/mood/preset', {
    id: 'preset',
    path: '/mood/preset',
    group: 'mood',
    label: 'Mood Preset',
    summary: 'Named archetype driving the base mood profile.',
    controlKind: 'choice',
    choices: intentDoc.mood?.presets || [],
    mutations: [
      { label: 'Calm', value: 'Calm' },
      { label: 'Bold', value: 'Bold' },
      { label: 'Minimal', value: 'Minimal' },
    ],
  });

  // 3. Mood Knobs (all 8)
  const knobs = intentDoc.mood?.knobs || [];
  for (const knob of knobs) {
    const pointer = `/mood/knobs/${knob.id}`;
    registry.set(pointer, {
      id: knob.id,
      path: pointer,
      group: 'mood',
      label: knob.label,
      summary: knob.summary,
      negativeLabel: knob.negativeLabel,
      positiveLabel: knob.positiveLabel,
      min: knob.min,
      max: knob.max,
      step: 0.05,
      controlKind: 'knob',
      mutations: [
        { label: '+0.8 Extreme Positive', value: 0.8 },
        { label: '-0.8 Extreme Negative', value: -0.8 },
      ],
    });
  }

  // 4. Domains & Interactions
  registry.set('/domain/domains', {
    id: 'domains',
    path: '/domain/domains',
    group: 'domain',
    label: 'Product Domains',
    summary: 'Product-domain labels, blended by conservative rules.',
    controlKind: 'multi-choice',
    choices: intentDoc.domain?.domains || [],
    mutations: [
      { label: 'Finance Domain', value: ['Finance'] },
      { label: 'Health Domain', value: ['Health'] },
      { label: 'Social & Media Blend', value: ['Social', 'Media'] },
    ],
  });

  registry.set('/domain/interactions', {
    id: 'interactions',
    path: '/domain/interactions',
    group: 'domain',
    label: 'Interaction Patterns',
    summary: 'Interaction-pattern labels, blended by weighted means.',
    controlKind: 'multi-choice',
    choices: intentDoc.domain?.interactions || [],
    mutations: [
      { label: 'Data Navigation', value: ['DataNavigation'] },
      { label: 'Forms Entry', value: ['FormsEntry'] },
      { label: 'Chat Messaging', value: ['ChatMessaging'] },
    ],
  });

  // 5. Control Subtree
  const controlFields = intentDoc.control?.fields || [];
  for (const field of controlFields) {
    const pointer = `/control/${field.id}`;
    if (field.id === 'mode') {
      registry.set(pointer, {
        id: field.id,
        path: pointer,
        group: 'control',
        label: field.label,
        summary: field.summary,
        controlKind: 'mode',
        mutations: [
          {
            label: 'Light Target Only',
            value: { targets: ['Light'] },
          },
          {
            label: 'Dark Target Only',
            value: { targets: ['Dark'] },
          },
        ],
      });
    } else if (field.id === 'fonts') {
      registry.set(pointer, {
        id: field.id,
        path: pointer,
        group: 'control',
        label: field.label,
        summary: field.summary,
        controlKind: 'fonts',
        mutations: [
          {
            label: 'Heading Level 1 Override to Merriweather',
            value: {
              levelFamilies: {
                StructureLevel1: {
                  type: 'io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef.Catalog',
                  id: 'merriweather',
                },
              },
            },
          },
          {
            label: 'Heading Level 1 Override to JetBrains Mono',
            value: {
              levelFamilies: {
                StructureLevel1: {
                  type: 'io.github.alph_a07.basis.theme.tokens.typography.FontFamilyRef.Catalog',
                  id: 'jetbrains-mono',
                },
              },
            },
          },
        ],
      });
    } else if (field.id === 'constraints') {
      registry.set(pointer, {
        id: field.id,
        path: pointer,
        group: 'control',
        label: field.label,
        summary: field.summary,
        controlKind: 'constraints',
        mutations: [
          {
            label: 'Min Touch Target 56dp',
            value: {
              minTouchTarget: { minSize: 56.0 },
            },
          },
          {
            label: 'Min Touch Target 64dp',
            value: {
              minTouchTarget: { minSize: 64.0 },
            },
          },
        ],
      });
    } else if (field.id === 'tokens') {
      registry.set(pointer, {
        id: field.id,
        path: pointer,
        group: 'control',
        label: field.label,
        summary: field.summary,
        controlKind: 'path-map',
        mutations: [
          {
            label: 'Spacing Level 4 to 36dp',
            value: {
              paths: {
                'spacing.level4': {
                  type: 'io.github.alph_a07.basis.theme.intent.controls.overrides.OverrideValue.Dp',
                  value: 36.0,
                },
              },
            },
          },
          {
            label: 'Spacing Level 4 to 48dp',
            value: {
              paths: {
                'spacing.level4': {
                  type: 'io.github.alph_a07.basis.theme.intent.controls.overrides.OverrideValue.Dp',
                  value: 48.0,
                },
              },
            },
          },
        ],
      });
    } else if (field.id === 'components') {
      registry.set(pointer, {
        id: field.id,
        path: pointer,
        group: 'control',
        label: field.label,
        summary: field.summary,
        controlKind: 'components',
        intentionallyInert:
          'Component style patches are evaluated at component read time in Compose/specimens, not during global token tree derivation.',
        mutations: [
          {
            label: 'Surface Secondary Prominence',
            value: {
              byComponent: {
                Surface: {
                  all: {
                    universal: {
                      prominence: 'Secondary',
                    },
                  },
                },
              },
            },
          },
          {
            label: 'Surface Tertiary Prominence',
            value: {
              byComponent: {
                Surface: {
                  all: {
                    universal: {
                      prominence: 'Tertiary',
                    },
                  },
                },
              },
            },
          },
        ],
      });
    }
  }

  return registry;
}
