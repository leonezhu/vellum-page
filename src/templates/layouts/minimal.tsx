import type { CardData, DesignTokens, PlatformPreset } from '../../types/card';
import { buildCardBase, buildCaptionStyle, getFullText, buildFillTextStyle, renderParagraphs, DecorationOverlay, type CardStyleContext } from './cssBuilder';
import { fitTextToArea } from '../../lib/truncateText';

interface TemplateProps {
  data: CardData;
  tokens: DesignTokens;
  preset: PlatformPreset;
}

export function MinimalTemplate({ data, tokens, preset }: TemplateProps) {
  const ctx: CardStyleContext = { tokens, preset };
  const padding = Math.round(preset.width * 0.1);
  const contentWidth = (preset.width - padding * 2) * 0.85;
  const allText = getFullText(data);

  const chromeHeight = padding * 4.5; // label + dot + separator + author
  const availableHeight = preset.height - padding * 2 - chromeHeight;

  const textFit = allText
    ? fitTextToArea(allText, contentWidth, availableHeight, tokens.typography.titleLineHeight, `"${tokens.typography.fontFamily}", ${tokens.typography.fontFallback}`)
    : null;

  return (
    <div style={buildCardBase(ctx)}>
      <DecorationOverlay tokens={tokens} preset={preset} />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        padding: `${padding}px`,
        boxSizing: 'border-box',
        textAlign: 'center',
      }}>
        {/* Small label */}
        <div style={{
          ...buildCaptionStyle(ctx),
          textTransform: 'uppercase',
          letterSpacing: '3px',
          marginBottom: `${padding * 0.6}px`,
          color: tokens.colors.textMuted,
          fontFamily: `"JetBrains Mono", ui-monospace, Consolas, monospace`,
          fontSize: `${Math.round(parseInt(tokens.typography.captionSize) * 0.85)}px`,
        }}>
          {data.tags && data.tags.length > 0 ? data.tags[0] : 'Vellum Page'}
        </div>

        {/* Accent dot */}
        <div style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: tokens.colors.accent,
          marginBottom: `${padding * 0.5}px`,
        }} />

        {/* Main text */}
        {textFit && (
          <div style={{ maxWidth: '85%' }}>
            {renderParagraphs(textFit.text, buildFillTextStyle(ctx, textFit.fontSize))}
          </div>
        )}

        {/* Separator */}
        <div style={{
          width: '40px',
          height: '1px',
          backgroundColor: tokens.colors.border,
          margin: `${padding * 0.5}px 0`,
        }} />

        {/* Author + Date */}
        {(data.author || data.date) && (
          <div style={{ ...buildCaptionStyle(ctx), display: 'flex', gap: '16px', alignItems: 'center' }}>
            {data.author && <span>{data.author}</span>}
            {data.author && data.date && <span style={{ opacity: 0.3 }}>|</span>}
            {data.date && <span>{data.date}</span>}
          </div>
        )}

        {/* Source at bottom */}
        {data.sourceName && (
          <div style={{
            ...buildCaptionStyle(ctx),
            position: 'absolute',
            bottom: `${padding * 0.5}px`,
            opacity: 0.3,
          }}>
            {data.sourceName}
          </div>
        )}
      </div>
    </div>
  );
}
