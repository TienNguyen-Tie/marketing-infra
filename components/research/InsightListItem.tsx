'use client';

import Link from 'next/link';
import { INSIGHT_CATEGORY_LABELS, CONFIDENCE_LABELS } from '@/lib/research/constants';
import type { InsightWithSource } from '@/lib/research/types';
import styles from '@/app/knowledge-base/research/research.module.css';

const CAT_CLASS: Record<string, string> = {
  audience: styles['insightCat--audience'],
  market: styles['insightCat--market'],
  competitive: styles['insightCat--competitive'],
  creator: styles['insightCat--creator'],
  content: styles['insightCat--content'],
  platform: styles['insightCat--platform'],
  other: styles['insightCat--other'],
};

const CONF_CLASS: Record<string, string> = {
  high: styles['conf--high'],
  medium: styles['conf--medium'],
  low: styles['conf--low'],
  speculative: styles['conf--speculative'],
};

export default function InsightListItem({
  insight,
  linkBehavior = 'modal',
  onClick,
}: {
  insight: InsightWithSource;
  linkBehavior?: 'modal' | 'source-link';
  onClick?: () => void;
}) {
  const catLabel =
    INSIGHT_CATEGORY_LABELS[insight.category as keyof typeof INSIGHT_CATEGORY_LABELS] ??
    insight.category;
  const confLabel =
    CONFIDENCE_LABELS[insight.confidence as keyof typeof CONFIDENCE_LABELS] ??
    insight.confidence;

  const visibleTags = insight.tags.slice(0, 4);
  const extraTags = insight.tags.length - 4;
  const applicabilityParts = [
    ...insight.applicabilityPortfolios,
    ...insight.applicabilityBrands,
    ...insight.applicabilityIcps,
  ];

  const inner = (
    <>
      <div className={styles.insightListCardTopRow}>
        <div className={styles.insightListPillGroup}>
          <span className={`${styles.insightCatBadge} ${CAT_CLASS[insight.category] ?? ''}`}>
            {catLabel}
          </span>
          <span className={`${styles.confidenceBadge} ${CONF_CLASS[insight.confidence] ?? ''}`}>
            {confLabel}
          </span>
        </div>
        {insight.reference && (
          <span className={styles.insightListRef}>{insight.reference}</span>
        )}
      </div>

      <p className={styles.insightListHeadline}>{insight.headline}</p>
      <p className={styles.insightListDetail}>{insight.detail}</p>

      <div className={styles.insightListSourceRow}>
        <span className={`material-icons-round ${styles.insightListSourceIcon}`}>
          {insight.source.type === 'pdf' ? 'picture_as_pdf' : 'link'}
        </span>
        <span className={styles.insightListSourceLabel}>From:</span>
        {linkBehavior === 'modal' ? (
          <Link
            href={`/knowledge-base/research/sources/${insight.source.id}`}
            className={styles.insightListSourceTitle}
            onClick={e => e.stopPropagation()}
          >
            {insight.source.title}
          </Link>
        ) : (
          <span className={styles.insightListSourceTitle}>{insight.source.title}</span>
        )}
      </div>

      {(visibleTags.length > 0 || applicabilityParts.length > 0) && (
        <div className={styles.insightListCardFooter}>
          <div className={styles.insightTagRow}>
            {visibleTags.map(tag => (
              <span key={tag} className={styles.tagPill}>{tag}</span>
            ))}
            {extraTags > 0 && (
              <span className={styles.tagOverflow}>+{extraTags}</span>
            )}
          </div>
          {applicabilityParts.length > 0 && (
            <span className={styles.insightListApplicability}>
              Relevant to: {applicabilityParts.slice(0, 3).join(' · ')}
              {applicabilityParts.length > 3 ? ` +${applicabilityParts.length - 3}` : ''}
            </span>
          )}
        </div>
      )}
    </>
  );

  if (linkBehavior === 'source-link') {
    return (
      <a
        href={`/knowledge-base/research/sources/${insight.source.id}`}
        target="_blank"
        rel="noreferrer"
        className={`${styles.insightListCard} ${styles.sourceLink}`}
      >
        {inner}
      </a>
    );
  }

  return (
    <div className={styles.insightListCard} onClick={onClick}>
      {inner}
    </div>
  );
}
