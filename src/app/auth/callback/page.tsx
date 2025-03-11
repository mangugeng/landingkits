'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClientSupabaseClient } from '@/lib/supabase';

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const supabase = createClientSupabaseClient();

      try {
        console.log('Starting callback handler...');

        // Cek apakah ada pesan error
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');

        if (error) {
          console.error('Error from URL:', error, errorDescription);
          router.push(`/login?error=${encodeURIComponent(errorDescription || 'Terjadi kesalahan saat verifikasi')}`);
          return;
        }

        // Handle callback
        console.log('Getting session...');
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          throw sessionError;
        }

        if (session) {
          console.log('Session found, redirecting to dashboard...');
          // Tunggu sebentar untuk memastikan sesi tersimpan
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Cek sesi sekali lagi untuk memastikan
          const { data: { session: finalSession } } = await supabase.auth.getSession();
          if (finalSession) {
            router.push('/dashboard');
          } else {
            console.error('Session lost after delay');
            router.push('/login?error=Sesi tidak valid');
          }
        } else {
          console.error('No session found');
          router.push('/login?error=Sesi tidak valid');
        }
      } catch (err: any) {
        console.error('Error handling callback:', err);
        router.push(`/login?error=${encodeURIComponent(err.message || 'Terjadi kesalahan saat verifikasi')}`);
      }
    };

    // Handle hash fragment if present
    if (typeof window !== 'undefined' && window.location.hash) {
      console.log('Hash fragment found:', window.location.hash);
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      if (hashParams.has('access_token')) {
        console.log('Access token found in hash');
        // Supabase will handle this automatically with detectSessionInUrl
      }
    }

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Memverifikasi...
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Mohon tunggu sebentar
        </p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Loading...
          </h2>
        </div>
      </div>
    }>
      <CallbackHandler />
    </Suspense>
  );
} 