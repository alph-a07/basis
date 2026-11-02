import React from 'react';
import { STARTER_INTENTS, type StarterIntent } from '../config/studio-ui.js';

interface TopBarProps {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onSelectStarter: (starter: StarterIntent) => void;
  globalTheme: 'light' | 'dark';
  onToggleGlobalTheme: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onSelectStarter,
  globalTheme,
  onToggleGlobalTheme,
}) => {
  return (
    <header className="studio-topbar" aria-label="Studio top navigation">
      {/* Left: Logo + Basis */}
      <div className="topbar-left">
        <a href="/" className="brand-link" aria-label="Basis Home">
          <svg className="brand-logo" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="12" cy="12" r="4" fill="currentColor" />
          </svg>
          <span className="brand-title">Basis</span>
        </a>

        {/* Starter Intents dropdown */}
        <div className="starter-presets-dropdown">
          <select
            className="starter-select"
            aria-label="Starter Theme Presets"
            defaultValue=""
            onChange={(e) => {
              const starter = STARTER_INTENTS.find((s) => s.id === e.target.value);
              if (starter) {
                onSelectStarter(starter);
                e.target.value = '';
              }
            }}
          >
            <option value="" disabled>
              Starters & Presets...
            </option>
            {STARTER_INTENTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Center: Intent Studio */}
      <div className="topbar-center" aria-label="Current Workspace">
        <h1 className="studio-topbar-title">Intent Studio</h1>
      </div>

      {/* Right: Undo, Redo, Global Mode, CTA Open docs */}
      <div className="topbar-actions">
        {/* Undo / Redo */}
        <div className="history-buttons-group">
          <button
            type="button"
            className="studio-btn btn-secondary btn-icon"
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z / ⌘Z)"
            aria-label="Undo"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 14L4 9l5-5" />
              <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11" />
            </svg>
          </button>
          <button
            type="button"
            className="studio-btn btn-secondary btn-icon"
            onClick={onRedo}
            disabled={!canRedo}
            title="Redo (Ctrl+Shift+Z / ⇧⌘Z)"
            aria-label="Redo"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 14l5-5-5-5" />
              <path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5v0A5.5 5.5 0 0 0 9.5 20H13" />
            </svg>
          </button>
        </div>

        {/* Global theme mode toggle */}
        <button
          type="button"
          className="studio-btn btn-secondary btn-icon"
          onClick={onToggleGlobalTheme}
          title={`Switch global theme to ${globalTheme === 'dark' ? 'Light' : 'Dark'} mode`}
          aria-label={`Toggle global theme mode (current: ${globalTheme})`}
        >
          {globalTheme === 'dark' ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        {/* CTA Open docs */}
        <a href="/" className="studio-btn btn-docs" aria-label="Open documentation">
          <span className="btn-docs-full">Open docs</span>
          <span className="btn-docs-compact">Docs</span>
        </a>
      </div>
    </header>
  );
};
