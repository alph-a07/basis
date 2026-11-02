import React, { useState } from 'react';
import type { ResolutionReport, ThemeViolation } from '../state/resolveClient';
import type { TokenDiffResult } from '../state/tokenDiff';
import type { BasisIntentState } from '../state/serialize';
import { JsonEditor } from '../controls/JsonEditor';

interface InspectorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  report: ResolutionReport | null;
  violations: ThemeViolation[];
  tokenDiff: TokenDiffResult | null;
  intent: BasisIntentState;
  onApplyIntent: (intent: BasisIntentState) => void;
  totalTokensCount: number;
}

type TabId = 'violations' | 'report' | 'diff' | 'raw';

export const InspectorDrawer: React.FC<InspectorDrawerProps> = ({
  isOpen,
  onClose,
  report,
  violations = [],
  tokenDiff,
  intent,
  onApplyIntent,
  totalTokensCount,
}) => {
  const [activeTab, setActiveTab] = useState<TabId>('report');

  if (!isOpen) return null;

  return (
    <aside
      id="studio-inspector-drawer"
      className="studio-inspector-drawer is-open"
      role="complementary"
      aria-label="Theme Inspector Drawer"
    >
      <div className="drawer-header">
        <div className="drawer-title-box">
          <h2 className="drawer-title">Theme Inspector</h2>
          <span className={`drawer-health-badge ${violations.length > 0 ? 'status-violation' : 'status-healthy'}`}>
            {violations.length > 0 ? `${violations.length} Violation${violations.length > 1 ? 's' : ''}` : 'Valid Theme'}
          </span>
        </div>

        <button
          type="button"
          className="drawer-close-btn"
          onClick={onClose}
          aria-label="Close inspector drawer"
        >
          &times;
        </button>
      </div>

      {/* Tabs navigation */}
      <div className="drawer-tabs-nav" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'violations'}
          className={`drawer-tab-btn ${activeTab === 'violations' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('violations')}
        >
          Violations
          {violations.length > 0 && <span className="tab-badge">{violations.length}</span>}
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'report'}
          className={`drawer-tab-btn ${activeTab === 'report' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('report')}
        >
          Report ({totalTokensCount})
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'diff'}
          className={`drawer-tab-btn ${activeTab === 'diff' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('diff')}
        >
          Changed Tokens
          {tokenDiff && tokenDiff.totalChanged > 0 && <span className="tab-badge">{tokenDiff.totalChanged}</span>}
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'raw'}
          className={`drawer-tab-btn ${activeTab === 'raw' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('raw')}
        >
          Raw JSON
        </button>
      </div>

      <div className="drawer-tab-panel">
        {/* Tab 1: Violations */}
        {activeTab === 'violations' && (
          <div className="tab-content-violations">
            {violations.length === 0 ? (
              <div className="violations-empty-state">
                <span className="empty-check-icon">✓</span>
                <p>Zero violations detected. All inputs conform to design system constraints.</p>
              </div>
            ) : (
              <div className="violations-list">
                {violations.map((v, i) => (
                  <div key={i} className="violation-card">
                    <div className="violation-path-tag">{v.path}</div>
                    <div className="violation-message-text">{v.message}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Report */}
        {activeTab === 'report' && (
          <div className="tab-content-report">
            <div className="report-summary-strip">
              <div className="summary-cell">
                <span className="summary-val">{totalTokensCount}</span>
                <span className="summary-label">Resolved Tokens</span>
              </div>
              <div className="summary-cell">
                <span className="summary-val">{report?.modes?.join(', ') || 'Light, Dark'}</span>
                <span className="summary-label">Modes</span>
              </div>
              <div className="summary-cell">
                <span className="summary-val">v{report?.baseVersion || 1}</span>
                <span className="summary-label">Base Table</span>
              </div>
            </div>

            <h3 className="report-subheading">Pipeline Stage Diagnostics</h3>
            <div className="report-entries-stack">
              {report?.entries?.map((e, i) => (
                <div key={i} className="audit-entry-card">
                  <div className="audit-card-top">
                    <span className="audit-path-code">{e.path}</span>
                    <span className={`audit-badge status-${e.status.toLowerCase()}`}>{e.status}</span>
                  </div>
                  <div className="audit-msg-text">{e.message}</div>
                  {(e.requested || e.enforced) && (
                    <div className="audit-values-compare">
                      {e.requested && <span>Requested: {e.requested}</span>}
                      {e.enforced && <span>Enforced: {e.enforced}</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Changed Tokens */}
        {activeTab === 'diff' && (
          <div className="tab-content-diff">
            {!tokenDiff || tokenDiff.totalChanged === 0 ? (
              <div className="diff-empty-state">
                <p>No token modifications between current and previous theme states.</p>
              </div>
            ) : (
              <div className="token-diff-list">
                {tokenDiff.added.map((path) => (
                  <div key={path} className="diff-item diff-added">
                    <span className="diff-badge badge-add">+ Added</span>
                    <span className="diff-path">{path}</span>
                  </div>
                ))}
                {tokenDiff.removed.map((path) => (
                  <div key={path} className="diff-item diff-removed">
                    <span className="diff-badge badge-remove">- Removed</span>
                    <span className="diff-path">{path}</span>
                  </div>
                ))}
                {tokenDiff.changed.map((c) => (
                  <div key={c.path} className="diff-item diff-modified">
                    <span className="diff-badge badge-change">Δ Changed</span>
                    <div className="diff-details">
                      <span className="diff-path">{c.path}</span>
                      <div className="diff-values-row">
                        <span className="diff-prev">{c.prev}</span>
                        <span className="diff-arrow">→</span>
                        <span className="diff-next">{c.next}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Raw JSON */}
        {activeTab === 'raw' && (
          <JsonEditor intent={intent} onApply={onApplyIntent} />
        )}
      </div>
    </aside>
  );
};
