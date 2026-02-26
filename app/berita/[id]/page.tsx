import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Detail Berita - PT. Wijaya Kencana Indonesia',
}

const placeholderNews: Record<string, { title: string; content: string; date: string }> = {
  '1': {
    title: 'PT. Wijaya Kencana Indonesia Raih Penghargaan Tambang Berkelanjutan 2024',
    content: `PT. Wijaya Kencana Indonesia berhasil meraih penghargaan bergengsi dalam kategori pertambangan berkelanjutan pada ajang penghargaan nasional tahun ini.

Penghargaan ini merupakan bukti nyata komitmen perusahaan terhadap praktik pertambangan yang bertanggung jawab. Dalam acara yang dihadiri oleh lebih dari 500 pelaku industri dan pejabat pemerintah ini, PT. Wijaya Kencana Indonesia dinilai unggul dalam berbagai aspek.

Kriteria penilaian meliputi pengelolaan limbah, reklamasi lahan pasca tambang, program pemberdayaan masyarakat sekitar, dan implementasi teknologi ramah lingkungan. PT. Wijaya Kencana Indonesia berhasil meraih nilai tertinggi di antara seluruh peserta.

Direktur Utama PT. Wijaya Kencana Indonesia menyatakan bahwa penghargaan ini menjadi motivasi tambahan bagi seluruh tim untuk terus meningkatkan standar operasional dan dampak positif bagi lingkungan serta masyarakat.`,
    date: '2024-12-15',
  },
  '2': {
    title: 'Program CSR: Pemberdayaan Masyarakat di Sekitar Area Tambang',
    content: `Sebagai wujud tanggung jawab sosial perusahaan, PT. Wijaya Kencana Indonesia meluncurkan program pemberdayaan masyarakat yang komprehensif.

Program ini mencakup berbagai inisiatif strategis yang dirancang untuk memberikan dampak jangka panjang bagi komunitas lokal. Melalui pelatihan keterampilan vokasional, masyarakat sekitar area tambang mendapatkan akses kepada berbagai keterampilan yang relevan dengan kebutuhan pasar kerja.

Selain itu, program beasiswa pendidikan yang kami kelola telah memberikan kesempatan kepada lebih dari 200 putra-putri daerah untuk mengakses pendidikan berkualitas. Pengembangan infrastruktur desa juga menjadi prioritas, dengan pembangunan fasilitas air bersih dan akses jalan.`,
    date: '2024-11-20',
  },
  '3': {
    title: 'Implementasi Teknologi Hijau dalam Operasional Pertambangan',
    content: `PT. Wijaya Kencana Indonesia terus berinovasi dengan mengimplementasikan teknologi ramah lingkungan dalam setiap aspek operasional pertambangan.

Inovasi terbaru mencakup penggunaan kendaraan tambang berbahan bakar hidrogen, sistem pengelolaan air limbah dengan teknologi biofiltasi terkini, dan panel surya untuk memenuhi kebutuhan energi fasilitas operasional.

Langkah-langkah ini tidak hanya mengurangi emisi karbon secara signifikan, tetapi juga terbukti meningkatkan efisiensi operasional dan mengurangi biaya jangka panjang. Investasi dalam teknologi hijau ini sejalan dengan target perusahaan untuk mencapai net-zero emissions pada tahun 2040.`,
    date: '2024-10-05',
  },
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function BeritaDetailPage({ params }: PageProps) {
  const { id } = await params
  const news = placeholderNews[id]

  if (!news) {
    return (
      <div className="max-w-4xl mx-auto px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Berita tidak ditemukan</h1>
        <Link href="/berita" className="text-[#0B5E8E] hover:underline">← Kembali ke Berita</Link>
      </div>
    )
  }

  const formattedDate = new Date(news.date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      <Link href="/berita" className="text-[#0B5E8E] hover:underline text-sm mb-8 inline-block">← Kembali ke Berita</Link>
      
      <div className="bg-white rounded-xl shadow-md p-8">
        <p className="text-gray-500 text-sm mb-3">{formattedDate}</p>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{news.title}</h1>
        
        <div className="h-64 bg-gradient-to-r from-[#0B5E8E] to-[#1a7db8] rounded-lg mb-8 flex items-center justify-center">
          <span className="text-white text-6xl">📰</span>
        </div>
        
        <div className="prose prose-lg max-w-none">
          {news.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-gray-600 leading-relaxed mb-4">{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
