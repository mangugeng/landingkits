import { createServerSupabaseClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const { data: templates } = await supabase
    .from('templates')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  return <DashboardClient initialTemplates={templates || []} user={session.user} />;
} 