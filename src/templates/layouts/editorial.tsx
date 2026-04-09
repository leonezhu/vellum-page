import type { CardData, DesignTokens, PlatformPreset } from '../../types/card';
import { buildCardBase, buildCaptionStyle, buildTagStyle, getFullText, buildFillTextStyle, renderParagraphs, DecorationOverlay, type CardStyleContext } from './cssBuilder';
import { fitTextToArea } from '../../lib/truncateText';

interface TemplateProps {
  data: CardData;
  tokens: DesignTokens;
  preset: PlatformPreset;
}

export function EditorialTemplate({ data, tokens, preset }: TemplateProps) {
  const ctx: CardStyleContext = { tokens, preset };
  const padding = Math.round(preset.width * 0.06);
  const contentWidth = preset.width - padding * 2;
  const allText = getFullText(data);

  const tagHeight = data.tags?.length ? padding * 1.5 : 0;
  const separatorHeight = padding * 0.8;
  const bottomBarHeight = padding * 2.5;
  const availableHeight = preset.height - padding * 2 - tagHeight - separatorHeight - bottomBarHeight;

  const textFit = allText
    ? fitTextToArea(allText, contentWidth, availableHeight, tokens.typography.titleLineHeight, `"${tokens.typography.fontFamily}", ${tokens.typography.fontFallback}`)
    : null;

  return (
    <div style={buildCardBase(ctx)}>
      <DecorationOverlay tokens={tokens} preset={preset} />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: `${padding}px`,
        boxSizing: 'border-box',
      }}>
        {/* Top: Tags */}
        {data.tags && data.tags.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: `${padding * 0.3}px` }}>
            {data.tags.slice(0, 3).map((tag) => (
              <span key={tag} style={buildTagStyle(ctx)}>#{tag}</span>
            ))}
          </div>
        )}

        {/* Main text area */}
        {textFit && (
          <div style={{ flex: '1 0 auto' }}>
            {renderParagraphs(textFit.text, buildFillTextStyle(ctx, textFit.fontSize))}
          </div>
        )}

        {/* Separator */}
        <div style={{
          width: '60px',
          height: '3px',
          backgroundColor: tokens.colors.accent,
          margin: `${padding * 0.3}px 0`,
        }} />

        {/* Bottom: Author + Date */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
          paddingTop: `${padding * 0.2}px`,
          borderTop: `1px solid ${tokens.colors.border}`,
        }}>
          <div style={{ ...buildCaptionStyle(ctx), display: 'flex', gap: '16px', alignItems: 'center' }}>
            {data.author && <span>{data.author}</span>}
            {data.author && data.date && <span style={{ opacity: 0.3 }}>|</span>}
            {data.date && <span>{data.date}</span>}
          </div>
          {data.sourceName && (
            <div style={{ ...buildCaptionStyle(ctx), opacity: 0.4 }}>
              {data.sourceName}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
