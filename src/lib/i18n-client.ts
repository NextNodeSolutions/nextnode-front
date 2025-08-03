import { useState, useEffect } from 'react'

import { en } from '../i18n/locales/en'
import { fr } from '../i18n/locales/fr'

import type {
	Locale,
	TranslationDict,
	TranslationKey,
	TranslationValue,
} from '../i18n/types'

// Translation store
const translationStore: Record<Locale, TranslationDict> = {
	en,
	fr,
}

// Helper function to get nested value from object using dot notation
function getNestedValue<T>(obj: T, path: string): unknown {
	return path
		.split('.')
		.reduce(
			(current: unknown, key: string) =>
				current && typeof current === 'object' && key in current
					? (current as Record<string, unknown>)[key]
					: undefined,
			obj,
		)
}

// Type-safe translation function for client-side
type ClientTranslationFunction = <K extends TranslationKey>(
	key: K,
	params?: Record<string, string | number>,
) => TranslationValue<K>

// React hook for i18n in client components
export const useI18n = (): {
	t: ClientTranslationFunction
	language: Locale
} => {
	const [language, setLanguage] = useState<Locale>('en')
	const [translations, setTranslations] = useState<TranslationDict>(en)

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
			const langTranslations = translationStore[lang]
			if (langTranslations) {
				setTranslations(langTranslations)
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

	const t = <K extends TranslationKey>(
		key: K,
		params?: Record<string, string | number>,
	): TranslationValue<K> => {
		const result = getNestedValue(translations, key)

		// Handle string interpolation if params are provided
		if (typeof result === 'string' && params) {
			return Object.entries(params).reduce(
				(str, [paramKey, value]) =>
					str.replace(
						new RegExp(`{{${paramKey}}}`, 'g'),
						String(value),
					),
				result,
			) as TranslationValue<K>
		}

		// Return the result with proper typing
		return result as TranslationValue<K>
	}

	return { t, language }
}
