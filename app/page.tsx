import HeroCarousel from '@/components/HeroCarousel'
import Link from 'next/link'

export default function BerandaPage() {
  return (
    <>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Kata Pengantar */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#0B5E8E] mb-4">Kata Pengantar</h2>
            <div className="w-16 h-1 bg-[#FF7733] mb-6" />
            <p className="text-gray-600 leading-relaxed mb-4">
              Selamat datang di website resmi PT. Wijaya Kencana Indonesia. Kami adalah perusahaan pertambangan yang berkomitmen untuk mengelola sumber daya alam secara bertanggung jawab dan berkelanjutan.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Dengan pengalaman lebih dari dua dekade, kami terus berinovasi dan memberikan yang terbaik bagi seluruh pemangku kepentingan, termasuk karyawan, masyarakat sekitar, dan lingkungan hidup.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Kami percaya bahwa keberhasilan bisnis harus berjalan seiring dengan tanggung jawab sosial dan pelestarian lingkungan untuk generasi mendatang.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Link
              href="/tentang#visi-misi"
              className="bg-[#0B5E8E] text-white text-center py-5 px-8 rounded-lg font-semibold text-lg hover:bg-[#0a527c] transition-colors shadow-md"
            >
              VISI DAN MISI
            </Link>
            <Link
              href="/berita"
              className="bg-[#4CAF50] text-white text-center py-5 px-8 rounded-lg font-semibold text-lg hover:bg-[#43a047] transition-colors shadow-md"
            >
              BERITA
            </Link>
            <Link
              href="/keberlanjutan"
              className="bg-[#FFC107] text-gray-800 text-center py-5 px-8 rounded-lg font-semibold text-lg hover:bg-[#ffb300] transition-colors shadow-md"
            >
              KEBERLANJUTAN
            </Link>
          </div>
        </div>
      </section>

      {/* Kegiatan Operasional */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-[#0B5E8E] mb-2">Kegiatan Operasional</h2>
          <div className="w-16 h-1 bg-[#FF7733] mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-6">Lokasi Operasional</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow">
                  <span className="text-2xl">🏢</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">KANTOR PUSAT</h4>
                    <p className="text-gray-600 text-sm mt-1">Jl. Contoh No. 123, Jakarta Selatan, DKI Jakarta</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow">
                  <span className="text-2xl">📍</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">LOKASI BASE CAMP 1</h4>
                    <p className="text-gray-600 text-sm mt-1">Kalimantan Timur, Indonesia</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow">
                  <span className="text-2xl">📍</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">LOKASI BASE CAMP 2</h4>
                    <p className="text-gray-600 text-sm mt-1">Kalimantan Selatan, Indonesia</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-6">Peta Lokasi</h3>
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center text-gray-500">
                  <span className="text-4xl block mb-2">🗺️</span>
                  <p className="text-sm">Peta lokasi operasional</p>
                  <p className="text-xs mt-1 opacity-70">Integrasi peta akan ditambahkan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
