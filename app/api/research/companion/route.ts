import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { getAnthropicKey } from '@/lib/get-api-key';
import { COMPANION_SYSTEM_PROMPT } from '@/lib/research/companion-prompt';
import Anthropic from '@anthropic-ai/sdk';
import { COMPANION_MODEL } from '@/lib/ai-models';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { question } = await req.json();
  if (!question?.trim()) {
    return NextResponse.json({ error: 'Question is required' }, { status: 400 });
  }

  let apiKey: string;
  try {
    apiKey = await getAnthropicKey();
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 422 });
  }

  const insights = await db.insight.findMany({
    include: { source: { select: { id: true, title: true, type: true } } },
    orderBy: { collectedDate: 'desc' },
  });

  if (insights.length === 0) {
    return NextResponse.json(
      { error: 'No insights in library yet. Add some research sources and extract insights first.' },
      { status: 422 }
    );
  }

  const library = insights.map(i => ({
    id: i.id,
    sourceId: i.source.id,
    sourceTitle: i.source.title,
    headline: i.headline,
    detail: i.detail,
    evidence: i.evidence ?? undefined,
    category: i.category,
    confidence: i.confidence,
    tags: i.tags,
    applicabilityPortfolios: i.applicabilityPortfolios,
    applicabilityBrands: i.applicabilityBrands,
    applicabilityIcps: i.applicabilityIcps,
  }));

  const anthropic = new Anthropic({ apiKey });

  const message = await anthropic.messages.create({
    model: COMPANION_MODEL,
    max_tokens: 2048,
    system: COMPANION_SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `INSIGHT LIBRARY (${insights.length} insights):\n${JSON.stringify(library)}\n\nQUESTION: ${question}`,
      },
    ],
  });

  const answer = message.content[0].type === 'text' ? message.content[0].text : '';

  // Parse [#id] citations from the answer
  const citedRaw = [...answer.matchAll(/\[#([a-z0-9]+)\]/g)].map(m => m[1]);
  const validIds = new Set(insights.map(i => i.id));
  const insightIdsReferenced = [...new Set(citedRaw.filter(id => validIds.has(id)))];

  const referencedInsights = insights.filter(i => insightIdsReferenced.includes(i.id));
  const sourceIdsReferenced = [...new Set(referencedInsights.map(i => i.source.id))];

  // Build citation map: insightId → sourceId (for client-side link rendering)
  const citationMap: Record<string, string> = {};
  referencedInsights.forEach(i => { citationMap[i.id] = i.source.id; });

  try {
    await db.researchQuery.create({
      data: {
        question,
        answer,
        insightIdsReferenced,
        insightsCount: insights.length,
        sourcesCount: sourceIdsReferenced.length,
        tokenUsageInput: message.usage.input_tokens,
        tokenUsageOutput: message.usage.output_tokens,
        userId: (session.user as { id?: string }).id ?? null,
      },
    });
  } catch {
    // Non-critical — don't fail the request if logging fails
  }

  return NextResponse.json({ answer, citationMap });
}
