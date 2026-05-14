import React, { useState, useEffect, useContext } from 'react'
import { Globe, Menu, X } from 'lucide-react'
import { useTranslation } from '../hooks/useTranslation'
import { LanguageContext } from '../context/LanguageContext'

export default function Navbar({ setActivePage, activePage }) {
  const { t } = useTranslation()
  const { language, setLanguage, LANGUAGES } = useContext(LanguageContext)
  const [scrolled, setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { key: 'home',  label: t.nav.about,    section: 'home' },
    { key: 'prods', label: t.nav.products,  section: 'home' },
    { key: 'cont',  label: t.nav.contact,   section: 'home' },
  ]

  const scrollTo = (id) => {
    setActivePage('home')
    setMobileOpen(false)
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'glass border-b border-white/5 shadow-lg shadow-black/20' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => setActivePage('home')}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30 transition-transform duration-200 group-hover:scale-110">
            <span className="text-white font-black text-sm">M</span>
          </div>
          <span className="font-bold text-white text-lg tracking-tight">MeChama</span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          <button onClick={() => scrollTo('about')}    className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5">{t.nav.about}</button>
          <button onClick={() => scrollTo('products')} className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5">{t.nav.products}</button>
          <button onClick={() => scrollTo('contact')}  className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5">{t.nav.contact}</button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Lang switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 text-sm font-bold text-zinc-300 active:scale-95"
            >
              <Globe size={14} className="text-zinc-400" />
              <span>{LANGUAGES.find(l => l.code === language)?.label}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-12 glass rounded-xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden z-50 w-36 animate-fade-in">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code); setLangOpen(false) }}
                    className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors duration-150 ${
                      language === lang.code
                        ? 'bg-orange-500/20 text-orange-400 font-bold'
                        : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-white/5 px-6 py-4 space-y-1 animate-fade-in">
          <button onClick={() => scrollTo('about')}    className="w-full text-left px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">{t.nav.about}</button>
          <button onClick={() => scrollTo('products')} className="w-full text-left px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">{t.nav.products}</button>
          <button onClick={() => scrollTo('contact')}  className="w-full text-left px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">{t.nav.contact}</button>
        </div>
      )}
    </nav>
  )
}
