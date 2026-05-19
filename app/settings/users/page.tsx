import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import UsersClient from './UsersClient';
import styles from './users.module.css';

export default async function UsersPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const isAdmin = session.user.role === 'ADMIN';
  if (!isAdmin) {
    return (
      <div className={styles.denied}>
        <span className={`material-icons-round ${styles.deniedIcon}`}>lock</span>
        <p className={styles.deniedTitle}>Admin access required</p>
        <p className={styles.deniedDesc}>You need admin access to manage users.</p>
      </div>
    );
  }

  const users = await db.user.findMany({
    select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true },
    orderBy: { createdAt: 'asc' },
  });

  const currentUserId = (session.user as { id: string }).id;

  return (
    <UsersClient
      initialUsers={users.map(u => ({
        ...u,
        createdAt: u.createdAt.toISOString(),
      }))}
      currentUserId={currentUserId}
    />
  );
}
