/**
 * Critical initialization scripts that must run inline
 * This file exports functions that will be stringified and executed as inline scripts
 * to prevent FOUC (Flash of Unstyled Content) and ensure immediate initialization
 */

import type { Locale } from '@/types/i18n'

/**
 * Initialize theme immediately to prevent flash
 * This function will be stringified and executed inline
 */
export const initThemeInline = () => {
	// Get saved theme from localStorage or cookie
	let savedTheme = null

	// Try localStorage first
	try {
		savedTheme = localStorage.getItem('theme')
	} catch {
		// Fallback to cookie if localStorage fails
		try {
			const name = 'theme-preference='
			const cookies = document.cookie.split(';')
			for (const cookie of cookies) {
				const trimmedCookie = cookie.trim()
				if (trimmedCookie.startsWith(name)) {
					savedTheme = trimmedCookie.substring(name.length)
					break
				}
			}
		} catch {
			// If both fail, use system preference
		}
	}

	const systemPrefersDark = window.matchMedia(
		'(prefers-color-scheme: dark)',
	).matches

	// Handle 'system' preference
	const isDark =
		savedTheme === 'dark' ||
		((!savedTheme || savedTheme === 'system') && systemPrefersDark)

	if (isDark) {
		document.documentElement.classList.add('dark')
	} else {
		document.documentElement.classList.remove('dark')
	}

	// Store initial theme globally for later use
	window.initialTheme = isDark ? 'dark' : 'light'
}

/**
 * Initialize locale from server-provided data
 * This function will be called with server-side locale data
 */
export const initLocaleInline = (locale: Locale) => {
	// Set global locale for immediate access
	window.currentLanguage = locale
	window.currentLocale = locale

	// Ensure HTML lang attribute is set
	document.documentElement.setAttribute('lang', locale)
}

/**
 * Get the stringified version of initThemeInline for inline script usage
 */
export const getInitThemeScript = (): string => {
	return `(${initThemeInline.toString()})()`
}

/**
 * Get the stringified version of initLocaleInline for inline script usage
 */
export const getInitLocaleScript = (locale: string): string => {
	return `(${initLocaleInline.toString()})('${locale}')`
}

// Global types are declared in types/global.d.ts
