import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { createDraft, getDraftsForKind, getAllDrafts } from '@/lib/drafts/helpers';
import { generatePrompt } from '@/lib/drafts/generator/generate-prompt';
import type { SeedInputs } from '@/lib/drafts/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const kind = req.nextUrl.searchParams.get('kind');
  const drafts = kind ? await getDraftsForKind(kind) : await getAllDrafts();
  return NextResponse.json({ drafts });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { kind, seedInputs } = body as { kind?: string; seedInputs?: SeedInputs };

  if (!kind || (kind !== 'icp' && kind !== 'persona')) {
    return NextResponse.json({ error: 'kind must be "icp" or "persona"' }, { status: 400 });
  }
  if (!seedInputs || !seedInputs.name || !seedInputs.shortCode) {
    return NextResponse.json({ error: 'seedInputs.name and seedInputs.shortCode are required' }, { status: 400 });
  }

  let generatedPrompt: string;
  try {
    generatedPrompt = generatePrompt(kind, seedInputs);
  } catch (e) {
    return NextResponse.json(
      { error: `Failed to generate prompt: ${e instanceof Error ? e.message : String(e)}` },
      { status: 500 },
    );
  }

  const draft = await createDraft({
    kind,
    seedInputs: seedInputs as unknown as Record<string, unknown>,
    generatedPrompt,
    createdBy: session.user?.email ?? undefined,
  });

  return NextResponse.json({ draft }, { status: 201 });
}
