import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { getAnthropicKey } from '@/lib/get-api-key';
import { VISION_SYSTEM_PROMPT } from '@/lib/vision-data';
import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { mode, message, contextTag } = await req.json();
  if (!mode || !message) {
    return NextResponse.json({ error: 'Mode and message required' }, { status: 400 });
  }

  let apiKey: string;
  try {
    apiKey = await getAnthropicKey();
  } catch {
    return NextResponse.json(
      { error: 'AI key not configured. Ask an admin to set it in Account Settings.' },
      { status: 503 }
    );
  }

  const client = new Anthropic({ apiKey });

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: VISION_SYSTEM_PROMPT,
      messages: [{
        role: 'user',
        content: `Mode: ${mode}${contextTag ? `\nContext: ${contextTag}` : ''}\n\n${message}`,
      }],
    });

    const aiText = response.content
      .filter((block) => block.type === 'text')
      .map((block) => (block as { type: 'text'; text: string }).text)
      .join('\n');

    const suggestion = await db.suggestion.create({
      data: {
        userId: session.user.id,
        mode,
        contextTag: contextTag || null,
        userPrompt: message,
        aiResponse: aiText,
      },
    });

    return NextResponse.json({ response: aiText, suggestionId: suggestion.id });
  } catch (err: unknown) {
    console.error('Vision Companion error:', err);
    const message = err instanceof Error ? err.message : 'AI request failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
