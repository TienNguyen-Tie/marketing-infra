'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { INSIGHT_CATEGORY_LABELS, CONFIDENCE_LABELS } from '@/lib/research/constants';
import styles from '../../research.module.css';

interface Props {
  sourceId: string;
  onClose: () => void;
}

interface FormState {
  headline: string;
  detail: string;
  evidence: string;
  reference: string;
  category: string;
  confidence: string;
  applicabilityPortfolios: string;
  applicabilityBrands: string;
  applicabilityIcps: string;
  tags: string;
}

const EMPTY: FormState = {
  headline: '',
  detail: '',
  evidence: '',
  reference: '',
  category: '',
  confidence: 'medium',
  applicabilityPortfolios: '',
  applicabilityBrands: '',
  applicabilityIcps: '',
  tags: '',
};

function splitCsv(s: string): string[] {
  return s.split(',').map(t => t.trim()).filter(Boolean);
}

export default function AddInsightModal({ sourceId, onClose }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function set(key: keyof FormState, value: string) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  const canSave = form.headline.trim() && form.detail.trim() && form.category;

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!canSave) return;
    setSaving(true);
    setError('');

    try {
      const res = await fetch(`/api/research/sources/${sourceId}/insights`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          headline: form.headline.trim(),
          detail: form.detail.trim(),
          evidence: form.evidence.trim() || undefined,
          reference: form.reference.trim() || undefined,
          category: form.category,
          confidence: form.confidence,
          applicabilityPortfolios: splitCsv(form.applicabilityPortfolios),
          applicabilityBrands: splitCsv(form.applicabilityBrands),
          applicabilityIcps: splitCsv(form.applicabilityIcps),
          tags: splitCsv(form.tags),
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? 'Failed to save insight');
      }

      router.refresh();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setSaving(false);
    }
  }

  return (
    <div className={styles.modalOverlay} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <p className={styles.modalTitle}>Add Insight</p>
          <button type="button" className={styles.modalClose} onClick={onClose}>
            <span className={`material-icons-round ${styles.modalCloseIcon}`}>close</span>
          </button>
        </div>

        <form onSubmit={handleSave}>
          <div className={styles.modalBody}>
            {/* Headline */}
            <div className={styles.formField}>
              <label className={`${styles.formLabel} ${styles.formLabelRequired}`}>Headline</label>
              <input
                type="text"
                className={styles.formInput}
                placeholder="One-line insight summary"
                value={form.headline}
                onChange={e => set('headline', e.target.value)}
                required
              />
            </div>

            {/* Detail */}
            <div className={styles.formField}>
              <label className={`${styles.formLabel} ${styles.formLabelRequired}`}>Detail</label>
              <textarea
                rows={4}
                className={styles.formTextarea}
                placeholder="Full insight description"
                value={form.detail}
                onChange={e => set('detail', e.target.value)}
                required
              />
            </div>

            {/* Evidence */}
            <div className={styles.formField}>
              <label className={styles.formLabel}>Evidence</label>
              <textarea
                rows={3}
                className={styles.formTextarea}
                placeholder="Supporting data, quote, or statistic"
                value={form.evidence}
                onChange={e => set('evidence', e.target.value)}
              />
            </div>

            {/* Reference */}
            <div className={styles.formField}>
              <label className={styles.formLabel}>Reference</label>
              <input
                type="text"
                className={styles.formInput}
                placeholder='e.g. "Page 14" or specific URL'
                value={form.reference}
                onChange={e => set('reference', e.target.value)}
              />
            </div>

            {/* Category + Confidence */}
            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label className={`${styles.formLabel} ${styles.formLabelRequired}`}>Category</label>
                <select
                  className={styles.formSelect}
                  value={form.category}
                  onChange={e => set('category', e.target.value)}
                  required
                >
                  <option value="">Select…</option>
                  {Object.entries(INSIGHT_CATEGORY_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel}>Confidence</label>
                <select
                  className={styles.formSelect}
                  value={form.confidence}
                  onChange={e => set('confidence', e.target.value)}
                >
                  {Object.entries(CONFIDENCE_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Applicability */}
            <div className={styles.formField}>
              <label className={styles.formLabel}>Relevant portfolios (comma-separated slugs)</label>
              <input
                type="text"
                className={styles.formInput}
                placeholder="loreal-vn-consumer, unilever-vn-beauty"
                value={form.applicabilityPortfolios}
                onChange={e => set('applicabilityPortfolios', e.target.value)}
              />
            </div>
            <div className={styles.formField}>
              <label className={styles.formLabel}>Relevant brands (comma-separated slugs)</label>
              <input
                type="text"
                className={styles.formInput}
                placeholder="loreal-paris, maybelline"
                value={form.applicabilityBrands}
                onChange={e => set('applicabilityBrands', e.target.value)}
              />
            </div>
            <div className={styles.formField}>
              <label className={styles.formLabel}>Relevant ICPs (comma-separated slugs)</label>
              <input
                type="text"
                className={styles.formInput}
                placeholder="beauty-mnc, fnb-challenger"
                value={form.applicabilityIcps}
                onChange={e => set('applicabilityIcps', e.target.value)}
              />
            </div>

            {/* Tags */}
            <div className={styles.formField}>
              <label className={styles.formLabel}>Tags (comma-separated)</label>
              <input
                type="text"
                className={styles.formInput}
                placeholder="tiktok, gen-z, beauty"
                value={form.tags}
                onChange={e => set('tags', e.target.value)}
              />
            </div>

            {error && <p className={styles.formError}>{error}</p>}
          </div>

          <div className={styles.modalActions}>
            <button type="button" className={styles.cancelLink} onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              Cancel
            </button>
            <button
              type="submit"
              className={styles.btnPrimary}
              disabled={!canSave || saving}
            >
              {saving ? 'Saving…' : 'Save Insight'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
