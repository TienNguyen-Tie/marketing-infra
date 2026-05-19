export async function fetchURLContent(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ResearchTool/1.0)',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9',
      },
      signal: AbortSignal.timeout(12000),
    });

    if (!response.ok) {
      return `[URL returned status ${response.status} — not accessible]`;
    }

    const html = await response.text();

    const text = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
      .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/\s+/g, ' ')
      .trim();

    return text.slice(0, 10000);
  } catch (err) {
    return `[Fetch failed: ${(err as Error).message}]`;
  }
}
