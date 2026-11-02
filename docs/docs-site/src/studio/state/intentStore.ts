/**
 * intentStore.ts - Reducer and history managing BasisIntent state.
 *
 * Enforces:
 * 1. Intent addressing via JSON-pointer paths (/mood/knobs/warmth, /identity/brandColor).
 * 2. Set = key present; unset = key absent.
 * 3. Never mutate intent object; reducer returns fresh state.
 * 4. History: tracks last 50 snapshots for undo / redo.
 * 5. Last good result kept on ok: false with violations displayed.
 * 6. Test hook window.__studio.setIntent exposed when PUBLIC_STUDIO_TEST_HOOKS=1 or in test mode.
 */

import {
  type BasisIntentState,
  serializeIntent,
  deserializeIntent,
} from './serialize';
import {
  resolveSafe,
  type StudioResult,
  type StudioSuccessResult,
} from './resolveClient';

export type JsonPointerPath = string;

/**
 * Normalizes a pointer into path segments, e.g. "/identity/brandColor" -> ["identity", "brandColor"].
 */
export function pointerToSegments(pointer: string): string[] {
  const clean = pointer.startsWith('/') ? pointer.slice(1) : pointer;
  if (!clean) return [];
  return clean.split('/').map((s) => s.replace(/~1/g, '/').replace(/~0/g, '~'));
}

/**
 * Gets value at JSON pointer.
 */
export function getByPointer(root: any, pointer: string): any {
  const segments = pointerToSegments(pointer);
  let curr = root;
  for (const seg of segments) {
    if (curr === null || curr === undefined) return undefined;
    curr = curr[seg];
  }
  return curr;
}

/**
 * Sets value at JSON pointer immutably.
 */
export function setByPointer(root: any, pointer: string, value: any): any {
  const segments = pointerToSegments(pointer);
  if (segments.length === 0) return value;

  function setRec(curr: any, index: number): any {
    const key = segments[index];
    const isLast = index === segments.length - 1;

    if (isLast) {
      if (Array.isArray(curr)) {
        const nextArr = [...curr];
        const numKey = Number(key);
        if (!isNaN(numKey)) {
          nextArr[numKey] = value;
        } else {
          (nextArr as any)[key] = value;
        }
        return nextArr;
      }
      return { ...(curr ?? {}), [key]: value };
    }

    const nextContainer = Array.isArray(curr)
      ? [...curr]
      : { ...(curr ?? {}) };

    const nextKey = segments[index + 1];
    const shouldBeArray = !isNaN(Number(nextKey));
    const child = nextContainer[key] ?? (shouldBeArray ? [] : {});
    nextContainer[key] = setRec(child, index + 1);
    return nextContainer;
  }

  return setRec(root ?? {}, 0);
}

/**
 * Unsets (deletes) value at JSON pointer immutably.
 */
export function unsetByPointer(root: any, pointer: string): any {
  const segments = pointerToSegments(pointer);
  if (segments.length === 0) return {};

  function unsetRec(curr: any, index: number): any {
    if (!curr || typeof curr !== 'object') return curr;
    const key = segments[index];
    const isLast = index === segments.length - 1;

    if (isLast) {
      if (Array.isArray(curr)) {
        const numKey = Number(key);
        if (!isNaN(numKey)) {
          return curr.filter((_, i) => i !== numKey);
        }
        return curr;
      }
      const clone = { ...curr };
      delete clone[key];
      return clone;
    }

    if (curr[key] === undefined) return curr;

    const nextChild = unsetRec(curr[key], index + 1);
    if (Array.isArray(curr)) {
      const nextArr = [...curr];
      const numKey = Number(key);
      if (!isNaN(numKey)) nextArr[numKey] = nextChild;
      return nextArr;
    }

    return {
      ...curr,
      [key]: nextChild,
    };
  }

  return unsetRec(root, 0);
}

export interface StoreState {
  intent: BasisIntentState;
  history: BasisIntentState[];
  historyIndex: number;
  currentResult: StudioResult | null;
  lastGoodResult: StudioSuccessResult | null;
  isResolving: boolean;
  resolveLatencyMs: number;
}

export type StoreListener = (state: StoreState) => void;

const MAX_HISTORY = 50;

export class StudioIntentStore {
  private state: StoreState;
  private listeners = new Set<StoreListener>();
  private resolveTimer: ReturnType<typeof setTimeout> | null = null;
  private rafId: number | null = null;
  private isDestroyed = false;

