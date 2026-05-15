import React, { createContext, useContext, useState } from 'react'

export const LanguageContext = createContext()

// Hook de atalho — uso: const { language, setLanguage } = useLanguage()
export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage deve ser usado dentro de <LanguageProvider>')
  return ctx
}

const LANGUAGES = [
  { code: 'pt-BR', label: 'PT-BR', flag: '🇧🇷' },
  { code: 'en',    label: 'EN',    flag: '🇺🇸' },
  { code: 'es',    label: 'ES',    flag: '🇪🇸' },
  { code: 'fr',    label: 'FR',    flag: '🇫🇷' },
]

export function LanguageProvider({ children }) {
  const browserLang = (typeof navigator !== 'undefined' && navigator.language) || 'pt-BR'
  // Mapeia 'pt' → 'pt-BR', 'en-US' → 'en', etc.
  const defaultLang =
    LANGUAGES.find(l => browserLang.startsWith(l.code.split('-')[0]))?.code ?? 'pt-BR'

  const [language, setLanguage] = useState(defaultLang)

  return (
    <LanguageContext.Provider value={{ language, setLanguage, LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  )
}
