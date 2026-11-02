import React from 'react';
import type { ControlChoice } from './registry.js';

interface ChoiceProps {
  label: string;
  summary: string;
  value: string | null | undefined;
  choices?: ControlChoice[];
  options?: ControlChoice[];
  onChange: (value: string | null) => void;
  disabled?: boolean;
  disabledReason?: string;
}

export const Choice: React.FC<ChoiceProps> = ({
  label,
  summary,
  value,
  choices: propChoices,
  options: propOptions,
  onChange,
  disabled = false,
  disabledReason,
}) => {
  const choices = Array.isArray(propChoices)
    ? propChoices
    : Array.isArray(propOptions)
      ? propOptions
      : [];

  return (
    <div className={`studio-control-field ${disabled ? 'is-disabled' : ''}`}>
      <div className="control-header">
        <label className="control-label" title={summary}>
          {label}
        </label>
        {value && (
          <button
            type="button"
            className="control-reset-btn"
            onClick={() => onChange(null)}
            aria-label={`Reset ${label}`}
            disabled={disabled}
          >
            Reset
          </button>
        )}
      </div>
      {disabled && disabledReason && (
        <p className="control-disabled-reason" role="note">
          {disabledReason}
        </p>
      )}
      <div
        className="choice-chips-group"
        role="radiogroup"
        aria-label={label}
        aria-disabled={disabled}
      >
        {choices.map((choice) => {
          const isSelected = value === choice.id;
          return (
            <button
              key={choice.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={disabled}
              className={`choice-chip ${isSelected ? 'is-active' : ''}`}
              title={choice.summary}
              onClick={() => {
                if (disabled) return;
                onChange(isSelected ? null : choice.id);
              }}
            >
              {choice.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
