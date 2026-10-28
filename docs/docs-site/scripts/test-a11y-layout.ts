import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';
import axe from 'axe-core';

import { execSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  console.log(`Dist directory not found at ${distDir}. Building site first...`);
  execSync('npm run build', { cwd: path.resolve(__dirname, '..'), stdio: 'inherit' });
}

// Find all HTML files in dist
function getHtmlFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getHtmlFiles(distDir);
console.log(`Auditing accessibility with axe-core across ${htmlFiles.length} generated HTML pages...`);

let totalViolations = 0;

for (const filePath of htmlFiles) {
  const relativePath = path.relative(distDir, filePath);
  const html = fs.readFileSync(filePath, 'utf-8');

  const dom = new JSDOM(html, {
    runScripts: 'outside-only',
    url: `http://localhost:4321/${relativePath}`,
    virtualConsole: new (class extends (await import('jsdom')).VirtualConsole {
      constructor() {
        super();
        this.on('jsdomError', (err) => {
          if (!err.message?.includes('HTMLCanvasElement')) {
            console.error(err);
          }
        });
      }
    })(),
  });

  const { window } = dom;

  // Run axe in the JSDOM environment
  const results = await axe.run(window.document.documentElement as unknown as Element, {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
    },
    rules: {
      // In JSDOM, CSS color-contrast cannot be computed without a true headless browser renderer
      'color-contrast': { enabled: false },
    },
  });

  if (results.violations.length > 0) {
    totalViolations += results.violations.length;
    console.error(`\n❌ Accessibility violations found in ${relativePath}:`);
    for (const violation of results.violations) {
      console.error(`  - [${violation.id}] ${violation.help} (${violation.impact})`);
      console.error(`    Description: ${violation.description}`);
      console.error(`    Help URL: ${violation.helpUrl}`);
      for (const node of violation.nodes) {
        console.error(`    Target: ${node.target.join(' ')}`);
        console.error(`    HTML: ${node.html}`);
      }
    }
  } else {
    console.log(`  ✅ ${relativePath}: 0 violations`);
  }
}

if (totalViolations > 0) {
  console.error(`\n💥 Total accessibility violations: ${totalViolations}`);
  process.exit(1);
} else {
  console.log(`\n🎉 Axe accessibility audit passed: 0 violations across all ${htmlFiles.length} pages!`);
}
