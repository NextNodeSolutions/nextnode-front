import type { Locale } from '../lib/i18n/types'
import { en } from './locales/en'
import { fr } from './locales/fr'
import type { NavigationLinks } from './types'

export const translations = {
	en: { common: en },
	fr: { common: fr },
}

// Constants moved from the old system
export const SUPPORTED_LOCALES: readonly Locale[] = ['en', 'fr']
export const DEFAULT_LOCALE: Locale = 'en'

export const languages = [
	{ code: 'en', name: 'English', flag: '🇺🇸' },
	{ code: 'fr', name: 'Français', flag: '🇫🇷' },
] as const

export const navigationLinks: NavigationLinks = [
	{ href: '/how-we-work', labelKey: 'common.navigation.howWeWork' },
	{ href: '/pricing', labelKey: 'common.navigation.pricing' },
]

export const locales: readonly Locale[] = SUPPORTED_LOCALES
export const defaultLocale: Locale = DEFAULT_LOCALE
