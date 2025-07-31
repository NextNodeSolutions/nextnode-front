import i18next, { changeLanguage, init } from 'i18next'

// Type générique pour les traductions
type TranslationData = Record<string, unknown>

// Chargement des traductions
const en = await import('../../public/locales/en/common.json')
const fr = await import('../../public/locales/fr/common.json')

// Store global des traductions pour accès direct
const translations: Record<string, TranslationData> = {
	en: en.default as TranslationData,
	fr: fr.default as TranslationData,
}

// Variable globale pour stocker la langue courante
let currentLanguage: string = 'en'

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

	// Mettre à jour la langue globale pour la fonction t()
	currentLanguage = currentLang

	return currentLang
}

// Fonction de traduction qui utilise la langue globale
export const t = (key: string): string => {
	const langData = translations[currentLanguage as keyof typeof translations]
	const keys = key.split('.')

	// Fonction récursive pour naviguer dans l'objet
	function getValue(obj: unknown, keyPath: string[]): unknown {
		if (
			!obj ||
			typeof obj !== 'object' ||
			Array.isArray(obj) ||
			keyPath.length === 0
		) {
			return obj
		}

		const [currentKey, ...remainingKeys] = keyPath

		if (!currentKey) {
			return undefined
		}

		const typedObj = obj as Record<string, unknown>

		if (currentKey in typedObj) {
			return getValue(typedObj[currentKey], remainingKeys)
		}

		return undefined
	}

	const result = getValue(langData, keys)

	// Toujours retourner un string
	if (typeof result === 'string') {
		return result
	} else if (
		Array.isArray(result) &&
		result.every(item => typeof item === 'string')
	) {
		return result.join(', ') // Joindre les arrays de strings
	} else {
		return key // Fallback si pas trouvé ou type incorrect
	}
}
