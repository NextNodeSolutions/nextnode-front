import { getNestedValue, translations, getCurrentLanguage } from './i18n-server'
import {
	STEP_CONFIG,
	STEP_KEYS,
	type Step,
	type DetailedStep,
	type StepConfig,
} from './workflow-constants'

// Extract the type from STEP_KEYS for bidirectional validation
type StepKey = (typeof STEP_KEYS)[number]

// Type-safe function to get step data
function getStepData(stepKey: StepKey): unknown {
	const langData = translations[getCurrentLanguage()]
	return getNestedValue(langData, `howWeWork.steps.${stepKey}`)
}

// Utility function to generate step data with translations
export const generateSteps = (): Step[] =>
	STEP_KEYS.map(key => {
		const stepData = getStepData(key) as Record<string, unknown>
		const config = STEP_CONFIG[key]
		if (!config) {
			throw new Error(`Step config not found for key: ${key}`)
		}
		return {
			key,
			title: String(stepData.title),
			number: String(stepData.number),
			icon: config.icon,
		}
	})

// Utility function to generate detailed steps for how-we-work.astro
export const generateDetailedSteps = (): DetailedStep[] =>
	STEP_KEYS.map(key => {
		const stepData = getStepData(key) as Record<string, unknown>
		const config = STEP_CONFIG[key]
		if (!config) {
			throw new Error(`Step config not found for key: ${key}`)
		}
		return {
			id: key,
			title: String(stepData.title),
			number: String(stepData.number),
			description: String(stepData.description),
			details: stepData.details as readonly string[],
			deliverables: String(stepData.deliverables),
			duration: String(stepData.duration),
			icon: config.icon,
		}
	})

// Utility function to get step configuration by key
export const getStepConfig = (key: string): StepConfig => {
	const config = STEP_CONFIG[key]
	if (!config) {
		throw new Error(`Step config not found for key: ${key}`)
	}
	return config
}
