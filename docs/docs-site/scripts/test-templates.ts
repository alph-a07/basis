import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';
import assert from 'node:assert';
import { execSync } from 'node:child_process';
import { getSemanticTitle } from '../src/lib/semantic-title';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');

console.log('Testing Component & Section Templates...');

if (!fs.existsSync(distDir)) {
  console.log(`Dist directory not found at ${distDir}. Building site first...`);
  execSync('npm run build', { cwd: path.resolve(__dirname, '..'), stdio: 'inherit' });
}

function loadHtml(relativeRoute: string): Document {
  const filePath = path.join(distDir, relativeRoute, 'index.html');
  assert(fs.existsSync(filePath), `Generated HTML file must exist: ${filePath}`);
  const html = fs.readFileSync(filePath, 'utf-8');
  const dom = new JSDOM(html);
  return dom.window.document;
}

// -------------------------------------------------------------
// 1. Component Tests (BasisIndication) across all 4 tabs
// -------------------------------------------------------------

const hasComponents = fs.existsSync(path.join(distDir, 'docs/components/indication/index.html'));

if (hasComponents) {
  console.log('Testing BasisIndication across all 4 route-per-tab pages...');

// --- Overview Tab ---
const buttonOverviewDoc = loadHtml('docs/components/indication');

// Title & Meta
const titleEl = buttonOverviewDoc.querySelector('.component-title');
assert(titleEl && titleEl.textContent?.includes('Indication'), 'Indication semantic title must render');

// Lifecycle Chips
const statusChip = buttonOverviewDoc.querySelector('.status-chip');
assert(statusChip && statusChip.textContent?.includes('stable'), 'Lifecycle status must be stable');

const gradleFile = path.resolve(__dirname, '../../../basis-components/build.gradle.kts');
const gradleContent = fs.readFileSync(gradleFile, 'utf-8');
const versionMatch = gradleContent.match(/version\s*=\s*["']([^"']+)["']/);
const expectedVersion = versionMatch ? `v${versionMatch[1]}` : 'v0.1.0';

const versionChip = buttonOverviewDoc.querySelector('.version-chip');
assert(versionChip && versionChip.textContent?.includes(expectedVersion), `Version chip must show ${expectedVersion}`);

const familyChip = buttonOverviewDoc.querySelector('.family-chip');
assert(familyChip && familyChip.textContent?.includes('Foundation'), 'Family chip must show Foundation');

const sourceLink = buttonOverviewDoc.querySelector('.source-link');
assert(sourceLink && sourceLink.getAttribute('href')?.includes('BasisIndication.kt'), 'Source link must point to BasisIndication.kt');

// Sidebar component nesting in FOUNDATION -> Components
const foundationNavGroup = Array.from(buttonOverviewDoc.querySelectorAll('.nav-group')).find((g) => {
  return g.querySelector('.nav-group-title')?.textContent?.trim().toLowerCase() === 'foundation';
});
assert(foundationNavGroup, 'Sidebar must contain FOUNDATION section');

const componentsSubgroup = foundationNavGroup.querySelector('.nav-subgroup[data-family="components"]');
assert(componentsSubgroup, 'FOUNDATION section must contain Components subgroup');
assert.strictEqual(componentsSubgroup.querySelector('.nav-subgroup-label')?.textContent?.trim(), 'Components');

const indicationLink = componentsSubgroup.querySelector('a.nav-link[href="/docs/components/indication"]');
assert(indicationLink, 'FOUNDATION -> Components must contain link to /docs/components/indication');
assert(indicationLink.textContent?.includes('Indication'), 'Indication link must have semantic title Indication');
assert(!indicationLink.textContent?.includes('BasisIndication'), 'Indication link must not have Basis prefix');

// Ensure root COMPONENTS section does not contain Indication (or is absent when 0 T1 components exist)
const rootComponentsGroup = buttonOverviewDoc.querySelector('.components-group');
if (rootComponentsGroup) {
  const componentLinks = Array.from(rootComponentsGroup.querySelectorAll('a.nav-link'));
  const hasIndication = componentLinks.some((l) => l.getAttribute('href')?.includes('indication'));
  assert(!hasIndication, 'Foundational Indication component must not be present in root Components group');
}

// Tabs navigation
const tabsNav = buttonOverviewDoc.querySelector('.component-tabs');
assert(tabsNav, 'Component tabs navigation must render');
const activeTabOverview = tabsNav.querySelector('a.active[aria-current="page"]');
assert(activeTabOverview && activeTabOverview.textContent?.trim() === 'Overview', 'Overview tab must be active');

// Quick Start CodeBlock & Copy Button
const quickStartContainer = buttonOverviewDoc.querySelector('[data-code-block]');
assert(quickStartContainer, 'Quick start code block container must render');
const quickStartBlock = quickStartContainer.querySelector('.code-viewport pre code');
assert(quickStartBlock && quickStartBlock.textContent?.includes('rememberBasisIndication'), 'Quick start code block must render highlighted code');

const copyButton = quickStartContainer.querySelector('.copy-button');
assert(copyButton, 'Codeblock copy button must render');
assert.strictEqual(copyButton.getAttribute('aria-label'), 'Copy code to clipboard');
assert(copyButton.getAttribute('data-code')?.includes('rememberBasisIndication'), 'Copy button must contain encoded code payload');

// Usage Guidelines (from sidecar)
const doItems = buttonOverviewDoc.querySelectorAll('.do-card .guideline-item');
assert(doItems.length >= 1, 'Do items must render from sidecar');
const dontItems = buttonOverviewDoc.querySelectorAll('.dont-card .guideline-item');
assert(dontItems.length >= 1, 'Don\'t items must render from sidecar');
const notesItems = buttonOverviewDoc.querySelectorAll('.notes-card .note-item');
assert(notesItems.length >= 1, 'Implementation notes must render from sidecar');

console.log('✅ Indication Overview tab verified');

// --- API Tab ---
const buttonApiDoc = loadHtml('docs/components/indication/api');

const activeTabApi = buttonApiDoc.querySelector('.component-tabs a.active[aria-current="page"]');
assert(activeTabApi && activeTabApi.textContent?.trim() === 'API', 'API tab must be active on /api route');

const declarationBlock = buttonApiDoc.querySelector('.signature-container .code-viewport pre code');
assert(declarationBlock && declarationBlock.textContent?.includes('rememberBasisIndication'), 'Declaration must render in highlighted CodeBlock');

const apiCopyButton = buttonApiDoc.querySelector('.signature-container .copy-button');
assert(apiCopyButton, 'API signature copy button must render');

// Table layout & column widths (fit tables to width)
const tableResponsive = buttonApiDoc.querySelector('.table-responsive');
assert(tableResponsive, 'Table responsive container must render');

const paramRows = buttonApiDoc.querySelectorAll('.params-table tbody tr');
assert(paramRows.length >= 4, 'Parameters table must render parameter rows');

console.log('✅ Indication API tab verified');

// --- Overrides Tab ---
const buttonOverridesDoc = loadHtml('docs/components/indication/overrides');

const activeTabOverrides = buttonOverridesDoc.querySelector('.component-tabs a.active[aria-current="page"]');
assert(activeTabOverrides && activeTabOverrides.textContent?.trim() === 'Overrides', 'Overrides tab must be active');

console.log('✅ Indication Overrides tab verified');

// --- Accessibility Tab ---
const buttonA11yDoc = loadHtml('docs/components/indication/accessibility');

const activeTabA11y = buttonA11yDoc.querySelector('.component-tabs a.active[aria-current="page"]');
assert(activeTabA11y && activeTabA11y.textContent?.trim() === 'Accessibility', 'Accessibility tab must be active');

const reportCard = buttonA11yDoc.querySelector('.report-card');
assert(reportCard, 'Automated test report card must render');
const reportStatus = reportCard.querySelector('.report-status-badge');
assert(reportStatus && reportStatus.textContent?.includes('PASS'), 'Report status must be PASS');

const narrativeBlock = buttonA11yDoc.querySelector('.narrative-block');
assert(narrativeBlock && narrativeBlock.textContent?.includes('WCAG 2.1'), 'Narrative accessibility text from sidecar must render');

console.log('✅ Indication Accessibility tab verified');
} else {
  console.log('ℹ️ Clean separation: Non-developed components omitted from docs site as expected.');
  console.log('Verifying Guide templates...');

  const overviewDoc = loadHtml('docs/getting-started/overview');
  const overviewTitle = overviewDoc.querySelector('h1');
  assert(overviewTitle && overviewTitle.textContent?.includes('Overview'), 'Overview page title must render');
  console.log('✅ Getting Started Overview template verified');

  const setBrandDoc = loadHtml('docs/theming/set-brand');
  const setBrandTitle = setBrandDoc.querySelector('h1');
  assert(setBrandTitle && setBrandTitle.textContent?.includes('Set your brand'), 'Set your brand page title must render');
  console.log('✅ Theming template verified');
}

