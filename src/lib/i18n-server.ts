import i18next, { changeLanguage, init } from 'i18next'

import { en } from '../i18n/locales/en'
import { fr } from '../i18n/locales/fr'

import type {
	TranslationDict,
	Locale,
	TranslationKey,
	TranslationValue,
} from '../i18n/types'

// Global store for translations for direct access
const translations: Record<Locale, TranslationDict> = {
	en,
	fr,
}

// Global variable to store the current language
let currentLanguage: Locale = 'en'

// Detect language from Astro request
export const detectLanguage = (request: Request): Locale => {
	// Try to retrieve from cookies
	const cookieHeader = request.headers.get('cookie')
	if (cookieHeader) {
		const cookies = Object.fromEntries(
			cookieHeader.split('; ').map(cookie => {
				const [key, value] = cookie.split('=')
				return [key, decodeURIComponent(value || '')]
			}),
		)

		const langFromCookie = cookies.language
		if (
			langFromCookie &&
			(['en', 'fr'] as const).includes(langFromCookie as Locale)
		) {
			return langFromCookie as Locale
		}
	}

	// Otherwise use Accept-Language header
	const acceptLanguage = request.headers.get('accept-language')
	if (acceptLanguage) {
		const preferredLang = acceptLanguage.split(',')[0]?.split('-')[0]
		if (
			preferredLang &&
			(['en', 'fr'] as const).includes(preferredLang as Locale)
		) {
			return preferredLang as Locale
		}
	}

	return 'en' // fallback
}

// Initialize i18next with detected language - FORCE reinitialization
export const initI18n = async (
	request: Request,
	langParam?: string,
): Promise<Locale> => {
	// Use language parameter if provided, otherwise detect
	const currentLang = (langParam as Locale) || detectLanguage(request)

	// Force complete reinitialization of i18next
	if (i18next.isInitialized) {
		await changeLanguage(currentLang)
	} else {
		await init({
			lng: currentLang,
			fallbackLng: 'en',
			resources: {
				en: { common: en },
				fr: { common: fr },
			},
			defaultNS: 'common',
			ns: ['common'],
		})
	}

	// Update global language for the t() function
	currentLanguage = currentLang

	return currentLang
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

// Type-safe translation function with automatic key validation and return type inference
export function t<K extends TranslationKey>(
	key: K,
	params?: Record<string, string | number>,
): TranslationValue<K> {
	const langData = translations[currentLanguage]
	const result = getNestedValue(langData, key)

	// Handle string interpolation if params are provided
	if (typeof result === 'string' && params) {
		return Object.entries(params).reduce(
			(str, [paramKey, value]) =>
				str.replace(new RegExp(`{{${paramKey}}}`, 'g'), String(value)),
			result,
		) as TranslationValue<K>
	}

	// Return the result with proper typing
	return result as TranslationValue<K>
}
