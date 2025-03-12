import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res }, {
    cookies: {
      get(name: string) {
        return req.cookies.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        res.cookies.set({
          name,
          value,
          ...options,
        })
      },
      remove(name: string, options: any) {
        res.cookies.set({
          name,
          value: '',
          ...options,
        })
      },
    },
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Jika user tidak login dan mencoba mengakses halaman yang dilindungi
  if (!session && (req.nextUrl.pathname.startsWith('/dashboard') || req.nextUrl.pathname.startsWith('/editor'))) {
    const redirectUrl = new URL('/login', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Jika user sudah login dan mencoba mengakses halaman login/register
  if (session && (req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register'))) {
    const redirectUrl = new URL('/dashboard', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/editor/:path*', '/login', '/register'],
}; 