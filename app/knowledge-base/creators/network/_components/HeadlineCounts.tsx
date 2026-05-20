import type { TapNetworkOverview } from '@/data/creators/types';
import styles from '../page.module.css';

export default function HeadlineCounts({ overview }: { overview: TapNetworkOverview }) {
  return (
    <div className={styles.headlineCounts}>
      <div className={styles.headlineCell}>
        <span className={styles.headlineLabel}>Active</span>
        <span className={styles.headlineNumber}>
          {overview.estimatedActiveCount.toLocaleString()}
        </span>
        <span className={styles.headlineSubtitle}>Posting + earning consistently</span>
      </div>
      <div className={styles.headlineCell}>
        <span className={styles.headlineLabel}>Dormant</span>
        <span className={styles.headlineNumber}>
          {overview.estimatedDormantCount.toLocaleString()}
        </span>
        <span className={styles.headlineSubtitle}>Registered but inactive</span>
      </div>
      <div className={styles.headlineCell}>
        <span className={styles.headlineLabel}>Total Registered</span>
        <span className={styles.headlineNumber}>
          {overview.estimatedTotalRegisteredCount.toLocaleString()}
        </span>
        <span className={styles.headlineSubtitle}>All TAP creators on Passio (active + dormant)</span>
      </div>
    </div>
  );
}
