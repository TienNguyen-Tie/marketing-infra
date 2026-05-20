import type { TapNetworkOverview } from '@/data/creators/types';
import styles from '../page.module.css';

export default function NotableCreators({ overview }: { overview: TapNetworkOverview }) {
  const creators = overview.notableCreators ?? [];

  return (
    <div className={styles.notableSection}>
      <div className={styles.distributionHeader}>
        <p className={styles.distributionEyebrow}>Notable Creators</p>
        <h2 className={styles.distributionH2}>Highlighted Network Members</h2>
      </div>

      {creators.length === 0 ? (
        <div className={styles.ghostCard}>
          Notable creators to highlight will be added as the team identifies them. This surface is
          curated — 5-15 names maximum, presentational only.
        </div>
      ) : (
        <div className={styles.notableGrid}>
          {creators.map((c, i) => (
            <div key={i} className={styles.notableCard}>
              <p className={styles.notableHandle}>@{c.handle}</p>
              {(c.archetypeSlug || c.marketSlug) && (
                <div className={styles.notableMeta}>
                  {c.archetypeSlug && (
                    <a
                      href={`/knowledge-base/creators/archetypes/${c.archetypeSlug}`}
                      className={styles.notablePill}
                    >
                      {c.archetypeSlug}
                    </a>
                  )}
                  {c.marketSlug && (
                    <a
                      href={`/knowledge-base/creators/markets/${c.marketSlug}`}
                      className={styles.notablePill}
                    >
                      {c.marketSlug.toUpperCase()}
                    </a>
                  )}
                </div>
              )}
              {c.note && <p className={styles.notableNote}>{c.note}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
