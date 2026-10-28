import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { docsIntent } from '../src/config/docs-intent.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

console.log('Testing P1.4 Chrome theming resolution and contracts...');

// 1. Locate docs-runtime artifact
const runtimePath = path.resolve(__dirname, '../../docs-runtime/build/dist/js/productionLibrary/Basis-docs-runtime.js');
if (!fs.existsSync(runtimePath)) {
  console.error(`❌ docs-runtime artifact not found at ${runtimePath}`);
  process.exit(1);
}
const runtime = require(runtimePath);

// 2. Validate docsIntent resolution
const responseJson = runtime.io.github.alph_a07.basis.docs.runtime.resolveWithPrefix(JSON.stringify(docsIntent), 'd');
const response = JSON.parse(responseJson);

if (!response.ok) {
  console.error('❌ docsIntent failed resolution:', response.violations);
  process.exit(1);
}
console.log('✅ docsIntent resolved with ok: true');

// 3. Verify deriveColors: false results in neutral base
if (docsIntent.identity?.deriveColors !== false) {
  console.error('❌ docsIntent must specify identity.deriveColors = false');
  process.exit(1);
}
console.log('✅ docsIntent has deriveColors = false');

// 4. Verify generated tokens contain all token families with prefix 'd'
const darkTokens = response.tokens.dark;
const lightTokens = response.tokens.light;

const requiredPrefixes = [
  '--d-color-surface-',
  '--d-color-content-',
  '--d-color-border-',
  '--d-spacing-',
  '--d-radius-',
  '--d-depth-',
  '--d-motion-',
  '--d-size-',
  '--d-typography-',
];

for (const pref of requiredPrefixes) {
  const hasInDark = Object.keys(darkTokens).some((k) => k.startsWith(pref));
  const hasInLight = Object.keys(lightTokens).some((k) => k.startsWith(pref));
  if (!hasInDark || !hasInLight) {
    console.error(`❌ Missing token family ${pref} in resolved tokens`);
    process.exit(1);
  }
}
console.log(`✅ All ${requiredPrefixes.length} token families present in both light and dark sets`);

// 5. Verify invalid intent fails resolution
const invalidResponseJson = runtime.io.github.alph_a07.basis.docs.runtime.resolveWithPrefix(
  JSON.stringify({ identity: { presence: 'InvalidPresenceValue' } }),
  'd'
);
const invalidResponse = JSON.parse(invalidResponseJson);
if (invalidResponse.ok) {
  console.error('❌ Resolver was expected to fail for invalid intent payload');
  process.exit(1);
}
console.log('✅ Resolver properly reports ok: false on invalid intent payload');

// 6. Verify theme.css and docs-tokens.css exist
const themeCssPath = path.resolve(__dirname, '../src/styles/theme.css');
const docsTokensCssPath = path.resolve(__dirname, '../src/styles/docs-tokens.css');

if (!fs.existsSync(themeCssPath)) {
  console.error(`❌ Generated theme.css not found at ${themeCssPath}`);
  process.exit(1);
}
if (!fs.existsSync(docsTokensCssPath)) {
  console.error(`❌ docs-tokens.css not found at ${docsTokensCssPath}`);
  process.exit(1);
}
console.log('✅ theme.css and docs-tokens.css verified');

// 7. Verify blocking script exists in built HTML
const distIndexPath = path.resolve(__dirname, '../dist/index.html');
if (fs.existsSync(distIndexPath)) {
  const html = fs.readFileSync(distIndexPath, 'utf-8');
  if (!html.includes('basis-theme') || !html.includes('data-theme')) {
    console.error('❌ Built index.html missing blocking theme script in head');
    process.exit(1);
  }
  console.log('✅ Blocking head theme script verified in built HTML');
}

console.log('\n🎉 P1.4 Theme contract checks passed successfully!');
