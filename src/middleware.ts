
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/login';
  const isAdminLoginPage = pathname === '/admin/login';

  // If trying to access admin routes without a session, redirect to admin login
  if (isAdminRoute && !isAdminLoginPage && !session) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If logged in, redirect away from login pages
  if (session) {
    if (isLoginPage) {
        return NextResponse.redirect(new URL('/user-dashboard', request.url)); // Or wherever user dashboard is
    }
    if (isAdminLoginPage) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login', '/admin/login'],
};
