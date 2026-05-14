import { useContext } from 'react'
import { LanguageContext } from '../context/LanguageContext'
import { translations } from '../i18n/translations'

export function useTranslation() {
  const { language } = useContext(LanguageContext)
  const t = translations[language] || translations['pt-BR']
  return { t, language }
}
