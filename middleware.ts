import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const hostname = request.headers.get('host') || ''
  
  // Untuk development environment
  const isDev = process.env.NODE_ENV === 'development'
  
  // Mendapatkan tenant dari hostname
  let tenant: string | null = null
  
  if (isDev) {
    // Di development, kita menggunakan path untuk tenant
    // contoh: localhost:3000/tenant-name
    tenant = url.pathname.split('/')[1]
  } else {
    // Di production, kita menggunakan subdomain
    // contoh: tenant-name.landingkits.com
    tenant = hostname.replace('.landingkits.com', '')
  }

  // Jika mengakses root domain
  if (hostname === 'landingkits.com' || 
      (isDev && hostname === 'localhost:3000' && url.pathname === '/')) {
    return NextResponse.next()
  }

  // Jika ada tenant, arahkan ke halaman tenant
  if (tenant) {
    // Hapus tenant dari pathname jika di development
    const pathname = isDev ? url.pathname.replace(`/${tenant}`, '') || '/' : url.pathname
    
    return NextResponse.rewrite(
      new URL(`/${tenant}${pathname}`, request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|static|[\\w-]+\\.\\w+).*)',
  ],
} 