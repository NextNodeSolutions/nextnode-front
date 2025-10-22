/**
 * StepCard variants configuration
 * Extracted from StepCard.astro for better maintainability
 */

export type StepCardVariant = 'mini' | 'compact' | 'large'

/**
 * Fixed card dimensions in SVG units (viewBox 1000x500)
 * Used for position calculations in the workflow journey
 */
export const CARD_DIMENSIONS = {
	mini: { width: 180, height: 150 },
	compact: { width: 200, height: 220 },
	large: { width: 200, height: 240 },
} as const

/**
 * Comprehensive styling variants for StepCard components
 * Each variant optimizes for different screen sizes and contexts
 */
export const STEP_CARD_VARIANTS = {
	container: {
		mini: 'duration-200 hover:scale-[1.02]',
		compact: 'duration-300 hover:scale-[1.03]',
		large: 'duration-500 hover:scale-[1.04]',
	},
	header: {
		mini: 'h-12',
		compact: 'h-16',
		large: 'h-20',
	},
	content: {
		mini: 'p-2',
		compact: 'space-y-1 p-3',
		large: 'space-y-2 p-4',
	},
	title: {
		mini: 'text-sm line-clamp-2 min-h-[2rem]',
		compact: 'text-base line-clamp-2 min-h-[2.5rem]',
		large: 'text-lg line-clamp-2 min-h-[3rem]',
	},
	description: {
		mini: 'hidden',
		compact: 'line-clamp-3 text-xs',
		large: 'line-clamp-4 text-sm',
	},
	icon: {
		mini: 'h-6 w-6',
		compact: 'h-8 w-8',
		large: 'h-10 w-10',
	},
	number: {
		mini: 'h-5 w-5',
		compact: 'h-6 w-6',
		large: 'h-8 w-8',
	},
	iconText: {
		mini: 'text-base',
		compact: 'text-lg',
		large: 'text-xl',
	},
	numberText: {
		mini: 'text-xs',
		compact: 'text-sm',
		large: 'text-lg',
	},
	position: {
		mini: 'top-1 right-1',
		compact: 'top-1 right-1',
		large: 'top-2 right-2',
	},
	iconPosition: {
		mini: 'bottom-1 left-1',
		compact: 'bottom-1 left-1',
		large: 'bottom-2 left-2',
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
	showHeader: (_variant: StepCardVariant): boolean => false, // No header in workflow journey variants
	showDescription: (variant: StepCardVariant): boolean => variant !== 'mini',
	showStepLabel: (variant: StepCardVariant): boolean => variant !== 'mini',
} as const

/**
 * Type-safe variant checker
 */
export function isValidVariant(variant: string): variant is StepCardVariant {
	return ['mini', 'compact', 'large'].includes(variant)
}
