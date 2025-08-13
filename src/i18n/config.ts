import { en } from './locales/en'
import { fr } from './locales/fr'

import type { Locale } from '../lib/i18n/types'

export const translations = {
	en: { common: en },
	fr: { common: fr },
}

// Constants moved from the old system
export const SUPPORTED_LOCALES = ['en', 'fr'] as const
export const DEFAULT_LOCALE: Locale = 'en'

export const languages = [
	{ code: 'en', name: 'English', flag: '🇺🇸' },
	{ code: 'fr', name: 'Français', flag: '🇫🇷' },
] as const

export const navigationLinks = [
	{ href: '/how-we-work', titleKey: 'navigation.howWeWork' },
	{ href: '/pricing', titleKey: 'navigation.pricing' },
]

export const locales: readonly Locale[] = SUPPORTED_LOCALES
export const defaultLocale: Locale = DEFAULT_LOCALE
