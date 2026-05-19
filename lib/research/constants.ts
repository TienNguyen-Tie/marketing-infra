import type { SourceCategory, InsightCategory, Confidence } from './types';

export const SOURCE_CATEGORY_LABELS: Record<SourceCategory, string> = {
  'market-research': 'Market Research',
  'industry-report': 'Industry Report',
  'consumer-insight': 'Consumer Insight',
  'competitive': 'Competitive Intel',
  'creator-trend': 'Creator Trend',
  'platform-trend': 'Platform Trend',
  'other': 'Other',
};

export const INSIGHT_CATEGORY_LABELS: Record<InsightCategory, string> = {
  'audience': 'Audience',
  'market': 'Market',
  'competitive': 'Competitive',
  'creator': 'Creator',
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
