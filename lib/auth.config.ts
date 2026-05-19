import type { NextAuthConfig } from 'next-auth';

// Local type mirrors the Prisma Role enum — kept here to avoid Prisma imports in edge-safe config
type Role = 'ADMIN' | 'EDITOR' | 'VIEWER';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isLoginPage = nextUrl.pathname === '/login';

      if (!isLoggedIn && !isLoginPage) {
        return Response.redirect(new URL('/login', nextUrl));
      }
      if (isLoggedIn && isLoginPage) {
        return Response.redirect(new URL('/', nextUrl));
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as Role | undefined;
      return session;
    },
  },
  providers: [],
  session: { strategy: 'jwt' },
};
