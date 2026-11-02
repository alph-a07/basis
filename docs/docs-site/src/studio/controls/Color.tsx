import React, { useState, useEffect } from 'react';
import type { ColorSpecInput } from '../state/serialize';

interface ColorProps {
  id?: string;
  label: string;
  summary: string;
  value: ColorSpecInput | null | undefined;
  onChange: (value: ColorSpecInput | null) => void;
  disabled?: boolean;
}

const COLOR_SPEC_HEX_DISCRIMINATOR = 'io.github.alph_a07.basis.theme.core.color.ColorSpec.Hex';

export const Color: React.FC<ColorProps> = ({
  id = 'color',
  label,
  summary,
  value,
  onChange,
  disabled = false,
}) => {
  const currentHex = value?.value || '';
  const [inputText, setInputText] = useState(currentHex.replace('#', ''));

  useEffect(() => {
    setInputText((value?.value || '').replace('#', ''));
  }, [value?.value]);

  const commitHex = (hexStr: string) => {
    const clean = hexStr.trim().replace('#', '');
    if (!clean) {
      onChange(null);
      return;
    }
    const formatted = `#${clean}`;
    onChange({
      type: COLOR_SPEC_HEX_DISCRIMINATOR,
      value: formatted,
    });
  };

  return (
    <div className={`studio-control-field color-field ${disabled ? 'is-disabled' : ''}`}>
      <div className="control-header">
        <label htmlFor={`color-${id}`} className="control-label" title={summary}>
          {label}
        </label>
        {currentHex && (
          <button
            type="button"
            className="control-reset-btn"
            onClick={() => onChange(null)}
            aria-label={`Clear ${label}`}
            disabled={disabled}
          >
            Clear
          </button>
        )}
      </div>

      <div className="color-input-cluster">
        <div className="color-swatch-box" style={{ backgroundColor: currentHex || 'transparent' }}>
          <input
            type="color"
            id={`color-${id}-native`}
            value={currentHex.length === 7 ? currentHex : '#0F52BA'}
            disabled={disabled}
            aria-label={`${label} native picker`}
            className="native-color-picker"
            onChange={(e) => {
              const hex = e.target.value.toUpperCase();
              setInputText(hex.replace('#', ''));
              commitHex(hex);
            }}
          />
        </div>
        <div className="hex-input-wrap">
          <span className="hex-prefix" aria-hidden="true">
            #
          </span>
          <input
            id={`color-${id}`}
            type="text"
            className="hex-text-input"
            placeholder="0F52BA"
            maxLength={8}
            value={inputText}
            disabled={disabled}
            onChange={(e) => setInputText(e.target.value)}
            onBlur={() => commitHex(inputText)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                commitHex(inputText);
                e.currentTarget.blur();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
