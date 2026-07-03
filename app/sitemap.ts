import type { MetadataRoute } from 'next'
import { getBeritaList } from '@/lib/firestore-server'

const BASE_URL = 'https://wki-poleko.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const beritaList = await getBeritaList()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE_URL}/tentang`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
    { url: `${BASE_URL}/berita`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/kebijakan`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
    { url: `${BASE_URL}/kegiatan/operasional`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
    { url: `${BASE_URL}/kegiatan/lingkungan`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
    { url: `${BASE_URL}/kegiatan/sosial`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
    { url: `${BASE_URL}/sertifikat`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
    { url: `${BASE_URL}/kontak`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
  ]

  const beritaPages: MetadataRoute.Sitemap = beritaList.map((article) => ({
    url: `${BASE_URL}/berita/${article.id}`,
    lastModified: article.date ? new Date(article.date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...beritaPages]
}
