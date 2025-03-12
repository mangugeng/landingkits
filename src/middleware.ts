import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  console.log('🔒 Middleware running for path:', req.nextUrl.pathname);
  
  const res = NextResponse.next();
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
    return NextResponse.redirect(redirectUrl);
  }

  // Jika user sudah login dan mencoba mengakses halaman login/register
  if (session && (req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register'))) {
    console.log('✅ User already logged in, redirecting to dashboard');
    const redirectUrl = new URL('/dashboard', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Tambahkan header untuk mencegah caching
  res.headers.set('Cache-Control', 'no-store, max-age=0');
  res.headers.set('Pragma', 'no-cache');
  res.headers.set('Expires', '0');

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/editor/:path*', '/login', '/register'],
}; 