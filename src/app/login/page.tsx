'use client';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { signIn, createClientSupabaseClient } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClientSupabaseClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.log('🔑 Existing session found, redirecting to dashboard...');
        router.push('/dashboard');
      }
    };
    checkSession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('📝 Submitting login form...');
      const { data, error } = await signIn(email, password);
      
      if (error) {
        console.error('❌ Login error:', error.message);
        throw error;
      }

      if (!data?.session) {
        console.error('❌ No session after login');
        throw new Error('No session created after login');
      }

      console.log('✅ Login successful, redirecting...');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for session to be saved
      
      const redirectTo = searchParams.get('redirectTo') || '/dashboard';
      console.log('🔄 Redirecting to:', redirectTo);
      
      // Force hard navigation
      window.location.href = redirectTo;
    } catch (error: any) {
      console.error('❌ Login error:', error);
      setError(error.message || 'Email atau password salah');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login ke akun Anda
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Atau{' '}
          <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
            daftar untuk akun baru
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 