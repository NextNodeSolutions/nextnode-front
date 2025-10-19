/**
 * Centralized Observer Configurations
 *
 * Single source of truth for all scroll-triggered animation configurations.
 * Import and use these configs directly in Astro components.
 */

import {
	ANIMATION_DURATIONS as TECH_DURATIONS,
	OBSERVER_CONFIG as TECH_OBSERVER,
} from '@/lib/config/marketing/tech-animation-config'
import { OBSERVER_CONFIG as PRICING_OBSERVER } from '@/lib/config/pricing/pricing-animation-config'
import {
	ANIMATION_DURATIONS as WORKFLOW_DURATIONS,
	OBSERVER_CONFIG as WORKFLOW_OBSERVER,
} from '@/lib/config/workflow/workflow-animation-config'

import type { ScrollAnimationConfig } from './scroll-animation-observer'

// ============================================================================
// TECH TRANSFORMATION SECTION
// ============================================================================

/**
 * Observer configuration for the Tech Transformation section
 * Used on the home page to trigger tech stack animations
 */
export const TECH_TRANSFORM_OBSERVER_CONFIG: ScrollAnimationConfig = {
	sectionSelector: '#tech-transform-section',
	animateClass: 'tech-animate',
	animatingClass: 'tech-animating',
	animatedClass: 'tech-animated',
	duration: TECH_DURATIONS.section,
	threshold: TECH_OBSERVER.threshold,
	rootMargin: TECH_OBSERVER.rootMargin,
} as const

// ============================================================================
// WORKFLOW SECTION
// ============================================================================

/**
 * Observer configuration for the Workflow section
 * Used on the home page to trigger workflow journey animations
 */
export const WORKFLOW_OBSERVER_CONFIG: ScrollAnimationConfig = {
	sectionSelector: '#workflow-section',
	animateClass: 'workflow-animate',
	animatingClass: 'workflow-animating',
	animatedClass: 'workflow-animated',
	duration: WORKFLOW_DURATIONS.fadeInUp,
	threshold: WORKFLOW_OBSERVER.threshold,
	rootMargin: WORKFLOW_OBSERVER.rootMargin,
} as const

// ============================================================================
// PRICING SECTIONS (Multi-section pattern)
// ============================================================================

/**
 * Observer configuration for Pricing page sections
 * Uses data-attribute pattern for multiple sections with different animations
 */
export const PRICING_OBSERVER_CONFIG = {
	/** Selector for all pricing sections to observe */
	sectionsSelector: '[data-pricing-section]',
	/** Attribute containing animation class name */
	animateAttribute: 'data-animate',
	/** Observer threshold */
	threshold: PRICING_OBSERVER.threshold,
	/** Observer root margin */
	rootMargin: PRICING_OBSERVER.rootMargin,
} as const
