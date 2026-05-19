'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  filtersFromURL,
  filtersToURL,
  hasActiveFilters,
  EMPTY_FILTERS,
} from '@/lib/research/insight-filters';
import type { InsightFilters } from '@/lib/research/insight-filters';
import type { InsightCategory, Confidence } from '@/lib/research/types';
import {
  INSIGHT_CATEGORY_LABELS,
  CONFIDENCE_LABELS,
} from '@/lib/research/constants';
import InsightListItem from './InsightListItem';
import type { InsightWithSource } from '@/lib/research/types';
import InsightDetailModal from './InsightDetailModal';
import styles from '@/app/knowledge-base/research/research.module.css';

const CONF_ACTIVE_CLASS: Record<string, string> = {
  high: styles.insightChipHighActive,
  medium: styles.insightChipMediumActive,
  low: styles.insightChipLowActive,
  speculative: styles.insightChipSpecActive,
};

export default function InsightsTab() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = filtersFromURL(searchParams as unknown as URLSearchParams);

  const [insights, setInsights] = useState<InsightWithSource[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedInsight, setSelectedInsight] = useState<InsightWithSource | null>(null);

  // Local text states (debounced before pushing to URL)
  const [searchInput, setSearchInput] = useState(filters.search);
  const [tagsInput, setTagsInput] = useState(filters.tags.join(', '));
  const [portfoliosInput, setPortfoliosInput] = useState(filters.portfolios.join(', '));
  const [brandsInput, setBrandsInput] = useState(filters.brands.join(', '));
  const [icpsInput, setIcpsInput] = useState(filters.icps.join(', '));

  const searchRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const tagsRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const portfoliosRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const brandsRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const icpsRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Fetch on filter change
  useEffect(() => {
    setLoading(true);
    fetch(`/api/research/insights?${searchParams.toString()}`)
      .then(r => r.json())
      .then(data => {
        setInsights(data.insights ?? []);
        setTotalCount(data.totalCount ?? 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchParams.toString()]);

  function pushFilters(updated: InsightFilters) {
    const params = filtersToURL(updated, searchParams as unknown as URLSearchParams);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function toggleCategory(cat: string) {
    const cats = filters.categories.includes(cat as InsightCategory)
      ? filters.categories.filter(c => c !== cat)
      : [...filters.categories, cat as InsightCategory];
    pushFilters({ ...filters, categories: cats });
  }

  function toggleConfidence(conf: string) {
    const confs = filters.confidence.includes(conf as Confidence)
      ? filters.confidence.filter(c => c !== conf)
      : [...filters.confidence, conf as Confidence];
    pushFilters({ ...filters, confidence: confs });
  }

  function toggleSourceType(t: 'pdf' | 'url-collection' | undefined) {
    pushFilters({ ...filters, sourceType: t });
  }

  function debounce<T extends ReturnType<typeof setTimeout>>(
    ref: React.MutableRefObject<T | undefined>,
    fn: () => void,
    ms = 300,
  ) {
    clearTimeout(ref.current);
    ref.current = setTimeout(fn, ms) as T;
  }

  function handleSearchChange(value: string) {
    setSearchInput(value);
    debounce(searchRef, () => pushFilters({ ...filters, search: value }));
  }

  function handleTagsChange(value: string) {
    setTagsInput(value);
    debounce(tagsRef, () =>
      pushFilters({ ...filters, tags: value.split(',').map(t => t.trim()).filter(Boolean) }),
    );
  }

  function handlePortfoliosChange(value: string) {
    setPortfoliosInput(value);
    debounce(portfoliosRef, () =>
      pushFilters({ ...filters, portfolios: value.split(',').map(t => t.trim()).filter(Boolean) }),
    );
  }

  function handleBrandsChange(value: string) {
    setBrandsInput(value);
    debounce(brandsRef, () =>
      pushFilters({ ...filters, brands: value.split(',').map(t => t.trim()).filter(Boolean) }),
    );
  }

  function handleIcpsChange(value: string) {
    setIcpsInput(value);
    debounce(icpsRef, () =>
      pushFilters({ ...filters, icps: value.split(',').map(t => t.trim()).filter(Boolean) }),
    );
  }

  function clearFilters() {
    setSearchInput('');
    setTagsInput('');
    setPortfoliosInput('');
    setBrandsInput('');
    setIcpsInput('');
    pushFilters({ ...EMPTY_FILTERS, sort: 'newest' });
  }

  const active = hasActiveFilters(filters);

  return (
    <>
      {/* Header strip */}
      <div className={styles.insightTabMeta}>
        <span className={styles.insightTabCount}>
          {loading ? 'Loading…' : `Showing ${insights.length} of ${totalCount} insights`}
        </span>
        {active && (
          <button type="button" className={styles.clearFiltersLink} onClick={clearFilters}>
            Clear all filters
          </button>
        )}
      </div>

      {/* Filter panel */}
      <div className={styles.insightFiltersPanel}>
        {/* Category */}
        <div className={styles.insightFilterGroup}>
          <span className={styles.insightFilterGroupLabel}>Category</span>
          <div className={styles.insightChipRow}>
            {(Object.entries(INSIGHT_CATEGORY_LABELS) as [InsightCategory, string][]).map(
              ([k, label]) => (
                <button
                  key={k}
                  type="button"
                  className={`${styles.insightChip} ${filters.categories.includes(k) ? styles.insightChipActive : ''}`}
                  onClick={() => toggleCategory(k)}
                >
                  {label}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Confidence */}
        <div className={styles.insightFilterGroup}>
          <span className={styles.insightFilterGroupLabel}>Confidence</span>
          <div className={styles.insightChipRow}>
            {(Object.entries(CONFIDENCE_LABELS) as [Confidence, string][]).map(([k, label]) => (
              <button
                key={k}
                type="button"
                className={`${styles.insightChip} ${filters.confidence.includes(k) ? (CONF_ACTIVE_CLASS[k] ?? styles.insightChipActive) : ''}`}
                onClick={() => toggleConfidence(k)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Source type */}
        <div className={styles.insightFilterGroup}>
          <span className={styles.insightFilterGroupLabel}>Source Type</span>
          <div className={styles.insightChipRow}>
            {(
              [
                [undefined, 'All'],
                ['pdf', 'PDF'],
                ['url-collection', 'URL Collection'],
              ] as const
            ).map(([val, label]) => (
              <button
                key={String(val)}
                type="button"
                className={`${styles.insightChip} ${filters.sourceType === val ? styles.insightChipActive : ''}`}
                onClick={() => toggleSourceType(val)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Applicability */}
        <div className={styles.insightFilterGroup}>
          <span className={styles.insightFilterGroupLabel}>Applicability</span>
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span className={styles.insightFilterGroupLabel} style={{ fontSize: 8 }}>Portfolios</span>
              <input
                className={styles.insightFilterInput}
                value={portfoliosInput}
                onChange={e => handlePortfoliosChange(e.target.value)}
                placeholder="slug, slug…"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span className={styles.insightFilterGroupLabel} style={{ fontSize: 8 }}>Brands</span>
              <input
                className={styles.insightFilterInput}
                value={brandsInput}
                onChange={e => handleBrandsChange(e.target.value)}
                placeholder="slug, slug…"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span className={styles.insightFilterGroupLabel} style={{ fontSize: 8 }}>ICPs</span>
              <input
                className={styles.insightFilterInput}
                value={icpsInput}
                onChange={e => handleIcpsChange(e.target.value)}
                placeholder="slug, slug…"
              />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className={styles.insightFilterGroup}>
          <span className={styles.insightFilterGroupLabel}>Tags</span>
          <input
            className={styles.insightFilterInput}
            value={tagsInput}
            onChange={e => handleTagsChange(e.target.value)}
            placeholder="tag, tag…"
            style={{ width: 140 }}
          />
        </div>

        {/* Search */}
        <div className={styles.insightFilterGroup}>
          <span className={styles.insightFilterGroupLabel}>Search</span>
          <div className={styles.insightSearchWrapper}>
            <span className={`material-icons-round ${styles.insightSearchIcon}`}>search</span>
            <input
              className={styles.insightSearchInput}
              value={searchInput}
              onChange={e => handleSearchChange(e.target.value)}
              placeholder="Headline, detail, evidence…"
            />
          </div>
        </div>

        {/* Sort */}
        <div className={styles.insightFilterGroup} style={{ marginLeft: 'auto' }}>
          <span className={styles.insightFilterGroupLabel}>Sort</span>
          <select
            className={styles.insightSortSelect}
            value={filters.sort}
            onChange={e =>
              pushFilters({ ...filters, sort: e.target.value as InsightFilters['sort'] })
            }
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="confidence">By confidence</option>
            <option value="category">By category</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className={styles.skeletonList}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={styles.skeletonRow} />
          ))}
        </div>
      ) : totalCount === 0 ? (
        <div className={styles.emptyState}>
          <span className={`material-icons-round ${styles.emptyIllustration}`}>
            auto_awesome
          </span>
          <p className={styles.emptyTitle}>No insights yet</p>
          <p className={styles.emptyBody}>
            Add a research source and extract insights from it to start building your library.
          </p>
          <Link href="/knowledge-base/research/new" className={styles.btnPrimary}>
            <span className={`material-icons-round ${styles.btnPrimaryIcon}`}>add</span>
            Add Source
          </Link>
        </div>
      ) : insights.length === 0 ? (
        <div className={styles.emptyState}>
          <span className={`material-icons-round ${styles.emptyIllustration}`}>
            filter_list_off
          </span>
          <p className={styles.emptyTitle}>No insights match your filters</p>
          <p className={styles.emptyBody}>
            Try adjusting categories, tags, or applicability filters.
          </p>
          <button type="button" className={styles.btnPrimary} onClick={clearFilters}>
            Clear all filters
          </button>
        </div>
      ) : (
        <div className={styles.insightList}>
          {insights.map(insight => (
            <InsightListItem
              key={insight.id}
              insight={insight}
              onClick={() => setSelectedInsight(insight)}
            />
          ))}
        </div>
      )}

      {/* Detail modal */}
      {selectedInsight && (
        <InsightDetailModal
          insight={selectedInsight}
          isOpen={true}
          onClose={() => setSelectedInsight(null)}
          onUpdate={updated => {
            setInsights(prev => prev.map(i => (i.id === updated.id ? updated : i)));
            setSelectedInsight(updated);
          }}
          onDelete={id => {
            setInsights(prev => prev.filter(i => i.id !== id));
            setTotalCount(c => c - 1);
            setSelectedInsight(null);
          }}
        />
      )}
    </>
  );
}
