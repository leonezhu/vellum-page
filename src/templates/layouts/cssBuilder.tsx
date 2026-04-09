import type { CardData, DesignTokens, PlatformPreset } from '../../types/card';
import { scaleFontSize } from '../../lib/truncateText';

export interface CardStyleContext {
  tokens: DesignTokens;
  preset: PlatformPreset;
}

/**
 * Get the primary display text for a card.
 * If there's an explicit title (set via # heading or manual input), use it.
 * Otherwise, treat the pasted text as the main content.
 */
export function getDisplayText(data: CardData): string {
  if (data.title) return data.title;
  if (data.body) return data.body;
  if (data.excerpt) return data.excerpt;
  return '';
}

export function hasSeparateExcerpt(data: CardData): boolean {
  if (!data.excerpt) return false;
  if (data.title && data.excerpt !== data.title) return true;
  if (data.body && data.excerpt !== data.body) return true;
  return false;
}

/** Combine all text fields into one block, deduplicating when title === body. */
export function getFullText(data: CardData): string {
  if (!data.title && !data.body) return '';
  if (data.title === data.body) return data.title;
  return [data.title, data.body].filter(Boolean).join('\n');
}

/** Build the uniform text style used by all templates for the main text block. */
export function buildFillTextStyle(context: CardStyleContext, fontSize: number): React.CSSProperties {
  const { tokens } = context;
  return {
    fontSize: `${fontSize}px`,
    fontWeight: tokens.typography.titleWeight,
    lineHeight: tokens.typography.titleLineHeight,
    letterSpacing: tokens.typography.titleLetterSpacing,
    color: tokens.colors.textPrimary,
    margin: 0,
    fontFeatureSettings: tokens.typography.openTypeFeatures,
    textTransform: tokens.decorations?.textTreatment === 'uppercase-all' ? 'uppercase' as const : undefined,
    ...(tokens.decorations?.textTreatment === 'letter-spaced' ? { letterSpacing: '3px' } : {}),
  };
}

/** Render paragraphs as <p> elements with margin spacing — maximum html2canvas compatibility. */
export function renderParagraphs(
  text: string,
  style: React.CSSProperties,
): React.ReactNode {
  const paragraphs = text.split('\n');
  return (
    <div style={{ margin: 0 }}>
      {paragraphs.map((p, i) => (
        <p key={i} style={{ ...style, display: 'block', margin: 0, marginBottom: i < paragraphs.length - 1 ? '0.5em' : 0 }}>
          {p}
        </p>
      ))}
    </div>
  );
}

export function buildCardBase(context: CardStyleContext): React.CSSProperties {
  const { tokens, preset } = context;
  const base: React.CSSProperties = {
    width: preset.width,
    height: preset.height,
    backgroundColor: tokens.colors.background,
    fontFamily: `"${tokens.typography.fontFamily}", ${tokens.typography.fontFallback}`,
    color: tokens.colors.textPrimary,
    position: 'relative',
    overflow: 'hidden',
    boxSizing: 'border-box',
  };

  // Apply style decorations
  if (tokens.decorations) {
    const dec = tokens.decorations;

    // Card-level extra styles (border, backdrop-filter, etc.)
    if (dec.cardExtra) {
      Object.assign(base, dec.cardExtra);
    }

    // Border styles
    if (dec.borderStyle === 'glow') {
      base.boxShadow = `0 0 30px ${tokens.colors.accent}20, ${tokens.shadows.card || 'none'}`;
    } else if (dec.borderStyle === 'emboss') {
      base.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.2)`;
      if (!dec.cardExtra?.border) {
        base.border = `1px solid ${tokens.colors.border}`;
      }
    } else if (dec.borderStyle === 'gradient-border') {
      // Gradient border via pseudo-element effect — use border-image
      base.border = `2px solid transparent`;
      base.borderImage = `linear-gradient(135deg, ${tokens.colors.accent}40, ${tokens.colors.accent}10, transparent) 1`;
    }
  }

  // Apply shadow if no decoration override
  if (!tokens.decorations?.borderStyle && tokens.shadows.card) {
    base.boxShadow = tokens.shadows.card;
  }

  return base;
}

/**
 * Render a decoration overlay for style-specific visual elements.
 */
export function DecorationOverlay({ tokens, preset }: { tokens: DesignTokens; preset: PlatformPreset }): React.ReactNode {
  if (!tokens.decorations) return null;
  const dec = tokens.decorations;

  return (
    <>
      {/* Background pattern overlay */}
      {dec.overlayStyle && (
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          ...dec.overlayStyle,
        }} />
      )}

      {/* Decorative elements */}
      {dec.element === 'corner-accent' && (
        <>
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: `${preset.width * 0.3}px`,
            height: `${preset.width * 0.3}px`,
            background: `linear-gradient(135deg, ${tokens.colors.accent}12, transparent)`,
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            top: `${preset.width * 0.06}px`,
            right: `${preset.width * 0.06}px`,
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: tokens.colors.accent,
            opacity: 0.5,
            pointerEvents: 'none',
          }} />
        </>
      )}

      {dec.element === 'side-line' && (
        <div style={{
          position: 'absolute',
          top: `${preset.height * 0.1}px`,
          bottom: `${preset.height * 0.1}px`,
          left: `${preset.width * 0.04}px`,
          width: '3px',
          borderRadius: '2px',
          background: `linear-gradient(to bottom, transparent, ${tokens.colors.accent}, transparent)`,
          opacity: 0.4,
          pointerEvents: 'none',
        }} />
      )}

      {dec.element === 'floating-shape' && (
        <>
          <div style={{
            position: 'absolute',
            bottom: '-15%',
            right: '-5%',
            width: `${preset.width * 0.4}px`,
            height: `${preset.width * 0.4}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${tokens.colors.accent}15, transparent)`,
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            top: '10%',
            right: '15%',
            width: `${preset.width * 0.08}px`,
            height: `${preset.width * 0.08}px`,
            borderRadius: '50%',
            border: `1.5px solid ${tokens.colors.accent}30`,
            pointerEvents: 'none',
          }} />
        </>
      )}

      {dec.element === 'radial-gradient' && (
        <div style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: `${preset.width * 0.8}px`,
          height: `${preset.width * 0.5}px`,
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${tokens.colors.accent}10, transparent)`,
          filter: 'blur(20px)',
          pointerEvents: 'none',
        }} />
      )}
    </>
  );
}

