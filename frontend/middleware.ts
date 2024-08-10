import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const protectedPaths = ['/', '/dashboard']
  if (protectedPaths.includes(pathname)) {
    const token = request.cookies.get('sid')
    if (!token && pathname !== '/login') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico).*)'],
}
