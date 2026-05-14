import { useContext } from 'react'
import { LanguageContext } from '../context/LanguageContext'
import { translations } from '../i18n/translations'

export function useTranslation() {
  const ctx = useContext(LanguageContext)
  const language = ctx?.language ?? 'pt-BR'

  // t('nav.about') resolve caminhos aninhados com segurança
  const t = (path) =>
    path.split('.').reduce(
      (acc, key) => (acc != null && typeof acc === 'object' ? acc[key] : undefined),
      translations[language] ?? translations['pt-BR']
    ) ?? path

  return { t, language }
}
