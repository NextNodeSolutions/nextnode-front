/**
 * TechTransformation Animation Observer
 *
 * Handles Intersection Observer logic for animating elements
 * when the TechTransformation section comes into view.
 *
 * Refactored to use the generic scroll animation observer.
 */

import {
	ANIMATION_DURATIONS,
	OBSERVER_CONFIG,
} from '@/lib/config/marketing/tech-animation-config'
import {
	observeScrollAnimation,
	setupScrollAnimation,
} from '@/lib/observers/scroll-animation-observer'

/**
 * Initialize and observe the TechTransformation section for animations
 * Animations are triggered once when section becomes visible
 */
export const observeTechTransformSection = (): void => {
	observeScrollAnimation({
		sectionSelector: '#tech-transform-section',
		animateClass: 'tech-animate',
		animatingClass: 'tech-animating',
		animatedClass: 'tech-animated',
		duration: ANIMATION_DURATIONS.section,
		threshold: OBSERVER_CONFIG.threshold,
		rootMargin: OBSERVER_CONFIG.rootMargin,
	})
}

/**
 * Setup function to be called on page load or navigation
 */
export const setupTechTransformAnimation = (): void => {
	setupScrollAnimation({
		sectionSelector: '#tech-transform-section',
		animateClass: 'tech-animate',
		animatingClass: 'tech-animating',
		animatedClass: 'tech-animated',
		duration: ANIMATION_DURATIONS.section,
		threshold: OBSERVER_CONFIG.threshold,
		rootMargin: OBSERVER_CONFIG.rootMargin,
	})
}
