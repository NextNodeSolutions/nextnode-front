// ====================================
// UTILITAIRES POUR LE SYSTÈME I18N
// ====================================

import type { InterpolationVariables, DynamicKey, TranslationKey } from './types'

// ====================================
// INTERPOLATION DE VARIABLES
// ====================================

/**
 * Interpole les variables dans un string de traduction
 * Exemple: interpolateString("Hello {name}!", { name: "World" }) → "Hello World!"
 */
export function interpolateString(
	text: string,
	variables?: InterpolationVariables,
): string {
	if (!variables) return text

	return text.replace(/\{([^}]+)\}/g, (match, key) => {
		const value = variables[key]
		if (value === undefined || value === null) {
			console.warn(`Missing interpolation variable: ${key}`)
			return match // Retourner le placeholder si la variable n'existe pas
		}

		// Gestion des différents types
		if (value instanceof Date) {
			return value.toLocaleDateString()
		}

		return String(value)
	})
}

// ====================================
// NAVIGATION DANS LES OBJETS
// ====================================

/**
 * Récupère une valeur dans un objet imbriqué via un chemin en point-notation
 * Exemple: getNestedValue(obj, "home.hero.title")
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

		// Support des indices d'array
		if (typeof current === 'object' && Array.isArray(current)) {
			const index = parseInt(key, 10)
			if (!isNaN(index) && index >= 0 && index < current.length) {
				current = current[index]
				continue
			}
		}

		// Navigation normale dans l'objet
		if (typeof current === 'object' && current !== null) {
			current = (current as Record<string, unknown>)[key]
		} else {
			return undefined
		}
	}

	return current as T
}

// ====================================
// GESTION DES CLÉS DYNAMIQUES
// ====================================

/**
 * Résout les clés dynamiques en remplaçant les placeholders
 * Exemple: resolveDynamicKey("faq.items.{index}.question", { index: 0 })
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
			console.warn(`Missing dynamic key variable: ${placeholder}`)
			return match
		}
		return String(value)
	})
}

// ====================================
// VALIDATION DE CLÉS
// ====================================

/**
 * Vérifie si une clé est une clé de traduction valide
 */
export function isValidTranslationKey(key: string): key is TranslationKey {
	// Cette fonction sera utilisée en runtime pour valider les clés
	// En développement, TypeScript nous donnera les erreurs de compilation
	return typeof key === 'string' && key.length > 0
}

/**
 * Vérifie si une clé contient des placeholders dynamiques
 */
export function isDynamicKey(key: string): boolean {
	return /\{[^}]+\}/.test(key)
}

// ====================================
// UTILITAIRES DE CACHE
// ====================================

/**
 * Créer une clé de cache unique pour une traduction
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
// UTILITAIRES DE DÉVELOPPEMENT
// ====================================

/**
 * Affiche un avertissement si une traduction est manquante
 */
export function warnMissingTranslation(key: string, locale: string): void {
	if (process.env.NODE_ENV === 'development') {
		console.warn(`[i18n] Missing translation for key "${key}" in locale "${locale}"`)
	}
}

/**
 * Affiche un avertissement pour variables d'interpolation manquantes
 */
export function warnMissingVariable(variable: string, key: string): void {
	if (process.env.NODE_ENV === 'development') {
		console.warn(`[i18n] Missing variable "${variable}" for key "${key}"`)
	}
}