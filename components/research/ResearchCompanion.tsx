'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import styles from './ResearchCompanion.module.css';

type Exchange = {
  question: string;
  answer: string;
  citationMap: Record<string, string>;
};

type Props = {
  open: boolean;
  onClose: () => void;
};

function renderAnswer(text: string, citationMap: Record<string, string>) {
  const parts = text.split(/(\[#[a-z0-9]+\])/g);
  return parts.map((part, i) => {
    const match = part.match(/^\[#([a-z0-9]+)\]$/);
    if (match) {
      const insightId = match[1];
      const sourceId = citationMap[insightId];
      if (sourceId) {
        return (
          <Link
            key={i}
            href={`/knowledge-base/research/sources/${sourceId}`}
            className={styles.citation}
            target="_blank"
            rel="noreferrer"
          >
            [{insightId.slice(0, 6)}]
          </Link>
        );
      }
      return <span key={i} className={styles.citation}>{part}</span>;
    }
    return <span key={i}>{part}</span>;
  });
}

export default function ResearchCompanion({ open, onClose }: Props) {
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [exchanges, isLoading]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [open, handleKeyDown]);

  async function send() {
    const question = input.trim();
    if (!question || isLoading) return;
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/research/companion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');
      setExchanges(prev => [...prev, {
        question,
        answer: data.answer,
        citationMap: data.citationMap ?? {},
      }]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  function handleTextareaKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  function handleTextareaInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  }

  return (
    <>
      <div
        className={`${styles.backdrop} ${open ? styles.backdropOpen : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Research Companion"
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <p className={styles.headerEyebrow}>AI Research Companion</p>
            <h2 className={styles.headerTitle}>Ask the insight library</h2>
            <p className={styles.headerMeta}>Each question is answered independently from the full library.</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <span className="material-icons-round" style={{ fontSize: 18 }}>close</span>
          </button>
        </div>

        {/* Conversation */}
        <div className={styles.conversation}>
          {exchanges.length === 0 && !isLoading && (
            <div className={styles.emptyState}>
              <span className="material-icons-round" style={{ fontSize: 48, color: '#D3D3D3' }}>
                query_stats
              </span>
              <p className={styles.emptyText}>
                Ask anything about your research library. Answers are grounded in your insights and cite their sources.
              </p>
            </div>
          )}

          {exchanges.map((ex, i) => (
            <div key={i} className={styles.exchange}>
              <div className={styles.userMsg}>{ex.question}</div>
              <div className={styles.aiMsgWrap}>
                <div className={styles.aiMsg}>
                  {renderAnswer(ex.answer, ex.citationMap)}
                </div>
                <div className={styles.loggedNote}>
                  <span className="material-icons-round" style={{ fontSize: 11, color: '#10B981' }}>check</span>
                  <span className={styles.loggedText}>Logged to Research Queries</span>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className={styles.loadingBubble}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
          )}

          {error && (
            <div className={styles.errorBanner}>
              <span className={styles.errorText}>{error}</span>
              <button className={styles.errorDismiss} onClick={() => setError(null)}>×</button>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className={styles.inputArea}>
          <div className={styles.inputRow}>
            <textarea
              ref={inputRef}
              className={styles.textarea}
              value={input}
              onChange={handleTextareaInput}
              onKeyDown={handleTextareaKeyDown}
              placeholder="What do our insights say about beauty consumers in VN?"
              disabled={isLoading}
              rows={1}
            />
            <button
              className={styles.sendBtn}
              onClick={send}
              disabled={!input.trim() || isLoading}
              aria-label="Send"
            >
              <span className="material-icons-round" style={{ fontSize: 16 }}>send</span>
            </button>
          </div>
          <p className={styles.inputFooter}>All queries are logged for the team to review.</p>
        </div>
      </div>
    </>
  );
}
