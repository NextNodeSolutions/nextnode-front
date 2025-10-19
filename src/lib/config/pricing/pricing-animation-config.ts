/**
 * Pricing Animation Configuration
 *
 * Centralized configuration for pricing page scroll-triggered animations
 */

export const OBSERVER_CONFIG = {
	threshold: 0.1, // Trigger when 10% of element is visible
	rootMargin: '0px 0px -50px 0px', // Trigger slightly before element enters viewport
} as const

export const ANIMATION_DURATIONS = {
	card: 800, // Card fade-in duration
	feature: 600, // Feature reveal duration
	price: 800, // Price emphasis duration
} as const

/**
 * Base animation delays for different sections (in milliseconds)
 */
export const SECTION_BASE_DELAYS = {
	plansHeader: 0,
	plansSubtitle: 200,
	pricingCards: 300, // Cards start at 300ms, then +100ms per card
	includedHeader: 600,
	includedSubtitle: 700,
	includedCards: 800, // Cards start at 800ms, then +100ms per card
	includedFeatures: 1000, // Features start at 1000ms, then +100ms per feature
	supportHeader: 0,
	supportSubtitle: 200,
	supportCards: 400, // Cards start at 400ms, then +200ms per card
	supportNote: 1000,
} as const

/**
 * Maps delay value (in ms) to CSS animation-delay class
 * Available classes: animation-delay-{100,200,300,400,500,600,700,800,900,1000,1200,1500}
 */
const DELAY_CLASS_MAP: Record<number, string> = {
	0: '',
	100: 'animation-delay-100',
	200: 'animation-delay-200',
	300: 'animation-delay-300',
	400: 'animation-delay-400',
	500: 'animation-delay-500',
	600: 'animation-delay-600',
	700: 'animation-delay-700',
	800: 'animation-delay-800',
	900: 'animation-delay-900',
	1000: 'animation-delay-1000',
	1100: 'animation-delay-1000', // Fallback to 1000
	1200: 'animation-delay-1200',
	1300: 'animation-delay-1200', // Fallback to 1200
	1500: 'animation-delay-1500',
} as const

/**
 * Get animation delay CSS class based on base delay and optional index
 * @param baseDelay - Base delay in milliseconds
 * @param index - Optional index to calculate incremental delay
 * @param increment - Optional increment per index (default: 100ms)
 * @returns CSS class name for animation delay
 */
export const getAnimationDelayClass = (
	baseDelay: number,
	index = 0,
	increment = 100,
): string => {
	const totalDelay = baseDelay + index * increment
	return DELAY_CLASS_MAP[totalDelay] ?? ''
}
