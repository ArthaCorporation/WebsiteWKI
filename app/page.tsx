import type { Metadata } from 'next'
import HeroCarousel from '@/components/HeroCarousel'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'PT. Wijaya Kencana Indonesia — Pemanfaatan Hutan Lestari',
  description:
    'Website resmi PT. Wijaya Kencana Indonesia (WKI), pemegang izin PBPH-HA di Kabupaten Halmahera Selatan, Maluku Utara. Berkomitmen pada pengelolaan hutan lestari dan keberlanjutan.',
  openGraph: {
    title: 'PT. Wijaya Kencana Indonesia',
    description: 'Perusahaan pemanfaatan hasil hutan kayu hutan alam di Halmahera Selatan, Maluku Utara.',
    type: 'website',
  },
}

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
            <p className="text-gray-600 leading-relaxed mb-4 text-justify">
              Selamat datang di Website resmi PT. Wijaya Kencana Indonesia.  PT. Wijaya Kencana Indonesia adalah Perusahaan Perizinan Berusaha Pemanfaatan Hutan untuk kegiatan pemanfaatan hasil hutan kayu hutan alam yang terletak di Kecamatan Halmahera Selatan Provinsi Maluku Utara.  
            </p>
            <p className="text-gray-600 leading-relaxed mb-4 text-justify">
              Pemanfaatan hutan yang dikelola oleh PBPH PT. Wijaya Kencana Indonesia berpedoman dalam kerangka keseimbangan diantara keseluruhan fungsi hutan yang meliputi fungsi produksi (ekonomi), ekologi dan social, yang didasarkan pada status fungsi kawasan hutan produksi yang dapat dimanfaatkan (dikelola).  Sehingga dalam misi nya PT. Wijaya Kencana Indonesia bertekad menjadi PBPH yang terkemuka dengan mengedepankan profesionalisme usaha, kelestarian hutan serta penerapan teknologi yang sesuai, guna diperoleh manfaat yang sebesar-besarnya bagi perusahaan, karyawan maupun Masyarakat sekitar hutan.
            </p>
            <p className="text-gray-600 leading-relaxed text-justify">
              Sebagai Perusahaan pemegang ijin PBPH, PT. Wijaya Kencana Indonesia berkomitmen pada pengelolaan hutan Lestari (PHL) untuk mengurangi dampak deforestasi dan berfokus pada pemanfaatan hutan keberlanjutan yang dikelola secara Lestari (<i>sustainable forest management/SFM</i>).
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
                    <p className="text-gray-600 text-sm mt-1">Jalan Biawan No. 2 C, Desa Sidomulyo, Kecamatan Samarinda Ilir, Kota Samarinda, Kalimantan Timur</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow">
                  <span className="text-2xl">📍</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">LOKASI BASE CAMP</h4>
                    <p className="text-gray-600 text-sm mt-1">Desa Sosepe, Kabupaten Halmahera Selatan, Maluku Utara</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-6">Peta Lokasi</h3>
              <div className="flex flex-col gap-6">
                <div className="w-full h-48 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                  <iframe 
                    src="https://maps.google.com/maps?q=Jalan%20Biawan%20No.%202%20C,%20Samarinda&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0" 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Peta Kantor Pusat"
                  ></iframe>
                </div>
                <div className="w-full h-48 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                  <iframe 
                    src="https://maps.google.com/maps?q=Desa%20Sosepe,%20Halmahera%20Selatan&t=&z=9&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0" 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Peta Base Camp"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
