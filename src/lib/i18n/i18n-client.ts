import { useState, useEffect } from 'react'

import { en } from '../../i18n/locales/en'
import { fr } from '../../i18n/locales/fr'
import { cachedInterpolateString, getCachedNestedValue } from './i18n-cache'
import { SUPPORTED_LOCALES, type Locale } from './i18n-constants'

import type {
	TranslationDict,
	TranslationKey,
	TranslationValue,
	LocaleGuard,
} from '../../i18n/types'

// Translation store
const translationStore: Record<Locale, TranslationDict> = {
	en,
	fr,
}

// Type-safe locale validation function
const isValidLocale: LocaleGuard = (value: unknown): value is Locale =>
	typeof value === 'string' &&
	(SUPPORTED_LOCALES as readonly string[]).includes(value)

// Specialized typed function for getting translation values with cache
const getTypedNestedValue = <K extends TranslationKey>(
	obj: TranslationDict,
	path: K,
	locale: Locale,
): TranslationValue<K> => getCachedNestedValue(obj, locale, path)

// Type-safe translation function for client-side
type ClientTranslationFunction = <K extends TranslationKey>(
	key: K,
	params?: Record<string, string | number>,
) => TranslationValue<K>

// React hook for i18n in client components - simplified to use Astro as source of truth
export const useI18n = (): {
	t: ClientTranslationFunction
	language: Locale
} => {
	// Get current language from Astro (single source of truth)
	const getCurrentLanguage = (): Locale => {
		if (typeof window !== 'undefined') {
			// Use Astro-provided current language
			const astroLang =
				window.currentLanguage ||
				window.languageManager?.getCurrentLanguage()
			if (isValidLocale(astroLang)) {
				return astroLang
			}
		}
		return 'en' // fallback
	}

	const [language, setLanguage] = useState<Locale>(getCurrentLanguage)
	const [translations, setTranslations] = useState<TranslationDict>(
		() => translationStore[getCurrentLanguage()],
	)

	useEffect(() => {
		const loadTranslations = (lang: Locale): void => {
			const langTranslations = translationStore[lang]
			if (langTranslations) {
				setTranslations(langTranslations)
			}
		}

		// Listen for language changes from Astro's language manager
		const handleLanguageChange = (): void => {
			const newLang = getCurrentLanguage()
			if (newLang !== language) {
				setLanguage(newLang)
				loadTranslations(newLang)
			}
		}

		// Listen for custom language change events (fired by Astro's languageManager)
		const handleCustomLanguageChange = (event: Event): void => {
			const customEvent = event as CustomEvent
			const newLang = customEvent.detail?.language || getCurrentLanguage()
			if (isValidLocale(newLang) && newLang !== language) {
				setLanguage(newLang)
				loadTranslations(newLang)
			}
		}

		// Set up event listeners
		window.addEventListener('languagechange', handleCustomLanguageChange)
		window.addEventListener('popstate', handleLanguageChange)

		return (): void => {
			window.removeEventListener(
				'languagechange',
				handleCustomLanguageChange,
			)
			window.removeEventListener('popstate', handleLanguageChange)
		}
	}, [language])

	const t = <K extends TranslationKey>(
		key: K,
		params?: Record<string, string | number>,
	): TranslationValue<K> => {
		const result = getTypedNestedValue(translations, key, language)

		// Handle string interpolation if params are provided
		if (typeof result === 'string' && params) {
			const interpolated = cachedInterpolateString(result, params)
			return interpolated as TranslationValue<K>
		}

		return result
	}

	return { t, language }
}
