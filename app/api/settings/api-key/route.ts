import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { encrypt, maskApiKey } from '@/lib/encryption';
import { NextResponse } from 'next/server';
import type { Session } from 'next-auth';

function isAdmin(session: Session | null): boolean {
  return session?.user?.role === 'ADMIN';
}

export async function GET() {
  const session = await auth();
  if (!isAdmin(session)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const settings = await db.appSettings.findUnique({ where: { id: 'singleton' } });
  return NextResponse.json({
    hasKey: !!settings?.anthropicKeyEnc,
    maskedKey: settings?.anthropicKeyEnc ? '••••••••••••••••••••••••' : null,
  });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!isAdmin(session)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { key } = await req.json();
  if (!key || !key.startsWith('sk-ant-'))
    return NextResponse.json({ error: 'Invalid key format. Must start with sk-ant-' }, { status: 400 });

  const { encrypted, iv, tag } = encrypt(key);
  await db.appSettings.upsert({
    where: { id: 'singleton' },
    create: {
      id: 'singleton',
      anthropicKeyEnc: encrypted,
      anthropicKeyIv: iv,
      anthropicKeyTag: tag,
      updatedBy: session!.user?.email ?? 'unknown',
    },
    update: {
      anthropicKeyEnc: encrypted,
      anthropicKeyIv: iv,
      anthropicKeyTag: tag,
      updatedBy: session!.user?.email ?? 'unknown',
    },
  });
  return NextResponse.json({ success: true, maskedKey: maskApiKey(key) });
}

export async function DELETE() {
  const session = await auth();
  if (!isAdmin(session)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  await db.appSettings.upsert({
    where: { id: 'singleton' },
    create: { id: 'singleton' },
    update: { anthropicKeyEnc: null, anthropicKeyIv: null, anthropicKeyTag: null },
  });
  return NextResponse.json({ success: true });
}
