import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import type { Session } from 'next-auth';

export async function GET() {
  const session = await auth() as Session | null;
  if ((session?.user as { role?: string } | undefined)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const suggestions = await db.suggestion.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { id: true, name: true, email: true, role: true } },
    },
  });

  return NextResponse.json(suggestions);
}
