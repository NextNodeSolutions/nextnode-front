/**
 * TechTransformation Animation Configuration
 *
 * Centralized animation timing, delays, and keyframe values
 * for the TechTransformation section.
 */

// ============================================================================
// INTERSECTION OBSERVER CONFIGURATION
// ============================================================================

/**
 * Settings for the Intersection Observer that triggers animations
 */
export const OBSERVER_CONFIG = {
	/** Trigger when 50% of section is visible */
	threshold: 0.5,
	/** No margin offset */
	rootMargin: '0px',
} as const

// ============================================================================
// ANIMATION DURATIONS (milliseconds)
// ============================================================================

/**
 * Duration values for all animations in the section
 */
export const ANIMATION_DURATIONS = {
	/** Section animations (fade-in-up, fade-in-left, fade-in-right) */
	section: 1000,
	/** Card animations (fade-in only) */
	card: 800,
	/** Icon pulse effect */
	iconPulse: 2000,
	/** Background gradient shifting */
	gradientShift: 8000,
	/** Hover state transitions */
	hover: 300,
	/** Long hover transitions */
	hoverLong: 500,
} as const

// ============================================================================
// ANIMATION DELAYS (milliseconds)
// ============================================================================

/**
 * Staggered animation delays for sequential reveal
 * Reduced for faster, more dynamic presentation
 */
export const ANIMATION_DELAYS = {
	title: 0,
	subtitle: 0,
	techSection: 0,
	beams: 0,
	benefits: 0,
	heroCard: 400,
	card1: 700,
	card2: 700,
	card3: 1000,
	card4: 1000,
	card5: 1300,
	ctaMessage: 0,
} as const

// ============================================================================
// KEYFRAME ANIMATION VALUES
// ============================================================================

/**
 * Values used in CSS keyframe animations
 */
export const KEYFRAME_VALUES = {
	fadeInUp: {
		from: {
			opacity: 0,
			translateY: '60px',
		},
		to: {
			opacity: 1,
			translateY: '0',
		},
	},
	fadeInLeft: {
		from: {
			opacity: 0,
			translateX: '-60px',
		},
		to: {
			opacity: 1,
			translateX: '0',
		},
	},
	fadeInRight: {
		from: {
			opacity: 0,
			translateX: '60px',
		},
		to: {
			opacity: 1,
			translateX: '0',
		},
	},
	fadeIn: {
		from: { opacity: 0 },
		to: { opacity: 1 },
	},
	float: {
		/** Floating particle movement (pixels) */
		translate: { x: 20, y: 20 },
	},
	pulseRing: {
		scaleFrom: 1,
		scaleTo: 2,
		opacityFrom: 0.5,
		opacityTo: 0,
	},
	iconPulse: {
		/** Scale on pulse */
		scale: 1.05,
		/** Shadow expansion */
		shadowMax: '0 0 0 10px rgba(59, 130, 246, 0)',
		shadowBase: '0 0 0 0 rgba(59, 130, 246, 0.7)',
	},
	gradientShift: {
		/** Background position keyframes */
		positions: ['0% 50%', '100% 50%', '0% 50%'],
	},
} as const

// ============================================================================
// HOVER TRANSFORMATIONS
// ============================================================================

/**
 * Transform values for hover states
 */
export const HOVER_TRANSFORMS = {
	card: {
		/** Regular card lift */
		translateY: -4,
		/** Regular card scale */
		scale: 1.03,
	},
	heroCard: {
		/** Hero card scale (no translateY) */
		scale: 1.02,
	},
} as const

// ============================================================================
// GRADIENT ANIMATION CONFIGURATION
// ============================================================================

/**
 * Configuration for animated gradients
 */
export const GRADIENT_ANIMATION = {
	/** Background size for animated gradients */
	backgroundSize: '200% 200%',
	/** Hero gradient color stops */
	heroStops: {
		0: 'from-brand-blue/30',
		50: 'via-brand-green/30',
		100: 'to-brand-blue/30',
	},
} as const

// ============================================================================
// DECORATIVE ELEMENTS CONFIGURATION
// ============================================================================

/**
 * Configuration for decorative background elements
 */
export const DECORATIVE_CONFIG = {
	blobs: {
		green: {
			classes:
				'bg-brand-green-soft/20 dark:bg-brand-green-soft/30 absolute top-20 right-10 h-96 w-96 animate-pulse rounded-full opacity-40 blur-3xl',
			delay: 0,
		},
		blue: {
			classes:
				'bg-brand-blue-soft/20 dark:bg-brand-blue-soft/30 absolute bottom-20 left-10 h-96 w-96 animate-pulse rounded-full opacity-40 blur-3xl',
			delay: 2000,
		},
	},
} as const

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get animation class names for an element based on animation type
 */
export const getAnimationClasses = (type: 'fadeInUp' | 'fadeIn') =>
	`tech-animate tech-animate-${type}` as const
