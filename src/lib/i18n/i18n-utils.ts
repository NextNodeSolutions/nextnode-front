/**
 * i18n utilities for URL handling
 */

import { DEFAULT_LOCALE, type Locale } from './i18n-constants'

export type SupportedLocale = Locale

/**
 * Get the current locale from URL pathname
 */
export function getLocaleFromPath(pathname: string): SupportedLocale {
	const pathLangMatch = pathname.match(/^\/(en|fr)(\/|$)/)
	return pathLangMatch
		? (pathLangMatch[1] as SupportedLocale)
		: DEFAULT_LOCALE
}

/**
 * Generate a localized URL for the given path and locale
 */
export function getLocalizedUrl(path: string, locale: SupportedLocale): string {
	// Remove any existing locale prefix
	const cleanPath = path.replace(/^\/(en|fr)/, '') || '/'

	// For default locale (English), don't add prefix
	if (locale === DEFAULT_LOCALE) {
		return cleanPath === '/' ? '/' : cleanPath
	}

	// For non-default locales (French), add prefix
	return `/${locale}${cleanPath}`
}
