import Link from 'next/link';
import styles from './investor-insight.module.css';

export default function InvestorInsightPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <span className={styles.breadcrumbText}>Knowledge Base › Investor Insight</span>
          <span className={styles.tag}>Audience Library</span>
        </div>
        <h1 className={styles.title}>Investor Insight</h1>
        <p className={styles.subtitle}>
          Who provides VinaCapital&rsquo;s capital — and what moves them. A working library of the two
          audiences behind the funds, grounded in the real shareholder register of the
          London-listed VinaCapital Vietnam Opportunity Fund (VOF) and its closed-end-fund peers.
        </p>
      </div>

      <div className={styles.navGrid}>
        <Link href="/knowledge-base/investor-insight/institutional-investor" className={styles.navCard}>
          <span className={styles.navCardLabel}>01 · The institutional base</span>
          <span className={styles.navCardTitle}>Institutional Investor</span>
          <span className={styles.navCardBody}>
            The asset managers, closed-end-fund activists, pension funds and platforms that hold VOF —
            Lazard, City of London Investment Management, Allspring, Skagen and others — plus the
            look-alike institutions that share their mandate.
          </span>
          <span className={styles.navCardArrow}>View institutional investors →</span>
        </Link>

        <Link href="/knowledge-base/investor-insight/retail-investor" className={styles.navCard}>
          <span className={styles.navCardLabel}>02 · The retail base</span>
          <span className={styles.navCardTitle}>Retail Investor</span>
          <span className={styles.navCardBody}>
            The self-directed retail investors who own VOF — reached <em>through brokers</em> such as
            Hargreaves Lansdown, interactive investor and AJ Bell. Understand each platform and the
            investors on it, then what marketing owes them.
          </span>
          <span className={styles.navCardArrow}>View retail investors →</span>
        </Link>
      </div>
    </div>
  );
}
