import { useState, useEffect } from 'react'

import { en } from '../i18n/locales/en'
import { fr } from '../i18n/locales/fr'

import type {
	Locale,
	TranslationDict,
	TranslationKey,
	TranslationValue,
	LocaleGuard,
	TypedGetNestedValue,
} from '../i18n/types'

// Translation store
const translationStore: Record<Locale, TranslationDict> = {
	en,
	fr,
}

// Type-safe locale validation function
const isValidLocale: LocaleGuard = (value: unknown): value is Locale =>
	typeof value === 'string' &&
	(['en', 'fr'] as const).includes(value as Locale)

// Type-safe helper function to get nested value from object using dot notation
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

// Specialized typed function for getting translation values
const getTypedNestedValue: TypedGetNestedValue = <K extends TranslationKey>(
	obj: TranslationDict,
	path: K,
): TranslationValue<K> => getNestedValue(obj, path) as TranslationValue<K>

// Helper function for string interpolation
function interpolateString(
	str: string,
	params: Record<string, string | number>,
): string {
	return Object.entries(params).reduce(
		(result, [paramKey, value]) =>
			result.replace(new RegExp(`{{${paramKey}}}`, 'g'), String(value)),
		str,
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

				if (isValidLocale(savedLang)) {
					return savedLang
				} else if (isValidLocale(browserLang)) {
					return browserLang
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
		const result = getTypedNestedValue(translations, key)

		// Handle string interpolation if params are provided
		if (typeof result === 'string' && params) {
			const interpolated = interpolateString(result, params)
			return interpolated as TranslationValue<K>
		}

		// Return the result with proper typing - no need for type assertion since getTypedNestedValue is already typed
		return result
	}

	return { t, language }
}
