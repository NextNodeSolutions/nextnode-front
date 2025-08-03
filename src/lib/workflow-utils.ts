import { tStep } from './i18n-server'
import {
	STEP_CONFIG,
	STEP_KEYS,
	type Step,
	type DetailedStep,
	type StepConfig,
} from './workflow-constants'

// Utility function to generate step data with translations
export const generateSteps = (): Step[] =>
	STEP_KEYS.map((key: string) => {
		const stepData = tStep(key)
		const config = STEP_CONFIG[key]
		if (!config) {
			throw new Error(`Step config not found for key: ${key}`)
		}
		return {
			key,
			title: stepData.title,
			number: stepData.number,
			icon: config.icon,
		}
	})

// Utility function to generate detailed steps for how-we-work.astro
export const generateDetailedSteps = (): DetailedStep[] =>
	STEP_KEYS.map((key: string) => {
		const stepData = tStep(key)
		const config = STEP_CONFIG[key]
		if (!config) {
			throw new Error(`Step config not found for key: ${key}`)
		}
		return {
			id: key,
			title: stepData.title,
			number: stepData.number,
			description: stepData.description,
			details: stepData.details,
			deliverables: stepData.deliverables,
			duration: stepData.duration,
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
