import type { CreatorMarket } from '@/data/creators/types';
import styles from '../page.module.css';

function truncate(text: string, max: number): string {
  return text.length > max ? text.slice(0, max).trimEnd() + '…' : text;
}

export default function MarketGrid({ markets }: { markets: CreatorMarket[] }) {
  return (
    <div className={styles.marketGrid}>
      {markets.map(m => {
        const presenceText = m.operationalNotes?.tapPresenceLevel;
        return (
          <a
            key={m.slug}
            href={`/knowledge-base/creators/markets/${m.slug}`}
            className={styles.marketCard}
          >
            <div className={styles.marketHeader}>
              <span className={styles.countryCode}>{m.countryCode}</span>
              {m.status !== 'active' && (
                <span
                  className={`${styles.statusPill} ${
                    m.status === 'proposed' ? styles.statusProposed : styles.statusSunset
                  }`}
                >
                  {m.status === 'proposed' ? 'Proposed' : 'Sunset'}
                </span>
              )}
            </div>

            <p className={styles.marketTitle}>{m.name}</p>
            <p className={styles.marketOneLiner}>{m.oneLiner}</p>

            <div className={styles.marketFooter}>
              <div className={styles.marketFooterRow}>
                <span className={styles.marketFooterEyebrow}>TAP Presence</span>
                {presenceText ? (
                  <span className={styles.marketFooterText}>
                    {truncate(presenceText, 120)}
                  </span>
                ) : (
                  <span className={styles.marketFooterMissing}>Not yet captured</span>
                )}
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}
