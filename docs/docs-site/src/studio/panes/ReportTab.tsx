import React, { useState } from 'react';
import type { ResolutionReport, ThemeViolation } from '../state/resolveClient.js';
import type { RailCategory } from '../config/studio-ui.js';

interface ReportTabProps {
  isSuccess: boolean;
  report: ResolutionReport | null;
  violations: ThemeViolation[];
  durationMs: number;
  onNavigateToCategory?: (category: RailCategory, targetPath?: string) => void;
  onCopyNotification?: (msg: string) => void;
}

export const ReportTab: React.FC<ReportTabProps> = ({
  isSuccess,
  report,
  violations,
  durationMs,
  onNavigateToCategory,
  onCopyNotification,
}) => {
  const [copiedReport, setCopiedReport] = useState(false);

  const getCategoryFromPath = (path: string): RailCategory => {
    const clean = path.replace(/^\//, '');
    const segment = clean.split('/')[0];
    if (segment === 'identity') return 'identity';
    if (segment === 'mood') return 'mood';
    if (segment === 'domain') return 'domain';
    if (segment === 'control') {
      const sub = clean.split('/')[1];
      if (sub === 'mode') return 'mode';
      if (sub === 'fonts') return 'fonts';
      if (sub === 'constraints') return 'constraints';
      if (sub === 'tokens') return 'tokens';
      if (sub === 'components') return 'components';
    }
    return 'mood';
  };

  const handleCopyReportJson = async () => {
    if (!report) return;
    try {
      const json = JSON.stringify(
        {
          status: isSuccess ? 'resolved' : 'failed',
          durationMs,
          report,
          violations,
        },
        null,
        2
      );
      await navigator.clipboard.writeText(json);
      setCopiedReport(true);
      if (onCopyNotification) onCopyNotification('Copied report JSON');
      setTimeout(() => setCopiedReport(false), 2000);
    } catch {
      setCopiedReport(true);
    }
  };

  return (
    <div className="studio-report-tab" data-part="report-tab">
      {/* Status Banner */}
      <div
        className={`report-status-banner ${isSuccess && violations.length === 0 ? 'banner-success' : 'banner-warning'}`}
      >
        <div className="banner-icon" aria-hidden="true">
          {isSuccess && violations.length === 0 ? '✓' : '⚠'}
        </div>
        <div className="banner-info">
          <h3 className="banner-title">
            {isSuccess && violations.length === 0
              ? 'Theme Resolved Successfully'
              : violations.length > 0
              ? `${violations.length} Violation${violations.length > 1 ? 's' : ''} Detected`
              : 'Resolution Incomplete'}
          </h3>
          <p className="banner-sub">
            Resolved in {durationMs.toFixed(1)} ms · Generated modes:{' '}
            {report?.modes?.join(', ') || 'Light, Dark'}
          </p>
        </div>
        <button
          type="button"
          className="studio-btn btn-secondary btn-sm"
          onClick={handleCopyReportJson}
          title="Copy resolution report JSON"
        >
          {copiedReport ? 'Copied' : 'Copy JSON'}
        </button>
      </div>

      {/* Violations Notifications */}
      {violations.length > 0 && (
        <section className="report-section" aria-label="Theme Violations">
          <h4 className="report-section-title">Violations ({violations.length})</h4>
          <div className="report-violations-list">
            {violations.map((v, i) => {
              const cat = getCategoryFromPath(v.path);
              return (
                <div
                  key={`${v.path}-${i}`}
                  className="violation-card"
                  role="button"
                  tabIndex={0}
                  onClick={() => onNavigateToCategory?.(cat, v.path)}
                  title="Click to jump to control"
                >
                  <div className="violation-header">
                    <span className="violation-path">{v.path}</span>
                    <span className="violation-badge">Jump to {cat} →</span>
                  </div>
                  <p className="violation-msg">{v.message}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Resolution Report Entries */}
      {report && report.entries && report.entries.length > 0 && (
        <section className="report-section" aria-label="Resolution Details">
          <h4 className="report-section-title">Applied Contributions & Constraints</h4>
          <div className="report-entries-table-wrapper">
            <table className="report-entries-table">
              <thead>
                <tr>
                  <th>Path</th>
                  <th>Stage</th>
                  <th>Status</th>
                  <th>Effective</th>
                </tr>
              </thead>
              <tbody>
                {report.entries.map((entry, idx) => (
                  <tr key={`${entry.path}-${idx}`}>
                    <td>
                      <code>{entry.path}</code>
                    </td>
                    <td>{entry.stage}</td>
                    <td>
                      <span
                        className={`entry-status-badge status-${entry.status.toLowerCase()}`}
                      >
                        {entry.status}
                      </span>
                    </td>
                    <td>{entry.enforced || entry.requested || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Font Assignments */}
      {report?.fontAssignments && (
        <section className="report-section" aria-label="Font Assignments">
          <h4 className="report-section-title">Font Assignments</h4>
          <div className="font-assignments-grid">
            <div className="assignment-tile">
              <span className="assignment-label">Structure</span>
              <span className="assignment-val">
                {report.fontAssignments.structure?.family || 'Default system font'}
              </span>
            </div>
            <div className="assignment-tile">
              <span className="assignment-label">Content</span>
              <span className="assignment-val">
                {report.fontAssignments.content?.family || 'Default system font'}
              </span>
            </div>
            <div className="assignment-tile">
              <span className="assignment-label">Metadata</span>
              <span className="assignment-val">
                {report.fontAssignments.metadata?.family || 'Default system font'}
              </span>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
