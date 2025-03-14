import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const hostname = request.headers.get('host') || ''
  const path = url.pathname
  
  // Debug logging
  console.log('Request:', {
    hostname,
    path,
    isDev: process.env.NODE_ENV === 'development',
    url: url.toString()
  })

  // Development mode
  if (process.env.NODE_ENV === 'development') {
    // Root path
    if (path === '/') {
      return NextResponse.next()
    }
    
    // Handle tenant paths
    const tenant = path.split('/')[1]
    if (tenant && !['_next', 'api', 'static'].includes(tenant)) {
      const newUrl = new URL(`/[tenant]${path.slice(tenant.length + 1) || '/'}`, request.url)
      console.log('Rewriting to:', newUrl.toString())
      return NextResponse.rewrite(newUrl)
    }
  } 
  // Production mode
  else {
    // Main domain
    if (hostname === 'landingkits.com' || hostname === 'www.landingkits.com') {
      return NextResponse.next()
    }

    // Tenant subdomains
    const subdomain = hostname.split('.')[0]
    if (subdomain !== 'www') {
      const newUrl = new URL(`/[tenant]${path}`, request.url)
      console.log('Rewriting to:', newUrl.toString())
      return NextResponse.rewrite(newUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next|static|.*\\..*|_vercel|[\\w-]+\\.\\w+).*)'
  ],
} 