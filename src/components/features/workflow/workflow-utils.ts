import { translateSteps } from '@/lib/i18n/translate-utils'

import {
	STEP_CONFIG,
	STEP_KEYS,
	type Step,
	type DetailedStep,
	type StepConfig,
} from './workflow-constants'

// Utility function to generate step data with translations
export const generateSteps = (): Step[] =>
	STEP_KEYS.map(key => {
		const config = STEP_CONFIG[key]
		if (!config) {
			throw new Error(`Step config not found for key: ${key}`)
		}
		const stepData = translateSteps(key)
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
		const config = STEP_CONFIG[key]
		if (!config) {
			throw new Error(`Step config not found for key: ${key}`)
		}
		const stepData = translateSteps(key)
		return {
			id: key,
			title: String(stepData.title),
			number: String(stepData.number),
			description: String(stepData.description),
			details: stepData.details,
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
