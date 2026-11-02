import React, { useRef, useEffect, useState } from 'react';
import type { StudioSuccessResult } from '../state/resolveClient.js';
import { SceneFrame } from '../scene/SceneFrame.js';

interface StageProps {
  lastGoodResult: StudioSuccessResult | null;
  sceneTheme: 'light' | 'dark';
  onToggleSceneTheme: () => void;
  allowedModes?: string[];
  latencyMs: number;
  onCopyNotification?: (msg: string) => void;
}

export const Stage: React.FC<StageProps> = ({
  lastGoodResult,
  sceneTheme,
  onToggleSceneTheme,
  allowedModes = ['Light', 'Dark'],
  latencyMs,
  onCopyNotification,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [annotateActive, setAnnotateActive] = useState(false);

  // Compute responsive scale so phone frame fits available height without scrolling
  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      if (!container) return;

      const availWidth = container.clientWidth - 40;
      const availHeight = container.clientHeight - 80; // account for top stage controls bar
      const baseWidth = 390;
      const baseHeight = 844;

      const scaleX = availWidth / baseWidth;
      const scaleY = availHeight / baseHeight;
      const nextScale = Math.min(1, Math.min(scaleX, scaleY));
      setScale(Math.max(0.4, nextScale));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check if target modes permit the other mode
  const targetMode = sceneTheme === 'dark' ? 'Light' : 'Dark';
  const isModeAllowed = allowedModes.includes(targetMode);

  const activeTokens =
    sceneTheme === 'dark'
      ? lastGoodResult?.tokens.dark || {}
      : lastGoodResult?.tokens.light || {};

  return (
    <section className="studio-stage-main" ref={containerRef} aria-label="Interactive Preview Stage" data-part="center-stage">
      {/* Top Bar Above Frame: Annotate Toggle (Left) & Scene Theme Toggle (Right) */}
      <div className="stage-controls-bar">
        <div className="stage-controls-left">
          <button
            type="button"
            className={`studio-btn btn-secondary btn-sm ${annotateActive ? 'is-active' : ''}`}
            onClick={() => setAnnotateActive(!annotateActive)}
            aria-pressed={annotateActive}
            aria-label="Toggle token annotations"
          >
            <span className="annotate-indicator-dot" />
            <span>Annotate tokens</span>
          </button>
        </div>

        <div className="stage-controls-right">
          <span className="stage-latency-pill">
            {latencyMs > 0 ? `${latencyMs.toFixed(1)} ms` : 'Idle'}
          </span>

          <button
            type="button"
            className="studio-btn btn-secondary btn-sm"
            onClick={onToggleSceneTheme}
            disabled={!isModeAllowed}
            title={
              !isModeAllowed
                ? `Mode "${targetMode}" is excluded in control.mode.targets`
                : `Switch phone preview to ${targetMode} mode`
            }
            aria-label={`Toggle scene theme mode (current: ${sceneTheme})`}
          >
            {sceneTheme === 'dark' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </div>

      {/* Frame Scaler Container */}
      <div className="stage-viewport-center">
        <div
          className="stage-scaler-box"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
          }}
        >
          <SceneFrame
            sceneMode={sceneTheme}
            annotateActive={annotateActive}
            tokens={activeTokens}
            cssVars={activeTokens}
            onCopyNotification={onCopyNotification}
          />
        </div>
      </div>
    </section>
  );
};
