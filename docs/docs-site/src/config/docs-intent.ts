/**
 * Fixed BasisIntent for the documentation site chrome.
 *
 * Per locked decisions & requirements:
 * - Default empty intent for global theme
 * - deriveColors = false (fully achromatic neutral base)
 */
export interface BasisIntent {
  identity?: {
    brandColor?: string | null;
    supportingColors?: string[];
    presence?: 'Subtle' | 'Balanced' | 'Strong' | 'Dominant' | null;
    deriveColors?: boolean;
    typography?: unknown;
  };
  mood?: {
    preset?: string | null;
    knobs?: Record<string, number | null>;
  };
  domain?: {
    domain?: string | null;
    pattern?: string | null;
  };
  control?: unknown;
}

export const docsIntent: BasisIntent = {
  identity: {
    deriveColors: false,
  },
};
