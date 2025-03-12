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
  try {
    console.log('📱 Dashboard page loading...');
    
    const supabase = createServerSupabaseClient();
    console.log('🔌 Supabase client created');
    
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('❌ Session error:', sessionError.message);
      throw sessionError;
    }

    console.log('🔑 Session check result:', {
      hasSession: !!session,
      error: sessionError?.message
    });

    if (!session) {
      console.log('🚫 No session found, redirecting to login');
      redirect('/login?noLoop=true');
    }

    console.log('✅ Session found, fetching templates');
    const { data: templates, error: templatesError } = await supabase
      .from('templates')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (templatesError) {
      console.error('❌ Error fetching templates:', templatesError.message);
      throw templatesError;
    }

    return <DashboardClient initialTemplates={templates || []} user={session.user} />;
  } catch (error) {
    console.error('❌ Dashboard error:', error);
    redirect('/login?error=server_error&noLoop=true');
  }
} 