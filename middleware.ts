import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const session = req.cookies.get('session')?.value;
  const pathname = req.nextUrl.pathname;

  const isProtected = ['/watchlist', '/profile'].some((route) =>
    pathname.startsWith(route),
  );

  if (isProtected && !session) {
    const url = new URL('/sign-in', req.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/watchlist/:path*', '/profile/:path*'],
};
