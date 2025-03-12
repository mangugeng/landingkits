import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase';

async function isValidSubdomain(subdomain: string): Promise<boolean> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('templates')
      .select('id, status')
      .eq('subdomain', subdomain)
      .single();

    if (error) {
      console.error('Error checking subdomain:', error);
      return false;
    }

    return data && data.status === 'published';
  } catch (error) {
    console.error('Error in isValidSubdomain:', error);
    return false;
  }
}

export async function middleware(req: NextRequest) {
  console.log('🔒 Middleware running for path:', req.nextUrl.pathname);
  
  // Clone the request headers
  const requestHeaders = new Headers(req.headers);
  
  try {
    // Handle subdomains
    const url = req.nextUrl;
    const hostname = req.headers.get('host') || '';
    console.log('🌐 Hostname:', hostname);

    // Jika mengakses langsung ke _sites, redirect ke homepage
    if (url.pathname.startsWith('/_sites')) {
      console.log('⚠️ Direct access to _sites, redirecting to homepage');
      return NextResponse.redirect(new URL('https://landingkits.com'));
    }

    // Check if it's a subdomain request
    const subdomain = hostname.split('.')[0];
    const isSubdomainRequest = hostname.includes('landingkits.com') && subdomain !== 'www' && subdomain !== 'landingkits';

    // Jika request ke subdomain
    if (isSubdomainRequest) {
      console.log('🌐 Subdomain detected:', subdomain);

      // Cek apakah subdomain valid (ada di database dan published)
      const isValid = await isValidSubdomain(subdomain);
      if (!isValid) {
        console.log('❌ Invalid subdomain:', subdomain);
        return NextResponse.redirect(new URL('https://landingkits.com'));
      }

      // Rewrite ke halaman template
      const templateUrl = new URL(`/_sites/${subdomain}${url.pathname}`, req.url);
      console.log('🔄 Rewriting to:', templateUrl.toString());
      return NextResponse.rewrite(templateUrl);
    }

    // Jika ada parameter noLoop, skip middleware
    if (req.nextUrl.searchParams.has('noLoop')) {
      console.log('🔄 Skipping middleware due to noLoop parameter');
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    const res = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    const supabase = createMiddlewareClient({ req, res });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    console.log('🔑 Session status:', session ? 'Found' : 'Not found');
    console.log('🍪 Cookies:', req.cookies.getAll());

    // Jika user tidak login dan mencoba mengakses halaman yang dilindungi
    if (!session && (req.nextUrl.pathname.startsWith('/dashboard') || req.nextUrl.pathname.startsWith('/editor'))) {
      console.log('🚫 Access denied: No session found, redirecting to login');
      const redirectUrl = new URL('/login', req.url);
      redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname);
      redirectUrl.searchParams.set('noLoop', 'true');
      return NextResponse.redirect(redirectUrl);
    }

    // Jika user sudah login dan mencoba mengakses halaman login/register
    if (session && (req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register'))) {
      console.log('✅ User already logged in, redirecting to dashboard');
      const redirectUrl = new URL('/dashboard', req.url);
      redirectUrl.searchParams.set('noLoop', 'true');
      return NextResponse.redirect(redirectUrl);
    }

    // Tambahkan header untuk mencegah caching
    res.headers.set('Cache-Control', 'no-store, max-age=0');
    res.headers.set('Pragma', 'no-cache');
    res.headers.set('Expires', '0');

    return res;
  } catch (error) {
    console.error('❌ Middleware error:', error);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 