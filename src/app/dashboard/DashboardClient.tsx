'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { Template, User } from '@/lib/types';
import { PostgrestResponse } from '@supabase/supabase-js';

export default function DashboardClient() {
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const supabase = createClient();
        
        // Get session
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push('/login?noLoop=true');
          return;
        }

        setUser(session.user);

        // Get templates with proper typing
        const { data, error } = await supabase
          .from('templates')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false }) as PostgrestResponse<Template>;

        if (error) {
          throw error;
        }

        setTemplates(data || []);
        setLoading(false);
      } catch (err: any) {
        console.error('Error loading dashboard data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [router]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handleCreateNew = async () => {
    try {
      // Verifikasi session sebelum navigasi
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login?redirectTo=/editor');
        return;
      }

      router.push('/editor?noLoop=true');
    } catch (error) {
      console.error('Error navigating to editor:', error);
      router.push('/login?redirectTo=/editor');
    }
  };

  const handleEditTemplate = async (templateId: string) => {
    try {
      // Verifikasi session sebelum navigasi
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push(`/login?redirectTo=/editor?template=${templateId}`);
        return;
      }

      router.push(`/editor?template=${templateId}&noLoop=true`);
    } catch (error) {
      console.error('Error navigating to editor:', error);
      router.push(`/login?redirectTo=/editor?template=${templateId}`);
    }
  };

  const handleDeleteTemplate = async (templateId: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus template ini?')) return;

    try {
      const supabase = createClient();
      
      // Verifikasi session sebelum delete
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login?noLoop=true');
        return;
      }

      const { error } = await supabase
        .from('templates')
        .delete()
        .eq('id', templateId);

      if (error) throw error;
      setTemplates(templates.filter(t => t.id !== templateId));
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold">Dashboard</h1>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="text-center">Memuat data...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold">Dashboard</h1>
              </div>
              <div className="flex items-center">
                <span className="text-gray-700 mr-4">{user?.email}</span>
                <button
                  onClick={handleSignOut}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Keluar
                </button>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">Error: {error}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Dashboard</h1>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">{user?.email}</span>
              <button
                onClick={handleSignOut}
                className="text-gray-600 hover:text-gray-900"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Template Saya</h2>
            <button
              onClick={handleCreateNew}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Buat Template Baru
            </button>
          </div>

          {templates.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Belum ada template. Buat template baru sekarang!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="p-5">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                      {template.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Dibuat: {new Date(template.created_at).toLocaleDateString()}
                    </p>
                    <div className="mt-4 flex space-x-3">
                      <button
                        onClick={() => template.id && handleEditTemplate(template.id)}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-sm hover:bg-blue-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => template.id && handleDeleteTemplate(template.id)}
                        className="bg-red-50 text-red-700 px-3 py-1 rounded-md text-sm hover:bg-red-100"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 