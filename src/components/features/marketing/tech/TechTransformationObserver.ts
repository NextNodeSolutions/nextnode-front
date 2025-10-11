/**
 * TechTransformation Animation Observer
 *
 * Handles Intersection Observer logic for animating elements
 * when the TechTransformation section comes into view.
 *
 * Extracted from inline script for better maintainability.
 */

import {
	ANIMATION_DURATIONS,
	OBSERVER_CONFIG,
} from '@/lib/config/marketing/tech-animation-config'

/**
 * Initialize and observe the TechTransformation section for animations
 * Animations are triggered once when section becomes visible
 */
export const observeTechTransformSection = (): void => {
	const section = document.getElementById('tech-transform-section')
	if (!section) return

	// Find all elements to animate
	const animatedElements = section.querySelectorAll('.tech-animate')

	// If already animated, don't re-run
	const firstElement = animatedElements[0]
	if (
		animatedElements.length > 0 &&
		firstElement &&
		firstElement.classList.contains('tech-animated')
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
							element.classList.add('tech-animating')

							// After animation completes, mark as done
							setTimeout(() => {
								element.classList.add('tech-animated')
								element.classList.remove('tech-animating')
							}, ANIMATION_DURATIONS.fadeIn)
						}, delay)
					})

					// Disconnect observer after first animation
					observer.disconnect()
				}
			})
		},
		{
			threshold: OBSERVER_CONFIG.threshold,
			rootMargin: OBSERVER_CONFIG.rootMargin,
		},
	)

	observer.observe(section)
}

/**
 * Setup function to be called on page load or navigation
 */
export const setupTechTransformAnimation = (): void => {
	if (document.readyState === 'loading') {
		document.addEventListener(
			'DOMContentLoaded',
			observeTechTransformSection,
		)
	} else {
		observeTechTransformSection()
	}

	// Re-run on Astro page navigation
	document.addEventListener('astro:page-load', observeTechTransformSection)
}
