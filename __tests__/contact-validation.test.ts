import { validateContactPayload } from '@/lib/contact-validation'

const validPayload = {
  name: 'Budi Santoso',
  email: 'budi@example.com',
  subject: 'Pertanyaan umum',
  message: 'Saya ingin menanyakan informasi lebih lanjut mengenai kegiatan perusahaan.',
  loadedAt: Date.now() - 5000,
}

describe('validateContactPayload', () => {
  it('accepts valid contact data', () => {
    const result = validateContactPayload(validPayload)
    expect(result.ok).toBe(true)
  })

  it('rejects honeypot submissions', () => {
    const result = validateContactPayload({ ...validPayload, company: 'spam corp' })
    expect(result.ok).toBe(false)
  })

  it('rejects submissions that are too fast', () => {
    const result = validateContactPayload({ ...validPayload, loadedAt: Date.now() - 500 })
    expect(result.ok).toBe(false)
  })

  it('rejects invalid email addresses', () => {
    const result = validateContactPayload({ ...validPayload, email: 'not-an-email' })
    expect(result.ok).toBe(false)
  })
})
