/**
 * studio-ui.ts - Hand-written UI hints for Intent Studio and Landing controls.
 *
 * Provides presentation-level metadata that does not belong in the canonical
 * Kotlin intent model (which stays pure and platform-agnostic):
 * - Curated font families for typography exploration
 * - Knob step granularity and limits
 * - Display ordering for intent control groups and axes
 */

export interface CuratedFont {
  id: string;
  name: string;
  category: 'sans-serif' | 'serif' | 'monospace' | 'display';
  weights: number[];
  sample: string;
}

export interface StudioUiConfig {
  /** Default slider step granularity for all knobs unless overridden. */
  defaultKnobStep: number;
  /** Per-knob step overrides if specific precision is preferred. */
  knobSteps: Record<string, number>;
  /** Preferred display ordering for controls. */
  order: {
    groups: string[];
    knobs: string[];
    presence: string[];
    presets: string[];
    domains: string[];
    interactions: string[];
  };
  /** Curated Google Font families aligned with Basis GoogleFontCatalog. */
  curatedFonts: CuratedFont[];
}

export const studioUiConfig: StudioUiConfig = {
  defaultKnobStep: 0.05,
  knobSteps: {
    warmth: 0.05,
    chroma: 0.05,
    contrast: 0.05,
    density: 0.05,
    roundness: 0.05,
    typographyExpressiveness: 0.05,
    motionEnergy: 0.05,
    playfulness: 0.05,
  },
  order: {
    groups: ['identity', 'typography', 'mood', 'domain', 'control'],
    knobs: [
      'warmth',
      'chroma',
      'contrast',
      'density',
      'roundness',
      'typographyExpressiveness',
      'motionEnergy',
      'playfulness',
    ],
    presence: ['Subtle', 'Balanced', 'Strong', 'Dominant'],
    presets: [
      'Neutral',
      'Calm',
      'Professional',
      'Bold',
      'Playful',
      'Minimal',
      'Expressive',
    ],
    domains: [
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
    ],
    interactions: [
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
    ],
  },
  curatedFonts: [
    {
      id: 'inter',
      name: 'Inter',
      category: 'sans-serif',
      weights: [400, 500, 600, 700],
      sample: 'System UI & Modern Interface',
    },
    {
      id: 'roboto',
      name: 'Roboto',
      category: 'sans-serif',
      weights: [400, 500, 700],
      sample: 'Material Standard & Clean Grotesque',
    },
    {
      id: 'plus-jakarta-sans',
      name: 'Plus Jakarta Sans',
      category: 'sans-serif',
      weights: [400, 500, 600, 700, 800],
      sample: 'Geometric Modern Grotesque',
    },
    {
      id: 'outfit',
      name: 'Outfit',
      category: 'sans-serif',
      weights: [400, 500, 600, 700],
      sample: 'Friendly Geometric Tech Display',
    },
    {
      id: 'merriweather',
      name: 'Merriweather',
      category: 'serif',
      weights: [300, 400, 700],
      sample: 'Editorial Long-form Reading',
    },
    {
      id: 'playfair-display',
      name: 'Playfair Display',
      category: 'serif',
      weights: [400, 600, 700],
      sample: 'High-contrast Editorial Headline',
    },
    {
      id: 'jetbrains-mono',
      name: 'JetBrains Mono',
      category: 'monospace',
      weights: [400, 500, 700],
      sample: 'Developer Tooling & Code Blocks',
    },
    {
      id: 'space-grotesk',
      name: 'Space Grotesk',
      category: 'display',
      weights: [400, 500, 600, 700],
      sample: 'Display Personality & Tech Aesthetics',
    },
  ],
};