// -------------------------------------------------------------
// 3. Foundation Modifiers Tests
// -------------------------------------------------------------

console.log('Testing Foundation Modifiers across route-per-tab pages & sidebar...');

const expectedModifiers = [
  { id: 'basis-border', name: 'basisBorder', title: 'Border' },
  { id: 'basis-clear-and-set-semantics', name: 'basisClearAndSetSemantics', title: 'Clear and Set Semantics' },
  { id: 'basis-clickable', name: 'basisClickable', title: 'Clickable' },
  { id: 'basis-focus-ring', name: 'basisFocusRing', title: 'Focus Ring' },
  { id: 'basis-indication', name: 'basisIndication', title: 'Indication' },
  { id: 'basis-min-touch-target', name: 'basisMinTouchTarget', title: 'Min Touch Target' },
  { id: 'basis-padding', name: 'basisPadding', title: 'Padding' },
  { id: 'basis-selectable', name: 'basisSelectable', title: 'Selectable' },
  { id: 'basis-semantics', name: 'basisSemantics', title: 'Semantics' },
  { id: 'basis-surface', name: 'basisSurface', title: 'Surface' },
  { id: 'basis-toggleable', name: 'basisToggleable', title: 'Toggleable' },
];

// Check all 11 modifiers in the sidebar under Foundation -> Modifiers
const sampleDoc = loadHtml('docs/modifiers/basis-border');
const foundationGroup = Array.from(sampleDoc.querySelectorAll('.nav-group')).find((g) => {
  return g.querySelector('.nav-group-title')?.textContent?.trim().toLowerCase() === 'foundation';
});
assert(foundationGroup, 'Sidebar must contain FOUNDATION section');

