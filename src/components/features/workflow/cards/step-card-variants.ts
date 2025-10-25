/**
 * StepCard configuration
 * Simplified: Single render with Tailwind responsive classes
 */

/**
 * Base card dimensions in SVG units (viewBox 1000x500)
 * Used for position calculations in the workflow journey
 */
export const CARD_DIMENSIONS = {
	width: 150,
	height: 190,
}

/**
 * Feature flags for workflow cards
 * Simplified: responsive behavior via Tailwind classes in components
 */
export const CARD_FEATURES = {
	showHeader: false, // No header in workflow journey
	showDescription: true, // Hidden on mobile via md:hidden
	showStepLabel: true, // Hidden on mobile via md:hidden
}
