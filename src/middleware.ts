import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  try {
    // Handle subdomain routing
    const hostname = req.headers.get('host') || '';
    const isProd = process.env.NODE_ENV === 'production';
    const mainDomain = isProd ? 'landingkits.com' : 'localhost:3001';

    // Jika bukan domain utama dan bukan www, berarti ini subdomain
    if (hostname !== mainDomain && !hostname.startsWith('www.')) {
      // Extract subdomain (remove port if in development)
      const subdomain = hostname.split('.')[0].split(':')[0];
      
      if (subdomain !== 'www' && subdomain !== 'admin') {
        // Rewrite URL untuk menangani subdomain
        const url = req.nextUrl.clone();
        url.pathname = `/${subdomain}${url.pathname}`;
        return NextResponse.rewrite(url);
      }
    }

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return req.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            res.cookies.set({
              name,
              value,
              ...options,
            });
          },
          remove(name: string, options: CookieOptions) {
            res.cookies.set({
              name,
              value: '',
              ...options,
            });
          },
        },
      }
    );

    // Bypass auth check for login page
    if (req.nextUrl.pathname === '/admin/login') {
      return res;
    }

    // Check auth for admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        console.log('No session found, redirecting to login');
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = '/admin/login';
        return NextResponse.redirect(redirectUrl);
      }

      // Get user data
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        console.log('No user found, redirecting to login');
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = '/admin/login';
        return NextResponse.redirect(redirectUrl);
      }

      // Check role for admin routes
      const role = user.user_metadata?.role;
      console.log('Checking role:', role);

      if (role !== 'super_admin' && role !== 'admin') {
        console.log('Invalid role, redirecting to login');
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = '/admin/login';
        return NextResponse.redirect(redirectUrl);
      }
    }

    return res;
  } catch (error) {
    console.error('Middleware error:', error);
    return res;
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 