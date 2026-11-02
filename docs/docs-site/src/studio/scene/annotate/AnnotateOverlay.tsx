import React, { useEffect, useState, useRef } from 'react';
import { getConsumersForToken } from '../tokenIndex.js';

interface PinData {
  id: string;
  tokenVar: string;
  x: number;
  y: number;
  width: number;
  height: number;
  consumedTokens: string[];
}

interface AnnotateOverlayProps {
  containerRef: React.RefObject<HTMLElement | null>;
  tokens: Record<string, string>;
  active: boolean;
  onCopyNotification?: (msg: string) => void;
}

export const AnnotateOverlay: React.FC<AnnotateOverlayProps> = ({
  containerRef,
  tokens,
  active,
  onCopyNotification,
}) => {
  const [pins, setPins] = useState<PinData[]>([]);
  const [selectedPin, setSelectedPin] = useState<PinData | null>(null);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // Scan for data-annotate elements inside container
  const updatePins = () => {
    if (!containerRef.current || !active) {
      setPins([]);
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const elements = containerRef.current.querySelectorAll('[data-annotate]');
    const newPins: PinData[] = [];

    elements.forEach((el, index) => {
      const tokenVar = el.getAttribute('data-annotate');
      if (!tokenVar) return;

      const rect = el.getBoundingClientRect();
      // Relative coordinates
      const x = rect.left - containerRect.left;
      const y = rect.top - containerRect.top;

      // Extract class names or tag to find consumed tokens
      const classList = Array.from(el.classList).map((c) => `.${c}`);
      const consumed = new Set<string>();
      consumed.add(tokenVar);

      // Check if visible
      if (rect.width > 0 && rect.height > 0) {
        newPins.push({
          id: `${tokenVar}-${index}`,
          tokenVar,
          x: Math.round(x + rect.width / 2),
          y: Math.round(y + rect.height / 2),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          consumedTokens: Array.from(consumed),
        });
      }
    });

    setPins(newPins);
  };

  useEffect(() => {
    if (!active) {
      setPins([]);
      setSelectedPin(null);
      return;
    }

    updatePins();

    // Recompute on resize or DOM changes
    const observer = new ResizeObserver(() => updatePins());
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleScroll = () => updatePins();
    containerRef.current?.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      containerRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [active, containerRef.current]);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedToken(text);
      if (onCopyNotification) {
        onCopyNotification(`Copied ${label}: ${text}`);
      }
      setTimeout(() => setCopiedToken(null), 2000);
    } catch {
      // Fallback
      setCopiedToken(text);
    }
  };

  if (!active || pins.length === 0) return null;

  return (
    <div className="scene-annotate-overlay" aria-label="Token annotations overlay">
      {pins.map((pin) => {
        const isSelected = selectedPin?.id === pin.id;
        return (
          <div
            key={pin.id}
            className="scene-annotate-pin-wrapper"
            style={{
              position: 'absolute',
              left: `${pin.x}px`,
              top: `${pin.y}px`,
              transform: 'translate(-50%, -50%)',
              zIndex: isSelected ? 40 : 30,
            }}
          >
            <button
              type="button"
              className="scene-annotate-pin-dot"
              data-active={isSelected}
              aria-label={`Inspect token ${pin.tokenVar}`}
              aria-expanded={isSelected}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPin(isSelected ? null : pin);
              }}
            >
              <span className="scene-pin-inner" />
            </button>

            {isSelected && (
              <div
                className="scene-annotate-popover"
                role="dialog"
                aria-label={`Token details for ${pin.tokenVar}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="scene-popover-header">
                  <span className="scene-popover-title">Consumed Tokens</span>
                  <button
                    type="button"
                    className="scene-icon-btn scene-popover-close"
                    onClick={() => setSelectedPin(null)}
                    aria-label="Close popover"
                  >
                    ×
                  </button>
                </div>

                <div className="scene-popover-tokens">
                  {pin.consumedTokens.map((tVar) => {
                    const currentVal = tokens[tVar] || 'inherit';
                    return (
                      <div key={tVar} className="scene-popover-token-row">
                        <div
                          className="scene-popover-token-info"
                          onClick={() => copyToClipboard(tVar, 'token name')}
                          title="Click to copy token name"
                          role="button"
                          tabIndex={0}
                        >
                          <span className="scene-popover-token-name">{tVar}</span>
                          <span className="scene-popover-token-val">{currentVal}</span>
                        </div>
                        <div className="scene-popover-copy-actions">
                          <button
                            type="button"
                            className="scene-chip scene-chip-sm"
                            onClick={() => copyToClipboard(tVar, 'token')}
                          >
                            {copiedToken === tVar ? 'Copied' : 'Name'}
                          </button>
                          <button
                            type="button"
                            className="scene-chip scene-chip-sm"
                            onClick={() => copyToClipboard(currentVal, 'value')}
                          >
                            Val
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
