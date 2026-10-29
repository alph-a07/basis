import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { SemanticValidator } from '@basis/docs-model/validator';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const schemasDir = path.resolve(currentDir, '../../docs-model/schemas');
const fixturesDir = path.resolve(currentDir, '../../docs-model/fixtures');
const buildModelDir = path.resolve(currentDir, '../../../build/docs-model');

function loadJsonWithFallback(filename: string): any {
  const buildPath = path.join(buildModelDir, filename);
  if (fs.existsSync(buildPath)) {
    return JSON.parse(fs.readFileSync(buildPath, 'utf-8'));
  }
  const fixtureName = filename.replace('.json', '.fixture.json');
  const fixturePath = path.join(fixturesDir, fixtureName);
  if (fs.existsSync(fixturePath)) {
    return JSON.parse(fs.readFileSync(fixturePath, 'utf-8'));
  }
  throw new Error(`Neither generated ${buildPath} nor fixture ${fixturePath} exists.`);
}

const validator = new SemanticValidator(schemasDir);

const components = defineCollection({
  loader: async () => {
    const componentsDoc = loadJsonWithFallback('components.json');
    const patchVocabDoc = loadJsonWithFallback('patch-vocabulary.json');

    const result = validator.validateComponents(componentsDoc, patchVocabDoc);
    if (!result.ok) {
      throw new Error(
        `[ContentLoader] Failed to validate components:\n${result.errors.join('\n')}`
      );
    }

    return componentsDoc.components.map((comp: any) => ({
      id: comp.id,
      ...comp,
    }));
  },
});

const intent = defineCollection({
  loader: async () => {
    const intentDoc = loadJsonWithFallback('intent.json');

    const result = validator.validateIntent(intentDoc);
    if (!result.ok) {
      throw new Error(
        `[ContentLoader] Failed to validate intent:\n${result.errors.join('\n')}`
      );
    }

    return [
      { id: 'identity', ...intentDoc.identity },
      { id: 'mood', ...intentDoc.mood },
      { id: 'domain', ...intentDoc.domain },
      { id: 'control', ...intentDoc.control },
    ];
  },
});

const sidecars = defineCollection({
  loader: glob({
    pattern: '**/*.sidecar.mdx',
    base: path.resolve(currentDir, '../../docs-model/fixtures'),
  }),
  schema: z.object({
    id: z.string(),
    guidelines: z.object({
      do: z.array(z.string()),
      dont: z.array(z.string()),
      notes: z.array(z.string()),
    }),
    a11yReview: z
      .object({
        reviewer: z.string(),
        date: z.string(),
        version: z.string(),
      })
      .optional(),
  }),
});

const docs = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: path.resolve(currentDir, 'content/docs'),
  }),
  schema: z.object({
    title: z.string(),
    section: z.string(),
    order: z.number().default(0),
    status: z.enum(['stub', 'draft', 'published']).default('stub'),
    description: z.string().optional(),
  }),
});

export const collections = {
  components,
  intent,
  sidecars,
  docs,
};
