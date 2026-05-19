'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { compressPDF, formatBytes } from '@/lib/research/compress-pdf';
import { SOURCE_CATEGORY_LABELS, MAX_PDF_SIZE_BYTES, MAX_PDF_SIZE_MB } from '@/lib/research/constants';
import type { SourceType, UrlRef } from '@/lib/research/types';
import styles from '../research.module.css';

/* ── Tag chip input ───────────────────────────────────────── */

function TagsInput({ tags, onChange }: { tags: string[]; onChange: (tags: string[]) => void }) {
  const [input, setInput] = useState('');

  function addTag(raw: string) {
    const tag = raw.trim().toLowerCase();
    if (tag && !tags.includes(tag)) onChange([...tags, tag]);
    setInput('');
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
    } else if (e.key === 'Backspace' && !input && tags.length) {
      onChange(tags.slice(0, -1));
    }
  }

  return (
    <>
      <div className={styles.tagsInput}>
        {tags.map(tag => (
          <span key={tag} className={styles.tagChip}>
            {tag}
            <span
              className={`material-icons-round ${styles.tagChipRemove}`}
              onClick={() => onChange(tags.filter(t => t !== tag))}
            >
              close
            </span>
          </span>
        ))}
        <input
          type="text"
          className={styles.tagsRawInput}
          placeholder={tags.length === 0 ? 'Add tags…' : ''}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          onBlur={() => { if (input) addTag(input); }}
        />
      </div>
      <p className={styles.tagsHint}>Press Enter or comma to add a tag</p>
    </>
  );
}

/* ── PDF upload field ─────────────────────────────────────── */

type PDFState =
  | { status: 'idle' }
  | { status: 'compressing'; filename: string }
  | { status: 'ready'; file: File; originalSize: number; compressedSize: number; savedPercent: number; didCompress: boolean }
  | { status: 'error'; message: string };

function PDFUploadField({
  pdfState,
  onFileSelected,
}: {
  pdfState: PDFState;
  onFileSelected: (state: PDFState) => void;
}) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function processFile(file: File) {
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      onFileSelected({ status: 'error', message: 'Only PDF files are accepted.' });
      return;
    }
    if (file.size > MAX_PDF_SIZE_BYTES) {
      onFileSelected({ status: 'error', message: `File too large. Max ${MAX_PDF_SIZE_MB} MB.` });
      return;
    }
    onFileSelected({ status: 'compressing', filename: file.name });
    const result = await compressPDF(file);
    onFileSelected({
      status: 'ready',
      file: result.file,
      originalSize: result.originalSize,
      compressedSize: result.compressedSize,
      savedPercent: result.savedPercent,
      didCompress: result.didCompress,
    });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  }

  return (
    <div>
      {(pdfState.status === 'idle' || pdfState.status === 'error') && (
        <div
          className={`${styles.uploadArea}${dragging ? ' ' + styles.uploadAreaDragging : ''}`}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <span className={`material-icons-round ${styles.uploadAreaIcon}`}>upload_file</span>
          <p className={styles.uploadAreaTitle}>Drop a PDF here or click to browse</p>
          <p className={styles.uploadAreaSub}>PDF only · max {MAX_PDF_SIZE_MB} MB</p>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,application/pdf"
            className={styles.uploadAreaInput}
            onChange={handleChange}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}

      {pdfState.status === 'error' && (
        <p className={styles.uploadError}>{pdfState.message}</p>
      )}

      {pdfState.status === 'compressing' && (
        <div className={styles.uploadCompressing}>
          <span className="material-icons-round" style={{ fontSize: 16 }}>hourglass_top</span>
          Compressing {pdfState.filename}…
        </div>
      )}

      {pdfState.status === 'ready' && (
        <div className={styles.uploadResult}>
          <span className={`material-icons-round ${styles.uploadResultIcon}`}>picture_as_pdf</span>
          <div className={styles.uploadResultBody}>
            <p className={styles.uploadResultName}>{pdfState.file.name}</p>
            <p className={styles.uploadResultStats}>
              {pdfState.didCompress ? (
                <>
                  Original: {formatBytes(pdfState.originalSize)} →{' '}
                  Compressed: {formatBytes(pdfState.compressedSize)}{' '}
                  <span className={styles.uploadResultSaved}>· Saved {pdfState.savedPercent}%</span>
                  {' · ready to upload'}
                </>
              ) : (
                <>Size: {formatBytes(pdfState.originalSize)} · already optimized, uploading as-is</>
              )}
            </p>
          </div>
          <button
            type="button"
            className={styles.uploadReplaceLink}
            onClick={() => {
              onFileSelected({ status: 'idle' });
              if (inputRef.current) inputRef.current.value = '';
              inputRef.current?.click();
            }}
          >
            Replace file
          </button>
        </div>
      )}
    </div>
  );
}

