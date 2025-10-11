/**
 * Marketing Section UI Constants
 *
 * Reusable UI patterns and styling constants for marketing components.
 * Helps maintain consistency across the marketing section.
 */

import { cn } from '@/lib/core/utils'

// ============================================================================
// LAYOUT CONSTANTS
// ============================================================================

/**
 * Layout configuration for marketing sections
 */
export const MARKETING_LAYOUT = {
	section: {
		/** Standard section padding */
		padding: 'py-24 sm:py-32',
		/** Max width container */
		maxWidth: 'max-w-7xl',
		/** Container horizontal padding */
		containerPadding: 'px-6 sm:px-8 lg:px-12',
	},

	grid: {
		techTransform: {
			/** Main grid columns */
			cols: 'grid grid-cols-1 items-center lg:grid-cols-12',
			/** Grid gap */
			gap: 'gap-12 lg:gap-0',
			/** Column spans for sections */
			spans: {
				tech: 'lg:col-span-5',
				beams: 'lg:col-span-2',
				benefits: 'lg:col-span-5',
			},
		},
	},

	bento: {
		/** Gap between bento cards */
		gap: '1rem',
		/** Minimum heights for bento cards */
		minHeight: {
			hero: '200px',
			heroMobile: '220px',
		},
	},
} as const

// ============================================================================
// CARD STYLES
// ============================================================================

/**
 * Reusable card styling patterns
 */
export const MARKETING_CARDS = {
	/** Main container card (glassmorphism effect) */
	container: cn(
		'rounded-3xl p-8 sm:p-10',
		'bg-white/50 dark:bg-brand-charcoal/50',
		'backdrop-blur-sm',
		'border-2 border-gray-200/50 dark:border-brand-soft-black/50',
	),

	/** Benefits section card */
	benefits: cn(
		'rounded-3xl p-6 sm:p-8',
		'bg-white/50 dark:bg-brand-charcoal/50',
		'backdrop-blur-sm',
		'border-2 border-gray-200/50 dark:border-brand-soft-black/50',
	),
} as const

// ============================================================================
// BENEFIT CARD STYLES
// ============================================================================

/**
 * Styling for benefit cards in bento grid
 */
export const BENEFIT_CARDS = {
	/** Hero benefit card (large, featured) */
	hero: cn(
		'group relative overflow-hidden',
		'rounded-2xl p-6',
		'bg-gradient-to-br from-gray-50 to-gray-100',
		'dark:from-brand-soft-black dark:to-brand-black',
		'border-2 border-gray-300 dark:border-brand-black',
		'transition-all duration-500',
		'hover:scale-[1.02] hover:shadow-2xl',
		'cursor-pointer',
	),

	/** Regular benefit card */
	regular: cn(
		'group relative overflow-hidden',
		'rounded-xl p-4',
		'bg-gray-100 dark:bg-brand-soft-black',
		'border border-gray-300 dark:border-brand-black',
		'transition-all duration-300',
		'hover:-translate-y-1 hover:scale-[1.03] hover:shadow-lg',
		'cursor-pointer',
	),

	/** Icon container for benefit cards */
	iconContainer: cn(
		'flex-shrink-0 rounded-lg p-2',
		'from-brand-blue to-brand-green bg-gradient-to-br',
		'shadow-md',
	),

	/** Hero icon container (larger) */
	heroIconContainer: cn(
		'w-fit flex-shrink-0 rounded-xl p-3',
		'from-brand-blue to-brand-green bg-gradient-to-br',
		'shadow-lg',
		'icon-pulse',
	),
} as const

// ============================================================================
// GRADIENT CLASSES
// ============================================================================

/**
 * Common gradient patterns used across marketing components
 */
export const MARKETING_GRADIENTS = {
	/** Primary brand gradient (blue to green) */
	primary: 'from-brand-blue to-brand-green bg-gradient-to-br',

	/** Text gradient (green to blue) */
	text: 'from-brand-green to-brand-blue bg-gradient-to-r bg-clip-text text-transparent',

	/** Background gradient for sections */
	sectionBg: cn(
		'bg-gradient-to-br from-gray-50/80 via-white/80 to-gray-50/80',
		'dark:from-brand-black/90 dark:via-brand-charcoal/80 dark:to-brand-black/90',
	),

	/** Hero section background */
	heroBg: cn(
		'bg-gradient-to-br from-white via-brand-gray-soft to-brand-blue-light/30',
		'dark:from-brand-black dark:via-brand-charcoal dark:to-brand-soft-black',
	),
} as const

// ============================================================================
// TYPOGRAPHY CLASSES
// ============================================================================

/**
 * Typography patterns for marketing sections
 */
export const MARKETING_TYPOGRAPHY = {
	/** Section title */
	sectionTitle: cn(
		'text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl',
		'text-gray-900 dark:text-white',
	),

	/** Section subtitle */
	sectionSubtitle: cn(
		'mx-auto max-w-3xl text-lg text-gray-600 sm:text-xl dark:text-gray-400',
	),

	/** Benefit card title */
	benefitTitle:
		'text-sm leading-tight font-semibold text-gray-900 dark:text-white',

	/** Hero benefit title */
	heroBenefitTitle: 'text-xl font-bold text-gray-900 dark:text-white',

	/** Benefit description */
	benefitDescription:
		'text-xs leading-relaxed text-gray-600 dark:text-gray-400',

	/** Hero benefit description */
	heroBenefitDescription:
		'text-sm leading-relaxed text-gray-600 dark:text-gray-400',

	/** Metric badge text */
	metricBadge: cn(
		'text-lg font-bold',
		'from-brand-green to-brand-blue bg-gradient-to-r bg-clip-text text-transparent',
	),

	/** Hero metric badge text */
	heroMetricBadge: cn(
		'text-3xl font-extrabold',
		'from-brand-green via-brand-blue to-brand-green bg-gradient-to-r bg-clip-text text-transparent',
	),
} as const

// ============================================================================
// DECORATIVE ELEMENTS
// ============================================================================

/**
 * Decorative background elements
 */
export const DECORATIVE_ELEMENTS = {
	/** Animated gradient background for hero cards */
	gradientAnimated: 'gradient-animated absolute inset-0 opacity-20',

	/** Subtle glow on hover */
	hoverGlow:
		'from-brand-green/10 to-brand-blue/10 absolute inset-0 translate-x-full bg-gradient-to-r transition-transform duration-300 group-hover:translate-x-0',
} as const

// ============================================================================
// SPACING CONSTANTS
// ============================================================================

/**
 * Consistent spacing values
 */
export const MARKETING_SPACING = {
	/** Section spacing */
	sectionGap: 'mb-16',
	/** Header spacing */
	headerGap: 'space-y-6',
	/** Card content spacing */
	cardGap: 'space-y-4',
	/** Tight spacing for card elements */
	cardTight: 'space-y-3',
} as const
