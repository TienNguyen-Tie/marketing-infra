import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { filtersFromURL } from '@/lib/research/insight-filters';

const CONFIDENCE_ORDER: Record<string, number> = {
  high: 0, medium: 1, low: 2, speculative: 3,
};

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const filters = filtersFromURL(req.nextUrl.searchParams);

  const where: Record<string, unknown> = {};
  if (filters.categories.length) where.category = { in: filters.categories };
  if (filters.confidence.length) where.confidence = { in: filters.confidence };
  if (filters.tags.length) where.tags = { hasSome: filters.tags };
  if (filters.search) {
    where.OR = [
      { headline: { contains: filters.search, mode: 'insensitive' } },
      { detail: { contains: filters.search, mode: 'insensitive' } },
      { evidence: { contains: filters.search, mode: 'insensitive' } },
    ];
  }
  if (filters.portfolios.length) where.applicabilityPortfolios = { hasSome: filters.portfolios };
  if (filters.brands.length) where.applicabilityBrands = { hasSome: filters.brands };
  if (filters.icps.length) where.applicabilityIcps = { hasSome: filters.icps };
  if (filters.personas.length) where.applicabilityPersonas = { hasSome: filters.personas };
  if (filters.sourceType) where.source = { type: filters.sourceType };

  const orderBy: Record<string, string> =
    filters.sort === 'oldest' ? { createdAt: 'asc' }
    : filters.sort === 'category' ? { category: 'asc' }
    : { createdAt: 'desc' };

  const insights = await db.insight.findMany({
    where,
    orderBy,
    include: {
      source: {
        select: { id: true, title: true, type: true, category: true },
      },
    },
  });

  if (filters.sort === 'confidence') {
    insights.sort(
      (a, b) =>
        (CONFIDENCE_ORDER[a.confidence] ?? 99) - (CONFIDENCE_ORDER[b.confidence] ?? 99),
    );
  }

  const totalCount = await db.insight.count();

  return NextResponse.json({ insights, totalCount });
}
