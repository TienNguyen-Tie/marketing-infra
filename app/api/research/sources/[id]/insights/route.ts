import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id: sourceId } = await params;

  const source = await db.researchSource.findUnique({ where: { id: sourceId } });
  if (!source) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const body = await req.json();

  if (!body.headline?.trim() || !body.detail?.trim() || !body.category?.trim()) {
    return NextResponse.json({ error: 'headline, detail, and category are required' }, { status: 400 });
  }

  const insight = await db.insight.create({
    data: {
      sourceId,
      headline: body.headline.trim(),
      detail: body.detail.trim(),
      evidence: body.evidence ?? null,
      reference: body.reference ?? null,
      category: body.category.trim(),
      confidence: body.confidence ?? 'medium',
      applicabilityPortfolios: body.applicabilityPortfolios ?? [],
      applicabilityBrands: body.applicabilityBrands ?? [],
      applicabilityIcps: body.applicabilityIcps ?? [],
      tags: body.tags ?? [],
    },
  });

  return NextResponse.json(insight, { status: 201 });
}
