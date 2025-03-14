import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const hostname = request.headers.get('host') || ''
  const isLocalhost = hostname.includes('localhost')
  
  // Jika mengakses melalui localhost, biarkan default routing
  if (isLocalhost) {
    return NextResponse.next()
  }

  // Jika mengakses domain utama landingkits.test
  if (hostname === 'landingkits.test:3000') {
    return NextResponse.next()
  }

  // Jika mengakses subdomain (tenant)
  const subdomain = hostname.split('.')[0]
  if (subdomain && hostname.includes('landingkits.test:3000')) {
    url.pathname = `/${subdomain}${url.pathname}`
    return NextResponse.rewrite(url)
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