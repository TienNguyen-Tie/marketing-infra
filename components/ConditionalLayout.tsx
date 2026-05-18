'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import type { Session } from 'next-auth';

export default function ConditionalLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const pathname = usePathname();

  const authPages = ['/login'];
  const isAuthPage = authPages.includes(pathname);

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="app-shell">
      <Sidebar session={session} />
      <main className="site-main">{children}</main>
    </div>
  );
}
