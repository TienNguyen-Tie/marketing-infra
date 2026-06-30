export interface InsightWithSource {
  id: string;
  sourceId: string;
  headline: string;
  detail: string;
  evidence: string | null;
  reference: string | null;
  category: string;
  confidence: string;
  applicabilityPortfolios: string[];
  applicabilityBrands: string[];
  applicabilityIcps: string[];
  tags: string[];
  source: {
    id: string;
    title: string;
    type: string;
    category: string | null;
  };
}

export type SourceType = 'pdf' | 'url-collection';

export type SourceCategory =
  | 'market-research'
  | 'industry-report'
  | 'consumer-insight'
  | 'competitive'
  | 'platform-trend'
  | 'other';

export type InsightCategory =
  | 'audience'
  | 'market'
  | 'competitive'
  | 'content'
  | 'platform'
  | 'other';

export type Confidence = 'high' | 'medium' | 'low' | 'speculative';

export interface UrlRef {
  url: string;
  title?: string;
  quote?: string;
  notes?: string;
}
