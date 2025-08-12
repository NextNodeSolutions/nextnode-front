// ====================================
// HOOKS REACT POUR LE SYSTÈME I18N
// ====================================
// Hooks optimisés pour utiliser l'i18n dans les composants React

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
// HOOK PRINCIPAL useI18n
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
	// Get initial locale from URL or prop
	const [locale, setLocaleState] = useState<Locale>(() => {
		if (initialLocale) return initialLocale
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

			// Store preference in localStorage
			if (typeof window !== 'undefined') {
				localStorage.setItem('preferred-locale', newLocale)

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
// HOOK POUR TRADUCTIONS SPÉCIFIQUES
// ====================================

/**
 * Hook for getting a specific translation with caching
 * Useful when you only need one translation and want to optimize re-renders
 */
export function useTranslation<T = unknown>(
	key: string,
	variables?: InterpolationVariables,
	locale?: Locale,
): { value: T; isLoading: boolean } {
	const currentLocale = locale || getLocaleFromPath(window.location.pathname)
	const [value, setValue] = useState<T>()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setIsLoading(true)
		const t = createT(currentLocale)
		const translation = variables ? (t(key, variables) as T) : (t(key) as T)
		setValue(translation)
		setIsLoading(false)
	}, [key, variables, currentLocale])

	return {
		value: value!,
		isLoading,
	}
}

// ====================================
// HOOK POUR SECTIONS COMPLÈTES
// ====================================

/**
 * Hook for getting an entire section of translations
 * Useful for forms, lists, or components that need multiple related translations
 */
export function useTranslationSection<T = unknown>(
	sectionKey: string,
	locale?: Locale,
): { section: T; isLoading: boolean } {
	const currentLocale = locale || getLocaleFromPath(window.location.pathname)
	const [section, setSection] = useState<T>()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setIsLoading(true)
		const t = createT(currentLocale)
		const sectionData = t(sectionKey) as T
		setSection(sectionData)
		setIsLoading(false)
	}, [sectionKey, currentLocale])

	return {
		section: section!,
		isLoading,
	}
}

// ====================================
// HOOK POUR LOCALE PRÉFÉRÉE
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
		// Load from localStorage on mount
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem('preferred-locale')
			if (stored === 'en' || stored === 'fr') {
				setPreferredLocaleState(stored)
			}
		}
	}, [])

	const setPreferredLocale = useCallback((locale: Locale) => {
		setPreferredLocaleState(locale)
		if (typeof window !== 'undefined') {
			localStorage.setItem('preferred-locale', locale)
			// Also set cookie for server-side detection
			document.cookie = `language=${locale}; path=/; max-age=31536000` // 1 year
		}
	}, [])

	const clearPreference = useCallback(() => {
		setPreferredLocaleState(null)
		if (typeof window !== 'undefined') {
			localStorage.removeItem('preferred-locale')
			document.cookie =
				'language=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
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
// COMPOSANT PROVIDER (optionnel)
// ====================================

/**
 * Context pour partager l'état i18n entre composants
 * Optionnel - les hooks peuvent fonctionner de manière indépendante
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
	initialLocale?: Locale
}): ReactNode {
	const { locale, t, setLocale } = useI18n(initialLocale)

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

/**
 * Hook pour utiliser le contexte i18n
 * Alternative à useI18n() quand on utilise le Provider
 */
export function useI18nContext(): I18nContextType {
	const context = useContext(I18nContext)
	if (!context) {
		throw new Error('useI18nContext must be used within an I18nProvider')
	}
	return context
}

// ====================================
// TYPES EXPORTS
// ====================================

export type { Locale, TFunction }
