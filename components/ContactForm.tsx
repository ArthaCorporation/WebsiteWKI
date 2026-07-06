'use client'

import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string
          callback: (token: string) => void
          'expired-callback': () => void
          'error-callback'?: () => void
        }
      ) => string
      reset: (widgetId?: string) => void
    }
    onTurnstileLoad?: () => void
  }
}

export default function ContactForm() {
  const loadedAtRef = useRef(Date.now())
  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const turnstileTokenRef = useRef('')

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [turnstileReady, setTurnstileReady] = useState(false)

  const resetTurnstile = () => {
    turnstileTokenRef.current = ''
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current)
    }
  }

  const renderTurnstile = () => {
    if (!TURNSTILE_SITE_KEY || !turnstileRef.current || !window.turnstile || widgetIdRef.current) return

    widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token: string) => {
        turnstileTokenRef.current = token
      },
      'expired-callback': () => {
        turnstileTokenRef.current = ''
      },
      'error-callback': () => {
        turnstileTokenRef.current = ''
      },
    })
    setTurnstileReady(true)
  }

  useEffect(() => {
    window.onTurnstileLoad = renderTurnstile
    if (window.turnstile) {
      renderTurnstile()
    }

    return () => {
      window.onTurnstileLoad = undefined
    }
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    const form = event.currentTarget
    const formData = new FormData(form)

    if (TURNSTILE_SITE_KEY && !turnstileTokenRef.current) {
      setStatus('error')
      setErrorMessage('Selesaikan verifikasi keamanan terlebih dahulu.')
      return
    }

    try {
      const response = await fetch('/api/kontak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message'),
          company: formData.get('company'),
          loadedAt: loadedAtRef.current,
          turnstileToken: turnstileTokenRef.current || undefined,
        }),
      })

      const result = (await response.json()) as { error?: string; turnstileError?: boolean }

      if (!response.ok) {
        if (result.turnstileError) {
          resetTurnstile()
        }
        throw new Error(result.error ?? 'Gagal mengirim pesan.')
      }

      form.reset()
      loadedAtRef.current = Date.now()
      resetTurnstile()
      setStatus('success')
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Gagal mengirim pesan.')
    }
  }

  return (
    <>
      {TURNSTILE_SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad"
          strategy="lazyOnload"
        />
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company">Perusahaan</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Masukkan nama lengkap Anda"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B5E8E] focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Masukkan alamat email Anda"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B5E8E] focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subjek</label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            placeholder="Masukkan subjek pesan"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B5E8E] focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder="Tulis pesan Anda di sini..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B5E8E] focus:border-transparent resize-none"
          />
        </div>

        {TURNSTILE_SITE_KEY && (
          <div ref={turnstileRef} className={turnstileReady ? '' : 'min-h-[65px]'} />
        )}

        {status === 'success' && (
          <p className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800">
            Pesan Anda berhasil dikirim. Kami akan menghubungi Anda segera.
          </p>
        )}

        {status === 'error' && errorMessage && (
          <p className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-[#0B5E8E] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#0a527c] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Mengirim...' : 'Kirim Pesan'}
        </button>
      </form>
    </>
  )
}
