export interface LandingPalette {
  accent: string;
  accentGlow: string;
  btnText: string;
  secondary: string;
  tertiary: string;
  underglowCenter: string;
  underglowLeft: string;
  underglowRight: string;
  underglowTop: string;
  orbGradient: string;
  orbShadow: string;
  orbInnerShadow: string;
  orbitStroke: string;
  orbitInner: string;
  orbitOuter: string;
  orbitMid: string;
  orbitFaint: string;
  node1: string;
  node2: string;
  node3: string;
  nodeAccent: string;
  btnGradient: string;
  btnShadow: string;
  btnRadius: string;
  cardRadius: string;
  previewWindowRadius: string;
  moodFontWeight: string;
  previewWindowBorder: string;
  previewWindowShadow: string;
  previewWindowBg: string;
  previewWindowBorderLight: string;
  previewWindowShadowLight: string;
  previewWindowBgLight: string;
  cardBg: string;
  cardBorder: string;
  cardBgLight: string;
  cardBorderLight: string;
  featureCardBg: string;
  featureCardBorder: string;
  featureCardBgLight: string;
  featureCardBorderLight: string;
  radii: {
    level1: string;
    level2: string;
    level3: string;
    level4: string;
  };
}

interface BrandThemeDef {
  accent: string;
  btnText: string;
  secondary: string;
  tertiary: string;
  node1: string;
  node2: string;
  node3: string;
  nodeAccent: string;
  btnGradient: string;
  btnGlowHues: [string, string];
  orbGradStops: [string, string, string, string, string, string];
  orbShadowHues: [string, string, string];
  underglowLeft: string;
  underglowCenter: string;
  underglowRight: string;
  underglowTop: string;
}

