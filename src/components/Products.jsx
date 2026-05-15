import React, { useEffect, useRef } from 'react'
import { ArrowRight, CheckCircle2, Clock } from 'lucide-react'
import { useTranslation } from '../hooks/useTranslation'

export default function Products() {
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
    <section id="products" ref={ref} className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="reveal opacity-0 text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest badge-accent mb-4">
            {t.products.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">{t.products.title}</h2>
          <p className="text-zinc-500 text-lg max-w-xl mx-auto">{t.products.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Rodizio Race Card */}
          <div className="reveal opacity-0 group glass rounded-3xl p-8
            border border-orange-500/20 dark:border-purple-500/20
            hover:border-orange-500/50 dark:hover:border-purple-500/50
            hover:glow-accent transition-all duration-500 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-6">
              <div className="text-5xl animate-float">🍕</div>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/15 border border-green-500/30 text-green-500 dark:text-green-400 text-xs font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                {t.products.rodizio.tag}
              </span>
            </div>
            <h3 className="text-2xl font-black mb-3">
              {t.products.rodizio.title}
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-6">
              {t.products.rodizio.description}
            </p>
            <ul className="space-y-2.5 mb-8">
              {t.products.rodizio.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2.5 text-zinc-600 dark:text-zinc-300 text-sm">
                  <CheckCircle2 size={16} className="text-orange-500 dark:text-purple-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="https://rodiziorace.mechama.eu"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm active:scale-95"
            >
              {t.products.rodizio.cta} <ArrowRight size={16} />
            </a>
          </div>

          {/* Coming Soon Card */}
          <div className="reveal opacity-0 glass rounded-3xl p-8 border border-black/5 dark:border-white/5 opacity-60">
            <div className="flex items-start justify-between mb-6">
              <div className="text-5xl">✨</div>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-200/50 dark:bg-zinc-700/50 border border-zinc-300/40 dark:border-zinc-600/40 text-zinc-500 dark:text-zinc-400 text-xs font-bold">
                <Clock size={12} />
                {t.products.coming.tag}
              </span>
            </div>
            <h3 className="text-2xl font-black mb-3 text-zinc-400">{t.products.coming.title}</h3>
            <p className="text-zinc-500 text-base leading-relaxed mb-8">{t.products.coming.description}</p>
            <button disabled className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-black/10 dark:border-white/10 text-zinc-400 font-bold text-sm cursor-not-allowed">
              <Clock size={16} /> {t.products.coming.cta}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
