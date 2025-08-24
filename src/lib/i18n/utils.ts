// ====================================
// UTILITIES FOR I18N SYSTEM
// ====================================

import { i18nLogger } from '../logging'

import type {
	InterpolationVariables,
	DynamicKey,
	TranslationKey,
} from './types'

// ====================================
// VARIABLE INTERPOLATION
// ====================================

/**
 * Interpolate variables in a translation string
 * Example: interpolateString("Hello {name}!", { name: "World" }) → "Hello World!"
 */
export function interpolateString(
	text: string,
	variables?: InterpolationVariables,
): string {
	if (!variables) return text

	return text.replace(/\{([^}]+)\}/g, (match, key) => {
		const value = variables[key]
		if (value === undefined || value === null) {
			i18nLogger.warning('Missing interpolation variable', {
				scope: 'variable-interpolation',
				details: { key, text },
			})
			return match // Return placeholder if variable doesn't exist
		}

		// Handle different types
		if (value instanceof Date) {
			return value.toLocaleDateString()
		}

		return String(value)
	})
}

// ====================================
// OBJECT NAVIGATION
// ====================================

/**
 * Get a value in a nested object via dot-notation path
 * Example: getNestedValue(obj, "home.hero.title")
 */
export function getNestedValue<T = unknown>(
	obj: Record<string, unknown>,
	path: string,
): T | undefined {
	if (!obj || !path) return undefined

	const keys = path.split('.')
	let current: unknown = obj

	for (const key of keys) {
		if (current === null || current === undefined) {
			return undefined
		}

		// Support for array indices
		if (typeof current === 'object' && Array.isArray(current)) {
			const index = parseInt(key, 10)
			if (!isNaN(index) && index >= 0 && index < current.length) {
				current = current[index]
				continue
			}
		}

		// Normal object navigation
		if (
			typeof current === 'object' &&
			current !== null &&
			!Array.isArray(current)
		) {
			// Type assertion needed for dynamic object navigation
			const obj = current as Record<string, unknown>
			current = obj[key]
		} else {
			return undefined
		}
	}

	// Type assertion needed for the return type as TypeScript cannot infer
	// the exact type from dynamic path navigation
	return current as T
}

// ====================================
// DYNAMIC KEY HANDLING
// ====================================

/**
 * Resolve dynamic keys by replacing placeholders
 * Example: resolveDynamicKey("faq.items.{index}.question", { index: 0 })
 * → "faq.items.0.question"
 */
export function resolveDynamicKey(
	key: DynamicKey,
	variables?: InterpolationVariables,
): string {
	if (!variables) return key

	return key.replace(/\{([^}]+)\}/g, (match, placeholder) => {
		const value = variables[placeholder]
		if (value === undefined || value === null) {
			i18nLogger.warning('Missing dynamic key variable', {
				scope: 'dynamic-key-resolution',
				details: { placeholder, key },
			})
			return match
		}
		return String(value)
	})
}

// ====================================
// KEY VALIDATION
// ====================================

/**
 * Check if a key is a valid translation key
 */
export function isValidTranslationKey(key: string): key is TranslationKey {
	// This function will be used at runtime to validate keys
	// In development, TypeScript will give us compilation errors
	return typeof key === 'string' && key.length > 0
}

/**
 * Check if a key contains dynamic placeholders
 */
export function isDynamicKey(key: string): boolean {
	return /\{[^}]+\}/.test(key)
}

// ====================================
// CACHE UTILITIES
// ====================================

/**
 * Create a unique cache key for a translation
 */
export function createCacheKey(
	locale: string,
	key: string,
	variables?: InterpolationVariables,
): string {
	const variablesHash = variables
		? JSON.stringify(variables, Object.keys(variables).sort())
		: ''
	return `${locale}:${key}:${variablesHash}`
}

// ====================================
// DEVELOPMENT UTILITIES
// ====================================

/**
 * Display a warning if a translation is missing
 */
export function warnMissingTranslation(key: string, locale: string): void {
	if (process.env.NODE_ENV === 'development') {
		i18nLogger.warning('Missing translation', {
			scope: 'translation-missing',
			details: { key, locale },
		})
	}
}

/**
 * Display a warning for missing interpolation variables
 */
export function warnMissingVariable(variable: string, key: string): void {
	if (process.env.NODE_ENV === 'development') {
		i18nLogger.warning('Missing variable for interpolation', {
			scope: 'variable-missing',
			details: { variable, key },
		})
	}
}