const BRAND_THEMES: Record<string, BrandThemeDef> = {
  // 1. Blue (#3b82f6) - Default Cosmic Azure
  '#3b82f6': {
    accent: '#3b82f6',
    btnText: '#ffffff',
    secondary: '#6366f1',
    tertiary: '#00f0ff',
    node1: '#c084fc',
    node2: '#38bdf8',
    node3: '#818cf8',
    nodeAccent: '#f97316',
    btnGradient: 'linear-gradient(90deg, #4f46e5 0%, #6366f1 45%, #93c5fd 100%)',
    btnGlowHues: ['rgba(99, 102, 241, 0.55)', 'rgba(147, 197, 253, 0.4)'],
    orbGradStops: ['#38bdf8', '#3b82f6', '#6366f1', '#a855f7', '#ec4899', '#0a0d18'],
    orbShadowHues: ['rgba(168, 85, 247, 0.5)', 'rgba(99, 102, 241, 0.4)', 'rgba(59, 130, 246, 0.25)'],
    underglowLeft: 'rgba(20, 184, 166, 0.16)', // Harmonic deep teal on left!
    underglowCenter: 'rgba(124, 58, 237, 0.24)', // Royal violet behind orb
    underglowRight: 'rgba(59, 130, 246, 0.22)', // Azure on preview flank
    underglowTop: 'rgba(99, 102, 241, 0.18)',
  },

  // 2. Orange (#f97316) - Warm Solar Nebula with Deep Violet Contrast
  '#f97316': {
    accent: '#f97316',
    btnText: '#ffffff',
    secondary: '#ec4899',
    tertiary: '#fbbf24',
    node1: '#fbbf24',
    node2: '#c084fc',
    node3: '#f97316',
    nodeAccent: '#22d3ee', // Cyan spark complement
    btnGradient: 'linear-gradient(90deg, #ea580c 0%, #f97316 48%, #fcd34d 100%)',
    btnGlowHues: ['rgba(249, 115, 22, 0.6)', 'rgba(251, 191, 36, 0.4)'],
    orbGradStops: ['#fb923c', '#ea580c', '#e11d48', '#9333ea', '#4f46e5', '#130820'],
    orbShadowHues: ['rgba(249, 115, 22, 0.55)', 'rgba(225, 29, 72, 0.4)', 'rgba(124, 58, 237, 0.3)'],
    underglowLeft: 'rgba(168, 85, 247, 0.16)', // Deep cosmic violet complement on left!
    underglowCenter: 'rgba(249, 115, 22, 0.24)', // Warm solar glow in center
    underglowRight: 'rgba(244, 63, 94, 0.18)', // Rose/magenta under preview
    underglowTop: 'rgba(251, 146, 60, 0.18)',
  },

  // 3. Cyan (#00f2fe / #00f0ff) - Electric Cybernetic Aurora
  '#00f2fe': {
    accent: '#00f0ff',
    btnText: '#06131c',
    secondary: '#8b5cf6',
    tertiary: '#3b82f6',
    node1: '#00f0ff',
    node2: '#c084fc',
    node3: '#60a5fa',
    nodeAccent: '#f43f5e', // Rose spark complement
    btnGradient: 'linear-gradient(90deg, #0284c7 0%, #00f0ff 52%, #cffafe 100%)',
    btnGlowHues: ['rgba(0, 240, 255, 0.6)', 'rgba(14, 165, 233, 0.4)'],
    orbGradStops: ['#00f0ff', '#0284c7', '#4f46e5', '#9333ea', '#db2777', '#060b18'],
    orbShadowHues: ['rgba(0, 240, 255, 0.55)', 'rgba(59, 130, 246, 0.4)', 'rgba(124, 58, 237, 0.3)'],
    underglowLeft: 'rgba(0, 240, 255, 0.18)', // Luminous cyan on left
    underglowCenter: 'rgba(124, 58, 237, 0.24)', // Violet depths in center
    underglowRight: 'rgba(99, 102, 241, 0.2)', // Indigo under preview
    underglowTop: 'rgba(0, 240, 255, 0.16)',
  },

  // 4. Purple (#8b5cf6) - Luminous Nebula & Amethyst Mystery
  '#8b5cf6': {
    accent: '#a855f7',
    btnText: '#ffffff',
    secondary: '#ec4899',
    tertiary: '#06b6d4',
    node1: '#c084fc',
    node2: '#f472b6',
    node3: '#22d3ee',
    nodeAccent: '#fbbf24', // Golden star complement
    btnGradient: 'linear-gradient(90deg, #7c3aed 0%, #a855f7 50%, #f0abfc 100%)',
    btnGlowHues: ['rgba(168, 85, 247, 0.6)', 'rgba(236, 72, 153, 0.4)'],
    orbGradStops: ['#c084fc', '#9333ea', '#db2777', '#6366f1', '#38bdf8', '#0e041a'],
    orbShadowHues: ['rgba(168, 85, 247, 0.55)', 'rgba(219, 39, 119, 0.4)', 'rgba(6, 182, 212, 0.25)'],
    underglowLeft: 'rgba(6, 182, 212, 0.16)', // Electric cyan complement on left!
    underglowCenter: 'rgba(168, 85, 247, 0.26)', // Deep nebula purple center
    underglowRight: 'rgba(219, 39, 119, 0.2)', // Fuchsia under preview
    underglowTop: 'rgba(192, 132, 252, 0.18)',
  },

  // 5. Rose (#f43f5e) - Radiant Sunset Bloom with Violet Depths
  '#f43f5e': {
    accent: '#f43f5e',
    btnText: '#ffffff',
    secondary: '#8b5cf6',
    tertiary: '#fb923c',
    node1: '#fb7185',
    node2: '#a855f7',
    node3: '#fbbf24',
    nodeAccent: '#06b6d4', // Cyan spark complement
    btnGradient: 'linear-gradient(90deg, #e11d48 0%, #f43f5e 50%, #fbcfe8 100%)',
    btnGlowHues: ['rgba(244, 63, 94, 0.6)', 'rgba(251, 113, 133, 0.4)'],
    orbGradStops: ['#fb7185', '#e11d48', '#9333ea', '#4f46e5', '#06b6d4', '#14030d'],
    orbShadowHues: ['rgba(244, 63, 94, 0.55)', 'rgba(139, 92, 246, 0.4)', 'rgba(251, 146, 60, 0.25)'],
    underglowLeft: 'rgba(251, 146, 60, 0.16)', // Warm amber on left!
    underglowCenter: 'rgba(244, 63, 94, 0.24)', // Vivid rose center
    underglowRight: 'rgba(139, 92, 246, 0.2)', // Violet under preview
    underglowTop: 'rgba(251, 113, 133, 0.18)',
  },
};

