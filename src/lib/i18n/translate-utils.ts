// ====================================
// I18N UTILITY FUNCTIONS
// ====================================
// Type-safe utility functions for complex translation patterns
// This avoids the complexity of template string type inference at runtime

import { globalT } from './index'

import type { EnglishDict, StepKey, PlanKey } from './types'

/**
 * Utility function for translating step objects with proper typing
 * Usage: translateSteps('discovery') → Readonly<{title, number, description, etc.}>
 */
export function translateSteps<K extends StepKey>(
	stepKey: K,
): Readonly<EnglishDict['howWeWork']['steps'][K]> {
	const result = globalT(`howWeWork.steps.${stepKey}`)
	return result as unknown as Readonly<EnglishDict['howWeWork']['steps'][K]>
}

/**
 * Utility function for translating pricing plan objects with proper typing
 * Usage: translatePlan('starter') → Readonly<{name, tagline, price, features, etc.}>
 */
export function translatePlan<K extends PlanKey>(
	planKey: K,
): Readonly<EnglishDict['pricing']['plans'][K]> {
	const result = globalT(`pricing.plans.${planKey}`)
	return result as unknown as Readonly<EnglishDict['pricing']['plans'][K]>
}
