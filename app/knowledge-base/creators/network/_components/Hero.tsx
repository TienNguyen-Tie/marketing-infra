import type { TapNetworkOverview } from '@/data/creators/types';
import styles from '../page.module.css';

function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;
}

export default function Hero({ overview }: { overview: TapNetworkOverview }) {
  return (
    <header className={styles.hero}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <a href="/knowledge-base">Knowledge Base</a>
        {' › '}
        <a href="/knowledge-base/creators">Creators</a>
        {' › '}
        <span>Network</span>
      </nav>
      <h1 className={styles.h1}>TAP Network Overview</h1>
      <p className={styles.subtitle}>
        Population-level snapshot of the TAP Creator network — counts, distributions, and
        observations. v1 uses curated estimates (manual refresh from Passio admin). Future versions
        may integrate live Passio data.
      </p>

      <div className={styles.snapshotBar}>
        <div className={styles.snapshotCell}>
          <span className={styles.snapshotLabel}>Snapshot Date</span>
          <span className={styles.snapshotValue}>{formatDate(overview.snapshotDate)}</span>
        </div>
        <div className={styles.snapshotCell}>
          <span className={styles.snapshotLabel}>Data Source</span>
          <span className={styles.snapshotValue}>
            {overview.snapshotMethod.charAt(0).toUpperCase() + overview.snapshotMethod.slice(1)}
          </span>
        </div>
      </div>
    </header>
  );
}
