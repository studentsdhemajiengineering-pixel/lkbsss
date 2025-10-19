
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith('/admin');
  const isUserLoginPage = pathname === '/login';
  const isAdminLoginPage = pathname === '/admin/login';
  const isAdminRoot = pathname === '/admin' || pathname === '/admin/';


  // If trying to access any admin route (except login) without a session, redirect to admin login
  if (isAdminRoute && !isAdminLoginPage && !session) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If a logged-in admin tries to access the admin login page, redirect to the dashboard
  if (session && isAdminLoginPage) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }
  
  // If a logged-in user (non-admin could be added here) tries to access user login, redirect them
  if (session && isUserLoginPage) {
    return NextResponse.redirect(new URL('/user-dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
