import { t } from './i18n-server'

// Utility function to generate CTA features as an array
export const getCTAFeatures = (): string[] => {
	const featuresResult = t('howWeWork.cta.features')
	if (Array.isArray(featuresResult)) {
		return featuresResult
	}
	if (typeof featuresResult === 'string') {
		return featuresResult.split(',').map(feature => feature.trim())
	}
	return []
}

// Utility function to generate page titles
export const generatePageTitle = (
	titleKey: string,
	highlightKey: string,
): string => t(titleKey) + ' ' + t(highlightKey)
