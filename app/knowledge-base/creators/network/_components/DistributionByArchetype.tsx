import type { TapNetworkOverview } from '@/data/creators/types';
import { getArchetypeBySlug, POPULATION_TIER_LABELS } from '@/data/creators/helpers';
import styles from '../page.module.css';

const TIER_PILL_CLASS: Record<string, string> = {
  core: styles.tierPillCore,
  emerging: styles.tierPillEmerging,
  niche: styles.tierPillNiche,
};

export default function DistributionByArchetype({
  overview,
}: {
  overview: TapNetworkOverview;
}) {
  const { distributionByArchetype } = overview;
  const total = distributionByArchetype.reduce((sum, d) => sum + d.estimatedCount, 0);

  return (
    <div className={styles.distributionSection}>
      <div className={styles.distributionHeader}>
        <p className={styles.distributionEyebrow}>Distribution</p>
        <h2 className={styles.distributionH2}>By Archetype</h2>
        <p className={styles.distributionSubtitle}>
          Estimated population per archetype. Numbers are curated — refresh monthly from Passio.
        </p>
      </div>

      <div className={styles.distributionTable}>
        {distributionByArchetype.length === 0 ? (
          <p className={styles.distributionEmpty}>No archetype distribution data captured yet.</p>
        ) : (
          <>
            {distributionByArchetype.map(d => {
              const archetype = getArchetypeBySlug(d.archetypeSlug);
              const name = archetype?.name ?? d.archetypeSlug;
              const tier = archetype?.populationTier;

              return (
                <div key={d.archetypeSlug} className={styles.distributionRow}>
                  <div className={styles.distributionName}>
                    <a
                      href={`/knowledge-base/creators/archetypes/${d.archetypeSlug}`}
                      className={styles.distributionNameLink}
                    >
                      {name}
                    </a>
                    {tier && (
                      <span className={TIER_PILL_CLASS[tier] ?? ''}>
                        {POPULATION_TIER_LABELS[tier]}
                      </span>
                    )}
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
