import React, { useState, useEffect, useRef, useMemo } from 'react';
import { StudioIntentStore } from './state/intentStore.js';
import type { BasisIntentState } from './state/serialize.js';
import { buildControlRegistry } from './controls/registry.js';
import { TopBar } from './shell/TopBar.js';
import { ControlPanel } from './shell/ControlPanel.js';
import { Stage } from './shell/Stage.js';
import { RightPane } from './shell/RightPane.js';
import type { StarterIntent, RailCategory } from './config/studio-ui.js';

interface StudioAppProps {
  initialIntentDoc: any;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class StudioErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Studio Error Boundary caught:', error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div
          className="studio-error-boundary-box"
          role="alert"
          style={{
            padding: '2rem',
            color: '#f85149',
            background: '#0d1117',
            height: '100vh',
            boxSizing: 'border-box',
          }}
        >
          <h2>Studio Encountered an Unexpected Error</h2>
          <pre
            style={{
              background: '#161b22',
              padding: '1rem',
              borderRadius: '6px',
              overflow: 'auto',
              color: '#e6edf3',
            }}
          >
            {this.state.error?.message || String(this.state.error)}
          </pre>
          <button
            type="button"
            className="scene-btn scene-btn-primary"
            style={{
              marginTop: '1rem',
              padding: '8px 16px',
              background: '#238636',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.location.reload();
              }
            }}
          >
            Reload Studio
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const StudioAppInner: React.FC<StudioAppProps> = ({ initialIntentDoc }) => {
  // 1. Build registry dynamically from passed intentDoc
  const registry = useMemo(() => buildControlRegistry(initialIntentDoc), [initialIntentDoc]);

  // 2. Isolated Store Instance
  const storeRef = useRef<StudioIntentStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = new StudioIntentStore({});
  }
  const store = storeRef.current;

  // 3. Store State Mirror
  const [storeState, setStoreState] = useState(() => store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe((next) => {
      setStoreState({ ...next });
    });
    // Initial immediate resolution
    store.scheduleResolve(true);
    return () => {
      unsubscribe();
      store.destroy();
    };
  }, [store]);

  // 4. UI Themes & Modes
  const [globalTheme, setGlobalTheme] = useState<'light' | 'dark'>('dark');
  const [sceneTheme, setSceneTheme] = useState<'light' | 'dark'>('dark');
  const [activeCategory, setActiveCategory] = useState<RailCategory>('mood');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync global theme to html data-theme and localStorage
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const stored = localStorage.getItem('basis-theme');
      const existing = (stored === 'light' || stored === 'dark')
        ? stored
        : document.documentElement.getAttribute('data-theme');
      if (existing === 'light' || existing === 'dark') {
        setGlobalTheme(existing);
        setSceneTheme(existing);
        document.documentElement.setAttribute('data-theme', existing);
      }

      const handleThemeChange = (e: Event) => {
        const customEvent = e as CustomEvent<{ theme: 'light' | 'dark' }>;
        if (customEvent.detail?.theme) {
          setGlobalTheme(customEvent.detail.theme);
        }
      };
      window.addEventListener('basis-theme-change', handleThemeChange);
      return () => window.removeEventListener('basis-theme-change', handleThemeChange);
    }
  }, []);

  const handleToggleGlobalTheme = () => {
    const next = globalTheme === 'dark' ? 'light' : 'dark';
    setGlobalTheme(next);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', next);
      try {
        localStorage.setItem('basis-theme', next);
      } catch (_) {}
      window.dispatchEvent(new CustomEvent('basis-theme-change', { detail: { theme: next } }));
    }
  };

  const handleToggleSceneTheme = () => {
    setSceneTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Keyboard undo/redo shortcuts outside editor
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInput =
        activeEl?.tagName === 'INPUT' ||
        activeEl?.tagName === 'TEXTAREA' ||
        activeEl?.classList?.contains('cm-content');

      if (!isInput) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
          if (e.shiftKey) {
            e.preventDefault();
            if (store.canRedo()) store.redo();
          } else {
            e.preventDefault();
            if (store.canUndo()) store.undo();
          }
        } else if ((e.metaKey || e.ctrlKey) && (e.key === 'y' || e.key === 'Y')) {
          e.preventDefault();
          if (store.canRedo()) store.redo();
        }
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [store]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Actions
  const handleSet = (pointer: string, value: any, immediate = false) => {
    store.set(pointer, value, immediate);
  };

  const handleUnset = (pointer: string) => {
    store.unset(pointer);
  };

  const handleResetAll = () => {
    store.reset();
  };

  const handleSelectStarter = (starter: StarterIntent) => {
    store.setIntent(starter.intent, true);
  };

  const handleApplyIntentFromEditor = (newIntent: BasisIntentState) => {
    store.setIntent(newIntent, true);
  };

  const violations = useMemo(() => {
    if (storeState.currentResult && !storeState.currentResult.ok) {
      return storeState.currentResult.violations;
    }
    return storeState.currentResult?.violations || [];
  }, [storeState.currentResult]);

  const isSuccess = Boolean(storeState.currentResult?.ok);
  const report = storeState.currentResult?.ok ? storeState.currentResult.report : storeState.lastGoodResult?.report || null;
  const activeTokens =
    sceneTheme === 'dark'
      ? storeState.lastGoodResult?.tokens.dark || {}
      : storeState.lastGoodResult?.tokens.light || {};

  const kinds = storeState.lastGoodResult?.tokens.kinds || {};
  const groups = storeState.lastGoodResult?.tokens.groups || {};
  const allowedModes = storeState.intent.control?.mode?.targets || ['Light', 'Dark'];

  return (
    <div className="studio-app-root" data-theme={globalTheme}>
      {/* Top Bar */}
      <TopBar
        canUndo={store.canUndo()}
        canRedo={store.canRedo()}
        onUndo={() => store.undo()}
        onRedo={() => store.redo()}
        onSelectStarter={handleSelectStarter}
        globalTheme={globalTheme}
        onToggleGlobalTheme={handleToggleGlobalTheme}
      />

      {/* Main Workspace (3 columns: LeftPane, Stage, RightPane) */}
      <div className="studio-workspace-columns">
        {/* Left Pane: Controls */}
        <ControlPanel
          intent={storeState.intent}
          registry={registry}
          onSet={handleSet}
          onUnset={handleUnset}
          onResetAll={handleResetAll}
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
          violations={violations}
        />

        {/* Center: Stage */}
        <Stage
          lastGoodResult={storeState.lastGoodResult}
          sceneTheme={sceneTheme}
          onToggleSceneTheme={handleToggleSceneTheme}
          allowedModes={allowedModes}
          latencyMs={storeState.resolveLatencyMs}
          onCopyNotification={showToast}
        />

        {/* Right Pane: Report, Tokens, Editor */}
        <RightPane
          isSuccess={isSuccess}
          report={report}
          violations={violations}
          tokens={activeTokens}
          kinds={kinds}
          groups={groups}
          intent={storeState.intent}
          onApplyIntent={handleApplyIntentFromEditor}
          durationMs={storeState.resolveLatencyMs}
          onNavigateToCategory={(cat) => setActiveCategory(cat)}
          onCopyNotification={showToast}
        />
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="studio-global-toast" role="status" aria-live="polite">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export const StudioApp: React.FC<StudioAppProps> = (props) => {
  return (
    <StudioErrorBoundary>
      <StudioAppInner {...props} />
    </StudioErrorBoundary>
  );
};

export default StudioApp;
