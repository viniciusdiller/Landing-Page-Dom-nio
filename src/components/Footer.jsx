import React from 'react'
import { useTranslation } from '../hooks/useTranslation'

export default function Footer({ setActivePage }) {
  const { t } = useTranslation()
  return (
    <footer className="border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <span className="text-white font-black text-sm">M</span>
          </div>
          <div>
            <div className="font-bold text-white text-sm">MeChama</div>
            <div className="text-zinc-600 text-xs">{t.footer.tagline}</div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <button onClick={() => setActivePage('privacy')} className="text-zinc-500 hover:text-orange-400 transition-colors">
            {t.footer.links.privacy}
          </button>
          <button onClick={() => setActivePage('terms')} className="text-zinc-500 hover:text-orange-400 transition-colors">
            {t.footer.links.terms}
          </button>
          <button onClick={() => { setActivePage('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100) }} className="text-zinc-500 hover:text-orange-400 transition-colors">
            {t.footer.links.contact}
          </button>
        </div>

        <div className="text-zinc-600 text-xs text-center">
          {t.footer.rights}
        </div>
      </div>
    </footer>
  )
}
