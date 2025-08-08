import { t } from '@/lib/i18n/i18n-server'

import {
	STEP_CONFIG,
	STEP_KEYS,
	type Step,
	type DetailedStep,
	type StepConfig,
} from './workflow-constants'

import type { TranslationKey } from '@/i18n/types'

// Utility function to generate step data with translations
export const generateSteps = (): Step[] =>
	STEP_KEYS.map(key => {
		const config = STEP_CONFIG[key]
		if (!config) {
			throw new Error(`Step config not found for key: ${key}`)
		}
		return {
			key,
			title: String(t(`howWeWork.steps.${key}.title` as TranslationKey)),
			number: String(
				t(`howWeWork.steps.${key}.number` as TranslationKey),
			),
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
		return {
			id: key,
			title: String(t(`howWeWork.steps.${key}.title` as TranslationKey)),
			number: String(
				t(`howWeWork.steps.${key}.number` as TranslationKey),
			),
			description: String(
				t(`howWeWork.steps.${key}.description` as TranslationKey),
			),
			details: t(
				`howWeWork.steps.${key}.details` as TranslationKey,
			) as readonly string[],
			deliverables: String(
				t(`howWeWork.steps.${key}.deliverables` as TranslationKey),
			),
			duration: String(
				t(`howWeWork.steps.${key}.duration` as TranslationKey),
			),
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
