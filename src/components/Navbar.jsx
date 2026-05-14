import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';

const LANGUAGES = [
  { code: 'pt', label: 'PT-BR', flag: '🇧🇷' },
  { code: 'en', label: 'EN',    flag: '🇺🇸' },
  { code: 'es', label: 'ES',    flag: '🇪🇸' },
  { code: 'fr', label: 'FR',    flag: '🇫🇷' },
];

export default function Navbar({ darkMode, setDarkMode, setSection }) {
  const { language, setLanguage } = useLanguage();
  const t = useTranslation();
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const current = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  const navLinks = [
    { key: 'about',    label: t('nav.about') },
    { key: 'products', label: t('nav.products') },
    { key: 'faq',      label: t('nav.faq') },
    { key: 'contact',  label: t('nav.contact') },
  ];

  const scrollTo = (id) => {
    setSection('home');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        <button onClick={() => setSection('home')} className="flex items-center gap-2">
          <img
            src={darkMode ? '/images/logo-big-dark.jpg' : '/images/logo-big-light.jpg'}
            alt="Rodízio Race"
            className="h-10 w-auto"
          />
        </button>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <button
              key={link.key}
              onClick={() => scrollTo(link.key)}
              className="text-sm text-zinc-300 hover:text-orange-400 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(prev => !prev)}
            aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
            className="p-2 rounded-lg text-zinc-400 hover:text-orange-400 hover:bg-white/10 transition-all"
          >
            {darkMode ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(prev => !prev)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-zinc-300 hover:text-orange-400 hover:bg-white/10 transition-all"
            >
              <span>{current.flag}</span>
              <span>{current.label}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}>
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-1 w-32 rounded-xl glass shadow-xl overflow-hidden animate-fade-in z-50">
                {LANGUAGES.map(l => (
                  <button
                    key={l.code}
                    onClick={() => { setLanguage(l.code); setLangOpen(false); }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-white/10 transition-colors
                      ${language === l.code ? 'text-orange-400' : 'text-zinc-300'}`}
                  >
                    <span>{l.flag}</span><span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2 text-zinc-400 hover:text-orange-400 transition-colors"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen
                ? <path d="M18 6L6 18M6 6l12 12"/>
                : <path d="M3 12h18M3 6h18M3 18h18"/>}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden glass border-t border-white/10 animate-fade-in">
          {navLinks.map(link => (
            <button
              key={link.key}
              onClick={() => scrollTo(link.key)}
              className="block w-full text-left px-6 py-3 text-sm text-zinc-300 hover:text-orange-400 hover:bg-white/10 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
