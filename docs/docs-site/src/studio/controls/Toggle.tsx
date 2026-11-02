import React from 'react';

interface ToggleProps {
  id: string;
  label: string;
  summary: string;
  checked: boolean;
  defaultChecked?: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({
  id,
  label,
  summary,
  checked,
  defaultChecked = true,
  onChange,
  disabled = false,
}) => {
  const isNonDefault = checked !== defaultChecked;

  return (
    <div className={`studio-control-field toggle-control ${disabled ? 'is-disabled' : ''}`}>
      <div className="toggle-row">
        <div className="toggle-text-block">
          <label htmlFor={`toggle-${id}`} className="control-label" title={summary}>
            {label}
          </label>
          <span className="control-sublabel">{summary}</span>
        </div>

        <div className="toggle-actions">
          {isNonDefault && (
            <button
              type="button"
              className="control-reset-btn"
              onClick={() => onChange(defaultChecked)}
              aria-label={`Reset ${label}`}
              disabled={disabled}
            >
              Reset
            </button>
          )}

          <button
            id={`toggle-${id}`}
            type="button"
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            className={`toggle-switch-btn ${checked ? 'is-checked' : ''}`}
            onClick={() => {
              if (disabled) return;
              onChange(!checked);
            }}
          >
            <span className="toggle-switch-thumb" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
