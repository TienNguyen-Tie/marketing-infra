import Link from 'next/link';
import { getAllIcps, getAllIcpStats, getPortfoliosByIcp } from '@/data/icps/helpers';
import type { ICP, ICPStatus, ICPTier } from '@/data/icps/types';
import { getDraftsForKind } from '@/lib/drafts/helpers';
import IcpListingClient from '@/components/drafts/IcpListingClient';
import styles from './icps.module.css';

const STATUS_LABELS: Record<ICPStatus, string> = {
  validated: 'Validated',
  active: 'Active',
  evaluating: 'Evaluating',
  deprioritized: 'Deprioritized',
};

const TIER_DESC: Record<ICPTier, string> = {
  1: 'Highest priority',
  2: 'Active pursuit',
  3: 'Exploratory',
};

function ICPCard({ icp }: { icp: ICP }) {
  const portfolioCount = getPortfoliosByIcp(icp.slug).length;
  const visibleTags = icp.verticalTags.slice(0, 4);
  const overflowCount = icp.verticalTags.length - 4;

  return (
    <div className={styles.icpCard}>
      <div className={styles.icpCardTopRow}>
        <span className={styles.icpCardName}>{icp.name}</span>
        <span className={`${styles.statusPill} ${styles[`status--${icp.status}`]}`}>
          {STATUS_LABELS[icp.status]}
        </span>
      </div>
      <div className={styles.icpCardSubRow}>
        <span className={`${styles.tierBadge} ${styles[`tier--${icp.tier}`]}`}>
          TIER {icp.tier}
        </span>
        <span className={styles.icpCardShortCode}>{icp.shortCode}</span>
        <span className={styles.icpCardGeo}>{icp.geography.join(' · ')}</span>
      </div>
      {icp.oneSentenceDefinition ? (
        <p className={styles.icpCardDefinition}>{icp.oneSentenceDefinition}</p>
      ) : (
        <p className={`${styles.icpCardDefinition} ${styles.muted}`}>Definition not yet captured.</p>
      )}
      <div className={styles.icpCardStats}>
        <span className={styles.icpCardStat}>
          <span className={styles.icpCardStatLabel}>PORTFOLIOS</span>
          <span className={styles.icpCardStatVal}>{portfolioCount}</span>
        </span>
        <span className={styles.icpCardStat}>
          <span className={styles.icpCardStatLabel}>VERTICALS</span>
          <span className={styles.icpCardStatVal}>{icp.verticalTags.length}</span>
        </span>
        <span className={styles.icpCardStat}>
          <span className={styles.icpCardStatLabel}>TIER</span>
          <span className={styles.icpCardStatVal}>{TIER_DESC[icp.tier]}</span>
        </span>
      </div>
      <div className={styles.icpCardTags}>
        {visibleTags.map(tag => (
          <span key={tag} className={styles.verticalPill}>{tag}</span>
        ))}
        {overflowCount > 0 && (
          <span className={styles.verticalPillOverflow}>+{overflowCount}</span>
        )}
      </div>
      <div className={styles.icpCardFooter}>
        <Link href={`/knowledge-base/client-insight/icps/${icp.slug}`} className={styles.viewLink}>
          View ICP →
        </Link>
      </div>
    </div>
  );
}

export default async function ICPsPage() {
  const icps = getAllIcps();
  const stats = getAllIcpStats();
  const icpDrafts = await getDraftsForKind('icp');

  const icpGrid = icps.length === 0 ? (
    <div className={styles.emptyState}>
      <p className={styles.emptyTitle}>No ICPs defined yet</p>
      <p className={styles.emptyBody}>
        ICPs are the lens for understanding which clients Ecomobi wins with.
        Add them to <code>data/icps/icps.ts</code> following the type definition.
      </p>
    </div>
  ) : (
    <div className={styles.icpGrid}>
      {icps.map(icp => (
        <ICPCard key={icp.slug} icp={icp} />
      ))}
    </div>
  );

  return (
    <div className={styles.page}>
      <p className={styles.breadcrumb}>
        Knowledge Base ›{' '}
        <Link href="/knowledge-base/client-insight" style={{ color: 'inherit', textDecoration: 'none' }}>
          Client Insight
        </Link>{' '}
        › ICPs
      </p>

      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <h1 className={styles.heroH1}>Ideal Client Profiles</h1>
          <p className={styles.heroSubtitle}>
            ICPs describe the <em>types of companies</em> Ecomobi targets — distinct from
            Decision-maker Personas, which describe the <em>people</em> inside those companies.
            A sharp ICP definition makes every downstream decision sharper: who to pitch,
            what to lead with, which portfolios to deepen, which to deprioritize.
          </p>
        </div>
      </div>

      <div className={styles.statsStrip}>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{stats.totalIcps}</span>
          <span className={styles.statLabel}>ICPs Defined</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{stats.mappedPortfolios}</span>
          <span className={styles.statLabel}>Portfolios Mapped</span>
        </div>
        <div className={`${styles.statItem} ${stats.unmappedPortfolios > 0 ? styles.statItemWarning : ''}`}>
          <span className={`${styles.statNum} ${stats.unmappedPortfolios > 0 ? styles.statNumWarning : ''}`}>
            {stats.unmappedPortfolios}
          </span>
          <span className={styles.statLabel}>Portfolios Unmapped</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{stats.tier1Count}</span>
          <span className={styles.statLabel}>Tier-1 ICPs</span>
        </div>
      </div>

      <IcpListingClient
        icpDrafts={icpDrafts}
        addBtnClassName={styles.addIcpBtn}
      >
        {icpGrid}
      </IcpListingClient>
    </div>
  );
}
