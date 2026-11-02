/**
 * fonts/catalog.ts - Google Fonts catalog and shortlisting rules from basis-theme.
 */

import fontsCatalogData from './fonts-catalog.json';

export interface FontItem {
  id: string;
  family: string;
  category: 'sans-serif' | 'serif' | 'display' | 'handwriting' | 'monospace';
  weights: number[];
  styles: string[];
  subsets: string[];
  variable: boolean;
}

export interface EligibilityResult {
  eligible: boolean;
  reason?: string;
}

export const FONTS_CATALOG: FontItem[] = fontsCatalogData as FontItem[];

/**
 * Checks eligibility of a font family for a specific typography ladder role
 * using the criteria defined in basis-theme (FontCatalogDerivation.kt / FontAssignment.kt).
 */
export function evaluateFontEligibility(
  font: FontItem,
  role: 'structure' | 'content' | 'metadata' = 'content',
): EligibilityResult {
  if (role === 'content') {
    if (font.category === 'display') {
      return { eligible: false, reason: 'Display fonts not eligible for content ladder' };
    }
    if (font.category === 'handwriting') {
      return { eligible: false, reason: 'Script fonts not eligible for content ladder' };
    }
    if (font.category === 'monospace') {
      return { eligible: false, reason: 'Monospace fonts not eligible for content ladder' };
    }
    if (!font.weights.includes(400)) {
      return { eligible: false, reason: 'Missing regular weight (400)' };
    }
    const hasBoldOrSemi = font.weights.includes(600) || font.weights.includes(700);
    if (!hasBoldOrSemi) {
      return { eligible: false, reason: 'Missing emphasis weight (600 or 700)' };
    }
    return { eligible: true };
  }

  if (role === 'structure') {
    if (font.category === 'handwriting') {
      return { eligible: false, reason: 'Script fonts not suitable for structure ladder' };
    }
    if (font.weights.length < 2) {
      return { eligible: false, reason: 'Insufficient weight steps (requires >= 2)' };
    }
    return { eligible: true };
  }

  // metadata role
  if (font.category === 'handwriting') {
    return { eligible: false, reason: 'Script fonts not eligible for metadata ladder' };
  }
  if (!font.weights.includes(400) && !font.weights.includes(500)) {
    return { eligible: false, reason: 'Missing base weight (400 or 500)' };
  }

  return { eligible: true };
}
