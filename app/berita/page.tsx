import type { Metadata } from 'next'
import NewsCard from '@/components/NewsCard'

export const metadata: Metadata = {
  title: 'Berita - PT. Wijaya Kencana Indonesia',
  description: 'Berita terkini dari PT. Wijaya Kencana Indonesia',
}

const placeholderNews = [
  {
    id: '1',
    title: 'PT. Wijaya Kencana Indonesia Raih Penghargaan Tambang Berkelanjutan 2024',
    content: 'PT. Wijaya Kencana Indonesia berhasil meraih penghargaan bergengsi dalam kategori pertambangan berkelanjutan pada ajang penghargaan nasional tahun ini. Penghargaan ini merupakan bukti nyata komitmen perusahaan terhadap praktik pertambangan yang bertanggung jawab.',
    imageUrl: '',
    date: '2024-12-15',
    slug: 'penghargaan-tambang-berkelanjutan-2024',
  },
  {
    id: '2',
    title: 'Program CSR: Pemberdayaan Masyarakat di Sekitar Area Tambang',
    content: 'Sebagai wujud tanggung jawab sosial perusahaan, PT. Wijaya Kencana Indonesia meluncurkan program pemberdayaan masyarakat yang mencakup pelatihan keterampilan, beasiswa pendidikan, dan pengembangan infrastruktur desa di sekitar area operasional tambang.',
    imageUrl: '',
    date: '2024-11-20',
    slug: 'program-csr-pemberdayaan-masyarakat',
  },
  {
    id: '3',
    title: 'Implementasi Teknologi Hijau dalam Operasional Pertambangan',
    content: 'PT. Wijaya Kencana Indonesia terus berinovasi dengan mengimplementasikan teknologi ramah lingkungan dalam setiap aspek operasional pertambangan. Langkah ini bertujuan untuk meminimalkan dampak lingkungan sekaligus meningkatkan efisiensi produksi.',
    imageUrl: '',
    date: '2024-10-05',
    slug: 'teknologi-hijau-pertambangan',
  },
]

export default function BeritaPage() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      <h1 className="text-4xl font-bold text-[#0B5E8E] mb-2">Berita</h1>
      <div className="w-16 h-1 bg-[#FF7733] mb-4" />
      <p className="text-gray-600 mb-10">Informasi terkini dari PT. Wijaya Kencana Indonesia</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {placeholderNews.map((news) => (
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

      <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-[#0B5E8E] text-sm">
          <strong>Catatan:</strong> Konten berita di atas adalah placeholder. Setelah Firebase dikonfigurasi, berita akan dimuat secara dinamis dari Firestore.
        </p>
      </div>
    </div>
  )
}
