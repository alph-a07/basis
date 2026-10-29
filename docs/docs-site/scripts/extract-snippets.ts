import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../..');
const basisComponentsGradle = path.join(repoRoot, 'basis-components/build.gradle.kts');
const rootChangelogPath = path.join(repoRoot, 'CHANGELOG.md');
const docsChangelogPath = path.join(__dirname, '../src/content/docs/changelog.mdx');
const snippetsSource = path.join(
  repoRoot,
  'demo-app/src/main/kotlin/io/github/alph_a07/basis/demo/snippets/DocSnippets.kt'
);
const outputDir = path.join(__dirname, '../src/generated');
const outputFile = path.join(outputDir, 'snippets.json');
const versionFile = path.join(outputDir, 'version.json');

export function extractBasisVersion(): string {
  if (!fs.existsSync(basisComponentsGradle)) {
    throw new Error(`basis-components/build.gradle.kts not found at: ${basisComponentsGradle}`);
  }
  const content = fs.readFileSync(basisComponentsGradle, 'utf-8');
  const match = content.match(/version\s*=\s*["']([^"']+)["']/);
  if (!match) {
    throw new Error(`Could not find 'version = "..."' in ${basisComponentsGradle}`);
  }
  return match[1];
}

export function syncChangelog(version: string): void {
  if (!fs.existsSync(rootChangelogPath)) {
    console.warn(`⚠️ Root CHANGELOG.md not found at: ${rootChangelogPath}`);
    return;
  }

  const rootContent = fs.readFileSync(rootChangelogPath, 'utf-8');

  // Verify that CHANGELOG.md documents the active version
  const hasVersionEntry = rootContent.includes(`[${version}]`) || rootContent.includes(`v${version}`);
  if (!hasVersionEntry) {
    console.warn(`⚠️ Warning: Root CHANGELOG.md does not yet document version ${version}`);
  }

  // Strip top-level '# Changelog' since docs layout renders title from frontmatter
  let body = rootContent.replace(/^#\s+Changelog\r?\n+/, '').trim();

  // Transform release headers: "## [0.1.0] - 2026-10-29" -> rich release header component
  body = body.replace(
    /^##\s*\[?([0-9]+\.[0-9]+\.[0-9]+[^\]]*)\]?\s*[-—]\s*([0-9]{4}-[0-9]{2}-[0-9]{2})/gm,
    (match, ver, dateStr) => {
      const isLatest = ver === version;
      const [year, month, day] = dateStr.split('-');
      const dateObj = new Date(Date.UTC(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10)));
      const formattedDate = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      });
      const badgeHtml = isLatest ? '<span class="release-badge latest">Latest</span>' : '';
      return `<div class="release-header-container">
  <div class="release-title-row">

## v${ver}

    ${badgeHtml}
  </div>
  <time class="release-date" datetime="${dateStr}">
    <svg class="calendar-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
    <span>${formattedDate}</span>
  </time>
</div>`;
    }
  );

  const mdx = `---
title: Changelog
section: Changelog
order: 1
status: published
description: Release history, versioning policy, and update notes for Basis.
---

${body}

## Next Step

Explore how to set up Basis in your project in [Overview](/docs/getting-started/overview).
`;

  fs.writeFileSync(docsChangelogPath, mdx, 'utf-8');
  console.log(`✅ Synchronized ${path.relative(repoRoot, docsChangelogPath)} from root CHANGELOG.md`);
}

export function extractSnippets(): Record<string, string> {
  const version = extractBasisVersion();

  // Sync documentation changelog from repository root
  syncChangelog(version);

  if (!fs.existsSync(snippetsSource)) {
    throw new Error(`DocSnippets source file not found at: ${snippetsSource}`);
  }

  const content = fs.readFileSync(snippetsSource, 'utf-8');
  const regionRegex = /\/\/\s*region\s+([A-Za-z0-9_-]+)\r?\n([\s\S]*?)\r?\n\s*\/\/\s*endregion\s+\1/g;
  let match;
  const snippets: Record<string, string> = {};

  while ((match = regionRegex.exec(content)) !== null) {
    const name = match[1];
    const code = match[2].trimEnd();
    snippets[name] = code;
  }

  // Generate dynamic installation snippet derived directly from basis-components/build.gradle.kts version
  snippets['installation_dependencies'] = `dependencies {
    val basisVersion = "${version}"

    // Basis Design System
    implementation("io.github.alph_a07:basis-components:$basisVersion")
    implementation("io.github.alph_a07:basis-theme:$basisVersion")

    // Android Lint enforcement
    lintChecks("io.github.alph_a07:basis-lint:$basisVersion")

    // Compose Foundation dependencies
    implementation(platform("androidx.compose:compose-bom:2024.12.01"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.foundation:foundation")
}`;

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputFile, JSON.stringify(snippets, null, 2), 'utf-8');
  fs.writeFileSync(
    versionFile,
    JSON.stringify({ version, versionName: `v${version}` }, null, 2),
    'utf-8'
  );

  console.log(`✅ Extracted version ${version} from basis-components/build.gradle.kts`);
  console.log(`✅ Extracted ${Object.keys(snippets).length} compile-checked snippets to ${path.relative(repoRoot, outputFile)}`);

  return snippets;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  extractSnippets();
}
