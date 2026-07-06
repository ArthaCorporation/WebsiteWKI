import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import {
  CONTACT_EMAIL,
  validateContactPayload,
  verifyTurnstileToken,
  type ContactPayload,
} from '@/lib/contact-validation'

function getMailer() {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD

  if (!user || !pass) {
    throw new Error('Email belum dikonfigurasi. Atur GMAIL_USER dan GMAIL_APP_PASSWORD.')
  }

  return nodemailer.createTransport({
    service: 'gmail',
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

    const remoteIp =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      undefined

    const turnstile = await verifyTurnstileToken(body.turnstileToken, remoteIp)
    if (!turnstile.ok) {
      console.error('Turnstile verification failed:', turnstile.errorCodes)
      return NextResponse.json(
        {
          error: 'Verifikasi keamanan gagal. Silakan coba lagi.',
          turnstileError: true,
        },
        { status: 400 }
      )
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
    return NextResponse.json(
      { error: 'Gagal mengirim pesan. Silakan coba lagi nanti.' },
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
