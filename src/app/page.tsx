import Image from "next/image";
import Link from "next/link";
import { getTenants } from "@/lib/supabase";

export default async function Home() {
  const tenants = await getTenants();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
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
            <div className="flex items-center gap-6">
              <Link href="#templates" className="text-sm text-gray-600 hover:text-gray-900">
                Template
              </Link>
              <Link href="#features" className="text-sm text-gray-600 hover:text-gray-900">
                Fitur
              </Link>
              <Link href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900">
                Cara Kerja
              </Link>
              <Link href="#pricing" className="text-sm text-gray-600 hover:text-gray-900">
                Harga
              </Link>
              <Link
                href="https://github.com/mangugeng/landingkits"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              >
                GitHub →
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#E0F2FE_0%,_transparent_60%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#DBEAFE_0%,_transparent_60%)]"></div>
        </div>
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-left relative">
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
                <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Buat Landing Page <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                    Profesional
                  </span> dalam Hitungan Menit
                </h1>
                <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                  LandingKits menyediakan template landing page yang sudah dioptimasi untuk konversi. 
                  Mulai dari startup, agency, hingga bisnis enterprise.
                </p>
                <div className="flex gap-4">
                  <Link 
                    href="#templates"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-lg shadow-blue-500/25"
                  >
                    Lihat Template →
                  </Link>
                  <Link 
                    href="#features"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  >
                    Pelajari Fitur
                  </Link>
                </div>
                <div className="mt-12 flex items-center gap-8">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">100+</div>
                    <div className="text-sm text-gray-600">Template Siap Pakai</div>
                  </div>
                  <div className="w-px h-12 bg-gray-200"></div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">10k+</div>
                    <div className="text-sm text-gray-600">Pengguna Aktif</div>
                  </div>
                  <div className="w-px h-12 bg-gray-200"></div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">99.9%</div>
                    <div className="text-sm text-gray-600">Uptime Server</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
                <div className="aspect-[4/3] relative rounded-xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-blue-600/10 backdrop-blur-sm"></div>
                  <Image
                    src="/images/hero/dashboard.svg"
                    alt="LandingKits Dashboard Preview"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full z-0 blur-2xl"></div>
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-full z-0 blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/patterns/features.svg')] opacity-100"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#EFF6FF_0%,_transparent_70%)]"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm font-medium text-blue-700 bg-blue-50 rounded-full">
              Fitur Unggulan
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Semua yang Anda Butuhkan untuk Landing Page Sempurna
            </h2>
            <p className="text-xl text-gray-600">
              Kami menyediakan fitur lengkap untuk membantu Anda membuat dan mengoptimalkan landing page
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="relative p-8 bg-white rounded-2xl shadow-lg shadow-gray-100/50 hover:shadow-xl transition-all duration-200 group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Optimasi SEO</h3>
                <p className="text-gray-600 leading-relaxed">
                  Template kami dioptimasi untuk SEO, membantu website Anda tampil di halaman pertama Google dengan struktur kode yang bersih dan cepat.
                </p>
              </div>
            </div>

            <div className="relative p-8 bg-white rounded-2xl shadow-lg shadow-gray-100/50 hover:shadow-xl transition-all duration-200 group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Responsif</h3>
                <p className="text-gray-600 leading-relaxed">
                  Tampilan yang sempurna di semua perangkat dengan desain responsif yang adaptif dan pengalaman pengguna yang konsisten.
                </p>
              </div>
            </div>

            <div className="relative p-8 bg-white rounded-2xl shadow-lg shadow-gray-100/50 hover:shadow-xl transition-all duration-200 group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Performa Tinggi</h3>
                <p className="text-gray-600 leading-relaxed">
                  Loading cepat dan optimal berkat Next.js dan optimasi gambar otomatis untuk pengalaman pengguna yang lebih baik.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#EFF6FF_0%,_transparent_70%)]"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm font-medium text-blue-700 bg-blue-50 rounded-full">
              Template Landing Page
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Template Modern & Siap Pakai
            </h2>
            <p className="text-xl text-gray-600">
              Pilih dari berbagai template landing page yang telah dioptimasi untuk konversi
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tenants && tenants.length > 0 ? (
              tenants.map((tenant) => (
                <div key={tenant.id} className="group relative">
                  <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg shadow-gray-100/50 hover:shadow-xl transition-all duration-200">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <Image
                        src={tenant.logo_url || '/placeholder.png'}
                        alt={tenant.name}
                        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                        width={400}
                        height={300}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <a
                          href={tenant.domain}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                        >
                          <span>Lihat Preview</span>
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{tenant.name}</h3>
                      <p className="text-gray-600 mb-4">{getDefaultDescription(tenant.slug)}</p>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">
                          <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {Math.floor(Math.random() * 5) + 2} menit setup
                        </span>
                        <span className="text-sm text-gray-500">
                          <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                          </svg>
                          Responsif
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada template</h3>
                <p className="text-gray-600">Template akan segera tersedia. Silakan cek kembali nanti.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/patterns/workflow.svg')] opacity-100"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#EFF6FF_0%,_transparent_70%)]"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm font-medium text-blue-700 bg-blue-50 rounded-full">
              Cara Kerja
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Buat Landing Page dalam 3 Langkah Mudah
            </h2>
            <p className="text-xl text-gray-600">
              Proses pembuatan landing page yang simpel dan cepat, tanpa perlu keahlian coding
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="relative">
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/25">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Pilih Template</h3>
                <p className="text-gray-600 leading-relaxed">
                  Pilih template yang sesuai dengan kebutuhan Anda dari berbagai pilihan yang tersedia. Setiap template didesain untuk konversi maksimal.
                </p>
              </div>
              <div className="hidden md:block absolute top-32 right-0 w-24 border-t-2 border-dashed border-blue-200 transform rotate-12"></div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/25">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Kustomisasi</h3>
                <p className="text-gray-600 leading-relaxed">
                  Sesuaikan konten, warna, dan gambar sesuai brand Anda dengan editor visual yang mudah digunakan. Tidak perlu coding sama sekali.
                </p>
              </div>
              <div className="hidden md:block absolute top-32 right-0 w-24 border-t-2 border-dashed border-blue-200 transform rotate-12"></div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/25">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Publikasi</h3>
                <p className="text-gray-600 leading-relaxed">
                  Publikasikan landing page Anda dengan satu klik. Dapatkan URL khusus atau gunakan domain kustom Anda sendiri.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <a
              href="#templates"
              className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl hover:from-blue-700 hover:to-blue-600 transition-colors shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35"
            >
              Mulai Buat Landing Page
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/patterns/pricing.svg')] opacity-100"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Harga yang Terjangkau
            </h2>
            <p className="text-xl text-gray-600">
              Pilih paket yang sesuai dengan kebutuhan Anda
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100 hover:border-blue-500 transition-all duration-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Starter</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">Rp 99K</span>
                <span className="text-gray-600">/bulan</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  1 Landing Page
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Custom Domain
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  SSL Certificate
                </li>
              </ul>
              <Link
                href="#templates"
                className="block text-center py-3 px-6 rounded-lg border-2 border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-colors"
              >
                Pilih Paket
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-lg shadow-md p-8 border-2 border-blue-600 relative transform hover:-translate-y-1 transition-all duration-200">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-bl-lg rounded-tr-lg">
                Popular
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">Rp 199K</span>
                <span className="text-gray-600">/bulan</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  3 Landing Page
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Custom Domain
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  SSL Certificate
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Analytics Dashboard
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  A/B Testing
                </li>
              </ul>
              <Link
                href="#templates"
                className="block text-center py-3 px-6 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
              >
                Pilih Paket
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100 hover:border-blue-500 transition-all duration-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">Rp 499K</span>
                <span className="text-gray-600">/bulan</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  10 Landing Page
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Custom Domain
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  SSL Certificate
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Analytics Dashboard
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  A/B Testing
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Priority Support
                </li>
              </ul>
              <Link
                href="#templates"
                className="block text-center py-3 px-6 rounded-lg border-2 border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-colors"
              >
                Pilih Paket
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/patterns/cta.svg')] opacity-100"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Siap Membuat Landing Page yang Menarik?
            </h2>
            <p className="text-xl text-blue-100 mb-12">
              Mulai sekarang dan tingkatkan konversi bisnis Anda dengan landing page yang profesional
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#templates"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-blue-600 bg-white rounded-xl hover:bg-blue-50 transition-colors shadow-lg shadow-blue-700/25"
              >
                Lihat Template
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white border-2 border-white/20 rounded-xl hover:bg-white/10 transition-colors"
              >
                Lihat Harga
              </a>
            </div>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">100+</div>
                <div className="text-blue-100">Template</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">10K+</div>
                <div className="text-blue-100">Pengguna Aktif</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                <div className="text-blue-100">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-blue-100">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative w-[32px] h-[32px]">
                <Image
                  src="/icon"
                  alt="Logo LandingKits"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <span className="text-xl font-bold text-gray-900">LandingKits</span>
            </div>
            <p className="text-gray-600 mb-6">
              Platform landing page modern untuk bisnis Indonesia
            </p>
            <div className="flex items-center justify-center gap-6 mb-8">
              <Link href="#features" className="text-sm text-gray-600 hover:text-gray-900">
                Fitur
              </Link>
              <Link href="#templates" className="text-sm text-gray-600 hover:text-gray-900">
                Template
              </Link>
              <Link
                href="https://github.com/mangugeng/landingkits"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                GitHub
              </Link>
            </div>
            <p className="text-sm text-gray-600">
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
        </div>
      </footer>
    </div>
  );
}

function getDefaultDescription(slug: string) {
  switch (slug) {
    case 'startup':
      return 'Template modern untuk startup teknologi dengan fokus pada konversi dan tampilan yang profesional';
    case 'agency':
      return 'Sempurna untuk agency kreatif dengan portofolio yang menonjol dan desain yang elegan';
    case 'business':
      return 'Template bisnis profesional dengan fokus pada kredibilitas dan informasi produk/layanan';
    default:
      return 'Template landing page profesional untuk bisnis Anda';
  }
}
