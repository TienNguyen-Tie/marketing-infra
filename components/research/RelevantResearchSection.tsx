import Link from 'next/link';
import InsightListItem from './InsightListItem';
import type { InsightWithSource } from './InsightListItem';
import rStyles from '@/app/knowledge-base/research/research.module.css';
import pStyles from '@/app/knowledge-base/client-insight/portfolio.module.css';

type Props = {
  insights: InsightWithSource[];
  entityType: 'portfolio' | 'brand';
  entitySlug: string;
  entityName: string;
  maxDisplayed?: number;
};

function viewAllHref(entityType: 'portfolio' | 'brand', entitySlug: string): string {
  const param = entityType === 'portfolio' ? 'portfolios' : 'brands';
  return `/knowledge-base/research?tab=insights&${param}=${encodeURIComponent(entitySlug)}`;
}

export default function RelevantResearchSection({
  insights,
  entityType,
  entitySlug,
  entityName,
  maxDisplayed = 10,
}: Props) {
  const href = viewAllHref(entityType, entitySlug);
  const displayed = insights.slice(0, maxDisplayed);
  const hasMore = insights.length > maxDisplayed;

  if (insights.length === 0) {
    return (
      <>
        {/* 3 ghost insight cards */}
        <div className={rStyles.relevantResearchList}>
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className={`${rStyles.insightListCard} ${pStyles.ghostCard}`}
            >
              <div className={rStyles.insightListCardTopRow}>
                <div className={rStyles.insightListPillGroup}>
                  <span className={`${rStyles.insightCatBadge} ${pStyles.ghostPill}`}>
                    CATEGORY
                  </span>
                  <span className={`${rStyles.confidenceBadge} ${pStyles.ghostPill}`}>
                    CONFIDENCE
                  </span>
                </div>
              </div>
              <p className={`${rStyles.insightListHeadline} ${pStyles.ghostText}`}>
                Headline of insight applicable to this {entityType} not yet captured
              </p>
              <p className={`${rStyles.insightListDetail} ${pStyles.ghostText}`}>
                Detail showing the insight&apos;s context and why it matters not yet captured.
              </p>
              <div className={rStyles.insightListSourceRow}>
                <span className={`material-icons-round ${rStyles.insightListSourceIcon}`}>
                  article
                </span>
                <span className={rStyles.insightListSourceLabel}>From:</span>
                <span className={`${rStyles.insightListSourceTitle} ${pStyles.ghostText}`}>
                  source not yet linked
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA card */}
        <div className={rStyles.relevantResearchCta}>
          <p className={rStyles.relevantResearchCtaText}>
            As insights are added to the research library and tagged with the slug{' '}
            <span className={rStyles.relevantResearchCtaSlug}>&lsquo;{entitySlug}&rsquo;</span>
            {' '}in their applicability field, they&apos;ll appear here automatically.
          </p>
          <div className={rStyles.relevantResearchCtaLinks}>
            <Link href="/knowledge-base/research/new" className={rStyles.relevantResearchCtaLink}>
              + Add a research source →
            </Link>
            <Link href="/knowledge-base/research" className={rStyles.relevantResearchCtaLink}>
              Browse the research library →
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Header row */}
      <div className={rStyles.relevantResearchHeader}>
        <span className={rStyles.relevantResearchCount}>
          {insights.length} relevant insight{insights.length !== 1 ? 's' : ''} for {entityName}
        </span>
        <Link href={href} className={rStyles.relevantResearchViewAll}>
          View all in library →
        </Link>
      </div>

      {/* Insight list */}
      <div className={rStyles.relevantResearchList}>
        {displayed.map(insight => (
          <InsightListItem
            key={insight.id}
            insight={insight}
            linkBehavior="source-link"
          />
        ))}
      </div>

      {/* Footer "view all" when truncated */}
      {hasMore && (
        <div className={rStyles.relevantResearchFooter}>
          <Link href={href} className={rStyles.relevantResearchFooterLink}>
            View all {insights.length} relevant insights →
          </Link>
        </div>
      )}
    </>
  );
}
