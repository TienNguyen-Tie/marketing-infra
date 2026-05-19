export type SourceType = 'pdf' | 'url-collection';

export type SourceCategory =
  | 'market-research'
  | 'industry-report'
  | 'consumer-insight'
  | 'competitive'
  | 'creator-trend'
  | 'platform-trend'
  | 'other';

export type InsightCategory =
  | 'audience'
  | 'market'
  | 'competitive'
  | 'creator'
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
