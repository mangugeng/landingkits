import Link from 'next/link'
import Navbar from './components/Navbar'

export default function MarketingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Buat Landing Page Anda dengan Mudah
            </h1>
            <p className="text-xl mb-8">
              Platform all-in-one untuk membuat landing page yang menarik dan profesional untuk bisnis Anda
            </p>
            <Link 
              href="/register" 
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
            >
              Mulai Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Fitur Unggulan</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2">Desain Kustom</h3>
              <p className="text-gray-600">
                Buat landing page sesuai dengan brand identity Anda
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Performa Tinggi</h3>
              <p className="text-gray-600">
                Dioptimasi untuk kecepatan dan SEO
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Responsive</h3>
              <p className="text-gray-600">
                Tampilan sempurna di semua perangkat
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Siap Untuk Memulai?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Bergabung sekarang dan dapatkan 14 hari trial gratis
          </p>
          <Link 
            href="/register" 
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
          >
            Daftar Gratis
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">LandingKits</h2>
            <p className="text-gray-400">
              © {new Date().getFullYear()} LandingKits. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
} 