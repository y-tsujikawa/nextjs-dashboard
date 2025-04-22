import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },

    async session({ session, token }) {
      if (session.user && token?.role) {
        session.user.role = token.role;
      }
      return session;
    },

    async jwt({ token, user }) {
      // サインイン時、userからroleを取得してtokenに追加
      if (user) {
        token.role = user.role ?? 'user';
      }
      return token;
    },
  },
  providers: [],
};
