import React, { useState } from 'react';

interface PreviewProps {
  tokenName: string;
  value: string;
  kind: string;
}

export const ColorPreview: React.FC<{ value: string }> = ({ value }) => (
  <div className="preview-color-swatch-box" title={value}>
    <div className="preview-checkerboard" />
    <div className="preview-color-fill" style={{ backgroundColor: value }} />
  </div>
);

export const TypographyPreview: React.FC<{ value: string; kind: string; tokenName: string }> = ({
  value,
  kind,
  tokenName,
}) => {
  if (kind === 'font-family' || tokenName.includes('family')) {
    return (
      <span className="preview-type-sample" style={{ fontFamily: value }}>
        Aa Font
      </span>
    );
  }
  if (kind === 'weight' || tokenName.includes('weight')) {
    return (
      <span className="preview-type-sample" style={{ fontWeight: Number(value) || value }}>
        Weight {value}
      </span>
    );
  }
  if (kind === 'multiplier' || tokenName.includes('line-height') || tokenName.includes('letter-spacing')) {
    return (
      <span className="preview-type-sample" style={{ fontSize: '11px', opacity: 0.85 }}>
        {value}
      </span>
    );
  }
  return (
    <span className="preview-type-sample" style={{ font: value }}>
      Aa Gg 123
    </span>
  );
};

export const RadiusPreview: React.FC<{ value: string }> = ({ value }) => (
  <div
    className="preview-radius-box"
    style={{ borderRadius: value }}
    title={`border-radius: ${value}`}
  />
);

export const DimensionPreview: React.FC<{ value: string }> = ({ value }) => {
  const num = parseInt(value, 10);
  const widthPx = isNaN(num) ? 24 : Math.min(Math.max(num, 4), 64);
  return (
    <div className="preview-dimension-wrapper" title={value}>
      <div className="preview-dimension-bar" style={{ width: `${widthPx}px` }} />
    </div>
  );
};

export const DepthPreview: React.FC<{ value: string }> = ({ value }) => (
  <div
    className="preview-depth-card"
    style={{ boxShadow: value }}
    title={`box-shadow: ${value}`}
  />
);

export const DurationPreview: React.FC<{ value: string }> = ({ value }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className="preview-duration-box"
      onMouseEnter={() => setPlaying(true)}
      onMouseLeave={() => setPlaying(false)}
      onClick={() => setPlaying(!playing)}
      title={`Duration: ${value} (hover/tap to play)`}
      role="button"
      tabIndex={0}
    >
      <div
        className="preview-duration-indicator"
        style={{
          transitionDuration: value,
          transform: playing ? 'translateX(20px)' : 'translateX(0)',
        }}
      />
    </div>
  );
};

export const EasingPreview: React.FC<{ value: string }> = ({ value }) => (
  <div className="preview-easing-box" title={value}>
    <svg viewBox="0 0 32 32" className="preview-easing-svg">
      <path d="M 4 28 C 12 28 20 4 28 4" fill="none" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  </div>
);

/**
 * Dispatches preview renderer based on token kind.
 */
export const TokenPreview: React.FC<PreviewProps> = ({ tokenName, value, kind }) => {
  const normalizedKind = kind.toLowerCase();

  switch (normalizedKind) {
    case 'color':
    case 'opacity':
    case 'gradient':
      return <ColorPreview value={value} />;

    case 'radius':
      return <RadiusPreview value={value} />;

    case 'dimension':
    case 'spacing':
    case 'size':
    case 'size.icon':
    case 'size.control':
      return <DimensionPreview value={value} />;

    case 'shadow':
    case 'depth':
    case 'elevation':
      return <DepthPreview value={value} />;

    case 'duration':
    case 'motion':
      return <DurationPreview value={value} />;

    case 'easing':
      return <EasingPreview value={value} />;

    case 'typography':
    case 'font-family':
    case 'weight':
    case 'multiplier':
      return <TypographyPreview value={value} kind={normalizedKind} tokenName={tokenName} />;

    default:
      console.warn(`[TokenPreview] Unhandled token kind: "${kind}" for token "${tokenName}".`);
      return <span className="preview-plain-value">{value}</span>;
  }
};
