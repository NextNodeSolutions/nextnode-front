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

// Types pour les traductions spécifiques
interface StepTranslation {
	title: string
	number: string
	description: string
	details: string[]
	deliverables: string
	duration: string
}

// Fonction de traduction générique qui peut retourner différents types
function getValue(obj: unknown, keyPath: string[]): unknown {
	if (!obj || typeof obj !== 'object' || keyPath.length === 0) {
		return obj
	}

	const [currentKey, ...remainingKeys] = keyPath

	if (!currentKey) {
		return undefined
	}

	// Gérer les indices numériques pour les tableaux
	if (/^\d+$/.test(currentKey) && Array.isArray(obj)) {
		const index = parseInt(currentKey, 10)
		if (index < obj.length) {
			return getValue(obj[index], remainingKeys)
		}
		return undefined
	}

	// Gérer les objets normaux
	if (!Array.isArray(obj)) {
		const typedObj = obj as Record<string, unknown>
		if (currentKey in typedObj) {
			return getValue(typedObj[currentKey], remainingKeys)
		}
	}

	return undefined
}

// Surcharge de la fonction t pour supporter différents types de retour
export function t(key: string): string
export function t<T = unknown>(key: string): T
export function t(key: string): unknown {
	const langData = translations[currentLanguage as keyof typeof translations]
	const keys = key.split('.')
	const result = getValue(langData, keys)

	// Si c'est une string, la retourner directement
	if (typeof result === 'string') {
		return result
	}

	// Si c'est un array de strings, le joindre
	if (
		Array.isArray(result) &&
		result.every(item => typeof item === 'string')
	) {
		return result.join(', ')
	}

	// Si c'est un objet, le retourner tel quel (pour les cas comme steps.discovery)
	if (result && typeof result === 'object') {
		return result
	}

	// Fallback
	return key
}

// Fonction spécifique pour les steps (pour une meilleure sécurité de type)
export const tStep = (stepKey: string): StepTranslation => {
	const result = t<StepTranslation>(`howWeWork.steps.${stepKey}`)

	// Validation de type runtime pour s'assurer qu'on a la bonne structure
	if (
		result &&
		typeof result === 'object' &&
		'title' in result &&
		'number' in result &&
		typeof result.title === 'string' &&
		typeof result.number === 'string'
	) {
		return result as StepTranslation
	}

	// Fallback avec valeurs par défaut
	return {
		title: stepKey,
		number: '00',
		description: '',
		details: [],
		deliverables: '',
		duration: '',
	}
}
