import type { en } from './locales/en'

// Use the English dictionary as the source of truth
export type EnglishDict = typeof en

// Language locales
export type Locale = 'en' | 'fr'

// Smart approach: generate actual dot-notation keys from the English dictionary structure

// Recursive type to extract all paths from nested objects
type PathsToStringProps<T, Prefix extends string = ''> = T extends string
	? Prefix extends ''
		? never
		: Prefix
	: T extends readonly (infer U)[]
		? Prefix extends ''
			? never
			: Prefix | PathsToStringProps<U, `${Prefix}.${number}`>
		: {
				[K in keyof T]: K extends string
					? T[K] extends object
						? PathsToStringProps<
								T[K],
								Prefix extends '' ? K : `${Prefix}.${K}`
							>
						: Prefix extends ''
							? K
							: `${Prefix}.${K}`
					: never
			}[keyof T]

// All possible translation keys (automatically generated!)
export type TranslationKey = PathsToStringProps<EnglishDict>

// Helper type to get the value at a specific path, supporting array indices
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

// Get the exact type for a specific translation key
export type TranslationValue<K extends TranslationKey> = GetValueAtPath<
	EnglishDict,
	K
>

// Utility type for safe type checking
export type IsValidLocale<T> = T extends Locale ? T : never

// Type-safe locale validation
export type LocaleGuard = (value: unknown) => value is Locale

// Helper function type for getting typed nested values from translation objects
export type TypedGetNestedValue = <K extends TranslationKey>(
	obj: TranslationDict | EnglishDict,
	path: K,
) => TranslationValue<K>

// Type-safe translation function
export type TranslationFunction = <K extends TranslationKey>(
	key: K,
	params?: Record<string, string | number>,
) => TranslationValue<K>

// Navigation link type used across components
export interface NavigationLink {
	href: string
	labelKey: TranslationKey
}

// Array of navigation links
export type NavigationLinks = NavigationLink[]

// Type helper to extract structure without literal string types
type StructureOf<T> = {
	readonly [K in keyof T]: T[K] extends string
		? string
		: T[K] extends readonly string[]
			? readonly string[]
			: T[K] extends readonly (infer U)[]
				? readonly StructureOf<U>[]
				: T[K] extends object
					? StructureOf<T[K]>
					: T[K]
}

// Type for other language dictionaries - validates structure but allows different string values
export type TranslationDict = StructureOf<typeof en>
