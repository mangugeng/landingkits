import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-bold text-xl text-blue-600">
            LandingKits
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/features" className="text-gray-600 hover:text-gray-900">
              Fitur
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
              Harga
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              Tentang
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              Masuk
            </Link>
            <Link
              href="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Daftar
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 