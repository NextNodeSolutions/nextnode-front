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

// Type for workflow step keys
export type StepKey =
	| 'discovery'
	| 'design'
	| 'development'
	| 'testing'
	| 'deployment'
	| 'support'

// Type for pricing plan keys
export type PlanKey = 'starter' | 'business' | 'enterprise'

// Type for FAQ difficulty levels
export type DifficultyKey = 'beginner' | 'intermediate' | 'advanced'

// Type for FAQ category keys
export type FaqCategoryKey =
	| 'all'
	| 'gettingStarted'
	| 'business'
	| 'design'
	| 'performance'
	| 'security'
	| 'integrations'
	| 'marketing'

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
// DYNAMIC PATH NAVIGATION SYSTEM
// ====================================

// Helper type to parse template string into path segments
type ParseDynamicPath<T extends string> =
	T extends `${infer First}.${infer Rest}`
		? [First, ...ParseDynamicPath<Rest>]
		: [T]

// Generic type to navigate nested objects with path array
// Supports both object keys and array indices
type NavigateObject<
	Obj,
	Path extends readonly string[],
> = Path extends readonly [infer First, ...infer Rest]
	? First extends keyof Obj
		? Rest extends readonly string[]
			? Rest['length'] extends 0
				? Obj[First] // End of path, return the value
				: NavigateObject<Obj[First], Rest> // Continue navigation
			: never
		: First extends `${number}`
			? Obj extends readonly (infer U)[]
				? Rest extends readonly string[]
					? Rest['length'] extends 0
						? U
						: NavigateObject<U, Rest>
					: never
				: never
			: never
	: Obj

// Legacy alias for backward compatibility
type GetValueAtPath<T, P extends string> = NavigateObject<
	T,
	ParseDynamicPath<P>
>

// ====================================
// SIMPLE RETURN TYPE FOR t() FUNCTION
// ====================================

// Return type of t() function based on the path - simple and reliable
export type TranslationReturn<K extends string> = K extends TranslationKey
	? NavigateObject<EnglishDict, ParseDynamicPath<K>> extends infer Result
		? Result extends object
			? Readonly<Result>
			: Result extends string
				? string
				: Result extends never
					? unknown // Fallback for safety if static key resolution fails
					: Result
		: unknown // Fallback for safety if navigation fails
	: unknown // Non-static keys return unknown

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
	// Signature for dynamic keys - return unknown for safety
	(key: DynamicKey): unknown
	(key: DynamicKey, variables: InterpolationVariables): unknown
	// Generic string fallback - return unknown
	(key: string): unknown
	(key: string, variables: InterpolationVariables): unknown
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
