// ====================================
// NEW TYPE-SAFE I18N SYSTEM
// ====================================
// This file contains the auto-inferred type system for i18n
// It automatically generates all types from the English dictionary

import type { en } from '../../i18n/locales/en'

// The English dictionary is the source of truth
export type EnglishDict = typeof en

// Base types
export type Locale = 'en' | 'fr'

// ====================================
// TYPES FOR DYNAMIC KEYS
// ====================================

// Type for interpolation variables
export interface InterpolationVariables {
	[key: string]: string | number | Date | boolean | undefined
}

// Type for keys with dynamic index (e.g., "faq.items.{index}.question")
export type DynamicKey = string

// ====================================
// RECURSIVE PATH EXTRACTOR
// ====================================

// Extract all possible paths from a nested object
type ExtractPaths<T, Prefix extends string = ''> = T extends string
	? Prefix extends ''
		? never
		: Prefix
	: T extends readonly (infer U)[]
		? // Support for arrays with numeric indices
			| (Prefix extends '' ? never : Prefix)
				| ExtractPaths<
						U,
						Prefix extends '' ? `${number}` : `${Prefix}.${number}`
				  >
		: T extends object
			? {
					[K in keyof T]: K extends string
						? T[K] extends object
							? ExtractPaths<
									T[K],
									Prefix extends '' ? K : `${Prefix}.${K}`
								>
							: Prefix extends ''
								? K
								: `${Prefix}.${K}`
						: never
				}[keyof T]
			: never

// All possible translation keys
export type TranslationKey = ExtractPaths<EnglishDict>

// ====================================
// GET VALUES BY PATH
// ====================================

// Get the value at a specific path
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
// SMART RETURN TYPE FOR t() FUNCTION
// ====================================

// Return type of t() function based on the path
export type TranslationReturn<K extends string> = K extends TranslationKey
	? GetValueAtPath<EnglishDict, K> extends string
		? string // If it's a string, return string
		: GetValueAtPath<EnglishDict, K> extends object
			? Readonly<GetValueAtPath<EnglishDict, K>> // If it's an object, return readonly
			: GetValueAtPath<EnglishDict, K> // Otherwise return as is
	: never

// ====================================
// t() FUNCTION - OVERLOADED SIGNATURES
// ====================================

// Signature for exact keys without interpolation
export interface TFunction {
	<K extends TranslationKey>(key: K): TranslationReturn<K>
	<K extends TranslationKey>(
		key: K,
		variables: InterpolationVariables,
	): TranslationReturn<K> extends string ? string : TranslationReturn<K>
	// Signature for dynamic keys
	(key: DynamicKey): string
	(key: DynamicKey, variables: InterpolationVariables): string
}

// ====================================
// VALIDATION TYPES FOR DICTIONARIES
// ====================================

// Type to validate only the structure of other languages (not the content)
type ValidateStructure<Expected> = Expected extends string
	? string // Any string for translated values
	: Expected extends readonly (infer U)[]
		? readonly ValidateStructure<U>[] // Same array structure
		: Expected extends object
			? {
					readonly [K in keyof Expected]: ValidateStructure<
						Expected[K]
					>
				} // Same keys, translated values
			: Expected // Other types pass through as is

// Type for translated dictionary (used with satisfies)
export type TranslationDict = ValidateStructure<EnglishDict>

// ====================================
// INTERPOLATION UTILITIES
// ====================================

// Detect variables in a string (e.g., "Hello {name}")
export type ExtractVariables<T extends string> =
	T extends `${string}{${infer Var}}${infer Rest}`
		? Var | ExtractVariables<Rest>
		: never

// Type for required variables in a key
export type RequiredVariables<K extends TranslationKey> =
	GetValueAtPath<EnglishDict, K> extends string
		? ExtractVariables<GetValueAtPath<EnglishDict, K>>
		: never

// ====================================
// EXPORT TYPES FOR API
// ====================================
// All types are already exported individually above
