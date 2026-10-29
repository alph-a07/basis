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
  const buildPath = path.resolve(root, 'build/docs-model/intent.json');
  if (fs.existsSync(buildPath)) {
    return JSON.parse(fs.readFileSync(buildPath, 'utf-8')) as IntentDocument;
  }
  const fixturePath = path.resolve(root, 'docs/docs-model/fixtures/intent.fixture.json');
  if (fs.existsSync(fixturePath)) {
    return JSON.parse(fs.readFileSync(fixturePath, 'utf-8')) as IntentDocument;
  }
  throw new Error(`Neither generated ${buildPath} nor fixture ${fixturePath} exists.`);
}
