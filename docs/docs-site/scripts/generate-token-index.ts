/**
 * scripts/generate-token-index.ts
 *
 * Scans src/styles/studio-scene.css for var(--b-...) references.
 * Emits src/studio/scene/tokenIndex.ts (gitignored) mapping each token to consumer selectors and properties.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const cssPath = path.resolve(rootDir, 'src/styles/studio-scene.css');
const outputPath = path.resolve(rootDir, 'src/studio/scene/tokenIndex.ts');

export interface TokenConsumer {
  selector: string;
  property: string;
}

export function parseCssForTokens(css: string): {
  tokenIndex: Record<string, TokenConsumer[]>;
  selectorTokens: Record<string, string[]>;
} {
  const tokenIndex: Record<string, TokenConsumer[]> = {};
  const selectorTokens: Record<string, string[]> = {};

  // Strip comments
  const cleanCss = css.replace(/\/\*[\s\S]*?\*\//g, '');

  // Match rule blocks: selector { ... declarations ... }
  // Handle simple rules and media queries by matching selector { block }
  const ruleRegex = /([^{}]+)\{([^}]+)\}/g;
  let match: RegExpExecArray | null;

  while ((match = ruleRegex.exec(cleanCss)) !== null) {
    const rawSelector = match[1].trim();
    const declarationBlock = match[2];

    // Skip @keyframes or @media headers without clean selector
    if (rawSelector.startsWith('@keyframes') || rawSelector.startsWith('@media')) {
      continue;
    }

    const selectors = rawSelector.split(',').map((s) => s.trim()).filter(Boolean);

    // Parse declarations: prop: val;
    const declRegex = /([a-zA-Z0-9_-]+)\s*:\s*([^;]+);/g;
    let declMatch: RegExpExecArray | null;

    while ((declMatch = declRegex.exec(declarationBlock)) !== null) {
      const property = declMatch[1].trim();
      const value = declMatch[2];

      const tokenMatches = [...value.matchAll(/var\((--b-[a-zA-Z0-9_-]+)/g)].map((m) => m[1]);

      for (const token of tokenMatches) {
        if (!tokenIndex[token]) {
          tokenIndex[token] = [];
        }

        for (const selector of selectors) {
          if (!tokenIndex[token].some((c) => c.selector === selector && c.property === property)) {
            tokenIndex[token].push({ selector, property });
          }

          if (!selectorTokens[selector]) {
            selectorTokens[selector] = [];
          }
          if (!selectorTokens[selector].includes(token)) {
            selectorTokens[selector].push(token);
          }
        }
      }
    }
  }

  return { tokenIndex, selectorTokens };
}

function generate() {
  if (!fs.existsSync(cssPath)) {
    console.error(`Error: Scene CSS not found at ${cssPath}`);
    process.exit(1);
  }

  const css = fs.readFileSync(cssPath, 'utf8');
  const { tokenIndex, selectorTokens } = parseCssForTokens(css);

  const tokens = Object.keys(tokenIndex).sort();
  console.log(`Parsed ${tokens.length} tokens with consumers from ${cssPath}`);

  const content = `/**
 * tokenIndex.ts - Auto-generated token to consumer mapping.
 * Generated at build time by scripts/generate-token-index.ts. DO NOT EDIT DIRECTLY.
 */

export interface TokenConsumer {
  selector: string;
  property: string;
}

export const TOKEN_INDEX: Record<string, TokenConsumer[]> = ${JSON.stringify(tokenIndex, null, 2)};

export const SELECTOR_TOKENS: Record<string, string[]> = ${JSON.stringify(selectorTokens, null, 2)};

/**
 * Returns all selectors and properties consuming the specified token.
 */
export function getConsumersForToken(token: string): TokenConsumer[] {
  return TOKEN_INDEX[token] ?? [];
}

/**
 * Returns all tokens consumed by the specified selector.
 */
export function getTokensForSelector(selector: string): string[] {
  return SELECTOR_TOKENS[selector] ?? [];
}

/**
 * Total unique tokens indexed.
 */
export const INDEXED_TOKEN_COUNT = ${tokens.length};
`;

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, content, 'utf8');
  console.log(`Generated ${outputPath} with ${tokens.length} indexed tokens.`);
}

generate();
