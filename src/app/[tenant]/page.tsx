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
    title: tenant.name,
    description: tenant.description,
    icons: {
      icon: '/icon'
    }
  }
}

export default async function TenantPage({ params }: PageProps) {
  const { tenant: tenantSlug } = await params
  const tenant = await getTenant(tenantSlug)

  if (!tenant) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {tenant.logo && (
                <div className="relative w-12 h-12">
                  <Image
                    src={tenant.logo}
                    alt={tenant.name}
                    fill
                    className="rounded-lg object-cover"
                    sizes="48px"
                  />
                </div>
              )}
              <h1 className="text-3xl font-bold text-gray-900">
                {tenant.name}
              </h1>
            </div>
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Kembali
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Tentang {tenant.name}
            </h2>
            <p className="text-gray-600 mb-6">
              {tenant.description || `Selamat datang di halaman ${tenant.name}`}
            </p>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-medium mb-2">Akses Website</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• {tenantSlug}.landingkits.com (production)</li>
                <li>• {tenantSlug}.landingkits.test:3000 (development)</li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-medium mb-4">Informasi Tambahan</h3>
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">ID</dt>
                  <dd className="mt-1 text-sm text-gray-900">{tenant.id}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Slug</dt>
                  <dd className="mt-1 text-sm text-gray-900">{tenant.slug}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Dibuat</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(tenant.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Diperbarui</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(tenant.updated_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 