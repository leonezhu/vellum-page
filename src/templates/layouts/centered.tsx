import type { CardData, DesignTokens, PlatformPreset } from '../../types/card';
import { buildCardBase, buildCaptionStyle, buildTagStyle, getFullText, buildFillTextStyle, renderParagraphs, DecorationOverlay, type CardStyleContext } from './cssBuilder';
import { fitTextToArea } from '../../lib/truncateText';

interface TemplateProps {
  data: CardData;
  tokens: DesignTokens;
  preset: PlatformPreset;
}

export function CenteredTemplate({ data, tokens, preset }: TemplateProps) {
  const ctx: CardStyleContext = { tokens, preset };
  const padding = Math.round(preset.width * 0.08);
  const contentWidth = (preset.width - padding * 2) * 0.92;

  const allText = getFullText(data);
  const hasMetadata = !!(data.author || data.date || (data.tags && data.tags.length > 0));
  const metadataHeight = hasMetadata ? padding * 2.5 : 0;
  const availableHeight = preset.height - padding * 2 - metadataHeight - 4;

  const textFit = allText
    ? fitTextToArea(allText, contentWidth, availableHeight, tokens.typography.titleLineHeight, `"${tokens.typography.fontFamily}", ${tokens.typography.fontFallback}`)
    : null;

  return (
    <div style={buildCardBase(ctx)}>
      <DecorationOverlay tokens={tokens} preset={preset} />

      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: `linear-gradient(90deg, ${tokens.colors.accent}, ${tokens.colors.accent}88, transparent)`,
      }} />

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: `${padding}px`,
        boxSizing: 'border-box',
      }}>
        {textFit && (
          <div style={{ textAlign: 'center', maxWidth: '100%' }}>
            {renderParagraphs(textFit.text, {
              ...buildFillTextStyle(ctx, textFit.fontSize),
              textAlign: 'center',
            })}
          </div>
        )}

        {data.tags && data.tags.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginTop: `${padding * 0.4}px` }}>
            {data.tags.slice(0, 4).map((tag) => (
              <span key={tag} style={buildTagStyle(ctx)}>#{tag}</span>
            ))}
          </div>
        )}

        {(data.author || data.date) && (
          <div style={{ ...buildCaptionStyle(ctx), display: 'flex', gap: '16px', alignItems: 'center', marginTop: `${padding * 0.3}px` }}>
            {data.author && <span>{data.author}</span>}
            {data.author && data.date && <span style={{ opacity: 0.3 }}>|</span>}
            {data.date && <span>{data.date}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
