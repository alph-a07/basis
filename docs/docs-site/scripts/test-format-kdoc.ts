import assert from 'node:assert/strict';
import { formatKdoc, formatTypeExpression } from '../src/lib/format-kdoc';

console.log('--- Testing formatKdoc & formatTypeExpression ---');

// 1. Basic KDoc symbol references
{
  const html = formatKdoc('Applies a [Shape] to the element.');
  assert.ok(html.includes('href="https://developer.android.com/reference/kotlin/androidx/compose/ui/graphics/Shape"'), 'Should link Shape to Android docs');
  assert.ok(html.includes('class="kdoc-symbol-link external"'), 'Should have external symbol link class');
  assert.ok(html.includes('kdoc-external-icon'), 'Should include external icon');
  assert.ok(!html.includes('[Shape]'), 'Should not leave raw brackets');
  console.log('✓ formatKdoc links [Shape]');
}

// 2. Qualified symbols (Role.None, Role.Button)
{
  const html = formatKdoc('Semantics role [Role.None] or [Role.Button].');
  assert.ok(html.includes('androidx.compose.ui.semantics.Role'), 'Role.None links to Role docs');
  assert.ok(html.includes('Role#Button()'), 'Role.Button links to Role.Button anchor');
  assert.ok(!html.includes('[Role.None]'), 'Brackets removed for Role.None');
  assert.ok(!html.includes('[Role.Button]'), 'Brackets removed for Role.Button');
  console.log('✓ formatKdoc links qualified symbols [Role.None] and [Role.Button]');
}

// 3. Basis Foundation Modifiers (Internal Links)
{
  const html = formatKdoc('Check out [basisMinTouchTarget] and [Modifier.basisBorder].');
  assert.ok(html.includes('href="/docs/modifiers/basis-min-touch-target"'), 'basisMinTouchTarget routes internally');
  assert.ok(html.includes('href="/docs/modifiers/basis-border"'), 'Modifier.basisBorder routes internally');
  assert.ok(!html.includes('class="kdoc-symbol-link external"'), 'Internal modifier links should not be marked external');
  console.log('✓ formatKdoc links internal Basis modifiers');
}

// 4. Unknown/unmapped symbols (parameter references or custom types)
{
  const html = formatKdoc('Requires [min] width and [customValue].');
  assert.ok(html.includes('<code class="kdoc-symbol-ref">min</code>'), 'Unknown symbol rendered as styled symbol-ref pill');
  assert.ok(html.includes('<code class="kdoc-symbol-ref">customValue</code>'), 'Unknown symbol rendered as styled symbol-ref pill');
  assert.ok(!html.includes('[min]'), 'Should gracefully format unknown brackets without stripping to plain text');
  console.log('✓ formatKdoc gracefully formats unmapped symbols as styled pills');
}

// 5. Inline backticks elevated to interactive links
{
  const html = formatKdoc('Supports `Role.RadioButton` and `basisFocusRing()` or plain `itemCount`.');
  assert.ok(html.includes('href="https://developer.android.com/reference/kotlin/androidx/compose/ui/semantics/Role#RadioButton()"'), 'Backticked Role.RadioButton elevated to link');
  assert.ok(html.includes('href="/docs/modifiers/basis-focus-ring"'), 'Backticked basisFocusRing() elevated to link');
  assert.ok(html.includes('<code class="kdoc-inline-code">itemCount</code>'), 'Plain backtick stays kdoc-inline-code');
  console.log('✓ formatKdoc automatically elevates known backtick code symbols to interactive links');
}

// 6. formatTypeExpression: simple and nullable types
{
  const htmlShape = formatTypeExpression('Shape?');
  assert.ok(htmlShape.includes('androidx/compose/ui/graphics/Shape'), 'Shape? contains Shape link');
  assert.ok(htmlShape.endsWith('?'), 'Shape? preserves trailing ?');

  const htmlBorder = formatTypeExpression('BorderStroke?');
  assert.ok(htmlBorder.includes('androidx/compose/foundation/BorderStroke'), 'BorderStroke? links to BorderStroke');

  const htmlDp = formatTypeExpression('Dp');
  assert.ok(htmlDp.includes('androidx/compose/ui/unit/Dp'), 'Dp links to Dp');

  console.log('✓ formatTypeExpression handles simple and nullable types');
}

// 7. formatTypeExpression: compound lambdas
{
  const lambdaHtml = formatTypeExpression('(ContentDrawScope.() -> Unit)?');
  assert.ok(lambdaHtml.includes('ContentDrawScope'), 'Lambda links ContentDrawScope');
  assert.ok(lambdaHtml.includes('kotlin/-unit/'), 'Lambda links Unit');
  assert.ok(lambdaHtml.startsWith('('), 'Lambda preserves opening paren');
  assert.ok(lambdaHtml.endsWith(')?'), 'Lambda preserves closing paren and nullable operator');
  console.log('✓ formatTypeExpression handles functional receiver lambdas');
}

// 8. formatTypeExpression: default values
{
  const defaultUnspecified = formatTypeExpression('Color.Unspecified');
  assert.ok(defaultUnspecified.includes('Color#Unspecified()'), 'Links Color.Unspecified');

  const defaultRoleNone = formatTypeExpression('Role.None');
  assert.ok(defaultRoleNone.includes('androidx/compose/ui/semantics/Role'), 'Links Role.None');

  const defaultNull = formatTypeExpression('null');
  assert.strictEqual(defaultNull, 'null', 'null literal preserved');

  console.log('✓ formatTypeExpression handles default values');
}

console.log('All format-kdoc tests passed successfully!');
