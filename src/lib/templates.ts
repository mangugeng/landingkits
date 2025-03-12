import { createClient } from '@/lib/supabase';
import { Template, TemplateStatus, Block } from './types';

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
  custom_domain?: string,
  status: TemplateStatus = 'draft',
  isPublic: boolean = false,
  description?: string,
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
          custom_domain,
          status,
          is_public: isPublic,
          description,
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
        custom_domain,
        status,
        is_public: isPublic,
        description,
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

export async function getTemplate(id: string): Promise<Template | null> {
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

  // Check if custom domain is available
  if (customDomain) {
    const { data: existing } = await supabase
      .from('templates')
      .select('id')
      .eq('custom_domain', customDomain)
      .neq('id', id)
      .single();

    if (existing) {
      throw new Error('Custom domain sudah digunakan');
    }
  }

  const { data, error } = await supabase
    .from('templates')
    .update({ 
      subdomain,
      custom_domain: customDomain,
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

export async function deleteTemplate(id: string) {
  const supabase = createClient();
  
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session?.user) {
    throw new Error('Unauthorized');
  }

  const { error } = await supabase
    .from('templates')
    .delete()
    .eq('id', id)
    .eq('user_id', session.session.user.id);

  if (error) throw error;
}

export async function updateTemplate(
  id: string,
  updates: Partial<Template> | { blocks: any[] }
) {
  try {
    const supabase = createClient();
    
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user) {
      throw new Error('Unauthorized');
    }

    const { data, error } = await supabase
      .from('templates')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .eq('user_id', session.session.user.id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error: any) {
    console.error('Error updating template:', error);
    throw new Error(error.message || 'Failed to update template');
  }
} 