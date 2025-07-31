import { useState, useEffect } from 'react'

type TranslationData = Record<string, unknown>

// React hook for i18n in client components
export const useI18n = (): {
	t: (key: string, params?: Record<string, unknown>) => string
	language: string
} => {
	const [language, setLanguage] = useState('en')
	const [translations, setTranslations] = useState<TranslationData>({})

	useEffect(() => {
		// Get current language from various sources
		const getCurrentLanguage = (): string => {
			if (typeof window !== 'undefined') {
				const savedLang = localStorage.getItem('language')
				const browserLang = navigator.language?.split('-')[0]
				const supportedLangs = ['en', 'fr']

				if (savedLang && supportedLangs.includes(savedLang)) {
					return savedLang
				} else if (
					browserLang &&
					supportedLangs.includes(browserLang)
				) {
					return browserLang
				}
			}
			return 'en'
		}

		const loadTranslations = async (lang: string): Promise<void> => {
			try {
				const response = await fetch(`/locales/${lang}/common.json`)
				if (response.ok) {
					const data = await response.json()
					setTranslations(data)
				}
			} catch (error) {
				console.error('Failed to load translations:', error)
			}
		}

		const currentLang = getCurrentLanguage()
		setLanguage(currentLang)
		loadTranslations(currentLang)

		// Listen for language changes
		const handleLanguageChange = (): void => {
			const newLang = getCurrentLanguage()
			if (newLang !== language) {
				setLanguage(newLang)
				loadTranslations(newLang)
			}
		}

		window.addEventListener('storage', handleLanguageChange)
		return (): void =>
			window.removeEventListener('storage', handleLanguageChange)
	}, [language])

	const t = (key: string, params?: Record<string, unknown>): string => {
		const keys = key.split('.')
		let value: unknown = translations

		for (const k of keys) {
			if (value && typeof value === 'object' && k in value) {
				value = (value as TranslationData)[k]
			} else {
				return key // Return key if translation not found
			}
		}

		let result = typeof value === 'string' ? value : key

		// Replace parameters in the string
		if (params) {
			Object.entries(params).forEach(([paramKey, paramValue]) => {
				result = result.replace(`{${paramKey}}`, String(paramValue))
			})
		}

		return result
	}

	return { t, language }
}
