import { useState } from 'react';
import { exportCardAsImage, downloadBlob, type ExportOptions } from '../lib/exportImage';

interface ExportToolbarProps {
  cardRef: React.RefObject<HTMLDivElement | null>;
  cardWidth: number;
  cardHeight: number;
  zoom: number;
  setZoom: (z: number) => void;
}

export function ExportToolbar({ cardRef, cardWidth, cardHeight, zoom, setZoom }: ExportToolbarProps) {
  const [exporting, setExporting] = useState(false);
  const [scale, setScale] = useState(2);
  const [copied, setCopied] = useState<'html' | null>(null);

  const handleExport = async () => {
    if (!cardRef.current) return;
    setExporting(true);

    // Reset zoom to 1x for accurate html2canvas capture
    const prevZoom = zoom;
    setZoom(1);
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    try {
      const options: ExportOptions = { scale, format: 'png', quality: 0.95 };
      const blob = await exportCardAsImage(cardRef.current, options);
      const timestamp = new Date().toISOString().slice(0, 10);
      downloadBlob(blob, `vellum-${cardWidth}x${cardHeight}-${timestamp}.png`);
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setZoom(prevZoom);
      setExporting(false);
    }
  };

  const handleCopyHTML = async () => {
    if (!cardRef.current) return;
    try {
      const html = cardRef.current.innerHTML;
      await navigator.clipboard.writeText(html);
      setCopied('html');
      setTimeout(() => setCopied(null), 2000);
    } catch {
      const range = document.createRange();
      range.selectNodeContents(cardRef.current);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={scale}
        onChange={(e) => setScale(Number(e.target.value))}
        className="px-2 py-1.5 text-xs border border-neutral-200 dark:border-neutral-700 rounded bg-white dark:bg-neutral-800"
      >
        <option value={1}>1x</option>
        <option value={2}>2x</option>
        <option value={3}>3x</option>
      </select>
      <button
        onClick={handleCopyHTML}
        className="px-3 py-1.5 text-xs font-medium border border-neutral-200 dark:border-neutral-700 rounded hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
      >
        {copied === 'html' ? 'Copied!' : 'Copy HTML'}
      </button>
      <button
        onClick={handleExport}
        disabled={exporting || !cardRef.current}
        className="px-3 py-1.5 text-xs font-medium bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded hover:opacity-90 disabled:opacity-50 transition-opacity"
      >
        {exporting ? 'Exporting...' : 'Export PNG'}
      </button>
    </div>
  );
}
