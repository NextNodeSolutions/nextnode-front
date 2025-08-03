import i18next, { changeLanguage, init } from 'i18next'

// Generic type for translations
type TranslationData = Record<string, unknown>

// Loading translations
const en = await import('../../public/locales/en/common.json')
const fr = await import('../../public/locales/fr/common.json')

// Global store for translations for direct access
const translations: Record<string, TranslationData> = {
	en: en.default as TranslationData,
	fr: fr.default as TranslationData,
}

// Global variable to store the current language
let currentLanguage: string = 'en'

// Detect language from Astro request
export const detectLanguage = (request: Request): string => {
	// Try to retrieve from cookies
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

	// Otherwise use Accept-Language header
	const acceptLanguage = request.headers.get('accept-language')
	if (acceptLanguage) {
		const preferredLang = acceptLanguage.split(',')[0]?.split('-')[0]
		if (preferredLang && ['en', 'fr'].includes(preferredLang)) {
			return preferredLang
		}
	}

	return 'en' // fallback
}

// Initialize i18next with detected language - FORCE reinitialization
export const initI18n = async (
	request: Request,
	langParam?: string,
): Promise<string> => {
	// Use language parameter if provided, otherwise detect
	const currentLang = langParam || detectLanguage(request)

	// Force complete reinitialization of i18next
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

	// Update global language for the t() function
	currentLanguage = currentLang

	return currentLang
}

// Types for specific translations
interface StepTranslation {
	title: string
	number: string
	description: string
	details: string[]
	deliverables: string
	duration: string
}

// Generic translation function that can return different types
function getValue(obj: unknown, keyPath: string[]): unknown {
	if (!obj || typeof obj !== 'object' || keyPath.length === 0) {
		return obj
	}

	const [currentKey, ...remainingKeys] = keyPath

	if (!currentKey) {
		return undefined
	}

	// Handle numeric indices for arrays
	if (/^\d+$/.test(currentKey) && Array.isArray(obj)) {
		const index = parseInt(currentKey, 10)
		if (index < obj.length) {
			return getValue(obj[index], remainingKeys)
		}
		return undefined
	}

	// Handle normal objects
	if (!Array.isArray(obj)) {
		const typedObj = obj as Record<string, unknown>
		if (currentKey in typedObj) {
			return getValue(typedObj[currentKey], remainingKeys)
		}
	}

	return undefined
}

// Overload of the t function to support different return types
export function t(key: string): string
export function t<T = unknown>(key: string): T
export function t(key: string): unknown {
	const langData = translations[currentLanguage as keyof typeof translations]
	const keys = key.split('.')
	const result = getValue(langData, keys)

	// If it's a string, return it directly
	if (typeof result === 'string') {
		return result
	}

	// If it's an array of strings, join them
	if (
		Array.isArray(result) &&
		result.every(item => typeof item === 'string')
	) {
		return result.join(', ')
	}

	// If it's an object, return it as is (for cases like steps.discovery)
	if (result && typeof result === 'object') {
		return result
	}

	// Fallback
	return key
}

// Specific function for steps (for better type safety)
export const tStep = (stepKey: string): StepTranslation => {
	const result = t<StepTranslation>(`howWeWork.steps.${stepKey}`)

	// Runtime type validation to ensure we have the correct structure
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

	// Fallback with default values
	return {
		title: stepKey,
		number: '00',
		description: '',
		details: [],
		deliverables: '',
		duration: '',
	}
}
