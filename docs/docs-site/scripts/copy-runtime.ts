/**
 * copy-runtime.ts - Copies docs-runtime UMD artifacts into Astro's public dir
 * so the browser can load them at /docs-runtime/*.js for live resolution.
 *
 * The artifacts are produced by ./gradlew :docs-runtime:compileKotlinJs
 * (KMP JS(IR) browser library, UMD globals). This step is a thin static copy:
 * the runtime is the single source of truth; we only relocate its outputs.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Walks up from the script dir to the repo root (where settings.gradle.kts lives). */
function findRepoRoot(): string {
  let dir = __dirname;
  while (dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, 'settings.gradle.kts'))) return dir;
    dir = path.dirname(dir);
  }
  return __dirname;
}

const RUNTIME_JS_FILES = [
  'kotlin-kotlin-stdlib.js',
  'kotlin_org_jetbrains_kotlin_kotlin_dom_api_compat.js',
  'kotlinx-serialization-kotlinx-serialization-core.js',
  'kotlinx-serialization-kotlinx-serialization-json.js',
  'Basis-basis-theme.js',
  'Basis-docs-runtime.js',
] as const;

const RUNTIME_LIB_DIR = path.join(findRepoRoot(), 'docs', 'docs-runtime', 'build', 'dist', 'js', 'productionLibrary');

function findRuntimeDir(): string | null {
  if (fs.existsSync(RUNTIME_LIB_DIR) && RUNTIME_JS_FILES.every((f) => fs.existsSync(path.join(RUNTIME_LIB_DIR, f)))) {
    return RUNTIME_LIB_DIR;
  }
  return null;
}

export function copyRuntimeArtifacts(): { destDir: string; files: string[] } {
  const srcDir = findRuntimeDir();
  if (!srcDir) {
    console.error(
      '❌ Could not locate docs-runtime productionLibrary artifacts. ' +
      'Run ./gradlew :docs-runtime:compileKotlinJs first.',
    );
    process.exit(1);
  }

  const destDir = path.resolve(__dirname, '../public/docs-runtime');
  fs.mkdirSync(destDir, { recursive: true });

  const copied: string[] = [];
  for (const file of RUNTIME_JS_FILES) {
    const src = path.join(srcDir, file);
    const dest = path.join(destDir, file);
    fs.copyFileSync(src, dest);
    copied.push(file);
  }

  // Also copy source maps if present (developer ergonomics, not required).
  for (const file of RUNTIME_JS_FILES) {
    const mapSrc = path.join(srcDir, file + '.map');
    if (fs.existsSync(mapSrc)) fs.copyFileSync(mapSrc, path.join(destDir, file + '.map'));
  }

  return { destDir, files: copied };
}

// Run when invoked directly.
if (import.meta.url === `file://${process.argv[1]}`) {
  const result = copyRuntimeArtifacts();
  console.log(
    `✅ Copied ${result.files.length} docs-runtime artifacts to ${path.relative(process.cwd(), result.destDir)}`,
  );
}
