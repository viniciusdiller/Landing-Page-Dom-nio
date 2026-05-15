import React, { useEffect, useRef } from 'react'
import { useTranslation } from '../hooks/useTranslation'

export default function About() {
  const { t } = useTranslation()
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('animate-slide-up')
      }),
      { threshold: 0.15 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="reveal opacity-0 text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest badge-accent mb-4">
            {t.about.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
            {t.about.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <p className="reveal opacity-0 text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
              {t.about.description1}
            </p>
            <p className="reveal opacity-0 text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
              {t.about.description2}
            </p>
          </div>

          <div className="reveal opacity-0 grid grid-cols-3 gap-4">
            {[
              { value: t.about.stat1Value, label: t.about.stat1Label },
              { value: t.about.stat2Value, label: t.about.stat2Label },
              { value: t.about.stat3Value, label: t.about.stat3Label },
            ].map((stat, i) => (
              <div key={i} className="glass rounded-2xl p-6 text-center hover:-translate-y-1 transition-all duration-300">
                <div className="text-3xl font-black gradient-text mb-1">{stat.value}</div>
                <div className="text-zinc-500 dark:text-zinc-400 text-xs font-medium leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
