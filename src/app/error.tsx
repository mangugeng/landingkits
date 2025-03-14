'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">500</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Terjadi Kesalahan
        </h2>
        <p className="text-gray-600 mb-8">
          Maaf, terjadi kesalahan pada server. Silakan coba lagi nanti.
        </p>
        <button
          onClick={() => reset()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  )
} 