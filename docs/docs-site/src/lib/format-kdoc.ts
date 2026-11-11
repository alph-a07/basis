/**
 * Maps Kotlin, Jetpack Compose, and Basis symbols to documentation URLs.
 */
interface SymbolInfo {
  url?: string;
  external?: boolean;
  title?: string;
}

const SYMBOL_MAP: Record<string, SymbolInfo> = {
  // Compose Graphics & Shapes
  Shape: {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/ui/graphics/Shape',
    external: true,
    title: 'androidx.compose.ui.graphics.Shape',
  },
  RectangleShape: {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/ui/graphics/RectangleShape',
    external: true,
    title: 'androidx.compose.ui.graphics.RectangleShape',
  },
  CircleShape: {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/foundation/shape/CircleShape',
    external: true,
    title: 'androidx.compose.foundation.shape.CircleShape',
  },
  RoundedCornerShape: {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/foundation/shape/RoundedCornerShape',
    external: true,
    title: 'androidx.compose.foundation.shape.RoundedCornerShape',
  },
  Color: {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/ui/graphics/Color',
    external: true,
    title: 'androidx.compose.ui.graphics.Color',
  },
  'Color.Unspecified': {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/ui/graphics/Color#Unspecified()',
    external: true,
    title: 'Color.Unspecified',
  },
  'Color.Black': {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/ui/graphics/Color#Black()',
    external: true,
    title: 'Color.Black',
  },
  'Color.White': {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/ui/graphics/Color#White()',
    external: true,
    title: 'Color.White',
  },
  'Color.Transparent': {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/ui/graphics/Color#Transparent()',
    external: true,
    title: 'Color.Transparent',
  },
  BorderStroke: {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/foundation/BorderStroke',
    external: true,
    title: 'androidx.compose.foundation.BorderStroke',
  },
  Modifier: {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/ui/Modifier',
    external: true,
    title: 'androidx.compose.ui.Modifier',
  },
  Brush: {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/ui/graphics/Brush',
    external: true,
    title: 'androidx.compose.ui.graphics.Brush',
  },
  SolidColor: {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/ui/graphics/SolidColor',
    external: true,
    title: 'androidx.compose.ui.graphics.SolidColor',
  },

  // Units
  Dp: {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/ui/unit/Dp',
    external: true,
    title: 'androidx.compose.ui.unit.Dp',
  },
  'Dp.Unspecified': {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/ui/unit/Dp#Unspecified()',
    external: true,
    title: 'Dp.Unspecified',
  },
  'Dp.Hairline': {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/ui/unit/Dp#Hairline()',
    external: true,
    title: 'Dp.Hairline',
  },
  'Dp.Infinity': {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/ui/unit/Dp#Infinity()',
    external: true,
    title: 'Dp.Infinity',
  },
  TextUnit: {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/ui/unit/TextUnit',
    external: true,
    title: 'androidx.compose.ui.unit.TextUnit',
  },
  'TextUnit.Unspecified': {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/ui/unit/TextUnit#Unspecified()',
    external: true,
    title: 'TextUnit.Unspecified',
  },

  // Semantics & Interaction
  Role: {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/ui/semantics/Role',
    external: true,
    title: 'androidx.compose.ui.semantics.Role',
  },
  'Role.Button': {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/ui/semantics/Role#Button()',
    external: true,
    title: 'androidx.compose.ui.semantics.Role.Button',
  },
  'Role.RadioButton': {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/ui/semantics/Role#RadioButton()',
    external: true,
    title: 'androidx.compose.ui.semantics.Role.RadioButton',
  },
  'Role.Checkbox': {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/ui/semantics/Role#Checkbox()',
    external: true,
    title: 'androidx.compose.ui.semantics.Role.Checkbox',
  },
  'Role.Switch': {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/ui/semantics/Role#Switch()',
    external: true,
    title: 'androidx.compose.ui.semantics.Role.Switch',
  },
  'Role.Tab': {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/ui/semantics/Role#Tab()',
    external: true,
    title: 'androidx.compose.ui.semantics.Role.Tab',
  },
  'Role.Image': {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/ui/semantics/Role#Image()',
    external: true,
    title: 'androidx.compose.ui.semantics.Role.Image',
  },
  'Role.DropdownList': {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/ui/semantics/Role#DropdownList()',
    external: true,
    title: 'androidx.compose.ui.semantics.Role.DropdownList',
  },
  'Role.None': {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/ui/semantics/Role',
    external: true,
    title: 'androidx.compose.ui.semantics.Role (None / Unassigned)',
  },
  Indication: {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/foundation/Indication',
    external: true,
    title: 'androidx.compose.foundation.Indication',
  },
  Alignment: {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/ui/Alignment',
    external: true,
    title: 'androidx.compose.ui.Alignment',
  },
  'Alignment.Center': {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/ui/Alignment#Center()',
    external: true,
    title: 'Alignment.Center',
  },
  LayoutDirection: {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/ui/unit/LayoutDirection',
    external: true,
    title: 'androidx.compose.ui.unit.LayoutDirection',
  },
  ContentDrawScope: {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/ui/graphics/drawscope/ContentDrawScope',
    external: true,
    title: 'androidx.compose.ui.graphics.drawscope.ContentDrawScope',
  },
  DrawScope: {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/ui/graphics/drawscope/DrawScope',
    external: true,
    title: 'androidx.compose.ui.graphics.drawscope.DrawScope',
  },
  SemanticsPropertyReceiver: {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/ui/semantics/SemanticsPropertyReceiver',
    external: true,
    title: 'androidx.compose.ui.semantics.SemanticsPropertyReceiver',
  },
  InteractionSource: {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/foundation/interaction/InteractionSource',
    external: true,
    title: 'androidx.compose.foundation.interaction.InteractionSource',
  },
  MutableInteractionSource: {
    url: 'https://developer.android.com/reference/kotlin/androidx/compose/foundation/interaction/MutableInteractionSource',
    external: true,
    title: 'androidx.compose.foundation.interaction.MutableInteractionSource',
  },

  // Kotlin Standard Library
  Int: {
    url: 'https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-int/',
    external: true,
    title: 'kotlin.Int',
  },
  Float: {
    url: 'https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-float/',
    external: true,
    title: 'kotlin.Float',
  },
  Double: {
    url: 'https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-double/',
    external: true,
    title: 'kotlin.Double',
  },
  Long: {
    url: 'https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-long/',
    external: true,
    title: 'kotlin.Long',
  },
  Boolean: {
    url: 'https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-boolean/',
    external: true,
    title: 'kotlin.Boolean',
  },
  String: {
    url: 'https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-string/',
    external: true,
    title: 'kotlin.String',
  },
  Unit: {
    url: 'https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-unit/',
    external: true,
    title: 'kotlin.Unit',
  },

  // Basis Foundation Modifiers
  basisBorder: { url: '/docs/modifiers/basis-border', title: 'basisBorder modifier' },
  'Modifier.basisBorder': { url: '/docs/modifiers/basis-border', title: 'Modifier.basisBorder' },
  basisClearAndSetSemantics: { url: '/docs/modifiers/basis-clear-and-set-semantics', title: 'basisClearAndSetSemantics modifier' },
  'Modifier.basisClearAndSetSemantics': { url: '/docs/modifiers/basis-clear-and-set-semantics', title: 'Modifier.basisClearAndSetSemantics' },
  basisClickable: { url: '/docs/modifiers/basis-clickable', title: 'basisClickable modifier' },
  'Modifier.basisClickable': { url: '/docs/modifiers/basis-clickable', title: 'Modifier.basisClickable' },
  basisClip: { url: '/docs/modifiers/basis-clip', title: 'basisClip modifier' },
  'Modifier.basisClip': { url: '/docs/modifiers/basis-clip', title: 'Modifier.basisClip' },
  basisFocusRing: { url: '/docs/modifiers/basis-focus-ring', title: 'basisFocusRing modifier' },
  'Modifier.basisFocusRing': { url: '/docs/modifiers/basis-focus-ring', title: 'Modifier.basisFocusRing' },
  basisFocusable: { url: '/docs/modifiers/basis-focusable', title: 'basisFocusable modifier' },
  'Modifier.basisFocusable': { url: '/docs/modifiers/basis-focusable', title: 'Modifier.basisFocusable' },
  basisHoverable: { url: '/docs/modifiers/basis-hoverable', title: 'basisHoverable modifier' },
  'Modifier.basisHoverable': { url: '/docs/modifiers/basis-hoverable', title: 'Modifier.basisHoverable' },
  basisIndication: { url: '/docs/modifiers/basis-indication', title: 'basisIndication modifier' },
  'Modifier.basisIndication': { url: '/docs/modifiers/basis-indication', title: 'Modifier.basisIndication' },
  basisMinTouchTarget: { url: '/docs/modifiers/basis-min-touch-target', title: 'basisMinTouchTarget modifier' },
  'Modifier.basisMinTouchTarget': { url: '/docs/modifiers/basis-min-touch-target', title: 'Modifier.basisMinTouchTarget' },
  basisPadding: { url: '/docs/modifiers/basis-padding', title: 'basisPadding modifier' },
  'Modifier.basisPadding': { url: '/docs/modifiers/basis-padding', title: 'Modifier.basisPadding' },
  basisRipple: { url: '/docs/modifiers/basis-ripple', title: 'basisRipple modifier' },
  'Modifier.basisRipple': { url: '/docs/modifiers/basis-ripple', title: 'Modifier.basisRipple' },
  basisSelectable: { url: '/docs/modifiers/basis-selectable', title: 'basisSelectable modifier' },
  'Modifier.basisSelectable': { url: '/docs/modifiers/basis-selectable', title: 'Modifier.basisSelectable' },
  basisSemantics: { url: '/docs/modifiers/basis-semantics', title: 'basisSemantics modifier' },
  'Modifier.basisSemantics': { url: '/docs/modifiers/basis-semantics', title: 'Modifier.basisSemantics' },
  basisShadow: { url: '/docs/modifiers/basis-shadow', title: 'basisShadow modifier' },
  'Modifier.basisShadow': { url: '/docs/modifiers/basis-shadow', title: 'Modifier.basisShadow' },
  basisSurface: { url: '/docs/modifiers/basis-surface', title: 'basisSurface modifier' },
  'Modifier.basisSurface': { url: '/docs/modifiers/basis-surface', title: 'Modifier.basisSurface' },
  basisToggleable: { url: '/docs/modifiers/basis-toggleable', title: 'basisToggleable modifier' },
  'Modifier.basisToggleable': { url: '/docs/modifiers/basis-toggleable', title: 'Modifier.basisToggleable' },
  basisTouchTarget: { url: '/docs/modifiers/basis-min-touch-target', title: 'basisMinTouchTarget modifier' },
  'Modifier.basisTouchTarget': { url: '/docs/modifiers/basis-min-touch-target', title: 'Modifier.basisMinTouchTarget' },
  basisModifier: { url: '/docs/modifiers/basis-surface', title: 'basisModifier root extension' },
  'Modifier.basisModifier': { url: '/docs/modifiers/basis-surface', title: 'Modifier.basisModifier' },

  // Basis Tokens & Theme Architecture
  BasisTheme: { url: '/docs/getting-started/quickstart', title: 'BasisTheme ambient provider' },
  'BasisTheme.minTouchTarget': { url: '/docs/modifiers/basis-min-touch-target', title: 'BasisTheme.minTouchTarget' },
  'BasisTheme.colors': { url: '/docs/theming/set-brand', title: 'BasisTheme.colors' },
  'BasisTheme.colors.surface': { url: '/docs/theming/set-brand', title: 'BasisTheme.colors.surface' },
  'BasisTheme.colors.border': { url: '/docs/theming/set-brand', title: 'BasisTheme.colors.border' },
  'BasisTheme.spacing': {
    url: 'https://github.com/alph-a07/basis/blob/main/basis-theme/src/commonMain/kotlin/io/github/alph_a07/basis/theme/tokens/scalars/SpacingTokens.kt',
    external: true,
    title: 'BasisTheme.spacing (SpacingTokens)',
  },
  'BasisTheme.radius': {
    url: 'https://github.com/alph-a07/basis/blob/main/basis-theme/src/commonMain/kotlin/io/github/alph_a07/basis/theme/tokens/scalars/RadiusTokens.kt',
    external: true,
    title: 'BasisTheme.radius (RadiusTokens)',
  },
  'BasisTheme.depth': {
    url: 'https://github.com/alph-a07/basis/blob/main/basis-theme/src/commonMain/kotlin/io/github/alph_a07/basis/theme/tokens/scalars/DepthTokens.kt',
    external: true,
    title: 'BasisTheme.depth (DepthTokens: level1, level2, level3, level4)',
  },
  'BasisTheme.motion': {
    url: 'https://github.com/alph-a07/basis/blob/main/basis-theme/src/commonMain/kotlin/io/github/alph_a07/basis/theme/tokens/motion/MotionTokens.kt',
    external: true,
    title: 'BasisTheme.motion (MotionTokens)',
  },
  DpValue: {
    url: 'https://github.com/alph-a07/basis/blob/main/basis-theme/src/commonMain/kotlin/io/github/alph_a07/basis/theme/core/DpValue.kt',
    external: true,
    title: 'io.github.alph_a07.basis.theme.core.DpValue',
  },
  DepthSpec: {
    url: 'https://github.com/alph-a07/basis/blob/main/basis-theme/src/commonMain/kotlin/io/github/alph_a07/basis/theme/tokens/scalars/DepthTokens.kt',
    external: true,
    title: 'io.github.alph_a07.basis.theme.tokens.scalars.DepthSpec',
  },
  Treatment: { url: '/docs/theming/customize-components', title: 'Treatment visual archetype' },
  ConstraintsControl: { url: '/docs/theming/intent-reference', title: 'ConstraintsControl' },
  'ConstraintsControl.minTouchTarget': { url: '/docs/theming/intent-reference', title: 'ConstraintsControl.minTouchTarget' },
  BasisIntent: { url: '/docs/theming/intent-reference', title: 'BasisIntent root declaration' },
  IdentityIntent: { url: '/docs/theming/set-brand', title: 'IdentityIntent' },
  MoodIntent: { url: '/docs/theming/mood-domain', title: 'MoodIntent' },
  DomainIntent: { url: '/docs/theming/mood-domain', title: 'DomainIntent' },
  ControlIntent: { url: '/docs/theming/customize-components', title: 'ControlIntent' },
  ComponentId: { url: '/docs/theming/customize-components', title: 'ComponentId' },
  LocalBasisContentColor: { url: '/docs/theming/customize-components', title: 'LocalBasisContentColor composition local' },
  LocalBasisTheme: { url: '/docs/theming/dark-mode', title: 'LocalBasisTheme composition local' },
};

