import fs from 'fs';
import path from 'path';

function readDesignSystemHtml(): string {
  return fs.readFileSync(
    path.join(process.cwd(), 'vinacapital-design-system.html'),
    'utf-8'
  );
}

function extractSection(html: string, id: string): string {
  const markerIdx = html.indexOf(`id="${id}"`);
  if (markerIdx === -1) return `<!-- section id="${id}" not found -->`;

  const tagStart = html.lastIndexOf('<section', markerIdx);
  if (tagStart === -1) return '';

  let depth = 0;
  let i = tagStart;

  while (i < html.length) {
    if (html.startsWith('<section', i) && /[\s>]/.test(html[i + 8] ?? '')) {
      depth++;
      i += 8;
    } else if (html.startsWith('</section>', i)) {
      depth--;
      if (depth === 0) return html.substring(tagStart, i + 10);
      i += 10;
    } else {
      i++;
    }
  }

  return '';
}

export function extractMultipleSections(ids: string[]): string {
  const html = readDesignSystemHtml();
  return ids.map(id => extractSection(html, id)).join('\n');
}

export function readDesignSystemStyle(): string {
  const html = readDesignSystemHtml();
  const match = html.match(/<style>([\s\S]*?)<\/style>/);
  return match ? match[1] : '';
}
