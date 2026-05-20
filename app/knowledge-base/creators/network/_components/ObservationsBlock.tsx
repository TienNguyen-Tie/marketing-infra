import type { TapNetworkOverview } from '@/data/creators/types';
import styles from '../page.module.css';

export default function ObservationsBlock({ overview }: { overview: TapNetworkOverview }) {
  if (!overview.observations) return null;

  return (
    <div className={styles.observationsSection}>
      <div className={styles.distributionHeader}>
        <p className={styles.distributionEyebrow}>Observations</p>
        <h2 className={styles.distributionH2}>Network State Notes</h2>
      </div>
      <div className={styles.observationsCard}>
        <p className={styles.observationsBody}>{overview.observations}</p>
      </div>
    </div>
  );
}
