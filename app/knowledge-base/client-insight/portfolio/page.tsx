'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { PORTFOLIO_ACCOUNTS } from '@/data/portfolio/accounts';
import { getPortfolioStats, getDisplayName } from '@/data/portfolio/helpers';
import { CATEGORY_LABELS } from '@/data/portfolio/types';
import type { ClientCategory } from '@/data/portfolio/types';
import styles from '../portfolio.module.css';

const stats = getPortfolioStats();

const ALL_PARENTS = Array.from(
  new Map(PORTFOLIO_ACCOUNTS.map(a => [a.parentSlug, a.parentCompany])).entries(),
).map(([slug, label]) => ({ slug, label }));

const ALL_CATEGORIES: { value: ClientCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All categories' },
  ...(['beauty', 'mom-kid', 'home-care', 'fnb', 'fashion', 'electronics'] as ClientCategory[]).map(
    c => ({ value: c, label: CATEGORY_LABELS[c] }),
  ),
];

export default function ClientPortfolioPage() {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<ClientCategory | 'all'>('all');
  const [filterParent, setFilterParent] = useState<string>('all');

  const filtered = useMemo(() => {
    return PORTFOLIO_ACCOUNTS.filter(a => {
      if (filterCategory !== 'all' && a.category !== filterCategory) return false;
      if (filterParent !== 'all' && a.parentSlug !== filterParent) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !a.parentCompany.toLowerCase().includes(q) &&
          !a.categoryName.toLowerCase().includes(q) &&
          !a.name.toLowerCase().includes(q) &&
          !a.brands.some(b => b.name.toLowerCase().includes(q))
        ) return false;
      }
      return true;
    });
  }, [search, filterCategory, filterParent]);

  return (
    <div className={styles.page}>
      <p className={styles.breadcrumb}>Knowledge Base › Client Insight › Client Portfolio</p>

      <div className={styles.pageHeaderRow}>
        <div className={styles.pageHeaderLeft}>
          <h1 className={styles.pageTitle}>Client Portfolio</h1>
          <p className={styles.pageSubtitle}>
            Locked accounts with verified case studies, extracted patterns, and reference tags —
            structured for AI to cite when matching new accounts to proven plays.
          </p>
        </div>
        <span className={styles.lockedBadge}>
          <span className={`material-icons-round ${styles.lockedBadgeIcon}`}>lock</span>
          Locked {PORTFOLIO_ACCOUNTS[0].version}
        </span>
      </div>

      <div className={styles.statsBanner}>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{stats.totalAccounts}</span>
          <span className={styles.statLabel}>Portfolios locked</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{stats.categoryCount}</span>
          <span className={styles.statLabel}>Categories</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{stats.totalProjects}</span>
          <span className={styles.statLabel}>Projects logged</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{stats.totalFullCases}</span>
          <span className={styles.statLabel}>Full cases</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{stats.totalPatterns}</span>
          <span className={styles.statLabel}>Patterns extracted</span>
        </div>
      </div>

      {/* Filter bar */}
      <div className={styles.pfFilterBar}>
        <div className={styles.pfSearchWrap}>
          <span className={`material-icons-round ${styles.pfSearchIcon}`}>search</span>
          <input
            className={styles.pfSearchInput}
            placeholder="Search portfolios, brands…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className={styles.pfSearchClear} onClick={() => setSearch('')}>
              <span className="material-icons-round" style={{ fontSize: 16 }}>close</span>
            </button>
          )}
        </div>

        <select
          className={styles.pfSelect}
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value as ClientCategory | 'all')}
        >
          {ALL_CATEGORIES.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>

        <select
          className={styles.pfSelect}
          value={filterParent}
          onChange={e => setFilterParent(e.target.value)}
        >
          <option value="all">All parents</option>
          {ALL_PARENTS.map(p => (
            <option key={p.slug} value={p.slug}>{p.label}</option>
          ))}
        </select>

        {(search || filterCategory !== 'all' || filterParent !== 'all') && (
          <button
            className={styles.pfClearAll}
            onClick={() => { setSearch(''); setFilterCategory('all'); setFilterParent('all'); }}
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Portfolio grid */}
      {filtered.length === 0 ? (
        <div className={styles.pfEmpty}>
          <span className={`material-icons-round ${styles.pfEmptyIcon}`}>search_off</span>
          <p className={styles.pfEmptyText}>No portfolios match your filters</p>
        </div>
      ) : (
        <div className={styles.pfGrid}>
          {filtered.map(a => {
            const fullCases = a.projects.filter(p => p.type === 'full-case');
            const allPatterns =
              fullCases.reduce((n, p) => n + (p.type === 'full-case' ? p.patterns.length : 0), 0) +
              a.accountPatterns.length;
            const topProject = fullCases[0];
            const displayName = getDisplayName(a);

            return (
              <Link
                key={a.slug}
                href={`/knowledge-base/client-insight/portfolio/${a.slug}`}
                className={styles.pfCard}
              >
                <div className={styles.pfCardTop}>
                  <div className={styles.pfCardMeta}>
                    <p className={styles.pfCardParent}>{a.parentCompany}</p>
                    <p className={styles.pfCardTitle}>{displayName}</p>
                    {!a.isGeneralCategory && (
                      <p className={styles.pfCardSubtitle}>{CATEGORY_LABELS[a.category]}</p>
                    )}
                  </div>
                  <div className={styles.pfCardBadges}>
                    <span className={styles.pfCatPill}>{CATEGORY_LABELS[a.category]}</span>
                  </div>
                </div>

                <p className={styles.pfCardBrands}>
                  {a.brands.map(b => b.name).join(' · ')}
                </p>

                {topProject && (
                  <div className={styles.pfCardOutcome}>
                    <p className={styles.pfCardOutcomeLabel}>Top outcome</p>
                    <p className={styles.pfCardOutcomeText}>{topProject.outcomeHeadline}</p>
                  </div>
                )}

                <div className={styles.pfCardFooter}>
                  <span className={styles.pfCardStat}>
                    <span className={`material-icons-round ${styles.pfCardStatIcon}`}>folder</span>
                    {a.projects.length} projects
                  </span>
                  <span className={styles.pfCardStat}>
                    <span className={`material-icons-round ${styles.pfCardStatIcon}`}>merge</span>
                    {allPatterns} patterns
                  </span>
                  {a.totalGmvLabel && (
                    <span className={styles.pfCardStat}>
                      <span className={`material-icons-round ${styles.pfCardStatIcon}`}>trending_up</span>
                      {a.totalGmvLabel}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}

          {/* Empty state card */}
          <div className={styles.acardEmpty}>
            <span className={`material-icons-round ${styles.acardEmptyIcon}`}>archive</span>
            <span className={styles.acardEmptyText}>Lock new account</span>
          </div>
        </div>
      )}

      <p className={styles.footerNote}>
        + F&amp;B category locking next week · 3 more accounts in review
      </p>
    </div>
  );
}
