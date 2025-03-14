import { supabase } from './supabase'

const tenants = [
  {
    name: 'Startup Kit',
    slug: 'startup',
    description: 'Landing page untuk startup modern - Template yang sempurna untuk memperkenalkan produk inovatif Anda.',
    logo: 'https://raw.githubusercontent.com/mangugeng/assets/main/startup.png'
  },
  {
    name: 'Agency Kit',
    slug: 'agency',
    description: 'Landing page untuk agensi kreatif - Tampilkan portofolio dan layanan digital agency Anda dengan elegan.',
    logo: 'https://raw.githubusercontent.com/mangugeng/assets/main/agency.png'
  },
  {
    name: 'Business Kit',
    slug: 'business',
    description: 'Landing page untuk bisnis profesional - Template yang cocok untuk perusahaan dan layanan B2B.',
    logo: 'https://raw.githubusercontent.com/mangugeng/assets/main/business.png'
  }
]

export async function seedTenants() {
  for (const tenant of tenants) {
    const { error } = await supabase
      .from('tenants')
      .upsert(
        {
          ...tenant,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        { onConflict: 'slug' }
      )

    if (error) {
      console.error('Error seeding tenant:', tenant.slug, error)
    } else {
      console.log('Successfully seeded tenant:', tenant.slug)
    }
  }
} 