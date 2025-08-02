// ====================================
// REACT HOOKS FOR I18N SYSTEM
// ====================================
// Optimized hooks for using i18n in React components

import {
	useState,
	useEffect,
	useCallback,
	useMemo,
	createContext,
	useContext,
	type ReactNode,
} from 'react'

import { createT, setGlobalLocale } from './index'
import { getLocaleFromPath } from './astro'

import type { Locale, TFunction, InterpolationVariables } from './types'

// ====================================
// MAIN useI18n HOOK
// ====================================

export interface UseI18nReturn {
	locale: Locale
	t: TFunction
	setLocale: (newLocale: Locale) => void
	toggleLocale: () => void
	isLoading: boolean
}

/**
 * Main i18n hook for React components
 * Uses React context when available (client-side), falls back to URL detection for SSR
 *
 * Usage:
 * ```tsx
 * function MyComponent() {
 *   const { t, locale, setLocale } = useI18n()
 *
 *   return (
 *     <div>
 *       <h1>{t('home.hero.title')}</h1>
 *       <button onClick={() => setLocale('fr')}>
 *         Switch to French
 *       </button>
 *     </div>
 *   )
 * }
 * ```
 */
export function useI18n(initialLocale?: Locale): UseI18nReturn {
	const context = useContext(I18nContext)

	// If context available (client-side), use it
	if (context) {
		const { locale, t, setLocale } = context

		const toggleLocale = useCallback(() => {
			const newLocale = locale === 'en' ? 'fr' : 'en'
			setLocale(newLocale)
		}, [locale, setLocale])

		return {
			locale,
			t,
			setLocale,
			toggleLocale,
			isLoading: false,
		}
	}

	// Use provided initial locale or fallback to URL detection
	const [locale, setLocaleState] = useState<Locale>(() => {
		if (initialLocale) {
			return initialLocale
		}
		// Fallback to URL-based detection for legacy components
		if (typeof window !== 'undefined') {
			return getLocaleFromPath(window.location.pathname)
		}
		return 'en'
	})

	const [isLoading, setIsLoading] = useState(false)

	// Create t function for current locale
	const t = useMemo(() => createT(locale), [locale])

	// Update global locale when local state changes
	useEffect(() => {
		setGlobalLocale(locale)
	}, [locale])

	// Set locale with optional navigation
	const setLocale = useCallback(
		(newLocale: Locale, navigate = true) => {
			if (newLocale === locale) return

			setIsLoading(true)
			setLocaleState(newLocale)

			// Store preference in cookie only
			if (typeof window !== 'undefined') {
				document.cookie = `preferred-locale=${newLocale}; path=/; max-age=31536000` // 1 year

				// Navigate to new locale if requested
				if (navigate) {
					const currentPath = window.location.pathname
					const newPath = switchLocaleInPath(currentPath, newLocale)
					if (newPath !== currentPath) {
						window.location.href = newPath
						return // Don't set loading to false, we're navigating
					}
				}
			}

			setIsLoading(false)
		},
		[locale],
	)

	// Toggle between locales
	const toggleLocale = useCallback(() => {
		const newLocale = locale === 'en' ? 'fr' : 'en'
		setLocale(newLocale)
	}, [locale, setLocale])

	return {
		locale,
		t,
		setLocale,
		toggleLocale,
		isLoading,
	}
}

// ====================================
// HOOK FOR SPECIFIC TRANSLATIONS
// ====================================

/**
 * Hook for getting a specific translation with caching
 * Useful when you only need one translation and want to optimize re-renders
 */
export function useTranslation(
	key: string,
	variables?: InterpolationVariables,
): { value: unknown; isLoading: boolean } {
	const { locale } = useI18n()
	const [value, setValue] = useState<unknown>()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setIsLoading(true)
		const t = createT(locale)
		const translation = variables ? t(key, variables) : t(key)
		setValue(translation)
		setIsLoading(false)
	}, [key, variables, locale])

	return {
		value: value!,
		isLoading,
	}
}

// ====================================
// HOOK FOR COMPLETE SECTIONS
// ====================================

/**
 * Hook for getting an entire section of translations
 * Useful for forms, lists, or components that need multiple related translations
 */
