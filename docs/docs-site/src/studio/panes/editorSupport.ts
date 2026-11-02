/**
 * editorSupport.ts - Syntax highlighting and autocompletion support for CodeMirror in Basis Studio.
 *
 * Rules:
 * - Real facade resolution only (Rule 1).
 * - No reimplementing Kotlin math or Kotlin parser in JS.
 * - Two style scopes, never mixed (Rule 4: Shell CSS references only docs / studio tokens).
 * - Vibrant syntax highlighting for both JSON and Kotlin modes.
 * - Schema-aware autocompletion for BasisIntent in JSON mode.
 */

import { StreamLanguage, HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import type { CompletionContext, CompletionResult, Completion } from '@codemirror/autocomplete';
import { syntaxTree } from '@codemirror/language';

/* --------------------------------------------------------------------------
   1. Dynamic Theme Syntax Highlighting Style
   Uses CSS variables so highlighting automatically adapts to Light & Dark modes.
   -------------------------------------------------------------------------- */

export const studioHighlightStyle = HighlightStyle.define([
  { tag: tags.keyword, color: 'var(--studio-code-keyword)', fontWeight: '600' },
  { tag: tags.propertyName, color: 'var(--studio-code-property)' },
  { tag: tags.string, color: 'var(--studio-code-string)' },
  { tag: tags.number, color: 'var(--studio-code-number)' },
  { tag: tags.bool, color: 'var(--studio-code-bool)', fontWeight: '600' },
  { tag: tags.null, color: 'var(--studio-code-null)', fontWeight: '600' },
  { tag: tags.typeName, color: 'var(--studio-code-type)', fontWeight: '600' },
  { tag: tags.comment, color: 'var(--studio-code-comment)', fontStyle: 'italic' },
  { tag: tags.operator, color: 'var(--studio-code-operator)' },
  { tag: tags.punctuation, color: 'var(--studio-code-punctuation)' },
  { tag: tags.definition(tags.variableName), color: 'var(--studio-code-property)' },
  { tag: tags.variableName, color: 'var(--studio-text)' },
]);

export const studioSyntaxHighlighting = syntaxHighlighting(studioHighlightStyle, { fallback: true });

/* --------------------------------------------------------------------------
   2. Kotlin Language Support (StreamLanguage)
   Provides full syntax recognition for Kotlin exports in the editor.
   -------------------------------------------------------------------------- */

const KOTLIN_KEYWORDS = new Set([
  'val', 'var', 'fun', 'class', 'object', 'interface', 'package', 'import',
  'return', 'if', 'else', 'when', 'for', 'while', 'do', 'try', 'catch', 'finally',
  'throw', 'is', 'in', 'as', 'this', 'super', 'null', 'true', 'false', 'setOf', 'listOf', 'mapOf',
]);

export const kotlinLanguage = StreamLanguage.define({
  name: 'kotlin',
  startState() {
    return { inString: false };
  },
  token(stream) {
    if (stream.eatSpace()) return null;

    // Comments
    if (stream.match('//')) {
      stream.skipToEnd();
      return 'comment';
    }
    if (stream.match('/*')) {
      while (!stream.match('*/', true)) {
        if (!stream.next()) break;
      }
      return 'comment';
    }

    // Strings
    if (stream.match('"""')) {
      while (!stream.match('"""', true)) {
        if (!stream.next()) break;
      }
      return 'string';
    }
    if (stream.match('"')) {
      while (!stream.eol()) {
        const ch = stream.next();
        if (ch === '"' && stream.string.charAt(stream.pos - 2) !== '\\') break;
      }
      return 'string';
    }

    // Numbers (e.g. 0.8f, 12, 0xFF)
    if (stream.match(/^-?0x[0-9a-fA-F]+/i) || stream.match(/^-?\d+(\.\d+)?([eE][+-]?\d+)?[fFL]?/)) {
      return 'number';
    }

    // Identifiers & keywords
    if (stream.match(/^[a-zA-Z_][a-zA-Z0-9_]*/)) {
      const word = stream.current();
      if (KOTLIN_KEYWORDS.has(word)) {
        if (word === 'true' || word === 'false') return 'bool';
        if (word === 'null') return 'null';
        return 'keyword';
      }
      if (stream.match(/^\s*=/, false)) {
        return 'propertyName';
      }
      if (/^[A-Z][a-zA-Z0-9_]*/.test(word)) {
        return 'typeName';
      }
      return 'variableName';
    }

    // Operators and punctuation
    const ch = stream.next();
    if (!ch) return null;
    if (/[=+\-*/%&|<>!?:.]/.test(ch)) return 'operator';
    if (/[(){}[\];,]/.test(ch)) return 'punctuation';

    return null;
  },
  tokenTable: {
    keyword: tags.keyword,
    bool: tags.bool,
    null: tags.null,
    comment: tags.comment,
    string: tags.string,
    number: tags.number,
    typeName: tags.typeName,
    propertyName: tags.propertyName,
    variableName: tags.variableName,
    operator: tags.operator,
    punctuation: tags.punctuation,
  },
});

/* --------------------------------------------------------------------------
   3. Schema-Aware Autocompletion for JSON
   Derives from BasisIntent schema structure.
   -------------------------------------------------------------------------- */

interface PropertyDescriptor {
  name: string;
  detail: string;
  info: string;
  isObject?: boolean;
}

interface ValueDescriptor {
  value: string;
  detail: string;
  info: string;
}

const SCHEMA_PROPERTIES: Record<string, PropertyDescriptor[]> = {
  root: [
    { name: 'identity', detail: 'IdentityIntent', info: 'Brand colors, presence, and typography identity', isObject: true },
    { name: 'mood', detail: 'MoodIntent', info: 'Mood presets and feel knobs', isObject: true },
    { name: 'domain', detail: 'DomainIntent', info: 'Product domain and interaction pattern influences', isObject: true },
    { name: 'control', detail: 'ControlIntent', info: 'Overrides, constraints, mode, and typography locks', isObject: true },
  ],
  identity: [
    { name: 'brandColor', detail: 'ColorSpec', info: 'Primary brand intake color', isObject: true },
    { name: 'supportingColors', detail: 'ColorSpec[]', info: 'Up to 3 secondary brand anchors' },
    { name: 'presence', detail: 'BrandPresence', info: 'How evident the brand color is in semantic roles' },
    { name: 'typography', detail: 'TypographyIdentity', info: 'Brand typeface intent candidates and role pins', isObject: true },
    { name: 'deriveColors', detail: 'boolean', info: 'Synthesize colors from mood, brand, and domain signals' },
  ],
  'identity.brandColor': [
    { name: 'type', detail: 'string', info: 'Intake color space (Hex, Srgb, Oklch)' },
    { name: 'value', detail: 'string', info: 'Color string value (e.g. #2563EB)' },
  ],
  'identity.typography': [
    { name: 'candidates', detail: 'FontFamilyRef[]', info: 'Candidate typeface families for evaluation' },
    { name: 'structure', detail: 'FontFamilyRef', info: 'Structural / display typeface role pin' },
    { name: 'content', detail: 'FontFamilyRef', info: 'Body / reading content typeface role pin' },
    { name: 'metadata', detail: 'FontFamilyRef', info: 'Dense metadata / caption typeface role pin' },
  ],
  mood: [
    { name: 'preset', detail: 'MoodPreset', info: 'Archetypal stylistic preset' },
    { name: 'knobs', detail: 'MoodKnobs', info: 'Fine-grained styling adjustments (-1.0 to 1.0)', isObject: true },
  ],
  'mood.knobs': [
    { name: 'warmth', detail: 'Float (-1.0..1.0)', info: 'Cooler toward warmer' },
    { name: 'chroma', detail: 'Float (-1.0..1.0)', info: 'Muted toward saturated' },
    { name: 'contrast', detail: 'Float (-1.0..1.0)', info: 'Softer toward punchier' },
    { name: 'density', detail: 'Float (-1.0..1.0)', info: 'Airy toward compact' },
    { name: 'roundness', detail: 'Float (-1.0..1.0)', info: 'Sharper toward rounder' },
    { name: 'typographyExpressiveness', detail: 'Float (-1.0..1.0)', info: 'Restrained toward display-forward' },
    { name: 'motionEnergy', detail: 'Float (-1.0..1.0)', info: 'Quiet toward lively' },
    { name: 'playfulness', detail: 'Float (-1.0..1.0)', info: 'Serious toward playful' },
  ],
  domain: [
    { name: 'domains', detail: 'ProductDomain[]', info: 'Target industry or problem spaces' },
    { name: 'interactions', detail: 'InteractionPattern[]', info: 'Dominant user interaction flows' },
  ],
  control: [
    { name: 'mode', detail: 'ModeControl', info: 'Preferred theme mode and delivery targets', isObject: true },
    { name: 'fonts', detail: 'FontControl', info: 'Font family locks and weight clamps', isObject: true },
    { name: 'constraints', detail: 'ConstraintsControl', info: 'Accessibility and dimension floors', isObject: true },
    { name: 'tokens', detail: 'TokenOverrides', info: 'Explicit token path overrides', isObject: true },
    { name: 'components', detail: 'ComponentOverrides', info: 'Component-specific style patches', isObject: true },
  ],
  'control.mode': [
    { name: 'preferred', detail: 'ThemeMode', info: 'Mode the host application leans toward (Light, Dark)' },
    { name: 'targets', detail: 'ThemeMode[]', info: 'Set of theme modes to deliver in resolved theme' },
  ],
  'control.fonts': [
    { name: 'levelFamilies', detail: 'Map<TypographyPath, FontFamilyRef>', info: 'Font family locks per token path' },
    { name: 'weightClamps', detail: 'Map<TypographyPath, WeightClamp>', info: 'Weight bounds per typography token path' },
    { name: 'features', detail: 'Map<TypographyPath, FeatureSet>', info: 'OpenType feature sets per token path' },
  ],
  'control.constraints': [
    { name: 'minContrast', detail: 'ContrastConstraint', info: 'Minimum contrast ratio floor (e.g. 4.5)', isObject: true },
    { name: 'minTouchTarget', detail: 'TouchTargetConstraint', info: 'Minimum interactive edge length (e.g. 48dp)', isObject: true },
    { name: 'spacing', detail: 'LadderConstraint', info: 'Min/max clamps on the spacing ladder, in dp', isObject: true },
    { name: 'size', detail: 'LadderConstraint', info: 'Min/max clamps on the control-size ladder, in dp', isObject: true },
    { name: 'radius', detail: 'LadderConstraint', info: 'Min/max clamps on the radius ladder, in dp', isObject: true },
    { name: 'motion', detail: 'MotionConstraint', info: 'Reduced-motion preference and duration bias', isObject: true },
    { name: 'typography', detail: 'TypographyConstraint', info: 'Minimum readable size and scale floors', isObject: true },
  ],
  'control.constraints.spacing': [
    { name: 'min', detail: 'Float (dp)', info: 'Minimum spacing ladder clamp' },
    { name: 'max', detail: 'Float (dp)', info: 'Maximum spacing ladder clamp' },
  ],
  'control.constraints.size': [
    { name: 'min', detail: 'Float (dp)', info: 'Minimum control-size ladder clamp' },
    { name: 'max', detail: 'Float (dp)', info: 'Maximum control-size ladder clamp' },
  ],
  'control.constraints.radius': [
    { name: 'min', detail: 'Float (dp)', info: 'Minimum radius ladder clamp' },
    { name: 'max', detail: 'Float (dp)', info: 'Maximum radius ladder clamp' },
  ],
  'control.constraints.minContrast': [
    { name: 'minRatio', detail: 'Float', info: 'Minimum contrast ratio between content and surface' },
  ],
  'control.constraints.minTouchTarget': [
    { name: 'minSize', detail: 'Float (dp)', info: 'Minimum touch target size (e.g. 48.0)' },
  ],
  'control.constraints.motion': [
    { name: 'preferReducedMotion', detail: 'boolean', info: 'When true, suppresses spring and energetic curves' },
    { name: 'maxDurationBias', detail: 'Float', info: 'Duration bias scaling factor' },
  ],
  'control.tokens': [
    { name: 'paths', detail: 'Record<string, any>', info: 'Token path override map' },
  ],
};

const SCHEMA_VALUES: Record<string, ValueDescriptor[]> = {
  preset: [
    { value: 'Neutral', detail: 'MoodPreset', info: 'Balanced defaults with no stylistic lean' },
    { value: 'Calm', detail: 'MoodPreset', info: 'Low energy, soft contrast, and quiet motion' },
    { value: 'Professional', detail: 'MoodPreset', info: 'Restrained, trustworthy, and information-first' },
    { value: 'Bold', detail: 'MoodPreset', info: 'High chroma, punchy contrast, and forward typography' },
    { value: 'Playful', detail: 'MoodPreset', info: 'Rounded, lively, and playful' },
    { value: 'Minimal', detail: 'MoodPreset', info: 'Reduced palette, generous space, and minimal ornament' },
    { value: 'Expressive', detail: 'MoodPreset', info: 'Display-forward typography with expressive color' },
  ],
  presence: [
    { value: 'Subtle', detail: 'BrandPresence', info: 'Brand reaches selection, focus, and gradients only' },
    { value: 'Balanced', detail: 'BrandPresence', info: 'Subtle surfaces plus brand-filled primary CTA' },
    { value: 'Strong', detail: 'BrandPresence', info: 'Balanced plus elevated tint and stronger borders' },
    { value: 'Dominant', detail: 'BrandPresence', info: 'Balanced plus mild tint on default surface as well' },
  ],
  domains: [
    { value: 'Finance', detail: 'ProductDomain', info: 'Banking, investing, and money management' },
    { value: 'Health', detail: 'ProductDomain', info: 'Wellness, clinical, and care products' },
    { value: 'Social', detail: 'ProductDomain', info: 'Community, messaging, and identity-driven products' },
    { value: 'Productivity', detail: 'ProductDomain', info: 'Tools, trackers, and work-focused products' },
    { value: 'Commerce', detail: 'ProductDomain', info: 'Stores, marketplaces, and purchasing flows' },
    { value: 'Media', detail: 'ProductDomain', info: 'Streaming, news, and entertainment products' },
    { value: 'Education', detail: 'ProductDomain', info: 'Learning, courses, and reference products' },
    { value: 'Travel', detail: 'ProductDomain', info: 'Booking, planning, and trip products' },
    { value: 'Utilities', detail: 'ProductDomain', info: 'Device, utility, and system-facing products' },
    { value: 'Other', detail: 'ProductDomain', info: 'Anything outside the named domains' },
  ],
  interactions: [
    { value: 'DataNavigation', detail: 'InteractionPattern', info: 'Tables, charts, and dense record browsing' },
    { value: 'FormsEntry', detail: 'InteractionPattern', info: 'Long and multi-field input flows' },
    { value: 'ChatMessaging', detail: 'InteractionPattern', info: 'Conversational, message-heavy surfaces' },
    { value: 'ContentFeed', detail: 'InteractionPattern', info: 'Scroll-first streams of mixed content' },
    { value: 'ContentReading', detail: 'InteractionPattern', info: 'Focused long-form reading' },
    { value: 'SearchDiscovery', detail: 'InteractionPattern', info: 'Query-first finding and exploration' },
    { value: 'MediaBrowse', detail: 'InteractionPattern', info: 'Visual grids of media items' },
    { value: 'DashboardMonitoring', detail: 'InteractionPattern', info: 'Live metrics and operational monitoring' },
    { value: 'CheckoutCommerce', detail: 'InteractionPattern', info: 'Cart, payment, and purchase completion' },
    { value: 'AuthOnboarding', detail: 'InteractionPattern', info: 'Sign-in, sign-up, and first-run experiences' },
    { value: 'SettingsAdmin', detail: 'InteractionPattern', info: 'Configuration-heavy preference surfaces' },
  ],
  preferred: [
    { value: 'Light', detail: 'ThemeMode', info: 'Leans toward light theme mode' },
    { value: 'Dark', detail: 'ThemeMode', info: 'Leans toward dark theme mode' },
  ],
  targets: [
    { value: 'Light', detail: 'ThemeMode', info: 'Delivers light theme mode in resolved pair' },
    { value: 'Dark', detail: 'ThemeMode', info: 'Delivers dark theme mode in resolved pair' },
  ],
  deriveColors: [
    { value: 'true', detail: 'boolean', info: 'Synthesize colors from mood, brand, and domain signals' },
    { value: 'false', detail: 'boolean', info: 'Preserve raw brand hex without synthesis' },
  ],
  preferReducedMotion: [
    { value: 'true', detail: 'boolean', info: 'Suppress spring animations and shorten transitions' },
    { value: 'false', detail: 'boolean', info: 'Allow full motion energy' },
  ],
  type: [
    { value: 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex', detail: 'ColorSpec', info: 'Fully-qualified Hex ColorSpec type' },
    { value: 'Hex', detail: 'ColorSpec', info: 'Standard Hex color intake spec' },
  ],
};

/**
 * Autocompletion source for JSON CodeMirror editor.
 */
export function jsonCompletionSource(context: CompletionContext): CompletionResult | null {
  const word = context.matchBefore(/[a-zA-Z0-9_.-]*/);
  if (!word || (word.from === word.to && !context.explicit)) return null;

  const doc = context.state.doc.toString();
  const from = word.from;
  const to = context.pos;

  const charBefore = from > 0 ? doc.charAt(from - 1) : '';
  const charAfter = to < doc.length ? doc.charAt(to) : '';
  const insideQuotes = charBefore === '"';

  // Walk AST to resolve JSON hierarchy path
  const tree = syntaxTree(context.state);
  let node = tree.resolveInner(context.pos, -1);
  const path: string[] = [];

  let curr: typeof node | null = node;
  while (curr && curr.name !== 'JsonText') {
    if (curr.name === 'Property') {
      const colon = curr.getChild(':');
      const nameNode = curr.getChild('PropertyName');
      const propName = nameNode ? doc.slice(nameNode.from, nameNode.to).replace(/^"|"$/g, '') : null;

      if (colon && context.pos > colon.to) {
        if (propName) path.unshift(propName);
      }
    }
    curr = curr.parent;
  }

  const options: Completion[] = [];
  const lastKey = path.length > 0 ? path[path.length - 1] : null;

  // 1. Check if the current path expects enum or value suggestions
  if (lastKey && SCHEMA_VALUES[lastKey]) {
    const valueDefs = SCHEMA_VALUES[lastKey];
    for (const def of valueDefs) {
      let apply = def.value;
      if (def.value !== 'true' && def.value !== 'false') {
        if (!insideQuotes) {
          apply = `"${def.value}"`;
        } else if (charAfter !== '"') {
          apply = `${def.value}"`;
        }
      }

      options.push({
        label: def.value,
        detail: def.detail,
        info: def.info,
        type: def.value === 'true' || def.value === 'false' ? 'keyword' : 'enum',
        apply,
        boost: 2,
      });
    }
  }

  // 2. Check property key suggestions based on current hierarchy
  const pathKey = path.length === 0 ? 'root' : path.join('.');
  const propDefs = SCHEMA_PROPERTIES[pathKey] || (path.length > 0 ? SCHEMA_PROPERTIES[path[path.length - 1]] : undefined);

  if (propDefs) {
    for (const prop of propDefs) {
      let apply = prop.name;
      if (insideQuotes) {
        apply = charAfter === '"' ? prop.name : `${prop.name}"`;
      } else {
        apply = prop.isObject ? `"${prop.name}": {\n  \n}` : `"${prop.name}": `;
      }

      options.push({
        label: prop.name,
        detail: prop.detail,
        info: prop.info,
        type: 'property',
        apply,
        boost: 1,
      });
    }
  }

  // 3. Fallback: If no direct match or user is typing globally, provide all top-level / well-known keys
  if (options.length === 0) {
    for (const prop of SCHEMA_PROPERTIES.root) {
      const apply = insideQuotes ? (charAfter === '"' ? prop.name : `${prop.name}"`) : `"${prop.name}": {\n  \n}`;
      options.push({
        label: prop.name,
        detail: prop.detail,
        info: prop.info,
        type: 'property',
        apply,
        boost: 0,
      });
    }
  }

  return {
    from,
    options,
  };
}
