import Link from 'next/link'
import PdfThumbnail from '@/components/PdfThumbnail'

type KegiatanDocumentCardProps = {
  title: string
  description?: string
  file: string
}

function kegiatanFileHref(file: string) {
  return `/kegiatan/${file.split('/').map((segment) => encodeURIComponent(segment)).join('/')}`
}

export default function KegiatanDocumentCard({ title, description, file }: KegiatanDocumentCardProps) {
  const href = kegiatanFileHref(file)

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg max-w-xl">
      <div className="bg-[#F3F4F6]">
        <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#EEF2F7]">
          <PdfThumbnail src={href} title={title} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-black/10" />
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        {description && <p className="text-sm text-gray-500 mb-4">{description}</p>}
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
  )
}
