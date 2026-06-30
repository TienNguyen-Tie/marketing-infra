/* ─────────────────────────────────────────────────────────────────────────
   AUTHENTICATION IS DEACTIVATED.

   This project was cloned from another project together with its database/auth
   settings, so login could not work once deployed (no matching AUTH_SECRET /
   DATABASE_URL / seeded user on Vercel). Rather than gate the whole app behind a
   broken login, auth is stubbed out here: the app is OPEN and every request is
   treated as a fixed admin. No NextAuth runtime, database, or secret is involved,
   so it builds and runs anywhere with zero auth env vars.

   ⚠️  The deployed app is now PUBLICLY ACCESSIBLE. Before exposing anything
   sensitive, either turn on Vercel "Password Protection", or re-enable real auth.

   TO RE-ENABLE real auth later: restore this file, lib/auth.config.ts,
   middleware.ts and app/api/auth/[...nextauth]/route.ts from git history, then set
   AUTH_SECRET / NEXTAUTH_URL / DATABASE_URL on the host and seed an admin user.
   ───────────────────────────────────────────────────────────────────────── */

import type { Session } from 'next-auth';

const STUB_SESSION = {
  user: {
    id: 'local-admin',
    name: 'Admin',
    email: 'admin@majorisdigital.com',
    role: 'ADMIN',
  },
  expires: '2099-12-31T23:59:59.999Z',
} as unknown as Session;

/** Returns a fixed admin session — auth is deactivated, so callers always pass. */
export async function auth(): Promise<Session | null> {
  return STUB_SESSION;
}

/* No-ops so existing imports keep resolving while auth is off. */
export async function signIn(): Promise<void> {
  /* auth deactivated */
}
export async function signOut(): Promise<void> {
  /* auth deactivated */
}
