import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tentang Kami - PT. Wijaya Kencana Indonesia',
  description: 'Profil dan sejarah PT. Wijaya Kencana Indonesia',
}

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
    </div>
  )
}