/**
 * Pre-sorted symbol keys in descending length order so compound/dotted symbols
 * (e.g. `Color.Unspecified`, `Role.Button`) are matched before their parent prefixes (`Color`, `Role`).
 */
const SORTED_SYMBOLS: string[] = Object.keys(SYMBOL_MAP).sort((a, b) => b.length - a.length);

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getExternalIconSvg(): string {
  return '<svg class="kdoc-external-icon" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>';
}

/**
 * Formats a single symbol into an interactive link or pill.
 */
function renderSymbolTag(symbol: string): string {
  const isNullable = symbol.endsWith('?');
  const baseSymbol = isNullable ? symbol.slice(0, -1) : symbol;
  const info = SYMBOL_MAP[symbol] || SYMBOL_MAP[baseSymbol];
  if (info && info.url) {
    const isExternal = info.external || info.url.startsWith('http://') || info.url.startsWith('https://');
    const externalAttrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
    const titleAttr = info.title ? ` title="${escapeHtml(info.title)}"` : '';
    const icon = isExternal ? getExternalIconSvg() : '';
    return `<a href="${info.url}" class="kdoc-symbol-link${isExternal ? ' external' : ''}"${externalAttrs}${titleAttr}><code>${escapeHtml(symbol)}</code>${icon}</a>`;
  }
  const titleAttr = info?.title ? ` title="${escapeHtml(info.title)}"` : '';
  return `<code class="kdoc-symbol-ref"${titleAttr}>${escapeHtml(symbol)}</code>`;
}

