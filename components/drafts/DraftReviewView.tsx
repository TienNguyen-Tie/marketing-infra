'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import s from './DraftReviewView.module.css';
import type { EntityDraft } from '@/lib/generated/prisma/client';
import type { ParsedDraft } from '@/lib/drafts/types';

interface Props {
  draft: EntityDraft;
  backHref: string;
  backLabel: string;
  onPublishSuccess?: (snippet: string) => void;
}

const STATUS_LABELS: Record<string, string> = {
  awaiting_upload: 'Awaiting Upload',
  in_review: 'In Review',
  approved: 'Approved',
  rejected: 'Rejected',
};

export default function DraftReviewView({ draft, backHref, backLabel, onPublishSuccess }: Props) {
  const router = useRouter();
  const [publishing, setPublishing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const parsed = draft.parsedDraft as unknown as ParsedDraft | null;
  const warnings = draft.parseWarnings as string[];
  const errors = draft.parseErrors as string[];

  async function handlePublish() {
    if (!confirm('Generate the TypeScript snippet? This marks the draft as approved.')) return;
    setPublishing(true);
    try {
      const res = await fetch(`/api/drafts/${draft.id}/publish`, { method: 'POST' });
      const data = await res.json() as { snippet?: string; error?: string };
      if (!res.ok || !data.snippet) {
        alert(data.error ?? 'Failed to publish');
        return;
      }
      onPublishSuccess?.(data.snippet);
      router.refresh();
    } catch {
      alert('Network error — please try again');
    } finally {
      setPublishing(false);
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this draft permanently? This cannot be undone.')) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/drafts/${draft.id}`, { method: 'DELETE' });
      if (!res.ok) {
        alert('Failed to delete draft');
        return;
      }
      router.push(backHref);
    } catch {
      alert('Network error');
    } finally {
      setDeleting(false);
    }
  }

  const kindLabel = draft.kind === 'icp' ? 'ICP Draft' : 'Persona Draft';
  const seedInputs = draft.seedInputs as Record<string, string>;

  return (
    <main className={s.page}>
      <Link href={backHref} className={s.back}>← {backLabel}</Link>

      <div className={s.hero}>
        <p className={s.heroKind}>{kindLabel}</p>
        <h1 className={s.heroName}>{seedInputs.name ?? 'Untitled draft'}</h1>
        <div className={s.heroPills}>
          <span className={`${s.pill} ${s[`pill--${draft.status}`]}`}>
            {STATUS_LABELS[draft.status] ?? draft.status}
          </span>
          <span style={{ fontSize: 12, color: '#999' }}>
            Created {new Date(draft.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className={s.warningBanner}>
          <strong>Parse warnings — review before publishing:</strong>
          <ul className={s.bannerList}>
            {warnings.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        </div>
      )}

      {/* Errors */}
      {errors.length > 0 && (
        <div className={s.errorBanner}>
          <strong>Parse errors:</strong>
          <ul className={s.bannerList}>
            {errors.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>
      )}

      {/* Seed inputs summary */}
      <div className={s.card}>
        <p className={s.cardHeading}>Seed Inputs</p>
        <div className={s.fmGrid}>
          {Object.entries(seedInputs).map(([k, v]) => (
            <><span key={`k-${k}`} className={s.fmKey}>{k}</span><span key={`v-${k}`} className={s.fmVal}>{v}</span></>
          ))}
        </div>
      </div>

      {/* Parsed content or awaiting state */}
      {!parsed ? (
        <div className={s.awaiting}>
          <p className={s.awaitingTitle}>Waiting for markdown upload</p>
          <p className={s.awaitingText}>
            Run the generated prompt in Claude.ai, then upload the response as a .md file
            from the ICP or Persona listing page.
          </p>
        </div>
      ) : (
        <>
          {/* Frontmatter */}
          <div className={s.card}>
            <p className={s.cardHeading}>Frontmatter</p>
            <div className={s.fmGrid}>
              {Object.entries(parsed.frontmatter).map(([k, v]) => (
                <><span key={`fk-${k}`} className={s.fmKey}>{k}</span><span key={`fv-${k}`} className={s.fmVal}>{String(v)}</span></>
              ))}
            </div>
          </div>

          {/* Sections */}
          {parsed.sections.map((section, i) => (
            <div key={i} className={s.card}>
              <p className={s.cardHeading}>{section.heading}</p>
              <div className={s.cardContent}>{section.content}</div>
            </div>
          ))}
        </>
      )}

      {/* Action bar */}
      <div className={s.actionBar}>
        {parsed && draft.status !== 'approved' && (
          <button className={s.btnPrimary} onClick={handlePublish} disabled={publishing}>
            {publishing ? 'Generating snippet…' : 'Generate TypeScript snippet →'}
          </button>
        )}
        {draft.finalSnippet && (
          <button
            className={s.btnSecondary}
            onClick={() => onPublishSuccess?.(draft.finalSnippet!)}
          >
            View snippet
          </button>
        )}
        <button className={s.btnDanger} onClick={handleDelete} disabled={deleting}>
          {deleting ? 'Deleting…' : 'Delete draft'}
        </button>
      </div>
    </main>
  );
}
