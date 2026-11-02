/**
 * tokenDiff.ts - Computes structured token differences between two resolved theme states.
 */

export interface TokenDifference {
  path: string;
  prev: string;
  next: string;
}

export interface TokenDiffResult {
  added: string[];
  removed: string[];
  changed: TokenDifference[];
  totalChanged: number;
}

/**
 * Compares two token dictionaries (e.g., light or dark mode maps) and computes the diff.
 */
export function diffTokens(
  prevTokens: Record<string, string> | null | undefined,
  nextTokens: Record<string, string> | null | undefined,
): TokenDiffResult {
  const prev = prevTokens ?? {};
  const next = nextTokens ?? {};

  const prevKeys = new Set(Object.keys(prev));
  const nextKeys = new Set(Object.keys(next));

  const added: string[] = [];
  const removed: string[] = [];
  const changed: TokenDifference[] = [];

  for (const key of nextKeys) {
    if (!prevKeys.has(key)) {
      added.push(key);
    } else if (prev[key] !== next[key]) {
      changed.push({
        path: key,
        prev: prev[key],
        next: next[key],
      });
    }
  }

  for (const key of prevKeys) {
    if (!nextKeys.has(key)) {
      removed.push(key);
    }
  }

  // Sort deterministically
  added.sort();
  removed.sort();
  changed.sort((a, b) => a.path.localeCompare(b.path));

  return {
    added,
    removed,
    changed,
    totalChanged: added.length + removed.length + changed.length,
  };
}
