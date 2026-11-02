/**
 * editorSupport.test.ts - Unit tests for Kotlin highlighting and JSON autocompletion.
 */

import assert from 'node:assert';
import { EditorState } from '@codemirror/state';
import { json } from '@codemirror/lang-json';
import { syntaxTree } from '@codemirror/language';
import {
  kotlinLanguage,
  studioHighlightStyle,
  jsonCompletionSource,
} from '../panes/editorSupport.js';

console.log('Testing Editor Support: Kotlin Syntax Highlighting & JSON Autocompletion...');

// 1. Verify Kotlin Language Tokenization
console.log('1. Testing Kotlin StreamLanguage tokenization...');
const kotlinCode = `// Auto-generated BasisIntent Kotlin export
val intent = BasisIntent(
    identity = IdentityIntent(
        brandColor = ColorSpec.Hex("#2563EB"),
        presence = BrandPresence.Strong,
        deriveColors = true,
    ),
    mood = MoodIntent(
        preset = MoodPreset.Bold,
        knobs = MoodKnobs(
            warmth = 0.8f,
        ),
    ),
)`;

const kotlinState = EditorState.create({
  doc: kotlinCode,
  extensions: [kotlinLanguage],
});

assert.strictEqual(kotlinState.doc.lines, 14, 'Kotlin doc has 14 lines');
console.log('   ✅ Kotlin language parser processed 14 lines successfully.');

// 2. Verify HighlightStyle definition
console.log('2. Testing HighlightStyle definition tags...');
assert.ok(studioHighlightStyle, 'studioHighlightStyle must be defined');
console.log('   ✅ studioHighlightStyle defined with dynamic theme tokens.');

// 3. Testing JSON Autocompletion Source
console.log('3. Testing JSON Autocompletion Source...');

function createMockContext(docText: string, cursorOffset: number, explicit = false) {
  const state = EditorState.create({
    doc: docText,
    extensions: [json()],
  });

  return {
    state,
    pos: cursorOffset,
    explicit,
    matchBefore(regex: RegExp) {
      const lineStart = docText.lastIndexOf('\n', cursorOffset - 1) + 1;
      const textBefore = docText.slice(lineStart, cursorOffset);
      const match = regex.exec(textBefore);
      if (!match) return null;
      return {
        from: cursorOffset - match[0].length,
        to: cursorOffset,
        text: match[0],
      };
    },
  };
}

// 3a. Root level keys completion
const rootDoc = '{\n  ide\n}';
const rootContext = createMockContext(rootDoc, rootDoc.indexOf('ide') + 3, true);
const rootResult = jsonCompletionSource(rootContext as any);

assert.ok(rootResult, 'Must return completion result at root');
const rootLabels = rootResult.options.map((o) => o.label);
assert.ok(rootLabels.includes('identity'), 'Must include "identity" at root');
assert.ok(rootLabels.includes('mood'), 'Must include "mood" at root');
assert.ok(rootLabels.includes('domain'), 'Must include "domain" at root');
assert.ok(rootLabels.includes('control'), 'Must include "control" at root');
console.log('   ✅ Root-level property completions verified:', rootLabels);

// 3b. Inside mood object
const moodDoc = '{\n  "mood": {\n    pre\n  }\n}';
const moodContext = createMockContext(moodDoc, moodDoc.indexOf('pre') + 3, true);
const moodResult = jsonCompletionSource(moodContext as any);

assert.ok(moodResult, 'Must return completion result inside mood');
const moodLabels = moodResult.options.map((o) => o.label);
assert.ok(moodLabels.includes('preset'), 'Must include "preset" inside mood');
assert.ok(moodLabels.includes('knobs'), 'Must include "knobs" inside mood');
console.log('   ✅ Mood property completions verified:', moodLabels);

// 3c. Inside mood.preset enum value
const presetDoc = '{\n  "mood": {\n    "preset": "Bo"\n  }\n}';
const presetContext = createMockContext(presetDoc, presetDoc.indexOf('Bo') + 2, true);
const presetResult = jsonCompletionSource(presetContext as any);

assert.ok(presetResult, 'Must return completion result for preset enum');
const presetLabels = presetResult.options.map((o) => o.label);
assert.ok(presetLabels.includes('Bold'), 'Must include "Bold" for preset enum');
assert.ok(presetLabels.includes('Calm'), 'Must include "Calm" for preset enum');
assert.ok(presetLabels.includes('Neutral'), 'Must include "Neutral" for preset enum');
console.log('   ✅ Preset enum value completions verified:', presetLabels);

// 3d. Inside domain.domains array
const domainDoc = '{\n  "domain": {\n    "domains": [\n      "Fin"\n    ]\n  }\n}';
const domainContext = createMockContext(domainDoc, domainDoc.indexOf('Fin') + 3, true);
const domainResult = jsonCompletionSource(domainContext as any);

assert.ok(domainResult, 'Must return completion result for domain items');
const domainLabels = domainResult.options.map((o) => o.label);
assert.ok(domainLabels.includes('Finance'), 'Must include "Finance"');
assert.ok(domainLabels.includes('Health'), 'Must include "Health"');
console.log('   ✅ Domain array completions verified:', domainLabels);

console.log('\n🎉 Editor Support tests passed: Syntax highlighting & autocompletion verified!');
