import type { CardData, DesignTokens, PlatformPreset } from '../../types/card';
import { buildCardBase, buildCaptionStyle, buildTagStyle, getFullText, buildFillTextStyle, renderParagraphs, DecorationOverlay, type CardStyleContext } from './cssBuilder';
import { fitTextToArea } from '../../lib/truncateText';

interface TemplateProps {
  data: CardData;
  tokens: DesignTokens;
  preset: PlatformPreset;
}

export function VerticalStackTemplate({ data, tokens, preset }: TemplateProps) {
  const ctx: CardStyleContext = { tokens, preset };
  const padding = Math.round(preset.width * 0.07);
  const contentWidth = preset.width - padding * 2;
  const allText = getFullText(data);

  const headerHeight = padding * 2;
  const footerHeight = padding * 2;
  const tagHeight = data.tags?.length ? padding * 1.5 : 0;
  const availableHeight = preset.height - headerHeight - footerHeight - tagHeight;

  const textFit = allText
    ? fitTextToArea(allText, contentWidth, availableHeight, tokens.typography.titleLineHeight, `"${tokens.typography.fontFamily}", ${tokens.typography.fontFallback}`)
    : null;

  return (
    <div style={buildCardBase(ctx)}>
      <DecorationOverlay tokens={tokens} preset={preset} />

      {/* Header bar */}
      <div style={{
        padding: `${padding * 0.6}px ${padding}px`,
        borderBottom: `1px solid ${tokens.colors.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{
          ...buildCaptionStyle(ctx),
          textTransform: 'uppercase',
          letterSpacing: '2px',
          fontWeight: 600,
          color: tokens.colors.textMuted,
        }}>
          Vellum Page
        </div>
        {data.date && (
          <div style={{ ...buildCaptionStyle(ctx) }}>
            {data.date}
          </div>
        )}
      </div>

      {/* Main content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: `${padding}px`,
        boxSizing: 'border-box',
      }}>
        {textFit && (
          <div>
            {renderParagraphs(textFit.text, buildFillTextStyle(ctx, textFit.fontSize))}
          </div>
        )}

        {data.tags && data.tags.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: `${padding * 0.3}px` }}>
            {data.tags.slice(0, 4).map((tag) => (
              <span key={tag} style={buildTagStyle(ctx)}>#{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        padding: `${padding * 0.6}px ${padding}px`,
        borderTop: `1px solid ${tokens.colors.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {data.author && (
          <div style={{ ...buildCaptionStyle(ctx) }}>
            {data.author}
          </div>
        )}
        {data.sourceName && (
          <div style={{ ...buildCaptionStyle(ctx), opacity: 0.5 }}>
            {data.sourceName}
          </div>
        )}
      </div>
    </div>
  );
}
