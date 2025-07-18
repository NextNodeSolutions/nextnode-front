// Simple server-side translation helper
import en from '../../public/locales/en/common.json' with { type: 'json' }
import fr from '../../public/locales/fr/common.json' with { type: 'json' }

const translations = {
	en,
	fr,
}

// Global language store
let globalLanguage = 'en'

// Get current language from Astro context (cookies, headers, etc.)
export const getCurrentLanguage = (request?: Request): string => {
	if (request) {
		// Try to get language from cookie first
		const cookieHeader = request.headers.get('cookie')
		if (cookieHeader) {
			const cookies = Object.fromEntries(
				cookieHeader.split('; ').map(cookie => {
					const [key, value] = cookie.split('=')
					return [key, decodeURIComponent(value || '')]
				}),
			)

			const langFromCookie = cookies.language
			if (langFromCookie && ['en', 'fr'].includes(langFromCookie)) {
				globalLanguage = langFromCookie
				return langFromCookie
			}
		}

		// Try to get language from Accept-Language header
		const acceptLanguage = request.headers.get('accept-language')
		if (acceptLanguage) {
			const preferredLang = acceptLanguage.split(',')[0]?.split('-')[0]
			if (preferredLang && ['en', 'fr'].includes(preferredLang)) {
				globalLanguage = preferredLang
				return preferredLang
			}
		}
	}

	return 'en' // default fallback
}

// Simple translation function that uses global language
export const t = (key: string, params?: Record<string, unknown>): string => {
	const langData =
		translations[globalLanguage as keyof typeof translations] ||
		translations.en
	const keys = key.split('.')
	let value: unknown = langData

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
