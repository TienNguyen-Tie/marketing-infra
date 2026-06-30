import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getDraft, patchDraft } from '@/lib/drafts/helpers';
import { generateTypescriptSnippet } from '@/lib/drafts/generator/generate-typescript';
import type { ParsedDraft } from '@/lib/drafts/types';

export const dynamic = 'force-dynamic';

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const draft = await getDraft(id);
  if (!draft) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  if (!draft.parsedDraft) {
    return NextResponse.json(
      { error: 'Draft has no parsed content. Upload and successfully parse markdown first.' },
      { status: 400 },
    );
  }

  if (draft.status !== 'in_review' && draft.status !== 'approved') {
    return NextResponse.json(
      { error: 'Draft must be in "in_review" or "approved" status to publish.' },
      { status: 400 },
    );
  }

  const kind = draft.kind as 'icp' | 'persona';
  const parsedDraft = draft.parsedDraft as unknown as ParsedDraft;

  let snippet: string;
  try {
    snippet = generateTypescriptSnippet(kind, parsedDraft);
  } catch (e) {
    return NextResponse.json(
      { error: `Failed to generate snippet: ${e instanceof Error ? e.message : String(e)}` },
      { status: 500 },
    );
  }

  const updated = await patchDraft(id, {
    finalSnippet: snippet,
    status: 'approved',
    publishedAt: new Date(),
  });

  return NextResponse.json({ draft: updated, snippet });
}
