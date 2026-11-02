/**
 * fonts/loader.ts - On-demand Google Fonts CSS2 loading with subset trick.
 */

const loadedUrls = new Set<string>();
const loadingPromises = new Map<string, Promise<boolean>>();

type FontLoadErrorListener = (family: string, error: string) => void;
const errorListeners = new Set<FontLoadErrorListener>();

export function onFontLoadError(listener: FontLoadErrorListener): () => void {
  errorListeners.add(listener);
  return () => errorListeners.delete(listener);
}

function notifyError(family: string, error: string) {
  for (const l of errorListeners) {
    l(family, error);
  }
}

/**
 * Loads preview font subset for listbox rows using Google Fonts &text= trick.
 */
export function loadFontPreview(family: string, previewText = 'Aa Bb 123'): Promise<boolean> {
  if (typeof document === 'undefined') return Promise.resolve(true);

  const cleanFamily = family.trim();
  const subsetParam = encodeURIComponent(previewText);
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(cleanFamily)}:wght@400&text=${subsetParam}&display=swap`;

  return injectStylesheet(cleanFamily, url);
}

/**
 * Loads complete font family with required weights for scene rendering.
 */
export function loadFullFont(family: string, weights: number[] = [400, 500, 600, 700]): Promise<boolean> {
  if (typeof document === 'undefined') return Promise.resolve(true);

  const cleanFamily = family.trim();
  const sortedWeights = [...new Set(weights)].sort((a, b) => a - b);
  const wghtParam = sortedWeights.length > 0 ? `:wght@${sortedWeights.join(';')}` : '';
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(cleanFamily)}${wghtParam}&display=swap`;

  return injectStylesheet(cleanFamily, url, sortedWeights[0] ?? 400);
}

function injectStylesheet(family: string, url: string, testWeight = 400): Promise<boolean> {
  if (loadedUrls.has(url)) return Promise.resolve(true);
  if (loadingPromises.has(url)) return loadingPromises.get(url)!;

  const promise = new Promise<boolean>((resolve) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;

    link.onload = async () => {
      loadedUrls.add(url);
      try {
        if (document.fonts) {
          await document.fonts.load(`${testWeight} 16px "${family}"`);
        }
      } catch {
        // Font loaded via stylesheet even if font.load timed out
      }
      resolve(true);
    };

    link.onerror = () => {
      notifyError(family, `Network error loading Google Font "${family}". Falling back to system sans-serif.`);
      resolve(false);
    };

    document.head.appendChild(link);
  }).finally(() => {
    loadingPromises.delete(url);
  });

  loadingPromises.set(url, promise);
  return promise;
}
