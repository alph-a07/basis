import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { computeLandingPalette, paletteToCssDeclarations } from './landing-palette';

const require = createRequire(import.meta.url);

function findProjectRoot(): string {
  let dir = process.cwd();
  while (dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, 'settings.gradle.kts')) || fs.existsSync(path.join(dir, 'basis-theme'))) {
      return dir;
    }
    dir = path.dirname(dir);
  }
  return process.cwd();
}

export interface InlinedLandingTheme {
  css: string;
  lightTokensCount: number;
  darkTokensCount: number;
}

/**
 * Resolves the default landing intent at build time using the real docs-runtime artifact,
 * returning scoped CSS variables to inline in the static HTML for no-JS fallback.
 */
export function resolveLandingDefaultCss(elementSelector: string = '#landing-preview'): InlinedLandingTheme {
  const root = findProjectRoot();
  const runtimePath = path.resolve(
    root,
    'docs/docs-runtime/build/dist/js/productionLibrary/Basis-docs-runtime.js'
  );

  if (!fs.existsSync(runtimePath)) {
    throw new Error(
      `Could not locate Basis-docs-runtime.js artifact at ${runtimePath}. Run ./gradlew :docs-runtime:compileKotlinJs first.`
    );
  }

  const runtime = require(runtimePath);
  const defaultIntent = {
    identity: {
      brandColor: { type: 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex', value: '#3b82f6' },
      presence: 'Balanced',
      deriveColors: true,
    },
    mood: {
      preset: 'Calm',
    },
  };

  const responseJson = runtime.io.github.alph_a07.basis.docs.runtime.resolveWithPrefix(
    JSON.stringify(defaultIntent),
    'b'
  );
  const response = JSON.parse(responseJson);

  if (!response.ok || !response.tokens) {
    throw new Error('Failed to resolve default landing theme with docs-runtime.');
  }

  const defaultDarkPalette = computeLandingPalette('#3b82f6', 'Balanced', 'Calm', true);
  const defaultLightPalette = computeLandingPalette('#3b82f6', 'Balanced', 'Calm', false);

  const darkLandingCss = paletteToCssDeclarations(defaultDarkPalette);
  const lightLandingCss = paletteToCssDeclarations(defaultLightPalette);

  const rawCss: string = response.tokens.css || '';
  const scopedCss = rawCss
    .replace(':root, [data-theme="light"] {', `:root, [data-theme="light"], ${elementSelector} {\n${lightLandingCss}\n`)
    .replace('[data-theme="dark"] {', `[data-theme="dark"], [data-theme="dark"] ${elementSelector} {\n${darkLandingCss}\n`);

  return {
    css: scopedCss,
    lightTokensCount: Object.keys(response.tokens.light || {}).length,
    darkTokensCount: Object.keys(response.tokens.dark || {}).length,
  };
}
