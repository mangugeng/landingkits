import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const hostname = request.headers.get('host') || ''
  
  // Mendukung localhost
  if (hostname.includes('localhost')) {
    return NextResponse.next()
  }

  // Mendukung domain development (*.landingkits.test)
  if (hostname.endsWith('landingkits.test:3000')) {
    // Jika mengakses domain utama landingkits.test
    if (hostname === 'landingkits.test:3000') {
      return NextResponse.next()
    }

    // Jika mengakses subdomain (tenant)
    const subdomain = hostname.split('.')[0]
    if (subdomain) {
      url.pathname = `/${subdomain}${url.pathname}`
      return NextResponse.rewrite(url)
    }
  }

  // Mendukung domain production (*.landingkits.com)
  if (hostname.endsWith('landingkits.com')) {
    // Jika mengakses domain utama landingkits.com
    if (hostname === 'landingkits.com' || hostname === 'www.landingkits.com') {
      return NextResponse.next()
    }

    // Jika mengakses subdomain (tenant)
    const subdomain = hostname.split('.')[0]
    if (subdomain) {
      url.pathname = `/${subdomain}${url.pathname}`
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
} 