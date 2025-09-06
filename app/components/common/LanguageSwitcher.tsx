import { useState, useRef, useEffect } from 'react'
import { useLanguage, type Language } from '../../i18n/useLanguage'

export function LanguageSwitcher() {
  const { currentLanguage, changeLanguage, languages } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const currentLang = languages.find(lang => lang.code === currentLanguage)

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
        aria-label="switch language"
      >
        <span className="text-sm font-medium">{currentLang?.nativeName}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-black/90 backdrop-blur-lg border border-white/10 rounded-lg shadow-lg py-2 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                changeLanguage(lang.code)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                lang.code === currentLanguage
                  ? 'text-[#BCFF2F] bg-[#BCFF2F]/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {lang.nativeName}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