function adjustAlpha(color: string, factor: number): string {
  const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!m) return color;
  const [, r, g, b, a = '1'] = m;
  const newAlpha = Math.min(0.95, Math.max(0.04, parseFloat(a) * factor)).toFixed(3);
  return `rgba(${r}, ${g}, ${b}, ${newAlpha})`;
}

export function computeLandingPalette(
  brandHexInput: string | null,
  presenceInput: string | null,
  moodInput: string | null,
  isDark: boolean = true
): LandingPalette {
  const normHex = (brandHexInput || '#3b82f6').toLowerCase();
  const theme = BRAND_THEMES[normHex] || BRAND_THEMES['#3b82f6'];

  const presence = presenceInput || 'Balanced';
  const mood = moodInput || 'Calm';

  // Presence scales ambiance, radiance, and saturation factor with strict contrast safety
  const presenceScale = presence === 'Subtle' ? 0.6 : presence === 'Strong' ? 1.25 : 1.0;
  const glowFactor = presence === 'Subtle' ? 0.7 : presence === 'Strong' ? 1.15 : 1.0;

  // Mood determines geometry (radii), button silhouette, and font weight
  let radii = {
    level1: '6px',
    level2: '10px',
    level3: '14px',
    level4: '20px',
  };
  let btnRadius = '14px';
  let cardRadius = '16px';
  let previewWindowRadius = '18px';
  let moodFontWeight = '700';

  if (mood === 'Bold') {
    radii = {
      level1: '2px',
      level2: '4px',
      level3: '4px',
      level4: '6px',
    };
    btnRadius = '4px';
    cardRadius = '6px';
    previewWindowRadius = '8px';
    moodFontWeight = '800';
  } else if (mood === 'Playful') {
    radii = {
      level1: '12px',
      level2: '18px',
      level3: '26px',
      level4: '36px',
    };
    btnRadius = '9999px';
    cardRadius = '22px';
    previewWindowRadius = '26px';
    moodFontWeight = '700';
  }

  const [s1, s2, s3, s4, s5, s6] = theme.orbGradStops;
  const [sh1, sh2, sh3] = theme.orbShadowHues;
  const [g1, g2] = theme.btnGlowHues;

  const underglowCenter = adjustAlpha(theme.underglowCenter, presenceScale);
  const underglowLeft = adjustAlpha(theme.underglowLeft, presenceScale);
  const underglowRight = adjustAlpha(theme.underglowRight, presenceScale);
  const underglowTop = adjustAlpha(theme.underglowTop, presenceScale);

  const orbGradient = `radial-gradient(circle at 30% 26%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 18%), radial-gradient(circle at 36% 32%, ${s1} 0%, ${s2} 24%, ${s3} 46%, ${s4} 68%, ${s5} 86%, ${s6} 100%)`;
  const orbShadow = presence === 'Strong'
    ? `inset -10px -12px 24px rgba(0, 0, 0, 0.85), inset 2px 3px 8px rgba(255, 255, 255, 0.35), inset -2px -3px 12px ${sh1}, 0 0 38px ${sh1}, 0 0 75px ${sh2}, 0 12px 30px rgba(0, 0, 0, 0.7)`
    : presence === 'Subtle'
    ? `inset -10px -12px 24px rgba(0, 0, 0, 0.85), inset 2px 3px 8px rgba(255, 255, 255, 0.25), inset -2px -3px 12px ${sh1}, 0 0 20px ${sh1}, 0 0 45px ${sh2}, 0 12px 30px rgba(0, 0, 0, 0.7)`
    : `inset -10px -12px 24px rgba(0, 0, 0, 0.85), inset 2px 3px 8px rgba(255, 255, 255, 0.35), inset -2px -3px 12px ${sh1}, 0 0 30px ${sh1}, 0 0 60px ${sh2}, 0 12px 30px rgba(0, 0, 0, 0.7)`;

  const orbInnerShadow = `inset -10px -12px 24px rgba(0, 0, 0, 0.85), inset 2px 3px 8px rgba(255, 255, 255, 0.35), inset -2px -3px 12px ${sh1}`;

  const previewWindowBorder = `color-mix(in srgb, ${theme.accent} 35%, rgba(147, 158, 255, 0.3))`;
  const previewWindowShadow = `0 35px 85px rgba(0, 0, 0, 0.8), 0 0 ${Math.round(24 * glowFactor)}px 2px color-mix(in srgb, ${theme.accent} ${Math.round(40 * glowFactor)}%, transparent), 0 18px 48px 8px color-mix(in srgb, ${theme.secondary} ${Math.round(25 * glowFactor)}%, transparent), 0 0 90px 15px color-mix(in srgb, ${theme.tertiary} ${Math.round(12 * glowFactor)}%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.18)`;

  // Compute card backgrounds, borders, and shadows sensitive to Brand Presence
  let cardBg: string;
  let cardBorder: string;
  let cardBgLight: string;
  let cardBorderLight: string;

  let featureCardBg: string;
  let featureCardBorder: string;
  let featureCardBgLight: string;
  let featureCardBorderLight: string;

  let previewWindowBg: string;
  let previewWindowBorderDyn: string;
  let previewWindowShadowDyn: string;
  let previewWindowBgLight: string;
  let previewWindowBorderLight: string;
  let previewWindowShadowLight: string;

  if (presence === 'Strong') {
    // Contrast-safe brand presence (strictly preserves WCAG AA contrast)
    cardBg = `color-mix(in srgb, ${theme.accent} 5%, #10141e)`;
    cardBorder = `color-mix(in srgb, ${theme.accent} 20%, rgba(255, 255, 255, 0.09))`;
    cardBgLight = `color-mix(in srgb, ${theme.accent} 2.5%, #ffffff)`;
    cardBorderLight = `color-mix(in srgb, ${theme.accent} 15%, rgba(0, 0, 0, 0.1))`;

    featureCardBg = `color-mix(in srgb, ${theme.accent} 6%, rgba(255, 255, 255, 0.045))`;
    featureCardBorder = `color-mix(in srgb, ${theme.accent} 22%, rgba(255, 255, 255, 0.09))`;
    featureCardBgLight = `color-mix(in srgb, ${theme.accent} 3.5%, #f8fafc)`;
    featureCardBorderLight = `color-mix(in srgb, ${theme.accent} 16%, rgba(0, 0, 0, 0.1))`;

    previewWindowBg = `linear-gradient(165deg, color-mix(in srgb, ${theme.accent} 6%, #141828) 0%, color-mix(in srgb, ${theme.accent} 3%, #0f121e) 55%, #0a0c16 100%)`;
    previewWindowBorderDyn = `color-mix(in srgb, ${theme.accent} 32%, rgba(147, 158, 255, 0.32))`;
    previewWindowShadowDyn = `0 35px 85px rgba(0, 0, 0, 0.8), 0 0 24px 2px color-mix(in srgb, ${theme.accent} 35%, transparent), 0 16px 42px 6px color-mix(in srgb, ${theme.secondary} 22%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.18)`;

    previewWindowBgLight = `linear-gradient(165deg, color-mix(in srgb, ${theme.accent} 4%, #ffffff) 0%, #ffffff 100%)`;
    previewWindowBorderLight = `color-mix(in srgb, ${theme.accent} 22%, rgba(0, 0, 0, 0.12))`;
    previewWindowShadowLight = `0 20px 50px -10px color-mix(in srgb, ${theme.accent} 18%, transparent), 0 0 30px color-mix(in srgb, ${theme.secondary} 10%, transparent)`;
  } else if (presence === 'Subtle') {
    // Pure neutral, quiet surfaces with minimal brand tint
    cardBg = `rgba(16, 20, 30, 0.94)`;
    cardBorder = `rgba(255, 255, 255, 0.08)`;
    cardBgLight = `rgba(255, 255, 255, 0.92)`;
    cardBorderLight = `rgba(0, 0, 0, 0.08)`;

    featureCardBg = `rgba(255, 255, 255, 0.035)`;
    featureCardBorder = `rgba(255, 255, 255, 0.08)`;
    featureCardBgLight = `rgba(0, 0, 0, 0.025)`;
    featureCardBorderLight = `rgba(0, 0, 0, 0.08)`;

    previewWindowBg = `linear-gradient(165deg, rgba(20, 24, 38, 0.92) 0%, rgba(14, 17, 27, 0.95) 55%, rgba(9, 11, 18, 0.98) 100%)`;
    previewWindowBorderDyn = `rgba(255, 255, 255, 0.12)`;
    previewWindowShadowDyn = `0 35px 85px rgba(0, 0, 0, 0.8), 0 0 12px 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.12)`;

    previewWindowBgLight = `rgba(255, 255, 255, 0.95)`;
    previewWindowBorderLight = `rgba(0, 0, 0, 0.1)`;
    previewWindowShadowLight = `0 16px 40px rgba(0, 0, 0, 0.06)`;
  } else {
    // Balanced: tasteful, harmonious brand tinting (contrast safe)
    cardBg = `color-mix(in srgb, ${theme.accent} 3%, #10141e)`;
    cardBorder = `color-mix(in srgb, ${theme.accent} 14%, rgba(255, 255, 255, 0.08))`;
    cardBgLight = `color-mix(in srgb, ${theme.accent} 1.8%, #ffffff)`;
    cardBorderLight = `color-mix(in srgb, ${theme.accent} 12%, rgba(0, 0, 0, 0.09))`;

    featureCardBg = `color-mix(in srgb, ${theme.accent} 3.5%, rgba(255, 255, 255, 0.04))`;
    featureCardBorder = `color-mix(in srgb, ${theme.accent} 15%, rgba(255, 255, 255, 0.08))`;
    featureCardBgLight = `color-mix(in srgb, ${theme.accent} 2.2%, #f8fafc)`;
    featureCardBorderLight = `color-mix(in srgb, ${theme.accent} 14%, rgba(0, 0, 0, 0.09))`;

    previewWindowBg = `linear-gradient(165deg, color-mix(in srgb, ${theme.accent} 4%, #141828) 0%, #0f121e 60%, #0a0c16 100%)`;
    previewWindowBorderDyn = previewWindowBorder;
    previewWindowShadowDyn = previewWindowShadow;

    previewWindowBgLight = `rgba(255, 255, 255, 0.96)`;
    previewWindowBorderLight = `color-mix(in srgb, ${theme.accent} 16%, rgba(0, 0, 0, 0.1))`;
    previewWindowShadowLight = `0 20px 50px -10px color-mix(in srgb, ${theme.accent} 15%, transparent), 0 0 30px color-mix(in srgb, ${theme.secondary} 8%, transparent)`;
  }

  return {
    accent: theme.accent,
    accentGlow: `color-mix(in srgb, ${theme.accent} ${Math.round(60 * glowFactor)}%, transparent)`,
    btnText: theme.btnText,
    secondary: theme.secondary,
    tertiary: theme.tertiary,
    underglowCenter,
    underglowLeft,
    underglowRight,
    underglowTop,
    orbGradient,
    orbShadow,
    orbInnerShadow,
    orbitStroke: `color-mix(in srgb, ${theme.accent} 28%, rgba(129, 140, 248, 0.18))`,
    orbitInner: `color-mix(in srgb, ${theme.accent} 38%, rgba(129, 140, 248, 0.2))`,
    orbitOuter: `color-mix(in srgb, ${theme.secondary} 32%, rgba(129, 140, 248, 0.18))`,
    orbitMid: `color-mix(in srgb, ${theme.tertiary} 24%, rgba(168, 85, 247, 0.15))`,
    orbitFaint: `color-mix(in srgb, ${theme.accent} 15%, rgba(129, 140, 248, 0.1))`,
    node1: theme.node1,
    node2: theme.node2,
    node3: theme.node3,
    nodeAccent: theme.nodeAccent,
    btnGradient: theme.btnGradient,
    btnShadow: `0 4px 18px ${adjustAlpha(g1, glowFactor)}, 0 0 16px ${adjustAlpha(g2, glowFactor)}`,
    btnRadius,
    cardRadius,
    previewWindowRadius,
    moodFontWeight,
    previewWindowBorder: previewWindowBorderDyn,
    previewWindowShadow: previewWindowShadowDyn,
    previewWindowBg,
    previewWindowBorderLight,
    previewWindowShadowLight,
    previewWindowBgLight,
    cardBg,
    cardBorder,
    cardBgLight,
    cardBorderLight,
    featureCardBg,
    featureCardBorder,
    featureCardBgLight,
    featureCardBorderLight,
    radii,
  };
}

