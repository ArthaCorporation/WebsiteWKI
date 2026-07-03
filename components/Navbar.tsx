'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, type ReactNode } from 'react'

type DropdownKey = 'tentang' | 'kegiatan' | null

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null)
  const [mobileTentangOpen, setMobileTentangOpen] = useState(false)
  const [mobileKegiatanOpen, setMobileKegiatanOpen] = useState(false)

  const closeMobileMenu = () => {
    setMobileOpen(false)
    setMobileTentangOpen(false)
    setMobileKegiatanOpen(false)
  }

  const isActive = (path: string) => pathname === path

  const isActivePrefix = (prefix: string) => pathname.startsWith(prefix)

  const navLinkClass = (path: string) =>
    `text-white text-[10px] xl:text-[11px] 2xl:text-xs font-medium tracking-normal whitespace-nowrap transition-all py-1 px-1 xl:px-1.5 2xl:px-2 rounded hover:bg-white/20 active:bg-white/30 ${isActive(path) ? 'border-b-2 border-white' : ''}`

  const dropdownButtonClass = (active: boolean) =>
    `flex items-center gap-0.5 text-white text-[10px] xl:text-[11px] 2xl:text-xs font-medium tracking-normal whitespace-nowrap transition-all py-1 px-1 xl:px-1.5 2xl:px-2 rounded hover:bg-white/20 active:bg-white/30 cursor-pointer ${active ? 'border-b-2 border-white' : ''}`

  const ChevronIcon = ({ open }: { open: boolean }) => (
    <svg className={`w-2.5 h-2.5 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  )

  const DropdownLink = ({ href, children }: { href: string; children: ReactNode }) => (
    <Link href={href} className="block px-6 py-3 text-gray-700 text-sm hover:bg-gray-50 hover:text-[#0B5E8E] hover:border-l-4 hover:border-[#0B5E8E] transition-all whitespace-nowrap">
      {children}
    </Link>
  )

  const MobileSubLink = ({ href, children }: { href: string; children: ReactNode }) => (
    <Link href={href} className="text-white px-12 py-3 hover:bg-white/20 text-sm flex items-center gap-2 transition-colors" onClick={closeMobileMenu}>
      <span className="w-1.5 h-1.5 bg-[#FF7733] rounded-full flex-shrink-0" /> {children}
    </Link>
  )

  return (
    <nav className="relative w-full h-[90px] bg-[#0B5E8E] overflow-visible z-50">
      <div className="absolute top-0 left-0 h-full bg-[#FF7733] w-full lg:hidden" />
      <div
        className="hidden lg:block absolute top-0 left-0 h-full bg-[#FF7733]"
        style={{
          width: '38%',
          clipPath: 'polygon(0 0, 82% 0, 100% 100%, 0 100%)',
        }}
      />

      <div className="relative flex items-center h-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 z-10 lg:grid lg:grid-cols-[38%_1fr] lg:items-center">
        <Link href="/" className="flex items-center gap-3 no-underline min-w-0 lg:pr-6 flex-1 lg:flex-none">
          <div className="bg-white p-1.5 rounded shadow-md flex items-center justify-center h-[52px] w-[52px] xl:h-[56px] xl:w-[56px] shrink-0">
            <Image
              src="/images/WKI_logo.png"
              alt="PT. Wijaya Kencana Indonesia Logo"
              width={50}
              height={50}
              className="h-full w-auto object-contain"
            />
          </div>
          <span className="text-white font-serif text-base xl:text-lg font-light tracking-wide text-shadow leading-tight line-clamp-2">
            PT. Wijaya Kencana Indonesia
          </span>
        </Link>

        <div className="hidden lg:flex items-center justify-end gap-0 min-w-0 pl-4">
          <Link href="/" className={navLinkClass('/')}>
            BERANDA
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown('tentang')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className={dropdownButtonClass(isActive('/tentang'))}>
              TENTANG KAMI
              <ChevronIcon open={openDropdown === 'tentang'} />
            </button>
            {openDropdown === 'tentang' && (
              <div className="absolute top-full left-0 pt-2 min-w-[220px] z-50">
                <div className="bg-white rounded shadow-xl py-2">
                  <DropdownLink href="/tentang">Profil Perusahaan</DropdownLink>
                  <DropdownLink href="/tentang#visi-misi">Visi &amp; Misi</DropdownLink>
                  <DropdownLink href="/tentang#struktur-organisasi">Struktur Organisasi</DropdownLink>
                </div>
              </div>
            )}
          </div>

          <Link href="/berita" className={navLinkClass('/berita')}>
            BERITA
          </Link>

          <Link href="/kebijakan" className={navLinkClass('/kebijakan')}>
            KEBIJAKAN PERUSAHAAN
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown('kegiatan')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className={dropdownButtonClass(isActivePrefix('/kegiatan'))}>
              KEGIATAN PERUSAHAAN
              <ChevronIcon open={openDropdown === 'kegiatan'} />
            </button>
            {openDropdown === 'kegiatan' && (
              <div className="absolute top-full left-0 pt-2 min-w-[240px] z-50">
                <div className="bg-white rounded shadow-xl py-2">
                  <DropdownLink href="/kegiatan/operasional">Kegiatan Operasional</DropdownLink>
                  <DropdownLink href="/kegiatan/lingkungan">Kegiatan Lingkungan</DropdownLink>
                  <DropdownLink href="/kegiatan/sosial">Kegiatan Sosial</DropdownLink>
                </div>
              </div>
            )}
          </div>

          <Link href="/sertifikat" className={navLinkClass('/sertifikat')}>
            SERTIFIKAT
          </Link>

          <Link href="/kontak" className={navLinkClass('/kontak')}>
            HUBUNGI KAMI
          </Link>
        </div>

        <button
          className="lg:hidden absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 p-2 rounded-lg bg-transparent hover:bg-white/20 active:bg-white/30 border-none cursor-pointer z-10 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-white rounded block transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-white rounded block transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-white rounded block transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden absolute top-[90px] left-0 w-full bg-[#0B5E8E] z-40 shadow-lg max-h-[calc(100vh-90px)] overflow-y-auto">
          <div className="flex flex-col py-4">
            <Link href="/" className="text-white px-8 py-3 hover:bg-white/20 active:bg-white/30 text-sm font-medium transition-colors" onClick={closeMobileMenu}>BERANDA</Link>

            <button
              className="text-white px-8 py-3 hover:bg-white/20 active:bg-white/30 text-sm font-medium transition-colors flex items-center justify-between w-full text-left"
              onClick={() => setMobileTentangOpen(!mobileTentangOpen)}
            >
              TENTANG KAMI
              <ChevronIcon open={mobileTentangOpen} />
            </button>
            {mobileTentangOpen && (
              <div className="bg-[#0a4f78]">
                <MobileSubLink href="/tentang">Profil Perusahaan</MobileSubLink>
                <MobileSubLink href="/tentang#visi-misi">Visi &amp; Misi</MobileSubLink>
                <MobileSubLink href="/tentang#struktur-organisasi">Struktur Organisasi</MobileSubLink>
              </div>
            )}

            <Link href="/berita" className="text-white px-8 py-3 hover:bg-white/20 active:bg-white/30 text-sm font-medium transition-colors" onClick={closeMobileMenu}>BERITA</Link>
            <Link href="/kebijakan" className="text-white px-8 py-3 hover:bg-white/20 active:bg-white/30 text-sm font-medium transition-colors" onClick={closeMobileMenu}>KEBIJAKAN PERUSAHAAN</Link>

            <button
              className="text-white px-8 py-3 hover:bg-white/20 active:bg-white/30 text-sm font-medium transition-colors flex items-center justify-between w-full text-left"
              onClick={() => setMobileKegiatanOpen(!mobileKegiatanOpen)}
            >
              KEGIATAN PERUSAHAAN
              <ChevronIcon open={mobileKegiatanOpen} />
            </button>
            {mobileKegiatanOpen && (
              <div className="bg-[#0a4f78]">
                <MobileSubLink href="/kegiatan/operasional">Kegiatan Operasional</MobileSubLink>
                <MobileSubLink href="/kegiatan/lingkungan">Kegiatan Lingkungan</MobileSubLink>
                <MobileSubLink href="/kegiatan/sosial">Kegiatan Sosial</MobileSubLink>
              </div>
            )}

            <Link href="/sertifikat" className="text-white px-8 py-3 hover:bg-white/20 active:bg-white/30 text-sm font-medium transition-colors" onClick={closeMobileMenu}>SERTIFIKAT</Link>
            <Link href="/kontak" className="text-white px-8 py-3 hover:bg-white/20 active:bg-white/30 text-sm font-medium transition-colors" onClick={closeMobileMenu}>HUBUNGI KAMI</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
