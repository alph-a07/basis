/**
 * studio-ui.ts - Hand-written UI hints and starter intents for Basis Studio.
 *
 * Rules:
 * - Hand-written files are strictly limited to UI hints (control order, primary/advanced knob split,
 *   knob icons, starter intents, notVisual allowlist). Everything about the intent vocabulary is generated.
 */

export interface StarterIntent {
  id: string;
  name: string;
  description: string;
  intent: Record<string, any>;
}

export type RailCategory =
  | 'mood'
  | 'identity'
  | 'domain'
  | 'mode'
  | 'fonts'
  | 'constraints'
  | 'tokens'
  | 'components';

export interface RailCategoryMeta {
  id: RailCategory;
  label: string;
  icon: string;
  description: string;
}

export const RAIL_CATEGORIES: RailCategoryMeta[] = [
  {
    id: 'mood',
    label: 'Mood',
    icon: 'sparkles',
    description: 'Archetypal presets and fine-grained feel knobs.',
  },
  {
    id: 'identity',
    label: 'Identity',
    icon: 'palette',
    description: 'Brand colors, presence level, and brand typography.',
  },
  {
    id: 'domain',
    label: 'Domain',
    icon: 'layout-grid',
    description: 'Product domain and interaction pattern influences.',
  },
  {
    id: 'mode',
    label: 'Mode',
    icon: 'sun-moon',
    description: 'Preferred color mode and target generation controls.',
  },
  {
    id: 'fonts',
    label: 'Fonts',
    icon: 'type',
    description: 'Brand typography candidates and deep per-role font locks.',
  },
  {
    id: 'constraints',
    label: 'Constraints',
    icon: 'shield-check',
    description: 'Non-negotiable accessibility and sizing floors.',
  },
  {
    id: 'tokens',
    label: 'Tokens',
    icon: 'sliders',
    description: 'Direct token path override values.',
  },
  {
    id: 'components',
    label: 'Components',
    icon: 'component',
    description: 'Component style patches across variants and states.',
  },
];

export const PRIMARY_KNOBS = ['warmth', 'chroma', 'contrast', 'roundness'] as const;
export const ADVANCED_KNOBS = [
  'density',
  'typographyExpressiveness',
  'motionEnergy',
  'playfulness',
] as const;

export const KNOB_ICONS: Record<string, string> = {
  warmth: 'sun',
  chroma: 'droplet',
  contrast: 'contrast',
  roundness: 'square',
  density: 'align-justify',
  typographyExpressiveness: 'type',
  motionEnergy: 'zap',
  playfulness: 'smile',
};

export const NOT_VISUAL_ALLOWLIST: Record<string, string> = {
  // If shorthand typography is broken down into sub-vars in CSS, shorthand var is allowable
};

export const STARTER_INTENTS: StarterIntent[] = [
  {
    id: 'empty',
    name: 'Default Neutral',
    description: 'Minimal unconfigured intent; resolves strictly to default system tokens.',
    intent: {},
  },
  {
    id: 'fintech',
    name: 'Fintech Analytics',
    description: 'Information-first banking experience with compact density and high-contrast tables.',
    intent: {
      identity: {
        brandColor: {
          type: 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex',
          value: '#0F52BA',
        },
        presence: 'Strong',
        deriveColors: true,
      },
      mood: {
        preset: 'Professional',
        knobs: {
          density: 0.7,
          contrast: 0.4,
        },
      },
      domain: {
        domains: ['Finance'],
        interactions: ['DataNavigation', 'DashboardMonitoring'],
      },
    },
  },
  {
    id: 'healthcare',
    name: 'Calm Healthcare',
    description: 'Wellness and clinical portal with warm hues, softened corners, and restrained motion.',
    intent: {
      identity: {
        brandColor: {
          type: 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex',
          value: '#008080',
        },
        presence: 'Balanced',
        deriveColors: true,
      },
      mood: {
        preset: 'Calm',
        knobs: {
          warmth: 0.3,
          roundness: 0.6,
          motionEnergy: -0.5,
        },
      },
      domain: {
        domains: ['Health'],
        interactions: ['FormsEntry', 'ContentReading'],
      },
    },
  },
  {
    id: 'creator',
    name: 'Bold Social Creator',
    description: 'Vivid community feed with saturated accents, snappy transitions, and playful elements.',
    intent: {
      identity: {
        brandColor: {
          type: 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex',
          value: '#E0245E',
        },
        presence: 'Dominant',
        deriveColors: true,
      },
      mood: {
        preset: 'Bold',
        knobs: {
          chroma: 0.8,
          motionEnergy: 0.6,
          playfulness: 0.5,
        },
      },
      domain: {
        domains: ['Social', 'Media'],
        interactions: ['ContentFeed', 'ChatMessaging'],
      },
    },
  },
  {
    id: 'commerce',
    name: 'Modern Commerce',
    description: 'Focused retail checkout with clear prominence tiers and accessible touch targets.',
    intent: {
      identity: {
        brandColor: {
          type: 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex',
          value: '#6C5CE7',
        },
        presence: 'Strong',
        deriveColors: true,
      },
      mood: {
        preset: 'Expressive',
        knobs: {
          contrast: 0.5,
          roundness: 0.4,
        },
      },
      domain: {
        domains: ['Commerce'],
        interactions: ['CheckoutCommerce', 'MediaBrowse'],
      },
      control: {
        mode: {
          preferred: 'Dark',
          targets: ['Light', 'Dark'],
        },
      },
    },
  },
];
