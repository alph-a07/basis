/**
 * preview-theme.ts - Deferred localized intent resolution for Landing and Studio previews.
 * Resolves local intent dynamically into --b-* preview scope tokens without affecting
 * the global --d-* docs chrome theme.
 */

export interface LocalizedPreviewConfig {
  brandColor?: string | null;
  presence?: 'Subtle' | 'Balanced' | 'Strong' | 'Dominant' | null;
  moodPreset?: string | null;
  deriveColors?: boolean;
}

/**
 * Resolves a localized intent and applies the resulting --b-* CSS variables
 * directly to the target preview container.
 */
export async function applyLocalizedPreviewTheme(
  targetElement: HTMLElement,
  config: LocalizedPreviewConfig = {}
): Promise<boolean> {
  try {
    // Dynamic import to defer loading docs-runtime until preview needs it
    // In browser/Node environment, load the built docs-runtime library
    const localIntent = {
      identity: {
        brandColor: config.brandColor ? { hex: config.brandColor } : null,
        presence: config.presence || null,
        deriveColors: config.deriveColors ?? true,
      },
      mood: config.moodPreset ? { preset: config.moodPreset } : null,
    };

    // If running in browser and runtime is available globally or via dynamic import
    const win = typeof window !== 'undefined' ? (window as any) : null;
    const runtime = win?.Basis_docs_runtime?.io?.github?.alph_a07?.basis?.docs?.runtime;

    if (runtime) {
      const resultJson = runtime.resolveWithPrefix(JSON.stringify(localIntent), 'b');
      const result = JSON.parse(resultJson);
      if (result.ok && result.tokens) {
        const theme = document.documentElement.getAttribute('data-theme') || 'dark';
        const tokensMap = theme === 'dark' ? result.tokens.dark : result.tokens.light;
        for (const [key, value] of Object.entries(tokensMap)) {
          targetElement.style.setProperty(key, value as string);
        }
        return true;
      }
    }
    return false;
  } catch (err) {
    console.warn('Deferred preview theme resolution:', err);
    return false;
  }
}
