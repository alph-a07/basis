import fs from 'node:fs';
import path from 'node:path';

function checkProvenance() {
  const rootDir = path.resolve(__dirname, '..');
  const generatedDir = path.join(rootDir, 'generated');

  console.log('Checking provenance (strictly "generated")...');

  const docNames = ['components.json', 'intent.json', 'patch-vocabulary.json'];
  let violations = 0;

  for (const docName of docNames) {
    const filePath = path.join(generatedDir, docName);
    if (!fs.existsSync(filePath)) continue;

    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const fileName = path.basename(filePath);

    if (content.provenance !== 'generated') {
      console.error(
        `❌ [provenance] ${fileName} has provenance="${content.provenance}", but only "generated" is allowed!`
      );
      violations++;
    } else {
      console.log(`✅ [provenance] ${fileName}: provenance="${content.provenance}" accepted`);
    }
  }

  if (violations > 0) {
    console.error(`\n❌ Provenance check failed with ${violations} violation(s).`);
    process.exit(1);
  }

  console.log('\n🎉 Provenance check passed!');
}

checkProvenance();
