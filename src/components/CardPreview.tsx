import { useState } from 'react';
import { CardRenderer } from './CardRenderer';
import { ExportToolbar } from './ExportToolbar';
import { useEditorStore } from '../store/editorStore';

interface CardPreviewProps {
  cardRef: React.RefObject<HTMLDivElement | null>;
}

export function CardPreview({ cardRef }: CardPreviewProps) {
  const [zoom, setZoom] = useState(0.5);
  const { cardData, getTokens, getPlatform, selectedTemplateId } = useEditorStore();
  const tokens = getTokens();
  const preset = getPlatform();

  return (
    <div className="flex-1 flex flex-col items-center bg-neutral-100 dark:bg-neutral-900 overflow-auto">
      {/* Toolbar */}
      <div className="flex items-center justify-between w-full px-4 py-2 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom((z) => Math.max(0.2, z - 0.1))}
            className="px-2 py-1 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700"
          >
            -
          </button>
          <span className="text-xs text-neutral-500 w-14 text-center">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => setZoom((z) => Math.min(1.5, z + 0.1))}
            className="px-2 py-1 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700"
          >
            +
          </button>
          <button
            onClick={() => setZoom(0.5)}
            className="px-2 py-1 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 ml-1"
          >
            Fit
          </button>
          <span className="text-xs text-neutral-400 ml-2">
            {preset.width} x {preset.height}
          </span>
        </div>
        <ExportToolbar cardRef={cardRef} cardWidth={preset.width} cardHeight={preset.height} zoom={zoom} setZoom={setZoom} />
      </div>

      {/* Card */}
      <div className="flex-1 flex items-start justify-center p-8 overflow-auto">
        <div
          className="shadow-2xl"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            flexShrink: 0,
          }}
        >
          <div ref={cardRef}>
            <CardRenderer
              data={cardData}
              tokens={tokens}
              preset={preset}
              templateId={selectedTemplateId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
