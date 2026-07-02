'use client'

import { useEffect, useState } from 'react'

type PdfThumbnailProps = {
  src: string
  title: string
}

export default function PdfThumbnail({ src, title }: PdfThumbnailProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let cancelled = false

    const renderThumbnail = async () => {
      let loadingTask: { promise: Promise<any>; destroy: () => Promise<void> } | null = null

      try {
        const { GlobalWorkerOptions, getDocument } = await import('pdfjs-dist/legacy/build/pdf.mjs')

        GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/legacy/build/pdf.worker.mjs', import.meta.url).toString()

        loadingTask = getDocument({ url: src })
        const pdf = await loadingTask.promise
        const page = await pdf.getPage(1)
        const viewport = page.getViewport({ scale: 1.4 })
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')

        if (!context) {
          throw new Error('Canvas context unavailable')
        }

        canvas.width = viewport.width
        canvas.height = viewport.height

        await page.render({ canvasContext: context, canvas, viewport }).promise

        if (!cancelled) {
          setImageSrc(canvas.toDataURL('image/jpeg', 0.82))
        }
      } catch {
        if (!cancelled) {
          setHasError(true)
        }
      } finally {
        if (loadingTask) {
          await loadingTask.destroy()
        }
      }
    }

    void renderThumbnail()

    return () => {
      cancelled = true
    }
  }, [src])

  if (hasError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-white to-gray-200 text-center text-sm text-gray-500">
        <div className="space-y-3 px-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
            <span className="text-lg font-bold text-gray-400">PDF</span>
          </div>
          <p className="font-medium text-gray-600">Pratinjau {title} tidak tersedia</p>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-white">
      {imageSrc ? (
        <img src={imageSrc} alt={`Pratinjau ${title}`} className="h-full w-full object-cover object-top" loading="lazy" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-white to-gray-200 text-gray-400">
          <div className="space-y-3 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
              <span className="text-lg font-bold text-gray-300">PDF</span>
            </div>
            <p className="text-xs font-medium uppercase tracking-[0.2em]">Memuat pratinjau</p>
          </div>
        </div>
      )}
    </div>
  )
}