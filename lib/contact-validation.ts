export const CONTACT_EMAIL = 'pt.wki2021@gmail.com'

export type ContactPayload = {
  name: string
  email: string
  subject: string
  message: string
  company?: string
  loadedAt?: number
  turnstileToken?: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_SUBMIT_MS = 3000
const MAX_URLS = 5

export function validateContactPayload(payload: ContactPayload) {
  const name = payload.name?.trim() ?? ''
  const email = payload.email?.trim() ?? ''
  const subject = payload.subject?.trim() ?? ''
  const message = payload.message?.trim() ?? ''

  if (payload.company?.trim()) {
    return { ok: false as const, error: 'Pesan tidak dapat dikirim.' }
  }

  if (!name || name.length < 2 || name.length > 120) {
    return { ok: false as const, error: 'Nama lengkap wajib diisi (2–120 karakter).' }
  }

  if (!email || !EMAIL_PATTERN.test(email) || email.length > 254) {
    return { ok: false as const, error: 'Alamat email tidak valid.' }
  }

  if (!subject || subject.length < 3 || subject.length > 200) {
    return { ok: false as const, error: 'Subjek wajib diisi (3–200 karakter).' }
  }

  if (!message || message.length < 10 || message.length > 5000) {
    return { ok: false as const, error: 'Pesan wajib diisi (10–5000 karakter).' }
  }

  const urlCount = (message.match(/https?:\/\//gi) ?? []).length
  if (urlCount > MAX_URLS) {
    return { ok: false as const, error: 'Pesan mengandung terlalu banyak tautan.' }
  }

  if (payload.loadedAt) {
    const elapsed = Date.now() - payload.loadedAt
    if (elapsed < MIN_SUBMIT_MS) {
      return { ok: false as const, error: 'Pesan dikirim terlalu cepat. Silakan coba lagi.' }
    }
  }

  return {
    ok: true as const,
    data: { name, email, subject, message },
  }
}

export async function verifyTurnstileToken(token: string | undefined) {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true

  if (!token) {
    return false
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret,
      response: token,
    }),
  })

  const result = (await response.json()) as { success?: boolean }
  return Boolean(result.success)
}
