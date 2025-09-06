import { useTranslation } from 'react-i18next'

export type Language = 'zh' | 'en'

export function useLanguage() {
  const { i18n, t } = useTranslation()

  const currentLanguage = i18n.language as Language
  
  const changeLanguage = (lng: Language) => {
    i18n.changeLanguage(lng)
  }

  const languages = [
    { code: 'en' as const, name: 'English', nativeName: 'English' },
    { code: 'zh' as const, name: '中文', nativeName: '中文' }
  ]

  return {
    currentLanguage,
    changeLanguage,
    languages,
    t
  }
}
