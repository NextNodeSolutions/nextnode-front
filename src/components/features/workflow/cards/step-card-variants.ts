/**
 * StepCard variants configuration
 * Extracted from StepCard.astro for better maintainability
 */

export type StepCardVariant = 'mobile' | 'compact' | 'mini'

/**
 * Fixed card dimensions in SVG units (viewBox 1000x500)
 * Used for position calculations in the workflow journey
 */
export const CARD_DIMENSIONS = {
	mini: { width: 180, height: 130 },
	compact: { width: 200, height: 180 },
	mobile: { width: 250, height: 280 },
} as const

/**
 * Comprehensive styling variants for StepCard components
 * Each variant optimizes for different screen sizes and contexts
 */
export const STEP_CARD_VARIANTS = {
	container: {
		mobile: 'duration-700 hover:scale-[1.05]',
		compact: 'duration-300 hover:scale-[1.03]',
		mini: 'duration-200 hover:scale-[1.02]',
	},
	header: {
		mobile: 'h-32',
		compact: 'h-16',
		mini: 'h-12',
	},
	content: {
		mobile: 'space-y-4 p-6',
		compact: 'space-y-1 p-3',
		mini: 'p-2',
	},
	title: {
		mobile: 'text-xl line-clamp-2 min-h-[3.5rem]',
		compact: 'text-base line-clamp-2 min-h-[2.5rem]',
		mini: 'text-sm line-clamp-2 min-h-[2rem]',
	},
	description: {
		mobile: 'line-clamp-5 text-sm',
		compact: 'line-clamp-3 text-xs',
		mini: 'hidden',
	},
	icon: {
		mobile: 'h-16 w-16',
		compact: 'h-8 w-8',
		mini: 'h-6 w-6',
	},
	number: {
		mobile: 'h-12 w-12',
		compact: 'h-6 w-6',
		mini: 'h-5 w-5',
	},
	iconText: {
		mobile: 'text-3xl',
		compact: 'text-lg',
		mini: 'text-base',
	},
	numberText: {
		mobile: 'text-2xl',
		compact: 'text-sm',
		mini: 'text-xs',
	},
	position: {
		mobile: 'top-4 right-4',
		compact: 'top-1 right-1',
		mini: 'top-1 right-1',
	},
	iconPosition: {
		mobile: 'bottom-4 left-4',
		compact: 'bottom-1 left-1',
		mini: 'bottom-1 left-1',
	},
} as const

/**
 * Helper function to get variant-specific classes
 */
export function getVariantClasses(
	variant: StepCardVariant,
	section: keyof typeof STEP_CARD_VARIANTS,
): string {
	return STEP_CARD_VARIANTS[section][variant]
}

/**
 * Check if variant supports specific features
 */
export const VARIANT_FEATURES = {
	showHeader: (variant: StepCardVariant): boolean => variant === 'mobile',
	showDescription: (variant: StepCardVariant): boolean => variant !== 'mini',
	showStepLabel: (variant: StepCardVariant): boolean => variant !== 'mini',
} as const

/**
 * Type-safe variant checker
 */
export function isValidVariant(variant: string): variant is StepCardVariant {
	return ['mobile', 'compact', 'mini'].includes(variant)
}
