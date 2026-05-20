import type { CreatorArchetype } from '@/data/creators/types';
import { CONTENT_FORMAT_LABELS, POPULATION_TIER_LABELS } from '@/data/creators/helpers';
import styles from '../page.module.css';

const TIER_CLASS: Record<string, string> = {
  core: styles.populationTierCore,
  emerging: styles.populationTierEmerging,
  niche: styles.populationTierNiche,
};

const ACQUISITION_CLASS: Record<string, string> = {
  established: styles.acquisitionEstablished,
  accessible: styles.acquisitionAccessible,
  effortful: styles.acquisitionEffortful,
  hard: styles.acquisitionHard,
};

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function ArchetypeGrid({
  archetypes,
  activeTier,
}: {
  archetypes: CreatorArchetype[];
  activeTier: string;
}) {
  const filtered =
    activeTier === 'all'
      ? archetypes
      : archetypes.filter(a => a.populationTier === activeTier);

  if (filtered.length === 0) {
    return <p className={styles.emptyState}>No archetypes match this filter.</p>;
  }

  return (
    <div className={styles.cardGrid}>
      {filtered.map(a => {
        const difficulty = a.acquisitionPatterns?.acquisitionDifficulty;
        const diffNote = a.acquisitionPatterns?.acquisitionDifficultyNote;

        return (
          <a
            key={a.slug}
            href={`/knowledge-base/creators/archetypes/${a.slug}`}
            className={styles.archetypeCard}
          >
            {/* Top row: tier pill + status pill */}
            <div className={styles.cardTopRow}>
              <span
                className={`${styles.populationTierPill} ${TIER_CLASS[a.populationTier] ?? ''}`}
              >
                {POPULATION_TIER_LABELS[a.populationTier]}
              </span>
              {a.status !== 'active' && (
                <span
                  className={`${styles.statusPill} ${
                    a.status === 'proposed' ? styles.statusProposed : styles.statusSunset
                  }`}
                >
                  {a.status === 'proposed' ? 'Proposed · Pending Verification' : 'Sunset'}
                </span>
              )}
            </div>

            {/* Title */}
            <p className={styles.cardTitle}>{a.name}</p>

            {/* One-liner */}
            <p className={styles.cardOneLiner}>{a.oneSentenceDefinition}</p>

            {/* Meta block */}
            <div className={styles.metaBlock}>
              {/* Content formats */}
              <div className={styles.metaRow}>
                <span className={styles.metaEyebrow}>Content Formats</span>
                {a.typicalContentFormats.map(f => (
                  <span key={f} className={styles.smallPill}>
                    {CONTENT_FORMAT_LABELS[f]}
                  </span>
                ))}
              </div>
              {/* Markets active */}
              <div className={styles.metaRow}>
                <span className={styles.metaEyebrow}>Markets Active</span>
                {a.marketsActive.map(m => (
                  <span key={m} className={styles.smallPill}>
                    {m.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* Acquisition footer */}
            <div className={styles.acquisitionFooter}>
              <div className={styles.acquisitionLine}>
                <span className={styles.metaEyebrow}>Acquisition</span>
                {difficulty ? (
                  <span
                    className={`${styles.acquisitionPill} ${ACQUISITION_CLASS[difficulty] ?? ''}`}
                  >
                    {capitalize(difficulty)}
                  </span>
                ) : (
                  <span className={styles.acquisitionMissing}>Not yet captured</span>
                )}
              </div>
              {difficulty && diffNote && (
                <p className={styles.acquisitionNote}>{diffNote}</p>
              )}
            </div>
          </a>
        );
      })}
    </div>
  );
}
