import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';
import assert from 'node:assert';
import { execSync } from 'node:child_process';

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
// 1. Populated Component Tests (BasisButton) across all 4 tabs
// -------------------------------------------------------------

const hasComponents = fs.existsSync(path.join(distDir, 'docs/components/button/index.html'));

if (hasComponents) {
  console.log('Testing BasisButton across all 4 route-per-tab pages...');

// --- Overview Tab ---
const buttonOverviewDoc = loadHtml('docs/components/button');

// Title & Meta
const titleEl = buttonOverviewDoc.querySelector('.component-title');
assert(titleEl && titleEl.textContent?.includes('BasisButton'), 'BasisButton title must render');

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
assert(familyChip && familyChip.textContent?.includes('Actions'), 'Family chip must show Actions');

const sourceLink = buttonOverviewDoc.querySelector('.source-link');
assert(sourceLink && sourceLink.getAttribute('href')?.includes('github.com'), 'Source link must be present');

// Sidebar component nesting
const componentsGroup = buttonOverviewDoc.querySelector('.components-group');
assert(componentsGroup, 'Single components section must exist in sidebar');
const componentsSectionTitle = componentsGroup.querySelector('.nav-group-title');
assert.strictEqual(componentsSectionTitle?.textContent?.trim(), 'Components', 'Section title must be Components');
const familySubgroups = componentsGroup.querySelectorAll('.nav-subgroup');
assert(familySubgroups.length >= 2, 'Component families must be nested as subgroups');
const actionsSubgroup = Array.from(familySubgroups).find(sg => sg.querySelector('.nav-subgroup-title')?.textContent?.trim() === 'Actions');
assert(actionsSubgroup && actionsSubgroup.querySelector('.subgroup-link')?.textContent?.includes('BasisButton'), 'Actions family must contain BasisButton');

// Tabs navigation
const tabsNav = buttonOverviewDoc.querySelector('.component-tabs');
assert(tabsNav, 'Component tabs navigation must render');
const activeTabOverview = tabsNav.querySelector('a.active[aria-current="page"]');
assert(activeTabOverview && activeTabOverview.textContent?.trim() === 'Overview', 'Overview tab must be active');

// Quick Start CodeBlock & Copy Button
const quickStartContainer = buttonOverviewDoc.querySelector('[data-code-block]');
assert(quickStartContainer, 'Quick start code block container must render');
const quickStartBlock = quickStartContainer.querySelector('.code-viewport pre code');
assert(quickStartBlock && quickStartBlock.textContent?.includes('BasisButton('), 'Quick start code block must render highlighted code');

const copyButton = quickStartContainer.querySelector('.copy-button');
assert(copyButton, 'Codeblock copy button must render');
assert.strictEqual(copyButton.getAttribute('aria-label'), 'Copy code to clipboard');
assert(copyButton.getAttribute('data-code')?.includes('BasisButton'), 'Copy button must contain encoded code payload');

// Anatomy Overlay
const anatomyStage = buttonOverviewDoc.querySelector('.anatomy-stage');
assert(anatomyStage, 'Anatomy stage container must render');
const stageStyle = anatomyStage.getAttribute('style');
assert(stageStyle?.includes('aspect-ratio: 640 / 360'), 'Anatomy stage must have aspect-ratio: 640 / 360');

const anatomySvg = buttonOverviewDoc.querySelector('.anatomy-svg');
assert(anatomySvg, 'Anatomy SVG overlay must render');
assert.strictEqual(anatomySvg.getAttribute('viewBox'), '0 0 640 360', 'SVG viewBox must match 640 360');
assert.strictEqual(anatomySvg.getAttribute('preserveAspectRatio'), 'xMidYMid meet', 'SVG must preserve aspect ratio');

// Verify SVG Bounding Boxes
const containerRect = buttonOverviewDoc.querySelector('.anatomy-marker-group[data-part="Container"] rect');
assert(containerRect, 'Container bounding box must be rendered');
assert.strictEqual(containerRect.getAttribute('x'), '120');
assert.strictEqual(containerRect.getAttribute('y'), '80');
assert.strictEqual(containerRect.getAttribute('width'), '400');
assert.strictEqual(containerRect.getAttribute('height'), '48');

// Verify Parts List
const partsList = buttonOverviewDoc.querySelectorAll('.parts-list .part-card');
assert.strictEqual(partsList.length, 4, 'Must render 4 structural parts in list');
const optionalBadges = buttonOverviewDoc.querySelectorAll('.part-presence.optional');
const requiredBadges = buttonOverviewDoc.querySelectorAll('.part-presence.required');
assert.strictEqual(optionalBadges.length, 2, 'LeadingIcon and TrailingIcon must be marked optional');
assert.strictEqual(requiredBadges.length, 2, 'Container and Label must be marked required');

// Variants & States
const variantCards = buttonOverviewDoc.querySelectorAll('.variants-grid .variant-card');
assert.strictEqual(variantCards.length, 4, 'Must render 4 prominence variants');

const stateCards = buttonOverviewDoc.querySelectorAll('.states-grid .state-card');
assert.strictEqual(stateCards.length, 5, 'Must render 5 interaction states');

// Gallery
const galleryCards = buttonOverviewDoc.querySelectorAll('.gallery-grid .gallery-card');
assert.strictEqual(galleryCards.length, 2, 'Must render 2 gallery specimen cards');

// Usage Guidelines (from sidecar)
const doItems = buttonOverviewDoc.querySelectorAll('.do-card .guideline-item');
assert(doItems.length >= 2, 'Do items must render from sidecar');
const dontItems = buttonOverviewDoc.querySelectorAll('.dont-card .guideline-item');
assert(dontItems.length >= 2, 'Don\'t items must render from sidecar');
const notesItems = buttonOverviewDoc.querySelectorAll('.notes-card .note-item');
assert(notesItems.length >= 1, 'Implementation notes must render from sidecar');

console.log('✅ Button Overview tab verified');

// --- API Tab ---
const buttonApiDoc = loadHtml('docs/components/button/api');

const activeTabApi = buttonApiDoc.querySelector('.component-tabs a.active[aria-current="page"]');
assert(activeTabApi && activeTabApi.textContent?.trim() === 'API', 'API tab must be active on /api route');

const declarationBlock = buttonApiDoc.querySelector('.signature-container .code-viewport pre code');
assert(declarationBlock && declarationBlock.textContent?.includes('public fun BasisButton('), 'Declaration must render in highlighted CodeBlock');

const apiCopyButton = buttonApiDoc.querySelector('.signature-container .copy-button');
assert(apiCopyButton, 'API signature copy button must render');

// Table layout & column widths (fit tables to width)
const tableResponsive = buttonApiDoc.querySelector('.table-responsive');
assert(tableResponsive, 'Table responsive container must render');
const colgroupCols = buttonApiDoc.querySelectorAll('.params-table colgroup col');
assert.strictEqual(colgroupCols.length, 4, 'Parameters table must define 4 column specifications for width fitting');

const paramRows = buttonApiDoc.querySelectorAll('.params-table tbody tr');
assert(paramRows.length >= 6, 'Parameters table must render parameter rows');
const requiredParamBadge = buttonApiDoc.querySelector('.params-table .required-badge');
assert(requiredParamBadge && requiredParamBadge.textContent?.toLowerCase() === 'required', 'Required parameter badge must render');

console.log('✅ Button API tab verified');

// --- Overrides Tab ---
const buttonOverridesDoc = loadHtml('docs/components/button/overrides');

const activeTabOverrides = buttonOverridesDoc.querySelector('.component-tabs a.active[aria-current="page"]');
assert(activeTabOverrides && activeTabOverrides.textContent?.trim() === 'Overrides', 'Overrides tab must be active');

const universalChips = buttonOverridesDoc.querySelectorAll('.fields-grid .field-chip');
assert(universalChips.length >= 3, 'Universal fields must render as chips');

const extraFamilyCard = buttonOverridesDoc.querySelector('.extra-family-card');
assert(extraFamilyCard, 'Extra family card must render when extraFamily is specified');
assert(extraFamilyCard.textContent?.includes('Interactive'), 'Extra family name must be displayed');

const matrixRows = buttonOverridesDoc.querySelectorAll('.matrix-table tbody tr');
assert(matrixRows.length >= 1, 'Matrix override table must render rows');
const matrixCols = buttonOverridesDoc.querySelectorAll('.matrix-table colgroup col');
assert.strictEqual(matrixCols.length, 3, 'Matrix table must define 3 column specifications for width fitting');

console.log('✅ Button Overrides tab verified');

// --- Accessibility Tab ---
const buttonA11yDoc = loadHtml('docs/components/button/accessibility');

const activeTabA11y = buttonA11yDoc.querySelector('.component-tabs a.active[aria-current="page"]');
assert(activeTabA11y && activeTabA11y.textContent?.trim() === 'Accessibility', 'Accessibility tab must be active');

const roleValue = buttonA11yDoc.querySelector('.role-value');
assert(roleValue && roleValue.textContent?.includes('Role.Button'), 'Role.Button must be displayed');

const factValues = buttonA11yDoc.querySelectorAll('.fact-card .fact-value');
assert(factValues.length >= 3, 'Must render at least 3 fact cards');
const touchTargetValue = factValues[1];
assert(touchTargetValue && touchTargetValue.textContent?.includes('48dp'), '48dp touch target must be displayed');

const kbdKeys = buttonA11yDoc.querySelectorAll('.keyboard-chips .kbd-key');
assert(kbdKeys.length >= 2, 'Keyboard navigation chips must be displayed');

const reportCard = buttonA11yDoc.querySelector('.report-card');
assert(reportCard, 'Automated test report card must render');
const reportStatus = reportCard.querySelector('.report-status-badge');
assert(reportStatus && reportStatus.textContent?.includes('PASS'), 'Report status must be PASS');

const narrativeBlock = buttonA11yDoc.querySelector('.narrative-block');
assert(narrativeBlock && narrativeBlock.textContent?.includes('Compose `Role.Button`'), 'Narrative accessibility text from sidecar must render');

console.log('✅ Button Accessibility tab verified');

// -------------------------------------------------------------
// 2. Empty States Tests (BasisDivider)
// -------------------------------------------------------------

console.log('Testing Empty States on BasisDivider...');

const dividerOverviewDoc = loadHtml('docs/components/divider');

// Parts list with NO optional parts
const dividerPartsList = dividerOverviewDoc.querySelectorAll('.parts-list .part-card');
assert.strictEqual(dividerPartsList.length, 1, 'Divider must have 1 structural part');
const dividerOptionalBadges = dividerOverviewDoc.querySelectorAll('.parts-list .part-presence.optional');
assert.strictEqual(dividerOptionalBadges.length, 0, 'Divider must have 0 optional parts');
const dividerRequiredBadge = dividerOverviewDoc.querySelector('.parts-list .part-presence.required');
assert(dividerRequiredBadge, 'Divider part must be marked required without throwing');

// No screenshot / bounds -> Fallback simulated canvas
const simulatedCanvas = dividerOverviewDoc.querySelector('.anatomy-visual .visual-canvas .simulated-preview');
assert(simulatedCanvas, 'Simulated canvas fallback must render when no screenshot is provided');

// Empty variants & states
const emptyVariantsHint = dividerOverviewDoc.querySelector('.variant-block .empty-hint');
assert(emptyVariantsHint && emptyVariantsHint.textContent?.includes('No specialized variants defined'), 'Empty variants hint must render');

const emptyStatesHint = dividerOverviewDoc.querySelector('.state-block .empty-hint');
assert(emptyStatesHint && emptyStatesHint.textContent?.includes('Standard interactive states applied'), 'Empty states hint must render');

// Empty gallery
const dividerGallery = dividerOverviewDoc.querySelector('.gallery-block');
assert.strictEqual(dividerGallery, null, 'Gallery block should not render when empty');

// Empty guidelines fallback (no sidecar)
const guidelinesEmpty = dividerOverviewDoc.querySelector('.guidelines-empty');
assert(guidelinesEmpty && guidelinesEmpty.textContent?.includes('No specific usage guidelines provided'), 'Empty guidelines fallback must render');

console.log('✅ Divider Overview empty states verified');

// Divider Overrides Tab
const dividerOverridesDoc = loadHtml('docs/components/divider/overrides');

const emptyUniversalHint = dividerOverridesDoc.querySelector('.universal-block .empty-hint');
assert(emptyUniversalHint && emptyUniversalHint.textContent?.includes('No universal token overrides available'), 'Empty universal overrides hint must render');

const dividerExtraFamily = dividerOverridesDoc.querySelector('.extra-family-card');
assert.strictEqual(dividerExtraFamily, null, 'Extra family card should not render when null/omitted');

const emptyMatrixBlock = dividerOverridesDoc.querySelector('.empty-matrix');
assert(emptyMatrixBlock && emptyMatrixBlock.textContent?.includes('No localized variant-state override matrix defined'), 'Empty matrix fallback must render');

console.log('✅ Divider Overrides empty states verified');

// Divider Accessibility Tab
const dividerA11yDoc = loadHtml('docs/components/divider/accessibility');

const dividerRole = dividerA11yDoc.querySelector('.role-value');
assert(dividerRole && dividerRole.textContent?.includes('Role.None'), 'Divider Role.None must render');

console.log('✅ Divider Accessibility empty states verified');
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
  { id: 'basis-border', name: 'basisBorder' },
  { id: 'basis-clear-and-set-semantics', name: 'basisClearAndSetSemantics' },
  { id: 'basis-clickable', name: 'basisClickable' },
  { id: 'basis-focus-ring', name: 'basisFocusRing' },
  { id: 'basis-indication', name: 'basisIndication' },
  { id: 'basis-min-touch-target', name: 'basisMinTouchTarget' },
  { id: 'basis-padding', name: 'basisPadding' },
  { id: 'basis-selectable', name: 'basisSelectable' },
  { id: 'basis-semantics', name: 'basisSemantics' },
  { id: 'basis-surface', name: 'basisSurface' },
  { id: 'basis-toggleable', name: 'basisToggleable' },
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
  assert(link.textContent?.includes(mod.name), `Link text must contain ${mod.name}`);
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
  assert(titleEl && titleEl.textContent?.includes(mod.name), `${mod.name} title must render on overview page`);

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
  assert(apiTitle && apiTitle.textContent?.includes(mod.name), `${mod.name} title must render on API page`);

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
