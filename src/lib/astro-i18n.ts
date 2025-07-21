import i18next from 'i18next'

// Fonction de traduction qui marche avec i18next
export const t = (key: string): string =>
	i18next.getResource(i18next.language, 'common', key) || key
