// ====================================
// FONCTION t() UNIFIÉE - SYSTÈME I18N
// ====================================
// Fonction unique qui fonctionne côté client ET serveur

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
	DynamicKey,
	Locale,
} from './types'

// ====================================
// DICTIONNAIRES ET CACHE
// ====================================

const dictionaries = {
	en,
	fr,
} as const

// Cache simple pour les traductions
const translationCache = new Map<string, unknown>()

// ====================================
// FONCTION PRINCIPALE t()
// ====================================

/**
 * Fonction de traduction unifiée qui fonctionne côté client ET serveur
 *
 * Exemples d'utilisation :
 * - t('home.hero.title') → string
 * - t('home.hero') → objet readonly avec toutes les traductions sous hero
 * - t('common.examples.messages.{index}', { index: 0 }) → clé dynamique
 * - t('common.examples.interpolation.greeting', { name: 'John' }) → interpolation
 */
export function createT(locale: Locale): TFunction {
	const dictionary = dictionaries[locale]

	// Implémentation de la fonction t() avec surcharges
	function t(key: string, variables?: InterpolationVariables): unknown {
		// Gestion du cache
		const cacheKey = createCacheKey(locale, key, variables)
		if (translationCache.has(cacheKey)) {
			return translationCache.get(cacheKey)
		}

		let resolvedKey = key
		let result: unknown

		// Résoudre les clés dynamiques si nécessaire
		if (isDynamicKey(key) && variables) {
			resolvedKey = resolveDynamicKey(key, variables)
		}

		// Récupérer la valeur dans le dictionnaire
		result = getNestedValue(dictionary, resolvedKey)

		// Si pas trouvé, essayer avec la clé originale
		if (result === undefined && resolvedKey !== key) {
			result = getNestedValue(dictionary, key)
		}

		// Si toujours pas trouvé, afficher un warning et retourner la clé
		if (result === undefined) {
			warnMissingTranslation(key, locale)
			result = key
		}

		// Interpolation pour les strings
		if (typeof result === 'string' && variables) {
			result = interpolateString(result, variables)
		}

		// Mise en cache et retour
		translationCache.set(cacheKey, result)
		return result
	}

	// Cast vers TFunction pour les types TypeScript
	return t as TFunction
}

// ====================================
// FONCTION GLOBALE PAR DÉFAUT
// ====================================

// Fonction t() globale qui utilise la locale par défaut
// Cette variable sera réassignée par le middleware selon la locale active
export let globalT: TFunction = createT('en')

/**
 * Met à jour la fonction t() globale avec une nouvelle locale
 * Utilisé par le middleware Astro
 */
export function setGlobalLocale(locale: Locale): void {
	globalT = createT(locale)
}

/**
 * Fonction t() globale - utilise la locale courante définie par le middleware
 * Peut être utilisée partout dans l'application
 */
export function t<K extends TranslationKey>(key: K): TranslationReturn<K>
export function t<K extends TranslationKey>(
	key: K,
	variables: InterpolationVariables,
): TranslationReturn<K> extends string ? string : TranslationReturn<K>
export function t(key: DynamicKey): string
export function t(key: DynamicKey, variables: InterpolationVariables): string
export function t(key: string, variables?: InterpolationVariables): unknown {
	if (variables !== undefined) {
		return globalT(key, variables)
	}
	return globalT(key)
}

// ====================================
// EXPORTS
// ====================================

export type { TFunction, TranslationKey, Locale, InterpolationVariables }

// Re-export des utilitaires pour usage avancé
export {
	getNestedValue,
	interpolateString,
	resolveDynamicKey,
	isDynamicKey,
} from './utils'
