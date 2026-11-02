import React, { useState, useEffect } from 'react';
import type { BasisIntentState } from '../state/serialize';

interface JsonEditorProps {
  intent: BasisIntentState;
  onApply: (intent: BasisIntentState) => void;
  onClose?: () => void;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({
  intent,
  onApply,
  onClose,
}) => {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setText(JSON.stringify(intent, null, 2));
    setError(null);
  }, [intent]);

  const handleApply = () => {
    try {
      const parsed = JSON.parse(text);
      if (typeof parsed !== 'object' || parsed === null) {
        throw new Error('Intent JSON must be an object.');
      }
      setError(null);
      onApply(parsed);
    } catch (e: any) {
      setError(e.message || 'Invalid JSON syntax');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="studio-json-editor-wrap">
      <div className="json-editor-toolbar">
        <div className="json-editor-title">Raw Intent JSON</div>
        <div className="json-editor-actions">
          <button type="button" className="studio-btn btn-sm btn-secondary" onClick={handleCopy}>
            Copy
          </button>
          <button type="button" className="studio-btn btn-sm btn-primary" onClick={handleApply}>
            Apply Changes
          </button>
          {onClose && (
            <button type="button" className="studio-btn btn-sm btn-secondary" onClick={onClose}>
              Close
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="json-editor-error-banner" role="alert">
          {error}
        </div>
      )}

      <textarea
        className="json-editor-textarea"
        value={text}
        rows={18}
        spellCheck={false}
        onChange={(e) => {
          setText(e.target.value);
          setError(null);
        }}
        aria-label="Raw BasisIntent JSON Editor"
      />
    </div>
  );
};
