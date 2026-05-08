'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [tentangOpen, setTentangOpen] = useState(false)
  const [keberlanjutanOpen, setKeberlanjutanOpen] = useState(false)
  const [mobileTentangOpen, setMobileTentangOpen] = useState(false)
  const [mobileKeberlanjutanOpen, setMobileKeberlanjutanOpen] = useState(false)

  const closeMobileMenu = () => {
    setMobileOpen(false)
    setMobileTentangOpen(false)
    setMobileKeberlanjutanOpen(false)
  }

  const isActive = (path: string) => pathname === path

  const navLinkClass = (path: string) =>
    `text-white text-sm font-medium tracking-wide transition-all pb-1 px-2 py-1 rounded hover:bg-white/20 active:bg-white/30 ${isActive(path) ? 'border-b-2 border-white' : ''}`

  return (
    <nav className="relative w-full h-[90px] bg-[#0B5E8E] overflow-visible z-50">
      {/* Orange section - full width on mobile, diagonal on desktop */}
      <div className="absolute top-0 left-0 h-full bg-[#FF7733] w-full lg:hidden" />
      <div
        className="hidden lg:block absolute top-0 left-0 h-full bg-[#FF7733]"
        style={{
          width: '42%',
          clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0 100%)',
        }}
      />

      <div className="relative flex justify-between items-center h-full max-w-[1400px] mx-auto px-8 z-10">
        {/* Left: Logo + Company Name */}
        <Link href="/" className="flex items-center gap-4 no-underline">
          <div className="bg-white p-1.5 rounded shadow-md flex items-center justify-center h-[60px] w-[60px]">
            <Image 
              src="/images/WKI_logo.png" 
              alt="PT. Wijaya Kencana Indonesia Logo"
              width={50}
              height={50}
              className="h-full w-auto object-contain"
            />
          </div>
          <span className="text-white font-serif text-xl font-light tracking-wide text-shadow">
            PT. Wijaya Kencana Indonesia
          </span>
        </Link>

        {/* Right: Navigation Menu */}
        <div className="hidden lg:flex items-center gap-2">
          <Link href="/" className={navLinkClass('/')}>
            BERANDA
          </Link>

          {/* Tentang Kami Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setTentangOpen(true)}
            onMouseLeave={() => setTentangOpen(false)}
          >
            <button
              className={`flex items-center gap-1 text-white text-sm font-medium tracking-wide transition-all pb-1 px-2 py-1 rounded hover:bg-white/20 active:bg-white/30 cursor-pointer ${isActive('/tentang') ? 'border-b-2 border-white' : ''}`}
            >
              TENTANG KAMI
              <svg className={`w-3 h-3 transition-transform duration-300 ${tentangOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {tentangOpen && (
              <div className="absolute top-full left-0 pt-2 min-w-[220px] z-50">
                <div className="bg-white rounded shadow-xl py-2">
                  <Link href="/tentang" className="block px-6 py-3 text-gray-700 text-sm hover:bg-gray-50 hover:text-[#0B5E8E] hover:border-l-4 hover:border-[#0B5E8E] transition-all whitespace-nowrap">
                    Profil Perusahaan
                  </Link>
                  <Link href="/tentang#visi-misi" className="block px-6 py-3 text-gray-700 text-sm hover:bg-gray-50 hover:text-[#0B5E8E] hover:border-l-4 hover:border-[#0B5E8E] transition-all whitespace-nowrap">
                    Visi &amp; Misi
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/berita" className={navLinkClass('/berita')}>
            BERITA
          </Link>

          {/* Keberlanjutan Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setKeberlanjutanOpen(true)}
            onMouseLeave={() => setKeberlanjutanOpen(false)}
          >
            <button
              className={`flex items-center gap-1 text-white text-sm font-medium tracking-wide transition-all pb-1 px-2 py-1 rounded hover:bg-white/20 active:bg-white/30 cursor-pointer ${isActive('/keberlanjutan') ? 'border-b-2 border-white' : ''}`}
            >
              KEBERLANJUTAN PERUSAHAAN
              <svg className={`w-3 h-3 transition-transform duration-300 ${keberlanjutanOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {keberlanjutanOpen && (
              <div className="absolute top-full left-0 pt-2 min-w-[220px] z-50">
                <div className="bg-white rounded shadow-xl py-2">
                  <Link href="/keberlanjutan" className="block px-6 py-3 text-gray-700 text-sm hover:bg-gray-50 hover:text-[#0B5E8E] hover:border-l-4 hover:border-[#0B5E8E] transition-all whitespace-nowrap">
                    Kebijakan Lingkungan
                  </Link>
                  <Link href="/keberlanjutan#sertifikasi" className="block px-6 py-3 text-gray-700 text-sm hover:bg-gray-50 hover:text-[#0B5E8E] hover:border-l-4 hover:border-[#0B5E8E] transition-all whitespace-nowrap">
                    Sertifikasi
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/kontak" className={navLinkClass('/kontak')}>
            HUBUNGI KAMI
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg bg-transparent hover:bg-white/20 active:bg-white/30 border-none cursor-pointer z-10 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-white rounded block transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-white rounded block transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-white rounded block transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-[90px] left-0 w-full bg-[#0B5E8E] z-40 shadow-lg">
          <div className="flex flex-col py-4">
            <Link href="/" className="text-white px-8 py-3 hover:bg-white/20 active:bg-white/30 text-sm font-medium transition-colors" onClick={closeMobileMenu}>BERANDA</Link>

            {/* TENTANG KAMI collapsible */}
            <button
              className="text-white px-8 py-3 hover:bg-white/20 active:bg-white/30 text-sm font-medium transition-colors flex items-center justify-between w-full text-left"
              onClick={() => setMobileTentangOpen(!mobileTentangOpen)}
            >
              TENTANG KAMI
              <svg className={`w-4 h-4 transition-transform duration-300 ${mobileTentangOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {mobileTentangOpen && (
              <div className="bg-[#0a4f78]">
                <Link href="/tentang" className="text-white px-12 py-3 hover:bg-white/20 text-sm flex items-center gap-2 transition-colors" onClick={closeMobileMenu}>
                  <span className="w-1.5 h-1.5 bg-[#FF7733] rounded-full flex-shrink-0"></span> Profil Perusahaan
                </Link>
                <Link href="/tentang#visi-misi" className="text-white px-12 py-3 hover:bg-white/20 text-sm flex items-center gap-2 transition-colors" onClick={closeMobileMenu}>
                  <span className="w-1.5 h-1.5 bg-[#FF7733] rounded-full flex-shrink-0"></span> Visi &amp; Misi
                </Link>
              </div>
            )}

            <Link href="/berita" className="text-white px-8 py-3 hover:bg-white/20 active:bg-white/30 text-sm font-medium transition-colors" onClick={closeMobileMenu}>BERITA</Link>

            {/* KEBERLANJUTAN collapsible */}
            <button
              className="text-white px-8 py-3 hover:bg-white/20 active:bg-white/30 text-sm font-medium transition-colors flex items-center justify-between w-full text-left"
              onClick={() => setMobileKeberlanjutanOpen(!mobileKeberlanjutanOpen)}
            >
              KEBERLANJUTAN PERUSAHAAN
              <svg className={`w-4 h-4 transition-transform duration-300 mr-4 ${mobileKeberlanjutanOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {mobileKeberlanjutanOpen && (
              <div className="bg-[#0a4f78]">
                <Link href="/keberlanjutan" className="text-white px-12 py-3 hover:bg-white/20 text-sm flex items-center gap-2 transition-colors" onClick={closeMobileMenu}>
                  <span className="w-1.5 h-1.5 bg-[#FF7733] rounded-full flex-shrink-0"></span> Kebijakan Lingkungan
                </Link>
                <Link href="/keberlanjutan#sertifikasi" className="text-white px-12 py-3 hover:bg-white/20 text-sm flex items-center gap-2 transition-colors" onClick={closeMobileMenu}>
                  <span className="w-1.5 h-1.5 bg-[#FF7733] rounded-full flex-shrink-0"></span> Sertifikasi
                </Link>
              </div>
            )}

            <Link href="/kontak" className="text-white px-8 py-3 hover:bg-white/20 active:bg-white/30 text-sm font-medium transition-colors" onClick={closeMobileMenu}>HUBUNGI KAMI</Link>
          </div>
        </div>
      )}
    </nav>
  )
}