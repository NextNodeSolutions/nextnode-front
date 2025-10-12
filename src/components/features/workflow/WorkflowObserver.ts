/**
 * Workflow Section Animation Observer
 *
 * Handles Intersection Observer logic for animating the workflow visualization
 * when the section comes into view on scroll.
 *
 * Based on TechTransformationObserver pattern.
 */

import {
	ANIMATION_DURATIONS,
	OBSERVER_CONFIG,
} from '@/lib/config/workflow/workflow-animation-config'

/**
 * Initialize and observe the Workflow section for animations
 * Animations are triggered once when section becomes visible during scroll
 */
export const observeWorkflowSection = (): void => {
	const section = document.getElementById('workflow-section')
	if (!section) return

	// Find all elements to animate
	const animatedElements = section.querySelectorAll('.workflow-animate')

	// If already animated, don't re-run
	const firstElement = animatedElements[0]
	if (
		animatedElements.length > 0 &&
		firstElement &&
		firstElement.classList.contains('workflow-animated')
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
							element.classList.add('workflow-animating')

							// After animation completes, mark as done
							setTimeout(() => {
								element.classList.add('workflow-animated')
								element.classList.remove('workflow-animating')
							}, ANIMATION_DURATIONS.fadeInUp)
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
export const setupWorkflowAnimation = (): void => {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', observeWorkflowSection)
	} else {
		observeWorkflowSection()
	}

	// Re-run on Astro page navigation
	document.addEventListener('astro:page-load', observeWorkflowSection)
}