export function applyPaletteToElement(el: HTMLElement, p: LandingPalette): void {
  el.style.setProperty('--landing-accent', p.accent);
  el.style.setProperty('--landing-accent-glow', p.accentGlow);
  el.style.setProperty('--landing-btn-text', p.btnText);
  el.style.setProperty('--landing-secondary', p.secondary);
  el.style.setProperty('--landing-tertiary', p.tertiary);
  el.style.setProperty('--landing-underglow-center', p.underglowCenter);
  el.style.setProperty('--landing-underglow-left', p.underglowLeft);
  el.style.setProperty('--landing-underglow-right', p.underglowRight);
  el.style.setProperty('--landing-underglow-top', p.underglowTop);
  el.style.setProperty('--landing-orb-grad', p.orbGradient);
  el.style.setProperty('--landing-orb-shadow', p.orbShadow);
  el.style.setProperty('--landing-orb-inner-shadow', p.orbInnerShadow);
  el.style.setProperty('--landing-orbit-stroke', p.orbitStroke);
  el.style.setProperty('--landing-orbit-inner', p.orbitInner);
  el.style.setProperty('--landing-orbit-outer', p.orbitOuter);
  el.style.setProperty('--landing-orbit-mid', p.orbitMid);
  el.style.setProperty('--landing-orbit-faint', p.orbitFaint);
  el.style.setProperty('--landing-node-1', p.node1);
  el.style.setProperty('--landing-node-2', p.node2);
  el.style.setProperty('--landing-node-3', p.node3);
  el.style.setProperty('--landing-node-accent', p.nodeAccent);
  el.style.setProperty('--landing-btn-grad', p.btnGradient);
  el.style.setProperty('--landing-btn-shadow', p.btnShadow);
  el.style.setProperty('--landing-btn-radius', p.btnRadius);
  el.style.setProperty('--landing-card-radius', p.cardRadius);
  el.style.setProperty('--landing-preview-radius', p.previewWindowRadius);
  el.style.setProperty('--landing-font-weight', p.moodFontWeight);
  el.style.setProperty('--landing-preview-border', p.previewWindowBorder);
  el.style.setProperty('--landing-preview-shadow', p.previewWindowShadow);
  el.style.setProperty('--landing-preview-bg', p.previewWindowBg);
  el.style.setProperty('--landing-preview-border-light', p.previewWindowBorderLight);
  el.style.setProperty('--landing-preview-shadow-light', p.previewWindowShadowLight);
  el.style.setProperty('--landing-preview-bg-light', p.previewWindowBgLight);
  el.style.setProperty('--landing-card-bg', p.cardBg);
  el.style.setProperty('--landing-card-border', p.cardBorder);
  el.style.setProperty('--landing-card-bg-light', p.cardBgLight);
  el.style.setProperty('--landing-card-border-light', p.cardBorderLight);
  el.style.setProperty('--landing-feature-card-bg', p.featureCardBg);
  el.style.setProperty('--landing-feature-card-border', p.featureCardBorder);
  el.style.setProperty('--landing-feature-card-bg-light', p.featureCardBgLight);
  el.style.setProperty('--landing-feature-card-border-light', p.featureCardBorderLight);
  el.style.setProperty('--b-radius-level1', p.radii.level1);
  el.style.setProperty('--b-radius-level2', p.radii.level2);
  el.style.setProperty('--b-radius-level3', p.radii.level3);
  el.style.setProperty('--b-radius-level4', p.radii.level4);
}

