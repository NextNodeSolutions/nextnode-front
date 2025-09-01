// ====================================
// I18N UTILITY FUNCTIONS
// ====================================
// Type-safe utility functions for complex translation patterns
// This avoids the complexity of template string type inference at runtime

import { globalT } from './index'

import type { EnglishDict, StepKey } from './types'
import type { Plan } from '@/types/plans'

/**
 * Utility function for translating step objects with proper typing
 * Usage: translateSteps('discovery') → Readonly<{title, number, description, etc.}>
 */
export function translateSteps<K extends StepKey>(
	stepKey: K,
): Readonly<EnglishDict['howWeWork']['steps'][K]> {
	// Template string keys can't be statically typed, so cast is necessary
	const result = globalT(`howWeWork.steps.${stepKey}`)
	return result as Readonly<EnglishDict['howWeWork']['steps'][K]>
}

/**
 * Utility function for translating pricing plan objects with proper typing
 * Usage: translatePlan('starter') → Readonly<{name, tagline, price, features, etc.}>
 */
export function translatePlan<K extends Plan>(
	planKey: K,
): Readonly<EnglishDict['pricing']['plans'][K]> {
	// Template string keys can't be statically typed, so cast is necessary
	const result = globalT(`pricing.plans.${planKey}`)
	return result as Readonly<EnglishDict['pricing']['plans'][K]>
}

/**
 * Utility function for translating FAQ category questions with proper typing
 * Usage: translateFAQCategory('gettingStarted') → Readonly<{question: string, answer: string}[]>
 */
export function translateFAQCategory(
	categoryKey: string,
): Readonly<{ question: string; answer: string }[]> {
	// Template string keys can't be statically typed, so cast is necessary
	const result = globalT(`howWeWork.faq.questions.${categoryKey}`)
	return result as Readonly<{ question: string; answer: string }[]>
}
