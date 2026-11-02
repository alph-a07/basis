import React, { useState } from 'react';

interface LibraryScreenProps {
  onBack: () => void;
}

export const LibraryScreen: React.FC<LibraryScreenProps> = ({ onBack }) => {
  const [activeMotion, setActiveMotion] = useState<string | null>(null);

  const triggerMotion = (key: string) => {
    setActiveMotion(key);
    setTimeout(() => setActiveMotion(null), 800);
  };

  return (
    <div className="scene-screen scene-screen-library" data-part="library-screen">
      {/* Header with Back Button */}
      <div className="scene-section-header" style={{ marginBottom: 'var(--b-spacing-level3)' }}>
        <button
          type="button"
          className="scene-btn scene-btn-soft"
          onClick={onBack}
          aria-label="Back to home"
        >
          ← Back to home
        </button>
        <span className="scene-badge">Design System Library</span>
      </div>

      {/* Typography Ladder */}
      <div className="scene-section">
        <div className="scene-section-header">
          <h3 className="scene-section-title">Typography roles</h3>
        </div>
        <div className="scene-card" data-annotate="--b-typography-structure-level1">
          <div className="scene-ladder">
            <div className="scene-ladder-row">
              <span className="scene-ladder-label">Structure L1</span>
              <span className="type-struct-1">Headline Display</span>
            </div>
            <div className="scene-ladder-row">
              <span className="scene-ladder-label">Structure L2</span>
              <span className="type-struct-2">Section Headline</span>
            </div>
            <div className="scene-ladder-row">
              <span className="scene-ladder-label">Structure L3</span>
              <span className="type-struct-3">Subheader Group</span>
            </div>
            <div className="scene-ladder-row">
              <span className="scene-ladder-label">Structure L4</span>
              <span className="type-struct-4">Card Heading</span>
            </div>
            <div className="scene-ladder-row">
              <span className="scene-ladder-label">Structure L5</span>
              <span className="type-struct-5">Field Title</span>
            </div>
            <div className="scene-ladder-row">
              <span className="scene-ladder-label">Structure L6</span>
              <span className="type-struct-6">Overline Label</span>
            </div>

            <div className="scene-divider" style={{ margin: 'var(--b-spacing-level2) 0' }} />

            <div className="scene-ladder-row">
              <span className="scene-ladder-label">Content L1</span>
              <span className="type-content-1">Prominent lead paragraph body copy.</span>
            </div>
            <div className="scene-ladder-row">
              <span className="scene-ladder-label">Content L2</span>
              <span className="type-content-2">Standard application body text for controls.</span>
            </div>
            <div className="scene-ladder-row">
              <span className="scene-ladder-label">Content L3</span>
              <span className="type-content-3">Secondary supporting information copy.</span>
            </div>
            <div className="scene-ladder-row">
              <span className="scene-ladder-label">Content L4</span>
              <span className="type-content-4">Tertiary helper text and field notes.</span>
            </div>
            <div className="scene-ladder-row">
              <span className="scene-ladder-label">Content L5</span>
              <span className="type-content-5">Compact footnote and legal disclaimer.</span>
            </div>

            <div className="scene-divider" style={{ margin: 'var(--b-spacing-level2) 0' }} />

            <div className="scene-ladder-row">
              <span className="scene-ladder-label">Metadata L1</span>
              <span className="type-meta-1">Badge and chip label text.</span>
            </div>
            <div className="scene-ladder-row">
              <span className="scene-ladder-label">Metadata L2</span>
              <span className="type-meta-2">Status bar timestamp and code tag.</span>
            </div>
            <div className="scene-ladder-row">
              <span className="scene-ladder-label">Metadata L3</span>
              <span className="type-meta-3">Micro telemetry annotation badge.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Color Roles Ladder */}
      <div className="scene-section">
        <div className="scene-section-header">
          <h3 className="scene-section-title">Color system tiers</h3>
        </div>
        <div className="scene-card" data-annotate="--b-color-brand-primary">
          {/* Surface & Content Tiers */}
          <div className="scene-color-group">
            <span className="scene-ladder-label">Surfaces</span>
            <div className="scene-color-swatches-grid">
              <div className="scene-swatch" style={{ background: 'var(--b-color-surface-default)' }}>Default</div>
              <div className="scene-swatch" style={{ background: 'var(--b-color-surface-elevated)' }}>Elevated</div>
              <div className="scene-swatch" style={{ background: 'var(--b-color-surface-recessed)' }}>Recessed</div>
              <div className="scene-swatch" style={{ background: 'var(--b-color-surface-inverse)', color: 'var(--b-color-content-inverse)' }}>Inverse</div>
            </div>
          </div>

          {/* Brand Hierarchy */}
          <div className="scene-color-group" style={{ marginTop: 'var(--b-spacing-level3)' }}>
            <span className="scene-ladder-label">Brand Hierarchy</span>
            <div className="scene-color-swatches-grid">
              <div className="scene-swatch" style={{ background: 'var(--b-color-brand-primary)', color: 'var(--b-color-content-inverse)' }}>Primary</div>
              <div className="scene-swatch color-ref-brand-secondary" style={{ color: 'var(--b-color-content-inverse)' }}>Secondary</div>
              <div className="scene-swatch color-ref-brand-tertiary" style={{ color: 'var(--b-color-content-inverse)' }}>Tertiary</div>
              <div className="scene-swatch color-ref-brand-quaternary" style={{ color: 'var(--b-color-content-inverse)' }}>Quaternary</div>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="scene-color-group" style={{ marginTop: 'var(--b-spacing-level3)' }}>
            <span className="scene-ladder-label">Semantic Status</span>
            <div className="scene-color-swatches-grid">
              <div className="scene-swatch" style={{ background: 'var(--b-color-positive-surface)', color: 'var(--b-color-positive-content)', border: '1px solid var(--b-color-positive-border)' }}>
                Positive
              </div>
              <div className="scene-swatch" style={{ background: 'var(--b-color-negative-surface)', color: 'var(--b-color-negative-content)', border: '1px solid var(--b-color-negative-border)' }}>
                Negative
              </div>
              <div className="scene-swatch" style={{ background: 'var(--b-color-caution-surface)', color: 'var(--b-color-caution-content)', border: '1px solid var(--b-color-caution-border)' }}>
                Caution
              </div>
              <div className="scene-swatch" style={{ background: 'var(--b-color-info-surface)', color: 'var(--b-color-info-content)', border: '1px solid var(--b-color-info-border)' }}>
                Info
              </div>
            </div>
          </div>

          {/* Selection & Focus */}
          <div className="scene-color-group" style={{ marginTop: 'var(--b-spacing-level3)' }}>
            <span className="scene-ladder-label">Selection & Focus</span>
            <div className="scene-color-swatches-grid">
              <div className="scene-swatch" style={{ background: 'var(--b-color-selection-surface)', color: 'var(--b-color-selection-content)', border: '1px solid var(--b-color-selection-border)' }}>
                Selection
              </div>
              <div className="scene-swatch" style={{ background: 'var(--b-color-surface-default)', outline: '2px solid var(--b-color-focus-ring)', outlineOffset: '2px' }}>
                Focus ring
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Radius Ladder */}
      <div className="scene-section">
        <div className="scene-section-header">
          <h3 className="scene-section-title">Corner radius scale</h3>
        </div>
        <div className="scene-card" data-annotate="--b-radius-level4">
          <div className="scene-ladder-flex">
            {[
              { cls: 'radius-ref-none', label: 'None' },
              { cls: 'radius-ref-level1', label: 'L1' },
              { cls: 'radius-ref-level2', label: 'L2' },
              { cls: 'radius-ref-level3', label: 'L3' },
              { cls: 'radius-ref-level4', label: 'L4' },
              { cls: 'radius-ref-level5', label: 'L5' },
              { cls: 'radius-ref-level6', label: 'L6' },
              { cls: 'radius-ref-level7', label: 'L7' },
              { cls: 'radius-ref-level8', label: 'L8' },
              { cls: 'radius-ref-full', label: 'Full' },
            ].map((r) => (
              <div key={r.label} className="scene-box-item">
                <div className={`scene-radius-box ${r.cls}`} />
                <span className="scene-item-sub">{r.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Spacing Ladder */}
      <div className="scene-section">
        <div className="scene-section-header">
          <h3 className="scene-section-title">Spacing increments</h3>
        </div>
        <div className="scene-card" data-annotate="--b-spacing-level4">
          <div className="scene-ladder">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((lvl) => (
              <div key={lvl} className="scene-ladder-row">
                <span className="scene-ladder-label">Level {lvl}</span>
                <div
                  className={`spacing-ref-level${lvl}`}
                  style={{
                    width: `var(--b-spacing-level${lvl})`,
                    background: 'var(--b-color-brand-primary)',
                    borderRadius: 'var(--b-radius-level1)',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Depth & Elevation Ladder */}
      <div className="scene-section">
        <div className="scene-section-header">
          <h3 className="scene-section-title">Elevation & depth</h3>
        </div>
        <div className="scene-depth-grid" data-annotate="--b-depth-level3">
          {[1, 2, 3, 4].map((d) => (
            <div key={d} className={`scene-depth-card depth-ref-level${d}`}>
              <span className="scene-item-title">Depth L{d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Icon & Control Size Ladders */}
      <div className="scene-section">
        <div className="scene-section-header">
          <h3 className="scene-section-title">Icon & control sizes</h3>
        </div>
        <div className="scene-card" data-annotate="--b-size-icon-level3">
          <div className="scene-ladder-row" style={{ alignItems: 'center' }}>
            <span className="scene-ladder-label">Icons L1..L5</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--b-spacing-level2)' }}>
              {[1, 2, 3, 4, 5].map((lvl) => (
                <svg
                  key={lvl}
                  className={`icon-ref-level${lvl}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                </svg>
              ))}
            </div>
          </div>

          <div className="scene-divider" style={{ margin: 'var(--b-spacing-level2) 0' }} />

          <div className="scene-ladder-row" style={{ alignItems: 'center' }}>
            <span className="scene-ladder-label">Controls L1..L5</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--b-spacing-level2)' }}>
              {[1, 2, 3, 4, 5].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  className={`scene-btn scene-btn-outlined control-ref-level${lvl}`}
                  style={{ padding: '0 var(--b-spacing-level2)', fontSize: '10px' }}
                >
                  C{lvl}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tier x Treatment Grid */}
      <div className="scene-section">
        <div className="scene-section-header">
          <h3 className="scene-section-title">Tier × Treatment Matrix</h3>
        </div>
        <div className="scene-card" style={{ overflowX: 'auto' }}>
          <table className="scene-matrix-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: 'var(--b-spacing-level2)' }}>Tier</th>
                <th>Solid</th>
                <th>Tinted</th>
                <th>Outlined</th>
                <th>Plain</th>
              </tr>
            </thead>
            <tbody>
              {['Primary', 'Secondary', 'Tertiary', 'Quaternary'].map((tier) => (
                <tr key={tier} style={{ borderTop: '1px solid var(--b-color-border-default)' }}>
                  <td style={{ padding: 'var(--b-spacing-level2)', fontWeight: 600 }}>{tier}</td>
                  <td style={{ padding: 'var(--b-spacing-level2)', textAlign: 'center' }}>
                    <button type="button" className="scene-btn scene-btn-primary" style={{ fontSize: '11px' }}>
                      Solid
                    </button>
                  </td>
                  <td style={{ padding: 'var(--b-spacing-level2)', textAlign: 'center' }}>
                    <button type="button" className="scene-btn scene-btn-soft" style={{ fontSize: '11px' }}>
                      Tinted
                    </button>
                  </td>
                  <td style={{ padding: 'var(--b-spacing-level2)', textAlign: 'center' }}>
                    <button type="button" className="scene-btn scene-btn-outlined" style={{ fontSize: '11px' }}>
                      Outlined
                    </button>
                  </td>
                  <td style={{ padding: 'var(--b-spacing-level2)', textAlign: 'center' }}>
                    <button type="button" className="scene-btn scene-btn-ghost" style={{ fontSize: '11px' }}>
                      Plain
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Motion Card */}
      <div className="scene-section">
        <div className="scene-section-header">
          <h3 className="scene-section-title">Interactive motion physics</h3>
        </div>
        <div className="scene-card scene-motion-grid" data-annotate="--b-motion-feedback">
          {[
            { key: 'feedback', label: 'Feedback (tap to play)' },
            { key: 'stateTransition', label: 'State Transition' },
            { key: 'transformation', label: 'Transformation' },
            { key: 'expansion', label: 'Expansion' },
            { key: 'reposition', label: 'Reposition' },
            { key: 'emphasis', label: 'Emphasis' },
          ].map((m) => (
            <div
              key={m.key}
              className="scene-motion-tile"
              data-motion={m.key}
              data-active={activeMotion === m.key}
              onClick={() => triggerMotion(m.key)}
            >
              <div className="scene-motion-box" />
              <span className="scene-item-sub">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
