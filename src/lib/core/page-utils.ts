import { createT } from '../i18n'

import type { TranslationKey, Locale } from '../../i18n/types'

// Utility function to generate CTA features as an array
export const getCTAFeatures = (locale: Locale = 'en'): string[] => {
	const t = createT(locale)
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
	locale: Locale = 'en',
): string => {
	const t = createT(locale)
	const title = t(titleKey)
	const highlight = t(highlightKey)
	return String(title) + ' ' + String(highlight)
}
