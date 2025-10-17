/**
 * Workflow Section Animation Observer
 *
 * Handles Intersection Observer logic for animating the workflow visualization
 * when the section comes into view on scroll.
 *
 * Refactored to use the generic scroll animation observer.
 */

import {
	ANIMATION_DURATIONS,
	OBSERVER_CONFIG,
} from '@/lib/config/workflow/workflow-animation-config'
import {
	observeScrollAnimation,
	setupScrollAnimation,
} from '@/lib/observers/scroll-animation-observer'

/**
 * Initialize and observe the Workflow section for animations
 * Animations are triggered once when section becomes visible during scroll
 */
export const observeWorkflowSection = (): void => {
	observeScrollAnimation({
		sectionSelector: '#workflow-section',
		animateClass: 'workflow-animate',
		animatingClass: 'workflow-animating',
		animatedClass: 'workflow-animated',
		duration: ANIMATION_DURATIONS.fadeInUp,
		threshold: OBSERVER_CONFIG.threshold,
		rootMargin: OBSERVER_CONFIG.rootMargin,
	})
}

/**
 * Setup function to be called on page load or navigation
 */
export const setupWorkflowAnimation = (): void => {
	setupScrollAnimation({
		sectionSelector: '#workflow-section',
		animateClass: 'workflow-animate',
		animatingClass: 'workflow-animating',
		animatedClass: 'workflow-animated',
		duration: ANIMATION_DURATIONS.fadeInUp,
		threshold: OBSERVER_CONFIG.threshold,
		rootMargin: OBSERVER_CONFIG.rootMargin,
	})
}
