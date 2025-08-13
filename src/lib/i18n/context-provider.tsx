// ====================================
// I18N CONTEXT PROVIDER SETUP
// ====================================
// Initializes React i18n context for use in components

import { I18nProvider } from './react'

import type { Locale } from './types'
import type { ReactNode } from 'react'

interface ContextProviderProps {
	children: ReactNode
}

/**
 * Auto-detecting I18n context provider
 * Gets locale from window.currentLocale set by BaseLayout
 */
export function ContextProvider({ children }: ContextProviderProps): ReactNode {
	// Get locale from global window variable set by BaseLayout
	const getLocale = (): Locale => {
		if (typeof window !== 'undefined' && window.currentLocale) {
			// Validate the locale value before using it
			const currentLocale = window.currentLocale
			if (currentLocale === 'en' || currentLocale === 'fr') {
				return currentLocale
			}
		}
		return 'en'
	}
	const locale: Locale = getLocale()

	return <I18nProvider initialLocale={locale}>{children}</I18nProvider>
}

// Declare global window types for TypeScript
declare global {
	interface Window {
		currentLocale?: string
		currentLanguage?: string
	}
}
