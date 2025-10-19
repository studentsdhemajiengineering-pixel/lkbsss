
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const { pathname } = request.nextUrl;

  // Paths related to admin area
  const isAdminRoute = pathname.startsWith('/admin');
  const isAdminLoginPage = pathname === '/admin/login';

  // If the user is trying to access an admin route
  if (isAdminRoute) {
    // If they are on the login page
    if (isAdminLoginPage) {
      // And they are already logged in, redirect them to the dashboard
      if (session) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      // Otherwise, let them see the login page
      return NextResponse.next();
    }

    // If they are on any other admin route and are NOT logged in, redirect to login
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // For all other routes, continue as normal
  return NextResponse.next();
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - images (static assets)
   * - favicon.ico (favicon file)
   */
  matcher: ['/((?!_next/static|_next/image|images|favicon.ico).*)'],
};
