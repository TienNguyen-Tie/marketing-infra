import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from '../../investor-insight.module.css';
import { INVESTORS, getInvestor } from '../_data/investors';

export function generateStaticParams() {
  return INVESTORS.map((i) => ({ slug: i.slug }));
}

export default async function InvestorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const inv = getInvestor(slug);
  if (!inv) notFound();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Link href="/knowledge-base/investor-insight/institutional-investor" className={styles.backLink}>
          <span className="material-icons-round">arrow_back</span>
          Institutional Investor
        </Link>
        <div className={styles.breadcrumb}>
          <span className={styles.breadcrumbText}>Knowledge Base › Investor Insight › Institutional › {inv.name}</span>
          <span className={styles.tag}>{inv.type}</span>
        </div>
        <h1 className={styles.title}>{inv.name}</h1>
        <p className={styles.descriptor}>{inv.descriptor}</p>
      </div>

      {/* Snapshot */}
      <div className={styles.snapshot}>
        {inv.snapshot.map((s) => (
          <div key={s.label} className={styles.snapCell}>
            <p className={styles.snapLabel}>{s.label}</p>
            <p className={styles.snapValue}>{s.value}</p>
          </div>
        ))}
        <div className={styles.snapCell}>
          <p className={styles.snapLabel}>VOF stake</p>
          <p className={styles.snapValue}>{inv.stake}</p>
        </div>
      </div>

      {/* At a glance — the quick read */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>At a glance</p>
          <h2 className={styles.sectionTitle}>The quick read</h2>
        </div>
        <div className={styles.glanceGrid}>
          {inv.atAGlance.map((g, i) => (
            <div key={i} className={styles.glanceCard}>{g}</div>
          ))}
        </div>
      </section>

      {/* Philosophy — pull-quote + points */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Investment philosophy</p>
          <h2 className={styles.sectionTitle}>How they invest</h2>
        </div>
        <p className={styles.pullQuote}>“{inv.philosophyQuote}”</p>
        <div className={styles.points}>
          {inv.philosophyPoints.map((p, i) => (
            <p key={i} className={styles.pointItem}>{p}</p>
          ))}
        </div>
      </section>

      {/* Focus & direction — chips + Vietnam-fit callout */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Focus &amp; direction</p>
          <h2 className={styles.sectionTitle}>What they buy — and where Vietnam fits</h2>
        </div>
        <div className={styles.cardMetaRow}>
          {inv.focusTags.map((t) => <span key={t} className={styles.cardChip}>{t}</span>)}
        </div>
        <p className={styles.fitCallout}><strong>Where Vietnam fits:</strong> {inv.vietnamFit}</p>
      </section>

      {/* Vision — quote box */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Vision</p>
          <h2 className={styles.sectionTitle}>What they’re ultimately trying to do</h2>
        </div>
        <div className={styles.callout}>
          <p className={styles.calloutEyebrow}>{inv.name} · mandate</p>
          <p className={styles.calloutText}>“{inv.vision}”</p>
        </div>
      </section>

      {/* VOF angle — summary + watch chips */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Their VOF angle</p>
          <h2 className={styles.sectionTitle}>Why they hold VOF — and what they watch</h2>
        </div>
        <p className={styles.angleLead}>{inv.vofSummary}</p>
        <p className={styles.watchLabel}>What they watch</p>
        <div className={styles.cardMetaRow}>
          {inv.vofWatches.map((w) => <span key={w} className={styles.cardChip}>{w}</span>)}
        </div>
      </section>

      {/* The Vietnam-future brand story for this audience */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>The brand angle</p>
          <h2 className={styles.sectionTitle}>The Vietnam-future story to tell them</h2>
          <p className={styles.sectionSub}>VOF invests in Vietnam’s future — the only listed access to its listed and private champions, with 20+ years of helping them grow. Here’s how to angle that story to this holder.</p>
        </div>
        <div className={styles.brandBox}>
          <div className={styles.brandTop}>
            <span className={styles.brandPill}>Promoting Vietnam’s future</span>
            <span className={styles.brandEyebrow}>For {inv.name}</span>
          </div>
          <p className={styles.brandQuote}>“{inv.brandHook}”</p>
        </div>
      </section>

      {/* How to land the brand story */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>For your marketing</p>
          <h2 className={styles.sectionTitle}>How to land it</h2>
          <p className={styles.sectionSub}>Brand-led moves for content, social and IR — all in service of promoting Vietnam’s future to this holder.</p>
        </div>
        <div className={styles.marketingList}>
          {inv.marketing.map((m, i) => (
            <div key={i} className={styles.marketingItem}>
              <span className={styles.marketingNum}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.marketingText}>{m}</span>
            </div>
          ))}
        </div>
      </section>

      <p className={styles.sources}>
        Sources:{' '}
        {inv.sources.map((s, i) => (
          <span key={s.url}>
            {i > 0 && ' · '}
            <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
          </span>
        ))}
        {' · '}VOF / LSE RNS holdings disclosures. Public information; VOF stake is indicative and changes over time.
      </p>
    </div>
  );
}
