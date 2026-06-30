import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const category = searchParams.get('category');
  const tagsParam = searchParams.get('tags');
  const sort = searchParams.get('sort') ?? 'newest';

  const where: Record<string, unknown> = {};
  if (type) where.type = type;
  if (category) where.category = category;
  if (tagsParam) {
    const tags = tagsParam.split(',').map((t) => t.trim()).filter(Boolean);
    if (tags.length > 0) where.tags = { hasSome: tags };
  }

  const orderBy =
    sort === 'oldest'
      ? { createdAt: 'asc' as const }
      : sort === 'title'
      ? { title: 'asc' as const }
      : { createdAt: 'desc' as const };

  const sources = await db.researchSource.findMany({
    where,
    orderBy,
    select: {
      id: true,
      title: true,
      type: true,
      publisher: true,
      publicationDate: true,
      collectedDate: true,
      category: true,
      tags: true,
      summary: true,
      manualNotes: true,
      pdfUrl: true,
      pdfFilename: true,
      pdfOriginalSize: true,
      pdfCompressedSize: true,
      urls: true,
      createdAt: true,
      updatedAt: true,
      createdBy: true,
      _count: { select: { insights: true } },
    },
  });

  return NextResponse.json(sources);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();

  if (!body.title?.trim()) {
    return NextResponse.json({ error: 'title is required' }, { status: 400 });
  }
  if (!body.type) {
    return NextResponse.json({ error: 'type is required' }, { status: 400 });
  }

  const source = await db.researchSource.create({
    data: {
      title: body.title.trim(),
      type: body.type,
      publisher: body.publisher ?? null,
      publicationDate: body.publicationDate ? new Date(body.publicationDate) : null,
      category: body.category ?? null,
      tags: body.tags ?? [],
      summary: body.summary ?? null,
      manualNotes: body.manualNotes ?? null,
      pdfUrl: body.pdfUrl ?? null,
      pdfFilename: body.pdfFilename ?? null,
      pdfOriginalSize: body.pdfOriginalSize ?? null,
      pdfCompressedSize: body.pdfCompressedSize ?? null,
      urls: body.urls ?? [],
      collectedDate: new Date(),
      createdBy: session.user.id,
    },
  });

  return NextResponse.json(source, { status: 201 });
}
