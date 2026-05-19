'use client';

import { useState, useEffect } from 'react';
import s from './PublishSnippetModal.module.css';

interface Props {
  snippet: string;
  kind: 'icp' | 'persona';
  onClose: () => void;
}

export default function PublishSnippetModal({ snippet, kind, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  async function handleCopy() {
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    const blob = new Blob([snippet], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ecomobi-${kind}-snippet.ts`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const targetFile = kind === 'icp' ? 'data/icps/icps.ts' : 'data/personas/personas.ts';

  return (
    <>
      <div className={s.backdrop} onClick={onClose} />
      <div className={s.modal} role="dialog" aria-modal="true">
        <div className={s.header}>
          <h2 className={s.title}>TypeScript Snippet Ready</h2>
          <button className={s.closeBtn} onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className={s.body}>
          <p className={s.instructions}>
            Copy the snippet below and paste it into{' '}
            <code className={s.code}>{targetFile}</code>.{' '}
            It is a prose-first starting point — reshape to match the full typed interface,
            then remove this file from drafts.
          </p>

          <pre className={s.snippetBox}>{snippet}</pre>
        </div>

        <div className={s.footer}>
          <button className={s.btnSecondary} onClick={handleDownload}>
            Download .ts
          </button>
          <button className={s.btnPrimary} onClick={handleCopy}>
            {copied ? '✓ Copied!' : 'Copy snippet'}
          </button>
        </div>
      </div>
    </>
  );
}
