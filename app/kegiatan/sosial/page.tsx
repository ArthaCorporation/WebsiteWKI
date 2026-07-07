import type { Metadata } from 'next'
import Image from 'next/image'
import KegiatanDocumentCard from '@/components/KegiatanDocumentCard'

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

        <div className="mt-12">
        
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#0B5E8E] mb-2">SOP Identifikasi, Pemetaan, dan Resolusi Konflik</h3>
            <p className="text-gray-600 max-w-3xl">
              Standar operasional prosedur identifikasi, pemetaan, dan resolusi konflik PT. Wijaya Kencana Indonesia.
            </p>
          </div>

          <KegiatanDocumentCard
            title="SOP Identifikasi, Pemetaan, dan Resolusi Konflik"
            file="SOP Identifikasi, Pemetaan, Resolusi Konflik.pdf"
          />
        </div>
      </section>
    </div>
  )
}
