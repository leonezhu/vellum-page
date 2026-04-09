/**
 * Measure how many lines a paragraph needs using canvas measureText.
 * Much more accurate than character width estimation.
 */
function measureLinesWithCanvas(
  text: string,
  fontSize: number,
  maxWidth: number,
  fontFamily: string,
): number {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  ctx.font = `${fontSize}px ${fontFamily}`;
  const paragraphs = text.split('\n');
  let totalLines = 0;
  for (const p of paragraphs) {
    if (p.trim() === '') {
      totalLines += 1;
      continue;
    }
    const words = p.split('');
    let currentLine = '';
    let lineCount = 1;
    for (const ch of words) {
      const test = currentLine + ch;
      if (ctx.measureText(test).width > maxWidth && currentLine) {
        lineCount++;
        currentLine = ch;
      } else {
        currentLine = test;
      }
    }
    totalLines += lineCount;
  }
  return totalLines;
}

/**
 * Calculate how many characters fit per line given font size and container width.
 */
function estimateCharsPerLine(fontSize: number, maxWidth: number, isCJK: boolean): number {
  const avgCharWidth = isCJK ? fontSize * 1.0 : fontSize * 0.55;
  return Math.max(Math.floor(maxWidth / avgCharWidth), 10);
}

/**
 * Count lines needed for text given a container width and font size.
 */
function countLines(text: string, charsPerLine: number): number {
  const paragraphs = text.split('\n');
  let totalLines = 0;
  for (const paragraph of paragraphs) {
    if (paragraph.trim() === '') {
      totalLines += 1;
      continue;
    }
    totalLines += Math.ceil(paragraph.length / charsPerLine);
  }
  return totalLines;
}

/**
 * Auto-scale text to fit within maxLines by reducing font size.
 */
export function fitText(
  text: string,
  maxLines: number,
  fontSize: number,
  _lineHeight: number,
  maxWidth: number,
  minFontSize: number = 12,
): { text: string; fontSize: number } {
  if (!text) return { text: '', fontSize };

  const hasCJK = /[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]/.test(text);
  const scaledWidth = scaleFontSize(fontSize, maxWidth, 1200);
  let currentSize = scaledWidth;
  let charsPerLine = estimateCharsPerLine(currentSize, maxWidth, hasCJK);

  if (countLines(text, charsPerLine) <= maxLines) {
    return { text, fontSize: currentSize };
  }

  let lo = minFontSize;
  let hi = scaledWidth;
  let bestSize = minFontSize;

  while (lo <= hi) {
    const mid = Math.round((lo + hi) / 2);
    const cpl = estimateCharsPerLine(mid, maxWidth, hasCJK);
    const lines = countLines(text, cpl);

    if (lines <= maxLines) {
      bestSize = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  const finalCPL = estimateCharsPerLine(bestSize, maxWidth, hasCJK);
  const finalLines = countLines(text, finalCPL);

  if (finalLines > maxLines) {
    const maxChars = finalCPL * maxLines;
    return { text: text.slice(0, maxChars - 1) + '...', fontSize: minFontSize };
  }

  return { text, fontSize: bestSize };
}

/**
 * Auto-scale text to fill a given area (width × height).
 * Uses canvas measureText for accurate line counting.
 */
export function fitTextToArea(
  text: string,
  maxWidth: number,
  maxHeight: number,
  lineHeight: number,
  fontFamily: string,
  minFontSize: number = 12,
  maxFontSize: number = 200,
): { text: string; fontSize: number } {
  if (!text) return { text: '', fontSize: minFontSize };

  // 10% buffer to prevent overflow from rendering differences (html2canvas etc.)
  const safeHeight = maxHeight * 0.9;
  const numBreaks = Math.max(0, text.split('\n').length - 1);
  const paragraphGap = 0.5;

  let lo = minFontSize;
  let hi = maxFontSize;
  let bestSize = minFontSize;

  while (lo <= hi) {
    const mid = Math.round((lo + hi) / 2);
    const lines = measureLinesWithCanvas(text, mid, maxWidth, fontFamily);
    const gapHeight = numBreaks * mid * paragraphGap;
    const totalHeight = lines * mid * lineHeight + gapHeight;

    if (totalHeight <= safeHeight) {
      bestSize = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  // Truncate if even min size overflows
  const finalLines = measureLinesWithCanvas(text, bestSize, maxWidth, fontFamily);
  const finalGapHeight = numBreaks * bestSize * paragraphGap;
  const finalHeight = finalLines * bestSize * lineHeight + finalGapHeight;

  if (finalHeight > safeHeight) {
    // Remove last paragraph(s) until it fits
    const paragraphs = text.split('\n');
    let cut = paragraphs.length;
    while (cut > 1) {
      cut--;
      const trimmed = paragraphs.slice(0, cut).join('\n');
      const trimmedBreaks = Math.max(0, trimmed.split('\n').length - 1);
      const trimmedLines = measureLinesWithCanvas(trimmed, bestSize, maxWidth, fontFamily);
      const trimmedHeight = trimmedLines * bestSize * lineHeight + trimmedBreaks * bestSize * paragraphGap;
      if (trimmedHeight <= safeHeight) {
        return { text: trimmed + '...', fontSize: bestSize };
      }
    }
  }

  return { text, fontSize: bestSize };
}

/**
 * Simple CSS clamp for font sizes based on container dimensions.
 */
export function scaleFontSize(baseSize: number, containerWidth: number, baseWidth: number): number {
  const scale = Math.min(containerWidth / baseWidth, 1.2);
  return Math.round(baseSize * scale);
}

/**
 * @deprecated Use fitText() instead for auto-scaling.
 */
export function truncateText(
  text: string,
  maxLines: number,
  fontSize: number,
  lineHeight: number,
  maxWidth: number,
): string {
  if (!text) return '';
  const { text: fitted } = fitText(text, maxLines, fontSize, lineHeight, maxWidth);
  return fitted;
}
