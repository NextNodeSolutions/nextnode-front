// ====================================
// I18N CONTEXT PROVIDER SETUP
// ====================================
// Initializes React i18n context for use in components

import type { PropsWithChildren, ReactNode } from 'react'

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '../../i18n/config'
import { I18nProvider } from './react'

import type { Locale } from '@/types/i18n'

function isValidLocale(locale: string): locale is Locale {
	return (SUPPORTED_LOCALES as readonly string[]).includes(locale)
}

/**
 * Auto-detecting I18n context provider
 * Gets locale from window.currentLocale set by BaseLayout
 */
export function ContextProvider({ children }: PropsWithChildren): ReactNode {
	// Get locale from global window variable set by BaseLayout
	const getLocale = (): Locale => {
		// biome-ignore lint/complexity/useOptionalChain: Need explicit window check for SSR safety
		if (typeof window !== 'undefined' && window?.currentLocale) {
			const currentLocale = window.currentLocale
			if (isValidLocale(currentLocale)) return currentLocale
		}

		return DEFAULT_LOCALE
	}
	const locale: Locale = getLocale()

	return <I18nProvider initialLocale={locale}>{children}</I18nProvider>
}
