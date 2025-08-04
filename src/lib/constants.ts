import type { NavigationLinks } from '@/i18n/types'

export const languages = [
	{ code: 'en', label: 'English', flag: '🇬🇧' },
	{ code: 'fr', label: 'Français', flag: '🇫🇷' },
]

export const navigationLinks: NavigationLinks = [
	{ href: '/how-we-work', labelKey: 'navigation.howWeWork' },
	{ href: '/pricing', labelKey: 'navigation.pricing' },
]
