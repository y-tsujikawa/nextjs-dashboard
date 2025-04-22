import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';

const adminOnlyPaths = ['/dashboard/invoices', '/dashboard/customers'];
 
export async function middleware(request: NextRequest) {
  const session = await auth();
  const pathname = request.nextUrl.pathname;

  const role = session?.user?.role ?? 'user';

  if (
    adminOnlyPaths.some((adminPath) => pathname.startsWith(adminPath)) &&
    role !== 'admin'
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api/seed|api/auth|_next/static|_next/image|favicon.ico).*)'],
};
