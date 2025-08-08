import i18next, { changeLanguage, init } from 'i18next'

import { en } from '../../i18n/locales/en'
import { fr } from '../../i18n/locales/fr'
import { getCachedNestedValue, cachedInterpolateString } from './i18n-cache'
import {
	SUPPORTED_LOCALES,
	DEFAULT_LOCALE,
	type Locale,
} from './i18n-constants'

import type {
	TranslationDict,
	TranslationKey,
	TranslationValue,
	LocaleGuard,
	TypedGetNestedValue,
} from '../../i18n/types'

// Global store for translations for direct access
export const translations: Record<Locale, TranslationDict> = {
	en,
	fr,
}

// Global variable to store the current language - use a getter for external access
let internalCurrentLanguage: Locale = 'en'

export const getCurrentLanguage = (): Locale => internalCurrentLanguage
const setCurrentLanguage = (lang: Locale): void => {
	internalCurrentLanguage = lang
}

// Type-safe locale validation function
export const isValidLocale: LocaleGuard = (value: unknown): value is Locale =>
	typeof value === 'string' &&
	(SUPPORTED_LOCALES as readonly string[]).includes(value)

// Safe locale conversion with fallback
export const toSafeLocale = (value: unknown): Locale =>
	isValidLocale(value) ? value : DEFAULT_LOCALE

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
		if (isValidLocale(langFromCookie)) {
			return langFromCookie
		}
	}

	// Otherwise use Accept-Language header
	const acceptLanguage = request.headers.get('accept-language')
	if (acceptLanguage) {
		const preferredLang = acceptLanguage.split(',')[0]?.split('-')[0]
		if (isValidLocale(preferredLang)) {
			return preferredLang
		}
	}

	return 'en' // fallback
}

// Initialize i18next with detected language - FORCE reinitialization
export const initI18n = async (
	request: Request,
	langParam?: string,
): Promise<Locale> => {
	// Use language parameter if provided and valid, otherwise detect
	const currentLang =
		langParam && isValidLocale(langParam)
			? langParam
			: detectLanguage(request)

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
	setCurrentLanguage(currentLang)

	return currentLang
}

// Type-safe helper function to get nested value from object using dot notation
export function getNestedValue<T>(obj: T, path: string): unknown {
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

// Helper to get current translations object
export function getCurrentTranslations(): TranslationDict {
	return translations[getCurrentLanguage()]
}

// Specialized typed function for getting translation values with cache
export const getTypedNestedValue: TypedGetNestedValue = <
	K extends TranslationKey,
>(
	obj: TranslationDict,
	path: K,
): TranslationValue<K> => getCachedNestedValue(obj, getCurrentLanguage(), path)

// Type-safe translation function with automatic key validation and return type inference
export function t<K extends TranslationKey>(
	key: K,
	params?: Record<string, string | number>,
): TranslationValue<K> {
	const langData = getCurrentTranslations()
	const result = getTypedNestedValue(langData, key)

	// Handle string interpolation if params are provided
	if (typeof result === 'string' && params) {
		const interpolated = cachedInterpolateString(result, params)
		return interpolated as TranslationValue<K>
	}

	// Return the result with proper typing - no need for type assertion since getTypedNestedValue is already typed
	return result
}
