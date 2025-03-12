import { createClient } from '@/lib/supabase';
import { Template, TemplateStatus } from './types';

export async function getTemplates() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function saveTemplate(
  name: string,
  blocks: any[],
  userId: string,
  subdomain?: string,
  id?: string
) {
  try {
    const supabase = createClient();

    if (id) {
      const { data, error } = await supabase
        .from('templates')
        .update({
          name,
          blocks,
          subdomain,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    }

    const { data, error } = await supabase
      .from('templates')
      .insert({
        name,
        blocks,
        subdomain,
        user_id: userId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving template:', error);
    throw error;
  }
}

export async function getTemplate(id: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateTemplateStatus(id: string, status: TemplateStatus) {
  const supabase = createClient();
  
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session?.user) {
    throw new Error('Unauthorized');
  }

  const { data, error } = await supabase
    .from('templates')
    .update({ 
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .eq('user_id', session.session.user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTemplateDomain(
  id: string, 
  { subdomain, customDomain }: { subdomain?: string; customDomain?: string }
) {
  const supabase = createClient();
  
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session?.user) {
    throw new Error('Unauthorized');
  }

  // Check if subdomain is available
  if (subdomain) {
    const { data: existing } = await supabase
      .from('templates')
      .select('id')
      .eq('subdomain', subdomain)
      .neq('id', id)
      .single();

    if (existing) {
      throw new Error('Subdomain sudah digunakan');
    }
  }

  const { data, error } = await supabase
    .from('templates')
    .update({ 
      subdomain,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .eq('user_id', session.session.user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function incrementTemplateViews(id: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('templates')
    .update({ 
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
} 