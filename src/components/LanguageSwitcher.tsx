import { useTranslation } from 'react-i18next'
import { useState, useRef, useEffect } from 'react'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'az', name: 'Azərbaycanca', flag: '🇦🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  ]

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    setIsOpen(false)
  }

  const currentLang = languages.find(lang => lang.code === i18n.language)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-sky-400 to-blue-500 text-white font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105 text-sm"
      >
        <span className="text-lg">{currentLang?.flag}</span>
        <span>{currentLang?.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-in fade-in slide-in-from-top-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-all ${
                i18n.language === lang.code
                  ? 'bg-sky-100 text-sky-700 border-l-4 border-sky-500 font-semibold'
                  : 'hover:bg-gray-50 text-gray-800'
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <div>
                <div className="font-semibold">{lang.name}</div>
                <div className="text-xs text-gray-500">{lang.code.toUpperCase()}</div>
              </div>
              {i18n.language === lang.code && (
                <span className="ml-auto text-sky-500">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
