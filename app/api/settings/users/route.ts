import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import type { Role } from '@/lib/generated/prisma/client';
import type { Session } from 'next-auth';

function isAdmin(session: Session | null): boolean {
  return session?.user?.role === 'ADMIN';
}

export async function GET() {
  const session = await auth();
  if (!isAdmin(session)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const users = await db.user.findMany({
    select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true },
    orderBy: { createdAt: 'asc' },
  });
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!isAdmin(session)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { name, email, role } = await req.json();
  if (!name || !email || !role)
    return NextResponse.json({ error: 'name, email, and role are required' }, { status: 400 });

  const existing = await db.user.findUnique({ where: { email } });
  if (existing)
    return NextResponse.json({ error: 'Email already in use' }, { status: 409 });

  const password = await bcrypt.hash('changeme123', 12);
  const user = await db.user.create({
    data: { name, email, password, role: role as Role },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });
  return NextResponse.json({ user, temporaryPassword: 'changeme123' }, { status: 201 });
}
