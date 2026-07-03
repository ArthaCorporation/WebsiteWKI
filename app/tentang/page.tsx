import type { Metadata } from 'next'
import Link from 'next/link'
import PdfThumbnail from '@/components/PdfThumbnail'

export const metadata: Metadata = {
  title: 'Tentang Kami - PT. Wijaya Kencana Indonesia',
  description: 'Profil dan sejarah PT. Wijaya Kencana Indonesia',
}

const strukturOrganisasiFile = 'Struktur Organisasi PT WKI 2025.pdf'

export default function TentangPage() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      {/* Profil Perusahaan */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-[#0B5E8E] mb-2">Tentang Kami</h1>
        <div className="w-16 h-1 bg-[#FF7733] mb-8" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profil Perusahaan</h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-justify">
              PT. Wijaya Kencana Indonesia mendapat kepercayaan untuk memanfaatkan hasil hutan kayu berdasarkan Surat Keputusan Kepala Badan Koordinasi Penanaman Modal Nomor : 21/IUPHHK-HA/PMDN/2016 tanggal 18 Oktober 2016, tentang pemberian Izin Usaha Pemanfaatan Hasil Hutan Kayu Dalam Hutan Alam (IUPHHK-HA) kepada PT. Wijaya Kencana Indonesia, atas areal seluas ± 38.695 Hektar yang berlokasi di Kabupaten Halmahera Selatan Provinsi Maluku Utara. Selanjutnya berdasarkan Surat Keputusan Menteri Lingkungan Hidup dan Kehutanan Republik Indonesia Nomor : SK.918/MENLHK/SETJEN/HPL.0/10/2021 tanggal 13 Oktober 2021, PT. Wijaya Kencana Indonesia berubah menjadi Perizinan Berusaha Pemanfaatan Hutan  (PBPH).
            </p>
            <p className="text-gray-600 leading-relaxed mb-4 text-justify">
              PT. Wijaya Kencana Indonesia adalah Perusahaan Perizinan Berusaha Pemanfaatan Hutan (PBPH) dengan jenis kegiatan yang dilaksanakan berupa pemanfaatan hasil hutan kayu tumbuh alami (Hutan Alam), dengan system Silvikultur yang diterapkan adalah Tebang Pilih Tanam Indonesia (TPTI).
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#0B5E8E] to-[#1a7db8] rounded-xl p-8 text-white h-fit shadow-lg">
            <h3 className="text-2xl font-semibold mb-8">Data Perusahaan</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-2 sm:gap-6 border-b border-white/20 pb-4">
                <span className="opacity-80 text-sm sm:text-base">Nama Perusahaan</span>
                <span className="font-medium sm:text-right">PT. Wijaya Kencana Indonesia</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-2 sm:gap-6 border-b border-white/20 pb-4">
                <span className="opacity-80 text-sm sm:text-base">Bidang Usaha</span>
                <span className="font-medium sm:text-right leading-relaxed">Pemanfaatan Hasil Hutan Kayu Tumbuh Alami (Hutan Alam)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-2 sm:gap-6 border-b border-white/20 pb-4">
                <span className="opacity-80 text-sm sm:text-base">Lokasi</span>
                <span className="font-medium sm:text-right leading-relaxed">Desa Sosepe, Kabupaten Halmahera Selatan, Provinsi Maluku Utara</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-2 sm:gap-6">
                <span className="opacity-80 text-sm sm:text-base">Status</span>
                <span className="font-medium sm:text-right">Aktif</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section id="visi-misi" className="scroll-mt-24">
        <h2 className="text-3xl font-bold text-[#0B5E8E] mb-2">Visi &amp; Misi</h2>
        <div className="w-16 h-1 bg-[#FF7733] mb-8" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-8 border-t-4 border-[#0B5E8E]">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🎯</span>
              <h3 className="text-2xl font-bold text-[#0B5E8E]">Visi</h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg italic text-justify">
              &quot;Menjadi perusahaan PBPH-HA terkemuka dengan mengedepankan profesionalisme usaha kelestarian hutan serta penerapan teknologi yang sesuai, guna diperoleh manfaat yang sebesar-besarnya bagi perusahaan, karyawan maupun masyarakat disekitar hutan.&quot;
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-8 border-t-4 border-[#FF7733]">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🚀</span>
              <h3 className="text-2xl font-bold text-[#FF7733]">Misi</h3>
            </div>
            <ul className="space-y-3 text-gray-600 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-[#FF7733] font-bold mt-0.5">•</span>
                <span>Meningkatkan dan mengembangkan unit usaha dibidang kehutanan secara optimal yang berbasis pada kelestarian sumber daya hutan dan lingkungan.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF7733] font-bold mt-0.5">•</span>
                <span>Mengelola unit usaha kehutanan (PBPH-HA) secara professional guna meningkatkan efisiensi dan pendapatan.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF7733] font-bold mt-0.5">•</span>
                <span>Melaksanakan kegiatan pengusahaan hutan berdasarkan kaidah-kaidah pengelolaan hutan prodüksi lestari (PHPL) sehingga mendapatkan sertifikat PHPL.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF7733] font-bold mt-0.5">•</span>
                <span>Meningkatkan kesejahteraan karyawan dan masyarakat sekitar hutan secara proporsional.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF7733] font-bold mt-0.5">•</span>
                <span>Berperan serta dalam meningkatkan pembangunan perekonomian daerah dan nasional. </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Struktur Organisasi */}
      <section id="struktur-organisasi" className="scroll-mt-24 mt-16">
        <h2 className="text-3xl font-bold text-[#0B5E8E] mb-2">Struktur Organisasi</h2>
        <div className="w-16 h-1 bg-[#FF7733] mb-8" />

        <p className="text-gray-600 leading-relaxed text-justify mb-8 max-w-3xl">
          Berikut adalah bagan struktur organisasi PT. Wijaya Kencana Indonesia tahun 2025.
        </p>

        <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg max-w-2xl">
          <div className="bg-[#F3F4F6]">
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#EEF2F7]">
              <PdfThumbnail src={`/${encodeURIComponent(strukturOrganisasiFile)}`} title="Struktur Organisasi PT WKI 2025" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-black/10" />
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Bagan Struktur Organisasi 2025</h3>
            <p className="text-sm text-gray-500 mb-4">
              Struktur organisasi resmi PT. Wijaya Kencana Indonesia.
            </p>
            <Link
              href={`/${encodeURIComponent(strukturOrganisasiFile)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-[#0B5E8E] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#095177]"
            >
              Buka PDF
            </Link>
          </div>
        </article>
      </section>
    </div>
  )
}
