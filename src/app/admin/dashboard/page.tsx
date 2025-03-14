'use client';

import { useSupabase } from '@/app/providers';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface DashboardStats {
  totalTenants: number;
  activeTenants: number;
  totalLandingPages: number;
  activeLandingPages: number;
}

export default function AdminDashboard() {
  const supabase = useSupabase();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalTenants: 0,
    activeTenants: 0,
    totalLandingPages: 0,
    activeLandingPages: 0,
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        router.push('/admin/login');
        return;
      }

      // Periksa role dari user metadata
      const role = user.user_metadata?.role;
      
      if (role !== 'super_admin' && role !== 'admin') {
        router.push('/admin/login');
        return;
      }

      // Load stats setelah auth berhasil
      await loadStats();
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/admin/login');
    }
  };

  const loadStats = async () => {
    try {
      console.log('Memulai pengambilan statistik...');

      // Get counts from database with better error handling
      const [
        { data: tenantsData, error: tenantsError },
        { data: activeTenantsData, error: activeTenantsError },
        { data: landingPagesData, error: landingPagesError },
        { data: activeLandingPagesData, error: activeLandingPagesError }
      ] = await Promise.all([
        supabase.from('tenants').select('id'),
        supabase.from('tenants').select('id').eq('is_active', true),
        supabase.from('landing_pages').select('id'),
        supabase.from('landing_pages').select('id').eq('is_active', true)
      ]);

      // Log results and errors
      console.log('Data tenants:', tenantsData);
      console.log('Data active tenants:', activeTenantsData);
      console.log('Data landing pages:', landingPagesData);
      console.log('Data active landing pages:', activeLandingPagesData);

      if (tenantsError) console.error('Error fetching total tenants:', tenantsError);
      if (activeTenantsError) console.error('Error fetching active tenants:', activeTenantsError);
      if (landingPagesError) console.error('Error fetching total landing pages:', landingPagesError);
      if (activeLandingPagesError) console.error('Error fetching active landing pages:', activeLandingPagesError);

      // Update stats with length checks
      const stats = {
        totalTenants: Array.isArray(tenantsData) ? tenantsData.length : 0,
        activeTenants: Array.isArray(activeTenantsData) ? activeTenantsData.length : 0,
        totalLandingPages: Array.isArray(landingPagesData) ? landingPagesData.length : 0,
        activeLandingPages: Array.isArray(activeLandingPagesData) ? activeLandingPagesData.length : 0,
      };

      console.log('Statistik yang akan diset:', stats);
      setStats(stats);
    } catch (error) {
      console.error('Error loading stats:', error);
      // Set default values if there's an error
      setStats({
        totalTenants: 0,
        activeTenants: 0,
        totalLandingPages: 0,
        activeLandingPages: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Dashboard Admin
            </h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Keluar
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Tenant</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.totalTenants}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Tenant Aktif</h3>
            <p className="text-3xl font-bold text-green-600">{stats.activeTenants}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Landing Page</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.totalLandingPages}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Landing Page Aktif</h3>
            <p className="text-3xl font-bold text-green-600">{stats.activeLandingPages}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Aksi Cepat</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <button
                onClick={() => router.push('/admin/tenants')}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                <span className="text-sm font-medium text-gray-700">Kelola Tenant</span>
              </button>
              <button
                onClick={() => router.push('/admin/landing-pages')}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                <span className="text-sm font-medium text-gray-700">Kelola Landing Page</span>
              </button>
              <button
                onClick={() => router.push('/admin/templates')}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                <span className="text-sm font-medium text-gray-700">Kelola Template</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 