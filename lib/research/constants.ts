import type { SourceCategory, InsightCategory, Confidence } from './types';

export const SOURCE_CATEGORY_LABELS: Record<SourceCategory, string> = {
  'market-research': 'Market Research',
  'industry-report': 'Industry Report',
  'consumer-insight': 'Consumer Insight',
  'competitive': 'Competitive Intel',
  'platform-trend': 'Platform Trend',
  'other': 'Other',
};

export const INSIGHT_CATEGORY_LABELS: Record<InsightCategory, string> = {
  'audience': 'Audience',
  'market': 'Market',
  'competitive': 'Competitive',
  'content': 'Content',
  'platform': 'Platform',
  'other': 'Other',
};

export const CONFIDENCE_LABELS: Record<Confidence, string> = {
  'high': 'High',
  'medium': 'Medium',
  'low': 'Low',
  'speculative': 'Speculative',
};

export const MAX_PDF_SIZE_MB = 50;
export const MAX_PDF_SIZE_BYTES = MAX_PDF_SIZE_MB * 1024 * 1024;

/**
 * Standard Prisma select shape for the Source relation when included
 * with insights. Centralized so changes to what we surface about a
 * source on insight cards propagate consistently.
 */
export const SOURCE_SELECT = {
  id: true,
  title: true,
  type: true,
  category: true,
} as const;
