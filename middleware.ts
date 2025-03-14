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
    // Handle local testing domains
    if (hostname.endsWith('.landingkits.test')) {
      const subdomain = hostname.replace('.landingkits.test', '')
      if (subdomain !== 'www' && subdomain !== '') {
        const newUrl = new URL(`/${subdomain}${path === '/' ? '' : path}`, `http://localhost:3000`)
        console.log('Rewriting to:', newUrl.toString())
        return NextResponse.rewrite(newUrl)
      }
      return NextResponse.next()
    }

    // Root path
    if (path === '/') {
      return NextResponse.next()
    }
    
    // Handle tenant paths
    const tenant = path.split('/')[1]
    if (tenant && !['_next', 'api', 'static', 'favicon.ico'].includes(tenant)) {
      const newUrl = new URL(`/${tenant}${path.slice(tenant.length + 1) || '/'}`, request.url)
      console.log('Rewriting to:', newUrl.toString())
      return NextResponse.rewrite(newUrl)
    }
  } 
  // Production mode
  else {
    // Main domains
    const allowedDomains = ['landingkits.com', 'www.landingkits.com', 'landingkits.vercel.app']
    if (allowedDomains.includes(hostname)) {
      return NextResponse.next()
    }

    // Tenant subdomains
    const isVercelDomain = hostname.endsWith('.vercel.app')
    const isCustomDomain = hostname.endsWith('.landingkits.com')
    
    if (isVercelDomain || isCustomDomain) {
      const subdomain = hostname.split('.')[0]
      if (subdomain !== 'www') {
        const newUrl = new URL(`/${subdomain}${path === '/' ? '' : path}`, request.url)
        console.log('Rewriting to:', newUrl.toString())
        return NextResponse.rewrite(newUrl)
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)'
  ],
} 