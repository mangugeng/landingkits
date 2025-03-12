import { createServerSupabaseClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export default async function DashboardPage() {
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
    redirect('/login');
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

  return <DashboardClient initialTemplates={templates || []} user={session.user} />;
} 