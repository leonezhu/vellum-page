import type { CardData, DesignTokens, PlatformPreset } from '../../types/card';
import { buildCardBase, buildCaptionStyle, buildTagStyle, getFullText, buildFillTextStyle, renderParagraphs, DecorationOverlay, type CardStyleContext } from './cssBuilder';
import { fitTextToArea } from '../../lib/truncateText';
import { useEditorStore } from '../../store/editorStore';

interface TemplateProps {
  data: CardData;
  tokens: DesignTokens;
  preset: PlatformPreset;
}

export function SplitHorizontalTemplate({ data, tokens, preset }: TemplateProps) {
  const ctx: CardStyleContext = { tokens, preset };
  const padding = Math.round(preset.width * 0.06);
  const contentWidth = preset.width * 0.48;
  const allText = getFullText(data);
  const { brandMark } = useEditorStore();

  const hasMetadata = !!(data.author || data.date);
  const metadataHeight = hasMetadata ? padding * 2 : 0;
  const tagHeight = data.tags?.length ? padding * 1.5 : 0;
  const availableHeight = preset.height - padding * 2 - metadataHeight - tagHeight;

  const textFit = allText
    ? fitTextToArea(allText, contentWidth, availableHeight, tokens.typography.titleLineHeight, `"${tokens.typography.fontFamily}", ${tokens.typography.fontFallback}`)
    : null;

  return (
    <div style={buildCardBase(ctx)}>
      <DecorationOverlay tokens={tokens} preset={preset} />
      <div style={{ display: 'flex', height: '100%' }}>
        {/* Left: Content */}
        <div style={{
          width: '58%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: `${padding}px`,
          boxSizing: 'border-box',
        }}>
          {textFit && (
            <div>
              {renderParagraphs(textFit.text, {
                ...buildFillTextStyle(ctx, textFit.fontSize),
                marginBottom: `${padding * 0.3}px`,
              })}
            </div>
          )}

          {data.tags && data.tags.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: `${padding * 0.3}px` }}>
              {data.tags.slice(0, 3).map((tag) => (
                <span key={tag} style={buildTagStyle(ctx)}>#{tag}</span>
              ))}
            </div>
          )}

          {(data.author || data.date) && (
            <div style={{ ...buildCaptionStyle(ctx), display: 'flex', gap: '16px', alignItems: 'center', marginTop: 'auto' }}>
              {data.author && <span>{data.author}</span>}
              {data.author && data.date && <span style={{ opacity: 0.3 }}>|</span>}
              {data.date && <span>{data.date}</span>}
            </div>
          )}
        </div>

        {/* Right: Decorative */}
        <div style={{
          width: '42%',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: tokens.mode === 'dark'
              ? `linear-gradient(135deg, ${tokens.colors.accent}15, ${tokens.colors.accent}08, transparent)`
              : `linear-gradient(135deg, ${tokens.colors.accent}12, ${tokens.colors.accent}06, transparent)`,
          }} />
          <div style={{
            position: 'absolute',
            top: '20%',
            right: '-10%',
            width: `${preset.height * 0.5}px`,
            height: `${preset.height * 0.5}px`,
            borderRadius: '50%',
            border: `1px solid ${tokens.colors.border}`,
            opacity: 0.4,
          }} />
          <div style={{
            position: 'absolute',
            bottom: '15%',
            right: '5%',
            width: `${preset.height * 0.3}px`,
            height: `${preset.height * 0.3}px`,
            borderRadius: '50%',
            backgroundColor: tokens.colors.accent,
            opacity: 0.08,
          }} />
          <div style={{
            position: 'absolute',
            bottom: padding,
            right: padding,
            ...buildCaptionStyle(ctx),
            opacity: 0.4,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            writingMode: 'vertical-rl',
          }}>
            {brandMark || tokens.styleName}
          </div>
        </div>
      </div>
    </div>
  );
}
