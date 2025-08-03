import i18next, { changeLanguage, init } from 'i18next'

import { en } from '../i18n/locales/en'
import { fr } from '../i18n/locales/fr'

import type { Translations, Locale } from '../i18n/types'

// Global store for translations for direct access
const translations: Record<Locale, Translations> = {
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

// Generic translation function that can return different types
function getValue(obj: unknown, keyPath: string[]): unknown {
	if (!obj || typeof obj !== 'object' || keyPath.length === 0) {
		return obj
	}

	const [currentKey, ...remainingKeys] = keyPath

	if (!currentKey) {
		return undefined
	}

	// Handle numeric indices for arrays
	if (/^\d+$/.test(currentKey) && Array.isArray(obj)) {
		const index = parseInt(currentKey, 10)
		if (index < obj.length) {
			return getValue(obj[index], remainingKeys)
		}
		return undefined
	}

	// Handle normal objects
	if (!Array.isArray(obj)) {
		const typedObj = obj as Record<string, unknown>
		if (currentKey in typedObj) {
			return getValue(typedObj[currentKey], remainingKeys)
		}
	}

	return undefined
}

// Overload of the t function to support different return types
export function t(key: string): string
export function t<T = unknown>(key: string): T
export function t(key: string): unknown {
	const langData = translations[currentLanguage]
	const keys = key.split('.')
	const result = getValue(langData, keys)

	// If it's a string, return it directly
	if (typeof result === 'string') {
		return result
	}

	// If it's an array of strings, join them
	if (
		Array.isArray(result) &&
		result.every(item => typeof item === 'string')
	) {
		return result.join(', ')
	}

	// If it's an object, return it as is (for cases like steps.discovery)
	if (result && typeof result === 'object') {
		return result
	}

	// Fallback
	return key
}
