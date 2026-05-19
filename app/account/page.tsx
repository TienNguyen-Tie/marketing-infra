import { auth, signOut } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AccountClient from './AccountClient';

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const isAdmin = session.user.role === 'ADMIN';

  return (
    <AccountClient
      userId={session.user.id!}
      initialName={session.user.name ?? ''}
      email={session.user.email ?? ''}
      role={session.user.role ?? 'VIEWER'}
      isAdmin={isAdmin}
    />
  );
}

export { signOut };
