import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Upload Gambar - LandingKits Admin',
}

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Upload Gambar
          </h1>

          {/* Logo Upload Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Logo Tenant</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Startup Logo
                </label>
                <form
                  action="/api/upload"
                  method="POST"
                  encType="multipart/form-data"
                  className="flex items-center gap-4"
                >
                  <input
                    type="hidden"
                    name="path"
                    value="logos/startup.png"
                  />
                  <input
                    type="file"
                    name="file"
                    accept="image/png"
                    className="flex-1 text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    Upload
                  </button>
                </form>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Agency Logo
                </label>
                <form
                  action="/api/upload"
                  method="POST"
                  encType="multipart/form-data"
                  className="flex items-center gap-4"
                >
                  <input
                    type="hidden"
                    name="path"
                    value="logos/agency.png"
                  />
                  <input
                    type="file"
                    name="file"
                    accept="image/png"
                    className="flex-1 text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    Upload
                  </button>
                </form>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Logo
                </label>
                <form
                  action="/api/upload"
                  method="POST"
                  encType="multipart/form-data"
                  className="flex items-center gap-4"
                >
                  <input
                    type="hidden"
                    name="path"
                    value="logos/business.png"
                  />
                  <input
                    type="file"
                    name="file"
                    accept="image/png"
                    className="flex-1 text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    Upload
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Hero Image Upload Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Hero Images</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Startup Hero
                </label>
                <form
                  action="/api/upload"
                  method="POST"
                  encType="multipart/form-data"
                  className="flex items-center gap-4"
                >
                  <input
                    type="hidden"
                    name="path"
                    value="heroes/startup-hero.jpg"
                  />
                  <input
                    type="file"
                    name="file"
                    accept="image/jpeg"
                    className="flex-1 text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    Upload
                  </button>
                </form>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Agency Hero
                </label>
                <form
                  action="/api/upload"
                  method="POST"
                  encType="multipart/form-data"
                  className="flex items-center gap-4"
                >
                  <input
                    type="hidden"
                    name="path"
                    value="heroes/agency-hero.jpg"
                  />
                  <input
                    type="file"
                    name="file"
                    accept="image/jpeg"
                    className="flex-1 text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    Upload
                  </button>
                </form>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Hero
                </label>
                <form
                  action="/api/upload"
                  method="POST"
                  encType="multipart/form-data"
                  className="flex items-center gap-4"
                >
                  <input
                    type="hidden"
                    name="path"
                    value="heroes/business-hero.jpg"
                  />
                  <input
                    type="file"
                    name="file"
                    accept="image/jpeg"
                    className="flex-1 text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    Upload
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 