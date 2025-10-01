import type { Locale, NavigationLinks } from '@/types/i18n'

const LANGS = {
	en: 'en',
	fr: 'fr',
} as const

export const SUPPORTED_LOCALES: readonly Locale[] = [LANGS.en, LANGS.fr]
export const DEFAULT_LOCALE = LANGS.fr

export const languages = [
	{ code: LANGS.en, name: 'English', flag: '🇺🇸' },
	{ code: LANGS.fr, name: 'Français', flag: '🇫🇷' },
] as const

export const navigationLinks: NavigationLinks = [
	{ href: '/how-we-work', labelKey: 'common.navigation.howWeWork' },
	{ href: '/pricing', labelKey: 'common.navigation.pricing' },
]