export function buildTitleStyle(context: CardStyleContext): React.CSSProperties {
  const { tokens, preset } = context;
  const baseSize = parseInt(tokens.typography.titleSize);
  const scaledSize = scaleFontSize(baseSize, preset.width, 1200);
  return {
    fontSize: `${scaledSize}px`,
    fontWeight: tokens.typography.titleWeight,
    lineHeight: tokens.typography.titleLineHeight,
    letterSpacing: tokens.typography.titleLetterSpacing,
    color: tokens.colors.textPrimary,
    margin: 0,
    fontFeatureSettings: tokens.typography.openTypeFeatures,
    textTransform: tokens.decorations?.textTreatment === 'uppercase-all' ? 'uppercase' : undefined,
    ...(tokens.decorations?.textTreatment === 'letter-spaced' ? { letterSpacing: '3px' } : {}),
  };
}

export function buildBodyStyle(context: CardStyleContext): React.CSSProperties {
  const { tokens, preset } = context;
  const baseSize = parseInt(tokens.typography.bodySize);
  const scaledSize = scaleFontSize(baseSize, preset.width, 1200);
  return {
    fontSize: `${scaledSize}px`,
    fontWeight: tokens.typography.bodyWeight,
    lineHeight: tokens.typography.bodyLineHeight,
    color: tokens.colors.textSecondary,
    margin: 0,
  };
}

export function buildCaptionStyle(context: CardStyleContext): React.CSSProperties {
  const { tokens, preset } = context;
  const baseSize = parseInt(tokens.typography.captionSize);
  const scaledSize = scaleFontSize(baseSize, preset.width, 1200);
  return {
    fontSize: `${scaledSize}px`,
    fontWeight: tokens.typography.captionWeight,
    lineHeight: 1.4,
    color: tokens.colors.textMuted,
    margin: 0,
  };
}

export function buildTagStyle(context: CardStyleContext): React.CSSProperties {
  const { tokens, preset } = context;
  const baseSize = parseInt(tokens.typography.captionSize);
  const scaledSize = scaleFontSize(baseSize, preset.width, 1200);
  return {
    fontSize: `${scaledSize}px`,
    fontWeight: tokens.typography.captionWeight,
    backgroundColor: tokens.colors.tagBg ?? tokens.colors.borderSubtle ?? tokens.colors.border,
    color: tokens.colors.tagText ?? tokens.colors.textSecondary,
    borderRadius: tokens.borderRadius.badge,
    padding: `${Math.round(scaledSize * 0.3)}px ${Math.round(scaledSize * 0.8)}px`,
    display: 'inline-block',
    lineHeight: 1.4,
  };
}
