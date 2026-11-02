import React from 'react';
import type { ControlChoice } from './registry.js';

interface MultiChoiceProps {
  label: string;
  summary: string;
  values?: string[] | null | undefined;
  value?: string[] | null | undefined;
  choices?: ControlChoice[];
  options?: ControlChoice[];
  onChange: (values: string[]) => void;
  disabled?: boolean;
}

export const MultiChoice: React.FC<MultiChoiceProps> = ({
  label,
  summary,
  values: propValues,
  value: propValue,
  choices: propChoices,
  options: propOptions,
  onChange,
  disabled = false,
}) => {
  const values = Array.isArray(propValues)
    ? propValues
    : Array.isArray(propValue)
      ? propValue
      : propValue
        ? [propValue]
        : [];
  const choices = Array.isArray(propChoices)
    ? propChoices
    : Array.isArray(propOptions)
      ? propOptions
      : [];
  const currentSet = new Set(values);

  const toggleChoice = (id: string) => {
    const next = new Set(currentSet);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    onChange(Array.from(next));
  };

  return (
    <div className={`studio-control-field ${disabled ? 'is-disabled' : ''}`}>
      <div className="control-header">
        <label className="control-label" title={summary}>
          {label}
        </label>
        {currentSet.size > 0 && (
          <button
            type="button"
            className="control-reset-btn"
            onClick={() => onChange([])}
            aria-label={`Reset ${label}`}
            disabled={disabled}
          >
            Clear ({currentSet.size})
          </button>
        )}
      </div>
      <div
        className="choice-chips-group"
        role="group"
        aria-label={label}
        aria-disabled={disabled}
      >
        {choices.map((choice) => {
          const isSelected = currentSet.has(choice.id);
          return (
            <button
              key={choice.id}
              type="button"
              role="checkbox"
              aria-checked={isSelected}
              disabled={disabled}
              className={`choice-chip ${isSelected ? 'is-active' : ''}`}
              title={choice.summary}
              onClick={() => {
                if (disabled) return;
                toggleChoice(choice.id);
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
