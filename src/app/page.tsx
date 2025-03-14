import Image from "next/image";
import Link from "next/link";
import { getTenants } from "@/lib/supabase";

export default async function Home() {
  const tenants = await getTenants();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative w-[38px] h-[38px]">
                <Image
                  src="/icon"
                  alt="Logo LandingKits"
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                LandingKits
              </h1>
            </div>
            <Link
              href="https://github.com/mangugeng/landingkits"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              GitHub →
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Daftar Landing Page
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tenants.map((tenant) => (
              <Link
                key={tenant.id}
                href={`/${tenant.slug}`}
                className="block group"
              >
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 transition-all duration-200 hover:shadow-md hover:border-gray-200">
                  <div className="aspect-video relative bg-gray-50">
                    {tenant.logo ? (
                      <Image
                        src={tenant.logo}
                        alt={tenant.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <span className="text-4xl font-bold text-gray-300">
                          {tenant.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
                      {tenant.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {tenant.description || `Landing page untuk ${tenant.name}`}
                    </p>
                  </div>
                </div>
              </Link>
            ))}

            {tenants.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600">
                  Belum ada landing page yang tersedia.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} LandingKits. Dibuat dengan{" "}
            <Link
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Next.js
            </Link>
            {" "}dan{" "}
            <Link
              href="https://supabase.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Supabase
            </Link>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