const modifiersSubgroup = foundationGroup.querySelector('.nav-subgroup[data-family="modifiers"]');
assert(modifiersSubgroup, 'FOUNDATION section must contain Modifiers subgroup');

const subgroupLabel = modifiersSubgroup.querySelector('.nav-subgroup-label');
assert.strictEqual(subgroupLabel?.textContent?.trim(), 'Modifiers', 'Subgroup label must be Modifiers');

const directItems = Array.from(foundationGroup.querySelectorAll(':scope > .nav-group-list > .nav-item'));
assert.strictEqual(directItems.length, 0, 'Foundation section must have 0 direct prose items (no duplicate surface/focusable)');

const modifierLinks = Array.from(modifiersSubgroup.querySelectorAll('a.nav-link'));
assert.strictEqual(modifierLinks.length, expectedModifiers.length, `Modifiers subgroup must contain all ${expectedModifiers.length} modifiers`);

for (const mod of expectedModifiers) {
  const link = modifierLinks.find((l) => l.getAttribute('href') === `/docs/modifiers/${mod.id}`);
  assert(link, `Sidebar must contain link to /docs/modifiers/${mod.id}`);
  assert(link.textContent?.includes(mod.title), `Link text must contain semantic title ${mod.title}`);
  assert(!link.textContent?.includes(mod.name), `Link text must not contain technical name ${mod.name}`);
}

