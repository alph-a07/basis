/**
 * controls.ts - Control specification types derived from Basis Intent metadata.
 *
 * Models the six core interaction controls:
 * 1. Single choice (e.g. presence, presets)
 * 2. Multi choice (e.g. domains, interactions)
 * 3. Tri-state knob (e.g. warmth, contrast, with explicit unset / inherit preset state)
 * 4. Color (e.g. brandColor)
 * 5. Color list with max (e.g. supportingColors, max 3)
 * 6. Toggle (e.g. deriveColors)
 * Plus font typography candidate selection.
 */

import type { CuratedFont } from '../config/studio-ui';

export interface ChoiceOption {
  id: string;
  label: string;
  summary: string;
}

export interface SingleChoiceControlSpec {
  type: 'single-choice';
  id: string;
  label: string;
  summary?: string;
  path: string;
  options: ChoiceOption[];
  defaultValue?: string | null;
  allowEmpty?: boolean;
}

export interface MultiChoiceControlSpec {
  type: 'multi-choice';
  id: string;
  label: string;
  summary?: string;
  path: string;
  options: ChoiceOption[];
  defaultValues?: string[];
}

export interface KnobControlSpec {
  type: 'knob';
  id: string;
  label: string;
  summary: string;
  path: string;
  negativeLabel: string;
  positiveLabel: string;
  min: number;
  max: number;
  step: number;
  /** Null represents the explicit 'unset (inherit preset)' state. */
  defaultValue: number | null;
}

export interface ColorControlSpec {
  type: 'color';
  id: string;
  label: string;
  summary?: string;
  path: string;
  defaultValue?: string | null;
  placeholder?: string;
}

export interface ColorListControlSpec {
  type: 'color-list';
  id: string;
  label: string;
  summary?: string;
  path: string;
  maxItems: number;
  defaultValues?: string[];
}

export interface ToggleControlSpec {
  type: 'toggle';
  id: string;
  label: string;
  summary?: string;
  path: string;
  defaultValue: boolean;
}

export interface FontControlSpec {
  type: 'font';
  id: string;
  label: string;
  summary?: string;
  path: string;
  options: CuratedFont[];
  defaultValue?: string | null;
}

export type ControlSpec =
  | SingleChoiceControlSpec
  | MultiChoiceControlSpec
  | KnobControlSpec
  | ColorControlSpec
  | ColorListControlSpec
  | ToggleControlSpec
  | FontControlSpec;

export interface StudioControlSpecs {
  identity: {
    brandColor: ColorControlSpec;
    supportingColors: ColorListControlSpec;
    presence: SingleChoiceControlSpec;
    deriveColors: ToggleControlSpec;
    typography: FontControlSpec;
  };
  mood: {
    preset: SingleChoiceControlSpec;
    knobs: KnobControlSpec[];
  };
  domain: {
    domains: MultiChoiceControlSpec;
    interactions: MultiChoiceControlSpec;
  };
  control: {
    tokensReadOnly: { id: string; label: string; summary: string };
    componentsReadOnly: { id: string; label: string; summary: string };
  };
}
