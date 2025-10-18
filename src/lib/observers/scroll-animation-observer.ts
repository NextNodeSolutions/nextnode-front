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
 * Convert percentage value to pixels based on dimension
 */
const percentToPixels = (percent: number, dimension: number): number => {
	return (percent * dimension) / 100
}

/**
 * Parse a single margin value (e.g., '50px', '-5%') to pixels
 */
const parseMarginValue = (
	value: string,
	isVertical: boolean,
	viewportHeight: number,
	viewportWidth: number,
): number => {
	// Try pixels first (e.g., '50px', '-10px')
	const pxMatch = value.match(/^(-?\d+(?:\.\d+)?)px$/)
	if (pxMatch?.[1]) {
		return Number.parseFloat(pxMatch[1])
	}

	// Try percentage (e.g., '5%', '-10%')
	const percentMatch = value.match(/^(-?\d+(?:\.\d+)?)%$/)
	if (percentMatch?.[1]) {
		const percent = Number.parseFloat(percentMatch[1])
		const dimension = isVertical ? viewportHeight : viewportWidth
		return percentToPixels(percent, dimension)
	}

	return 0
}

/**
 * Parse rootMargin string and extract offset values in pixels
 * @param rootMargin - CSS margin string (e.g., '0px', '-5% 0px', '10px 20px 30px 40px')
 * @returns Object with top, right, bottom, left offsets in pixels
 */
const parseRootMargin = (
	rootMargin: string,
): { top: number; right: number; bottom: number; left: number } => {
	const parts = rootMargin.trim().split(/\s+/)
	const viewportHeight =
		window.innerHeight || document.documentElement.clientHeight
	const viewportWidth =
		window.innerWidth || document.documentElement.clientWidth

	// CSS margin positions: top(0), right(1), bottom(2), left(3)
	const values = parts.map((part, index) => {
		const isVertical = index === 0 || index === 2
		return parseMarginValue(part, isVertical, viewportHeight, viewportWidth)
	})

	// CSS margin shorthand: top right bottom left
	const [top = 0, right = 0, bottom = 0, left = 0] = values
	return { top, right, bottom, left }
}

/**
 * Check if an element is currently visible in the viewport
 * Takes rootMargin into account to match IntersectionObserver behavior
 */
const isElementVisible = (
	element: Element,
	threshold = 0.3,
	rootMargin = '0px',
): boolean => {
	const rect = element.getBoundingClientRect()
	const margins = parseRootMargin(rootMargin)

	// Apply rootMargin offsets to viewport dimensions
	// Negative margins shrink the viewport, positive margins expand it
	const effectiveViewportTop = 0 - margins.top
	const effectiveViewportBottom =
		(window.innerHeight || document.documentElement.clientHeight) -
		margins.bottom
	const effectiveViewportLeft = 0 - margins.left
	const effectiveViewportRight =
		(window.innerWidth || document.documentElement.clientWidth) -
		margins.right

	// Calculate visible area within the effective viewport
	const visibleHeight =
		Math.min(rect.bottom, effectiveViewportBottom) -
		Math.max(rect.top, effectiveViewportTop)
	const visibleWidth =
		Math.min(rect.right, effectiveViewportRight) -
		Math.max(rect.left, effectiveViewportLeft)
	const visibleArea = Math.max(0, visibleHeight) * Math.max(0, visibleWidth)
	const totalArea = rect.height * rect.width

	return totalArea > 0 && visibleArea / totalArea >= threshold
}

/**
 * Trigger animations for a section's elements
 */
const triggerSectionAnimations = (
	section: Element,
	animateAttribute: string,
): void => {
	const animatedElements = section.querySelectorAll(`[${animateAttribute}]`)

	animatedElements.forEach(element => {
		const animationClass = element.getAttribute(animateAttribute)
		if (!animationClass) return

		// Add the animation class to trigger the animation
		element.classList.add(animationClass)
	})
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

	// Track which sections have been animated
	const animatedSections = new Set<Element>()

	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (
					entry.isIntersecting &&
					!animatedSections.has(entry.target)
				) {
					const section = entry.target

					// Trigger animations
					triggerSectionAnimations(section, animateAttribute)

					// Mark as animated and unobserve
					animatedSections.add(section)
					observer.unobserve(section)
				}
			})
		},
		{
			threshold,
			rootMargin,
		},
	)

	// Check for initially visible sections and animate them immediately
	sections.forEach(section => {
		if (isElementVisible(section, threshold, rootMargin)) {
			// Section is already visible, trigger animations immediately
			triggerSectionAnimations(section, animateAttribute)
			animatedSections.add(section)
		} else {
			// Section not visible yet, observe it
			observer.observe(section)
		}
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
