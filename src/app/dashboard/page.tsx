'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientSupabaseClient } from '@/lib/supabase';
import DashboardClient from './DashboardClient';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        console.log('📱 Dashboard page loading...');
        const supabase = createClientSupabaseClient();
        
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        console.log('🔑 Session check complete', {
          hasSession: !!session,
          error: sessionError?.message,
          userId: session?.user?.id
        });

        if (sessionError) {
          console.error('❌ Session error:', sessionError);
          throw new Error('Session error');
        }

        if (!session) {
          console.log('🚫 No session found, redirecting to login');
          router.push('/login?error=no_session&noLoop=true');
          return;
        }

        console.log('✅ Session found, fetching templates for user:', session.user.id);
        const { data: templates, error: templatesError } = await supabase
          .from('templates')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false });

        if (templatesError) {
          console.error('❌ Templates error:', templatesError);
          throw new Error(`Failed to fetch templates: ${templatesError.message}`);
        }

        console.log('📋 Templates fetched:', templates?.length || 0);
        setLoading(false);
        return { templates, user: session.user };
      } catch (error: any) {
        console.error('❌ Dashboard error:', {
          message: error.message,
          stack: error.stack,
          name: error.name
        });
        setError(error.message);
        setLoading(false);
        router.push(`/login?error=server_error&code=${encodeURIComponent(error.message || 'unknown')}&noLoop=true`);
      }
    };

    initializeDashboard();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-xl font-medium text-gray-900">
            Memuat dashboard...
          </h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-xl font-medium text-red-600">
            Terjadi kesalahan: {error}
          </h2>
        </div>
      </div>
    );
  }

  return null; // DashboardClient akan di-render setelah data tersedia
} 