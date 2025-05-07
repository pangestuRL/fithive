import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('accessToken')?.value;
  const role = request.cookies.get('userRole')?.value;

  const { pathname } = request.nextUrl;

  const publicPaths = ['/', '/unauthorized'];
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  if (!pathname.startsWith('/admin') && role === 'admin' && pathname !== '/logout') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/dashboard/:path*', '/activities/:path*'], // tambahkan path yang ingin diproteksi
  };
