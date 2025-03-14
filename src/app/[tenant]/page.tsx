import { notFound } from 'next/navigation'
import { getTenant } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{
    tenant: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tenant: tenantSlug } = await params
  const tenant = await getTenant(tenantSlug)
  
  if (!tenant) {
    return {
      title: 'Tenant Tidak Ditemukan',
    }
  }

  return {
    title: `${tenant.name} - LandingKits`,
    description: tenant.description,
    icons: {
      icon: '/icon'
    }
  }
}

const tenantContent: Record<string, {
  hero: string
  features: Array<{
    title: string
    description: string
    icon: string
  }>
}> = {
  startup: {
    hero: 'https://raw.githubusercontent.com/mangugeng/assets/main/startup-hero.jpg',
    features: [
      {
        title: 'Modern & Responsif',
        description: 'Template yang dioptimalkan untuk semua perangkat dengan desain yang modern dan menarik.',
        icon: '💻'
      },
      {
        title: 'Konversi Tinggi',
        description: 'Dirancang untuk meningkatkan konversi dengan call-to-action yang strategis.',
        icon: '📈'
      },
      {
        title: 'Mudah Dikustomisasi',
        description: 'Sesuaikan dengan brand Anda menggunakan komponen yang modular dan fleksibel.',
        icon: '🎨'
      }
    ]
  },
  agency: {
    hero: 'https://raw.githubusercontent.com/mangugeng/assets/main/agency-hero.jpg',
    features: [
      {
        title: 'Portofolio Dinamis',
        description: 'Tampilkan karya terbaik Anda dengan galeri yang interaktif dan menarik.',
        icon: '🎯'
      },
      {
        title: 'Integrasi CMS',
        description: 'Kelola konten dengan mudah menggunakan sistem manajemen konten yang powerful.',
        icon: '⚡'
      },
      {
        title: 'SEO Friendly',
        description: 'Dioptimalkan untuk mesin pencari dengan struktur yang bersih dan cepat.',
        icon: '🔍'
      }
    ]
  },
  business: {
    hero: 'https://raw.githubusercontent.com/mangugeng/assets/main/business-hero.jpg',
    features: [
      {
        title: 'Profesional & Elegan',
        description: 'Desain yang mencerminkan profesionalisme dan kredibilitas bisnis Anda.',
        icon: '👔'
      },
      {
        title: 'Lead Generation',
        description: 'Form dan CTA yang dioptimalkan untuk mengumpulkan leads potensial.',
        icon: '📊'
      },
      {
        title: 'Integrasi Analytics',
        description: 'Pantau performa website dengan integrasi Google Analytics yang mudah.',
        icon: '📱'
      }
    ]
  }
}

export default async function TenantPage({ params }: PageProps) {
  const { tenant: tenantSlug } = await params
  const tenant = await getTenant(tenantSlug)

  if (!tenant) {
    notFound()
  }

  const content = tenantContent[tenantSlug] || {
    hero: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070&auto=format&fit=crop',
    features: []
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gray-900">
        <Image
          src={content.hero}
          alt={`Hero image ${tenant.name}`}
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <div className="flex items-center justify-center gap-4 mb-6">
              {tenant.logo && (
                <div className="relative w-16 h-16 md:w-24 md:h-24">
                  <Image
                    src={tenant.logo}
                    alt={tenant.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 64px, 96px"
                  />
                </div>
              )}
              <h1 className="text-4xl md:text-6xl font-bold">
                {tenant.name}
              </h1>
            </div>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              {tenant.description}
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {content.features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Back to Home */}
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  )
} 