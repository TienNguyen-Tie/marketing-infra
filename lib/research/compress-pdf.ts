'use client';
import { PDFDocument } from 'pdf-lib';

export interface CompressionResult {
  file: File;
  originalSize: number;
  compressedSize: number;
  savedPercent: number;
  didCompress: boolean;
}

export async function compressPDF(file: File): Promise<CompressionResult> {
  const arrayBuffer = await file.arrayBuffer();

  try {
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const compressedBytes = await pdfDoc.save({ useObjectStreams: true });
    const compressedBlob = new Blob([compressedBytes as Uint8Array<ArrayBuffer>], { type: 'application/pdf' });

    if (compressedBlob.size < file.size) {
      const compressedFile = new File([compressedBlob], file.name, { type: 'application/pdf' });
      return {
        file: compressedFile,
        originalSize: file.size,
        compressedSize: compressedBlob.size,
        savedPercent: Math.round((1 - compressedBlob.size / file.size) * 100),
        didCompress: true,
      };
    }
  } catch (err) {
    console.warn('PDF compression failed, uploading original:', err);
  }

  return {
    file,
    originalSize: file.size,
    compressedSize: file.size,
    savedPercent: 0,
    didCompress: false,
  };
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}
