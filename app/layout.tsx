import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'PT. Wijaya Kencana Indonesia',
  description: 'Website resmi PT. Wijaya Kencana Indonesia - Perusahaan Pertambangan Terpercaya',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <footer className="bg-[#0B5E8E] text-white mt-auto">
          <div className="max-w-7xl mx-auto px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">PT. Wijaya Kencana Indonesia</h3>
                <p className="text-sm opacity-80 leading-relaxed">
                  Perusahaan pertambangan terpercaya yang berkomitmen terhadap keberlanjutan dan inovasi.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Navigasi</h3>
                <ul className="space-y-2 text-sm opacity-80">
                  <li><Link href="/" className="hover:opacity-100 transition-opacity">Beranda</Link></li>
                  <li><Link href="/tentang" className="hover:opacity-100 transition-opacity">Tentang Kami</Link></li>
                  <li><Link href="/berita" className="hover:opacity-100 transition-opacity">Berita</Link></li>
                  <li><Link href="/keberlanjutan" className="hover:opacity-100 transition-opacity">Keberlanjutan</Link></li>
                  <li><Link href="/kontak" className="hover:opacity-100 transition-opacity">Hubungi Kami</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Kontak</h3>
                <p className="text-sm opacity-80 leading-relaxed">
                  Jl. Contoh No. 123<br />
                  Jakarta, Indonesia<br />
                  Email: info@wki.co.id<br />
                  Tel: +62 21 1234 5678
                </p>
              </div>
            </div>
            <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm opacity-60">
              © {new Date().getFullYear()} PT. Wijaya Kencana Indonesia. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
