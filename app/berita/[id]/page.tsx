import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getBeritaById, getBeritaList } from '@/lib/firestore-server'
import { formatDate } from '@/lib/utils'

export const revalidate = 60

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const article = await getBeritaById(id)
  if (!article) return { title: 'Artikel tidak ditemukan - PT. Wijaya Kencana Indonesia' }

  const description = article.content?.slice(0, 155) ?? ''

  return {
    title: `${article.title} - PT. Wijaya Kencana Indonesia`,
    description,
    openGraph: {
      title: article.title,
      description,
      type: 'article',
      publishedTime: article.date,
      images: article.imageUrl ? [{ url: article.imageUrl }] : [],
    },
  }
}

export default async function BeritaDetailPage({ params }: Props) {
  const { id } = await params
  const [article, allArticles] = await Promise.all([
    getBeritaById(id),
    getBeritaList(),
  ])

  if (!article) notFound()

  const sorted = [...allArticles].sort((a, b) => {
    if (!a.createdAt || !b.createdAt) return 0
    return a.createdAt < b.createdAt ? -1 : 1
  })

  const idx = sorted.findIndex((a) => a.id === id)
  const prevArticle = idx > 0 ? sorted[idx - 1] : null
  const nextArticle = idx < sorted.length - 1 ? sorted[idx + 1] : null

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <Link
        href="/berita"
        className="text-[#0B5E8E] hover:underline text-sm mb-8 inline-block font-medium"
      >
        ← Kembali ke Berita
      </Link>

      {article.imageUrl ? (
        <div className="relative w-full mb-8 rounded-xl overflow-hidden max-h-[500px]">
          <Image
            src={article.imageUrl}
            alt={article.title}
            width={896}
            height={500}
            className="w-full object-cover rounded-xl max-h-[500px]"
          />
        </div>
      ) : (
        <div
          className="w-full mb-8 rounded-xl bg-gradient-to-r from-[#0B5E8E] to-[#FF7733] flex items-center justify-center"
          style={{ height: '300px' }}
        >
          <span className="text-white text-7xl">📰</span>
        </div>
      )}

      <h1 className="text-3xl font-bold text-[#0B5E8E] mb-3">{article.title}</h1>
      <div className="w-16 h-1 bg-[#FF7733] mb-4" />

      <div className="flex items-center gap-2 text-gray-500 mb-8">
        <span>📅</span>
        <span>{article.date ? formatDate(article.date) : ''}</span>
      </div>

      <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap mb-12">
        {article.content}
      </div>

      <hr className="border-gray-200 mb-8" />

      <div className="flex justify-between gap-4">
        <div>
          {prevArticle && (
            <Link
              href={`/berita/${prevArticle.id}`}
              className="flex items-center gap-2 px-6 py-3 bg-[#0B5E8E] text-white rounded-lg hover:bg-[#0a4f78] transition-colors"
            >
              <span>←</span>
              <div>
                <div className="text-xs opacity-75">Artikel Sebelumnya</div>
                <div className="font-semibold text-sm line-clamp-1">{prevArticle.title}</div>
              </div>
            </Link>
          )}
        </div>
        <div>
          {nextArticle && (
            <Link
              href={`/berita/${nextArticle.id}`}
              className="flex items-center gap-2 px-6 py-3 bg-[#FF7733] text-white rounded-lg hover:bg-[#e8662a] transition-colors"
            >
              <div className="text-right">
                <div className="text-xs opacity-75">Artikel Berikutnya</div>
                <div className="font-semibold text-sm line-clamp-1">{nextArticle.title}</div>
              </div>
              <span>→</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
