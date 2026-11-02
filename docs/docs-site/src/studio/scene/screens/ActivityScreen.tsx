import React, { useState } from 'react';

export const ActivityScreen: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(1);
  const [sortField, setSortField] = useState<'id' | 'status' | 'val'>('id');
  const [sortAsc, setSortAsc] = useState(true);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Are the new typography scales loaded?', direction: 'in', time: '10:14' },
    { id: 2, text: 'Yes, structure and content levels are active.', direction: 'out', time: '10:15' },
  ]);

  const tableData = [
    { id: 'REC-001', name: 'Layout frame root', status: 'Active', val: '42ms' },
    { id: 'REC-002', name: 'Color palette shift', status: 'Updated', val: '18ms' },
    { id: 'REC-003', name: 'Elevation depth sync', status: 'Stable', val: '6ms' },
    { id: 'REC-004', name: 'Focus ring constraint', status: 'Verified', val: '12ms' },
  ];

  const sortedData = [...tableData].sort((a, b) => {
    const vA = a[sortField];
    const vB = b[sortField];
    return sortAsc ? vA.localeCompare(vB) : vB.localeCompare(vA);
  });

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: chatInput, direction: 'out', time: 'Just now' },
    ]);
    setChatInput('');
  };

  return (
    <div className="scene-screen scene-screen-activity" data-part="activity-screen">
      {/* Feed Card with Gradient Media */}
      <div className="scene-card scene-card-elevated" data-annotate="--b-depth-level2">
        <div
          className="scene-media-gradient"
          style={{
            background: 'linear-gradient(135deg, var(--b-color-brand-primary) 0%, var(--b-color-brand-secondary) 100%)',
            height: '110px',
            borderRadius: 'var(--b-radius-level3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--b-color-content-inverse)',
          }}
        >
          <span className="scene-media-title">Design System Update</span>
        </div>
        <div className="scene-card-body" style={{ padding: 'var(--b-spacing-level3) 0' }}>
          <h4 className="scene-item-title">Cross-platform token synchronizer</h4>
          <p className="scene-item-sub">Kotlin Multiplatform compilation to JS/CSS successful</p>
        </div>
      </div>

      {/* Avatar Row */}
      <div className="scene-section">
        <div className="scene-section-header">
          <h3 className="scene-section-title">Active contributors</h3>
        </div>
        <div className="scene-avatar-row">
          {['BA', 'CT', 'DL', 'EM', 'FR', 'GS'].map((initials, i) => (
            <div
              key={initials}
              className="scene-avatar scene-avatar-md"
              data-annotate={i === 0 ? '--b-color-brand-primary' : undefined}
              title={`User ${initials}`}
            >
              <svg viewBox="0 0 40 40" className="scene-avatar-svg">
                <circle cx="20" cy="20" r="18" fill="var(--b-color-surface-recessed)" />
                <text
                  x="20"
                  y="24"
                  textAnchor="middle"
                  fill="var(--b-color-content-default)"
                  fontSize="12"
                  fontWeight="600"
                >
                  {initials}
                </text>
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* Dense Data Table */}
      <div className="scene-section">
        <div className="scene-section-header">
          <h3 className="scene-section-title">Telemetry nodes</h3>
        </div>
        <div className="scene-table-container scene-card" data-annotate="--b-color-border-default">
          <table className="scene-table">
            <thead>
              <tr>
                <th
                  onClick={() => {
                    if (sortField === 'id') setSortAsc(!sortAsc);
                    else { setSortField('id'); setSortAsc(true); }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  Node ID {sortField === 'id' ? (sortAsc ? '▲' : '▼') : ''}
                </th>
                <th>Target</th>
                <th
                  onClick={() => {
                    if (sortField === 'status') setSortAsc(!sortAsc);
                    else { setSortField('status'); setSortAsc(true); }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  Status {sortField === 'status' ? (sortAsc ? '▲' : '▼') : ''}
                </th>
                <th
                  onClick={() => {
                    if (sortField === 'val') setSortAsc(!sortAsc);
                    else { setSortField('val'); setSortAsc(true); }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  P95 {sortField === 'val' ? (sortAsc ? '▲' : '▼') : ''}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row) => (
                <tr key={row.id}>
                  <td><code>{row.id}</code></td>
                  <td>{row.name}</td>
                  <td>
                    <span className="scene-chip scene-chip-sm" data-selected={row.status === 'Active'}>
                      {row.status}
                    </span>
                  </td>
                  <td>{row.val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Image Grid */}
      <div className="scene-section">
        <div className="scene-section-header">
          <h3 className="scene-section-title">Visual assets</h3>
        </div>
        <div className="scene-image-grid">
          {[1, 2, 3, 4].map((idx) => (
            <div
              key={idx}
              className="scene-image-tile"
              data-selected={selectedImage === idx}
              onClick={() => setSelectedImage(idx)}
              style={{
                height: '70px',
                borderRadius: 'var(--b-radius-level2)',
                background: idx === 1
                  ? 'var(--b-color-surface-elevated)'
                  : idx === 2
                  ? 'var(--b-color-surface-recessed)'
                  : idx === 3
                  ? 'var(--b-color-selection-surface)'
                  : 'var(--b-color-surface-inverse)',
                border: selectedImage === idx ? '2px solid var(--b-color-brand-primary)' : '1px solid var(--b-color-border-default)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: 'var(--b-typography-metadata-level2-size)', opacity: 0.8 }}>
                Asset #{idx}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Bubbles + Composer */}
      <div className="scene-section">
        <div className="scene-section-header">
          <h3 className="scene-section-title">Discussion channel</h3>
        </div>
        <div className="scene-card scene-card-recessed" data-annotate="--b-color-selection-surface">
          <div className="scene-chat-stack">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`scene-chat-bubble scene-chat-bubble-${m.direction}`}
                data-annotate={m.direction === 'out' ? '--b-color-brand-primary' : '--b-color-surface-elevated'}
              >
                <div className="scene-chat-text">{m.text}</div>
                <div className="scene-chat-time">{m.time}</div>
              </div>
            ))}
          </div>

          <div className="scene-chat-composer">
            <input
              type="text"
              className="scene-input scene-chat-input"
              placeholder="Send message..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <button
              type="button"
              className="scene-btn scene-btn-primary scene-btn-icon"
              onClick={handleSendMessage}
              aria-label="Send"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
