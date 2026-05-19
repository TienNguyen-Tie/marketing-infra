import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { SOURCE_CATEGORY_LABELS } from '@/lib/research/constants';
import type { UrlRef } from '@/lib/research/types';
import InsightsSectionClient from './InsightsSectionClient';
import type { SerializedInsight } from './InsightsSectionClient';
import ResearchCompanionTrigger from '@/components/research/ResearchCompanionTrigger';
import styles from '../../research.module.css';

function fmtDate(d: Date | null | undefined, fallback = 'Not captured'): string {
  if (!d) return fallback;
  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric' }).format(d);
}

function fmtBytes(n: number | null | undefined): string {
  if (!n) return '—';
  if (n < 1024) return n + ' B';
  if (n < 1024 * 1024) return (n / 1024).toFixed(1) + ' KB';
  return (n / (1024 * 1024)).toFixed(1) + ' MB';
}

export default async function SourceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const { id } = await params;

  const source = await db.researchSource.findUnique({
    where: { id },
    include: { insights: { orderBy: { createdAt: 'asc' } } },
  });

  if (!source) notFound();

  const categoryLabel =
    source.category
      ? (SOURCE_CATEGORY_LABELS[source.category as keyof typeof SOURCE_CATEGORY_LABELS] ?? source.category)
      : 'Uncategorized';

  const urlRefs: UrlRef[] = source.urls
    ? (source.urls as unknown as UrlRef[])
    : [];

  const savedPct =
    source.pdfOriginalSize && source.pdfCompressedSize && source.pdfOriginalSize > 0
      ? Math.round((1 - source.pdfCompressedSize / source.pdfOriginalSize) * 100)
      : 0;

  const serializedInsights: SerializedInsight[] = source.insights.map(ins => ({
    id: ins.id,
    headline: ins.headline,
    detail: ins.detail,
    evidence: ins.evidence,
    reference: ins.reference,
    category: ins.category,
    confidence: ins.confidence,
    applicabilityPortfolios: ins.applicabilityPortfolios,
    applicabilityBrands: ins.applicabilityBrands,
    applicabilityIcps: ins.applicabilityIcps,
    tags: ins.tags,
  }));

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <p className={styles.breadcrumb}>
        Knowledge Base ›{' '}
        <Link href="/knowledge-base/research" style={{ color: 'inherit', textDecoration: 'none' }}>
          Research &amp; Insights
        </Link>{' '}
        › {source.title}
      </p>

      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <p className={styles.heroEyebrow}>
            RESEARCH SOURCE · {categoryLabel.toUpperCase()}
          </p>
          <h1 className={styles.heroH1}>{source.title}</h1>
          <p className={styles.heroSubtitle} style={{ fontSize: 13, maxWidth: 'none' }}>
            {source.publisher ?? 'Publisher not captured'} ·{' '}
            {fmtDate(source.publicationDate, 'Date not captured')} ·{' '}
            Added {fmtDate(source.collectedDate)}
          </p>
        </div>
        <div className={styles.heroRight}>
          <span
            className={`${styles.typePill} ${source.type === 'pdf' ? styles.typePillPdf : styles.typePillUrl}`}
            style={{ fontSize: 11, padding: '4px 12px' }}
          >
            {source.type === 'pdf' ? 'PDF' : 'URL Collection'}
          </span>
          <Link
            href={`/knowledge-base/research/sources/${source.id}/edit`}
            className={styles.btnSecondary}
            style={{ fontSize: 12, padding: '6px 12px' }}
          >
            <span className="material-icons-round" style={{ fontSize: 14 }}>edit</span>
            Edit
          </Link>
        </div>
      </div>

      {/* Stats strip */}
      <div className={styles.statsStrip}>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{source.insights.length}</span>
          <span className={styles.statLabel}>Insights</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{source.type === 'pdf' ? 'PDF' : 'URL Collection'}</span>
          <span className={styles.statLabel}>Type</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{categoryLabel}</span>
          <span className={styles.statLabel}>Category</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum}>
            {source.type === 'pdf'
              ? fmtBytes(source.pdfCompressedSize)
              : `${urlRefs.length} URL${urlRefs.length !== 1 ? 's' : ''}`}
          </span>
          <span className={styles.statLabel}>{source.type === 'pdf' ? 'File size' : 'References'}</span>
        </div>
      </div>

      {/* §01 · Source Metadata */}
      <div className={styles.sectionBlock}>
        <div className={styles.sectionHeaderRow}>
          <span className={styles.sectionNum}>01</span>
          <span className={styles.sectionTitle}>SOURCE METADATA</span>
        </div>
        <div className={styles.fieldCard}>
          {[
            ['TITLE', source.title],
            ['PUBLISHER', source.publisher],
            ['PUBLICATION DATE', fmtDate(source.publicationDate, '')],
            ['CATEGORY', source.category ? categoryLabel : ''],
            ['COLLECTED DATE', fmtDate(source.collectedDate)],
          ].map(([label, val]) => (
            <div key={label} className={styles.fieldRow}>
              <span className={styles.fieldLabel}>{label}</span>
              <span className={styles.fieldValue}>
                {val || <span className={styles.fieldMuted}>Not yet captured</span>}
              </span>
            </div>
          ))}
          <div className={styles.fieldRow}>
            <span className={styles.fieldLabel}>TAGS</span>
            <span className={styles.fieldValue}>
              {source.tags.length > 0 ? (
                <span style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {source.tags.map(tag => (
                    <span key={tag} className={styles.tagPill}>{tag}</span>
                  ))}
                </span>
              ) : (
                <span className={styles.fieldMuted}>No tags yet</span>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* §02 · Source Content */}
      <div className={styles.sectionBlock}>
        <div className={styles.sectionHeaderRow}>
          <span className={styles.sectionNum}>02</span>
          <span className={styles.sectionTitle}>SOURCE CONTENT</span>
        </div>

        {source.type === 'pdf' && (
          <div className={styles.pdfCard}>
            <span className={`material-icons-round ${styles.pdfCardIcon}`}>picture_as_pdf</span>
            <div className={styles.pdfCardBody}>
              <p className={styles.pdfCardFilename}>{source.pdfFilename ?? 'Unknown file'}</p>
              {source.pdfCompressedSize && (
                <p className={styles.pdfCardMeta}>
                  Compressed: {fmtBytes(source.pdfCompressedSize)}
                  {source.pdfOriginalSize && source.pdfOriginalSize !== source.pdfCompressedSize && (
                    <> (was {fmtBytes(source.pdfOriginalSize)}, saved {savedPct}%)</>
                  )}
                </p>
              )}
              {source.pdfUrl ? (
                <a
                  href={source.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.pdfOpenLink}
                >
                  Open PDF in new tab
                  <span className="material-icons-round" style={{ fontSize: 13 }}>open_in_new</span>
                </a>
              ) : (
                <span className={styles.fieldMuted}>PDF URL not available</span>
              )}
            </div>
          </div>
        )}

        {source.type === 'url-collection' && (
          <>
            <p style={{ fontSize: 12, color: '#727272', marginBottom: 10 }}>
              {urlRefs.length} URL{urlRefs.length !== 1 ? 's' : ''} collected
            </p>
            {urlRefs.length === 0 ? (
              <span className={styles.fieldMuted}>No URLs captured yet</span>
            ) : (
              <div className={styles.urlItemList}>
                {urlRefs.map((ref, i) => (
                  <div key={i} className={styles.urlItem}>
                    {ref.title && <p className={styles.urlItemTitle}>{ref.title}</p>}
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.urlItemLink}
                    >
                      {ref.url}
                      <span className="material-icons-round" style={{ fontSize: 12 }}>open_in_new</span>
                    </a>
                    {ref.quote && <p className={styles.urlItemQuote}>{ref.quote}</p>}
                    {ref.notes && <p className={styles.urlItemNotes}>{ref.notes}</p>}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* §03 · Summary & Notes */}
      <div className={styles.sectionBlock}>
        <div className={styles.sectionHeaderRow}>
          <span className={styles.sectionNum}>03</span>
          <span className={styles.sectionTitle}>SUMMARY &amp; NOTES</span>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryBlock}>
            <p className={styles.summaryBlockLabel}>OVERVIEW SUMMARY</p>
            {source.summary ? (
              <p className={styles.summaryBlockBody}>{source.summary}</p>
            ) : (
              <span className={styles.fieldMuted}>Not yet captured</span>
            )}
          </div>
          <div className={styles.summaryBlock}>
            <p className={styles.summaryBlockLabel}>MANUAL NOTES</p>
            {source.manualNotes ? (
              <p className={styles.summaryBlockBody}>{source.manualNotes}</p>
            ) : (
              <span className={styles.fieldMuted}>Not yet captured</span>
            )}
          </div>
        </div>
      </div>

      {/* §04 · Insights */}
      <div className={styles.sectionBlock}>
        <div className={styles.sectionHeaderRow}>
          <span className={styles.sectionNum}>04</span>
          <span className={styles.sectionTitle}>INSIGHTS</span>
        </div>
        <InsightsSectionClient
          sourceId={source.id}
          sourceType={source.type}
          initialInsights={serializedInsights}
        />
      </div>

      <ResearchCompanionTrigger />
    </div>
  );
}
