import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface Tenant {
  id: string
  name: string
  slug: string
  description: string | null
  logo: string | null
  created_at: string
  updated_at: string
}

export async function getTenants() {
  const { data: tenants, error } = await supabase
    .from('tenants')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error:', error)
    return []
  }

  return tenants as Tenant[]
}

export async function getTenant(slug: string) {
  const { data: tenant, error } = await supabase
    .from('tenants')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error:', error)
    return null
  }

  return tenant as Tenant
}

// Fungsi untuk upload gambar ke Supabase Storage
export async function uploadImage(file: File, path: string) {
  console.log('Attempting to upload file:', { path, size: file.size, type: file.type })
  
  const { data, error } = await supabase.storage
    .from('landingkits')
    .upload(path, file, {
      upsert: true,
      cacheControl: '3600',
      contentType: file.type
    })

  if (error) {
    console.error('Error uploading:', {
      message: error.message,
      name: error.name
    })
    return null
  }

  console.log('Upload successful:', data)

  // Dapatkan URL publik dari gambar
  const { data: { publicUrl } } = supabase.storage
    .from('landingkits')
    .getPublicUrl(path)

  console.log('Generated public URL:', publicUrl)
  return publicUrl
}

// Fungsi untuk mendapatkan URL publik gambar
export function getImageUrl(path: string) {
  const { data: { publicUrl } } = supabase.storage
    .from('landingkits')
    .getPublicUrl(path)

  return publicUrl
} 