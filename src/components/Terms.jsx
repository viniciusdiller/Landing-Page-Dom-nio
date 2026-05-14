import React from 'react'
import { useTranslation } from '../hooks/useTranslation'

export default function Terms() {
  const { t } = useTranslation()
  return (
    <section className="min-h-screen py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="glass rounded-3xl p-8 md:p-12 border border-white/5 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-black mb-2">{t.terms.title}</h1>
          <p className="text-zinc-500 text-sm mb-10">{t.terms.lastUpdated}</p>
          <div className="space-y-8">
            {t.terms.sections.map((s, i) => (
              <div key={i}>
                <h2 className="text-lg font-bold text-orange-400 mb-3">{s.title}</h2>
                <p className="text-zinc-400 text-base leading-relaxed">{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
