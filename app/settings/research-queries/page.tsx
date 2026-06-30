import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import styles from './research-queries.module.css';

function fmtDate(d: Date): string {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

export const dynamic = 'force-dynamic';

export default async function ResearchQueriesPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  if (session.user.role !== 'ADMIN') {
    return (
      <div className={styles.page}>
        <div className={styles.forbidden}>
          <span className="material-icons-round" style={{ fontSize: 40, color: '#D3D3D3' }}>lock</span>
          <p className={styles.forbiddenTitle}>Access Denied</p>
          <p className={styles.forbiddenSub}>This page is for admins only.</p>
        </div>
      </div>
    );
  }

  const queries = await db.researchQuery.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  return (
    <div className={styles.page}>
      <p className={styles.breadcrumb}>Settings › Research Queries</p>
      <h1 className={styles.h1}>Research Queries</h1>
      <p className={styles.subtitle}>
        Last 50 questions asked via the Research Companion.
      </p>

      {queries.length === 0 ? (
        <div className={styles.emptyState}>
          <span className="material-icons-round" style={{ fontSize: 40, color: '#D3D3D3' }}>query_stats</span>
          <p className={styles.emptyTitle}>No queries yet</p>
          <p className={styles.emptySub}>
            They&apos;ll appear here when users ask questions in the Research Companion.
          </p>
        </div>
      ) : (
        <div className={styles.list}>
          {queries.map(q => (
            <QueryCard key={q.id} query={q} />
          ))}
        </div>
      )}
    </div>
  );
}

function QueryCard({
  query,
}: {
  query: {
    id: string;
    question: string;
    answer: string;
    insightIdsReferenced: string[];
    insightsCount: number;
    sourcesCount: number;
    tokenUsageInput: number | null;
    tokenUsageOutput: number | null;
    userId: string | null;
    createdAt: Date;
  };
}) {
  const totalTokens =
    (query.tokenUsageInput ?? 0) + (query.tokenUsageOutput ?? 0);

  return (
    <div className={styles.card}>
      {/* Top row: time + stats */}
      <div className={styles.cardTop}>
        <div className={styles.cardMeta}>
          <span className={styles.cardTime}>{fmtDate(query.createdAt)}</span>
          <div className={styles.cardStats}>
            <span className={styles.statPill}>
              <span className="material-icons-round" style={{ fontSize: 11 }}>lightbulb</span>
              {query.insightIdsReferenced.length} cited
            </span>
            <span className={styles.statPill}>
              <span className="material-icons-round" style={{ fontSize: 11 }}>article</span>
              {query.sourcesCount} sources
            </span>
            <span className={styles.statPill}>
              <span className="material-icons-round" style={{ fontSize: 11 }}>library_books</span>
              {query.insightsCount} in library
            </span>
            {totalTokens > 0 && (
              <span className={styles.tokenPill}>
                {totalTokens.toLocaleString()} tokens
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Question */}
      <div className={styles.section}>
        <p className={styles.sectionLabel}>Question</p>
        <p className={styles.sectionBody}>{query.question}</p>
      </div>

      {/* Answer */}
      <div className={styles.section} style={{ marginTop: 12 }}>
        <p className={styles.sectionLabel}>Answer</p>
        <p className={`${styles.sectionBody} ${styles.answerBody}`}>
          {query.answer}
        </p>
      </div>

      {/* Cited insight IDs */}
      {query.insightIdsReferenced.length > 0 && (
        <div className={styles.citedIds}>
          <span className={styles.citedLabel}>Cited:</span>
          {query.insightIdsReferenced.map(id => (
            <span key={id} className={styles.citedPill}>
              #{id.slice(0, 8)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
