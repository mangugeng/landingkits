export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Template Tidak Ditemukan</h1>
        <p className="text-gray-600 mb-8">
          Template yang Anda cari tidak ditemukan atau masih dalam status draft.
        </p>
        <a
          href="https://landingkits.com"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Kembali ke Beranda
        </a>
      </div>
    </div>
  );
} 