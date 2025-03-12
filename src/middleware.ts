import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Fungsi untuk mengecek apakah subdomain valid
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
    const subdomain = hostname.split('.')[0];
    const isSubdomainRequest = hostname.includes('landingkits.com') && subdomain !== 'www' && subdomain !== 'landingkits';

    // Jika request ke subdomain
    if (isSubdomainRequest) {
      console.log('🌐 Subdomain detected:', subdomain);

      // Jika sudah di path _sites, skip
      if (url.pathname.startsWith('/_sites')) {
        return NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });
      }

      // Cek apakah subdomain valid (ada di database dan published)
      const isValid = await isValidSubdomain(subdomain);
      if (!isValid) {
        console.log('❌ Invalid subdomain:', subdomain);
        return NextResponse.redirect(new URL('https://landingkits.com'));
      }

      // Rewrite ke halaman template
      const templateUrl = new URL(`/_sites/${subdomain}${url.pathname}`, url);
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
    // Jika terjadi error, arahkan ke halaman login dengan parameter noLoop
    const redirectUrl = new URL('/login', req.url);
    redirectUrl.searchParams.set('noLoop', 'true');
    return NextResponse.redirect(redirectUrl);
  }
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
}; 