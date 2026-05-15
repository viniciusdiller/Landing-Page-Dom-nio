import React, { useEffect, useRef } from 'react'
import { ArrowRight, Zap } from 'lucide-react'
import { useTranslation } from '../hooks/useTranslation'

export default function Hero() {
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
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/10 dark:bg-purple-500/10 blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-orange-600/5 dark:bg-purple-600/5 blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-500/5 dark:bg-fuchsia-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="reveal opacity-0 inline-flex items-center gap-2 px-4 py-2 rounded-full badge-accent text-sm font-medium mb-8">
          <Zap size={14} className="animate-float" />
          <span>{t.hero.badge}</span>
        </div>

        <h1 className="reveal opacity-0 text-5xl md:text-7xl font-black tracking-tight leading-tight mb-6 text-zinc-900 dark:text-zinc-100">
          {t.hero.title}{' '}
          <span className="gradient-text">{t.hero.titleHighlight}</span>
        </h1>

        <p className="reveal opacity-0 text-zinc-500 dark:text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
          {t.hero.subtitle}
        </p>

        <div className="reveal opacity-0 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://rodiziorace.mechama.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base active:scale-95"
          >
            🍕 {t.hero.cta}
            <ArrowRight size={18} />
          </a>
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 font-semibold text-base hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 active:scale-95"
          >
            {t.hero.ctaSecondary}
          </button>
        </div>

        <div className="reveal opacity-0 mt-20 flex justify-center gap-8 text-4xl">
          <span className="animate-float" style={{ animationDelay: '0s' }}>🍕</span>
          <span className="animate-float" style={{ animationDelay: '0.4s' }}>🍣</span>
          <span className="animate-float" style={{ animationDelay: '0.8s' }}>🍔</span>
          <span className="animate-float" style={{ animationDelay: '1.2s' }}>🏆</span>
        </div>
      </div>
    </section>
  )
}
