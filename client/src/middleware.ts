import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/jwt';

// List of paths that require authentication
const protectedPaths = ['/dashboard', '/notes', '/profile'];

// List of public paths
const publicPaths = ['/', '/login', '/signup', '/forgot-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log('Middleware checking path:', pathname);
  
  // Get token from cookies
  const token = request.cookies.get('auth-token')?.value;
  
  // Check if the path requires authentication
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  const isPublicPath = publicPaths.some(path => pathname === path);
  
  // For debugging
  console.log(`Path: ${pathname}, Protected: ${isProtectedPath}, Public: ${isPublicPath}, Has token: ${!!token}`);
  
  // If it's a protected path and there's no token, redirect to login
  if (isProtectedPath && !token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(pathname));
    console.log('Redirecting to login, no token for protected path');
    return NextResponse.redirect(url);
  }
  
  // If it's a login/signup page and the user is authenticated, redirect to dashboard
  if (isPublicPath && token) {
    const isValid = verifyToken(token);
    if (isValid && (pathname === '/login' || pathname === '/signup')) {
      console.log('Redirecting authenticated user to dashboard');
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  
  // Continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