export function useTranslationSection(sectionKey: string): {
	section: unknown
	isLoading: boolean
} {
	const { locale } = useI18n()
	const [section, setSection] = useState<unknown>()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setIsLoading(true)
		const t = createT(locale)
		const sectionData = t(sectionKey)
		setSection(sectionData)
		setIsLoading(false)
	}, [sectionKey, locale])

	return {
		section: section!,
		isLoading,
	}
}

// ====================================
// HOOK FOR PREFERRED LOCALE
// ====================================

/**
 * Hook for managing user's preferred locale with persistence
 */
export function usePreferredLocale(): {
	preferredLocale: Locale | null
	setPreferredLocale: (locale: Locale) => void
	clearPreference: () => void
} {
	const [preferredLocale, setPreferredLocaleState] = useState<Locale | null>(
		null,
	)

	useEffect(() => {
		// Load from cookie on mount
		if (typeof window !== 'undefined') {
			const cookies = document.cookie.split('; ')
			const preferredLocaleCookie = cookies.find(row =>
				row.startsWith('preferred-locale='),
			)
			if (preferredLocaleCookie) {
				const stored = preferredLocaleCookie.split('=')[1]
				if (stored === 'en' || stored === 'fr') {
					setPreferredLocaleState(stored)
				}
			}
		}
	}, [])

	const setPreferredLocale = useCallback((locale: Locale) => {
		setPreferredLocaleState(locale)
		if (typeof window !== 'undefined') {
			// Set cookie for server-side detection
			document.cookie = `preferred-locale=${locale}; path=/; max-age=31536000` // 1 year
		}
	}, [])

	const clearPreference = useCallback(() => {
		setPreferredLocaleState(null)
		if (typeof window !== 'undefined') {
			document.cookie =
				'preferred-locale=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
		}
	}, [])

	return {
		preferredLocale,
		setPreferredLocale,
		clearPreference,
	}
}

// ====================================
// UTILITAIRES
// ====================================

/**
 * Switch locale in a given path
 * /en/about → /fr/about when switching to 'fr'
 */
export function switchLocaleInPath(
	currentPath: string,
	newLocale: Locale,
): string {
	// Remove current locale prefix
	const pathWithoutLocale = currentPath.replace(/^\/(en|fr)(\/|$)/, '/')

	// Add new locale prefix
	return `/${newLocale}${pathWithoutLocale === '/' ? '/' : pathWithoutLocale}`
}

/**
 * Get current locale from window location (client-side only)
 */
export function getCurrentLocale(): Locale {
	if (typeof window === 'undefined') return 'en'
	return getLocaleFromPath(window.location.pathname)
}

// ====================================
// PROVIDER COMPONENT (optional)
// ====================================

/**
 * Context to share i18n state between components
 * Optional - hooks can work independently
 */

interface I18nContextType {
	locale: Locale
	t: TFunction
	setLocale: (locale: Locale) => void
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({
	children,
	initialLocale,
}: {
	children: ReactNode
	initialLocale: Locale
}): ReactNode {
	// Create standalone state for provider (not dependent on useI18n hook)
	const [locale, setLocaleState] = useState<Locale>(initialLocale)

	// Create t function for current locale
	const t = useMemo(() => createT(locale), [locale])

	// Update global locale when local state changes
	useEffect(() => {
		setGlobalLocale(locale)
	}, [locale])

	// Set locale with optional navigation
	const setLocale = useCallback(
		(newLocale: Locale, navigate = true) => {
			if (newLocale === locale) return

			setLocaleState(newLocale)

			// Store preference in cookie only
			if (typeof window !== 'undefined') {
				document.cookie = `preferred-locale=${newLocale}; path=/; max-age=31536000` // 1 year

				// Navigate to new locale if requested
				if (navigate) {
					const currentPath = window.location.pathname
					const newPath = switchLocaleInPath(currentPath, newLocale)
					if (newPath !== currentPath) {
						window.location.href = newPath
						return
					}
				}
			}
		},
		[locale],
	)

	const value = useMemo(
		() => ({
			locale,
			t,
			setLocale,
		}),
		[locale, t, setLocale],
	)

	return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

// ====================================
// TYPES EXPORTS
// ====================================

export type { Locale, TFunction }
