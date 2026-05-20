import { formatDate, generateSlug } from '@/lib/utils'

describe('formatDate', () => {
  it('formats a date string to Indonesian month names', () => {
    expect(formatDate('2024-01-15')).toBe('15 Januari 2024')
  })

  it('handles single-digit day', () => {
    expect(formatDate('2024-03-01')).toBe('1 Maret 2024')
  })

  it('formats December correctly', () => {
    expect(formatDate('2024-12-25')).toBe('25 Desember 2024')
  })

  it('formats June correctly', () => {
    expect(formatDate('2025-06-10')).toBe('10 Juni 2025')
  })
})

describe('generateSlug', () => {
  it('converts spaces to hyphens', () => {
    expect(generateSlug('Berita Terbaru WKI')).toBe('berita-terbaru-wki')
  })

  it('removes special characters', () => {
    expect(generateSlug('PT. Wijaya & Kencana!')).toBe('pt-wijaya-kencana')
  })

  it('collapses multiple hyphens', () => {
    expect(generateSlug('Hello   World')).toBe('hello-world')
  })

  it('converts to lowercase', () => {
    expect(generateSlug('BERITA PENTING')).toBe('berita-penting')
  })
})
