import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  const existing = await db.insight.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const body = await req.json();

  const data: Record<string, unknown> = {};
  if (body.headline !== undefined) data.headline = body.headline;
  if (body.detail !== undefined) data.detail = body.detail;
  if (body.evidence !== undefined) data.evidence = body.evidence;
  if (body.reference !== undefined) data.reference = body.reference;
  if (body.category !== undefined) data.category = body.category;
  if (body.confidence !== undefined) data.confidence = body.confidence;
  if (body.applicabilityPortfolios !== undefined) data.applicabilityPortfolios = body.applicabilityPortfolios;
  if (body.applicabilityBrands !== undefined) data.applicabilityBrands = body.applicabilityBrands;
  if (body.applicabilityIcps !== undefined) data.applicabilityIcps = body.applicabilityIcps;
  if (body.tags !== undefined) data.tags = body.tags;
  if (body.collectedDate !== undefined) data.collectedDate = body.collectedDate ? new Date(body.collectedDate) : null;

  const insight = await db.insight.update({ where: { id }, data });

  return NextResponse.json(insight);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  const existing = await db.insight.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  await db.insight.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
