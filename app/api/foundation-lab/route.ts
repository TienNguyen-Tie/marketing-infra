import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getAnthropicKey } from '@/lib/get-api-key';
import { SUGGESTION_MODEL } from '@/lib/ai-models';
import type { BrandLayer } from '@/app/knowledge-base/brand-system/brand-foundation/foundation-data';

interface RequestBody {
  mode: 'adapt' | 'translate' | 'rewrite';
  sourceAudience: string;
  sourceMarket?: string;
  targetAudience: string;
  targetMarket?: string;
  targetLabel: string;       // human-readable e.g. "Creator overarching" or "Brand × VN"
  userPrompt?: string;
  activeTokenIds: string[];
  sourceLayers: BrandLayer[];
  activeTokenValues: string[];
}

interface GeneratedLayer {
  id: string;
  layerNumber: string;
  layerName: string;
  title: string;
  body: string;
  diffState: 'unchanged' | 'modified' | 'added';
}

interface ApiResponse {
  layers: GeneratedLayer[];
  overallReasoning: string;
  warnings: string[];
}

const MODE_INSTRUCTIONS: Record<string, string> = {
  adapt: 'Adapt the brand foundation for the target audience/market. Keep the strategic core intact; only adjust tone, cultural references, and channel-specific language.',
  translate: 'Translate the brand foundation to resonate with the target market\'s cultural context. Vocabulary, idioms, and proof points should feel locally native while preserving strategic intent.',
  rewrite: 'Rewrite the brand foundation from scratch for the target audience/market. Use the source as strategic reference only — generate fresh language that fits the new context optimally.',
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: RequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const {
    mode,
    targetLabel,
    userPrompt,
    sourceLayers,
    activeTokenValues,
  } = body;

  const sourceLayerText = sourceLayers
    .map(
      (l) =>
        `Layer ${l.layerNumber} — ${l.layerName}:\nTitle: ${l.title}\nBody: ${l.body}`,
    )
    .join('\n\n');

  const tokenContext =
    activeTokenValues.length > 0
      ? `\n\nActive context signals:\n${activeTokenValues.map((v) => `- ${v}`).join('\n')}`
      : '';

  const systemPrompt = `You are a brand strategist at VinaCapital — Southeast Asia's full-stack creator commerce platform.

Your task is to ${MODE_INSTRUCTIONS[mode] ?? MODE_INSTRUCTIONS.adapt}

Source variant: Brand overarching (locked)
Target variant: ${targetLabel}
${tokenContext}

SOURCE LAYERS:
${sourceLayerText}
${userPrompt ? `\nAdditional instruction from user: ${userPrompt}` : ''}

Return ONLY valid JSON in this exact shape — no markdown, no explanation outside the JSON:
{
  "layers": [
    {
      "id": "<source layer id>",
      "layerNumber": "<01–04>",
      "layerName": "<layer name>",
      "title": "<generated title>",
      "body": "<generated body>",
      "diffState": "unchanged" | "modified" | "added"
    }
  ],
  "overallReasoning": "<2–3 sentences explaining the strategic choices made>",
  "warnings": ["<optional warning if a layer couldn't be adapted faithfully>"]
}

Rules:
- Keep layerNumber and layerName identical to the source.
- Set diffState to "unchanged" only if the text is verbatim identical to the source.
- Set diffState to "modified" if you changed the text.
- warnings array may be empty [].
- Be precise and concise — titles ≤15 words, bodies ≤40 words.`;

  let apiKey: string;
  try {
    apiKey = await getAnthropicKey();
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 503 });
  }

  const client = new Anthropic({ apiKey });

  let raw = '';
  try {
    const message = await client.messages.create({
      model: SUGGESTION_MODEL,
      max_tokens: 2000,
      messages: [{ role: 'user', content: 'Generate the brand foundation variant now.' }],
      system: systemPrompt,
    });

    const textBlock = message.content.find((b) => b.type === 'text');
    raw = textBlock?.type === 'text' ? textBlock.text : '';

    // Strip markdown fences if present
    const jsonText = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
    const parsed: ApiResponse = JSON.parse(jsonText);

    return NextResponse.json(parsed);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message, raw }, { status: 502 });
  }
}
