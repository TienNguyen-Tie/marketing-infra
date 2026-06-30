import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getDraft, patchDraft, clearParsedDraft } from '@/lib/drafts/helpers';
import { parseMarkdown } from '@/lib/drafts/parser/parse-markdown';

export const dynamic = 'force-dynamic';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const draft = await getDraft(id);
  if (!draft) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { markdown } = body as { markdown?: string };
  if (!markdown || typeof markdown !== 'string' || markdown.trim().length < 100) {
    return NextResponse.json({ error: 'markdown field is required and must be non-trivial' }, { status: 400 });
  }

  const kind = draft.kind as 'icp' | 'persona';
  const result = parseMarkdown(markdown, kind);

  if (result.errors.length > 0) {
    // Save the raw markdown and errors so user can see them, but don't advance status
    await patchDraft(id, {
      uploadedMarkdown: markdown,
      parseErrors: result.errors,
      parseWarnings: result.warnings,
      status: 'awaiting_upload',
    });
    const updated = await clearParsedDraft(id);
    return NextResponse.json(
      { draft: updated, errors: result.errors, warnings: result.warnings },
      { status: 422 },
    );
  }

  const updated = await patchDraft(id, {
    uploadedMarkdown: markdown,
    parsedDraft: result.draft as unknown as Record<string, unknown>,
    parseWarnings: result.warnings,
    parseErrors: [],
    status: 'in_review',
  });

  return NextResponse.json({
    draft: updated,
    warnings: result.warnings,
    errors: [],
  });
}