/**
 * Formats KDoc references, markdown links, and inline code into enhanced HTML.
 *
 * Replaces:
 * - `[Symbol]` references with interactive links (when mapped) or styled symbol pills.
 * - `[Label][Target]` references with labeled links or styled code.
 * - `[Label](url)` standard markdown links.
 * - `` `code` `` inline backticks with interactive symbol links (if recognized) or styled code badges.
 * - `**bold**` and `*italic*` inline markdown emphasis.
 *
 * @param text Raw documentation string from KDoc or sidecars.
 * @return Formatted HTML string ready for injection.
 */
export function formatKdoc(text: string | null | undefined): string {
  if (!text) {
    return '';
  }

  const tokens: string[] = [];
  let tokenCounter = 0;

  function pushToken(html: string): string {
    const placeholder = `__KDOC_TOKEN_${tokenCounter}__`;
    tokens[tokenCounter] = html;
    tokenCounter++;
    return placeholder;
  }

  let processed = text;

  // 1. Markdown links: [Label](url)
  processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
    const isExternal = url.startsWith('http://') || url.startsWith('https://');
    const externalAttrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
    const safeUrl = escapeHtml(url);
    const safeLabel = escapeHtml(label);
    const icon = isExternal ? getExternalIconSvg() : '';
    return pushToken(`<a href="${safeUrl}" class="kdoc-link${isExternal ? ' external' : ''}"${externalAttrs}>${safeLabel}${icon}</a>`);
  });

  // 2. KDoc two-part links: [Label][Target]
  processed = processed.replace(/\[([^\]]+)\]\[([^\]]+)\]/g, (_, label, target) => {
    const cleanTarget = target.trim();
    const cleanTargetBase = cleanTarget.replace(/\?$/, '');
    const info = SYMBOL_MAP[cleanTarget] || SYMBOL_MAP[cleanTargetBase];
    const safeLabel = escapeHtml(label);
    if (info) {
      const isExternal = info.external || info.url.startsWith('http://') || info.url.startsWith('https://');
      const externalAttrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
      const titleAttr = info.title ? ` title="${escapeHtml(info.title)}"` : '';
      const icon = isExternal ? getExternalIconSvg() : '';
      return pushToken(`<a href="${info.url}" class="kdoc-symbol-link${isExternal ? ' external' : ''}"${externalAttrs}${titleAttr}><code>${safeLabel}</code>${icon}</a>`);
    }
    return pushToken(`<code class="kdoc-symbol-ref">${safeLabel}</code>`);
  });

  // 3. KDoc single-part references: [Symbol] or [Symbol?]
  processed = processed.replace(/\[([A-Za-z0-9_.]+\??)\]/g, (_, rawSymbol) => {
    const symbol = rawSymbol.trim();
    return pushToken(renderSymbolTag(symbol));
  });

  // 4. Inline code: `code` — automatically elevates known symbols to interactive links
  processed = processed.replace(/`([^`]+)`/g, (_, code) => {
    const clean = code.trim();
    const cleanWithoutParens = clean.replace(/\(\)$/, '');
    const cleanBase = cleanWithoutParens.replace(/\?$/, '');
    const matchedKey = SYMBOL_MAP[clean]
      ? clean
      : (SYMBOL_MAP[cleanWithoutParens] ? cleanWithoutParens : (SYMBOL_MAP[cleanBase] ? cleanBase : null));
    if (matchedKey) {
      const info = SYMBOL_MAP[matchedKey];
      const isExternal = info.external || info.url.startsWith('http://') || info.url.startsWith('https://');
      const externalAttrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
      const titleAttr = info.title ? ` title="${escapeHtml(info.title)}"` : '';
      const icon = isExternal ? getExternalIconSvg() : '';
      return pushToken(`<a href="${info.url}" class="kdoc-symbol-link${isExternal ? ' external' : ''}"${externalAttrs}${titleAttr}><code>${escapeHtml(clean)}</code>${icon}</a>`);
    }
    return pushToken(`<code class="kdoc-inline-code">${escapeHtml(code)}</code>`);
  });

  // 5. Bold: **text**
  processed = processed.replace(/\*\*([^*]+)\*\*/g, (_, boldText) => {
    return pushToken(`<strong>${escapeHtml(boldText)}</strong>`);
  });

  // 6. Italic: *text*
  processed = processed.replace(/\*([^*]+)\*/g, (_, italicText) => {
    return pushToken(`<em>${escapeHtml(italicText)}</em>`);
  });

  // 7. Escape remaining plain text
  processed = escapeHtml(processed);

  // 8. Restore tokens
  for (let i = 0; i < tokens.length; i++) {
    processed = processed.replace(`__KDOC_TOKEN_${i}__`, tokens[i]);
  }

  return processed;
}

/**
 * Formats a Kotlin type expression or default value (e.g. `Shape`, `Role.None`, `(ContentDrawScope.() -> Unit)?`)
 * into interactive HTML, linking known symbols while preserving syntax punctuation.
 *
 * @param expression Raw Kotlin type or default value string.
 * @return Enhanced HTML string with interactive symbol links.
 */
export function formatTypeExpression(expression: string | null | undefined): string {
  if (!expression) {
    return '';
  }

  let wrapped = expression;
  for (const symbol of SORTED_SYMBOLS) {
    const escaped = symbol.replace(/\./g, '\\.');
    // Match the symbol as an independent token (optionally nullable with '?')
    // not already inside brackets or backticks, avoiding partial matches of dotted properties
    const regex = new RegExp(`(?<![A-Za-z0-9_.[\`])${escaped}(\\?)?(?!(?:\\.[A-Za-z0-9_]|[A-Za-z0-9_\`\\]]))`, 'g');
    wrapped = wrapped.replace(regex, (_, q) => `[${symbol}${q || ''}]`);
  }

  return formatKdoc(wrapped);
}
