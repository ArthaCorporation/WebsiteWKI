'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface Article {
  id: string
  title: string
  content: string
  imageUrl?: string
  date: string
  slug?: string
  createdAt?: { seconds: number; nanoseconds: number } | null
}

const formatDate = (dateStr: string) => {
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
  ]
  const date = new Date(dateStr)
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}

export default function BeritaDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [article, setArticle] = useState<Article | null>(null)
  const [prevArticle, setPrevArticle] = useState<Article | null>(null)
  const [nextArticle, setNextArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let cancelled = false

    const fetchData = async () => {
      try {
        const docRef = doc(db, 'berita', id)
        const docSnap = await getDoc(docRef)

        if (cancelled) return

        if (!docSnap.exists()) {
          setNotFound(true)
          setLoading(false)
          return
        }

        const current: Article = { id: docSnap.id, ...(docSnap.data() as Omit<Article, 'id'>) }
        setArticle(current)

        const q = query(collection(db, 'berita'), orderBy('createdAt', 'asc'))
        const snapshot = await getDocs(q)

        if (cancelled) return

        const all: Article[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Article, 'id'>),
        }))

        const idx = all.findIndex((a) => a.id === id)
        setPrevArticle(idx > 0 ? all[idx - 1] : null)
        setNextArticle(idx < all.length - 1 ? all[idx + 1] : null)
      } catch (err) {
        if (cancelled) return
        console.error('Error fetching article:', err)
        setNotFound(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()

    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B5E8E]"></div>
      </div>
    )
  }

  if (notFound || !article) {
    return (
      <div className="max-w-4xl mx-auto px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-600">Artikel tidak ditemukan</h1>
        <Link href="/berita" className="text-[#0B5E8E] hover:underline mt-4 inline-block">
          ← Kembali ke Berita
        </Link>
      </div>
    )
  }

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
        <div className="w-full mb-8 rounded-xl bg-gradient-to-r from-[#0B5E8E] to-[#FF7733] flex items-center justify-center" style={{ height: '300px' }}>
          <span className="text-white text-7xl">📰</span>
        </div>
      )}

      <h1 className="text-3xl font-bold text-[#0B5E8E] mb-3">{article.title}</h1>
      <div className="w-16 h-1 bg-[#FF7733] mb-4" />

      <div className="flex items-center gap-2 text-gray-500 mb-8">
        <span>📅</span>
        <span>{formatDate(article.date)}</span>
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
