import styles from './brand-foundation.module.css';
import { metrics, aspirationalQuote } from './foundation-data';
import QuickReference from './QuickReference';
import FoundationLab from './FoundationLab';

export default function BrandFoundationPage() {
  return (
    <div className={styles.wrapper}>

      {/* ── Section 1: Page Header ── */}
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <span className={styles.breadcrumbText}>
            Knowledge Base › Brand System › Brand Foundation
          </span>
          <span className={styles.version}>v2026 · Locked</span>
        </div>
        <h1 className={styles.title}>Brand Foundation</h1>
        <p className={styles.subtitle}>
          Four locked strategic layers — the beliefs, promise, and persona that define how VinaCapital
          shows up. The Brand overarching version is locked; Creator, Employer Branding, and all
          market-localized versions can be generated in the Foundation Lab below.
        </p>
      </div>

      {/* ── Section 2: Quick Reference (overarching + localized) ── */}
      <QuickReference />

      {/* ── Section 3: Metrics Strip ── */}
      <div className={styles.metrics}>
        {metrics.map((m) => (
          <div key={m.label} className={styles.metric}>
            <p className={styles.metricNumber}>{m.number}</p>
            <p className={styles.metricLabel}>{m.label}</p>
          </div>
        ))}
      </div>

      {/* ── Section 4: Aspirational Banner ── */}
      <div className={styles.banner}>
        <div className={styles.bannerBg} />
        <div className={styles.bannerOverlay} />
        <div className={styles.bannerContent}>
          <p className={styles.bannerEyebrow}>{aspirationalQuote.eyebrow}</p>
          <p className={styles.bannerQuote}>
            {aspirationalQuote.primary.split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </p>
          <p className={styles.bannerSubtitle}>{aspirationalQuote.secondary}</p>
        </div>
      </div>

      {/* ── Section 5: Foundation Lab ── */}
      <FoundationLab />

    </div>
  );
}
