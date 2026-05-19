import { db } from '@/lib/db';
import { SOURCE_SELECT } from './constants';

export async function getInsightsForPortfolio(slug: string) {
  return db.insight.findMany({
    where: { applicabilityPortfolios: { has: slug } },
    include: { source: { select: SOURCE_SELECT } },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getInsightsForBrand(slug: string) {
  return db.insight.findMany({
    where: { applicabilityBrands: { has: slug } },
    include: { source: { select: SOURCE_SELECT } },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getInsightsForIcp(slug: string) {
  return db.insight.findMany({
    where: { applicabilityIcps: { has: slug } },
    include: { source: { select: SOURCE_SELECT } },
    orderBy: { createdAt: 'desc' },
  });
}
