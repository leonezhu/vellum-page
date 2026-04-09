import { useMemo } from 'react';
import type { CardData, DesignTokens, PlatformPreset, TemplateId } from '../types/card';
import { getAspect } from '../data/templates';
import { CenteredTemplate } from '../templates/layouts/centered';
import { SplitHorizontalTemplate } from '../templates/layouts/split-horizontal';
import { VerticalStackTemplate } from '../templates/layouts/vertical-stack';
import { EditorialTemplate } from '../templates/layouts/editorial';
import { MinimalTemplate } from '../templates/layouts/minimal';

interface CardRendererProps {
  data: CardData;
  tokens: DesignTokens;
  preset: PlatformPreset;
  templateId: TemplateId;
}

export function CardRenderer({ data, tokens, preset, templateId }: CardRendererProps) {
  const aspect = getAspect(preset.width, preset.height);

  const renderedCard = useMemo(() => {
    const props = { data, tokens, preset };

    // Check if template supports this aspect ratio
    const supportedAspects: Record<TemplateId, string[]> = {
      'centered': ['16:9', '1:1', '4:5', '3:4', '9:16', '3:2'],
      'split-horizontal': ['16:9', '3:2'],
      'vertical-stack': ['4:5', '3:4', '9:16', '1:1'],
      'editorial': ['16:9', '3:2', '1:1', '4:5'],
      'minimal': ['16:9', '1:1', '3:2'],
    };

    const supports = supportedAspects[templateId]?.includes(aspect);
    // Fallback to centered if aspect not supported
    const effectiveTemplate = supports ? templateId : 'centered';

    switch (effectiveTemplate) {
      case 'centered':
        return <CenteredTemplate {...props} />;
      case 'split-horizontal':
        return <SplitHorizontalTemplate {...props} />;
      case 'vertical-stack':
        return <VerticalStackTemplate {...props} />;
      case 'editorial':
        return <EditorialTemplate {...props} />;
      case 'minimal':
        return <MinimalTemplate {...props} />;
    }
  }, [data, tokens, preset, templateId, aspect]);

  return renderedCard;
}
