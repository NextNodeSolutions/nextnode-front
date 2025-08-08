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

// Type-safe locale validation function type
export type LocaleGuard = (value: unknown) => value is Locale

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
			: T[K] extends readonly { name: string; description: string }[]
				? readonly { name: string; description: string }[]
				: T[K] extends readonly { question: string; answer: string }[]
					? readonly { question: string; answer: string }[]
					: T[K] extends readonly {
								name: string
								price: string
								responseTime: string
								availability: string
								description: string
								features: readonly string[]
								suitable: string
						  }[]
						? readonly {
								name: string
								price: string
								responseTime: string
								availability: string
								description: string
								features: readonly string[]
								suitable: string
							}[]
						: T[K] extends readonly unknown[]
							? readonly string[]
							: T[K] extends object
								? StructureOf<T[K]>
								: T[K]
}

// Type for other language dictionaries - validates structure but allows different string values
export type TranslationDict = StructureOf<typeof en>

// Type for typed nested value getter function
export type TypedGetNestedValue = <K extends TranslationKey>(
	obj: TranslationDict,
	path: K,
) => TranslationValue<K>
