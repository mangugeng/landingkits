import { createServerSupabaseClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  try {
    console.log('📱 Dashboard page loading...', { searchParams });
    
    const supabase = createServerSupabaseClient();
    console.log('🔌 Supabase client created');
    
    const sessionPromise = supabase.auth.getSession();
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Session fetch timeout')), 5000)
    );
    
    const { data: { session }, error: sessionError } = await Promise.race([
      sessionPromise,
      timeoutPromise
    ]) as any;
    
    console.log('🔑 Session check complete', {
      hasSession: !!session,
      error: sessionError?.message,
      userId: session?.user?.id
    });

    if (sessionError) {
      console.error('❌ Session error:', sessionError);
      return redirect('/login?error=session_error&noLoop=true');
    }

    if (!session) {
      console.log('🚫 No session found, redirecting to login');
      return redirect('/login?error=no_session&noLoop=true');
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
    return <DashboardClient initialTemplates={templates || []} user={session.user} />;
  } catch (error: any) {
    console.error('❌ Dashboard error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return redirect(`/login?error=server_error&code=${encodeURIComponent(error.message || 'unknown')}&noLoop=true`);
  }
} 