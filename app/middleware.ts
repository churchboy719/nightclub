import { getToken } from 'next-auth/jwt';
import { NextResponse, NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // If no token, redirect to login for protected routes
  if (!token && (pathname.startsWith('/admin') || pathname.startsWith('/cashier'))) {
    return NextResponse.redirect(new URL('/auth/adminsignin', req.url));
  }

  // Protect admin routes: Allow access only to admins
  if (pathname.startsWith('/admin') && token?.role !== 'Admin') {
    return NextResponse.redirect(new URL('/unauthorize', req.url));
  }

  // Protect cashier routes: Allow access only to cashiers
  if (pathname.startsWith('/cashier') && token?.role !== 'Cashier') {
    return NextResponse.redirect(new URL('/unauthorize', req.url));
  }

  // Allow requests to proceed for other routes
  return NextResponse.next();
}

// Configure which routes this middleware applies to
export const config = {
  matcher: ['/admin/:path*', '/cashier/:path*'], // Protect /admin and /cashier routes
};
