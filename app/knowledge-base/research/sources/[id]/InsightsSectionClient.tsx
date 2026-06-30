'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  INSIGHT_CATEGORY_LABELS,
  CONFIDENCE_LABELS,
} from '@/lib/research/constants';
import { saveDrafts, loadDrafts, clearDrafts } from '@/lib/research/draft-storage';
import type { DraftInsight } from '@/lib/research/extraction-prompt';
import AddInsightModal from './AddInsightModal';
import styles from '../../research.module.css';

export interface SerializedInsight {
  id: string;
  headline: string;
  detail: string;
  evidence: string | null;
  reference: string | null;
  category: string;
  confidence: string;
  applicabilityPortfolios: string[];
  applicabilityBrands: string[];
  applicabilityIcps: string[];
  tags: string[];
}

const CAT_CLASS: Record<string, string> = {
  audience: styles['insightCat--audience'],
  market: styles['insightCat--market'],
  competitive: styles['insightCat--competitive'],
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

// ─── Draft card ────────────────────────────────────────────

function DraftInsightCard({
  draft,
  index,
  onUpdate,
  onAccept,
  onReject,
}: {
  draft: DraftInsight;
  index: number;
  onUpdate: (index: number, updated: DraftInsight) => void;
  onAccept: (index: number) => Promise<void>;
  onReject: (index: number) => void;
}) {
  const [saving, setSaving] = useState(false);

  function patch(field: keyof DraftInsight, value: unknown) {
    onUpdate(index, { ...draft, [field]: value });
  }

  async function handleAccept() {
    setSaving(true);
    await onAccept(index);
    setSaving(false);
  }

  return (
    <div className={styles.draftCard}>
      <div className={styles.draftCardHeader}>
        <span className={styles.draftPill}>Draft</span>
        {draft.applicabilityHint && (
          <span className={styles.draftApplicabilityHint}>
            Hint: {draft.applicabilityHint}
          </span>
        )}
      </div>

      <div className={styles.draftFieldGroup}>
        <label className={styles.draftEditLabel}>Headline</label>
        <input
          className={styles.draftEditField}
          value={draft.headline}
          onChange={e => patch('headline', e.target.value)}
          placeholder="One-sentence claim"
        />
      </div>

      <div className={styles.draftFieldGroup}>
        <label className={styles.draftEditLabel}>Detail</label>
        <textarea
          className={styles.draftEditTextarea}
          value={draft.detail}
          rows={3}
          onChange={e => patch('detail', e.target.value)}
          placeholder="2–4 sentence explanation"
        />
      </div>

      <div className={styles.draftFieldGroup}>
        <label className={styles.draftEditLabel}>Evidence</label>
        <input
          className={styles.draftEditField}
          value={draft.evidence ?? ''}
          onChange={e => patch('evidence', e.target.value || undefined)}
          placeholder="Exact quote or statistic"
        />
      </div>

      <div className={styles.draftFieldRow}>
        <div className={styles.draftFieldGroup}>
          <label className={styles.draftEditLabel}>Category</label>
          <select
            className={styles.draftEditSelect}
            value={draft.category}
            onChange={e => patch('category', e.target.value)}
          >
            {Object.entries(INSIGHT_CATEGORY_LABELS).map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
        </div>
        <div className={styles.draftFieldGroup}>
          <label className={styles.draftEditLabel}>Confidence</label>
          <select
            className={styles.draftEditSelect}
            value={draft.confidence}
            onChange={e => patch('confidence', e.target.value)}
          >
            {Object.entries(CONFIDENCE_LABELS).map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.draftFieldGroup}>
        <label className={styles.draftEditLabel}>Reference</label>
        <input
          className={styles.draftEditField}
          value={draft.reference ?? ''}
          onChange={e => patch('reference', e.target.value || undefined)}
          placeholder="Page 14 / URL 2"
        />
      </div>

      <div className={styles.draftFieldGroup}>
        <label className={styles.draftEditLabel}>Tags (comma-separated)</label>
        <input
          className={styles.draftEditField}
          value={draft.tags.join(', ')}
          onChange={e =>
            patch('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))
          }
          placeholder="vietnam, beauty, skincare"
        />
      </div>

      <div className={styles.draftActions}>
        <button
          type="button"
          className={styles.acceptBtn}
          onClick={handleAccept}
          disabled={saving || !draft.headline.trim()}
        >
          <span className="material-icons-round" style={{ fontSize: 13 }}>check</span>
          {saving ? 'Saving…' : 'Accept & Save'}
        </button>
        <button
          type="button"
          className={styles.rejectBtn}
          onClick={() => onReject(index)}
          disabled={saving}
        >
          Reject
        </button>
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────

export default function InsightsSectionClient({
  sourceId,
  sourceType,
  initialInsights,
}: {
  sourceId: string;
  sourceType: string;
  initialInsights: SerializedInsight[];
}) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<DraftInsight[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionError, setExtractionError] = useState<string | null>(null);

  useEffect(() => {
    setDrafts(loadDrafts(sourceId));
    setHydrated(true);
  }, [sourceId]);

  useEffect(() => {
    if (!hydrated) return;
    saveDrafts(sourceId, drafts);
  }, [sourceId, drafts, hydrated]);

  async function handleExtract() {
    setIsExtracting(true);
    setExtractionError(null);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4.5 * 60 * 1000);
    try {
      const res = await fetch(`/api/research/sources/${sourceId}/extract`, {
        method: 'POST',
        signal: controller.signal,
      });
      clearTimeout(timeout);
      let data: { error?: string; drafts?: DraftInsight[] };
      try {
        data = await res.json();
      } catch {
        throw new Error(res.status === 504 ? 'Extraction timed out — the PDF may be too large. Try a smaller file.' : `Server error (${res.status})`);
      }
      if (!res.ok) {
        setExtractionError(data.error ?? 'Extraction failed. Please try again.');
      } else {
        setDrafts(prev => [...prev, ...(data.drafts ?? [])]);
      }
    } catch (err) {
      clearTimeout(timeout);
      const msg = (err as Error).message;
      setExtractionError(
        msg.includes('abort') ? 'Extraction timed out after 4.5 minutes.' : msg,
      );
    } finally {
      setIsExtracting(false);
    }
  }

  function handleUpdateDraft(index: number, updated: DraftInsight) {
    setDrafts(prev => prev.map((d, i) => (i === index ? updated : d)));
  }

  async function handleAcceptDraft(index: number) {
    const draft = drafts[index];
    const res = await fetch(`/api/research/sources/${sourceId}/insights`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        headline: draft.headline,
        detail: draft.detail,
        evidence: draft.evidence ?? null,
        reference: draft.reference ?? null,
        category: draft.category,
        confidence: draft.confidence,
        tags: draft.tags,
        applicabilityPortfolios: [],
        applicabilityBrands: [],
        applicabilityIcps: [],
      }),
    });
    if (res.ok) {
      setDrafts(prev => prev.filter((_, i) => i !== index));
      router.refresh();
    }
  }

  function handleRejectDraft(index: number) {
    setDrafts(prev => prev.filter((_, i) => i !== index));
  }

  function handleDiscardAll() {
    if (!confirm('Discard all draft insights?')) return;
    setDrafts([]);
    clearDrafts(sourceId);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this insight? This cannot be undone.')) return;
    setDeletingId(id);
    await fetch(`/api/research/insights/${id}`, { method: 'DELETE' });
    router.refresh();
    setDeletingId(null);
  }

  const insights = initialInsights;

  return (
    <>
      {/* Section header */}
      <div className={styles.insightsSectionHeader}>
        <p className={styles.insightsSectionTitle}>Insights</p>
        <span className={styles.insightsCount}>{insights.length} extracted</span>
        <button
          type="button"
          className={styles.extractBtn}
          onClick={handleExtract}
          disabled={isExtracting}
        >
          <span className="material-icons-round" style={{ fontSize: 14 }}>auto_awesome</span>
          {isExtracting ? 'Extracting…' : 'Extract with AI'}
        </button>
        <button
          type="button"
          className={styles.btnPrimary}
          onClick={() => setModalOpen(true)}
          style={{ fontSize: 12, padding: '7px 14px' }}
        >
          <span className="material-icons-round" style={{ fontSize: 14 }}>add</span>
          Add Insight
        </button>
      </div>

      {/* Extracting state */}
      {isExtracting && (
        <div className={styles.extractingBanner}>
          <div className={styles.extractingSpinner} />
          Sending to Claude for extraction — this may take 30–60 seconds…
        </div>
      )}

      {/* Extraction error */}
      {extractionError && (
        <div className={styles.extractionErrorBanner}>
          <span className="material-icons-round" style={{ fontSize: 16 }}>error_outline</span>
          <span>{extractionError}</span>
        </div>
      )}

      {/* Draft cards */}
      {hydrated && drafts.length > 0 && (
        <div className={styles.draftsSection}>
          <div className={styles.draftsBanner}>
            <span className="material-icons-round" style={{ fontSize: 16 }}>pending_actions</span>
            <span className={styles.draftsBannerText}>
              {drafts.length} draft {drafts.length === 1 ? 'insight' : 'insights'} — review,
              edit, then accept or reject each one.
            </span>
            <button type="button" className={styles.discardAllBtn} onClick={handleDiscardAll}>
              Discard all
            </button>
          </div>
          <div className={styles.insightList}>
            {drafts.map((draft, i) => (
              <DraftInsightCard
                key={i}
                draft={draft}
                index={i}
                onUpdate={handleUpdateDraft}
                onAccept={handleAcceptDraft}
                onReject={handleRejectDraft}
              />
            ))}
          </div>
        </div>
      )}

      {/* Accepted insights */}
      {insights.length === 0 && (!hydrated || drafts.length === 0) ? (
        <div className={styles.insightList}>
          {[0, 1, 2].map(i => (
            <div key={i} className={`${styles.insightCard} ${styles.ghostCard}`}>
              <div className={styles.insightTopRow}>
                <p className={`${styles.insightHeadline} ${styles.ghostText}`}>
                  Headline not yet captured
                </p>
                <div className={styles.insightBadgeRow}>
                  <span className={`${styles.insightCatBadge} ${styles.ghostText}`}>—</span>
                </div>
              </div>
              <p className={`${styles.insightDetail} ${styles.ghostText}`}>
                Detail not yet captured
              </p>
            </div>
          ))}
        </div>
      ) : insights.length > 0 ? (
        <div className={styles.insightList}>
          {insights.map(insight => {
            const catLabel =
              INSIGHT_CATEGORY_LABELS[insight.category as keyof typeof INSIGHT_CATEGORY_LABELS] ??
              insight.category;
            const confLabel =
              CONFIDENCE_LABELS[insight.confidence as keyof typeof CONFIDENCE_LABELS] ??
              insight.confidence;
            const hasApplicability =
              insight.applicabilityPortfolios.length > 0 ||
              insight.applicabilityBrands.length > 0 ||
              insight.applicabilityIcps.length > 0;

            return (
              <div
                key={insight.id}
                className={styles.insightCard}
                style={{ opacity: deletingId === insight.id ? 0.4 : 1 }}
              >
                <div className={styles.insightTopRow}>
                  <p className={styles.insightHeadline}>{insight.headline}</p>
                  <div className={styles.insightBadgeRow}>
                    <span className={`${styles.insightCatBadge} ${CAT_CLASS[insight.category] ?? ''}`}>
                      {catLabel}
                    </span>
                    <span className={`${styles.confidenceBadge} ${CONF_CLASS[insight.confidence] ?? ''}`}>
                      {confLabel}
                    </span>
                  </div>
                </div>

                <p className={styles.insightDetail}>{insight.detail}</p>

                {insight.evidence && (
                  <div className={styles.evidenceBox}>{insight.evidence}</div>
                )}

                <p className={styles.insightRef}>
                  Reference: {insight.reference ?? 'not captured'}
                </p>

                {hasApplicability && (
                  <div className={styles.insightApplicability}>
                    <span className={styles.applicabilityLabel}>Relevant to:</span>
                    {insight.applicabilityPortfolios.map(s => (
                      <span key={s} className={styles.slugPill}>{s}</span>
                    ))}
                    {insight.applicabilityBrands.map(s => (
                      <span key={s} className={styles.slugPill}>{s}</span>
                    ))}
                    {insight.applicabilityIcps.map(s => (
                      <span key={s} className={styles.slugPill}>{s}</span>
                    ))}
                  </div>
                )}

                {insight.tags.length > 0 && (
                  <div className={styles.insightTagRow}>
                    {insight.tags.map(tag => (
                      <span key={tag} className={styles.tagPill}>{tag}</span>
                    ))}
                  </div>
                )}

                <div className={styles.insightCardFooter}>
                  <button
                    type="button"
                    className={`${styles.insightAction} ${styles.insightActionDelete}`}
                    onClick={() => handleDelete(insight.id)}
                    disabled={deletingId === insight.id}
                  >
                    <span className="material-icons-round" style={{ fontSize: 13 }}>delete_outline</span>
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {/* Modal */}
      {modalOpen && (
        <AddInsightModal
          sourceId={sourceId}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
