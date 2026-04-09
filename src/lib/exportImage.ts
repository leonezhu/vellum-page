import html2canvas from 'html2canvas';

export interface ExportOptions {
  scale: number;
  format: 'png' | 'jpeg';
  quality: number;
  backgroundColor?: string;
}

export async function exportCardAsImage(
  element: HTMLElement,
  options: ExportOptions = { scale: 2, format: 'png', quality: 0.95 },
): Promise<Blob> {
  // Wait for fonts to be ready
  await document.fonts.ready;

  const canvas = await html2canvas(element, {
    scale: options.scale,
    useCORS: true,
    allowTaint: false,
    backgroundColor: options.backgroundColor ?? null,
    logging: false,
  });

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to create image blob'));
      },
      `image/${options.format}`,
      options.quality,
    );
  });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
