import React from 'react';

interface KnobProps {
  id?: string;
  name?: string;
  label: string;
  summary: string;
  negativeLabel?: string;
  positiveLabel?: string;
  min?: number;
  max?: number;
  step?: number;
  value: number | null | undefined;
  effectiveValue?: number | string | null;
  onChange: (value: number | null, immediate?: boolean) => void;
  onReset?: () => void;
}

export const Knob: React.FC<KnobProps> = ({
  id: propId,
  name: propName,
  label,
  summary,
  negativeLabel = 'Low',
  positiveLabel = 'High',
  min = -1.0,
  max = 1.0,
  step = 0.05,
  value,
  effectiveValue,
  onChange,
  onReset,
}) => {
  const id = propId || propName || 'knob';
  const isInherited = value === null || value === undefined;
  const currentNum = isInherited ? 0.0 : Number(value);

  const formatDisplay = (num: number) => {
    return num >= 0 ? `+${num.toFixed(2)}` : num.toFixed(2);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Home') {
      onChange(min, true);
      e.preventDefault();
    } else if (e.key === 'End') {
      onChange(max, true);
      e.preventDefault();
    } else if (e.key === 'PageUp') {
      const next = Math.min(max, currentNum + step * 4);
      onChange(parseFloat(next.toFixed(2)), false);
      e.preventDefault();
    } else if (e.key === 'PageDown') {
      const next = Math.max(min, currentNum - step * 4);
      onChange(parseFloat(next.toFixed(2)), false);
      e.preventDefault();
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      onChange(null, true);
      e.preventDefault();
    }
  };

  return (
    <div className={`studio-control-field knob-control ${isInherited ? 'is-inherited' : ''}`}>
      <div className="control-header">
        <label htmlFor={`knob-${id}`} className="control-label" title={summary}>
          {label}
        </label>
        <div className="knob-header-actions">
          <span className="knob-readout" aria-live="polite">
            {isInherited ? (
              <span className="readout-inherited">Inherit from preset</span>
            ) : (
              <span className="readout-value">
                {formatDisplay(currentNum)}
                {effectiveValue !== undefined && effectiveValue !== null && String(effectiveValue) !== formatDisplay(currentNum) && (
                  <span className="readout-effective" title="Clamped / normalized effective value">
                    (eff: {String(effectiveValue)})
                  </span>
                )}
              </span>
            )}
          </span>
          <button
            type="button"
            className={`knob-inherit-btn ${isInherited ? 'is-active' : ''}`}
            onClick={() => {
              if (isInherited) {
                onChange(0.0, true);
              } else if (onReset) {
                onReset();
              } else {
                onChange(null, true);
              }
            }}
            title={isInherited ? 'Set explicit value' : 'Inherit from preset'}
            aria-pressed={isInherited}
          >
            {isInherited ? 'Set' : 'Inherit'}
          </button>
        </div>
      </div>

      <div className="knob-slider-track-wrap">
        <input
          id={`knob-${id}`}
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentNum}
          disabled={false}
          className="knob-slider-input"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentNum}
          aria-valuetext={isInherited ? 'Inherit from preset' : formatDisplay(currentNum)}
          onChange={(e) => {
            const nextVal = parseFloat(e.target.value);
            onChange(nextVal, false);
          }}
          onKeyDown={handleKeyDown}
        />
        <div className="knob-end-labels" aria-hidden="true">
          <span className="end-label negative-label">{negativeLabel}</span>
          <span className="end-label zero-label">0</span>
          <span className="end-label positive-label">{positiveLabel}</span>
        </div>
      </div>
    </div>
  );
};
