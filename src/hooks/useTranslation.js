import { useContext } from 'react'
import { LanguageContext } from '../context/LanguageContext'
import { translations } from '../i18n/translations'

export function useTranslation() {
  const ctx = useContext(LanguageContext)
  const language = ctx?.language ?? 'pt-BR'
  // t é o objeto de traduções do idioma atual
  // Uso nos componentes: t.hero.badge, t.nav.about, etc.
  const t = translations[language] ?? translations['pt-BR']
  return { t, language }
}
