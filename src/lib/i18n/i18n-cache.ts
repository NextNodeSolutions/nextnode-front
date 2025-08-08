import type {
	TranslationDict,
	TranslationKey,
	TranslationValue,
} from '@/i18n/types'

// Cache for already resolved translation paths
const translationCache = new Map<string, unknown>()

// Cache for compiled interpolation regex patterns
const regexCache = new Map<string, RegExp>()

// Helper to create a unique cache key
function createCacheKey(locale: string, path: TranslationKey): string {
	return `${locale}.${path}`
}

// Optimized function to retrieve nested value with cache
export function getCachedNestedValue<K extends TranslationKey>(
	obj: TranslationDict,
	locale: string,
	path: K,
): TranslationValue<K> {
	const cacheKey = createCacheKey(locale, path)

	// Check cache first
	if (translationCache.has(cacheKey)) {
		return translationCache.get(cacheKey) as TranslationValue<K>
	}

	// If not in cache, calculate the value
	const result = path
		.split('.')
		.reduce(
			(current: unknown, key: string) =>
				current && typeof current === 'object' && key in current
					? (current as Record<string, unknown>)[key]
					: undefined,
			obj,
		) as TranslationValue<K>

	// Cache for next time
	translationCache.set(cacheKey, result)

	return result
}

// Optimized function for string interpolation with regex cache
export function cachedInterpolateString(
	str: string,
	params: Record<string, string | number>,
): string {
	return Object.entries(params).reduce((result, [paramKey, value]) => {
		// Use regex cache or create and cache new regex
		let regex = regexCache.get(paramKey)
		if (!regex) {
			regex = new RegExp(`{{${paramKey}}}`, 'g')
			regexCache.set(paramKey, regex)
		}

		return result.replace(regex, String(value))
	}, str)
}

// Function to clear cache (useful for tests or language changes)
export function clearTranslationCache(): void {
	translationCache.clear()
}

// Function to get cache stats (for debugging)
export function getCacheStats(): {
	translationCacheSize: number
	regexCacheSize: number
} {
	return {
		translationCacheSize: translationCache.size,
		regexCacheSize: regexCache.size,
	}
}
