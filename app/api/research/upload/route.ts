import { issueSignedToken, presignUrl, parseStoreIdFromDelegationToken } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function GET(request: Request): Promise<NextResponse> {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');
  if (!filename) return NextResponse.json({ error: 'filename is required' }, { status: 400 });

  const pathname = `${Date.now()}-${filename}`;
  const validUntil = Date.now() + 5 * 60 * 1000;

  try {
    const issuedToken = await issueSignedToken({
      pathname,
      operations: ['put'],
      validUntil,
      allowedContentTypes: ['application/pdf'],
      maximumSizeInBytes: 50 * 1024 * 1024,
    });

    const { presignedUrl: signedPutUrl } = await presignUrl(issuedToken, {
      operation: 'put',
      pathname,
      access: 'public',
      allowedContentTypes: ['application/pdf'],
      maximumSizeInBytes: 50 * 1024 * 1024,
      addRandomSuffix: false,
      validUntil,
    });

    const storeId = parseStoreIdFromDelegationToken(issuedToken.delegationToken);
    const blobUrl = `https://${storeId}.public.blob.vercel-storage.com/${pathname}`;

    return NextResponse.json({ presignedUrl: signedPutUrl, blobUrl });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
