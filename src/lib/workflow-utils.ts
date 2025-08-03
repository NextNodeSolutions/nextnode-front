import { t } from './i18n-server'
import {
	STEP_CONFIG,
	STEP_KEYS,
	type Step,
	type DetailedStep,
	type StepConfig,
} from './workflow-constants'

// No need for intermediate types - we'll use the translation system directly

// Utility function to generate step data with translations
export const generateSteps = (): Step[] =>
	STEP_KEYS.map((key: string) => {
		// Use the type-safe translation function with template literal keys
		const title = t(`howWeWork.steps.${key}.title` as const)
		const number = t(`howWeWork.steps.${key}.number` as const)
		const config = STEP_CONFIG[key]
		if (!config) {
			throw new Error(`Step config not found for key: ${key}`)
		}
		return {
			key,
			title,
			number,
			icon: config.icon,
		}
	})

// Utility function to generate detailed steps for how-we-work.astro
export const generateDetailedSteps = (): DetailedStep[] =>
	STEP_KEYS.map((key: string) => {
		// Use individual translation calls for each property
		const title = t(`howWeWork.steps.${key}.title` as const)
		const number = t(`howWeWork.steps.${key}.number` as const)
		const description = t(`howWeWork.steps.${key}.description` as const)
		const details = t(`howWeWork.steps.${key}.details` as const)
		const deliverables = t(`howWeWork.steps.${key}.deliverables` as const)
		const duration = t(`howWeWork.steps.${key}.duration` as const)
		const config = STEP_CONFIG[key]
		if (!config) {
			throw new Error(`Step config not found for key: ${key}`)
		}
		return {
			id: key,
			title,
			number,
			description,
			details,
			deliverables,
			duration,
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
