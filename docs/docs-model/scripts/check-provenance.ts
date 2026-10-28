import fs from 'node:fs';
import path from 'node:path';

function checkProvenance() {
  const rootDir = path.resolve(__dirname, '..');
  const fixturesDir = path.join(rootDir, 'fixtures');
  const isProd = process.env.DOCS_ENV === 'production' || process.env.NODE_ENV === 'production';

  console.log(`Checking provenance (mode: ${isProd ? 'PRODUCTION' : 'development'})...`);

  const filesToCheck = [
    path.join(fixturesDir, 'components.fixture.json'),
    path.join(fixturesDir, 'intent.fixture.json'),
    path.join(fixturesDir, 'patch-vocabulary.fixture.json'),
  ];

  let violations = 0;

  for (const filePath of filesToCheck) {
    if (!fs.existsSync(filePath)) continue;

    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const fileName = path.basename(filePath);

    if (isProd && content.provenance === 'fixture') {
      console.error(
        `❌ [provenance] ${fileName} has provenance="fixture" which is strictly forbidden in production builds!`
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
