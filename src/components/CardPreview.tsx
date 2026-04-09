import { useEffect, useRef, useState, useCallback } from 'react';
import { CardRenderer } from './CardRenderer';
import { ExportToolbar } from './ExportToolbar';
import { useEditorStore } from '../store/editorStore';

interface CardPreviewProps {
  cardRef: React.RefObject<HTMLDivElement | null>;
}

function calcFitZoom(cardWidth: number, cardHeight: number, containerEl: HTMLElement | null): number {
  if (!containerEl) return 0.5;
  const pad = 32;
  const availW = containerEl.clientWidth - pad;
  const availH = containerEl.clientHeight - pad;
  if (availW <= 0 || availH <= 0) return 0.5;
  return Math.min(availW / cardWidth, availH / cardHeight, 1);
}

export function CardPreview({ cardRef }: CardPreviewProps) {
  const [zoom, setZoom] = useState(0.5);
  const containerRef = useRef<HTMLDivElement>(null);
  const { cardData, getTokens, getPlatform, selectedTemplateId } = useEditorStore();
  const tokens = getTokens();
  const preset = getPlatform();

  // Auto-fit on mount and when card size changes
  const handleFit = useCallback(() => {
    const fit = calcFitZoom(preset.width, preset.height, containerRef.current);
    setZoom(Math.round(fit * 10) / 10);
  }, [preset.width, preset.height]);

  useEffect(() => {
    handleFit();
  }, [handleFit]);

  return (
    <div className="flex-1 flex flex-col items-center bg-neutral-100 dark:bg-neutral-900 overflow-auto">
      {/* Toolbar */}
      <div className="flex items-center justify-between w-full px-3 py-2 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shrink-0 gap-2">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setZoom((z) => Math.max(0.1, Math.round((z - 0.1) * 10) / 10))}
            className="px-2 py-1 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700"
          >
            -
          </button>
          <span className="text-xs text-neutral-500 w-12 text-center">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => setZoom((z) => Math.min(1.5, Math.round((z + 0.1) * 10) / 10))}
            className="px-2 py-1 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700"
          >
            +
          </button>
          <button
            onClick={handleFit}
            className="px-2 py-1 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 ml-0.5"
          >
            Fit
          </button>
          <span className="text-xs text-neutral-400 ml-1 hidden sm:inline">
            {preset.width} x {preset.height}
          </span>
        </div>
        <ExportToolbar cardRef={cardRef} cardWidth={preset.width} cardHeight={preset.height} zoom={zoom} setZoom={setZoom} />
      </div>

      {/* Card */}
      <div ref={containerRef} className="flex-1 flex items-start justify-center p-4 sm:p-8 overflow-auto">
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
