import { t } from './i18n-server'

import type { TranslationKey } from '../i18n/types'

// Utility function to generate CTA features as an array
export const getCTAFeatures = (): string[] => {
	const result = t('howWeWork.cta.features')

	// Type guards
	if (Array.isArray(result)) {
		return result.map(feature => String(feature))
	}

	if (typeof result === 'string') {
		return String(result)
			.split(',')
			.map((feature: string) => feature.trim())
	}

	return []
}

// Utility function to generate page titles
export const generatePageTitle = (
	titleKey: TranslationKey,
	highlightKey: TranslationKey,
): string => {
	const title = t(titleKey)
	const highlight = t(highlightKey)
	return String(title) + ' ' + String(highlight)
}