// Ensure modifiers are NOT placed under Components group
const componentsGroup = sampleDoc.querySelector('.components-group');
if (componentsGroup) {
  const componentLinks = Array.from(componentsGroup.querySelectorAll('a.nav-link'));
  for (const mod of expectedModifiers) {
    const hasMod = componentLinks.some((l) => l.getAttribute('href')?.includes(mod.id));
    assert(!hasMod, `Modifier ${mod.id} must not be present in Components group`);
  }
}
console.log('✅ Sidebar FOUNDATION -> Modifiers placement verified');

// Verify route-per-tab (Overview and API) for modifiers
for (const mod of expectedModifiers) {
  // 1. Overview Tab
  const overviewDoc = loadHtml(`docs/modifiers/${mod.id}`);
  const titleEl = overviewDoc.querySelector('.modifier-title');
  assert(titleEl && titleEl.textContent?.includes(mod.title), `${mod.title} title must render on overview page`);

  const tabsNav = overviewDoc.querySelector('.modifier-tabs');
  assert(tabsNav, `${mod.name} tabs navigation must render`);

  const activeTabOverview = tabsNav.querySelector('a.tab-link.active[aria-current="page"]');
  assert(activeTabOverview && activeTabOverview.textContent?.trim() === 'Overview', `${mod.name} Overview tab must be active`);

  const apiTabLink = tabsNav.querySelector(`a.tab-link[href="/docs/modifiers/${mod.id}/api"]`);
  assert(apiTabLink, `${mod.name} must have link to API tab`);

  // Quick Start
  const quickStart = overviewDoc.querySelector('.modifier-section pre code');
  assert(quickStart && quickStart.textContent?.includes(mod.name), `${mod.name} quick start code block must reference ${mod.name}`);

  // Accessibility section
  const a11yHeading = overviewDoc.querySelector('#accessibility');
  assert(a11yHeading, `${mod.name} must render Accessibility section`);

  // Guidelines section
  const guidelinesHeading = overviewDoc.querySelector('#guidelines');
  assert(guidelinesHeading, `${mod.name} must render Usage Guidelines from sidecar`);

  // 2. API Tab
  const apiDoc = loadHtml(`docs/modifiers/${mod.id}/api`);
  const apiTitle = apiDoc.querySelector('.modifier-title');
  assert(apiTitle && apiTitle.textContent?.includes(mod.title), `${mod.title} title must render on API page`);

  const apiTabsNav = apiDoc.querySelector('.modifier-tabs');
  assert(apiTabsNav, `${mod.name} API tabs navigation must render`);

  const activeTabApi = apiTabsNav.querySelector('a.tab-link.active[aria-current="page"]');
  assert(activeTabApi && activeTabApi.textContent?.trim() === 'API', `${mod.name} API tab must be active on /api route`);

  const signaturesHeading = apiDoc.querySelector('#signatures');
  assert(signaturesHeading, `${mod.name} must render Signatures & Parameters heading`);

  const sigBlock = apiDoc.querySelector('.signature-container pre code');
  assert(sigBlock && sigBlock.textContent?.includes(`Modifier.${mod.name}`), `${mod.name} signature block must declare Modifier.${mod.name}`);

  const paramsTable = apiDoc.querySelector('.params-table');
  assert(paramsTable, `${mod.name} must render parameters table`);
}

console.log(`✅ All ${expectedModifiers.length} modifiers verified across Overview and API tabs`);

console.log('\n🎉 All Template and Section Component tests passed successfully!');
