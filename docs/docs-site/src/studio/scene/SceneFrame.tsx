import React, { useRef } from 'react';
import { SceneApp } from './App.js';
import { AnnotateOverlay } from './annotate/AnnotateOverlay.js';

interface SceneFrameProps {
  sceneMode: 'light' | 'dark';
  annotateActive: boolean;
  tokens: Record<string, string>;
  cssVars?: Record<string, string>;
  onCopyNotification?: (msg: string) => void;
}

export const SceneFrame: React.FC<SceneFrameProps> = ({
  sceneMode,
  annotateActive,
  tokens,
  cssVars,
  onCopyNotification,
}) => {
  const sceneContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="studio-phone-bezel" data-part="phone-bezel">
      {/* Speaker and Camera notch */}
      <div className="studio-phone-speaker-notch" aria-hidden="true">
        <div className="studio-phone-camera-lens" />
      </div>

      {/* Screen container with isolated CSS scope */}
      <div
        ref={sceneContainerRef}
        className="studio-phone-screen"
        data-studio-scope="scene"
        data-theme={sceneMode}
        style={cssVars as React.CSSProperties}
      >
        <SceneApp />
        <AnnotateOverlay
          containerRef={sceneContainerRef}
          tokens={tokens}
          active={annotateActive}
          onCopyNotification={onCopyNotification}
        />
      </div>

      {/* Home Indicator bar */}
      <div className="studio-phone-home-indicator" aria-hidden="true" />
    </div>
  );
};
