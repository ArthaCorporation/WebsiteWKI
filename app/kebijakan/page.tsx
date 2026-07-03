import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PdfThumbnail from '@/components/PdfThumbnail'

export const metadata: Metadata = {
  title: 'Kebijakan Perusahaan - PT. Wijaya Kencana Indonesia',
  description: 'Dokumen kebijakan PT. Wijaya Kencana Indonesia terkait keselamatan kerja, kepatuhan, dan pengelolaan lingkungan',
}

const documents = [
  {
    title: 'Kebijakan Penyampaian Keluh Kesah',
    description: 'Dokumen kebijakan untuk mekanisme penyampaian keluhan dan tindak lanjut.',
    file: 'Kebijakan Penyampaian Keluh Kesah.pdf',
    tag: 'Kebijakan',
  },
  {
    title: 'Langkah Tanggap Darurat',
    description: 'Panduan penanganan keadaan darurat di area kerja dan operasional.',
    file: 'Langkah Tanggap Darurat PT WKI.pdf',
    tag: 'Keselamatan',
  },
  {
    title: 'Pemberitahuan Kebebasan Berserikati',
    description: 'Pemberitahuan resmi terkait kebebasan berserikat bagi pekerja.',
    file: 'Pemberitahuan Kebebasan Berserikati PT WKI.pdf',
    tag: 'Ketenagakerjaan',
  },
  {
    title: 'Pertolongan Pertama',
    description: 'Panduan dasar pertolongan pertama pada kecelakaan kerja.',
    file: 'Pertolongan Pertama PT WKI.pdf',
    tag: 'Keselamatan',
  },
  {
    title: 'Safety Rules Ruang Genset',
    description: 'Aturan keselamatan untuk area ruang genset dan fasilitas pendukung.',
    file: 'Safety Rules Ruang Genset PT WKI.pdf',
    tag: 'Keselamatan',
  },
  {
    title: 'Surat Keputusan Kebebasan Berserikati',
    description: 'Surat keputusan mengenai kebebasan berserikat di lingkungan kerja.',
    file: 'SK Kebebasan Berserikati PT WKI.pdf',
    tag: 'Ketenagakerjaan',
  },
  {
    title: 'Surat Keputusan Larangan dan Sanksi Perburuan Satwa',
    description: 'Ketentuan larangan perburuan satwa beserta sanksi yang berlaku.',
    file: 'SK Larangan dan Sanksi Perburuan Satawa PT WKI.pdf',
    tag: 'Lingkungan',
  },
  {
    title: 'Surat Keputusan FSC',
    description: 'Surat keputusan terkait komitmen perusahaan terhadap standar FSC.',
    file: 'SK FSC.pdf',
    tag: 'Sertifikasi',
  },
  {
    title: 'Surat Keputusan Penggunaan Pestisida',
    description: 'Ketentuan penggunaan pestisida secara aman dan bertanggung jawab.',
    file: 'SK Penggunaan Pestisida PT WKI.pdf',
    tag: 'Lingkungan',
  },
  {
    title: 'Surat Keputusan Kebijakan Keselamatan Kerja dan Zero Accident',
    description: 'Kebijakan perusahaan untuk keselamatan kerja dan target zero accident.',
    file: 'SK. Kebijakan Keselamatan Kerja danZero Accident PT WKI.pdf',
    tag: 'Keselamatan',
  },
  {
    title: 'Surat Kebijakan Penanganan Keluhan',
    description: 'Surat kebijakan terkait proses penanganan keluhan yang masuk.',
    file: 'Surat Kebijakan penanganan keluhan.pdf',
    tag: 'Kebijakan',
  },
  {
    title: 'Surat Komitmen Bebas Korupsi dan Penyuapan',
    description: 'Komitmen perusahaan untuk menjalankan praktik kerja bebas korupsi.',
    file: 'Surat Komitmen Bebas Korupsi dan Penyuapan PT WKI.pdf',
    tag: 'Integritas',
  },
]

export default function KebijakanPage() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-[#0B5E8E] text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/WKI_docum_2.jpeg"
            alt=""
            fill
            priority
            className="object-cover object-top opacity-20 blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B5E8E]/95 via-[#0B5E8E]/88 to-[#156f9f]/90" />
        </div>

        <div className="relative max-w-7xl mx-auto px-8 py-20">
          <p className="uppercase tracking-[0.25em] text-white/70 text-xs mb-4">Kebijakan</p>
          <h1 className="text-3xl md:text-5xl font-bold max-w-3xl leading-tight mb-4">Dokumen kebijakan PT. Wijaya Kencana Indonesia</h1>
          <p className="max-w-3xl text-white/85 text-base md:text-lg leading-relaxed">
            Halaman ini menampilkan dokumen-dokumen yang mendukung penerapan keselamatan kerja, kepatuhan, dan pengelolaan lingkungan yang bertanggung jawab.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 py-16">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B5E8E]">Daftar Dokumen</h2>
            <div className="w-16 h-1 bg-[#FF7733] mt-3" />
          </div>
          <p className="text-sm md:text-base text-gray-500 max-w-xl text-right">
            Klik untuk membuka atau mengunduh file PDF yang tersimpan di folder publik situs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {documents.map((document) => {
            const href = `/kebijakan/${encodeURIComponent(document.file)}`

            return (
              <article
                key={document.file}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="bg-[#F3F4F6]">
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#EEF2F7]">
                    <PdfThumbnail src={href} title={document.title} />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-black/10" />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{document.title}</h3>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">{document.description}</p>
                    </div>
                    <span className="inline-flex shrink-0 items-center rounded-full bg-[#EAF4FA] px-3 py-1 text-xs font-semibold text-[#0B5E8E]">
                      {document.tag}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-[#0B5E8E] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#095177]"
                  >
                    Buka PDF
                  </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
