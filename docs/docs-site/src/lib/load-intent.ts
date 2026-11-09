import fs from 'node:fs';
import path from 'node:path';
import type { IntentDocument } from '@basis/docs-model';

function findProjectRoot(): string {
  let dir = process.cwd();
  while (dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, 'settings.gradle.kts')) || fs.existsSync(path.join(dir, 'basis-theme'))) {
      return dir;
    }
    dir = path.dirname(dir);
  }
  return process.cwd();
}

export function loadIntentDoc(): IntentDocument {
  const root = findProjectRoot();
  const filePath = path.resolve(root, 'docs/docs-model/generated/intent.json');
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as IntentDocument;
  }
  throw new Error(`Generated ${filePath} does not exist. Run './gradlew :docs:docs-extract:generateDocsJson' first.`);
}
