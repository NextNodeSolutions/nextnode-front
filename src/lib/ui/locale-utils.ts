/**
 * Locale detection and management utilities
 * Standardizes language access patterns across components
 */

import type { Locale } from '@/i18n/types'

/**
 * Valid locales supported by the application
 */
export const SUPPORTED_LOCALES = ['en', 'fr'] as const
export const DEFAULT_LOCALE: Locale = 'en'

/**
 * Check if a locale string is valid
 */
export function isValidLocale(
	locale: string | undefined | null,
): locale is Locale {
	return Boolean(locale && SUPPORTED_LOCALES.includes(locale as Locale))
}

/**
 * Get current locale from Astro context with fallback
 * Standardizes the pattern used across components
 */
export function getCurrentLocale(astroLocale?: string | undefined): Locale {
	if (isValidLocale(astroLocale)) {
		return astroLocale
	}
	return DEFAULT_LOCALE
}

/**
 * Extract locale from URL pathname
 * Useful for client-side locale detection
 */
export function getLocaleFromPath(pathname: string): Locale {
	// Match patterns like /en/, /fr/, /en/path, /fr/path
	const pathLangMatch = pathname.match(/^\/(en|fr)(\/|$)/)

	if (pathLangMatch && isValidLocale(pathLangMatch[1])) {
		return pathLangMatch[1]
	}

	return DEFAULT_LOCALE
}

/**
 * Get locale from various sources with priority
 * 1. Explicit locale parameter
 * 2. Astro current locale
 * 3. URL pathname
 * 4. Default fallback
 */
export function resolveLocale(options: {
	explicitLocale?: string | undefined
	astroLocale?: string | undefined
	pathname?: string
}): Locale {
	const { explicitLocale, astroLocale, pathname } = options

	// Priority 1: Explicit locale
	if (isValidLocale(explicitLocale)) {
		return explicitLocale
	}

	// Priority 2: Astro current locale
	if (isValidLocale(astroLocale)) {
		return astroLocale
	}

	// Priority 3: Extract from pathname
	if (pathname) {
		const pathLocale = getLocaleFromPath(pathname)
		if (isValidLocale(pathLocale)) {
			return pathLocale
		}
	}

	// Priority 4: Default fallback
	return DEFAULT_LOCALE
}

/**
 * Generate locale-aware path
 * Ensures consistent URL structure
 */
export function getLocalePath(locale: Locale, path: string): string {
	// Remove leading slash from path if present
	const cleanPath = path.startsWith('/') ? path.slice(1) : path

	// For default locale, don't add locale prefix
	if (locale === DEFAULT_LOCALE && !cleanPath) {
		return '/'
	}

	return `/${locale}${cleanPath ? `/${cleanPath}` : ''}`
}

/**
 * Client-side utilities for locale management
 */
export const clientLocaleUtils = {
	/**
	 * Get current locale from browser URL
	 */
	getCurrentLocale(): Locale {
		return getLocaleFromPath(window.location.pathname)
	},

	/**
	 * Navigate to a path in a specific locale
	 */
	navigateToLocale(locale: Locale, path: string = ''): void {
		const localePath = getLocalePath(locale, path)
		window.location.href = localePath
	},

	/**
	 * Switch to a different locale while maintaining current path
	 */
	switchLocale(newLocale: Locale): void {
		const currentPath = window.location.pathname
		const currentLocale = this.getCurrentLocale()

		// Remove current locale from path
		const pathWithoutLocale =
			currentPath.replace(`/${currentLocale}`, '') || '/'

		// Navigate to new locale with same path
		const newPath = getLocalePath(newLocale, pathWithoutLocale)
		window.location.href = newPath
	},
}
