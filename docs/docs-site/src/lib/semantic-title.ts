/**
 * Computes the human-facing semantic title for a component or modifier.
 * Strips technical engine prefixes ('Basis' for components, 'basis' for modifiers)
 * and formats camelCase modifiers into naturally readable title-case words.
 *
 * Examples:
 * - 'BasisCard' -> 'Card'
 * - 'BasisButton' -> 'Button'
 * - 'basisBorder' -> 'Border'
 * - 'basisFocusRing' -> 'Focus Ring'
 * - 'basisMinTouchTarget' -> 'Min Touch Target'
 * - 'basisClearAndSetSemantics' -> 'Clear and Set Semantics'
 */
export function getSemanticTitle(item: { id?: string; name: string; kind?: string } | string): string {
  const name = typeof item === 'string' ? item : item.name;

  if (name.startsWith('Basis')) {
    return name.replace(/^Basis/, '');
  }

  if (name.startsWith('basis')) {
    const raw = name.replace(/^basis/, '');
    const spaced = raw.replace(/([A-Z])/g, ' $1').trim();
    return spaced.replace(/\bAnd\b/g, 'and');
  }

  return name;
}
