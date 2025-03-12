import { createClient } from '@/lib/supabase';
import { Template, TemplateStatus } from './types';

export async function saveTemplate(template: Partial<Template>) {
  const supabase = createClient();
  
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session?.user) {
    throw new Error('Unauthorized');
  }

  const now = new Date().toISOString();
  const templateData = {
    ...template,
    userId: session.session.user.id,
    updatedAt: now,
    createdAt: template.id ? undefined : now,
    views: template.views || 0
  };

  if (template.id) {
    const { data, error } = await supabase
      .from('templates')
      .update(templateData)
      .eq('id', template.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from('templates')
      .insert(templateData)
      .select()
      .single();

    if (error) throw error;
    return data;
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
      status,
      updatedAt: new Date().toISOString()
    })
    .eq('id', id)
    .eq('userId', session.session.user.id)
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
      .eq('customDomain', customDomain)
      .neq('id', id)
      .single();

    if (existing) {
      throw new Error('Domain sudah digunakan');
    }
  }

  const { data, error } = await supabase
    .from('templates')
    .update({ 
      subdomain,
      customDomain,
      updatedAt: new Date().toISOString()
    })
    .eq('id', id)
    .eq('userId', session.session.user.id)
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
      views: supabase.rpc('increment_views', { row_id: id }),
      updatedAt: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
} 