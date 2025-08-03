import { useState, useEffect } from 'react'

import { en } from '../i18n/locales/en'
import { fr } from '../i18n/locales/fr'

import type { Translations, Locale, TranslationFunction } from '../i18n/types'

// Translation store
const translationStore: Record<Locale, Translations> = {
	en,
	fr,
}

// React hook for i18n in client components
export const useI18n = (): {
	t: TranslationFunction
	language: Locale
} => {
	const [language, setLanguage] = useState<Locale>('en')
	const [translations, setTranslations] = useState<Translations>(en)

	useEffect(() => {
		// Get current language from various sources
		const getCurrentLanguage = (): Locale => {
			if (typeof window !== 'undefined') {
				const savedLang = localStorage.getItem('language')
				const browserLang = navigator.language?.split('-')[0]
				const supportedLangs: readonly Locale[] = ['en', 'fr'] as const

				if (savedLang && supportedLangs.includes(savedLang as Locale)) {
					return savedLang as Locale
				} else if (
					browserLang &&
					supportedLangs.includes(browserLang as Locale)
				) {
					return browserLang as Locale
				}
			}
			return 'en'
		}

		const loadTranslations = (lang: Locale): void => {
			const translations = translationStore[lang]
			if (translations) {
				setTranslations(translations)
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
				value = (value as Record<string, unknown>)[k]
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