export function paletteToCssDeclarations(p: LandingPalette): string {
  return `
  --landing-accent: ${p.accent};
  --landing-accent-glow: ${p.accentGlow};
  --landing-btn-text: ${p.btnText};
  --landing-secondary: ${p.secondary};
  --landing-tertiary: ${p.tertiary};
  --landing-underglow-center: ${p.underglowCenter};
  --landing-underglow-left: ${p.underglowLeft};
  --landing-underglow-right: ${p.underglowRight};
  --landing-underglow-top: ${p.underglowTop};
  --landing-orb-grad: ${p.orbGradient};
  --landing-orb-shadow: ${p.orbShadow};
  --landing-orb-inner-shadow: ${p.orbInnerShadow};
  --landing-orbit-stroke: ${p.orbitStroke};
  --landing-orbit-inner: ${p.orbitInner};
  --landing-orbit-outer: ${p.orbitOuter};
  --landing-orbit-mid: ${p.orbitMid};
  --landing-orbit-faint: ${p.orbitFaint};
  --landing-node-1: ${p.node1};
  --landing-node-2: ${p.node2};
  --landing-node-3: ${p.node3};
  --landing-node-accent: ${p.nodeAccent};
  --landing-btn-grad: ${p.btnGradient};
  --landing-btn-shadow: ${p.btnShadow};
  --landing-btn-radius: ${p.btnRadius};
  --landing-card-radius: ${p.cardRadius};
  --landing-preview-radius: ${p.previewWindowRadius};
  --landing-font-weight: ${p.moodFontWeight};
  --landing-preview-border: ${p.previewWindowBorder};
  --landing-preview-shadow: ${p.previewWindowShadow};
  --landing-preview-bg: ${p.previewWindowBg};
  --landing-preview-border-light: ${p.previewWindowBorderLight};
  --landing-preview-shadow-light: ${p.previewWindowShadowLight};
  --landing-preview-bg-light: ${p.previewWindowBgLight};
  --landing-card-bg: ${p.cardBg};
  --landing-card-border: ${p.cardBorder};
  --landing-card-bg-light: ${p.cardBgLight};
  --landing-card-border-light: ${p.cardBorderLight};
  --landing-feature-card-bg: ${p.featureCardBg};
  --landing-feature-card-border: ${p.featureCardBorder};
  --landing-feature-card-bg-light: ${p.featureCardBgLight};
  --landing-feature-card-border-light: ${p.featureCardBorderLight};
  --b-radius-level1: ${p.radii.level1};
  --b-radius-level2: ${p.radii.level2};
  --b-radius-level3: ${p.radii.level3};
  --b-radius-level4: ${p.radii.level4};
`;
}
