'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [tentangOpen, setTentangOpen] = useState(false)
  const [keberlanjutanOpen, setKeberlanjutanOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  return (
    <nav className="relative w-full h-[90px] bg-[#0B5E8E] overflow-visible z-50">
      {/* Orange section with diagonal cut */}
      <div
        className="absolute top-0 left-0 h-full bg-[#FF7733]"
        style={{
          width: '42%',
          clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0 100%)',
        }}
      />

      <div className="relative flex justify-between items-center h-full max-w-[1400px] mx-auto px-8 z-10">
        {/* Left: Logo + Company Name */}
        <Link href="/" className="flex items-center gap-4 no-underline">
          <div className="bg-white p-2 rounded shadow-md">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="22" width="8" height="14" fill="#0B5E8E" rx="1"/>
              <rect x="16" y="12" width="8" height="24" fill="#0B5E8E" rx="1"/>
              <rect x="28" y="17" width="8" height="19" fill="#0B5E8E" rx="1"/>
            </svg>
          </div>
          <span className="text-white font-serif text-xl font-light tracking-wide text-shadow">
            PT. Wijaya Kencana Indonesia
          </span>
        </Link>

        {/* Right: Navigation Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <Link
            href="/"
            className={`text-white text-sm font-medium tracking-wide hover:opacity-80 transition-opacity pb-1 ${isActive('/') ? 'border-b-2 border-white' : ''}`}
          >
            BERANDA
          </Link>

          {/* Tentang Kami Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setTentangOpen(true)}
            onMouseLeave={() => setTentangOpen(false)}
          >
            <div className={`flex items-center gap-1 text-white text-sm font-medium tracking-wide cursor-pointer hover:opacity-80 transition-opacity pb-1 ${(isActive('/tentang')) ? 'border-b-2 border-white' : ''}`}>
              TENTANG KAMI
              <svg className={`w-3 h-3 transition-transform duration-300 ${tentangOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            {tentangOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded shadow-xl min-w-[220px] py-2 z-50 animate-fade-in">
                <Link href="/tentang" className="block px-6 py-3 text-gray-700 text-sm hover:bg-gray-50 hover:text-[#0B5E8E] hover:border-l-4 hover:border-[#0B5E8E] transition-all">
                  Profil Perusahaan
                </Link>
                <Link href="/tentang#visi-misi" className="block px-6 py-3 text-gray-700 text-sm hover:bg-gray-50 hover:text-[#0B5E8E] hover:border-l-4 hover:border-[#0B5E8E] transition-all">
                  Visi &amp; Misi
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/berita"
            className={`text-white text-sm font-medium tracking-wide hover:opacity-80 transition-opacity pb-1 ${isActive('/berita') ? 'border-b-2 border-white' : ''}`}
          >
            BERITA
          </Link>

          {/* Keberlanjutan Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setKeberlanjutanOpen(true)}
            onMouseLeave={() => setKeberlanjutanOpen(false)}
          >
            <div className={`flex items-center gap-1 text-white text-sm font-medium tracking-wide cursor-pointer hover:opacity-80 transition-opacity pb-1 ${isActive('/keberlanjutan') ? 'border-b-2 border-white' : ''}`}>
              KEBERLANJUTAN PERUSAHAAN
              <svg className={`w-3 h-3 transition-transform duration-300 ${keberlanjutanOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            {keberlanjutanOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded shadow-xl min-w-[220px] py-2 z-50 animate-fade-in">
                <Link href="/keberlanjutan" className="block px-6 py-3 text-gray-700 text-sm hover:bg-gray-50 hover:text-[#0B5E8E] hover:border-l-4 hover:border-[#0B5E8E] transition-all">
                  Kebijakan Lingkungan
                </Link>
                <Link href="/keberlanjutan#sertifikasi" className="block px-6 py-3 text-gray-700 text-sm hover:bg-gray-50 hover:text-[#0B5E8E] hover:border-l-4 hover:border-[#0B5E8E] transition-all">
                  Sertifikasi
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/kontak"
            className={`text-white text-sm font-medium tracking-wide hover:opacity-80 transition-opacity pb-1 ${isActive('/kontak') ? 'border-b-2 border-white' : ''}`}
          >
            HUBUNGI KAMI
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer z-10"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className="w-6 h-0.5 bg-white rounded block transition-all" />
          <span className="w-6 h-0.5 bg-white rounded block transition-all" />
          <span className="w-6 h-0.5 bg-white rounded block transition-all" />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-[90px] left-0 w-full bg-[#0B5E8E] z-40 shadow-lg">
          <div className="flex flex-col py-4">
            <Link href="/" className="text-white px-8 py-3 hover:bg-[#0a527c] text-sm font-medium" onClick={() => setMobileOpen(false)}>BERANDA</Link>
            <Link href="/tentang" className="text-white px-8 py-3 hover:bg-[#0a527c] text-sm font-medium" onClick={() => setMobileOpen(false)}>TENTANG KAMI</Link>
            <Link href="/tentang" className="text-white px-12 py-2 hover:bg-[#0a527c] text-xs opacity-80" onClick={() => setMobileOpen(false)}>— Profil Perusahaan</Link>
            <Link href="/tentang#visi-misi" className="text-white px-12 py-2 hover:bg-[#0a527c] text-xs opacity-80" onClick={() => setMobileOpen(false)}>— Visi &amp; Misi</Link>
            <Link href="/berita" className="text-white px-8 py-3 hover:bg-[#0a527c] text-sm font-medium" onClick={() => setMobileOpen(false)}>BERITA</Link>
            <Link href="/keberlanjutan" className="text-white px-8 py-3 hover:bg-[#0a527c] text-sm font-medium" onClick={() => setMobileOpen(false)}>KEBERLANJUTAN PERUSAHAAN</Link>
            <Link href="/keberlanjutan" className="text-white px-12 py-2 hover:bg-[#0a527c] text-xs opacity-80" onClick={() => setMobileOpen(false)}>— Kebijakan Lingkungan</Link>
            <Link href="/keberlanjutan#sertifikasi" className="text-white px-12 py-2 hover:bg-[#0a527c] text-xs opacity-80" onClick={() => setMobileOpen(false)}>— Sertifikasi</Link>
            <Link href="/kontak" className="text-white px-8 py-3 hover:bg-[#0a527c] text-sm font-medium" onClick={() => setMobileOpen(false)}>HUBUNGI KAMI</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
