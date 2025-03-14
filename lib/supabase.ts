import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getTenant(slug: string) {
  const { data: tenant, error } = await supabase
    .from('tenants')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error:', error.message)
    return null
  }

  return tenant
}

export async function getAllTenants() {
  const { data: tenants, error } = await supabase
    .from('tenants')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error:', error.message)
    return []
  }

  return tenants
} 