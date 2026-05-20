import type { getCreatorStats } from '@/data/creators/helpers';
import styles from '../page.module.css';

type Props = {
  stats: ReturnType<typeof getCreatorStats>;
};

export default function StatsStrip({ stats }: Props) {
  return (
    <div className={styles.statsStrip}>
      <div className={styles.statCell}>
        <span className={styles.statValue}>{stats.archetypeCount}</span>
        <span className={styles.statLabel}>Archetypes Total</span>
      </div>
      <div className={styles.statCell}>
        <span className={styles.statValue}>{stats.coreArchetypeCount}</span>
        <span className={styles.statLabel}>Core</span>
      </div>
      <div className={styles.statCell}>
        <span className={styles.statValue}>{stats.emergingArchetypeCount}</span>
        <span className={styles.statLabel}>Emerging</span>
      </div>
      <div className={styles.statCell}>
        <span className={styles.statValue}>{stats.nicheArchetypeCount}</span>
        <span className={styles.statLabel}>Niche</span>
      </div>
      <div className={styles.statCell}>
        <span className={styles.statValue}>{stats.marketCount}</span>
        <span className={styles.statLabel}>Markets Covered</span>
      </div>
    </div>
  );
}
