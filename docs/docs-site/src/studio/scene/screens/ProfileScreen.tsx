import React, { useState } from 'react';

export const ProfileScreen: React.FC = () => {
  const [switches, setSwitches] = useState({
    notifications: true,
    sync: true,
    contrast: false,
    offline: true,
  });
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [isDestructiveConfirmOpen, setIsDestructiveConfirmOpen] = useState(false);
  const [resetFeedback, setResetFeedback] = useState<string | null>(null);

  const toggleSwitch = (key: keyof typeof switches) => {
    setSwitches((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleConfirmReset = () => {
    setIsDestructiveConfirmOpen(false);
    setResetFeedback('Configuration reset to defaults.');
    setTimeout(() => setResetFeedback(null), 3000);
  };

  return (
    <div className="scene-screen scene-screen-profile" data-part="profile-screen">
      {/* User Header */}
      <div className="scene-card scene-card-elevated" data-annotate="--b-color-surface-elevated">
        <div className="scene-profile-header">
          <div className="scene-avatar scene-avatar-lg">
            <svg viewBox="0 0 60 60" className="scene-avatar-svg">
              <circle cx="30" cy="30" r="28" fill="var(--b-color-surface-recessed)" />
              <circle cx="30" cy="22" r="10" fill="var(--b-color-brand-primary)" />
              <path d="M12 48c0-10 8-16 18-16s18 6 18 16" fill="var(--b-color-brand-primary)" />
            </svg>
          </div>
          <div className="scene-profile-meta">
            <h3 className="scene-profile-name">Alex Rivera</h3>
            <div className="scene-profile-handle">@alex.design · Workspace Admin</div>
            <div className="scene-badge scene-badge-pos" style={{ marginTop: 'var(--b-spacing-level1)' }}>
              Verified Member
            </div>
          </div>
        </div>

        {/* Sign In / Sign Out Card Action */}
        <div className="scene-profile-auth-action" style={{ marginTop: 'var(--b-spacing-level3)' }}>
          <button
            type="button"
            className="scene-btn scene-btn-outlined"
            style={{ width: '100%' }}
            onClick={() => setIsSignedIn(!isSignedIn)}
          >
            {isSignedIn ? 'Sign out of session' : 'Sign in to workspace'}
          </button>
        </div>
      </div>

      {/* Grouped Settings List with Switches */}
      <div className="scene-section">
        <div className="scene-section-header">
          <h3 className="scene-section-title">Preferences</h3>
        </div>
        <div className="scene-card scene-card-recessed">
          <div className="scene-list">
            {[
              { key: 'notifications' as const, label: 'Push notifications', sub: 'Real-time incident updates' },
              { key: 'sync' as const, label: 'Multi-device sync', sub: 'Instant theme parameter delivery' },
              { key: 'contrast' as const, label: 'Contrast enhancement', sub: 'Force WCAG AAA compliance' },
              { key: 'offline' as const, label: 'Offline cache store', sub: 'Keep snapshot in indexedDB' },
            ].map((item) => (
              <div
                key={item.key}
                className="scene-list-item"
                onClick={() => toggleSwitch(item.key)}
              >
                <div className="scene-item-text">
                  <div className="scene-item-title">{item.label}</div>
                  <div className="scene-item-sub">{item.sub}</div>
                </div>
                <div
                  className="scene-switch"
                  role="switch"
                  aria-checked={switches[item.key]}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      toggleSwitch(item.key);
                    }
                  }}
                >
                  <div className="scene-switch-thumb" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Article-Style About Block */}
      <div className="scene-section">
        <div className="scene-section-header">
          <h3 className="scene-section-title">Specification</h3>
        </div>
        <div className="scene-card" data-annotate="--b-color-surface-default">
          <div className="scene-article">
            <h4 className="type-struct-3" style={{ margin: '0 0 var(--b-spacing-level2) 0' }}>
              Basis Architecture
            </h4>
            <p className="type-content-2" style={{ margin: '0 0 var(--b-spacing-level2) 0' }}>
              Basis compiles pure Kotlin intent trees into reactive OKLCH design tokens.
            </p>
            <blockquote
              style={{
                borderLeft: '3px solid var(--b-color-brand-primary)',
                paddingLeft: 'var(--b-spacing-level3)',
                margin: 'var(--b-spacing-level2) 0',
                color: 'var(--b-color-content-muted)',
                fontStyle: 'italic',
              }}
            >
              "Design systems should be functional transformations, not mutable states."
            </blockquote>
            <pre
              style={{
                background: 'var(--b-color-surface-recessed)',
                padding: 'var(--b-spacing-level2)',
                borderRadius: 'var(--b-radius-level2)',
                fontFamily: 'monospace',
                fontSize: '11px',
                overflowX: 'auto',
              }}
            >
              <code>val theme = BasisTheme.resolve(intent)</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Destructive Row */}
      <div className="scene-section">
        <div className="scene-section-header">
          <h3 className="scene-section-title">Danger zone</h3>
        </div>
        <div className="scene-card scene-card-recessed" data-annotate="--b-color-negative-surface">
          <div className="scene-list-item" style={{ border: 'none' }}>
            <div className="scene-item-text">
              <div className="scene-item-title" style={{ color: 'var(--b-color-negative-content)' }}>
                Reset workspace
              </div>
              <div className="scene-item-sub">Erase all intent customizations and restore default state</div>
            </div>
            <button
              type="button"
              className="scene-btn scene-btn-destructive"
              onClick={() => setIsDestructiveConfirmOpen(true)}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Confirm Destructive Dialog */}
      {isDestructiveConfirmOpen && (
        <div className="scene-modal-backdrop" onClick={() => setIsDestructiveConfirmOpen(false)}>
          <div
            className="scene-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="destructive-title"
          >
            <h4 id="destructive-title" className="scene-modal-title" style={{ color: 'var(--b-color-negative-content)' }}>
              Reset Workspace?
            </h4>
            <p className="scene-modal-body">
              This action will discard all uncommitted overrides across tokens, typography, and color spaces.
            </p>
            <div className="scene-modal-actions">
              <button
                type="button"
                className="scene-btn scene-btn-outlined"
                onClick={() => setIsDestructiveConfirmOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="scene-btn scene-btn-destructive"
                onClick={handleConfirmReset}
              >
                Reset workspace
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Feedback Notification */}
      {resetFeedback && (
        <div className="scene-snackbar" role="status" aria-live="polite">
          <span>{resetFeedback}</span>
        </div>
      )}
    </div>
  );
};
