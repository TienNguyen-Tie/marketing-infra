import { redirect } from 'next/navigation';

/* Authentication is deactivated (see lib/auth.ts). There is no login —
   anyone hitting /login is sent straight to the app. */
export default function LoginPage() {
  redirect('/');
}
