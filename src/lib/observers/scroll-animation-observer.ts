/**
 * Generic Scroll Animation Observer
 *
 * Reusable IntersectionObserver-based animation system.
 * Handles triggering CSS animations when elements come into view.
 *
 * @example
 * ```typescript
 * setupScrollAnimation({
 *   sectionSelector: '#my-section',
 *   animateClass: 'fade-in',
 *   duration: 800
 * })
 * ```
 */

/**
 * Configuration options for scroll animation observer
 */
export interface ScrollAnimationConfig {
	/** CSS selector for the section to observe (e.g., '#tech-transform-section') */
	readonly sectionSelector: string
	/** Class name for elements to animate (default: 'animate') */
	readonly animateClass?: string
	/** Class name applied during animation (default: 'animating') */
	readonly animatingClass?: string
	/** Class name applied after animation completes (default: 'animated') */
	readonly animatedClass?: string
	/** Default animation duration in milliseconds (default: 1000) */
	readonly duration?: number
	/** IntersectionObserver threshold (default: 0.3) */
	readonly threshold?: number
	/** IntersectionObserver rootMargin (default: '-10% 0px') */
	readonly rootMargin?: string
}

/**
 * Default configuration values
 */
const DEFAULT_CONFIG: Required<Omit<ScrollAnimationConfig, 'sectionSelector'>> =
	{
		animateClass: 'animate',
		animatingClass: 'animating',
		animatedClass: 'animated',
		duration: 1000,
		threshold: 0.3,
		rootMargin: '-10% 0px',
	}

/**
 * Initialize and observe a section for scroll-triggered animations
 * Animations are triggered once when section becomes visible
 */
export const observeScrollAnimation = (config: ScrollAnimationConfig): void => {
	const {
		sectionSelector,
		animateClass = DEFAULT_CONFIG.animateClass,
		animatingClass = DEFAULT_CONFIG.animatingClass,
		animatedClass = DEFAULT_CONFIG.animatedClass,
		duration = DEFAULT_CONFIG.duration,
		threshold = DEFAULT_CONFIG.threshold,
		rootMargin = DEFAULT_CONFIG.rootMargin,
	} = config

	const section = document.querySelector(sectionSelector)
	if (!section) return

	// Find all elements to animate
	const animatedElements = section.querySelectorAll(`.${animateClass}`)

	// If already animated, don't re-run
	const firstElement = animatedElements[0]
	if (
		animatedElements.length > 0 &&
		firstElement &&
		firstElement.classList.contains(animatedClass)
	) {
		return
	}

	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					// Trigger animations with staggered delays
					animatedElements.forEach(element => {
						const delay = Number.parseInt(
							element.getAttribute('data-delay') || '0',
							10,
						)

						setTimeout(() => {
							// Add animating class
							element.classList.add(animatingClass)

							// After animation completes, mark as done
							setTimeout(() => {
								element.classList.add(animatedClass)
								element.classList.remove(animatingClass)
							}, duration)
						}, delay)
					})

					// Disconnect observer after first animation
					observer.disconnect()
				}
			})
		},
		{
			threshold,
			rootMargin,
		},
	)

	observer.observe(section)
}

/**
 * Setup function to be called on page load or navigation
 * Handles DOMContentLoaded and Astro page navigation events
 */
export const setupScrollAnimation = (config: ScrollAnimationConfig): void => {
	const observe = () => observeScrollAnimation(config)

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', observe)
	} else {
		observe()
	}

	// Re-run on Astro page navigation
	document.addEventListener('astro:page-load', observe)
}

// ============================================================================
// MULTI-SECTION ANIMATION PATTERN (for data-attribute based animations)
// ============================================================================

/**
 * Configuration for multi-section animations (Pricing pattern)
 */
export interface MultiSectionAnimationConfig {
	/** CSS selector for all sections to observe (e.g., '[data-pricing-section]') */
	readonly sectionsSelector: string
	/** Data attribute containing the animation class name (e.g., 'data-animate') */
	readonly animateAttribute: string
	/** IntersectionObserver threshold (default: 0.3) */
	readonly threshold?: number
	/** IntersectionObserver rootMargin (default: '-10% 0px') */
	readonly rootMargin?: string
}

/**
 * Observe multiple sections with data-attribute based animations
 * Used for pages with multiple sections that each have their own animation classes
 *
 * @example
 * ```typescript
 * setupMultiSectionAnimation({
 *   sectionsSelector: '[data-pricing-section]',
 *   animateAttribute: 'data-animate',
 *   threshold: 0.2
 * })
 * ```
 */
export const observeMultiSectionAnimation = (
	config: MultiSectionAnimationConfig,
): void => {
	const {
		sectionsSelector,
		animateAttribute,
		threshold = 0.3,
		rootMargin = '-10% 0px',
	} = config

	const sections = document.querySelectorAll(sectionsSelector)
	if (sections.length === 0) return

	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const section = entry.target

					// Find all elements with animation data attributes
					const animatedElements = section.querySelectorAll(
						`[${animateAttribute}]`,
					)

					animatedElements.forEach(element => {
						const animationClass =
							element.getAttribute(animateAttribute)
						if (!animationClass) return

						// Add the animation class to trigger the animation
						element.classList.add(animationClass)
					})

					// Unobserve this section after animating
					observer.unobserve(section)
				}
			})
		},
		{
			threshold,
			rootMargin,
		},
	)

	// Observe all sections
	sections.forEach(section => {
		observer.observe(section)
	})
}

/**
 * Setup function for multi-section animations
 * Handles DOMContentLoaded and Astro page navigation events
 */
export const setupMultiSectionAnimation = (
	config: MultiSectionAnimationConfig,
): void => {
	const observe = () => observeMultiSectionAnimation(config)

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', observe)
	} else {
		observe()
	}

	// Re-run on Astro page navigation
	document.addEventListener('astro:page-load', observe)
}
