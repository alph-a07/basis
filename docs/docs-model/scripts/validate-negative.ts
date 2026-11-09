import path from 'node:path';
import { SemanticValidator } from './semantic-validator';

async function main() {
  const rootDir = path.resolve(__dirname, '..');
  const schemasDir = path.join(rootDir, 'schemas');

  const validator = new SemanticValidator(schemasDir);

  const baseComponent = {
    id: 'button',
    name: 'BasisButton',
    family: 'Actions',
    kind: 'component',
    lifecycle: { status: 'experimental', addedIn: '0.1.0' },
    summary: 'Valid summary.',
    description: 'Button',
    package: 'io.github.alph_a07.basis.components.actions',
    sourceUrl: 'https://example.com',
    overview: {
      quickStartSample: 'BasisButton()',
      anatomy: { parts: [] },
      variants: [{ id: 'primary', name: 'Primary' }],
      states: [{ id: 'enabled', name: 'Enabled' }],
    },
    api: { signatures: [], samples: [] },
    overrides: { universalFields: [], matrix: [] },
    accessibility: {
      role: 'Button',
      touchTarget: { minWidthDp: 48, minHeightDp: 48, enforced: true },
      reducedMotion: { respectsReducedMotion: true },
    },
  };

  const createDoc = (componentOverrides: any = {}, docOverrides: any = {}) => ({
    schemaVersion: '0.2.0',
    provenance: 'generated',
    source: { commit: 'test' },
    components: [
      {
        ...baseComponent,
        ...componentOverrides,
      },
    ],
    ...docOverrides,
  });

  const testCases = [
    {
      name: 'missing-summary',
      type: 'components',
      expectedErrorSnippet: 'Component must have a non-empty KDoc summary',
      doc: createDoc({ summary: '' }),
    },
    {
      name: 'invented-override-field',
      type: 'components',
      expectedErrorSnippet: "Override universalField 'inventedMagicGlow' does not exist",
      doc: createDoc({
        overrides: {
          universalFields: ['inventedMagicGlow'],
          matrix: [],
        },
      }),
    },
    {
      name: 'stable-without-report',
      type: 'components',
      expectedErrorSnippet: "Lifecycle 'stable' status requires accessibility.report",
      doc: createDoc({
        lifecycle: { status: 'stable', addedIn: '0.1.0' },
      }),
    },
    {
      name: 'wrong-major-schema-version',
      type: 'components',
      expectedErrorSnippet: "Unsupported major schemaVersion '2.0.0'",
      doc: createDoc({}, { schemaVersion: '2.0.0' }),
    },
    {
      name: 'invalid-matrix-variant',
      type: 'components',
      expectedErrorSnippet: "Matrix variant 'nonExistentVariant' does not exist",
      doc: createDoc({
        overrides: {
          universalFields: [],
          matrix: [
            {
              variant: 'nonExistentVariant',
              state: 'enabled',
              supportedFields: [],
            },
          ],
        },
      }),
    },
    {
      name: 'missing-sidecar-a11y',
      type: 'sidecar',
      expectedErrorSnippet: "Missing required '## Accessibility' heading",
      content: `---
id: button
guidelines:
  do:
    - Use clear labels.
  dont:
    - Avoid vague labels.
  notes:
    - Complies with touch targets.
---

# Button Documentation

This sidecar intentionally omits the required Accessibility section.
`,
    },
  ];

  let failedTests = 0;

  for (const tc of testCases) {
    let result;
    if (tc.type === 'components') {
      result = validator.validateComponents(tc.doc);
    } else {
      result = validator.validateSidecarMdx(tc.content!, `${tc.name}.sidecar.mdx`);
    }

    if (result.ok) {
      console.error(`❌ Expected failure for ${tc.name}, but validation passed!`);
      failedTests++;
    } else {
      const matched = result.errors.some((err) => err.includes(tc.expectedErrorSnippet));
      if (!matched) {
        console.error(`❌ ${tc.name} failed, but not with expected snippet '${tc.expectedErrorSnippet}'. Errors:`);
        result.errors.forEach((e) => console.error(`   ${e}`));
        failedTests++;
      } else {
        console.log(`✅ Negative test ${tc.name} failed as expected with: '${tc.expectedErrorSnippet}'`);
      }
    }
  }

  if (failedTests > 0) {
    console.error(`\n❌ ${failedTests} negative validation test(s) failed.`);
    process.exit(1);
  } else {
    console.log(`\n🎉 All ${testCases.length} negative tests failed as expected!`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
