import React from 'react';
import type { ColorSpecInput } from '../state/serialize';

interface ColorListProps {
  label: string;
  summary: string;
  values?: ColorSpecInput[] | null;
  value?: ColorSpecInput[] | null;
  onChange: (values: ColorSpecInput[]) => void;
  max?: number;
  maxCount?: number;
  disabled?: boolean;
}

const COLOR_SPEC_HEX_DISCRIMINATOR = 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex';

export const ColorList: React.FC<ColorListProps> = ({
  label,
  summary,
  values: propValues,
  value: propValue,
  onChange,
  max: propMax,
  maxCount: propMaxCount,
  disabled = false,
}) => {
  const rawList = propValues || propValue || [];
  const list = Array.isArray(rawList) ? rawList : [];
  const max = propMax ?? propMaxCount ?? 3;
  const isFull = list.length >= max;

  const addColor = (hex: string = '#388E3C') => {
    if (isFull) return;
    const next = [...list, { type: COLOR_SPEC_HEX_DISCRIMINATOR, value: hex }];
    onChange(next);
  };

  const updateColor = (index: number, hex: string) => {
    const next = [...list];
    next[index] = { type: COLOR_SPEC_HEX_DISCRIMINATOR, value: hex };
    onChange(next);
  };

  const removeColor = (index: number) => {
    const next = list.filter((_, i) => i !== index);
    onChange(next);
  };

  return (
    <div className={`studio-control-field color-list-control ${disabled ? 'is-disabled' : ''}`}>
      <div className="control-header">
        <label className="control-label" title={summary}>
          {label} ({list.length}/{max})
        </label>
        {list.length > 0 && (
          <button
            type="button"
            className="control-reset-btn"
            onClick={() => onChange([])}
            aria-label={`Clear all ${label}`}
            disabled={disabled}
          >
            Clear
          </button>
        )}
      </div>

      <div className="color-list-items">
        {list.map((c, i) => {
          const hex = c.value || '#000000';
          return (
            <div key={i} className="color-list-row">
              <div className="color-swatch-box" style={{ backgroundColor: hex }}>
                <input
                  type="color"
                  value={hex.length === 7 ? hex : '#0F52BA'}
                  disabled={disabled}
                  aria-label={`Supporting color ${i + 1} native picker`}
                  className="native-color-picker"
                  onChange={(e) => updateColor(i, e.target.value.toUpperCase())}
                />
              </div>
              <input
                type="text"
                className="hex-text-input"
                value={hex.replace('#', '')}
                maxLength={8}
                disabled={disabled}
                aria-label={`Supporting color ${i + 1} hex`}
                onChange={(e) => {
                  const raw = e.target.value.replace('#', '');
                  updateColor(i, `#${raw}`);
                }}
              />
              <button
                type="button"
                className="color-remove-btn"
                onClick={() => removeColor(i)}
                aria-label={`Remove supporting color ${i + 1}`}
                disabled={disabled}
              >
                &times;
              </button>
            </div>
          );
        })}

        <button
          type="button"
          className="color-add-btn"
          disabled={disabled || isFull}
          onClick={() => addColor()}
        >
          {isFull ? `Max ${max} colors reached` : '+ Add Supporting Color'}
        </button>
      </div>
    </div>
  );
};
