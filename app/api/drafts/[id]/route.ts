import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getDraft, patchDraft, deleteDraft } from '@/lib/drafts/helpers';

export const dynamic = 'force-dynamic';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const draft = await getDraft(id);
  if (!draft) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({ draft });
}

export async function PATCH(
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

  const allowedFields = ['status', 'edits'] as const;
  const updates: Record<string, unknown> = {};
  for (const field of allowedFields) {
    if ((body as Record<string, unknown>)[field] !== undefined) {
      updates[field] = (body as Record<string, unknown>)[field];
    }
  }

  const updated = await patchDraft(id, updates);
  return NextResponse.json({ draft: updated });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const draft = await getDraft(id);
  if (!draft) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  await deleteDraft(id);
  return NextResponse.json({ ok: true });
}
