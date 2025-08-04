/**
 * i18n utilities for URL handling
 */

export const SUPPORTED_LOCALES = ['en', 'fr'] as const
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]
export const DEFAULT_LOCALE: SupportedLocale = 'en'

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

/**
 * Get the URL for switching to a different locale while preserving the current page
 */
export function getSwitchLocaleUrl(
	currentPath: string,
	targetLocale: SupportedLocale,
): string {
	return getLocalizedUrl(currentPath, targetLocale)
}

/**
 * Check if a locale is supported
 */
export function isSupportedLocale(locale: string): locale is SupportedLocale {
	return SUPPORTED_LOCALES.includes(locale as SupportedLocale)
}
