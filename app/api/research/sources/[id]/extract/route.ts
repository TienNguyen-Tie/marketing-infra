import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { getAnthropicKey } from '@/lib/get-api-key';
import { fetchURLContent } from '@/lib/research/fetch-url';
import { EXTRACTION_SYSTEM_PROMPT } from '@/lib/research/extraction-prompt';
import type { DraftInsight } from '@/lib/research/extraction-prompt';
import type { UrlRef } from '@/lib/research/types';
import Anthropic from '@anthropic-ai/sdk';
import { EXTRACTION_MODEL } from '@/lib/ai-models';
import { issueSignedToken, presignUrl } from '@vercel/blob';

export const maxDuration = 300;

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  const source = await db.researchSource.findUnique({
    where: { id },
    select: { id: true, type: true, pdfUrl: true, urls: true, title: true },
  });

  if (!source) {
    return NextResponse.json({ error: 'Source not found' }, { status: 404 });
  }

  let apiKey: string;
  try {
    apiKey = await getAnthropicKey();
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 422 });
  }

  const anthropic = new Anthropic({ apiKey });

  let drafts: DraftInsight[] = [];

  try {
    if (source.type === 'pdf') {
      if (!source.pdfUrl) {
        return NextResponse.json({ error: 'No PDF URL on source' }, { status: 400 });
      }

      // Generate a 15-minute signed URL so Anthropic can fetch the PDF directly.
      // The store is private; the signed URL embeds auth in query params so
      // Anthropic's servers can reach it without credentials.
      const blobPathname = new URL(source.pdfUrl).pathname.replace(/^\//, '');
      const readToken = await issueSignedToken({
        pathname: blobPathname,
        operations: ['get'],
        validUntil: Date.now() + 15 * 60 * 1000,
      });
      const { presignedUrl: signedGetUrl } = await presignUrl(readToken, {
        operation: 'get',
        pathname: blobPathname,
        access: 'public',
      } as Parameters<typeof presignUrl>[1]);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const message = await (anthropic.messages as any).create(
        {
          model: EXTRACTION_MODEL,
          max_tokens: 4096,
          system: EXTRACTION_SYSTEM_PROMPT,
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'document',
                  source: { type: 'url', url: signedGetUrl },
                },
                {
                  type: 'text',
                  text: `Extract insights from this research document: "${source.title}". Return a JSON array of insights following the schema in your instructions.`,
                },
              ],
            },
          ],
        },
        { headers: { 'anthropic-beta': 'pdfs-2024-09-25' } }
      );

      const raw = message.content[0].type === 'text' ? message.content[0].text : '';
      drafts = parseInsightJSON(raw);
    } else if (source.type === 'url-collection') {
      const urlRefs: UrlRef[] = source.urls ? (source.urls as unknown as UrlRef[]) : [];

      if (urlRefs.length === 0) {
        return NextResponse.json({ error: 'No URLs in source' }, { status: 400 });
      }

      const fetched = await Promise.all(
        urlRefs.map(async (u, i) => {
          const content = await fetchURLContent(u.url);
          const label = u.title ? `${u.title} (${u.url})` : u.url;
          const lines: string[] = [`--- URL ${i + 1}: ${label} ---`, content];
          if (u.quote) lines.push(`Highlighted quote: "${u.quote}"`);
          if (u.notes) lines.push(`Analyst notes: ${u.notes}`);
          return lines.join('\n');
        })
      );

      const combinedText = fetched.join('\n\n');

      const message = await anthropic.messages.create({
        model: EXTRACTION_MODEL,
        max_tokens: 4096,
        system: EXTRACTION_SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: `Extract insights from this URL collection: "${source.title}"\n\n${combinedText}\n\nReturn a JSON array of insights. Use "URL N" as the reference field, matching the URL number above.`,
          },
        ],
      });

      const raw = message.content[0].type === 'text' ? message.content[0].text : '';
      drafts = parseInsightJSON(raw);
    } else {
      return NextResponse.json({ error: 'Unknown source type' }, { status: 400 });
    }
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }

  return NextResponse.json({ drafts });
}

function parseInsightJSON(raw: string): DraftInsight[] {
  const stripped = raw
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();
  try {
    const parsed = JSON.parse(stripped);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
