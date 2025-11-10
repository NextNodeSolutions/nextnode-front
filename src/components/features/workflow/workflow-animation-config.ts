import type { Transition, Variants } from 'motion/react'

/**
 * Workflow Animation Configuration
 *
 * Centralized animation config for workflow components:
 * - Expanded modal animations
 * - Content stagger effects
 * - Micro-interactions
 * - Parallax effects
 */

/**
 * Modal Entry/Exit Transitions
 */
export const MODAL_TRANSITIONS = {
	/** Backdrop fade in/out */
	backdropFade: {
		duration: 0.3,
		ease: 'easeInOut',
	} as Transition,

	/** Modal spring animation (smooth, natural) */
	modalSpring: {
		type: 'spring',
		stiffness: 300,
		damping: 30,
		mass: 0.8,
	} as Transition,

	/** Fast fade for auxiliary elements */
	fastFade: {
		duration: 0.2,
		ease: 'easeOut',
	} as Transition,
} as const

/**
 * Content Stagger Configuration
 */
export const STAGGER_CONFIG = {
	/** Parent container stagger */
	container: {
		staggerChildren: 0.1,
		delayChildren: 0.2,
	},

	/** Fast stagger for lists */
	fast: {
		staggerChildren: 0.05,
		delayChildren: 0.1,
	},

	/** Slow, dramatic stagger */
	slow: {
		staggerChildren: 0.15,
		delayChildren: 0.3,
	},
} as const

/**
 * Framer Motion Variants for Staggered Animations
 */
export const STAGGER_VARIANTS: Variants = {
	hidden: {
		opacity: 0,
		y: 20,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: 'easeOut',
		},
	},
}

/**
 * Hero Section Animation Variants
 */
export const HERO_VARIANTS: Variants = {
	hidden: {
		opacity: 0,
		scale: 0.95,
	},
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.6,
			ease: [0.43, 0.13, 0.23, 0.96], // Custom easing
		},
	},
}

/**
 * Panel Float-In Variants
 */
export const PANEL_VARIANTS: Variants = {
	hidden: {
		opacity: 0,
		y: 30,
		scale: 0.96,
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.5,
			ease: 'easeOut',
		},
	},
}

/**
 * Micro-Interaction Transitions
 */
export const MICRO_INTERACTIONS = {
	/** Button/card hover lift */
	lift: {
		whileHover: {
			y: -4,
			scale: 1.02,
			transition: {
				type: 'spring',
				stiffness: 400,
				damping: 25,
			},
		},
		whileTap: {
			scale: 0.98,
		},
	},

	/** Subtle scale on hover */
	scale: {
		whileHover: {
			scale: 1.05,
			transition: {
				type: 'spring',
				stiffness: 400,
				damping: 25,
			},
		},
		whileTap: {
			scale: 0.95,
		},
	},

	/** Glow effect (no transform, just visual) */
	glow: {
		whileHover: {
			boxShadow: '0 0 40px rgba(255, 255, 255, 0.3)',
			transition: {
				duration: 0.3,
			},
		},
	},

	/** Icon bounce */
	bounce: {
		whileHover: {
			y: -2,
			transition: {
				type: 'spring',
				stiffness: 500,
				damping: 15,
				repeat: Number.POSITIVE_INFINITY,
				repeatType: 'reverse' as const,
				repeatDelay: 0.1,
			},
		},
	},
} as const

/**
 * Parallax Configuration
 */
export const PARALLAX_CONFIG = {
	/** Smooth parallax for hero backgrounds */
	smooth: {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	} as Transition,

	/** Fast parallax for subtle effects */
	fast: {
		stiffness: 200,
		damping: 40,
		restDelta: 0.001,
	} as Transition,

	/** Slow, dramatic parallax */
	slow: {
		stiffness: 50,
		damping: 20,
		restDelta: 0.001,
	} as Transition,
} as const

/**
 * Timeline Animation Configuration
 */
export const TIMELINE_CONFIG = {
	/** Duration for progress line draw animation (ms) */
	progressDrawDuration: 1500,

	/** Delay between node reveals (ms) */
	nodeRevealDelay: 200,

	/** Node pulse animation config */
	nodePulse: {
		scale: [1, 1.2, 1],
		opacity: [1, 0.8, 1],
		transition: {
			duration: 2,
			repeat: Number.POSITIVE_INFINITY,
			ease: 'easeInOut',
		},
	},
} as const

/**
 * Scroll Animation Thresholds
 */
export const SCROLL_THRESHOLDS = {
	/** Trigger when element is 20% visible */
	early: 0.2,

	/** Trigger when element is 50% visible */
	mid: 0.5,

	/** Trigger when element is 80% visible */
	late: 0.8,
} as const

/**
 * Duration Constants (milliseconds)
 */
export const DURATIONS = {
	instant: 150,
	fast: 200,
	normal: 300,
	slow: 500,
	verySlow: 800,
	timeline: 1500,
} as const

/**
 * Bottom Sheet Configuration (Mobile)
 */
export const BOTTOM_SHEET_CONFIG = {
	/** Spring physics for natural slide-up feel */
	spring: {
		type: 'spring',
		stiffness: 300,
		damping: 30,
		mass: 0.8,
	} as Transition,

	/** Drag constraints and elasticity */
	drag: {
		drag: 'y' as const,
		dragConstraints: { top: 0, bottom: 0 },
		dragElastic: 0.2,
	},

	/** Swipe-to-close thresholds */
	dismissThreshold: {
		offset: 100, // pixels
		velocity: 500, // pixels per second
	},

	/** Backdrop transition */
	backdropFade: {
		duration: 0.2,
		ease: 'easeInOut',
	} as Transition,

	/** Accordion spring (slightly less snappy than sheet) */
	accordionSpring: {
		type: 'spring',
		stiffness: 200,
		damping: 25,
		mass: 1,
	} as Transition,
} as const
