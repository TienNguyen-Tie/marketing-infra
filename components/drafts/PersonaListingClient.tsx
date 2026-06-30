'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { EntityDraft } from '@/lib/generated/prisma/client';
import CreateDraftSlider from './CreateDraftSlider';
import s from './ListingClient.module.css';

interface Props {
  children: React.ReactNode;
  personaDrafts: EntityDraft[];
  addBtnClassName: string;
}

const DRAFT_STATUS_LABELS: Record<string, string> = {
  awaiting_upload: 'Awaiting Upload',
  in_review: 'In Review',
  approved: 'Approved',
  rejected: 'Rejected',
};

export default function PersonaListingClient({ children, personaDrafts, addBtnClassName }: Props) {
  const [tab, setTab] = useState<'personas' | 'drafts'>('personas');
  const [sliderOpen, setSliderOpen] = useState(false);

  return (
    <>
      {/* Tab bar + Add button */}
      <div className={s.tabRow}>
        <div className={s.tabs}>
          <button
            className={`${s.tab} ${tab === 'personas' ? s.tabActive : ''}`}
            onClick={() => setTab('personas')}
          >
            Personas
          </button>
          <button
            className={`${s.tab} ${tab === 'drafts' ? s.tabActive : ''}`}
            onClick={() => setTab('drafts')}
          >
            Drafts
            {personaDrafts.length > 0 && (
              <span className={s.tabBadge}>{personaDrafts.length}</span>
            )}
          </button>
        </div>
        <button
          className={addBtnClassName}
          style={{ cursor: 'pointer', color: '#D71920', borderColor: '#D71920' }}
          onClick={() => setSliderOpen(true)}
        >
          + New Draft
        </button>
      </div>

      {tab === 'personas' ? (
        <>{children}</>
      ) : (
        <div className={s.draftList}>
          {personaDrafts.length === 0 ? (
            <div className={s.emptyDrafts}>
              <p className={s.emptyTitle}>No persona drafts yet</p>
              <p className={s.emptyText}>
                Click &ldquo;New Draft&rdquo; to start the AI-assisted creation workflow.
              </p>
            </div>
          ) : (
            personaDrafts.map(draft => {
              const inputs = draft.seedInputs as Record<string, string>;
              return (
                <Link
                  key={draft.id}
                  href={`/knowledge-base/client-insight/personas/drafts/${draft.id}`}
                  className={s.draftCard}
                >
                  <div className={s.draftCardTop}>
                    <span className={s.draftName}>{inputs.name ?? 'Untitled'}</span>
                    <span className={`${s.draftStatus} ${s[`draftStatus--${draft.status}`]}`}>
                      {DRAFT_STATUS_LABELS[draft.status] ?? draft.status}
                    </span>
                  </div>
                  <p className={s.draftMeta}>
                    {inputs.shortCode && <span className={s.draftCode}>{inputs.shortCode}</span>}
                    {inputs.jobTitle && <span>{inputs.jobTitle}</span>}
                    {' · '}
                    <span>{new Date(draft.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                  </p>
                </Link>
              );
            })
          )}
        </div>
      )}

      {sliderOpen && (
        <CreateDraftSlider kind="persona" onClose={() => setSliderOpen(false)} />
      )}
    </>
  );
}
