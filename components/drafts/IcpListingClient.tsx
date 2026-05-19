'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { EntityDraft } from '@/lib/generated/prisma/client';
import CreateDraftSlider from './CreateDraftSlider';
import s from './ListingClient.module.css';

interface Props {
  children: React.ReactNode;      // the static ICP grid
  icpDrafts: EntityDraft[];
  addBtnClassName: string;
}

const DRAFT_STATUS_LABELS: Record<string, string> = {
  awaiting_upload: 'Awaiting Upload',
  in_review: 'In Review',
  approved: 'Approved',
  rejected: 'Rejected',
};

export default function IcpListingClient({ children, icpDrafts, addBtnClassName }: Props) {
  const [tab, setTab] = useState<'icps' | 'drafts'>('icps');
  const [sliderOpen, setSliderOpen] = useState(false);

  return (
    <>
      {/* Tab bar + Add button */}
      <div className={s.tabRow}>
        <div className={s.tabs}>
          <button
            className={`${s.tab} ${tab === 'icps' ? s.tabActive : ''}`}
            onClick={() => setTab('icps')}
          >
            ICPs
          </button>
          <button
            className={`${s.tab} ${tab === 'drafts' ? s.tabActive : ''}`}
            onClick={() => setTab('drafts')}
          >
            Drafts
            {icpDrafts.length > 0 && (
              <span className={s.tabBadge}>{icpDrafts.length}</span>
            )}
          </button>
        </div>
        <button
          className={addBtnClassName}
          style={{ cursor: 'pointer', color: '#F43C34', borderColor: '#F43C34' }}
          onClick={() => setSliderOpen(true)}
        >
          + New Draft
        </button>
      </div>

      {/* Tab content */}
      {tab === 'icps' ? (
        <>{children}</>
      ) : (
        <div className={s.draftList}>
          {icpDrafts.length === 0 ? (
            <div className={s.emptyDrafts}>
              <p className={s.emptyTitle}>No ICP drafts yet</p>
              <p className={s.emptyText}>
                Click &ldquo;New Draft&rdquo; to start the AI-assisted creation workflow.
              </p>
            </div>
          ) : (
            icpDrafts.map(draft => {
              const inputs = draft.seedInputs as Record<string, string>;
              return (
                <Link
                  key={draft.id}
                  href={`/knowledge-base/client-insight/icps/drafts/${draft.id}`}
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
                    {inputs.industry && <span>{inputs.industry}</span>}
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
        <CreateDraftSlider kind="icp" onClose={() => setSliderOpen(false)} />
      )}
    </>
  );
}
