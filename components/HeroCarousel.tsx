'use client'

import { useState, useEffect } from 'react'

const slides = [
  {
    id: 1,
    title: 'PT. Wijaya Kencana Indonesia',
    subtitle: 'Perusahaan Pertambangan Terpercaya',
    bg: 'from-[#0B5E8E] to-[#1a7db8]',
  },
  {
    id: 2,
    title: 'Komitmen Terhadap Keberlanjutan',
    subtitle: 'Mengelola Sumber Daya Alam Secara Bertanggung Jawab',
    bg: 'from-[#FF7733] to-[#ff9a66]',
  },
  {
    id: 3,
    title: 'Inovasi & Teknologi',
    subtitle: 'Menggunakan Teknologi Terkini Dalam Operasional',
    bg: 'from-[#2d6a4f] to-[#40916c]',
  },
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length)
  const next = () => setCurrent((c) => (c + 1) % slides.length)

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 bg-gradient-to-r ${slide.bg} flex items-center justify-center transition-opacity duration-700 ${index === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="text-center text-white px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h1>
            <p className="text-xl md:text-2xl opacity-90">{slide.subtitle}</p>
          </div>
        </div>
      ))}

      {/* Left Arrow */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white text-3xl w-12 h-12 rounded-full flex items-center justify-center transition-colors z-10"
        aria-label="Previous slide"
      >
        ‹
      </button>

      {/* Right Arrow */}
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white text-3xl w-12 h-12 rounded-full flex items-center justify-center transition-colors z-10"
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${index === current ? 'bg-white' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
