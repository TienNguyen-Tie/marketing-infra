import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import type { Role } from '@/lib/generated/prisma/client';
import type { Session } from 'next-auth';

function isAdmin(session: Session | null): boolean {
  return session?.user?.role === 'ADMIN';
}

export const dynamic = 'force-dynamic';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!isAdmin(session)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { id } = await params;
  const body = await req.json();

  const updateData: { role?: Role; isActive?: boolean } = {};
  if (body.role !== undefined) updateData.role = body.role as Role;
  if (body.isActive !== undefined) {
    if (!body.isActive && session!.user.id === id)
      return NextResponse.json({ error: 'Cannot deactivate yourself' }, { status: 400 });
    updateData.isActive = body.isActive;
  }

  const user = await db.user.update({
    where: { id },
    data: updateData,
    select: { id: true, name: true, email: true, role: true, isActive: true },
  });
  return NextResponse.json(user);
}
