import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import type { Session } from 'next-auth';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth() as Session | null;
  if ((session?.user as { role?: string } | undefined)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;
  const { status } = await req.json();

  const allowed = ['reviewed', 'implemented', 'dismissed'];
  if (!allowed.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  const updated = await db.suggestion.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json(updated);
}
