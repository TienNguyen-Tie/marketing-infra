'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { VISION_MODES } from '@/lib/vision-data';
import styles from './VisionCompanion.module.css';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  suggestionId?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  initialMode?: string | null;
  initialContext?: string;
};

export default function VisionCompanion({ open, onClose, initialMode, initialContext }: Props) {
  const [mode, setMode] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Set initial mode when slider opens
  useEffect(() => {
    if (open && initialMode) {
      setMode(initialMode);
    }
  }, [open, initialMode]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // ESC to close
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

  const currentMode = VISION_MODES.find(m => m.id === mode);

  async function send() {
    if (!mode || !input.trim() || isLoading) return;
    const text = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/vision-companion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, message: text, contextTag: initialContext || null }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response,
        suggestionId: data.suggestionId,
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
    // Auto-resize
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${open ? styles.backdropOpen : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Vision Companion"
      >
        {/* Header */}
        <div className={styles.header}>
          <div>
            <p className={styles.headerEyebrow}>AI Vision Companion</p>
            <h2 className={styles.headerTitle}>Brainstorm with the vision</h2>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <span className="material-icons-round" style={{ fontSize: 18 }}>close</span>
          </button>
        </div>

        {/* Mode selector */}
        <div className={styles.modePanel}>
          <p className={styles.modePanelLabel}>PICK A MODE</p>
          <div className={styles.modeGrid}>
            {VISION_MODES.map(m => (
              <button
                key={m.id}
                className={`${styles.modeBtn} ${mode === m.id ? styles.modeBtnActive : ''}`}
                onClick={() => setMode(m.id)}
              >
                <span className="material-icons-round" style={{ fontSize: 14 }}>{m.icon}</span>
                <span className={styles.modeBtnLabel}>{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Conversation */}
        <div className={styles.conversation}>
          {messages.length === 0 && !isLoading && (
            <div className={styles.emptyState}>
              <span className="material-icons-round" style={{ fontSize: 48, color: '#D3D3D3' }}>
                chat_bubble_outline
              </span>
              <p className={styles.emptyText}>
                Pick a mode above to start. Every conversation is grounded in the locked vision context.
              </p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i}>
              {msg.role === 'user' ? (
                <div className={styles.userMsg}>{msg.content}</div>
              ) : (
                <div>
                  <div className={styles.aiMsg}>{msg.content}</div>
                  <div className={styles.loggedNote}>
                    <span className="material-icons-round" style={{ fontSize: 11, color: '#10B981' }}>check</span>
                    <span className={styles.loggedText}>Logged as suggestion for the team</span>
                  </div>
                </div>
              )}
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

          <div ref={messagesEndRef} />
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
              placeholder={mode ? currentMode?.placeholder : 'Pick a mode above to start...'}
              disabled={!mode || isLoading}
              rows={1}
            />
            <button
              className={styles.sendBtn}
              onClick={send}
              disabled={!mode || !input.trim() || isLoading}
              aria-label="Send"
            >
              <span className="material-icons-round" style={{ fontSize: 16 }}>send</span>
            </button>
          </div>
          <p className={styles.inputFooter}>Every exchange is logged for the marketing team to review.</p>
        </div>
      </div>
    </>
  );
}
