import React, { createContext, useState } from 'react'

export const LanguageContext = createContext()

const LANGUAGES = [
  { code: 'pt-BR', label: 'PT', flag: '🇧🇷' },
  { code: 'en',    label: 'EN', flag: '🇺🇸' },
  { code: 'es',    label: 'ES', flag: '🇪🇸' },
  { code: 'fr',    label: 'FR', flag: '🇫🇷' },
]

export function LanguageProvider({ children }) {
  const browserLang = navigator.language || 'pt-BR'
  const defaultLang = LANGUAGES.find(l => browserLang.startsWith(l.code.split('-')[0]))?.code || 'pt-BR'
  const [language, setLanguage] = useState(defaultLang)

  return (
    <LanguageContext.Provider value={{ language, setLanguage, LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  )
}
