import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Keberlanjutan Perusahaan - PT. Wijaya Kencana Indonesia',
  description: 'Komitmen PT. Wijaya Kencana Indonesia terhadap keberlanjutan dan lingkungan',
}

export default function KeberlanjutanPage() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      <h1 className="text-4xl font-bold text-[#0B5E8E] mb-2">Keberlanjutan Perusahaan</h1>
      <div className="w-16 h-1 bg-[#FF7733] mb-8" />

      {/* Kebijakan Lingkungan */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Kebijakan Lingkungan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-b-4 border-[#4CAF50]">
            <span className="text-4xl block mb-4">🌱</span>
            <h3 className="font-semibold text-gray-800 mb-2">Reklamasi Lahan</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Kami berkomitmen untuk melakukan reklamasi dan revegetasi pada setiap lahan yang telah selesai dieksploitasi, mengembalikan fungsi ekosistem secara bertahap.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-b-4 border-[#0B5E8E]">
            <span className="text-4xl block mb-4">💧</span>
            <h3 className="font-semibold text-gray-800 mb-2">Pengelolaan Air</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Sistem pengelolaan air limbah tambang yang ketat memastikan tidak ada pencemaran terhadap sumber air bersih di sekitar area operasional kami.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-b-4 border-[#FF7733]">
            <span className="text-4xl block mb-4">🌬️</span>
            <h3 className="font-semibold text-gray-800 mb-2">Pengendalian Emisi</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Implementasi teknologi terkini untuk meminimalkan emisi gas buang dan debu dari kegiatan pertambangan, demi menjaga kualitas udara tetap bersih.
            </p>
          </div>
        </div>

        <div className="bg-[#f0f9f0] border border-[#4CAF50] rounded-xl p-8">
          <h3 className="text-xl font-semibold text-[#2d6a4f] mb-4">Komitmen Lingkungan Kami</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
            <div className="flex items-start gap-3">
              <span className="text-[#4CAF50] font-bold text-lg">✓</span>
              <p>Mematuhi seluruh regulasi lingkungan yang berlaku di Indonesia</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#4CAF50] font-bold text-lg">✓</span>
              <p>Mengurangi konsumsi energi fosil sebesar 30% pada tahun 2030</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#4CAF50] font-bold text-lg">✓</span>
              <p>Mencapai zero net deforestation dalam area konsesi</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#4CAF50] font-bold text-lg">✓</span>
              <p>Net-zero emissions pada tahun 2040</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sertifikasi */}
      <section id="sertifikasi" className="scroll-mt-24">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sertifikasi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { code: 'ISO 14001:2015', name: 'Sistem Manajemen Lingkungan', year: '2020' },
            { code: 'ISO 9001:2015', name: 'Sistem Manajemen Mutu', year: '2019' },
            { code: 'ISO 45001:2018', name: 'Sistem Manajemen K3', year: '2021' },
            { code: 'PROPER', name: 'Program Penilaian Peringkat Kinerja Lingkungan', year: '2023' },
            { code: 'SMK3', name: 'Sistem Manajemen Keselamatan dan Kesehatan Kerja', year: '2022' },
            { code: 'ISPO', name: 'Indonesian Sustainable Palm Oil', year: '2023' },
          ].map((cert) => (
            <div key={cert.code} className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4">
              <div className="bg-[#0B5E8E] text-white rounded-lg p-3 flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">{cert.code}</h4>
                <p className="text-gray-600 text-sm mt-1">{cert.name}</p>
                <p className="text-[#0B5E8E] text-xs mt-2 font-medium">Diperoleh: {cert.year}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
