import type { Metadata } from 'next'
import Image from 'next/image'
import KegiatanDocumentCard from '@/components/KegiatanDocumentCard'

export const metadata: Metadata = {
  title: 'Kegiatan Lingkungan - PT. Wijaya Kencana Indonesia',
  description: 'Kegiatan pengelolaan dan pemantauan lingkungan PT. Wijaya Kencana Indonesia',
}

const kegiatanLingkungan = [
  {
    title: 'Identifikasi, Pengelolaan, dan Pemantauan Nilai Konservasi Tinggi (NKT/HCV)',
    description:
      'Kegiatan identifikasi Nilai Konservasi Tinggi (NKT/HCV) untuk mengetahui keberadaan kawasan atau atribut yang memiliki nilai ekologis, sosial, maupun budaya yang penting. Hasil identifikasi menjadi dasar penetapan areal lindung/konservasi areal, penyusunan rencana pengelolaan, serta pelaksanaan pemantauan secara berkala untuk memastikan kondisi NKT tetap terjaga dan tidak mengalami penurunan akibat kegiatan operasional.',
  },
  {
    title: 'Pemantauan Dampak Lingkungan',
    description:
      'Kegiatan pemantauan dampak lingkungan sebagai bagian dari pengelolaan dampak kegiatan pemanfaatan hutan. Pemantauan dampak lingkungan yang dilakukan sebagaimana matrik Rencana Pemantauan Lingkungan (RPL) tahun 2015, meliputi: pemantauan erosi tanah, sedimentasi, kualitas air permukaan, debit air permukaan, keanekaragaman jenis tumbuhan, kekayaan jenis dan habitat satwa liar, keanekaragaman jenis biota perairan, kualitas udara, kebisingan, dan kesuburan tanah. Hasil pemantauan dianalisis untuk menilai perubahan kondisi lingkungan, mengevaluasi efektivitas tindakan pengelolaan, dan menjadi dasar pelaksanaan tindakan perbaikan apabila terjadi penyimpangan.',
  },
  {
    title: 'Identifikasi dan Pengelolaan Flora dan Fauna Dilindungi',
    description:
      'Kegiatan identifikasi keberadaan jenis flora dan fauna yang dilindungi, endemik, langka, atau terancam punah di dalam areal kerja. Berdasarkan hasil identifikasi, PT WKI menyusun dan melaksanakan program pengelolaan serta pemantauan, antara lain melalui perlindungan habitat, penetapan zona perlindungan, pembatasan kegiatan pada habitat penting, pemasangan papan informasi, patroli, sosialisasi kepada pekerja dan masyarakat, serta pemantauan populasi dan kondisi habitat secara berkala untuk menjaga kelestarian keanekaragaman hayati.',
  },
  {
    title: 'Pengelolaan Limbah',
    description: 'Kegiatan pengelolaan limbah sebagai bagian dari upaya pencegahan pencemaran lingkungan dan pemenuhan kewajiban pengelolaan lingkungan hidup. Pengelolaan limbah dilakukan sesuai dengan peraturan perundang-undangan yang berlaku melalui penerapan prinsip pengurangan limbah dari sumbernya (reduce), pemanfaatan kembali (reuse), dan daur ulang (recycle) apabila memungkinkan.',
    subItems: [
      'Pengelolaan Limbah Bahan Berbahaya dan Beracun (B3) — pengelolaan limbah B3 yang dihasilkan dari kegiatan operasional melalui identifikasi, penyimpanan di TPS Limbah B3, pencatatan, pelabelan, serta penyerahan kepada pengelola limbah B3 yang memiliki perizinan.',
      'Pengelolaan Sampah Domestik — pengelolaan sampah domestik dari base camp, perkantoran, mess karyawan, dan fasilitas operasional melalui pemilahan, pengumpulan, pengangkutan, dan pembuangan ke fasilitas pengelolaan sampah yang sesuai.',
      'Pengelolaan Tempat Penyimpanan Sementara (TPS) Limbah B3 — pengelolaan TPS Limbah B3 sesuai persyaratan teknis meliputi penyimpanan aman, pelabelan, inspeksi rutin, pencatatan, kesiapsiagaan darurat, dan pemantauan kondisi fasilitas.',
    ],
  },
]

export default function KegiatanLingkunganPage() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-[#0B5E8E] text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/WKI_docum_4.jpeg"
            alt=""
            fill
            priority
            className="object-cover object-top opacity-20 blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B5E8E]/95 via-[#0B5E8E]/88 to-[#156f9f]/90" />
        </div>

        <div className="relative max-w-7xl mx-auto px-8 py-20">
          <p className="uppercase tracking-[0.25em] text-white/70 text-xs mb-4">Kegiatan Perusahaan</p>
          <h1 className="text-3xl md:text-5xl font-bold max-w-3xl leading-tight mb-4">Kegiatan Lingkungan</h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 py-16">
        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed text-justify mb-12">
          <p>
            Dalam melaksanakan kegiatan operasional pemanfaatan hutan, PT WKI bertanggung jawab untuk menjaga kelestarian nilai-nilai lingkungan serta mengelola dampak lingkungan yang timbul akibat kegiatan operasional. Sebagai bentuk implementasi tanggung jawab tersebut, PT WKI melaksanakan berbagai kegiatan pengelolaan dan pemantauan lingkungan, antara lain:
          </p>
        </div>

        <div className="space-y-6">
          {kegiatanLingkungan.map((item, index) => (
            <div key={item.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#4CAF50] text-white font-bold text-sm">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-[#0B5E8E] mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-justify mb-4">{item.description}</p>
                  {item.subItems && (
                    <ul className="space-y-2 text-gray-600">
                      {item.subItems.map((sub) => (
                        <li key={sub} className="flex items-start gap-2 text-justify">
                          <span className="text-[#4CAF50] font-bold mt-0.5">•</span>
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B5E8E]">Ringkasan Pemantauan Lingkungan</h2>
            <div className="w-16 h-1 bg-[#FF7733] mt-3" />
            <p className="mt-4 text-gray-600 max-w-3xl">
              Dokumen ringkasan pemantauan dampak lingkungan PT. Wijaya Kencana Indonesia.
            </p>
          </div>

          <KegiatanDocumentCard
            title="Ringkasan Pemantauan Dampak Lingkungan dan Sosial"
            file="Ringkasan Pemantauan Dampak Lingkungan dan Sosial PT WKI_fix.pdf"
          />
        </div>
      </section>
    </div>
  )
}
