import type { DesignTokens, StyleInfo } from '../../types/card';

export const hermesStyle: StyleInfo = {
  id: 'hermes',
  name: 'Hermes',
  defaultMode: 'dark',
  accentColor: '#ffff89',
  backgroundColor: '#041C1C',
  textColor: '#ffe6cb',
};

export const hermesDark: DesignTokens = {
  styleId: 'hermes',
  styleName: 'Hermes',
  mode: 'dark',
  colors: {
    background: '#041C1C',
    surface: '#062424',
    textPrimary: '#ffe6cb',
    textSecondary: 'rgba(255, 230, 203, 0.6)',
    textMuted: 'rgba(255, 230, 203, 0.4)',
    accent: '#ffff89',
    accentHover: '#ffffb3',
    border: 'rgba(255, 230, 203, 0.2)',
    borderSubtle: 'rgba(255, 230, 203, 0.1)',
    tagBg: 'rgba(255, 255, 137, 0.1)',
    tagText: '#ffff89',
  },
  typography: {
    fontFamily: 'Inter',
    fontFallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    titleSize: '80px',
    titleWeight: 700,
    titleLineHeight: 1.1,
    titleLetterSpacing: '2px',
    bodySize: '20px',
    bodyWeight: 400,
    bodyLineHeight: 1.625,
    captionSize: '15px',
    captionWeight: 500,
  },
  shadows: {
    card: 'none',
    subtle: 'none',
  },
  borderRadius: {
    card: '0px',
    button: '0px',
    badge: '0px',
  },
  decorations: {
    backgroundPattern: 'none',
    borderStyle: 'none',
    element: 'radial-gradient',
    textTreatment: 'uppercase-all',
    cardExtra: {
      border: '1px solid rgba(255, 230, 203, 0.2)',
      borderRadius: '0px',
    },
    overlayStyle: {
      background: 'radial-gradient(ellipse at 50% 0%, rgba(255, 180, 50, 0.08) 0%, transparent 60%)',
    },
  },
};

export const hermesLight: DesignTokens = {
  styleId: 'hermes',
  styleName: 'Hermes',
  mode: 'light',
  colors: {
    background: '#f5efe6',
    surface: '#ede5d8',
    textPrimary: '#1a2e2e',
    textSecondary: 'rgba(26, 46, 46, 0.6)',
    textMuted: 'rgba(26, 46, 46, 0.4)',
    accent: '#b8960a',
    accentHover: '#9a7e08',
    border: 'rgba(26, 46, 46, 0.2)',
    borderSubtle: 'rgba(26, 46, 46, 0.1)',
    tagBg: 'rgba(184, 150, 10, 0.1)',
    tagText: '#7a6508',
  },
  typography: {
    fontFamily: 'Inter',
    fontFallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    titleSize: '80px',
    titleWeight: 700,
    titleLineHeight: 1.1,
    titleLetterSpacing: '2px',
    bodySize: '20px',
    bodyWeight: 400,
    bodyLineHeight: 1.625,
    captionSize: '15px',
    captionWeight: 500,
  },
  shadows: {
    card: 'none',
    subtle: 'none',
  },
  borderRadius: {
    card: '0px',
    button: '0px',
    badge: '0px',
  },
  decorations: {
    backgroundPattern: 'none',
    borderStyle: 'none',
    element: 'radial-gradient',
    textTreatment: 'uppercase-all',
    cardExtra: {
      border: '1px solid rgba(26, 46, 46, 0.2)',
      borderRadius: '0px',
    },
    overlayStyle: {
      background: 'radial-gradient(ellipse at 50% 0%, rgba(184, 150, 10, 0.06) 0%, transparent 60%)',
    },
  },
};
