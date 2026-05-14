import React, { useEffect, useRef } from 'react'
import { ArrowRight, Zap } from 'lucide-react'
import { useTranslation } from '../hooks/useTranslation'

export default function Hero({ onCta }) {
  const { t } = useTranslation()
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('animate-slide-up')
      }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20">
      {/* Background glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/8 blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-orange-600/5 blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="reveal opacity-0 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-medium mb-8">
          <Zap size={14} className="animate-float" />
          <span>{t.hero.badge}</span>
        </div>

        {/* Title */}
        <h1 className="reveal opacity-0 delay-100 text-5xl md:text-7xl font-black tracking-tight leading-tight mb-6">
          {t.hero.title}{' '}
          <span className="text-gradient-orange">{t.hero.titleHighlight}</span>
        </h1>

        {/* Subtitle */}
        <p className="reveal opacity-0 delay-200 text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
          {t.hero.subtitle}
        </p>

        {/* CTAs */}
        <div className="reveal opacity-0 delay-300 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://rodiziorace.mechama.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-base shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:from-orange-400 hover:to-orange-500 transition-all duration-300 active:scale-95 glow-orange"
          >
            🍕 {t.hero.cta}
            <ArrowRight size={18} />
          </a>
          <button
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/15 bg-white/5 text-zinc-300 font-semibold text-base hover:bg-white/10 hover:text-white hover:border-white/25 transition-all duration-300 active:scale-95"
          >
            {t.hero.ctaSecondary}
          </button>
        </div>

        {/* Floating emoji */}
        <div className="reveal opacity-0 delay-400 mt-20 flex justify-center gap-8 text-4xl">
          <span className="animate-float" style={{ animationDelay: '0s' }}>🍕</span>
          <span className="animate-float" style={{ animationDelay: '0.4s' }}>🍣</span>
          <span className="animate-float" style={{ animationDelay: '0.8s' }}>🍔</span>
          <span className="animate-float" style={{ animationDelay: '1.2s' }}>🏆</span>
        </div>
      </div>
    </section>
  )
}
