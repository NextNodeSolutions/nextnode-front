/**
 * Pricing Animation Configuration
 *
 * Centralized configuration for pricing page scroll-triggered animations
 */

export const OBSERVER_CONFIG = {
	threshold: 0.2, // Trigger when 10% of element is visible
	rootMargin: '0px 0px -50px 0px', // Trigger slightly before element enters viewport
} as const

export const ANIMATION_DURATIONS = {
	card: 800, // Card fade-in duration
	feature: 600, // Feature reveal duration
	price: 800, // Price emphasis duration
} as const
