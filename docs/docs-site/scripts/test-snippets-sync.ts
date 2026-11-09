import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../..');
const snippetsSource = path.join(
  repoRoot,
  'demo-app/src/main/kotlin/io/github/alph_a07/basis/demo/snippets/DocSnippets.kt'
);
const snippetsJsonPath = path.join(
  __dirname,
  '../src/generated/snippets.json'
);

const regionRegex = /\/\/\s*region\s+([A-Za-z0-9_-]+)\r?\n([\s\S]*?)\r?\n\s*\/\/\s*endregion\s+\1/g;

// Dynamically generated (not from a region) — allowed as an extra entry.
const ALLOWED_EXTRA = new Set(['installation_dependencies']);

let failures = 0;

function fail(message: string): void {
  console.error(`❌ ${message}`);
  failures += 1;
}

// 1. Extract regions from source
const sourceContent = fs.readFileSync(snippetsSource, 'utf-8');
const sourceRegions: Record<string, string> = {};
let match: RegExpExecArray | null;
while ((match = regionRegex.exec(sourceContent)) !== null) {
  sourceRegions[match[1]] = match[2].trimEnd();
}

// 2. Read checked-in snippets.json
let snippets: Record<string, string>;
try {
  snippets = JSON.parse(fs.readFileSync(snippetsJsonPath, 'utf-8'));
} catch (err) {
  fail(`Cannot parse ${snippetsJsonPath}: ${err}`);
  process.exit(1);
}

// 3. Every source region must be in JSON with matching content
for (const [name, code] of Object.entries(sourceRegions)) {
  if (!(name in snippets)) {
    fail(`Snippet "${name}" exists in DocSnippets.kt but is missing from snippets.json`);
    continue;
  }
  if (snippets[name] !== code) {
    fail(`Snippet "${name}" in snippets.json does not match DocSnippets.kt source`);
  }
}

// 4. Every JSON entry must correspond to a source region (or be an allowed extra)
for (const name of Object.keys(snippets)) {
  if (!(name in sourceRegions) && !ALLOWED_EXTRA.has(name)) {
    fail(`Snippet "${name}" in snippets.json has no matching region in DocSnippets.kt`);
  }
}

if (failures > 0) {
  console.error(
    `\n${failures} snippet sync issue(s). Run \`npm run generate:theme\` to regenerate snippets.json from DocSnippets.kt.`
  );
  process.exit(1);
}

console.log(
  `✅ ${Object.keys(sourceRegions).length} snippet regions in sync with snippets.json`
);
