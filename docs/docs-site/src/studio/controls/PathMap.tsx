import React, { useState } from 'react';

interface PathMapProps {
  label: string;
  summary: string;
  paths?: Record<string, any>;
  onChange: (paths: Record<string, any>) => void;
  disabled?: boolean;
}

const COMMON_SUGGESTIONS = [
  'spacing.level1',
  'spacing.level2',
  'spacing.level3',
  'spacing.level4',
  'spacing.level5',
  'radius.level1',
  'radius.level2',
  'radius.level3',
  'radius.level4',
  'radius.full',
  'size.control.level1',
  'size.control.level2',
  'size.control.level3',
  'color.surface.default',
  'color.brand.primary',
];

export const PathMap: React.FC<PathMapProps> = ({
  label,
  summary,
  paths = {},
  onChange,
  disabled = false,
}) => {
  const currentEntries = Object.entries(paths || {});
  const [newPath, setNewPath] = useState('');
  const [newValue, setNewValue] = useState('');

  const addOverride = () => {
    if (!newPath) return;
    const num = parseFloat(newValue);
    const valueObj = !isNaN(num)
      ? {
          type: 'io.github.alph_a07.basis.theme.intent.controls.overrides.OverrideValue.Dp',
          value: num,
        }
      : {
          type: 'io.github.alph_a07.basis.theme.intent.controls.overrides.OverrideValue.Dp',
          value: 16.0,
        };

    const next = { ...paths, [newPath]: valueObj };
    onChange(next);
    setNewPath('');
    setNewValue('');
  };

  const removeOverride = (key: string) => {
    const next = { ...paths };
    delete next[key];
    onChange(next);
  };

  return (
    <div className={`studio-control-field path-map-control ${disabled ? 'is-disabled' : ''}`}>
      <div className="control-header">
        <label className="control-label" title={summary}>
          {label} ({currentEntries.length})
        </label>
        {currentEntries.length > 0 && (
          <button
            type="button"
            className="control-reset-btn"
            onClick={() => onChange({})}
            aria-label="Clear all token overrides"
            disabled={disabled}
          >
            Clear
          </button>
        )}
      </div>

      <div className="path-map-rows">
        {currentEntries.map(([k, val]) => {
          const displayVal = val?.value !== undefined ? String(val.value) : JSON.stringify(val);
          return (
            <div key={k} className="path-map-row">
              <span className="path-key-tag" title={k}>
                {k}
              </span>
              <span className="path-value-tag">{displayVal}</span>
              <button
                type="button"
                className="path-delete-btn"
                onClick={() => removeOverride(k)}
                aria-label={`Remove override for ${k}`}
                disabled={disabled}
              >
                &times;
              </button>
            </div>
          );
        })}

        <div className="path-map-add-box">
          <input
            type="text"
            list="token-path-suggestions"
            placeholder="e.g. spacing.level4"
            className="path-input-key"
            value={newPath}
            disabled={disabled}
            onChange={(e) => setNewPath(e.target.value)}
          />
          <datalist id="token-path-suggestions">
            {COMMON_SUGGESTIONS.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>

          <input
            type="number"
            placeholder="dp (e.g. 24)"
            className="path-input-val"
            value={newValue}
            disabled={disabled}
            onChange={(e) => setNewValue(e.target.value)}
          />

          <button
            type="button"
            className="path-add-btn"
            disabled={disabled || !newPath}
            onClick={addOverride}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
