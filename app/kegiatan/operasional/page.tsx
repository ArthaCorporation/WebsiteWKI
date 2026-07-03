import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Kegiatan Operasional - PT. Wijaya Kencana Indonesia',
  description: 'Kegiatan operasional pemanfaatan hasil hutan kayu PT. Wijaya Kencana Indonesia',
}

const tahapanKegiatan = [
  {
    title: 'Penataan Areal Kerja (PAK)',
    description:
      'Kegiatan penataan blok dan petak kerja berdasarkan dokumen rencana kerja (RKUPH dan RKTPH), termasuk pemasangan batas blok dan petak, serta areal yang dikecualikan dari kegiatan pemanenan seperti kawasan lindung. Hasil kegiatan penataan areal kerja menjadi dasar seluruh kegiatan operasional di lapangan.',
  },
  {
    title: 'Inventarisasi Tebangan Sebelum Penebangan (ITSP)',
    description:
      'Kegiatan inventarisasi seluruh pohon pada blok tebangan untuk memperoleh data jenis, diameter, tinggi, posisi pohon, dan taksiran volume kayu. Data tersebut diolah menjadi Laporan Hasil Cruising (LHC) yang digunakan sebagai dasar penetapan target produksi, penyusunan RKTPH, dan perencanaan teknis pemanenan.',
  },
  {
    title: 'Pembukaan Wilayah Hutan (PWH)',
    description:
      'Kegiatan membangun sarana dan prasarana operasional berupa jalan angkutan, jalan cabang, jalan sarad, jembatan, gorong-gorong, dan Tempat Penimbunan Kayu (TPn). Pembangunan dilakukan sesuai desain teknis dengan memperhatikan kaidah Reduced Impact Logging (RIL) agar kerusakan tanah, tegakan tinggal, dan badan air dapat diminimalkan.',
  },
  {
    title: 'Pemanenan (Reduced Impact Logging/RIL)',
    description:
      'Kegiatan pemanenan kayu dengan menerapkan prinsip Reduced Impact Logging (RIL) melalui perencanaan pemanenan, penandaan pohon, perencanaan arah rebah, penataan jalan sarad, penebangan dan penyaradan sesuai kaidah teknis, serta pengawasan pelaksanaan untuk meminimalkan kerusakan tegakan tinggal, tanah, dan lingkungan serta menjamin keberlanjutan fungsi hutan.',
  },
  {
    title: 'Penanaman',
    description:
      'Kegiatan penanaman untuk menjamin keberlanjutan produktivitas hutan, baik melalui pengayaan pada areal yang memerlukan peningkatan kerapatan tegakan maupun rehabilitasi pada areal terbuka atau areal yang mengalami kerusakan. Penanaman dilakukan dengan menggunakan jenis tanaman yang sesuai dengan kondisi tapak dan tujuan pengelolaan hutan serta mengacu pada rencana kerja yang telah disetujui.',
  },
  {
    title: 'Pembinaan Hutan',
    description:
      'Kegiatan pembinaan hutan untuk menjamin keberlanjutan tegakan, antara lain pembebasan pohon binaan, perlindungan permudaan alam, pengayaan apabila diperlukan, pemeliharaan tanaman hasil rehabilitasi, dan kegiatan silvikultur lainnya sesuai kondisi tegakan pasca panen.',
  },
  {
    title: 'Perlindungan dan Pengamanan Hutan',
    description:
      'Kegiatan perlindungan hutan secara berkelanjutan melalui pencegahan dan pengendalian kebakaran hutan, pembalakan liar, perambahan kawasan, perburuan liar, serta gangguan hama dan penyakit tanaman. Kegiatan ini didukung dengan patroli, pemantauan, serta penyediaan sarana pengamanan hutan.',
  },
]

export default function KegiatanOperasionalPage() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-[#0B5E8E] text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/WKI_docum_1.jpeg"
            alt=""
            fill
            priority
            className="object-cover object-top opacity-20 blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B5E8E]/95 via-[#0B5E8E]/88 to-[#156f9f]/90" />
        </div>

        <div className="relative max-w-7xl mx-auto px-8 py-20">
          <p className="uppercase tracking-[0.25em] text-white/70 text-xs mb-4">Kegiatan Perusahaan</p>
          <h1 className="text-3xl md:text-5xl font-bold max-w-3xl leading-tight mb-4">Kegiatan Operasional</h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 py-16">
        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed text-justify mb-12">
          <p>
            Perusahaan PT Wijaya Kencana Indonesia (PT WKI) telah memiliki dokumen rencana kerja jangka panjang berupa RKUPH (10 tahun) dan rencana kerja jangka pendek berupa RKTPH (tahunan) sebagai acuan dalam melaksanakan kegiatan operasional. Perusahaan PT WKI melaksanakan kegiatan Usaha Pemanfaatan Hasil Hutan Kayu Tumbuh Alami (Hutan Alam) dengan menggunakan Sistem Silvikultur Tebang Pilih Tanam Indonesia (TPTI). Adapun tahapan kegiatan yang dilaksanakan oleh PT WKI antara lain:
          </p>
        </div>

        <div className="space-y-6">
          {tahapanKegiatan.map((item, index) => (
            <div key={item.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#0B5E8E] text-white font-bold text-sm">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-[#0B5E8E] mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-justify">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
