import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const country = (request as NextRequest & { geo?: { country?: string } }).geo?.country || 'TR';

  const response = NextResponse.next();
  response.headers.set('x-language', (country === 'TR') ? 'tr' : 'en');
  
  if (request.nextUrl.pathname.startsWith('/')) {
    fetch(new URL('/api/discord/start', request.url), {
      method: 'GET',
    }).catch(() => {});
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
