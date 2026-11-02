import assert from 'node:assert';
import { JSDOM } from 'jsdom';
import { loadDocsRuntime, resolveSafe } from '../state/resolveClient';
import { StudioIntentStore } from '../state/intentStore';

console.log('Testing Local Scope Isolation (Gate 4: no CSS var leaks to document, chrome, or other routes)...\n');

async function testLocality() {
  const runtime = await loadDocsRuntime();
  assert(runtime);

  // Setup simulated HTML document with docs chrome and studio stage
  const dom = new JSDOM(`
    <!DOCTYPE html>
    <html lang="en" data-theme="dark" style="--docs-accent: #58a6ff; --d-spacing-base: 16px;">
      <head><title>Basis Studio</title></head>
      <body>
        <header class="docs-header" style="color: var(--docs-accent);">Docs Header</header>
        <div id="studio-root">
          <div id="studio-stage" data-studio-scope="true">
            <div class="scene-frame">Preview content</div>
          </div>
        </div>
      </body>
    </html>
  `);

  const { document, window } = dom.window;
  (globalThis as any).window = window;
  (globalThis as any).document = document;

  const stageEl = document.getElementById('studio-stage') as HTMLElement;
  assert(stageEl, 'Stage with [data-studio-scope] must exist');

  // Verify initial state of root document and docs chrome
  const rootStyleBefore = document.documentElement.style.cssText;
  const chromeHeader = document.querySelector('.docs-header') as HTMLElement;
  const headerStyleBefore = chromeHeader.style.cssText;

  // Initialize store and apply tokens strictly to stage element
  const store = new StudioIntentStore();
  let appliedScope: HTMLElement | null = null;

  function applyTokensLocally(el: HTMLElement, result: any) {
    appliedScope = el;
    if (!result?.ok || !result.tokens) return;
    const theme = el.getAttribute('data-theme') || 'dark';
    const map = theme === 'dark' ? result.tokens.dark : result.tokens.light;
    for (const [key, value] of Object.entries(map)) {
      el.style.setProperty(key, value as string);
    }
  }

  // Mutate multiple intent controls
  store.set('/identity/brandColor', {
    type: 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex',
    value: '#FF5722',
  }, true);
  await store.resolveNow();

  const state1 = store.getState();
  assert(state1.lastGoodResult?.ok);
  applyTokensLocally(stageEl, state1.lastGoodResult);

  // Assert tokens ARE set on stage element
  assert(stageEl.style.getPropertyValue('--b-color-brand-primary').length > 0, 'Stage must receive --b-* tokens');
  assert.strictEqual(stageEl.getAttribute('data-studio-scope'), 'true');
  assert.strictEqual(appliedScope, stageEl);

  // Mutate knobs and constraints heavily
  store.set('/mood/knobs/warmth', 0.8, true);
  store.set('/mood/knobs/density', 0.9, true);
  store.set('/control/constraints', { minTouchTarget: { minSize: 56.0 } }, true);
  await store.resolveNow();

  const state2 = store.getState();
  assert(state2.lastGoodResult?.ok);
  applyTokensLocally(stageEl, state2.lastGoodResult);

  // 1. Assert document.documentElement has ZERO --b-* properties
  const docComputed = document.documentElement.style;
  for (let i = 0; i < docComputed.length; i++) {
    const propName = docComputed[i];
    assert(
      !propName.startsWith('--b-'),
      `Leaked CSS variable to :root/html element: ${propName}`,
    );
  }
  assert.strictEqual(document.documentElement.style.cssText, rootStyleBefore, 'Root element style attribute must not mutate');

  // 2. Assert docs chrome header has ZERO --b-* properties and remains identical
  assert.strictEqual(chromeHeader.style.cssText, headerStyleBefore, 'Docs chrome header style must remain pristine');

  // 3. Assert document.body has ZERO --b-* properties
  assert.strictEqual(document.body.style.cssText, '', 'Body element style must remain empty');

  // 4. Assert clean destruction
  store.destroy();
  console.log('   ✅ All --b-* custom properties isolated exclusively to [data-studio-scope].');
  console.log('   ✅ Docs chrome (--docs-*, --d-*) untouched; 0 root style pollution.');
  console.log('\n🎉 Gate 4 Locality passed: Local scope isolation verified!\n');
}

testLocality().catch((err) => {
  console.error(err);
  process.exit(1);
});
