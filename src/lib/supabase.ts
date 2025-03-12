import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { User } from '@supabase/supabase-js';

const SITE_URL = 'https://landingkits.com';
const REDIRECT_URL = `${SITE_URL}/auth/callback`;

let clientInstance: ReturnType<typeof createSupabaseClient> | null = null;

export type { User };

export const createClient = () => {
  console.log('🔧 Creating client Supabase client');
  
  if (clientInstance) {
    console.log('♻️ Reusing existing client instance');
    return clientInstance;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  console.log('🆕 Creating new client instance');
  clientInstance = createSupabaseClient(supabaseUrl, supabaseAnonKey);

  return clientInstance;
};

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
  const supabase = createClient();
  
  console.log('Using redirect URL:', REDIRECT_URL);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
      emailRedirectTo: REDIRECT_URL,
    },
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  console.log('🔑 Attempting to sign in with email:', email);
  
  const supabase = createClient();
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('❌ Sign in error:', error.message);
      throw error;
    }

    console.log('✅ Sign in successful:', data.session ? 'Session created' : 'No session');
    return { data, error: null };
  } catch (error: any) {
    console.error('❌ Sign in error:', error.message);
    return { 
      data: null, 
      error: {
        message: error.message || 'An error occurred during sign in'
      }
    };
  }
};

export const signOut = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  return { error };
};

// Helper functions untuk templates
export const saveTemplate = async (template: Omit<Template, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
  const supabase = createClient();
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
  const supabase = createClient();
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