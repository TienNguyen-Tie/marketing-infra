import Link from 'next/link';
import { Suspense } from 'react';
import { db } from '@/lib/db';
import { SOURCE_CATEGORY_LABELS } from '@/lib/research/constants';
import ResearchFilters from '@/app/knowledge-base/research/ResearchFilters';
import styles from '@/app/knowledge-base/research/research.module.css';

function formatDate(d: Date | null | undefined): string {
  if (!d) return 'Date not captured';
  return new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(d);
}

export default async function SourcesTab({
  params,
}: {
  params: Record<string, string>;
}) {
  const typeFilter = params.type ?? '';
  const categoryFilter = params.category ?? '';
  const tagsFilter = params.tags ?? '';
  const sort = params.sort ?? 'newest';

  const where: Record<string, unknown> = {};
  if (typeFilter && typeFilter !== 'all') where.type = typeFilter;
  if (categoryFilter && categoryFilter !== 'all') where.category = categoryFilter;
  if (tagsFilter) {
    const tagArr = tagsFilter.split(',').map(t => t.trim()).filter(Boolean);
    if (tagArr.length) where.tags = { hasSome: tagArr };
  }

  const orderBy: Record<string, string> =
    sort === 'oldest' ? { collectedDate: 'asc' }
    : sort === 'title' ? { title: 'asc' }
    : { collectedDate: 'desc' };

  const sources = await db.researchSource.findMany({
    where,
    orderBy,
    include: { _count: { select: { insights: true } } },
  });

  return (
    <>
      <Suspense>
        <ResearchFilters />
      </Suspense>

      {sources.length === 0 ? (
        <div className={styles.emptyState}>
          <span className={`material-icons-round ${styles.emptyIllustration}`}>
            auto_stories
          </span>
          <p className={styles.emptyTitle}>No sources yet</p>
          <p className={styles.emptyBody}>
            Add your first research source to start building the insights library. Upload a PDF
            report or collect URLs from your research.
          </p>
          <Link href="/knowledge-base/research/new" className={styles.btnPrimary}>
            <span className={`material-icons-round ${styles.btnPrimaryIcon}`}>add</span>
            Add your first source
          </Link>
        </div>
      ) : (
        <div className={styles.sourceGrid}>
          {sources.map(source => {
            const insightN = source._count.insights;
            const visibleTags = source.tags.slice(0, 3);
            const extraTags = source.tags.length - 3;
            return (
              <Link
                key={source.id}
                href={`/knowledge-base/research/sources/${source.id}`}
                className={styles.sourceCard}
              >
                <div className={styles.cardTopRow}>
                  <div className={styles.typeIconBox}>
                    <span
                      className={`material-icons-round ${source.type === 'pdf' ? styles.typeIconPdf : styles.typeIconUrl}`}
                    >
                      {source.type === 'pdf' ? 'picture_as_pdf' : 'link'}
                    </span>
                  </div>
                  <span
                    className={`${styles.typePill} ${source.type === 'pdf' ? styles.typePillPdf : styles.typePillUrl}`}
                  >
                    {source.type === 'pdf' ? 'PDF' : 'URL Collection'}
                  </span>
                  {source.category && (
                    <span className={styles.categoryPill}>
                      {SOURCE_CATEGORY_LABELS[source.category as keyof typeof SOURCE_CATEGORY_LABELS] ?? source.category}
                    </span>
                  )}
                </div>

                <p className={styles.cardTitle}>{source.title}</p>
                <p className={styles.cardMeta}>
                  {source.publisher ?? 'Publisher not captured'} · {formatDate(source.publicationDate)}
                </p>
                {source.summary ? (
                  <p className={styles.cardSummary}>{source.summary}</p>
                ) : (
                  <p className={styles.cardSummaryMuted}>No summary yet</p>
                )}

                <div className={styles.cardFooter}>
                  <span className={styles.insightCount}>
                    {insightN} insight{insightN !== 1 ? 's' : ''}
                  </span>
                  {visibleTags.length > 0 && (
                    <div className={styles.tagPillRow}>
                      {visibleTags.map(tag => (
                        <span key={tag} className={styles.tagPill}>{tag}</span>
                      ))}
                      {extraTags > 0 && (
                        <span className={styles.tagOverflow}>+{extraTags}</span>
                      )}
                    </div>
                  )}
                  <span className={styles.viewLink}>View →</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
