import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hubungi Kami - PT. Wijaya Kencana Indonesia',
  description: 'Hubungi PT. Wijaya Kencana Indonesia',
}

export default function KontakPage() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      <h1 className="text-4xl font-bold text-[#0B5E8E] mb-2">Hubungi Kami</h1>
      <div className="w-16 h-1 bg-[#FF7733] mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Informasi Kontak</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-[#0B5E8E] text-white p-3 rounded-lg flex-shrink-0">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Alamat</h3>
                <p className="text-gray-600 mt-1">Jl. Contoh No. 123, Kebayoran Baru<br />Jakarta Selatan, DKI Jakarta 12160</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-[#0B5E8E] text-white p-3 rounded-lg flex-shrink-0">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Telepon</h3>
                <p className="text-gray-600 mt-1">+62 21 1234 5678</p>
                <p className="text-gray-600">+62 21 8765 4321</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-[#0B5E8E] text-white p-3 rounded-lg flex-shrink-0">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Email</h3>
                <p className="text-gray-600 mt-1">info@wki.co.id</p>
                <p className="text-gray-600">humas@wki.co.id</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-[#0B5E8E] text-white p-3 rounded-lg flex-shrink-0">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Jam Operasional</h3>
                <p className="text-gray-600 mt-1">Senin - Jumat: 08.00 - 17.00 WIB</p>
                <p className="text-gray-600">Sabtu: 08.00 - 12.00 WIB</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Kirim Pesan</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                placeholder="Masukkan nama lengkap Anda"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B5E8E] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="Masukkan alamat email Anda"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B5E8E] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subjek</label>
              <input
                type="text"
                placeholder="Masukkan subjek pesan"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B5E8E] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
              <textarea
                rows={5}
                placeholder="Tulis pesan Anda di sini..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B5E8E] focus:border-transparent resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#0B5E8E] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#0a527c] transition-colors"
            >
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
