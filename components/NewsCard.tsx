import Link from 'next/link'
import Image from 'next/image'

interface NewsCardProps {
  id: string
  title: string
  content: string
  imageUrl?: string
  date: string
}

export default function NewsCard({ id, title, content, imageUrl, date }: NewsCardProps) {
  const excerpt = content.length > 150 ? content.substring(0, 150) + '...' : content
  const formattedDate = new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {imageUrl ? (
        <div className="relative h-48 w-full">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-r from-[#0B5E8E] to-[#1a7db8] flex items-center justify-center">
          <span className="text-white text-4xl">📰</span>
        </div>
      )}
      <div className="p-5">
        <p className="text-sm text-gray-500 mb-2">{formattedDate}</p>
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{excerpt}</p>
        <Link
          href={`/berita/${id}`}
          className="inline-block bg-[#0B5E8E] text-white px-4 py-2 rounded text-sm hover:bg-[#0a527c] transition-colors"
        >
          Baca Selengkapnya
        </Link>
      </div>
    </div>
  )
}
