import type { InsightCategory, Confidence } from './types';

export type InsightSort = 'newest' | 'oldest' | 'confidence' | 'category';

export interface InsightFilters {
  categories: InsightCategory[];
  confidence: Confidence[];
  tags: string[];
  search: string;
  portfolios: string[];
  brands: string[];
  icps: string[];
  sourceType?: 'pdf' | 'url-collection';
  sort: InsightSort;
}

export const EMPTY_FILTERS: InsightFilters = {
  categories: [],
  confidence: [],
  tags: [],
  search: '',
  portfolios: [],
  brands: [],
  icps: [],
  sourceType: undefined,
  sort: 'newest',
};

export function filtersFromURL(params: URLSearchParams): InsightFilters {
  const csv = (key: string) =>
    (params.get(key) ?? '').split(',').map(s => s.trim()).filter(Boolean);

  return {
    categories: csv('categories') as InsightCategory[],
    confidence: csv('confidence') as Confidence[],
    tags: csv('tags'),
    search: params.get('search') ?? '',
    portfolios: csv('portfolios'),
    brands: csv('brands'),
    icps: csv('icps'),
    sourceType: (params.get('sourceType') as 'pdf' | 'url-collection') || undefined,
    sort: (params.get('sort') as InsightSort) || 'newest',
  };
}

export function filtersToURL(
  filters: InsightFilters,
  existingParams?: URLSearchParams
): URLSearchParams {
  const params = new URLSearchParams(existingParams?.toString() ?? '');
  const tab = params.get('tab');

  ['categories', 'confidence', 'tags', 'search', 'portfolios',
    'brands', 'icps', 'sourceType', 'sort'].forEach(k => params.delete(k));

  if (filters.categories.length) params.set('categories', filters.categories.join(','));
  if (filters.confidence.length) params.set('confidence', filters.confidence.join(','));
  if (filters.tags.length) params.set('tags', filters.tags.join(','));
  if (filters.search) params.set('search', filters.search);
  if (filters.portfolios.length) params.set('portfolios', filters.portfolios.join(','));
  if (filters.brands.length) params.set('brands', filters.brands.join(','));
  if (filters.icps.length) params.set('icps', filters.icps.join(','));
  if (filters.sourceType) params.set('sourceType', filters.sourceType);
  if (filters.sort !== 'newest') params.set('sort', filters.sort);

  if (tab) params.set('tab', tab);
  return params;
}

export function hasActiveFilters(filters: InsightFilters): boolean {
  return filters.categories.length > 0
    || filters.confidence.length > 0
    || filters.tags.length > 0
    || filters.search.length > 0
    || filters.portfolios.length > 0
    || filters.brands.length > 0
    || filters.icps.length > 0
    || filters.sourceType !== undefined;
}
