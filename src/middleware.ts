// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  console.log('🔥 middleware hit:', pathname)

  const token = request.cookies.get('firebaseAuthToken')?.value
  const protectedRoutes = ['/profile', '/builder', '/dashboard', '/auth/verified-success']
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtected && !token) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
    '/profile',
    '/profile/:path*',
    '/builder',
    '/builder/:path*',
    '/auth/verify-email',
    '/auth/verify-email/:path*',
    '/auth/verified-success',
    '/auth/verified-success/:path*', 
  ],
}