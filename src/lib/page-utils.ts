import { t } from './i18n-server'

// Fonction utilitaire pour générer les features CTA en tant qu'array
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

// Fonction utilitaire pour générer les titres de page
export const generatePageTitle = (
	titleKey: string,
	highlightKey: string,
): string => t(titleKey) + ' ' + t(highlightKey)
