import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useLanguage } from '../../i18n/useLanguage'
import { LanguageSwitcher } from '../common/LanguageSwitcher'

export function Navbar() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(() => {
    // Check if navigation animation has already been shown in this session
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('navbar-animated') === 'true'
    }
    return false
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!hasAnimated) {
      // Mark as animated after initial load
      const timer = setTimeout(() => {
        setHasAnimated(true)
        sessionStorage.setItem('navbar-animated', 'true')
      }, 800) // After animation completes

      return () => clearTimeout(timer)
    }
  }, [hasAnimated])

  return (
    <nav className={`fixed top-0 w-full z-50 backdrop-blur-lg border-b border-white/10 transition-colors duration-300 ${scrolled ? 'bg-black/90' : 'bg-black/80'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="Nexion Logo" className="w-10 h-10" />
          </div>

          <div className="flex items-center gap-6">
            <a href="/" className="text-gray-300 hover:text-white transition-colors">
              {t('nav.home')}
            </a>
            {/* <a href="#download" className="text-gray-300 hover:text-white transition-colors">
              {t('nav.download')}
            </a> */}
            <a href="/docs/getting-started" className="text-gray-300 hover:text-white transition-colors">
              {t('nav.docs')}
            </a>
            <a href="https://github.com/AceXiamo/Nexion" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
              <span>{t('nav.github')}</span>
            </a>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  )
}
