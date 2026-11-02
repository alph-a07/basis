import fs from 'node:fs';
import path from 'node:path';
import { SemanticValidator } from './semantic-validator';

async function main() {
  const rootDir = path.resolve(__dirname, '..');
  const schemasDir = path.join(rootDir, 'schemas');
  const fixturesDir = path.join(rootDir, 'fixtures');

  const validator = new SemanticValidator(schemasDir);
  let totalErrors = 0;

  console.log('Running validation on fixtures...');

  // 1. Intent fixture
  const intentPath = path.join(fixturesDir, 'intent.fixture.json');
  if (fs.existsSync(intentPath)) {
    const intentDoc = JSON.parse(fs.readFileSync(intentPath, 'utf-8'));
    const result = validator.validateIntent(intentDoc);
    if (!result.ok) {
      console.error(`❌ Validation failed for ${intentPath}:`);
      result.errors.forEach((e) => console.error(`   ${e}`));
      totalErrors += result.errors.length;
    } else {
      console.log(`✅ intent.fixture.json passed`);
    }
  }

  // 2. Patch vocabulary fixture
  const patchVocabPath = path.join(fixturesDir, 'patch-vocabulary.fixture.json');
  let patchVocabDoc: any;
  if (fs.existsSync(patchVocabPath)) {
    patchVocabDoc = JSON.parse(fs.readFileSync(patchVocabPath, 'utf-8'));
    const result = validator.validatePatchVocabulary(patchVocabDoc);
    if (!result.ok) {
      console.error(`❌ Validation failed for ${patchVocabPath}:`);
      result.errors.forEach((e) => console.error(`   ${e}`));
      totalErrors += result.errors.length;
    } else {
      console.log(`✅ patch-vocabulary.fixture.json passed`);
    }
  }

  // 3. Components fixture
  const componentsPath = path.join(fixturesDir, 'components.fixture.json');
  if (fs.existsSync(componentsPath)) {
    const componentsDoc = JSON.parse(fs.readFileSync(componentsPath, 'utf-8'));
    const result = validator.validateComponents(componentsDoc, patchVocabDoc);
    if (!result.ok) {
      console.error(`❌ Validation failed for ${componentsPath}:`);
      result.errors.forEach((e) => console.error(`   ${e}`));
      totalErrors += result.errors.length;
    } else {
      console.log(`✅ components.fixture.json passed`);
    }
  }

  // 4. Sidecar MDX fixtures
  const sidecarFiles = fs.readdirSync(fixturesDir).filter((f) => f.endsWith('.sidecar.mdx'));
  for (const file of sidecarFiles) {
    const sidecarPath = path.join(fixturesDir, file);
    const sidecarContent = fs.readFileSync(sidecarPath, 'utf-8');
    const result = validator.validateSidecarMdx(sidecarContent, file);
    if (!result.ok) {
      console.error(`❌ Validation failed for ${sidecarPath}:`);
      result.errors.forEach((e) => console.error(`   ${e}`));
      totalErrors += result.errors.length;
    } else {
      console.log(`✅ ${file} passed`);
    }
  }

  if (totalErrors > 0) {
    console.error(`\n❌ Validation completed with ${totalErrors} error(s).`);
    process.exit(1);
  } else {
    console.log('\n🎉 All documents and fixtures passed validation successfully!');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
