'use client';

import { useSupabase } from '@/app/providers';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateAdmin() {
  const supabase = useSupabase();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createAdmin = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 1. Buat user di auth.users dengan metadata role
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: 'admin@landingkits.com',
        password: 'Farhan!234',
        options: {
          data: {
            role: 'super_admin',
            name: 'Super Admin'
          }
        }
      });

      if (signUpError) throw signUpError;
      
      if (!authData.user) {
        throw new Error('Gagal membuat user');
      }

      // 2. Tunggu sebentar untuk memastikan user telah dibuat di auth.users
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 3. Insert ke public.users menggunakan service role client
      const { data: serviceRoleData, error: serviceRoleError } = await supabase.auth.getSession();
      
      if (serviceRoleError) throw serviceRoleError;

      const { error: insertError } = await supabase.rpc('create_admin_user', {
        user_id: authData.user.id,
        user_email: authData.user.email,
        user_name: 'Super Admin'
      });

      if (insertError) throw insertError;

      setSuccess(true);
      
    } catch (err: any) {
      console.error('Error creating admin:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full px-4">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Buat Admin
          </h1>

          {error && (
            <div className="mb-4 p-4 text-sm text-red-600 bg-red-50 rounded-lg">
              {error}
            </div>
          )}

          {success ? (
            <div className="text-center">
              <div className="mb-4 p-4 text-sm text-green-600 bg-green-50 rounded-lg">
                Admin berhasil dibuat! Silakan login dengan kredensial berikut:
                <br />
                Email: admin@landingkits.com
                <br />
                Password: Farhan!234
              </div>
              <button
                onClick={() => router.push('/admin/login')}
                className="w-full py-3 px-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Lanjut ke Halaman Login
              </button>
            </div>
          ) : (
            <button
              onClick={createAdmin}
              disabled={loading}
              className="w-full py-3 px-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  <span>Memproses...</span>
                </div>
              ) : (
                'Buat Admin'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 