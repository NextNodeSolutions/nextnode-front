import i18next, { changeLanguage, init } from 'i18next'

// Chargement des traductions
const en = await import('../../public/locales/en/common.json')
const fr = await import('../../public/locales/fr/common.json')

// Détecter la langue depuis la requête Astro
export const detectLanguage = (request: Request): string => {
	// Essayer de récupérer depuis les cookies
	const cookieHeader = request.headers.get('cookie')
	if (cookieHeader) {
		const cookies = Object.fromEntries(
			cookieHeader.split('; ').map(cookie => {
				const [key, value] = cookie.split('=')
				return [key, decodeURIComponent(value || '')]
			}),
		)

		const langFromCookie = cookies.language
		if (langFromCookie && ['en', 'fr'].includes(langFromCookie)) {
			return langFromCookie
		}
	}

	// Sinon utiliser Accept-Language header
	const acceptLanguage = request.headers.get('accept-language')
	if (acceptLanguage) {
		const preferredLang = acceptLanguage.split(',')[0]?.split('-')[0]
		if (preferredLang && ['en', 'fr'].includes(preferredLang)) {
			return preferredLang
		}
	}

	return 'en' // fallback
}

// Initialiser i18next avec la langue détectée - FORCE la réinitialisation
export const initI18n = async (request: Request): Promise<string> => {
	const currentLang = detectLanguage(request)

	// Force la réinitialisation complète d'i18next
	if (i18next.isInitialized) {
		await changeLanguage(currentLang)
	} else {
		await init({
			lng: currentLang,
			fallbackLng: 'en',
			resources: {
				en: { common: en.default },
				fr: { common: fr.default },
			},
			defaultNS: 'common',
			ns: ['common'],
		})
	}

	return currentLang
}

// Fonction de traduction qui utilise directement les ressources pour éviter les problèmes de cache
export const t = (key: string): string => {
	const currentLang = i18next.language || 'en'
	const resource = i18next.getResource(currentLang, 'common', key)
	return resource || key
}
