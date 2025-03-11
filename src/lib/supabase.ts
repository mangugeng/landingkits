import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper untuk tipe data
export interface UserData {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
}

export interface Template {
  id: string;
  user_id: string;
  name: string;
  blocks: any;
  created_at: string;
  updated_at: string;
  is_public: boolean;
}

// Helper functions untuk auth
export const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// Helper functions untuk templates
export const saveTemplate = async (template: Omit<Template, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('templates')
    .insert([
      {
        ...template,
        user_id: user.id,
      },
    ])
    .select()
    .single();

  return { data, error };
};

export const getTemplates = async (userId?: string) => {
  let query = supabase
    .from('templates')
    .select('*');

  if (userId) {
    query = query.eq('user_id', userId);
  } else {
    query = query.eq('is_public', true);
  }

  const { data, error } = await query;
  return { data, error };
}; 