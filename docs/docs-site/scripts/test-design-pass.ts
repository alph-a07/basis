import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteDir = path.resolve(__dirname, '..');
const repoRoot = path.resolve(siteDir, '../..');

console.log('Testing Design Pass specifications...');

// 1. Reading column width verification (about 70ch / 72ch)
console.log('1. Verifying reading column constraint...');
const docsLayoutPath = path.join(siteDir, 'src/layouts/DocsLayout.astro');
assert(fs.existsSync(docsLayoutPath), 'DocsLayout.astro must exist');
const docsLayoutContent = fs.readFileSync(docsLayoutPath, 'utf-8');
assert(
  docsLayoutContent.includes('72ch'),
  'DocsLayout must enforce reading column width constraint of ~70ch (found 72ch)'
);
console.log('   ✅ Reading column constraint (~70ch / 72ch) verified');

// 2. Motion rules honoring prefers-reduced-motion
console.log('2. Verifying prefers-reduced-motion motion rules...');
const baseLayoutPath = path.join(siteDir, 'src/layouts/BaseLayout.astro');
assert(fs.existsSync(baseLayoutPath), 'BaseLayout.astro must exist');
const baseLayoutContent = fs.readFileSync(baseLayoutPath, 'utf-8');
assert(
  baseLayoutContent.includes('@media (prefers-reduced-motion: reduce)'),
  'BaseLayout must define @media (prefers-reduced-motion: reduce)'
);
assert(
  baseLayoutContent.includes('animation-duration: 0.01ms') &&
  baseLayoutContent.includes('transition-duration: 0.01ms') &&
  baseLayoutContent.includes('scroll-behavior: auto'),
  'Reduced motion rules must suppress animations, transitions, and smooth scrolling'
);

const tocPath = path.join(siteDir, 'src/components/Toc.astro');
const tocContent = fs.readFileSync(tocPath, 'utf-8');
assert(
  tocContent.includes('prefers-reduced-motion'),
  'Toc scroll logic must respect prefers-reduced-motion'
);
console.log('   ✅ prefers-reduced-motion rules verified across styles and interaction scripts');

// 3. Focus styles verification
console.log('3. Verifying focus styles...');
assert(
  baseLayoutContent.includes(':focus-visible') &&
  baseLayoutContent.includes('--docs-focus-ring'),
  'BaseLayout must define global :focus-visible using --docs-focus-ring'
);
console.log('   ✅ Accessible focus ring styles verified');

// 4. CodeBlock styling from derived tokens
console.log('4. Verifying CodeBlock derived token bindings...');
const codeBlockPath = path.join(siteDir, 'src/components/CodeBlock.astro');
assert(fs.existsSync(codeBlockPath), 'CodeBlock.astro must exist');
const codeBlockContent = fs.readFileSync(codeBlockPath, 'utf-8');
assert(
  codeBlockContent.includes('--docs-code-bg') &&
  codeBlockContent.includes('--docs-code-border'),
  'CodeBlock must be styled using derived tokens --docs-code-bg and --docs-code-border'
);
console.log('   ✅ CodeBlock derived token styling verified');

// 5. Typography and Spacing scale
console.log('5. Verifying typography and spacing tokens...');
const docsTokensPath = path.join(siteDir, 'src/styles/docs-tokens.css');
assert(fs.existsSync(docsTokensPath), 'docs-tokens.css must exist');
const docsTokensContent = fs.readFileSync(docsTokensPath, 'utf-8');
assert(
  docsTokensContent.includes('--docs-font-sans') &&
  docsTokensContent.includes('--docs-font-mono') &&
  docsTokensContent.includes('--docs-reading-width'),
  'docs-tokens.css must define typography and layout tokens'
);
console.log('   ✅ Typography and layout tokens verified');

// 6. Lighthouse CI configuration file and thresholds
console.log('6. Verifying Lighthouse CI configuration...');
const lhciPath = path.join(repoRoot, '.lighthouserc.json');
assert(fs.existsSync(lhciPath), '.lighthouserc.json must exist');
const lhciConfig = JSON.parse(fs.readFileSync(lhciPath, 'utf-8'));
assert(
  lhciConfig.ci?.assert?.assertions?.['categories:accessibility']?.[1]?.minScore >= 0.95,
  'Lighthouse CI accessibility score threshold must be >= 0.95'
);
assert(
  lhciConfig.ci?.assert?.assertions?.['categories:performance']?.[1]?.minScore >= 0.90,
  'Lighthouse CI performance score threshold must be >= 0.90'
);
console.log('   ✅ Lighthouse CI thresholds verified (accessibility >= 0.95, performance >= 0.90)');

console.log('\n🎉 All Design Pass specifications passed successfully!');
