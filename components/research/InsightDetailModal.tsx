'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  INSIGHT_CATEGORY_LABELS,
  CONFIDENCE_LABELS,
} from '@/lib/research/constants';
import type { InsightWithSource } from '@/lib/research/types';
import styles from '@/app/knowledge-base/research/research.module.css';

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

interface EditData {
  headline: string;
  detail: string;
  evidence: string;
  reference: string;
  category: string;
  confidence: string;
  tags: string;
  applicabilityPortfolios: string;
  applicabilityBrands: string;
  applicabilityIcps: string;
}

export default function InsightDetailModal({
  insight,
  isOpen,
  onClose,
  onUpdate,
  onDelete,
}: {
  insight: InsightWithSource;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updated: InsightWithSource) => void;
  onDelete: (id: string) => void;
}) {
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<EditData | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setEditMode(false);
      setEditData(null);
    }
  }, [isOpen]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Escape') return;
      if (editMode) {
        if (confirm('Discard unsaved changes?')) {
          setEditMode(false);
          setEditData(null);
        }
      } else {
        onClose();
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
      return () => window.removeEventListener('keydown', onKeyDown);
    }
  }, [isOpen, editMode, onClose]);

  if (!isOpen) return null;

  function startEdit() {
    setEditData({
      headline: insight.headline,
      detail: insight.detail,
      evidence: insight.evidence ?? '',
      reference: insight.reference ?? '',
      category: insight.category,
      confidence: insight.confidence,
      tags: insight.tags.join(', '),
      applicabilityPortfolios: insight.applicabilityPortfolios.join(', '),
      applicabilityBrands: insight.applicabilityBrands.join(', '),
      applicabilityIcps: insight.applicabilityIcps.join(', '),
    });
    setEditMode(true);
  }

  function cancelEdit() {
    setEditMode(false);
    setEditData(null);
  }

  function patchEdit(field: keyof EditData, value: string) {
    setEditData(prev => prev ? { ...prev, [field]: value } : null);
  }

  function splitCsv(s: string): string[] {
    return s.split(',').map(t => t.trim()).filter(Boolean);
  }

  async function handleSave() {
    if (!editData) return;
    setSaving(true);
    const body = {
      headline: editData.headline,
      detail: editData.detail,
      evidence: editData.evidence || null,
      reference: editData.reference || null,
      category: editData.category,
      confidence: editData.confidence,
      tags: splitCsv(editData.tags),
      applicabilityPortfolios: splitCsv(editData.applicabilityPortfolios),
      applicabilityBrands: splitCsv(editData.applicabilityBrands),
      applicabilityIcps: splitCsv(editData.applicabilityIcps),
    };
    const res = await fetch(`/api/research/insights/${insight.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const updated = await res.json();
      onUpdate({ ...insight, ...updated });
      setEditMode(false);
      setEditData(null);
    }
    setSaving(false);
  }

  async function handleDelete() {
    if (!confirm('Delete this insight? This cannot be undone.')) return;
    setDeleting(true);
    const res = await fetch(`/api/research/insights/${insight.id}`, { method: 'DELETE' });
    if (res.ok) {
      onDelete(insight.id);
      onClose();
    }
    setDeleting(false);
  }

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
    <div className={styles.modalOverlay} onClick={editMode ? undefined : onClose}>
      <div
        className={styles.modal}
        style={{ maxWidth: 720 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.modalHeaderRow}>
          <div className={styles.modalHeaderPills}>
            <span
              className={`${styles.insightCatBadge} ${CAT_CLASS[insight.category] ?? ''}`}
              style={{ fontSize: 10, padding: '3px 9px' }}
            >
              {catLabel}
            </span>
            <span
              className={`${styles.confidenceBadge} ${CONF_CLASS[insight.confidence] ?? ''}`}
              style={{ fontSize: 10, padding: '3px 9px' }}
            >
              {confLabel}
            </span>
          </div>
          <div className={styles.modalHeaderActions}>
            {!editMode ? (
              <>
                <button type="button" className={styles.modalEditBtn} onClick={startEdit}>
                  <span className="material-icons-round" style={{ fontSize: 13 }}>edit</span>
                  Edit
                </button>
                <button
                  type="button"
                  className={styles.modalDeleteBtn}
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  <span className="material-icons-round" style={{ fontSize: 13 }}>delete_outline</span>
                  {deleting ? 'Deleting…' : 'Delete'}
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className={styles.modalSaveBtn}
                  onClick={handleSave}
                  disabled={saving || !editData?.headline.trim()}
                >
                  {saving ? 'Saving…' : 'Save'}
                </button>
                <button type="button" className={styles.modalCancelBtn} onClick={cancelEdit}>
                  Cancel
                </button>
              </>
            )}
            <button
              type="button"
              className={styles.modalClose}
              onClick={editMode ? undefined : onClose}
              disabled={editMode}
            >
              <span className={`material-icons-round ${styles.modalCloseIcon}`}>close</span>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          {!editMode ? (
            // ── View mode ──────────────────────────────────────
            <>
              <p className={styles.modalDetailHeadline}>{insight.headline}</p>
              <p className={styles.modalDetailBody}>{insight.detail}</p>

              {insight.evidence && (
                <div className={styles.evidenceBox} style={{ marginTop: 12 }}>
                  {insight.evidence}
                </div>
              )}

              <p className={styles.insightRef} style={{ marginTop: 10 }}>
                Reference: {insight.reference ?? 'none'}
              </p>

              {insight.tags.length > 0 && (
                <div className={styles.insightTagRow} style={{ marginTop: 10 }}>
                  {insight.tags.map(tag => (
                    <span key={tag} className={styles.tagPill}>{tag}</span>
                  ))}
                </div>
              )}

              {hasApplicability && (
                <>
                  <div className={styles.modalDivider} />
                  <p className={styles.applicabilityLabel} style={{ marginBottom: 8 }}>
                    Relevant to
                  </p>
                  {insight.applicabilityPortfolios.length > 0 && (
                    <div className={styles.modalApplicabilityRow}>
                      <span className={styles.modalApplicabilityRowLabel}>Portfolios</span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {insight.applicabilityPortfolios.map(slug => (
                          <span key={slug} className={styles.slugPill}>
                            {slug}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {insight.applicabilityBrands.length > 0 && (
                    <div className={styles.modalApplicabilityRow}>
                      <span className={styles.modalApplicabilityRowLabel}>Brands</span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {insight.applicabilityBrands.map(slug => (
                          <span key={slug} className={styles.slugPill}>{slug}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {insight.applicabilityIcps.length > 0 && (
                    <div className={styles.modalApplicabilityRow}>
                      <span className={styles.modalApplicabilityRowLabel}>ICPs</span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {insight.applicabilityIcps.map(slug => (
                          <span key={slug} className={styles.slugPill}>{slug}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              <div className={styles.modalDivider} />

              <Link
                href={`/knowledge-base/research/sources/${insight.source.id}`}
                className={styles.modalSourceCard}
              >
                <span className={`material-icons-round ${styles.modalSourceIcon}`}>
                  {insight.source.type === 'pdf' ? 'picture_as_pdf' : 'link'}
                </span>
                <div className={styles.modalSourceInfo}>
                  <p className={styles.modalSourceCardLabel}>Source</p>
                  <p className={styles.modalSourceCardTitle}>{insight.source.title}</p>
                </div>
                <span className="material-icons-round" style={{ fontSize: 14, color: 'var(--gray-400)' }}>
                  open_in_new
                </span>
              </Link>
            </>
          ) : editData ? (
            // ── Edit mode ─────────────────────────────────────
            <>
              <div className={styles.formField}>
                <label className={styles.formLabel}>Headline</label>
                <input
                  className={styles.formInput}
                  value={editData.headline}
                  onChange={e => patchEdit('headline', e.target.value)}
                  placeholder="One-sentence claim"
                />
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel}>Detail</label>
                <textarea
                  className={styles.formTextarea}
                  value={editData.detail}
                  rows={4}
                  onChange={e => patchEdit('detail', e.target.value)}
                  placeholder="2–4 sentence explanation"
                />
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel}>Evidence</label>
                <input
                  className={styles.formInput}
                  value={editData.evidence}
                  onChange={e => patchEdit('evidence', e.target.value)}
                  placeholder="Exact quote or statistic"
                />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label className={styles.formLabel}>Category</label>
                  <select
                    className={styles.formSelect}
                    value={editData.category}
                    onChange={e => patchEdit('category', e.target.value)}
                  >
                    {Object.entries(INSIGHT_CATEGORY_LABELS).map(([v, l]) => (
                      <option key={v} value={v}>{l}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.formField}>
                  <label className={styles.formLabel}>Confidence</label>
                  <select
                    className={styles.formSelect}
                    value={editData.confidence}
                    onChange={e => patchEdit('confidence', e.target.value)}
                  >
                    {Object.entries(CONFIDENCE_LABELS).map(([v, l]) => (
                      <option key={v} value={v}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel}>Reference</label>
                <input
                  className={styles.formInput}
                  value={editData.reference}
                  onChange={e => patchEdit('reference', e.target.value)}
                  placeholder="Page 14 / URL 2"
                />
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel}>Tags (comma-separated)</label>
                <input
                  className={styles.formInput}
                  value={editData.tags}
                  onChange={e => patchEdit('tags', e.target.value)}
                  placeholder="vietnam, beauty, skincare"
                />
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel}>Applicability — Portfolios (comma-separated slugs)</label>
                <input
                  className={styles.formInput}
                  value={editData.applicabilityPortfolios}
                  onChange={e => patchEdit('applicabilityPortfolios', e.target.value)}
                  placeholder="loreal-vietnam, unilever-vn-beauty"
                />
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel}>Applicability — Brands (comma-separated slugs)</label>
                <input
                  className={styles.formInput}
                  value={editData.applicabilityBrands}
                  onChange={e => patchEdit('applicabilityBrands', e.target.value)}
                  placeholder="loreal-paris, maybelline"
                />
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel}>Applicability — ICPs (comma-separated slugs)</label>
                <input
                  className={styles.formInput}
                  value={editData.applicabilityIcps}
                  onChange={e => patchEdit('applicabilityIcps', e.target.value)}
                  placeholder="beauty-enthusiast-f25-35"
                />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
