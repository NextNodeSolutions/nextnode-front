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
// LAYOUT CONSTANTS - Single source of truth for container and spacing
// =============================================================================

/** Standard container classes with responsive padding */
export const CONTAINER_CLASSES = {
	/** Extra large container: max-w-7xl with responsive padding */
	xl: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
	/** Large container: max-w-5xl with responsive padding */
	lg: 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8',
	/** Medium container: max-w-3xl with responsive padding */
	md: 'max-w-3xl mx-auto px-4 sm:px-6 lg:px-8',
	/** Small container: max-w-2xl with responsive padding */
	sm: 'max-w-2xl mx-auto px-4 sm:px-6 lg:px-8',
} as const

/** Common spacing classes */
export const SPACING = {
	/** Vertical spacing variants */
	vertical: {
		xs: 'space-y-2',
		sm: 'space-y-4',
		md: 'space-y-6',
		lg: 'space-y-8',
		xl: 'space-y-10',
		'2xl': 'space-y-12',
	},
	/** Gap variants for flex/grid */
	gap: {
		xs: 'gap-2',
		sm: 'gap-4',
		md: 'gap-6',
		lg: 'gap-8',
		xl: 'gap-10',
		'2xl': 'gap-12',
	},
} as const

// =============================================================================
// ANIMATION CONSTANTS - Single source of truth for transitions and animations
// =============================================================================

/** Standard transition durations */
export const TRANSITIONS = {
	fast: 'duration-300',
	normal: 'duration-500',
	slow: 'duration-700',
	/** Common transition class */
	all: 'transition-all',
} as const

// =============================================================================
// GLASSMORPHISM PRESETS - Single source of truth for glass effects
// =============================================================================

/** Predefined glassmorphism configurations for different use cases */
export const GLASSMORPHISM_PRESETS = {
	/** For modals requiring high readability (forms, text-heavy content) */
	modal: {
		baseOpacity: 0.05,
		blur: 20,
		colorOpacity: 35,
		readabilityOpacity: 0.85,
	},
	/** For step cards and informational displays */
	card: {
		baseOpacity: 0.05,
		blur: 20,
		colorOpacity: 40,
		readabilityOpacity: 0.75,
	},
	/** For subtle background elements */
	subtle: {
		baseOpacity: 0.03,
		blur: 15,
		colorOpacity: 25,
		readabilityOpacity: 0.6,
	},
} as const

// =============================================================================
// NAVIGATION
// =============================================================================

export const navigationLinks: NavigationLinks = [
	{ href: '/how-we-work', labelKey: 'navigation.howWeWork' },
	{ href: '/pricing', labelKey: 'navigation.pricing' },
]
