import React, { useState } from 'react';
import { HomeScreen } from './screens/HomeScreen.js';
import { TasksScreen } from './screens/TasksScreen.js';
import { GoalsScreen } from './screens/GoalsScreen.js';
import { ActivityScreen } from './screens/ActivityScreen.js';
import { ProfileScreen } from './screens/ProfileScreen.js';
import { LibraryScreen } from './screens/LibraryScreen.js';

export type SceneTab = 'home' | 'tasks' | 'goals' | 'activity' | 'profile' | 'library';

interface SceneAppProps {
  initialTab?: SceneTab;
}

export const SceneApp: React.FC<SceneAppProps> = ({ initialTab = 'home' }) => {
  const [activeTab, setActiveTab] = useState<SceneTab>(initialTab);

  const navItems: { id: SceneTab; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'tasks', label: 'Tasks', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
    { id: 'goals', label: 'Goals', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { id: 'activity', label: 'Activity', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
    { id: 'profile', label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  ];

  return (
    <div className="scene-root" data-studio-scope="scene" data-part="scene-root">
      {/* Status Bar */}
      <div className="scene-status-bar" data-part="status-bar" data-annotate="--b-color-surface-default">
        <span className="scene-status-time">9:41</span>
        <div className="scene-status-icons" aria-hidden="true">
          {/* Signal */}
          <svg width="14" height="10" viewBox="0 0 17 11" fill="currentColor">
            <rect y="7" width="3" height="4" rx="0.5" />
            <rect x="4.5" y="5" width="3" height="6" rx="0.5" />
            <rect x="9" y="2.5" width="3" height="8.5" rx="0.5" />
            <rect x="13.5" width="3" height="11" rx="0.5" />
          </svg>
          {/* Wifi */}
          <svg width="13" height="10" viewBox="0 0 16 12" fill="currentColor">
            <path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-3.5-3a5 5 0 017 0 .75.75 0 01-1.06 1.06 3.5 3.5 0 00-4.88 0A.75.75 0 014.5 6.5zm-3-3a9 9 0 0113 0 .75.75 0 11-1.06 1.06 7.5 7.5 0 00-10.88 0A.75.75 0 011.5 3.5z" />
          </svg>
          {/* Battery */}
          <svg width="20" height="10" viewBox="0 0 25 12" fill="currentColor">
            <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" fill="none" stroke="currentColor" />
            <rect x="2" y="2" width="14" height="8" rx="2" />
            <path d="M23 4.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* App Header */}
      <header className="scene-header" data-part="app-header" data-annotate="--b-color-surface-default">
        <div className="scene-header-left">
          <svg className="scene-header-logo" viewBox="0 0 24 24" fill="none" stroke="var(--b-color-brand-primary)" strokeWidth="2.5" width="22" height="22">
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
          </svg>
          <span className="scene-header-title">Basis</span>
        </div>

        <div className="scene-header-actions">
          <button
            type="button"
            className="scene-icon-btn"
            aria-label="Search"
            onClick={() => setActiveTab('tasks')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>

          <button
            type="button"
            className="scene-icon-btn scene-bell-btn"
            aria-label="Notifications"
            onClick={() => setActiveTab('activity')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
            <span className="scene-badge-dot" data-annotate="--b-color-negative-surface" />
          </button>

          <div
            className="scene-avatar scene-header-avatar"
            onClick={() => setActiveTab('profile')}
            role="button"
            tabIndex={0}
            aria-label="Open profile"
          >
            <svg viewBox="0 0 32 32" className="scene-avatar-svg">
              <circle cx="16" cy="16" r="15" fill="var(--b-color-surface-recessed)" />
              <circle cx="16" cy="12" r="5" fill="var(--b-color-brand-primary)" />
              <path d="M7 26c0-5 4-8 9-8s9 3 9 8" fill="var(--b-color-brand-primary)" />
            </svg>
          </div>
        </div>
      </header>

      {/* Screen Body */}
      <main className="scene-body" data-part="screen-content">
        {activeTab === 'home' && (
          <HomeScreen
            onOpenLibrary={() => setActiveTab('library')}
            onOpenNewTask={() => setActiveTab('tasks')}
          />
        )}
        {activeTab === 'tasks' && <TasksScreen />}
        {activeTab === 'goals' && <GoalsScreen />}
        {activeTab === 'activity' && <ActivityScreen />}
        {activeTab === 'profile' && <ProfileScreen />}
        {activeTab === 'library' && (
          <LibraryScreen onBack={() => setActiveTab('home')} />
        )}
      </main>

      {/* Floating Action Button (FAB) */}
      <button
        type="button"
        className="scene-fab"
        data-annotate="--b-color-brand-primary"
        aria-label="Create item"
        onClick={() => setActiveTab('tasks')}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      {/* Bottom Navigation */}
      <nav className="scene-bottom-nav" role="tablist" aria-label="Scene navigation" data-annotate="--b-color-surface-default">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            data-tab={item.id}
            aria-selected={activeTab === item.id}
            data-active={activeTab === item.id}
            className="scene-nav-item"
            onClick={() => setActiveTab(item.id)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <path d={item.icon} />
            </svg>
            <span className="scene-nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};
