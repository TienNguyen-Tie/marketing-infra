import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export const maxDuration = 60;

export async function POST(request: Request): Promise<NextResponse> {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');
  if (!filename) return NextResponse.json({ error: 'filename is required' }, { status: 400 });

  if (!request.body) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

  const blob = await put(filename, request.body, {
    access: 'public',
    contentType: 'application/pdf',
  });

  return NextResponse.json({ url: blob.url });
}
