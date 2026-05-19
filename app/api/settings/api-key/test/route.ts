import { auth } from '@/lib/auth';
import { getAnthropicKey } from '@/lib/get-api-key';
import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

export async function POST() {
  const session = await auth();
  if (!session?.user || session.user.role !== 'ADMIN')
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const apiKey = await getAnthropicKey();
    const client = new Anthropic({ apiKey });
    await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1,
      messages: [{ role: 'user', content: 'ping' }],
    });
    return NextResponse.json({ success: true, message: 'Connection verified' });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: msg }, { status: 502 });
  }
}
