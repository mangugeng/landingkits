'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Template, signOut } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface DashboardClientProps {
  initialTemplates: Template[];
  user: User;
}

export default function DashboardClient({ initialTemplates, user }: DashboardClientProps) {
  const router = useRouter();
  const [templates, setTemplates] = useState(initialTemplates);

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  const handleCreateNew = () => {
    router.push('/editor');
  };

  const handleEditTemplate = (templateId: string) => {
    router.push(`/editor?template=${templateId}`);
  };

  const handleDeleteTemplate = async (templateId: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus template ini?')) return;

    try {
      const { error } = await fetch(`/api/templates/${templateId}`, {
        method: 'DELETE',
      }).then(res => res.json());

      if (error) throw error;
      setTemplates(templates.filter(t => t.id !== templateId));
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Dashboard</h1>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">{user.email}</span>
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
                    <h3 className="text-lg font-medium text-gray-900">
                      {template.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Dibuat: {new Date(template.created_at).toLocaleDateString()}
                    </p>
                    <div className="mt-4 flex space-x-3">
                      <button
                        onClick={() => handleEditTemplate(template.id)}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-sm hover:bg-blue-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTemplate(template.id)}
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