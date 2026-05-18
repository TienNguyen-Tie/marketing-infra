'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { PORTFOLIO_ACCOUNTS } from '@/data/portfolio/accounts';
import { getPortfolioStats } from '@/data/portfolio/helpers';
import { CATEGORY_LABELS } from '@/data/portfolio/types';
import type { ClientCategory } from '@/data/portfolio/types';
import styles from '../portfolio.module.css';

const stats = getPortfolioStats();

function portfolioStatus(account: (typeof PORTFOLIO_ACCOUNTS)[number]): 'engaged' | 'pitched' | 'inactive' {
  if (account.brands.some(b => b.status === 'active')) return 'engaged';
  if (account.brands.some(b => b.status === 'pitched' || b.status === 'prospect')) return 'pitched';
  return 'inactive';
}

const ALL_PARENTS = Array.from(
  new Map(
    [...PORTFOLIO_ACCOUNTS]
      .sort((a, b) => a.parentCompany.localeCompare(b.parentCompany))
      .map(a => [a.parentSlug, a.parentCompany]),
  ).entries(),
).map(([slug, label]) => ({ slug, label }));

const ALL_CATEGORIES: { value: ClientCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All categories' },
  ...(['beauty', 'mom-kid', 'home-care', 'fnb', 'fashion', 'electronics'] as ClientCategory[]).map(
    c => ({ value: c, label: CATEGORY_LABELS[c] }),
  ),
];

const STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  { value: 'engaged', label: 'Engaged' },
  { value: 'pitched', label: 'Pitched' },
  { value: 'inactive', label: 'Inactive' },
];

const SORTED = [...PORTFOLIO_ACCOUNTS].sort((a, b) => {
  const pc = a.parentCompany.localeCompare(b.parentCompany);
  return pc !== 0 ? pc : a.categoryName.localeCompare(b.categoryName);
});

export default function ClientPortfolioPage() {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<ClientCategory | 'all'>('all');
  const [filterParent, setFilterParent] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = useMemo(() => {
    return SORTED.filter(a => {
      if (filterCategory !== 'all' && a.category !== filterCategory) return false;
      if (filterParent !== 'all' && a.parentSlug !== filterParent) return false;
      if (filterStatus !== 'all' && portfolioStatus(a) !== filterStatus) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          a.parentCompany.toLowerCase().includes(q) ||
          a.categoryName.toLowerCase().includes(q) ||
          a.brands.some(b => b.name.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [search, filterCategory, filterParent, filterStatus]);

  const isFiltered = search || filterCategory !== 'all' || filterParent !== 'all' || filterStatus !== 'all';

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
          <span className={styles.statLabel}>Portfolios</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{stats.categoryCount}</span>
          <span className={styles.statLabel}>Categories</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{stats.totalProjects}</span>
          <span className={styles.statLabel}>Projects</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{stats.totalFullCases}</span>
          <span className={styles.statLabel}>Full cases</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{stats.totalPatterns}</span>
          <span className={styles.statLabel}>Patterns</span>
        </div>
      </div>

      {/* Filter bar */}
      <div className={styles.pfFilterBar}>
        <div className={styles.pfSearchWrap}>
          <span className={`material-icons-round ${styles.pfSearchIcon}`}>search</span>
          <input
            className={styles.pfSearchInput}
            placeholder="Search portfolios or brands…"
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
          {ALL_CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
        <select
          className={styles.pfSelect}
          value={filterParent}
          onChange={e => setFilterParent(e.target.value)}
        >
          <option value="all">All parents</option>
          {ALL_PARENTS.map(p => <option key={p.slug} value={p.slug}>{p.label}</option>)}
        </select>
        <select
          className={styles.pfSelect}
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
        >
          {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        {isFiltered && (
          <button
            className={styles.pfClearAll}
            onClick={() => { setSearch(''); setFilterCategory('all'); setFilterParent('all'); setFilterStatus('all'); }}
          >
            Clear filters
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className={styles.pfEmpty}>
          <span className={`material-icons-round ${styles.pfEmptyIcon}`}>search_off</span>
          <p className={styles.pfEmptyText}>No portfolios match your filters</p>
        </div>
      ) : (
        <div className={styles.pfGrid}>
          {filtered.map(a => {
            const displayTitle = a.isGeneralCategory ? a.parentCompany : a.categoryName;
            const fullCases = a.projects.filter(p => p.type === 'full-case').length;
            const topProject = a.projects.find(p => p.type === 'full-case');
            const status = portfolioStatus(a);
            return (
              <Link
                key={a.slug}
                href={`/knowledge-base/client-insight/portfolio/${a.slug}`}
                className={styles.pfCard}
              >
                <div className={styles.pfCardTop}>
                  <div className={styles.pfCardMeta}>
                    <p className={styles.pfCardParent}>{a.parentCompany}</p>
                    <p className={styles.pfCardTitle}>{displayTitle}</p>
                    {!a.isGeneralCategory && (
                      <p className={styles.pfCardSubtitle}>{CATEGORY_LABELS[a.category]}</p>
                    )}
                  </div>
                  <span className={styles.pfCatPill}>{a.isGeneralCategory ? CATEGORY_LABELS[a.category] : a.categoryName}</span>
                </div>

                <p className={styles.pfCardBrands}>{a.brands.map(b => b.name).join(' · ')}</p>

                {topProject && (
                  <div className={styles.pfCardOutcome}>
                    <p className={styles.pfCardOutcomeLabel}>Top outcome</p>
                    <p className={styles.pfCardOutcomeText}>{topProject.outcomeHeadline}</p>
                  </div>
                )}

                <div className={styles.pfCardFooter}>
                  <span className={styles.pfCardStat}>
                    <span className={`material-icons-round ${styles.pfCardStatIcon}`}>inventory_2</span>
                    {a.brands.length} brand{a.brands.length !== 1 ? 's' : ''}
                  </span>
                  <span className={styles.pfCardStat}>
                    <span className={`material-icons-round ${styles.pfCardStatIcon}`}>folder</span>
                    {a.projects.length} projects · {fullCases} full case{fullCases !== 1 ? 's' : ''}
                  </span>
                  {a.totalGmvLabel && (
                    <span className={styles.pfCardStat}>
                      <span className={`material-icons-round ${styles.pfCardStatIcon}`}>trending_up</span>
                      {a.totalGmvLabel}
                    </span>
                  )}
                  <span className={`${styles.pfStatusDot} ${styles[`pfStatus--${status}`]}`} />
                  <span className={styles.pfCardSince}>Since {a.engagedSince}</span>
                </div>
              </Link>
            );
          })}
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
