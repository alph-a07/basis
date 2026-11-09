import fs from 'node:fs';
import path from 'node:path';
import { SemanticValidator } from './semantic-validator';

async function main() {
  const rootDir = path.resolve(__dirname, '..');
  const schemasDir = path.join(rootDir, 'schemas');
  const sidecarsDir = path.join(rootDir, 'sidecars');
  const generatedDir = path.join(rootDir, 'generated');

  const validator = new SemanticValidator(schemasDir);
  let totalErrors = 0;

  console.log('Running validation on generated docs models and sidecars...');

  // 1. Intent document
  const intentPath = path.join(generatedDir, 'intent.json');
  if (fs.existsSync(intentPath)) {
    const intentDoc = JSON.parse(fs.readFileSync(intentPath, 'utf-8'));
    const result = validator.validateIntent(intentDoc);
    if (!result.ok) {
      console.error(`❌ Validation failed for ${intentPath}:`);
      result.errors.forEach((e) => console.error(`   ${e}`));
      totalErrors += result.errors.length;
    } else {
      console.log(`✅ intent.json passed`);
    }
  } else {
    console.error(
      `❌ intent.json not found in ${generatedDir}. Run './gradlew :docs:docs-extract:generateDocsJson' first.`
    );
    totalErrors++;
  }

  // 2. Patch vocabulary document
  const patchVocabPath = path.join(generatedDir, 'patch-vocabulary.json');
  let patchVocabDoc: any;
  if (fs.existsSync(patchVocabPath)) {
    patchVocabDoc = JSON.parse(fs.readFileSync(patchVocabPath, 'utf-8'));
    const result = validator.validatePatchVocabulary(patchVocabDoc);
    if (!result.ok) {
      console.error(`❌ Validation failed for ${patchVocabPath}:`);
      result.errors.forEach((e) => console.error(`   ${e}`));
      totalErrors += result.errors.length;
    } else {
      console.log(`✅ patch-vocabulary.json passed`);
    }
  } else {
    console.error(
      `❌ patch-vocabulary.json not found in ${generatedDir}. Run './gradlew :docs:docs-extract:generateDocsJson' first.`
    );
    totalErrors++;
  }

  // 3. Components document
  const componentsPath = path.join(generatedDir, 'components.json');
  if (fs.existsSync(componentsPath)) {
    const componentsDoc = JSON.parse(fs.readFileSync(componentsPath, 'utf-8'));
    const result = validator.validateComponents(componentsDoc, patchVocabDoc);
    if (!result.ok) {
      console.error(`❌ Validation failed for ${componentsPath}:`);
      result.errors.forEach((e) => console.error(`   ${e}`));
      totalErrors += result.errors.length;
    } else {
      console.log(`✅ components.json passed`);
    }
  } else {
    console.error(
      `❌ components.json not found in ${generatedDir}. Run './gradlew :docs:docs-extract:generateDocsJson' first.`
    );
    totalErrors++;
  }

  // 4. Sidecar MDX documents
  const sidecarFiles = fs.readdirSync(sidecarsDir).filter((f) => f.endsWith('.sidecar.mdx'));
  for (const file of sidecarFiles) {
    const sidecarPath = path.join(sidecarsDir, file);
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
    console.log('\n🎉 All documents and sidecars passed validation successfully!');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
