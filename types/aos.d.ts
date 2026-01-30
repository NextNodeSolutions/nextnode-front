/**
 * Type declarations for AOS (Animate On Scroll) library
 * @see https://github.com/michalsnik/aos
 */

declare module 'aos' {
	interface AosOptions {
		/** Start animation on element only once when scrolling down (default: false) */
		once?: boolean
		/** Duration of animation in ms (default: 400) */
		duration?: number
		/** Easing function (default: 'ease') */
		easing?: string
		/** Delay before animation starts in ms (default: 0) */
		delay?: number
		/** Offset from original trigger point (default: 120) */
		offset?: number
		/** Anchor element for offset calculation */
		anchor?: string
		/** Anchor placement: 'top-bottom' | 'top-center' | 'top-top' | 'center-bottom' | 'center-center' | 'center-top' | 'bottom-bottom' | 'bottom-center' | 'bottom-top' */
		anchorPlacement?: string
		/** Disable on mobile (default: false) */
		disable?: boolean | string | (() => boolean)
		/** Start event that triggers AOS initialization (default: 'DOMContentLoaded') */
		startEvent?: string
		/** Class applied after initialization (default: 'aos-init') */
		initClassName?: string
		/** Class applied on animation (default: 'aos-animate') */
		animatedClassName?: string
		/** If true, use global settings for elements */
		useClassNames?: boolean
		/** Disable mutation observer for dynamic content (default: false) */
		disableMutationObserver?: boolean
		/** Debounce delay for scroll events (default: 50) */
		debounceDelay?: number
		/** Throttle delay for scroll events (default: 99) */
		throttleDelay?: number
	}

	interface AOS {
		/** Initialize AOS with optional configuration */
		init(options?: AosOptions): void
		/** Recalculate all elements positions and animations */
		refresh(): void
		/** Recalculate all elements positions and animations (hard) */
		refreshHard(): void
	}

	const aos: AOS
	export default aos
}
