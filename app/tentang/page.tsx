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
            <p className="text-gray-600 leading-relaxed mb-4">
              PT. Wijaya Kencana Indonesia adalah perusahaan yang bergerak di bidang pertambangan dan pengelolaan sumber daya alam. Didirikan dengan visi untuk memberikan kontribusi positif bagi perekonomian nasional dan kesejahteraan masyarakat.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Dengan tim yang berpengalaman dan teknologi terkini, kami berkomitmen untuk menjalankan operasional tambang yang efisien, aman, dan ramah lingkungan.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Perusahaan kami telah mendapatkan berbagai sertifikasi internasional yang membuktikan komitmen kami terhadap standar kualitas, keselamatan, dan lingkungan hidup.
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#0B5E8E] to-[#1a7db8] rounded-xl p-8 text-white">
            <h3 className="text-xl font-semibold mb-6">Data Perusahaan</h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-white/20 pb-3">
                <span className="opacity-80">Nama Perusahaan</span>
                <span className="font-medium">PT. Wijaya Kencana Indonesia</span>
              </div>
              <div className="flex justify-between border-b border-white/20 pb-3">
                <span className="opacity-80">Bidang Usaha</span>
                <span className="font-medium">Pertambangan</span>
              </div>
              <div className="flex justify-between border-b border-white/20 pb-3">
                <span className="opacity-80">Lokasi</span>
                <span className="font-medium">Jakarta, Indonesia</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-80">Status</span>
                <span className="font-medium">Aktif</span>
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
            <p className="text-gray-600 leading-relaxed text-lg italic">
              &quot;Menjadi perusahaan pertambangan terkemuka di Indonesia yang beroperasi secara bertanggung jawab, berkelanjutan, dan memberikan nilai tambah bagi seluruh pemangku kepentingan.&quot;
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-8 border-t-4 border-[#FF7733]">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🚀</span>
              <h3 className="text-2xl font-bold text-[#FF7733]">Misi</h3>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-[#FF7733] font-bold mt-0.5">•</span>
                <span>Mengelola sumber daya alam secara efisien dan bertanggung jawab</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF7733] font-bold mt-0.5">•</span>
                <span>Mengutamakan keselamatan kerja dan kesehatan karyawan</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF7733] font-bold mt-0.5">•</span>
                <span>Menjaga kelestarian lingkungan dalam setiap kegiatan operasional</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF7733] font-bold mt-0.5">•</span>
                <span>Memberikan manfaat nyata bagi masyarakat sekitar wilayah operasi</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF7733] font-bold mt-0.5">•</span>
                <span>Terus berinovasi untuk meningkatkan efisiensi dan produktivitas</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
