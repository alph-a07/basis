/**
 * serialize.ts - Intent <-> facade JSON interchange codec.
 *
 * Enforces:
 * 1. Thin codec with no reshaping: intent directly maps to Kotlin interchange JSON.
 * 2. Unset fields are omitted (key absent).
 * 3. Deep round-trip fidelity between JS state and serialized interchange.
 */

export interface ColorSpecInput {
  type: string;
  value?: string;
  argb?: number;
  h?: number;
  s?: number;
  l?: number;
  a?: number;
}

export interface FontFamilyRefInput {
  type: string;
  id?: string;
  key?: string;
}

export interface BasisIntentState {
  identity?: {
    brandColor?: ColorSpecInput;
    supportingColors?: ColorSpecInput[];
    presence?: string;
    typography?: {
      candidates?: FontFamilyRefInput[];
      structure?: FontFamilyRefInput;
      content?: FontFamilyRefInput;
      metadata?: FontFamilyRefInput;
    };
    deriveColors?: boolean;
  };
  mood?: {
    preset?: string;
    knobs?: Record<string, number>;
  };
  domain?: {
    domains?: string[];
    interactions?: string[];
  };
  control?: {
    mode?: {
      preferred?: string;
      targets?: string[];
    };
    fonts?: {
      levelFamilies?: Record<string, FontFamilyRefInput>;
      weightClamps?: Record<string, { min?: number; max?: number }>;
      features?: Record<string, { features: string[] }>;
    };
    constraints?: {
      minContrast?: { minRatio: number };
      minTouchTarget?: { minSize: number };
      spacing?: { min?: number; max?: number };
      size?: { min?: number; max?: number };
      radius?: { min?: number; max?: number };
      motion?: { preferReducedMotion?: boolean; maxDurationBias?: number };
      typography?: { minReadableSize?: number; scaleFloor?: number };
    };
    tokens?: {
      paths?: Record<string, any>;
    };
    components?: {
      byComponent?: Record<string, any>;
    };
  };
}

/**
 * Recursively cleans object tree by omitting undefined or null values.
 */
function sanitizeForJson(obj: any): any {
  if (obj === undefined || obj === null) return undefined;
  if (typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) {
    return obj.map(sanitizeForJson).filter((v) => v !== undefined);
  }
  const clean: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null) {
      const sanitized = sanitizeForJson(value);
      if (sanitized !== undefined) {
        clean[key] = sanitized;
      }
    }
  }
  return clean;
}

/**
 * Serializes intent state into canonical JSON string accepted by docs-runtime.
 */
export function serializeIntent(intent: BasisIntentState): string {
  const sanitized = sanitizeForJson(intent ?? {});
  return JSON.stringify(sanitized);
}

/**
 * Deserializes JSON string into BasisIntentState.
 */
export function deserializeIntent(json: string): BasisIntentState {
  if (!json || json.trim() === '' || json.trim() === '{}') {
    return {};
  }
  return JSON.parse(json) as BasisIntentState;
}
