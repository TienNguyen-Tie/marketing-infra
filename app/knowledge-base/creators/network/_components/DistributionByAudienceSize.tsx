import type { TapNetworkOverview } from '@/data/creators/types';
import { AUDIENCE_SIZE_BAND_LABELS } from '@/data/creators/helpers';
import styles from '../page.module.css';

export default function DistributionByAudienceSize({
  overview,
}: {
  overview: TapNetworkOverview;
}) {
  const { distributionByAudienceSizeBand } = overview;
  const total = distributionByAudienceSizeBand.reduce((sum, d) => sum + d.estimatedCount, 0);

  return (
    <div className={styles.distributionSection}>
      <div className={styles.distributionHeader}>
        <p className={styles.distributionEyebrow}>Distribution</p>
        <h2 className={styles.distributionH2}>By Audience Size Band</h2>
        <p className={styles.distributionSubtitle}>Active creators by follower-count band.</p>
      </div>

      <div className={styles.distributionTable}>
        {distributionByAudienceSizeBand.length === 0 ? (
          <p className={styles.distributionEmpty}>No audience size distribution data captured yet.</p>
        ) : (
          <>
            {distributionByAudienceSizeBand.map(d => (
              <div key={d.band} className={styles.distributionRow}>
                <div className={styles.distributionName}>
                  <span className={styles.distributionNameText}>
                    {AUDIENCE_SIZE_BAND_LABELS[d.band]}
                  </span>
                </div>
                <span className={styles.distributionCount}>
                  {d.estimatedCount.toLocaleString()}
                </span>
                <span className={styles.distributionNote}>{d.note ?? ''}</span>
              </div>
            ))}
            <div className={styles.distributionTotalRow}>
              <span className={styles.distributionTotalLabel}>Total</span>
              <span className={styles.distributionTotalCount}>
                {total.toLocaleString()}
              </span>
              <span />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
