import React, { useState, useEffect, useRef } from 'react'
import { Mail, Send, CheckCircle } from 'lucide-react'
import { useTranslation } from '../hooks/useTranslation'

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
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

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSent(true)
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 1500)
  }

  const inputClass = [
    'w-full rounded-xl px-4 py-3 text-sm transition-all duration-200',
    'bg-black/5 dark:bg-white/5',
    'border border-black/10 dark:border-white/10',
    'text-zinc-800 dark:text-zinc-200',
    'placeholder-zinc-400 dark:placeholder-zinc-600',
    'focus:outline-none',
    'focus:border-orange-500/60 dark:focus:border-purple-500/60',
    'focus:bg-black/8 dark:focus:bg-white/8',
  ].join(' ')

  return (
    <section id="contact" ref={ref} className="py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="reveal opacity-0 text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest badge-accent mb-4">
            {t.contact.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-zinc-900 dark:text-zinc-100">
            {t.contact.title}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg">{t.contact.subtitle}</p>
        </div>

        {/* Email box */}
        <div className="reveal opacity-0 flex items-center gap-3 glass rounded-2xl px-6 py-4 border border-black/8 dark:border-white/5 mb-8">
          <Mail size={18} className="text-orange-500 dark:text-purple-400 shrink-0" />
          <div>
            <div className="text-xs text-zinc-500 uppercase tracking-wider">{t.contact.emailLabel}</div>
            <a
              href={`mailto:${t.contact.email}`}
              className="text-zinc-800 dark:text-zinc-200 font-semibold hover:text-orange-500 dark:hover:text-purple-400 transition-colors text-sm"
            >
              {t.contact.email}
            </a>
          </div>
          <div className="ml-auto text-zinc-400 dark:text-zinc-600 text-xs">{t.contact.responseTime}</div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="reveal opacity-0 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              required
              placeholder={t.contact.form.name}
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              className={inputClass}
            />
            <input
              required
              type="email"
              placeholder={t.contact.form.email}
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              className={inputClass}
            />
          </div>
          <input
            required
            placeholder={t.contact.form.subject}
            value={form.subject}
            onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
            className={inputClass}
          />
          <textarea
            required
            rows={5}
            placeholder={t.contact.form.message}
            value={form.message}
            onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
            className={`${inputClass} resize-none`}
          />

          {sent ? (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium animate-fade-in">
              <CheckCircle size={18} /> {t.contact.form.success}
            </div>
          ) : (
            <button
              type="submit"
              disabled={sending}
              className="btn-primary w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-base active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {sending ? t.contact.form.sending : <><Send size={18} /> {t.contact.form.send}</>}
            </button>
          )}
        </form>
      </div>
    </section>
  )
}
