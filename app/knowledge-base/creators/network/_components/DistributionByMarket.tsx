import type { TapNetworkOverview } from '@/data/creators/types';
import { getMarketBySlug } from '@/data/creators/helpers';
import styles from '../page.module.css';

export default function DistributionByMarket({
  overview,
}: {
  overview: TapNetworkOverview;
}) {
  const { distributionByMarket } = overview;
  const total = distributionByMarket.reduce((sum, d) => sum + d.estimatedCount, 0);

  return (
    <div className={styles.distributionSection}>
      <div className={styles.distributionHeader}>
        <p className={styles.distributionEyebrow}>Distribution</p>
        <h2 className={styles.distributionH2}>By Market</h2>
        <p className={styles.distributionSubtitle}>Estimated active creators per market.</p>
      </div>

      <div className={styles.distributionTable}>
        {distributionByMarket.length === 0 ? (
          <p className={styles.distributionEmpty}>No market distribution data captured yet.</p>
        ) : (
          <>
            {distributionByMarket.map(d => {
              const market = getMarketBySlug(d.marketSlug);
              const name = market?.name ?? d.marketSlug.toUpperCase();

              return (
                <div key={d.marketSlug} className={styles.distributionRow}>
                  <div className={styles.distributionName}>
                    <a
                      href={`/knowledge-base/creators/markets/${d.marketSlug}`}
                      className={styles.distributionNameLink}
                    >
                      {name}
                    </a>
                  </div>
                  <span className={styles.distributionCount}>
                    {d.estimatedCount.toLocaleString()}
                  </span>
                  <span className={styles.distributionNote}>{d.note ?? ''}</span>
                </div>
              );
            })}
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
