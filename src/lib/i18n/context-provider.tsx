// ====================================
// I18N CONTEXT PROVIDER SETUP
// ====================================
// Initializes React i18n context for use in components

import { I18nProvider } from './react'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from '../../i18n/config'

import type { Locale } from './types'
import type { ReactNode } from 'react'

function isValidLocale(locale: string): locale is Locale {
	return (SUPPORTED_LOCALES as readonly string[]).includes(locale)
}

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
			const currentLocale = window.currentLocale
			if (isValidLocale(currentLocale)) {
				return currentLocale
			}
		}
		return DEFAULT_LOCALE
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
