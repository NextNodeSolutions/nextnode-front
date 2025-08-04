import type {
	TranslationDict,
	TranslationKey,
	TranslationValue,
} from '@/i18n/types'

// Cache pour les chemins de traduction déjà résolus
const translationCache = new Map<string, unknown>()

// Cache pour les regex d'interpolation compilées
const regexCache = new Map<string, RegExp>()

// Helper pour créer une clé de cache unique
function createCacheKey(locale: string, path: TranslationKey): string {
	return `${locale}.${path}`
}

// Fonction optimisée pour récupérer une valeur nested avec cache
export function getCachedNestedValue<K extends TranslationKey>(
	obj: TranslationDict,
	locale: string,
	path: K,
): TranslationValue<K> {
	const cacheKey = createCacheKey(locale, path)

	// Vérifier le cache d'abord
	if (translationCache.has(cacheKey)) {
		return translationCache.get(cacheKey) as TranslationValue<K>
	}

	// Si pas en cache, calculer la valeur
	const result = path
		.split('.')
		.reduce(
			(current: unknown, key: string) =>
				current && typeof current === 'object' && key in current
					? (current as Record<string, unknown>)[key]
					: undefined,
			obj,
		) as TranslationValue<K>

	// Mettre en cache pour la prochaine fois
	translationCache.set(cacheKey, result)

	return result
}

// Fonction optimisée pour l'interpolation de chaînes avec cache de regex
export function cachedInterpolateString(
	str: string,
	params: Record<string, string | number>,
): string {
	return Object.entries(params).reduce((result, [paramKey, value]) => {
		// Utiliser le cache de regex ou créer et cacher une nouvelle regex
		let regex = regexCache.get(paramKey)
		if (!regex) {
			regex = new RegExp(`{{${paramKey}}}`, 'g')
			regexCache.set(paramKey, regex)
		}

		return result.replace(regex, String(value))
	}, str)
}

// Fonction pour vider le cache (utile pour les tests ou changements de langue)
export function clearTranslationCache(): void {
	translationCache.clear()
}

// Fonction pour obtenir les stats du cache (pour debugging)
export function getCacheStats(): {
	translationCacheSize: number
	regexCacheSize: number
} {
	return {
		translationCacheSize: translationCache.size,
		regexCacheSize: regexCache.size,
	}
}
