import fs from 'node:fs';
import path from 'node:path';
import { SemanticValidator } from './semantic-validator';

async function main() {
  const rootDir = path.resolve(__dirname, '..');
  const schemasDir = path.join(rootDir, 'schemas');
  const negativeDir = path.join(rootDir, 'fixtures/negative');

  const validator = new SemanticValidator(schemasDir);

  const testCases = [
    {
      file: 'missing-summary.fixture.json',
      type: 'components',
      expectedErrorSnippet: 'Component must have a non-empty KDoc summary',
    },
    {
      file: 'invented-override-field.fixture.json',
      type: 'components',
      expectedErrorSnippet: "Override universalField 'inventedMagicGlow' does not exist",
    },
    {
      file: 'stable-without-report.fixture.json',
      type: 'components',
      expectedErrorSnippet: "Lifecycle 'stable' status requires accessibility.report",
    },
    {
      file: 'wrong-major-schema-version.fixture.json',
      type: 'components',
      expectedErrorSnippet: "Unsupported major schemaVersion '2.0.0'",
    },
    {
      file: 'invalid-matrix-variant.fixture.json',
      type: 'components',
      expectedErrorSnippet: "Matrix variant 'nonExistentVariant' does not exist",
    },
    {
      file: 'missing-sidecar-a11y.sidecar.mdx',
      type: 'sidecar',
      expectedErrorSnippet: "Missing required '## Accessibility' heading",
    },
  ];

  let failedTests = 0;

  for (const tc of testCases) {
    const filePath = path.join(negativeDir, tc.file);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Negative fixture file missing: ${tc.file}`);
      failedTests++;
      continue;
    }

    let result;
    if (tc.type === 'components') {
      const doc = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      result = validator.validateComponents(doc);
    } else {
      const content = fs.readFileSync(filePath, 'utf-8');
      result = validator.validateSidecarMdx(content, tc.file);
    }

    if (result.ok) {
      console.error(`❌ Expected failure for ${tc.file}, but validation passed!`);
      failedTests++;
    } else {
      const matched = result.errors.some((err) => err.includes(tc.expectedErrorSnippet));
      if (!matched) {
        console.error(`❌ ${tc.file} failed, but not with expected snippet '${tc.expectedErrorSnippet}'. Errors:`);
        result.errors.forEach((e) => console.error(`   ${e}`));
        failedTests++;
      } else {
        console.log(`✅ Negative fixture ${tc.file} failed as expected with: '${tc.expectedErrorSnippet}'`);
      }
    }
  }

  if (failedTests > 0) {
    console.error(`\n❌ ${failedTests} negative validation test(s) failed.`);
    process.exit(1);
  } else {
    console.log(`\n🎉 All ${testCases.length} negative fixtures failed as expected!`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