/* ── URL collection field ─────────────────────────────────── */

function URLCollectionField({
  urls,
  onChange,
}: {
  urls: UrlRef[];
  onChange: (urls: UrlRef[]) => void;
}) {
  function update(index: number, field: keyof UrlRef, value: string) {
    const next = urls.map((row, i) => (i === index ? { ...row, [field]: value } : row));
    onChange(next);
  }

  function remove(index: number) {
    onChange(urls.filter((_, i) => i !== index));
  }

  function addRow() {
    onChange([...urls, { url: '', title: '', quote: '', notes: '' }]);
  }

  return (
    <div>
      <div className={styles.urlListHeader}>
        <p className={styles.urlListTitle}>Add URLs</p>
        <p className={styles.urlListSubtitle}>
          Add each URL with optional context — a quote that matters, a note about why.
        </p>
      </div>

      <div className={styles.urlList}>
        {urls.map((row, i) => (
          <div key={i} className={styles.urlRow}>
            <div className={styles.urlRowHeader}>
              <span className={styles.urlRowNum}>URL {i + 1}</span>
              {urls.length > 1 && (
                <button type="button" className={styles.urlRowRemove} onClick={() => remove(i)}>
                  <span className="material-icons-round" style={{ fontSize: 14 }}>close</span>
                </button>
              )}
            </div>

            <div className={styles.formField}>
              <label className={`${styles.formLabel} ${styles.formLabelRequired}`}>URL</label>
              <input
                type="url"
                className={styles.formInput}
                placeholder="https://…"
                value={row.url}
                onChange={e => update(i, 'url', e.target.value)}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel}>Custom title</label>
              <input
                type="text"
                className={styles.formInput}
                placeholder="How you'd label this link"
                value={row.title ?? ''}
                onChange={e => update(i, 'title', e.target.value)}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel}>Key quote</label>
              <textarea
                rows={2}
                className={styles.formTextarea}
                placeholder="Paste a key quote or stat from this URL"
                value={row.quote ?? ''}
                onChange={e => update(i, 'quote', e.target.value)}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel}>Notes</label>
              <input
                type="text"
                className={styles.formInput}
                placeholder="Why this URL matters"
                value={row.notes ?? ''}
                onChange={e => update(i, 'notes', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      <button type="button" className={styles.addUrlBtn} onClick={addRow}>
        <span className="material-icons-round" style={{ fontSize: 15 }}>add</span>
        Add another URL
      </button>
    </div>
  );
}

/* ── Main page ────────────────────────────────────────────── */

type Step = 'type-chooser' | 'form';

interface FormState {
  title: string;
  publisher: string;
  publicationDate: string;
  category: string;
  tags: string[];
  summary: string;
  manualNotes: string;
}

const EMPTY_FORM: FormState = {
  title: '',
  publisher: '',
  publicationDate: '',
  category: '',
  tags: [],
  summary: '',
  manualNotes: '',
};

export default function NewSourcePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('type-chooser');
  const [sourceType, setSourceType] = useState<SourceType | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [pdfState, setPdfState] = useState<PDFState>({ status: 'idle' });
  const [urls, setUrls] = useState<UrlRef[]>([{ url: '', title: '', quote: '', notes: '' }]);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [submitError, setSubmitError] = useState('');

  function setField(key: keyof FormState, value: string | string[]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function selectType(t: SourceType) {
    setSourceType(t);
    setStep('form');
  }

  const canSubmit = useCallback((): boolean => {
    if (!form.title.trim()) return false;
    if (sourceType === 'pdf' && pdfState.status !== 'ready') return false;
    if (sourceType === 'url-collection') {
      const hasUrl = urls.some(u => u.url.trim());
      if (!hasUrl) return false;
    }
    return true;
  }, [form.title, sourceType, pdfState.status, urls]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit() || !sourceType) return;
    setSubmitting(true);
    setSubmitError('');
    setUploadProgress(null);

    try {
      let pdfUrl: string | undefined;
      let pdfFilename: string | undefined;
      let pdfOriginalSize: number | undefined;
      let pdfCompressedSize: number | undefined;

      if (sourceType === 'pdf' && pdfState.status === 'ready') {
        // Phase 1: get a presigned PUT URL (no Authorization header needed for the upload)
        const tokenRes = await fetch(
          `/api/research/upload?filename=${encodeURIComponent(pdfState.file.name)}`,
        );
        if (!tokenRes.ok) {
          const j = await tokenRes.json().catch(() => ({}));
          throw new Error((j as { error?: string }).error ?? 'Failed to get upload URL');
        }
        const { presignedUrl, blobUrl } = (await tokenRes.json()) as {
          presignedUrl: string;
          blobUrl: string;
        };

        // Phase 2: PUT directly to Vercel Blob using the presigned URL
        pdfUrl = await new Promise<string>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open('PUT', presignedUrl);
          xhr.setRequestHeader('Content-Type', 'application/pdf');
          xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) setUploadProgress(Math.round((e.loaded / e.total) * 100));
          });
          xhr.onload = () => {
            setUploadProgress(null);
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve(blobUrl);
            } else {
              reject(new Error(`Upload failed (${xhr.status}): ${xhr.responseText.slice(0, 200)}`));
            }
          };
          xhr.onerror = () => { setUploadProgress(null); reject(new Error('Network error during upload')); };
          xhr.ontimeout = () => { setUploadProgress(null); reject(new Error('Upload timed out')); };
          xhr.timeout = 3 * 60 * 1000;
          xhr.send(pdfState.file);
        });
        pdfFilename = pdfState.file.name;
        pdfOriginalSize = pdfState.originalSize;
        pdfCompressedSize = pdfState.compressedSize;
      }

      const body = {
        title: form.title.trim(),
        type: sourceType,
        publisher: form.publisher.trim() || undefined,
        publicationDate: form.publicationDate || undefined,
        category: form.category || undefined,
        tags: form.tags,
        summary: form.summary.trim() || undefined,
        manualNotes: form.manualNotes.trim() || undefined,
        ...(sourceType === 'pdf' && { pdfUrl, pdfFilename, pdfOriginalSize, pdfCompressedSize }),
        ...(sourceType === 'url-collection' && {
          urls: urls.filter(u => u.url.trim()),
        }),
      };

      const res = await fetch('/api/research/sources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? 'Failed to save source');
      }

      const created = await res.json();
      router.push(`/knowledge-base/research/sources/${created.id}`);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong');
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.newPage}>
      {/* Breadcrumb */}
      <p className={styles.breadcrumb}>
        <Link href="/knowledge-base/research" style={{ color: 'inherit', textDecoration: 'none' }}>
          Research &amp; Insights
        </Link>{' '}
        › Add Source
      </p>

      <div className={styles.formPageHero}>
        <h1 className={styles.formPageH1}>Add Research Source</h1>
        <p className={styles.formPageSubtitle}>
          Upload a PDF or bundle a collection of URLs to start building your insight library.
        </p>
      </div>

      {/* Step 1 — Type chooser */}
      {step === 'type-chooser' && (
        <>
          <p className={styles.stepLabel}>Step 1 — Choose source type</p>
          <div className={styles.typeChooserGrid}>
            <button
              type="button"
              className={`${styles.typeCard}${sourceType === 'pdf' ? ' ' + styles.typeCardActive : ''}`}
              onClick={() => selectType('pdf')}
            >
              <div className={styles.typeCardIconBox}>
                <span className={`material-icons-round ${styles.typeCardIconSym}`}>picture_as_pdf</span>
              </div>
              <p className={styles.typeCardTitle}>PDF Report</p>
              <p className={styles.typeCardDesc}>
                Upload a PDF of an industry report, market research, or other document.
              </p>
            </button>
            <button
              type="button"
              className={`${styles.typeCard}${sourceType === 'url-collection' ? ' ' + styles.typeCardActive : ''}`}
              onClick={() => selectType('url-collection')}
            >
              <div className={styles.typeCardIconBox}>
                <span className={`material-icons-round ${styles.typeCardIconSym}`}>link</span>
              </div>
              <p className={styles.typeCardTitle}>URL Collection</p>
              <p className={styles.typeCardDesc}>
                Bundle multiple web references on a topic — articles, posts, threads, etc.
              </p>
            </button>
          </div>
        </>
      )}

      {/* Step 2 — Metadata + content form */}
      {step === 'form' && sourceType && (
        <form onSubmit={handleSubmit}>
          <p className={styles.stepLabel}>
            Step 2 — {sourceType === 'pdf' ? 'PDF Report' : 'URL Collection'} details
            {' '}
            <button
              type="button"
              onClick={() => setStep('type-chooser')}
              style={{ background: 'none', border: 'none', color: 'var(--red)', fontSize: 10, fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.06em' }}
            >
              Change type
            </button>
          </p>

          {/* Common metadata */}
          <div className={styles.formSection}>
            <p className={styles.formSectionTitle}>Source Metadata</p>

            <div className={styles.formField}>
              <label className={`${styles.formLabel} ${styles.formLabelRequired}`}>Title</label>
              <input
                type="text"
                className={styles.formInput}
                placeholder="Report or source title"
                value={form.title}
                onChange={e => setField('title', e.target.value)}
                required
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label className={styles.formLabel}>Publisher</label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="Publisher name"
                  value={form.publisher}
                  onChange={e => setField('publisher', e.target.value)}
                />
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel}>Publication date</label>
                <input
                  type="date"
                  className={styles.formInput}
                  value={form.publicationDate}
                  onChange={e => setField('publicationDate', e.target.value)}
                />
              </div>
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel}>Category</label>
              <select
                className={styles.formSelect}
                value={form.category}
                onChange={e => setField('category', e.target.value)}
              >
                <option value="">Select category…</option>
                {Object.entries(SOURCE_CATEGORY_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel}>Tags</label>
              <TagsInput tags={form.tags} onChange={t => setField('tags', t)} />
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel}>Overview summary</label>
              <textarea
                rows={3}
                className={styles.formTextarea}
                placeholder="Brief summary of what this source covers"
                value={form.summary}
                onChange={e => setField('summary', e.target.value)}
              />
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel}>Notes / Why This Matters (optional)</label>
              <textarea
                rows={3}
                className={styles.formTextarea}
                placeholder="Why this source is relevant — context for the team"
                value={form.manualNotes}
                onChange={e => setField('manualNotes', e.target.value)}
              />
            </div>
          </div>

          {/* Type-specific section */}
          <div className={styles.formSection}>
            <p className={styles.formSectionTitle}>
              {sourceType === 'pdf' ? 'PDF File' : 'URL References'}
            </p>

            {sourceType === 'pdf' && (
              <PDFUploadField pdfState={pdfState} onFileSelected={setPdfState} />
            )}

            {sourceType === 'url-collection' && (
              <URLCollectionField urls={urls} onChange={setUrls} />
            )}
          </div>

          {/* Form actions */}
          {submitError && <p className={styles.formError}>{submitError}</p>}

          <div className={styles.formActions}>
            <Link href="/knowledge-base/research" className={styles.cancelLink}>
              Cancel
            </Link>
            <button
              type="submit"
              className={styles.btnPrimary}
              disabled={!canSubmit() || submitting}
            >
              {submitting
                ? uploadProgress !== null
                  ? `Uploading… ${uploadProgress}%`
                  : 'Saving…'
                : 'Save Source'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
