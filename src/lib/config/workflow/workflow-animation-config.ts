/**
 * Workflow Section Animation Configuration
 *
 * Centralized animation timing, delays, and observer settings
 * for the workflow section.
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
	/** No early detection margin */
	rootMargin: '0px',
} as const

// ============================================================================
// ANIMATION DURATIONS (milliseconds)
// ============================================================================

/**
 * Duration values for animations in the workflow section
 */
export const ANIMATION_DURATIONS = {
	/** Main fade-in from bottom animation */
	fadeInUp: 1000,
	/** Hover state transitions */
	hover: 300,
} as const

// ============================================================================
// ANIMATION DELAYS (milliseconds)
// ============================================================================

/**
 * Staggered animation delays for sequential reveal
 */
export const ANIMATION_DELAYS = {
	/** Workflow visualization container */
	workflowContainer: 0,
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
} as const
