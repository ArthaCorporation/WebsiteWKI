import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PdfThumbnail from '@/components/PdfThumbnail'

export const metadata: Metadata = {
  title: 'Sertifikat - PT. Wijaya Kencana Indonesia',
  description: 'Sertifikat Pengelolaan Hutan Lestari (PHL) PT. Wijaya Kencana Indonesia',
}

const certificateFile = 'Sertifikat PHL PT WKI.pdf'

export default function SertifikatPage() {
  const href = `/${encodeURIComponent(certificateFile)}`

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-[#0B5E8E] text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/WKI_docum_3.jpeg"
            alt=""
            fill
            priority
            className="object-cover object-top opacity-20 blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B5E8E]/95 via-[#0B5E8E]/88 to-[#156f9f]/90" />
        </div>

        <div className="relative max-w-7xl mx-auto px-8 py-20">
          <p className="uppercase tracking-[0.25em] text-white/70 text-xs mb-4">Sertifikat</p>
          <h1 className="text-3xl md:text-5xl font-bold max-w-3xl leading-tight mb-4">Sertifikat PHL PT. Wijaya Kencana Indonesia</h1>
          <p className="max-w-3xl text-white/85 text-base md:text-lg leading-relaxed">
            Dokumen sertifikasi Pengelolaan Hutan Lestari (PHL) yang menunjukkan komitmen perusahaan terhadap pengelolaan hutan yang bertanggung jawab.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 py-16">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B5E8E]">Sertifikat PHL</h2>
            <div className="w-16 h-1 bg-[#FF7733] mt-3" />
          </div>
        </div>

        <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg max-w-xl">
          <div className="bg-[#F3F4F6]">
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#EEF2F7]">
              <PdfThumbnail src={href} title="Sertifikat PHL PT WKI" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-black/10" />
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Sertifikat PHL PT WKI</h3>
            <p className="text-sm text-gray-500 mb-4">
              Sertifikat Pengelolaan Hutan Lestari PT. Wijaya Kencana Indonesia.
            </p>
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-[#0B5E8E] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#095177]"
            >
              Buka PDF
            </Link>
          </div>
        </article>
      </section>
    </div>
  )
}
