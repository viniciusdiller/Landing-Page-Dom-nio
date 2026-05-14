import React, { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from '../hooks/useTranslation'

export default function FAQ() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(null)
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
    <section id="faq" ref={ref} className="py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="reveal opacity-0 text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-orange-500/30 bg-orange-500/10 text-orange-400 mb-4">
            {t.faq.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">{t.faq.title}</h2>
        </div>

        <div className="space-y-3">
          {t.faq.items.map((item, i) => (
            <div
              key={i}
              className={`reveal opacity-0 glass rounded-2xl border transition-all duration-300 overflow-hidden ${
                open === i ? 'border-orange-500/30' : 'border-white/5 hover:border-white/10'
              }`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left group"
              >
                <span className={`font-semibold text-base transition-colors duration-200 ${
                  open === i ? 'text-orange-400' : 'text-zinc-200 group-hover:text-white'
                }`}>
                  {item.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-zinc-500 shrink-0 transition-transform duration-300 ${
                    open === i ? 'rotate-180 text-orange-400' : ''
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-zinc-400 text-sm leading-relaxed animate-fade-in">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
