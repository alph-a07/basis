/**
 * generate-fonts-catalog.ts - Fetches and normalizes Google Fonts metadata into fonts-catalog.json.
 *
 * Source: Fontsource public metadata API (Option B from spec: no API key required).
 * Normalizes to schema:
 * {
 *   id: string;
 *   family: string;
 *   category: 'sans-serif' | 'serif' | 'display' | 'handwriting' | 'monospace';
 *   weights: number[];
 *   styles: string[];
 *   subsets: string[];
 *   variable: boolean;
 * }
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export interface FontCatalogItem {
  id: string;
  family: string;
  category: 'sans-serif' | 'serif' | 'display' | 'handwriting' | 'monospace';
  weights: number[];
  styles: string[];
  subsets: string[];
  variable: boolean;
}

export async function generateFontsCatalog(): Promise<{ total: number; destPath: string }> {
  console.log('Fetching Google Fonts catalog metadata from Fontsource API...');
  const res = await fetch('https://api.fontsource.org/v1/fonts');
  if (!res.ok) {
    throw new Error(`Fontsource API responded with status ${res.status}: ${res.statusText}`);
  }

  const rawList: any[] = await res.json();
  const validCategories = new Set(['sans-serif', 'serif', 'display', 'handwriting', 'monospace']);

  const normalized: FontCatalogItem[] = [];
  for (const item of rawList) {
    if (!item.family || !item.weights || !Array.isArray(item.weights)) continue;
    const cat = validCategories.has(item.category) ? item.category : 'sans-serif';
    normalized.push({
      id: item.id || item.family.toLowerCase().replace(/\s+/g, '-'),
      family: item.family,
      category: cat as FontCatalogItem['category'],
      weights: item.weights.sort((a: number, b: number) => a - b),
      styles: item.styles || ['normal'],
      subsets: item.subsets || ['latin'],
      variable: Boolean(item.variable),
    });
  }

  if (normalized.length < 1000) {
    throw new Error(`Catalog sanity check failed: expected >= 1000 families, found ${normalized.length}`);
  }

  const destPath = path.resolve(__dirname, '../src/studio/fonts/fonts-catalog.json');
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, JSON.stringify(normalized), 'utf-8');

  console.log(`✅ Generated ${normalized.length} families into ${path.relative(process.cwd(), destPath)}`);
  return { total: normalized.length, destPath };
}

// Run when executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateFontsCatalog().catch((err) => {
    console.error('Failed to generate fonts catalog:', err);
    process.exit(1);
  });
}
