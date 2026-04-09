export interface CardData {
  title: string;
  excerpt?: string;
  body?: string;
  author?: string;
  date?: string;
  tags?: string[];
  quote?: string;
  sourceName?: string;
}

export interface PlatformPreset {
  id: string;
  name: string;
  platform: string;
  width: number;
  height: number;
  icon?: string;
}

export interface DesignTokens {
  styleId: string;
  styleName: string;
  mode: 'light' | 'dark';
  colors: {
    background: string;
    surface?: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    accent: string;
    accentHover?: string;
    border: string;
    borderSubtle?: string;
    tagBg?: string;
    tagText?: string;
  };
  typography: {
    fontFamily: string;
    fontFallback: string;
    titleSize: string;
    titleWeight: number;
    titleLineHeight: number;
    titleLetterSpacing: string;
    bodySize: string;
    bodyWeight: number;
    bodyLineHeight: number;
    captionSize: string;
    captionWeight: number;
    openTypeFeatures?: string;
  };
  shadows: {
    card?: string;
    subtle?: string;
  };
  borderRadius: {
    card: string;
    button: string;
    badge: string;
  };
  decorations?: StyleDecorations;
}

export interface StyleDecorations {
  /** Background pattern/texture */
  backgroundPattern?: 'grid' | 'dots' | 'diagonal' | 'none';
  /** Border style override */
  borderStyle?: 'emboss' | 'glow' | 'shadow-border' | 'gradient-border' | 'glass' | 'none';
  /** Decorative element position */
  element?: 'corner-accent' | 'side-line' | 'floating-shape' | 'radial-gradient' | 'none';
  /** Additional CSS for the card root */
  cardExtra?: React.CSSProperties;
  /** CSS for a decorative overlay div */
  overlayStyle?: React.CSSProperties;
  /** Text treatment */
  textTreatment?: 'uppercase-all' | 'letter-spaced' | 'none';
  /** Style mark to show */
  styleMark?: string;
}

export type ColorMode = 'light' | 'dark';

export type TemplateId = 'centered' | 'split-horizontal' | 'vertical-stack' | 'editorial' | 'minimal';

export interface CardTemplate {
  id: TemplateId;
  name: string;
  description: string;
  supportedAspects: string[];
}

export interface StyleInfo {
  id: string;
  name: string;
  defaultMode: ColorMode;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
}
