import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import {
  CONTACT_EMAIL,
  validateContactPayload,
  verifyTurnstileToken,
  type ContactPayload,
} from '@/lib/contact-validation'

function getMailer() {
  const user = process.env.GMAIL_USER?.trim()
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, '')

  if (!user || !pass) {
    throw new Error('MISSING_GMAIL_CONFIG')
  }

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass },
  })
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload
    const validation = validateContactPayload(body)

    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    const turnstileOk = await verifyTurnstileToken(body.turnstileToken)
    if (!turnstileOk) {
      return NextResponse.json({ error: 'Verifikasi keamanan gagal. Silakan coba lagi.' }, { status: 400 })
    }

    const { name, email, subject, message } = validation.data
    const to = process.env.CONTACT_TO ?? CONTACT_EMAIL
    const transporter = getMailer()

    await transporter.sendMail({
      from: `"Website WKI" <${process.env.GMAIL_USER}>`,
      to,
      replyTo: email,
      subject: `[Website WKI] ${subject}`,
      text: [
        'Pesan baru dari formulir Hubungi Kami',
        '',
        `Nama: ${name}`,
        `Email: ${email}`,
        `Subjek: ${subject}`,
        '',
        'Pesan:',
        message,
      ].join('\n'),
      html: `
        <h2>Pesan baru dari formulir Hubungi Kami</h2>
        <p><strong>Nama:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subjek:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Pesan:</strong></p>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)

    if (error instanceof Error && error.message === 'MISSING_GMAIL_CONFIG') {
      return NextResponse.json(
        { error: 'Layanan email belum dikonfigurasi di server.' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: 'Gagal mengirim pesan. Periksa konfigurasi email atau coba lagi nanti.' },
      { status: 500 }
    )
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}
