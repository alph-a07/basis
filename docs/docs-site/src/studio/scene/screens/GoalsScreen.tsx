import React, { useState } from 'react';

export const GoalsScreen: React.FC = () => {
  const [activeStep, setActiveStep] = useState(2);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="scene-screen scene-screen-goals" data-part="goals-screen">
      {/* Progress Ring Hero */}
      <div className="scene-card scene-card-elevated" data-annotate="--b-color-surface-elevated">
        <div className="scene-progress-hero">
          <div className="scene-ring-container" aria-label="Target completion 78%">
            <svg viewBox="0 0 100 100" className="scene-progress-ring">
              <circle cx="50" cy="50" r="42" className="scene-ring-bg" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="42"
                className="scene-ring-fg"
                strokeWidth="8"
                strokeDasharray="264"
                strokeDashoffset="58"
                strokeLinecap="round"
              />
            </svg>
            <div className="scene-ring-text">
              <span className="scene-ring-pct">78%</span>
              <span className="scene-ring-sub">Achieved</span>
            </div>
          </div>

          <div className="scene-hero-text">
            <h3 className="scene-hero-title">Sprint Objectives</h3>
            <p className="scene-hero-subtitle">14 of 18 milestone goals verified</p>
            <div className="scene-status-row">
              <span className="scene-chip" data-selected="true" data-annotate="--b-color-positive-surface">
                On track
              </span>
              <button
                type="button"
                className="scene-icon-btn scene-info-trigger"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setShowTooltip(!showTooltip)}
                aria-label="Target metrics information"
              >
                ℹ
              </button>
            </div>
            {showTooltip && (
              <div className="scene-tooltip" role="tooltip">
                P95 latency under 16ms across all target breakpoints.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stepper */}
      <div className="scene-section">
        <div className="scene-section-header">
          <h3 className="scene-section-title">Milestone pipeline</h3>
        </div>
        <div className="scene-stepper" role="list">
          {[
            { step: 1, title: 'Tokens Definition', status: 'Completed' },
            { step: 2, title: 'Scene Verification', status: 'In progress' },
            { step: 3, title: 'Release Build', status: 'Pending' },
          ].map((s) => (
            <div
              key={s.step}
              className="scene-step-item"
              data-active={activeStep === s.step}
              data-completed={s.step < activeStep}
              onClick={() => setActiveStep(s.step)}
            >
              <div className="scene-step-circle">
                {s.step < activeStep ? '✓' : s.step}
              </div>
              <div className="scene-step-content">
                <div className="scene-step-title">{s.title}</div>
                <div className="scene-step-sub">{s.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Metric Tiles with Sparkline */}
      <div className="scene-section">
        <div className="scene-section-header">
          <h3 className="scene-section-title">Performance metrics</h3>
        </div>
        <div className="scene-metric-tiles-grid">
          <div className="scene-card scene-metric-tile" data-annotate="--b-color-surface-recessed">
            <div className="scene-metric-tile-header">
              <span className="scene-metric-title">Throughput</span>
              <span className="scene-badge scene-badge-pos">+18%</span>
            </div>
            <div className="scene-metric-large">2,480</div>
            <div className="scene-sparkline" aria-hidden="true">
              <svg viewBox="0 0 100 24" className="scene-spark-svg">
                <polyline
                  points="0,20 15,18 30,22 45,10 60,14 75,6 90,12 100,4"
                  fill="none"
                  stroke="var(--b-color-brand-primary)"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          <div className="scene-card scene-metric-tile" data-annotate="--b-color-surface-recessed">
            <div className="scene-metric-tile-header">
              <span className="scene-metric-title">Error budget</span>
              <span className="scene-badge scene-badge-pos">99.9%</span>
            </div>
            <div className="scene-metric-large">0.01%</div>
            <div className="scene-sparkline" aria-hidden="true">
              <svg viewBox="0 0 100 24" className="scene-spark-svg">
                <polyline
                  points="0,6 20,8 40,5 60,6 80,4 100,5"
                  fill="none"
                  stroke="var(--b-color-positive-border)"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Categorical Distribution Chart */}
      <div className="scene-section">
        <div className="scene-section-header">
          <h3 className="scene-section-title">Resource allocation</h3>
        </div>
        <div className="scene-card" data-annotate="--b-color-surface-elevated">
          <div className="scene-cat-chart">
            <div className="scene-cat-bar-stack">
              <div className="scene-cat-segment color-ref-brand-secondary" style={{ width: '40%' }} title="Core (40%)" />
              <div className="scene-cat-segment color-ref-brand-tertiary" style={{ width: '30%' }} title="Runtime (30%)" />
              <div className="scene-cat-segment color-ref-brand-quaternary" style={{ width: '20%' }} title="Tooling (20%)" />
              <div className="scene-cat-segment scene-chart-bar-caution" style={{ width: '10%' }} title="Reserve (10%)" />
            </div>
            <div className="scene-cat-legend">
              <div className="scene-cat-item">
                <span className="scene-legend-swatch color-ref-brand-secondary" />
                <span>Core (40%)</span>
              </div>
              <div className="scene-cat-item">
                <span className="scene-legend-swatch color-ref-brand-tertiary" />
                <span>Runtime (30%)</span>
              </div>
              <div className="scene-cat-item">
                <span className="scene-legend-swatch color-ref-brand-quaternary" />
                <span>Tooling (20%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
