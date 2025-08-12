// ====================================
// NOUVEAU SYSTÈME I18N TYPE-SAFE
// ====================================
// Ce fichier contient le système de types auto-inférés pour l'i18n
// Il génère automatiquement tous les types depuis le dictionnaire anglais

import type { en } from '../../i18n/locales/en'

// Le dictionnaire anglais est la source de vérité
export type EnglishDict = typeof en

// Types de base
export type Locale = 'en' | 'fr'

// ====================================
// TYPES POUR CLÉS DYNAMIQUES
// ====================================

// Type pour variables d'interpolation
export interface InterpolationVariables {
	[key: string]: string | number | Date | boolean | undefined
}

// Type pour clés avec index dynamique (ex: "faq.items.{index}.question")
export type DynamicKey = string

// ====================================
// EXTRACTEUR DE CHEMINS RÉCURSIF
// ====================================

// Extraire tous les chemins possibles d'un objet imbriqué
type ExtractPaths<T, Prefix extends string = ''> = T extends string
	? Prefix extends ''
		? never
		: Prefix
	: T extends readonly (infer U)[]
		? // Support des arrays avec indices numériques
			| (Prefix extends '' ? never : Prefix)
			| ExtractPaths<U, Prefix extends '' ? `${number}` : `${Prefix}.${number}`>
		: T extends object
			? {
					[K in keyof T]: K extends string
						? T[K] extends object
							? ExtractPaths<T[K], Prefix extends '' ? K : `${Prefix}.${K}`>
							: Prefix extends ''
								? K
								: `${Prefix}.${K}`
						: never
				}[keyof T]
			: never

// Toutes les clés de traduction possibles
export type TranslationKey = ExtractPaths<EnglishDict>

// ====================================
// RÉCUPÉRATION DE VALEURS PAR CHEMIN
// ====================================

// Récupérer la valeur à un chemin spécifique
type GetValueAtPath<T, P extends string> = P extends `${infer K}.${infer Rest}`
	? K extends keyof T
		? GetValueAtPath<T[K], Rest>
		: K extends `${number}`
			? T extends readonly (infer U)[]
				? GetValueAtPath<U, Rest>
				: never
			: never
	: P extends keyof T
		? T[P]
		: P extends `${number}`
			? T extends readonly (infer U)[]
				? U
				: never
			: never

// ====================================
// TYPE RETOUR INTELLIGENT DE LA FONCTION t()
// ====================================

// Type de retour de la fonction t() selon le chemin
export type TranslationReturn<K extends string> = K extends TranslationKey
	? GetValueAtPath<EnglishDict, K> extends string
		? string // Si c'est un string, retourner string
		: GetValueAtPath<EnglishDict, K> extends object
			? Readonly<GetValueAtPath<EnglishDict, K>> // Si c'est un objet, retourner readonly
			: GetValueAtPath<EnglishDict, K> // Sinon retourner tel quel
	: never

// ====================================
// FONCTION t() - SIGNATURES SURCHARGÉES
// ====================================

// Signature pour clés exactes sans interpolation
export interface TFunction {
	<K extends TranslationKey>(key: K): TranslationReturn<K>
	<K extends TranslationKey>(
		key: K,
		variables: InterpolationVariables,
	): TranslationReturn<K> extends string ? string : TranslationReturn<K>
	// Signature pour clés dynamiques
	(key: DynamicKey): string
	(key: DynamicKey, variables: InterpolationVariables): string
}

// ====================================
// TYPES DE VALIDATION POUR DICTIONNAIRES
// ====================================

// Type pour valider la structure des autres langues
export type ValidateTranslationDict<T> = {
	readonly [K in keyof EnglishDict]: ValidateValue<EnglishDict[K], T[K]>
}

// Valider récursivement les valeurs
type ValidateValue<Expected, Actual> = Expected extends string
	? Actual extends string
		? Actual
		: never
	: Expected extends readonly (infer U)[]
		? Actual extends readonly (infer V)[]
			? ValidateArray<U, V>
			: never
		: Expected extends object
			? Actual extends object
				? {
						readonly [K in keyof Expected]: ValidateValue<Expected[K], Actual[K]>
					}
				: never
			: never

// Valider les arrays
type ValidateArray<ExpectedItem, ActualItem> = ExpectedItem extends string
	? ActualItem extends string
		? readonly ActualItem[]
		: never
	: ExpectedItem extends object
		? ActualItem extends object
			? readonly {
					[K in keyof ExpectedItem]: ValidateValue<ExpectedItem[K], ActualItem[K]>
				}[]
			: never
		: never

// Type pour dictionnaire traduit (utilisé avec satisfies)
export type TranslationDict = ValidateTranslationDict<EnglishDict>

// ====================================
// UTILITAIRES POUR INTERPOLATION
// ====================================

// Détecter les variables dans un string (ex: "Hello {name}")
export type ExtractVariables<T extends string> =
	T extends `${string}{${infer Var}}${infer Rest}`
		? Var | ExtractVariables<Rest>
		: never

// Type pour variables requises dans une clé
export type RequiredVariables<K extends TranslationKey> =
	GetValueAtPath<EnglishDict, K> extends string
		? ExtractVariables<GetValueAtPath<EnglishDict, K>>
		: never

// ====================================
// TYPES D'EXPORT POUR L'API
// ====================================

export type {
	// Types principaux
	EnglishDict,
	TranslationKey,
	TranslationReturn,
	TFunction,
	// Types pour variables
	InterpolationVariables,
	RequiredVariables,
	// Types pour validation
	TranslationDict,
	ValidateTranslationDict,
	// Utilitaires
	DynamicKey,
	Locale,
}