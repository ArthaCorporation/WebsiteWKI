import type { Metadata } from 'next'
import { getBeritaList } from '@/lib/firestore-server'
import NewsCard from '@/components/NewsCard'

export const metadata: Metadata = {
  title: 'Berita - PT. Wijaya Kencana Indonesia',
  description: 'Informasi terkini dari PT. Wijaya Kencana Indonesia — perusahaan pemanfaatan hasil hutan kayu di Halmahera Selatan, Maluku Utara.',
  openGraph: {
    title: 'Berita - PT. Wijaya Kencana Indonesia',
    description: 'Informasi terkini dari PT. Wijaya Kencana Indonesia.',
    type: 'website',
  },
}

export const revalidate = 60

export default async function BeritaPage() {
  const beritaList = await getBeritaList()

  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      <h1 className="text-4xl font-bold text-[#0B5E8E] mb-2">Berita</h1>
      <div className="w-16 h-1 bg-[#FF7733] mb-4" />
      <p className="text-gray-600 mb-10">Informasi terkini dari PT. Wijaya Kencana Indonesia</p>

      {beritaList.length === 0 ? (
        <p className="text-gray-500">Belum ada berita.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beritaList.map((news) => (
            <NewsCard
              key={news.id}
              id={news.id}
              title={news.title}
              content={news.content}
              imageUrl={news.imageUrl}
              date={news.date}
            />
          ))}
        </div>
      )}
    </div>
  )
}
