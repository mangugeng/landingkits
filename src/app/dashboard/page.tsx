import { createServerSupabaseClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  console.log('📱 Dashboard page loading...');
  
  const supabase = createServerSupabaseClient();
  console.log('🔌 Supabase client created');
  
  const { data: { session }, error } = await supabase.auth.getSession();
  
  console.log('🔑 Session check result:', {
    hasSession: !!session,
    error: error?.message
  });

  if (!session) {
    console.log('🚫 No session found, redirecting to login');
    const redirectUrl = new URL('/login', 'https://landingkits.com');
    redirectUrl.searchParams.set('noLoop', 'true');
    redirect(redirectUrl.toString());
  }

  console.log('✅ Session found, fetching templates');
  const { data: templates, error: templatesError } = await supabase
    .from('templates')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  if (templatesError) {
    console.error('❌ Error fetching templates:', templatesError.message);
  }

  // Hapus parameter noLoop dari URL jika ada
  if (searchParams.noLoop) {
    const url = new URL(window.location.href);
    url.searchParams.delete('noLoop');
    window.history.replaceState({}, '', url.toString());
  }

  return <DashboardClient initialTemplates={templates || []} user={session.user} />;
} 