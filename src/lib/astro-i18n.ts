import i18next from 'i18next'

// Fonction de traduction optimisée qui utilise l'instance i18next déjà initialisée par le middleware
export const t = (key: string): string => {
	const currentLang = i18next.language || 'en'
	const resource = i18next.getResource(currentLang, 'common', key)
	return resource || key
}
