import { notFound } from 'next/navigation'
import { getTenant } from '@/lib/supabase'
import Image from 'next/image'

interface PageProps {
  params: {
    tenant: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function TenantPage({
  params,
  searchParams,
}: PageProps) {
  // Ambil data tenant dari Supabase
  const tenant = await getTenant(params.tenant)

  // Jika tenant tidak ditemukan
  if (!tenant) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            {tenant.logo && (
              <Image
                src={tenant.logo}
                alt={tenant.name}
                width={48}
                height={48}
                className="rounded-lg"
              />
            )}
            <h1 className="text-3xl font-bold text-gray-900">
              {tenant.name}
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Tentang {tenant.name}
          </h2>
          <p className="text-gray-600 mb-6">
            {tenant.description || `Selamat datang di halaman ${tenant.name}`}
          </p>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-lg font-medium mb-2">Akses Website</h3>
            <ul className="space-y-2 text-blue-600">
              <li>• {params.tenant}.landingkits.com (production)</li>
              <li>• localhost:3000/{params.tenant} (development)</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
} 