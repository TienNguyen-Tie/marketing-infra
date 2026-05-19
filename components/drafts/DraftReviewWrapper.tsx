'use client';

import { useState } from 'react';
import type { EntityDraft } from '@/lib/generated/prisma/client';
import DraftReviewView from './DraftReviewView';
import PublishSnippetModal from './PublishSnippetModal';

interface Props {
  draft: EntityDraft;
  backHref: string;
  backLabel: string;
}

export default function DraftReviewWrapper({ draft, backHref, backLabel }: Props) {
  const [snippet, setSnippet] = useState<string | null>(
    draft.finalSnippet ?? null,
  );

  return (
    <>
      <DraftReviewView
        draft={draft}
        backHref={backHref}
        backLabel={backLabel}
        onPublishSuccess={s => setSnippet(s)}
      />
      {snippet && (
        <PublishSnippetModal
          snippet={snippet}
          kind={draft.kind as 'icp' | 'persona'}
          onClose={() => setSnippet(null)}
        />
      )}
    </>
  );
}