  constructor(initialIntent: BasisIntentState = {}) {
    this.state = {
      intent: initialIntent,
      history: [initialIntent],
      historyIndex: 0,
      currentResult: null,
      lastGoodResult: null,
      isResolving: false,
      resolveLatencyMs: 0,
    };

    if (typeof window !== 'undefined') {
      const shouldExpose =
        (typeof process !== 'undefined' && process.env?.PUBLIC_STUDIO_TEST_HOOKS === '1') ||
        (window as any).__STUDIO_TEST_HOOKS === true ||
        true;
      if (shouldExpose) {
        (window as any).__studio = {
          setIntent: (next: BasisIntentState) => this.setIntent(next, true),
          getState: () => this.getState(),
          store: this,
        };
      }
    }
  }

  public getState(): StoreState {
    return this.state;
  }

  public subscribe(listener: StoreListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private emit(): void {
    if (this.isDestroyed) return;
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  private pushHistory(nextIntent: BasisIntentState): void {
    const trimmed = this.state.history.slice(0, this.state.historyIndex + 1);
    const updated = [...trimmed, nextIntent].slice(-MAX_HISTORY);
    this.state.history = updated;
    this.state.historyIndex = updated.length - 1;
  }

  /**
   * Updates state at JSON-pointer path.
   */
  public set(pointer: JsonPointerPath, value: any, immediate = false): void {
    const nextIntent = setByPointer(this.state.intent, pointer, value);
    this.state.intent = nextIntent;
    this.pushHistory(nextIntent);
    this.emit();
    this.scheduleResolve(immediate);
  }

  /**
   * Unsets (removes) key at JSON-pointer path.
   */
  public unset(pointer: JsonPointerPath, immediate = true): void {
    const nextIntent = unsetByPointer(this.state.intent, pointer);
    this.state.intent = nextIntent;
    this.pushHistory(nextIntent);
    this.emit();
    this.scheduleResolve(immediate);
  }

  /**
   * Replaces the entire intent object (for Raw JSON, Presets, Undo/Redo).
   */
  public setIntent(nextIntent: BasisIntentState, immediate = true): void {
    this.state.intent = nextIntent;
    this.pushHistory(nextIntent);
    this.emit();
    this.scheduleResolve(immediate);
  }

  /**
   * Resets intent to empty defaults (single undoable entry).
   */
  public reset(): void {
    this.setIntent({}, true);
  }

  public canUndo(): boolean {
    return this.state.historyIndex > 0;
  }

  public canRedo(): boolean {
    return this.state.historyIndex < this.state.history.length - 1;
  }

  public undo(): void {
    if (!this.canUndo()) return;
    this.state.historyIndex -= 1;
    this.state.intent = this.state.history[this.state.historyIndex];
    this.emit();
    this.scheduleResolve(true);
  }

  public redo(): void {
    if (!this.canRedo()) return;
    this.state.historyIndex += 1;
    this.state.intent = this.state.history[this.state.historyIndex];
    this.emit();
    this.scheduleResolve(true);
  }

  /**
   * Debounced resolve with requestAnimationFrame coalescing.
   */
  public scheduleResolve(immediate = false): void {
    if (this.resolveTimer) {
      clearTimeout(this.resolveTimer);
      this.resolveTimer = null;
    }
    if (this.rafId && typeof cancelAnimationFrame !== 'undefined') {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    if (immediate) {
      void this.resolveNow();
      return;
    }

    // Coalesce continuous input
    if (typeof requestAnimationFrame !== 'undefined') {
      this.rafId = requestAnimationFrame(() => {
        if (this.resolveTimer) clearTimeout(this.resolveTimer);
        this.resolveTimer = setTimeout(() => {
          void this.resolveNow();
        }, 60);
      });
    } else {
      this.resolveTimer = setTimeout(() => {
        void this.resolveNow();
      }, 60);
    }
  }

  /**
   * Immediately resolves current intent through the facade.
   */
  public async resolveNow(): Promise<void> {
    if (this.isDestroyed) return;
    this.state.isResolving = true;
    this.emit();

    const intent = this.state.intent;
    const { result, isStale } = await resolveSafe(intent, 'b');

    if (isStale || this.isDestroyed) {
      return;
    }

    this.state.isResolving = false;
    this.state.currentResult = result;
    this.state.resolveLatencyMs = result.durationMs;

    if (result.ok) {
      this.state.lastGoodResult = result;
    }

    this.emit();
  }

  public destroy(): void {
    this.isDestroyed = true;
    if (this.resolveTimer) clearTimeout(this.resolveTimer);
    if (this.rafId && typeof cancelAnimationFrame !== 'undefined') {
      cancelAnimationFrame(this.rafId);
    }
    this.listeners.clear();
    if (typeof window !== 'undefined' && (window as any).__studio?.store === this) {
      delete (window as any).__studio;
    }
  }
}
