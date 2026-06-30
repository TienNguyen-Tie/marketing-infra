import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from '../../investor-insight.module.css';
import { BROKERS, getBroker } from '../_data/brokers';

export function generateStaticParams() {
  return BROKERS.map((b) => ({ slug: b.slug }));
}

export default async function BrokerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const b = getBroker(slug);
  if (!b) notFound();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Link href="/knowledge-base/investor-insight/retail-investor" className={styles.backLink}>
          <span className="material-icons-round">arrow_back</span>
          Retail Investor
        </Link>
        <div className={styles.breadcrumb}>
          <span className={styles.breadcrumbText}>Knowledge Base › Investor Insight › Retail › {b.name}</span>
          <span className={styles.tag}>{b.type}</span>
        </div>
        <h1 className={styles.title}>{b.name}</h1>
        <p className={styles.descriptor}>{b.descriptor}</p>
      </div>

      {/* Snapshot */}
      <div className={styles.snapshot}>
        {b.snapshot.map((s) => (
          <div key={s.label} className={styles.snapCell}>
            <p className={styles.snapLabel}>{s.label}</p>
            <p className={styles.snapValue}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* At a glance */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>At a glance</p>
          <h2 className={styles.sectionTitle}>The quick read</h2>
        </div>
        <div className={styles.glanceGrid}>
          {b.atAGlance.map((g, i) => (
            <div key={i} className={styles.glanceCard}>{g}</div>
          ))}
        </div>
      </section>

      {/* Who's on it — the retail investors here */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Who&rsquo;s on it</p>
          <h2 className={styles.sectionTitle}>The investors on this platform</h2>
        </div>
        <p className={styles.angleLead}>{b.investorProfile}</p>
        <p className={styles.watchLabel}>Typical traits</p>
        <div className={styles.cardMetaRow}>
          {b.investorTraits.map((t) => <span key={t} className={styles.cardChip}>{t}</span>)}
        </div>
      </section>

      {/* The shelf — editorial influence */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>The shelf · editorial influence</p>
          <h2 className={styles.sectionTitle}>How a fund gets discovered here</h2>
        </div>
        <p className={styles.pullQuote}>“{b.editorialQuote}”</p>
        <div className={styles.points}>
          {b.editorialPoints.map((p, i) => (
            <p key={i} className={styles.pointItem}>{p}</p>
          ))}
        </div>
      </section>

      {/* The Vietnam-future brand story for this platform's audience */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>The brand angle</p>
          <h2 className={styles.sectionTitle}>The Vietnam-future story for this audience</h2>
          <p className={styles.sectionSub}>VOF invests in Vietnam&rsquo;s future — the only listed access to its listed and private champions. Here&rsquo;s how that story should sound on this platform.</p>
        </div>
        <div className={styles.brandBox}>
          <div className={styles.brandTop}>
            <span className={styles.brandPill}>Promoting Vietnam&rsquo;s future</span>
            <span className={styles.brandEyebrow}>On {b.name}</span>
          </div>
          <p className={styles.brandQuote}>“{b.brandHook}”</p>
        </div>
      </section>

      {/* How to win here — brand-led */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>For your marketing</p>
          <h2 className={styles.sectionTitle}>How to win visibility here</h2>
          <p className={styles.sectionSub}>Brand-led moves to get VOF — and the Vietnam-future story — in front of this platform&rsquo;s investors.</p>
        </div>
        <div className={styles.marketingList}>
          {b.howToWin.map((m, i) => (
            <div key={i} className={styles.marketingItem}>
              <span className={styles.marketingNum}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.marketingText}>{m}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Access & watch-outs */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Access &amp; watch-outs</p>
          <h2 className={styles.sectionTitle}>Before you spend</h2>
        </div>
        <div className={styles.cardMetaRow}>
          {b.watchOuts.map((w) => <span key={w} className={styles.cardChip}>{w}</span>)}
        </div>
      </section>

      <p className={styles.sources}>
        Sources:{' '}
        {b.sources.map((s, i) => (
          <span key={s.url}>
            {i > 0 && ' · '}
            <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
          </span>
        ))}
        {' · '}Public information; client and AUA figures are approximate and change over time.
      </p>
    </div>
  );
}
