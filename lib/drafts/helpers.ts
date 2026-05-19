import { db } from '@/lib/db';
import type { EntityDraft } from '@/lib/generated/prisma/client';
import { Prisma } from '@/lib/generated/prisma/client';

export async function createDraft(data: {
  kind: string;
  seedInputs: Record<string, unknown>;
  generatedPrompt: string;
  createdBy?: string;
}): Promise<EntityDraft> {
  return db.entityDraft.create({
    data: {
      kind: data.kind,
      status: 'awaiting_upload',
      seedInputs: data.seedInputs as unknown as Prisma.InputJsonValue,
      generatedPrompt: data.generatedPrompt,
      createdBy: data.createdBy ?? null,
    },
  });
}

export async function getDraft(id: string): Promise<EntityDraft | null> {
  return db.entityDraft.findUnique({ where: { id } });
}

export async function getDraftsForKind(kind: string): Promise<EntityDraft[]> {
  return db.entityDraft.findMany({
    where: { kind },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getAllDrafts(): Promise<EntityDraft[]> {
  return db.entityDraft.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function patchDraft(
  id: string,
  data: Partial<{
    status: string;
    uploadedMarkdown: string;
    parsedDraft: Record<string, unknown>;
    parseWarnings: string[];
    parseErrors: string[];
    edits: Record<string, unknown>;
    finalSnippet: string;
    publishedAt: Date;
    parsedDraftNull: true;
  }>,
): Promise<EntityDraft> {
  const updateData: Prisma.EntityDraftUpdateInput = {};
  if (data.status !== undefined) updateData.status = data.status;
  if (data.uploadedMarkdown !== undefined) updateData.uploadedMarkdown = data.uploadedMarkdown;
  if (data.parsedDraft !== undefined) {
    updateData.parsedDraft = data.parsedDraft as unknown as Prisma.InputJsonValue;
  }
  if (data.parseWarnings !== undefined) updateData.parseWarnings = data.parseWarnings;
  if (data.parseErrors !== undefined) updateData.parseErrors = data.parseErrors;
  if (data.edits !== undefined) {
    updateData.edits = data.edits as unknown as Prisma.InputJsonValue;
  }
  if (data.finalSnippet !== undefined) updateData.finalSnippet = data.finalSnippet;
  if (data.publishedAt !== undefined) updateData.publishedAt = data.publishedAt;

  return db.entityDraft.update({ where: { id }, data: updateData });
}

export async function clearParsedDraft(id: string): Promise<EntityDraft> {
  return db.entityDraft.update({
    where: { id },
    data: { parsedDraft: Prisma.JsonNull },
  });
}

export async function deleteDraft(id: string): Promise<void> {
  await db.entityDraft.delete({ where: { id } });
}
