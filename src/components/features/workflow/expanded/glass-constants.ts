/**
 * Glass Effect Configuration Constants
 *
 * JavaScript values for glassmorphic design system.
 * NOT Tailwind classes (use inline or CVA for styling).
 */

export const GLASS_CONFIG = {
	/** Blur intensity values (CSS backdrop-filter) */
	blurIntensity: {
		backdrop: '40px',
		modal: '32px',
		panel: '24px',
		elevated: '16px',
		subtle: '8px',
	},

	/** Background opacity values */
	opacity: {
		backdrop: 0.4,
		modal: { light: 0.1, dark: 0.2 },
		panel: { light: 0.2, dark: 0.3 },
		elevated: { light: 0.3, dark: 0.4 },
	},
} as const

/** Shadow values for depth perception */
export const SHADOW_VALUES = {
	soft: '0 8px 32px rgba(0, 0, 0, 0.1)',
	medium: '0 20px 48px rgba(0, 0, 0, 0.15)',
	strong: '0 32px 64px rgba(0, 0, 0, 0.2)',
	hero: '0 40px 80px rgba(0, 0, 0, 0.25)',
} as const

/** Spacing values for consistent padding/margins */
export const SPACING_VALUES = {
	hero: { pt: 48, pb: 32, px: 48 },
	section: { py: 32, px: 48 },
	panel: 32,
	card: 24,
	tight: 16,
	minimal: 8,
} as const

/** Border radius values */
export const RADIUS_VALUES = {
	modal: 24,
	panel: 20,
	card: 16,
	button: 12,
	small: 8,
} as const

/** Typography scale (numeric values for calculations) */
export const TYPOGRAPHY_SCALE = {
	hero: { size: 60, lineHeight: 1.1, letterSpacing: -0.02 },
	title: { size: 48, lineHeight: 1.2, letterSpacing: -0.01 },
	sectionTitle: { size: 32, lineHeight: 1.3, letterSpacing: -0.01 },
	subtitle: { size: 20, lineHeight: 1.5, letterSpacing: 0 },
	body: { size: 16, lineHeight: 1.6, letterSpacing: 0 },
	caption: { size: 14, lineHeight: 1.5, letterSpacing: 0 },
} as const

/** Gradient configurations for step-specific styling */
export const GRADIENT_CONFIG = {
	/** Opacity stops for gradient overlays */
	overlayStops: [1, 0.8, 0],

	/** Gradient direction (degrees) */
	direction: 135,

	/** Border gradient opacity */
	borderOpacity: 0.3,
} as const

/** Glow effect configuration */
export const GLOW_CONFIG = {
	/** Base glow spread radius */
	spreadRadius: 40,

	/** Glow opacity */
	opacity: 0.3,

	/** Blur radius for glow */
	blurRadius: 60,
} as const

/** Animation duration values (milliseconds) */
export const DURATION_VALUES = {
	instant: 150,
	fast: 200,
	normal: 300,
	slow: 500,
	verySlow: 800,
} as const

/** Z-index scale for layering */
export const Z_INDEX = {
	backdrop: 50,
	modal: 51,
	modalHeader: 52,
	modalCloseButton: 53,
	floatingPanel: 54,
} as const

/** Breakpoint values (pixels) */
export const BREAKPOINTS = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	'2xl': 1536,
} as const

/** Modal dimension constraints */
export const MODAL_DIMENSIONS = {
	maxWidth: 1200,
	maxHeight: '90vh',
	minWidth: 320,
	padding: {
		mobile: 16,
		tablet: 24,
		desktop: 48,
	},
} as const
