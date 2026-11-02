import React, { useState } from 'react';

interface HomeScreenProps {
  onOpenLibrary: () => void;
  onOpenNewTask?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onOpenLibrary, onOpenNewTask }) => {
  const [selectedTile, setSelectedTile] = useState('library');
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Review system design tokens', done: true },
    { id: '2', title: 'Verify contrast ratios in dark mode', done: false },
    { id: '3', title: 'Audit focus rings and touch targets', done: false },
  ]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const actionTiles = [
    { id: 'library', label: 'Library', icon: 'M4 6h16M4 12h16M4 18h7' },
    { id: 'metrics', label: 'Metrics', icon: 'M3 3v18h18M7 14l4-4 4 4 5-6' },
    { id: 'reports', label: 'Reports', icon: 'M9 17v-6m3 6v-3m3 3v-8m3 8v-5' },
    { id: 'files', label: 'Files', icon: 'M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z' },
    { id: 'sync', label: 'Sync', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
    { id: 'security', label: 'Security', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
    { id: 'settings', label: 'Settings', icon: 'M12 15a3 3 0 100-6 3 3 0 000 6z' },
    { id: 'support', label: 'Help', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01' },
  ];

  return (
    <div className="scene-screen scene-screen-home" data-part="home-screen">
      {/* Hero Card */}
      <div className="scene-card scene-hero" data-annotate="--b-color-brand-primary" data-part="hero">
        <div className="scene-hero-illustration" aria-hidden="true">
          <svg viewBox="0 0 120 120" className="scene-hero-svg">
            <circle cx="60" cy="60" r="50" fill="var(--b-color-brand-primary)" opacity="0.15" />
            <circle cx="60" cy="60" r="36" fill="var(--b-color-brand-secondary)" opacity="0.25" />
            <circle cx="60" cy="60" r="22" fill="var(--b-color-brand-tertiary)" opacity="0.35" />
            <circle cx="60" cy="60" r="10" fill="var(--b-color-brand-primary)" />
          </svg>
        </div>
        <div className="scene-hero-content">
          <h2 className="scene-hero-title">Build, track, and grow</h2>
          <p className="scene-hero-subtitle">Interactive token-driven mobile interface</p>
          <div className="scene-hero-actions">
            <button
              type="button"
              className="scene-btn scene-btn-primary"
              data-annotate="--b-color-brand-primary"
              onClick={onOpenNewTask}
            >
              Get started
            </button>
            <button
              type="button"
              className="scene-btn scene-btn-outlined"
              data-annotate="--b-color-border-default"
              onClick={onOpenLibrary}
            >
              View library
            </button>
          </div>
        </div>
      </div>

      {/* 2x4 Quick Action Grid */}
      <div className="scene-section">
        <div className="scene-section-header">
          <h3 className="scene-section-title">Quick actions</h3>
        </div>
        <div className="scene-grid-actions" data-part="action-grid">
          {actionTiles.map((tile) => (
            <button
              key={tile.id}
              type="button"
              className="scene-grid-tile"
              data-selected={selectedTile === tile.id}
              data-annotate={tile.id === 'library' ? '--b-color-surface-elevated' : undefined}
              onClick={() => {
                setSelectedTile(tile.id);
                if (tile.id === 'library') {
                  onOpenLibrary();
                }
              }}
            >
              <div className="scene-grid-tile-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={tile.icon} />
                </svg>
              </div>
              <span className="scene-grid-tile-label">{tile.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Progress & Mini Charts */}
      <div className="scene-section">
        <div className="scene-section-header">
          <h3 className="scene-section-title">Overview metrics</h3>
        </div>
        <div className="scene-card scene-progress-card" data-annotate="--b-color-positive-surface">
          <div className="scene-progress-info">
            <div className="scene-metric-large">84%</div>
            <div className="scene-metric-label">System health · +12% this week</div>
          </div>
          <div className="scene-chart-container" aria-hidden="true">
            <div className="scene-chart-bars">
              <div className="scene-chart-bar scene-chart-bar-positive" style={{ height: '65%' }} />
              <div className="scene-chart-bar scene-chart-bar-positive" style={{ height: '85%' }} />
              <div className="scene-chart-bar scene-chart-bar-caution" style={{ height: '45%' }} />
              <div className="scene-chart-bar scene-chart-bar-positive" style={{ height: '90%' }} />
              <div className="scene-chart-bar scene-chart-bar-negative" style={{ height: '30%' }} />
              <div className="scene-chart-bar scene-chart-bar-positive" style={{ height: '75%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Task List Preview */}
      <div className="scene-section">
        <div className="scene-section-header">
          <h3 className="scene-section-title">Recent items</h3>
          <span className="scene-badge">{tasks.filter((t) => t.done).length}/{tasks.length}</span>
        </div>
        <div className="scene-card scene-card-recessed" data-annotate="--b-color-surface-recessed">
          <div className="scene-list">
            {tasks.map((task) => (
              <div key={task.id} className="scene-list-item" onClick={() => toggleTask(task.id)}>
                <div
                  className="scene-checkbox"
                  data-checked={task.done}
                  role="checkbox"
                  aria-checked={task.done}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      toggleTask(task.id);
                    }
                  }}
                >
                  {task.done && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <div className="scene-item-text">
                  <div className="scene-item-title" style={{ textDecoration: task.done ? 'line-through' : 'none', opacity: task.done ? 0.6 : 1 }}>
                    {task.title}
                  </div>
                  <div className="scene-item-sub">Updated recently</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
