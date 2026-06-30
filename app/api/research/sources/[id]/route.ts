import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  const source = await db.researchSource.findUnique({
    where: { id },
    include: { insights: true },
  });

  if (!source) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json(source);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  const existing = await db.researchSource.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const body = await req.json();

  const data: Record<string, unknown> = {};
  if (body.title !== undefined) data.title = body.title;
  if (body.type !== undefined) data.type = body.type;
  if (body.publisher !== undefined) data.publisher = body.publisher;
  if (body.publicationDate !== undefined) data.publicationDate = body.publicationDate ? new Date(body.publicationDate) : null;
  if (body.category !== undefined) data.category = body.category;
  if (body.tags !== undefined) data.tags = body.tags;
  if (body.summary !== undefined) data.summary = body.summary;
  if (body.manualNotes !== undefined) data.manualNotes = body.manualNotes;
  if (body.pdfUrl !== undefined) data.pdfUrl = body.pdfUrl;
  if (body.pdfFilename !== undefined) data.pdfFilename = body.pdfFilename;
  if (body.pdfOriginalSize !== undefined) data.pdfOriginalSize = body.pdfOriginalSize;
  if (body.pdfCompressedSize !== undefined) data.pdfCompressedSize = body.pdfCompressedSize;
  if (body.urls !== undefined) data.urls = body.urls;

  const source = await db.researchSource.update({ where: { id }, data });

  return NextResponse.json(source);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  const existing = await db.researchSource.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  await db.researchSource.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
