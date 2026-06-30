import Link from 'next/link';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import SourcesTab from '@/components/research/SourcesTab';
import InsightsTab from '@/components/research/InsightsTab';
import ResearchCompanionTrigger from '@/components/research/ResearchCompanionTrigger';
import styles from './research.module.css';

export const dynamic = 'force-dynamic';

export default async function ResearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const params = await searchParams;
  const tab = params.tab === 'insights' ? 'insights' : 'sources';

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <p className={styles.breadcrumb}>
        Knowledge Base ›{' '}
        <Link href="/knowledge-base" style={{ color: 'inherit', textDecoration: 'none' }}>
          Knowledge Base
        </Link>{' '}
        › Research &amp; Insights
      </p>

      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <p className={styles.heroEyebrow}>KNOWLEDGE BASE · RESEARCH</p>
          <h1 className={styles.heroH1}>Research &amp; Insights</h1>
          <p className={styles.heroSubtitle}>
            Source library and structured insights extracted from market research, industry
            reports, and team-collected references.
          </p>
        </div>
        <div className={styles.heroRight}>
          <Link href="/knowledge-base/research/new" className={styles.btnPrimary}>
            <span className={`material-icons-round ${styles.btnPrimaryIcon}`}>add</span>
            Add Source
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <Link
          href="/knowledge-base/research?tab=sources"
          className={`${styles.tab} ${tab === 'sources' ? styles.tabActive : ''}`}
        >
          Sources
        </Link>
        <Link
          href="/knowledge-base/research?tab=insights"
          className={`${styles.tab} ${tab === 'insights' ? styles.tabActive : ''}`}
        >
          Insights
        </Link>
      </div>

      {/* Tab content */}
      {tab === 'sources' ? (
        <Suspense>
          <SourcesTab params={params} />
        </Suspense>
      ) : (
        <Suspense>
          <InsightsTab />
        </Suspense>
      )}

      <ResearchCompanionTrigger />
    </div>
  );
}
