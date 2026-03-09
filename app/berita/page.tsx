'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import NewsCard from '@/components/NewsCard'

interface BeritaItem {
  id: string
  title: string
  content: string
  imageUrl: string
  date: string
  slug: string
}

export default function BeritaPage() {
  const [beritaList, setBeritaList] = useState<BeritaItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const q = query(collection(db, 'berita'), orderBy('createdAt', 'desc'))
        const snapshot = await getDocs(q)
        const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as BeritaItem))
        setBeritaList(items)
      } catch (err) {
        console.error('Error fetching berita:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBerita()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B5E8E]"></div>
      </div>
    )
  }

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
