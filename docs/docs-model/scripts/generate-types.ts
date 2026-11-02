import fs from 'node:fs';
import path from 'node:path';
import { compileFromFile } from 'json-schema-to-typescript';

async function generate() {
  const schemasDir = path.resolve(__dirname, '../schemas');
  const typesDir = path.resolve(__dirname, '../types');

  if (!fs.existsSync(typesDir)) {
    fs.mkdirSync(typesDir, { recursive: true });
  }

  const schemas = [
    { in: 'components.schema.json', out: 'components.d.ts' },
    { in: 'intent.schema.json', out: 'intent.d.ts' },
    { in: 'patch-vocabulary.schema.json', out: 'patch-vocabulary.d.ts' },
    { in: 'sidecar.schema.json', out: 'sidecar.d.ts' },
  ];

  for (const { in: schemaFile, out: dtsFile } of schemas) {
    const inputPath = path.join(schemasDir, schemaFile);
    const outputPath = path.join(typesDir, dtsFile);

    console.log(`Generating ${dtsFile} from ${schemaFile}...`);
    const ts = await compileFromFile(inputPath, {
      bannerComment: `/* AUTO-GENERATED FILE. DO NOT MODIFY DIRECTLY.
 * This file is generated and must not be edited manually.
 * Neither this file nor the use cases it serves should be written manually.
 */`,
      unreachableDefinitions: true,
    });
    fs.writeFileSync(outputPath, ts, 'utf-8');
  }

  const indexTs = `/* AUTO-GENERATED FILE. DO NOT MODIFY DIRECTLY.
 * This file is generated and must not be edited manually.
 * Neither this file nor the use cases it serves should be written manually.
 */
export * from './components';
export * from './intent';
export * from './patch-vocabulary';
export * from './sidecar';
`;
  fs.writeFileSync(path.join(typesDir, 'index.ts'), indexTs, 'utf-8');
  console.log('Type generation complete.');
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
