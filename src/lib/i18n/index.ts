// ====================================
// UNIFIED t() FUNCTION - I18N SYSTEM
// ====================================
// Single function that works client AND server side

import {
	getNestedValue,
	interpolateString,
	resolveDynamicKey,
	isDynamicKey,
	warnMissingTranslation,
	createCacheKey,
} from './utils'
import { en } from '../../i18n/locales/en'
import { fr } from '../../i18n/locales/fr'

import type {
	TFunction,
	TranslationKey,
	TranslationReturn,
	InterpolationVariables,
	Locale,
} from './types'

// ====================================
// DICTIONARIES AND CACHE
// ====================================

const dictionaries = {
	en,
	fr,
} as const

// Simple cache for translations
const translationCache = new Map<string, unknown>()

// ====================================
// MAIN t() FUNCTION
// ====================================

/**
 * Unified translation function that works client AND server side
 *
 * Usage examples:
 * - t('home.hero.title') → string
 * - t('home.hero') → readonly object with all translations under hero
 * - t('common.examples.messages.{index}', { index: 0 }) → dynamic key
 * - t('common.examples.interpolation.greeting', { name: 'John' }) → interpolation
 */
export function createT(locale: Locale): TFunction {
	const dictionary = dictionaries[locale]

	// Implementation of t() function with overloads
	function t(key: string, variables?: InterpolationVariables): unknown {
		// Cache handling
		const cacheKey = createCacheKey(locale, key, variables)
		if (translationCache.has(cacheKey)) {
			return translationCache.get(cacheKey)
		}

		let resolvedKey = key
		let result: unknown

		// Resolve dynamic keys if necessary
		if (isDynamicKey(key) && variables) {
			resolvedKey = resolveDynamicKey(key, variables)
		}

		// Get value from dictionary
		result = getNestedValue(dictionary, resolvedKey)

		// If not found, try with original key
		if (result === undefined && resolvedKey !== key) {
			result = getNestedValue(dictionary, key)
		}

		// If still not found, show warning and return key
		if (result === undefined) {
			warnMissingTranslation(key, locale)
			result = key
		}

		// Interpolation for strings
		if (typeof result === 'string' && variables) {
			result = interpolateString(result, variables)
		}

		// Cache and return
		translationCache.set(cacheKey, result)
		return result
	}

	// Cast to TFunction for TypeScript types
	return t as TFunction
}

// ====================================
// DEFAULT GLOBAL FUNCTION
// ====================================

// Global t() function that uses default locale
// This variable will be reassigned by middleware based on active locale
export let globalT: TFunction = createT('en')

/**
 * Update global t() function with new locale
 * Used by Astro middleware
 */
export function setGlobalLocale(locale: Locale): void {
	globalT = createT(locale)
}

/**
 * Global t() function - uses current locale defined by middleware
 * Can be used anywhere in the application
 */
// Static keys - proper typing
export function t<K extends TranslationKey>(key: K): TranslationReturn<K>
export function t<K extends TranslationKey>(
	key: K,
	variables: InterpolationVariables,
): TranslationReturn<K> extends string ? string : TranslationReturn<K>
// Dynamic keys and fallback - return unknown for safety
export function t(key: string): unknown
export function t(key: string, variables: InterpolationVariables): unknown
export function t<K extends string = string>(
	key: K,
	variables?: InterpolationVariables,
): K extends TranslationKey ? TranslationReturn<K> : unknown {
	if (variables !== undefined) {
		return globalT(key, variables) as K extends TranslationKey
			? TranslationReturn<K>
			: unknown
	}
	return globalT(key) as K extends TranslationKey
		? TranslationReturn<K>
		: unknown
}

// ====================================
// EXPORTS
// ====================================

export type { TFunction, TranslationKey, Locale, InterpolationVariables }

// Re-export utilities for advanced usage
export {
	getNestedValue,
	interpolateString,
	resolveDynamicKey,
	isDynamicKey,
} from './utils'
