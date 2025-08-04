import type { NavigationLinks } from '@/i18n/types'

// =============================================================================
// I18N CONSTANTS - Single source of truth for internationalization
// =============================================================================

/** Supported locales in the application */
export const SUPPORTED_LOCALES = ['en', 'fr'] as const

/** Locale type derived from SUPPORTED_LOCALES */
export type Locale = (typeof SUPPORTED_LOCALES)[number]

/** Default locale for the application */
export const DEFAULT_LOCALE: Locale = 'en'

/** Language configurations with display metadata */
export const languages = [
	{ code: 'en', label: 'English', flag: '🇬🇧' },
	{ code: 'fr', label: 'Français', flag: '🇫🇷' },
] as const

// =============================================================================
// NAVIGATION
// =============================================================================

export const navigationLinks: NavigationLinks = [
	{ href: '/how-we-work', labelKey: 'navigation.howWeWork' },
	{ href: '/pricing', labelKey: 'navigation.pricing' },
]
