import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

export interface CheckResult {
  valid: boolean;
  totalReferences: number;
  uniqueTokens: string[];
  invalidTokens: Array<{ token: string; file: string; line: number }>;
}

/**
 * Resolves the valid token names emitted with prefix 'b' by docs-runtime.
 */
export function getValidResolverTokens(): Set<string> {
  const possiblePaths = [
    path.resolve(__dirname, '../../docs-runtime/build/dist/js/productionLibrary/Basis-docs-runtime.js'),
    path.resolve(__dirname, '../../../docs/docs-runtime/build/dist/js/productionLibrary/Basis-docs-runtime.js'),
  ];

  let runtimePath: string | null = null;
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      runtimePath = p;
      break;
    }
  }

  if (!runtimePath) {
    throw new Error('Could not locate Basis-docs-runtime.js artifact. Run ./gradlew :docs-runtime:compileKotlinJs first.');
  }

  const runtime = require(runtimePath);
  const responseJson = runtime.io.github.alph_a07.basis.docs.runtime.resolveWithPrefix('{}', 'b');
  const response = JSON.parse(responseJson);

  if (!response.ok || !response.tokens) {
    throw new Error('docs-runtime failed to resolve reference tokens.');
  }

  const tokens = new Set<string>();
  if (response.tokens.dark) {
    for (const key of Object.keys(response.tokens.dark)) {
      tokens.add(key);
    }
  }
  if (response.tokens.light) {
    for (const key of Object.keys(response.tokens.light)) {
      tokens.add(key);
    }
  }

  return tokens;
}

/**
 * Scans a directory or specific files and extracts every `var(--b-...)` token reference,
 * comparing them against the valid token schema.
 */
export function checkSpecimenTokens(
  dirOrFiles: string | string[],
  validTokens: Set<string> = getValidResolverTokens()
): CheckResult {
  const filesToScan: string[] = [];

  if (Array.isArray(dirOrFiles)) {
    filesToScan.push(...dirOrFiles);
  } else if (fs.statSync(dirOrFiles).isDirectory()) {
    const entries = fs.readdirSync(dirOrFiles, { recursive: true }) as string[];
    for (const entry of entries) {
      const fullPath = path.join(dirOrFiles, entry);
      if (fs.statSync(fullPath).isFile() && (entry.endsWith('.astro') || entry.endsWith('.css') || entry.endsWith('.ts'))) {
        filesToScan.push(fullPath);
      }
    }
  } else {
    filesToScan.push(dirOrFiles);
  }

  const varRegex = /var\(\s*(--b-[a-zA-Z0-9_-]+)/g;
  const invalidTokens: Array<{ token: string; file: string; line: number }> = [];
  const uniqueTokens = new Set<string>();
  let totalReferences = 0;

  for (const filePath of filesToScan) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((lineText, lineIdx) => {
      let match: RegExpExecArray | null;
      varRegex.lastIndex = 0;
      while ((match = varRegex.exec(lineText)) !== null) {
        const tokenName = match[1];
        totalReferences++;
        uniqueTokens.add(tokenName);

        if (!validTokens.has(tokenName)) {
          invalidTokens.push({
            token: tokenName,
            file: path.relative(path.resolve(__dirname, '..'), filePath),
            line: lineIdx + 1,
          });
        }
      }
    });
  }

  return {
    valid: invalidTokens.length === 0,
    totalReferences,
    uniqueTokens: Array.from(uniqueTokens).sort(),
    invalidTokens,
  };
}

// Execute CLI check when run directly
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  console.log('🔍 Checking specimen components for valid Basis (--b-*) token usage...');
  const specimensDir = path.resolve(__dirname, '../src/components/specimens');

  if (!fs.existsSync(specimensDir)) {
    console.error(`❌ Specimens directory not found at ${specimensDir}`);
    process.exit(1);
  }

  try {
    const validTokens = getValidResolverTokens();
    console.log(`Loaded ${validTokens.size} valid Basis tokens from docs-runtime resolver.`);

    const result = checkSpecimenTokens(specimensDir, validTokens);

    console.log(`Scanned specimen components: found ${result.totalReferences} references across ${result.uniqueTokens.length} unique tokens.`);

    if (!result.valid) {
      console.error(`\n❌ Found ${result.invalidTokens.length} unrecognized token references:`);
      for (const err of result.invalidTokens) {
        console.error(`  - ${err.token} at ${err.file}:${err.line}`);
      }
      process.exit(1);
    }

    console.log('✅ All specimen tokens verified successfully against the Basis resolver schema!');
  } catch (err: any) {
    console.error(`❌ Check failed with error: ${err.message}`);
    process.exit(1);
  }
}
