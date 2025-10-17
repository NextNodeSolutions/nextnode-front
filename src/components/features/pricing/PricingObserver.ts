/**
 * Pricing Animation Observer
 *
 * Handles Intersection Observer logic for animating elements
 * when pricing sections come into view during scroll.
 *
 * Uses existing animation classes (animate-fade-in-up, animate-scale-in, etc.)
 * triggered on scroll instead of on page load.
 */

import { OBSERVER_CONFIG } from '@/lib/config/pricing/pricing-animation-config'

/**
 * Initialize and observe pricing sections for scroll-triggered animations
 */
export const observePricingSections = (): void => {
	// Find all sections that need scroll-triggered animations
	const sections = document.querySelectorAll('[data-pricing-section]')

	if (sections.length === 0) return

	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const section = entry.target

					// Find all elements with animation data attributes
					const animatedElements =
						section.querySelectorAll('[data-animate]')

					animatedElements.forEach(element => {
						const animationClass =
							element.getAttribute('data-animate')
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
			threshold: OBSERVER_CONFIG.threshold,
			rootMargin: OBSERVER_CONFIG.rootMargin,
		},
	)

	// Observe all pricing sections
	sections.forEach(section => {
		observer.observe(section)
	})
}

/**
 * Setup function to be called on page load or navigation
 */
export const setupPricingAnimation = (): void => {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', observePricingSections)
	} else {
		observePricingSections()
	}

	// Re-run on Astro page navigation
	document.addEventListener('astro:page-load', observePricingSections)
}
