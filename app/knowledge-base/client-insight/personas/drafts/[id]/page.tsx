import { notFound } from 'next/navigation';
import { auth } from '@/lib/auth';
import { getDraft } from '@/lib/drafts/helpers';
import DraftReviewWrapper from '@/components/drafts/DraftReviewWrapper';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PersonaDraftReviewPage({ params }: Props) {
  const session = await auth();
  if (!session) notFound();

  const { id } = await params;
  const draft = await getDraft(id);
  if (!draft || draft.kind !== 'persona') notFound();

  return (
    <DraftReviewWrapper
      draft={draft}
      backHref="/knowledge-base/client-insight/personas"
      backLabel="Personas"
    />
  );
}
