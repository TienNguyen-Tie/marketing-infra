'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { SOURCE_CATEGORY_LABELS } from '@/lib/research/constants';
import styles from './research.module.css';

export default function ResearchFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const type = searchParams.get('type') ?? 'all';
  const category = searchParams.get('category') ?? 'all';
  const tags = searchParams.get('tags') ?? '';
  const sort = searchParams.get('sort') ?? 'newest';

  const push = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === 'all' || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  return (
    <div className={styles.filtersBar}>
      {/* Type chips */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className={styles.filterLabel}>Type</span>
        <div className={styles.chipFilters}>
          {(['all', 'pdf', 'url-collection'] as const).map(t => (
            <button
              key={t}
              className={`${styles.chip}${type === t ? ' ' + styles.chipActive : ''}`}
              onClick={() => push('type', t)}
            >
              {t === 'all' ? 'All' : t === 'pdf' ? 'PDF' : 'URL Collection'}
            </button>
          ))}
        </div>
      </div>

      {/* Category dropdown */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className={styles.filterLabel}>Category</span>
        <select
          className={styles.filterSelect}
          value={category}
          onChange={e => push('category', e.target.value)}
        >
          <option value="all">All categories</option>
          {Object.entries(SOURCE_CATEGORY_LABELS).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </div>

      {/* Tags search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className={styles.filterLabel}>Tags</span>
        <input
          type="text"
          className={styles.filterSearch}
          placeholder="Filter by tag…"
          value={tags}
          onChange={e => push('tags', e.target.value)}
        />
      </div>

      {/* Sort */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
        <span className={styles.filterLabel}>Sort</span>
        <select
          className={styles.filterSelect}
          value={sort}
          onChange={e => push('sort', e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="title">Title A–Z</option>
        </select>
      </div>
    </div>
  );
}
