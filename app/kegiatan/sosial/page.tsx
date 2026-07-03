import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Kegiatan Sosial - PT. Wijaya Kencana Indonesia',
  description: 'Program kelola sosial dan pembinaan masyarakat desa hutan PT. Wijaya Kencana Indonesia',
}

export default function KegiatanSosialPage() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-[#0B5E8E] text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/WKI_docum_5.jpeg"
            alt=""
            fill
            priority
            className="object-cover object-top opacity-20 blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B5E8E]/95 via-[#0B5E8E]/88 to-[#156f9f]/90" />
        </div>

        <div className="relative max-w-7xl mx-auto px-8 py-20">
          <p className="uppercase tracking-[0.25em] text-white/70 text-xs mb-4">Kegiatan Perusahaan</p>
          <h1 className="text-3xl md:text-5xl font-bold max-w-3xl leading-tight mb-4">Kegiatan Sosial</h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 py-16">
        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed text-justify space-y-6">
          <p>
            Sebagai bagian dari komitmen terhadap pengelolaan hutan lestari, PBPH PT WKI melaksanakan program Kelola Sosial atau Pembinaan Masyarakat Desa Hutan (PMDH) untuk mendukung peningkatan kesejahteraan masyarakat di sekitar areal kerja. Program ini diwujudkan melalui pemberdayaan tenaga kerja lokal, kemitraan dengan pelaku usaha lokal dan UMKM, pembangunan serta perbaikan sarana dan prasarana desa, penyelenggaraan pelatihan peningkatan kapasitas masyarakat, pemberian fee produksi hasil penjualan kayu untuk mendukung pembangunan desa binaan sesuai kesepakatan, serta penerapan prinsip Persetujuan Atas Dasar Informasi di Awal Tanpa Paksaan (PADIATAPA atau FPIC) guna memastikan masyarakat memperoleh informasi yang memadai dan berpartisipasi dalam setiap rencana kegiatan yang berdampak terhadap hak dan kepentingannya.
          </p>
          <p>
            Melalui berbagai program tersebut, PT WKI berupaya membangun hubungan yang harmonis dengan masyarakat dan para pemangku kepentingan, mendorong pertumbuhan ekonomi lokal, mendukung terwujudnya pengelolaan hutan yang bertanggung jawab dan berkelanjutan, serta memberikan manfaat bersama.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="relative aspect-[3/4] bg-gray-100">
              <Image
                src="/kegiatan/masjid.jpg"
                alt="Pembangunan Masjid di Desa Sosepe"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-[#0B5E8E]">Pembangunan Masjid di Desa Sosepe</h3>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="relative aspect-[4/3] bg-gray-100">
              <Image
                src="/kegiatan/jalan.jpg"
                alt="Pembuatan Jalan Penghubung Antara Desa Sosepe dan Desa Kelo"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-[#0B5E8E]">Pembuatan Jalan Penghubung Antara Desa Sosepe dan Desa Kelo</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
