import React, { useState } from 'react';
import { ReportTab } from '../panes/ReportTab.js';
import { TokensTab } from '../panes/TokensTab.js';
import { EditorTab } from '../panes/EditorTab.js';
import type { ResolutionReport, ThemeViolation } from '../state/resolveClient.js';
import type { BasisIntentState } from '../state/serialize.js';
import type { RailCategory } from '../config/studio-ui.js';

export type RightPaneTab = 'report' | 'tokens' | 'editor';

interface RightPaneProps {
  isSuccess: boolean;
  report: ResolutionReport | null;
  violations: ThemeViolation[];
  tokens: Record<string, string>;
  kinds: Record<string, string>;
  groups: Record<string, string>;
  intent: BasisIntentState;
  onApplyIntent: (intent: BasisIntentState) => void;
  durationMs: number;
  onNavigateToCategory?: (category: RailCategory, targetPath?: string) => void;
  onCopyNotification?: (msg: string) => void;
  defaultCollapsed?: boolean;
}

export const RightPane: React.FC<RightPaneProps> = ({
  isSuccess,
  report,
  violations,
  tokens,
  kinds,
  groups,
  intent,
  onApplyIntent,
  durationMs,
  onNavigateToCategory,
  onCopyNotification,
  defaultCollapsed = false,
}) => {
  const [activeTab, setActiveTab] = useState<RightPaneTab>('report');
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const totalTokens = Object.keys(tokens).length;

  return (
    <aside
      className={`studio-right-pane ${isCollapsed ? 'is-collapsed' : ''}`}
      aria-label="Inspector and Editor Pane"
      data-part="right-pane"
    >
      {/* Pane Collapse Button on Edge */}
      <button
        type="button"
        className="right-pane-collapse-btn"
        onClick={() => setIsCollapsed(!isCollapsed)}
        title={isCollapsed ? 'Expand right pane' : 'Collapse right pane'}
        aria-label={isCollapsed ? 'Expand right pane' : 'Collapse right pane'}
      >
        {isCollapsed ? '◀' : '▶'}
      </button>

      {/* Collapsed Rail Icons */}
      {isCollapsed ? (
        <div className="right-pane-collapsed-rail" role="tablist">
          <button
            type="button"
            className="collapsed-rail-btn"
            title="Report"
            onClick={() => {
              setActiveTab('report');
              setIsCollapsed(false);
            }}
          >
            📋
            {violations.length > 0 && <span className="rail-badge-dot" />}
          </button>
          <button
            type="button"
            className="collapsed-rail-btn"
            title="Tokens"
            onClick={() => {
              setActiveTab('tokens');
              setIsCollapsed(false);
            }}
          >
            🪙
          </button>
          <button
            type="button"
            className="collapsed-rail-btn"
            title="Editor"
            onClick={() => {
              setActiveTab('editor');
              setIsCollapsed(false);
            }}
          >
            💻
          </button>
        </div>
      ) : (
        <div className="right-pane-expanded-body">
          {/* Header Tab Bar */}
          <div className="right-pane-tabs-header" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'report'}
              className={`right-pane-tab-btn ${activeTab === 'report' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('report')}
            >
              Report
              {violations.length > 0 ? (
                <span className="tab-badge badge-warning">{violations.length}</span>
              ) : (
                <span className="tab-badge badge-success">✓</span>
              )}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'tokens'}
              className={`right-pane-tab-btn ${activeTab === 'tokens' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('tokens')}
            >
              Tokens ({totalTokens})
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'editor'}
              className={`right-pane-tab-btn ${activeTab === 'editor' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('editor')}
            >
              Editor
            </button>
          </div>

          {/* Tab Content */}
          <div className="right-pane-content">
            {activeTab === 'report' && (
              <ReportTab
                isSuccess={isSuccess}
                report={report}
                violations={violations}
                durationMs={durationMs}
                onNavigateToCategory={onNavigateToCategory}
                onCopyNotification={onCopyNotification}
              />
            )}
            {activeTab === 'tokens' && (
              <TokensTab
                tokens={tokens}
                kinds={kinds}
                groups={groups}
                onCopyNotification={onCopyNotification}
              />
            )}
            {activeTab === 'editor' && (
              <EditorTab
                intent={intent}
                onApplyIntent={onApplyIntent}
                violations={violations}
                onCopyNotification={onCopyNotification}
              />
            )}
          </div>
        </div>
      )}
    </aside>
  );
};
