'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import s from './CreateDraftSlider.module.css';
import { ICP_FORM_CONFIG } from '@/lib/drafts/config/icp-form-config';
import { PERSONA_FORM_CONFIG } from '@/lib/drafts/config/persona-form-config';
import type { EntityKind, EntityFormConfig, SeedInputs } from '@/lib/drafts/types';

interface Props {
  kind: EntityKind;
  onClose: () => void;
}

type Stage = 1 | 2 | 3;

const STAGE_LABELS = ['Fill in details', 'Copy prompt & upload', 'Done'];

export default function CreateDraftSlider({ kind, onClose }: Props) {
  const router = useRouter();
  const config: EntityFormConfig = kind === 'icp' ? ICP_FORM_CONFIG : PERSONA_FORM_CONFIG;

  const [stage, setStage] = useState<Stage>(1);
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [promptCopied, setPromptCopied] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [parseResult, setParseResult] = useState<{
    errors: string[];
    warnings: string[];
    ok: boolean;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const validate = useCallback((): boolean => {
    const next: Record<string, string> = {};
    for (const field of config.fields) {
      if (field.required && !values[field.key]?.trim()) {
        next[field.key] = `${field.label} is required`;
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [config.fields, values]);

  async function handleSubmitForm() {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/drafts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind, seedInputs: values as unknown as SeedInputs }),
      });
      const data = await res.json() as { draft?: { id: string; generatedPrompt: string }; error?: string };
      if (!res.ok || !data.draft) {
        alert(data.error ?? 'Failed to create draft');
        return;
      }
      setDraftId(data.draft.id);
      setGeneratedPrompt(data.draft.generatedPrompt);
      setStage(2);
    } catch {
      alert('Network error — please try again');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCopyPrompt() {
    await navigator.clipboard.writeText(generatedPrompt);
    setPromptCopied(true);
    setTimeout(() => setPromptCopied(false), 2000);
  }

  function handleDownloadPrompt() {
    const blob = new Blob([generatedPrompt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ecomobi-${kind}-prompt.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !draftId) return;
    setUploading(true);
    setParseResult(null);
    try {
      const markdown = await file.text();
      const res = await fetch(`/api/drafts/${draftId}/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markdown }),
      });
      const data = await res.json() as { errors?: string[]; warnings?: string[] };
      if (!res.ok) {
        setParseResult({ errors: data.errors ?? ['Unknown error'], warnings: data.warnings ?? [], ok: false });
      } else {
        setParseResult({ errors: [], warnings: data.warnings ?? [], ok: true });
        // Redirect to the draft review page after a short pause
        setTimeout(() => {
          const base = kind === 'icp'
            ? '/knowledge-base/client-insight/icps/drafts'
            : '/knowledge-base/client-insight/personas/drafts';
          router.push(`${base}/${draftId}`);
          onClose();
        }, 1200);
      }
    } catch {
      setParseResult({ errors: ['Network error — please try again'], warnings: [], ok: false });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  return (
    <>
      <div className={s.backdrop} onClick={onClose} />
      <aside className={s.drawer} role="dialog" aria-modal="true">
        {/* Header */}
        <div className={s.header}>
          <h2 className={s.title}>{config.title}</h2>
          <button className={s.closeBtn} onClick={onClose} aria-label="Close">×</button>
        </div>

        {/* Stage indicator */}
        <div className={s.stages}>
          {STAGE_LABELS.map((label, i) => {
            const num = (i + 1) as Stage;
            const isDone = stage > num;
            const isActive = stage === num;
            return (
              <div key={num} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : 'none' }}>
                <div className={[s.stageDot, isDone ? s.done : isActive ? s.active : ''].join(' ')}>
                  {isDone ? '✓' : num}
                </div>
                <span className={s.stageLabel}>{label}</span>
                {i < 2 && <div className={[s.stageLine, isDone ? s.done : ''].join(' ')} />}
              </div>
            );
          })}
        </div>

        {/* Body */}
        <div className={s.body}>
          {stage === 1 && (
            <>
              <p className={s.description}>{config.description}</p>
              {config.fields.map(field => (
                <div key={field.key} className={s.fieldGroup}>
                  <label className={s.label} htmlFor={field.key}>
                    {field.label}
                    {field.required && <span className={s.required}>*</span>}
                  </label>
                  {field.hint && <span className={s.hint}>{field.hint}</span>}
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.key}
                      className={s.textarea}
                      placeholder={field.placeholder}
                      value={values[field.key] ?? ''}
                      onChange={e => setValues(v => ({ ...v, [field.key]: e.target.value }))}
                    />
                  ) : field.type === 'select' ? (
                    <select
                      id={field.key}
                      className={s.select}
                      value={values[field.key] ?? ''}
                      onChange={e => setValues(v => ({ ...v, [field.key]: e.target.value }))}
                    >
                      <option value="">Select…</option>
                      {field.options?.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={field.key}
                      type="text"
                      className={s.input}
                      placeholder={field.placeholder}
                      value={values[field.key] ?? ''}
                      onChange={e => setValues(v => ({ ...v, [field.key]: e.target.value }))}
                    />
                  )}
                  {errors[field.key] && (
                    <span style={{ fontSize: 11, color: '#F43C34' }}>{errors[field.key]}</span>
                  )}
                </div>
              ))}
            </>
          )}

          {stage === 2 && (
            <>
              <p className={s.description}>
                <strong>Step 1</strong>: Copy or download the prompt below.
                Run it in <strong>Claude.ai</strong> (attach the template file for best results).
                <br /><br />
                <strong>Step 2</strong>: Save Claude&apos;s response as a <code>.md</code> file, then upload it here.
              </p>

              <div>
                <p className={s.label} style={{ marginBottom: 8 }}>Generated Prompt</p>
                <pre className={s.promptBox}>{generatedPrompt}</pre>
                <div className={s.promptActions} style={{ marginTop: 8 }}>
                  <button className={s.btnSecondary} onClick={handleCopyPrompt}>
                    {promptCopied ? '✓ Copied!' : 'Copy prompt'}
                  </button>
                  <button className={s.btnSecondary} onClick={handleDownloadPrompt}>
                    Download prompt (.txt)
                  </button>
                  <a
                    href={`/templates/${kind}-template.md`}
                    download
                    className={s.btnSecondary}
                    style={{ textDecoration: 'none', display: 'inline-block' }}
                  >
                    Download template (.md)
                  </a>
                </div>
              </div>

              <div>
                <p className={s.label} style={{ marginBottom: 8 }}>Upload Claude&apos;s Response</p>
                <label className={s.uploadArea}>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".md,.txt"
                    onChange={handleFileChange}
                    disabled={uploading}
                  />
                  <span className={s.uploadLabel}>
                    {uploading
                      ? 'Parsing…'
                      : (<>Drop <strong>.md</strong> or <strong>.txt</strong> file here, or click to browse</>)
                    }
                  </span>
                </label>
              </div>

              {parseResult && (
                <>
                  {parseResult.ok ? (
                    <div className={s.parseSuccess}>
                      ✓ Parsed successfully — redirecting to review page…
                      {parseResult.warnings.length > 0 && (
                        <>
                          <br /><strong>Warnings:</strong>
                          <ul className={s.messageList}>
                            {parseResult.warnings.map((w, i) => <li key={i}>{w}</li>)}
                          </ul>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className={s.parseError}>
                      <strong>Parse errors — please fix the markdown and re-upload:</strong>
                      <ul className={s.messageList}>
                        {parseResult.errors.map((e, i) => <li key={i}>{e}</li>)}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className={s.footer}>
          {stage === 1 && (
            <>
              <button className={s.btnGhost} onClick={onClose}>Cancel</button>
              <button
                className={s.btnPrimary}
                onClick={handleSubmitForm}
                disabled={submitting}
              >
                {submitting ? 'Generating…' : 'Generate prompt →'}
              </button>
            </>
          )}
          {stage === 2 && (
            <>
              <button className={s.btnGhost} onClick={() => setStage(1)}>← Back</button>
              <button className={s.btnGhost} onClick={onClose}>Done later</button>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
