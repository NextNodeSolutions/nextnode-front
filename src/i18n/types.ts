import type { en } from './locales/en'

// Use the English dictionary as the source of truth
export type EnglishDict = typeof en

// Language locales
export type Locale = 'en' | 'fr'

// Smart approach: generate actual dot-notation keys from the English dictionary structure

// Recursive type to extract all paths (simplified but effective)
type PathsToStringProps<T, Prefix extends string = ''> = T extends string
	? Prefix extends ''
		? never
		: Prefix
	: T extends readonly unknown[]
		? Prefix extends ''
			? never
			: Prefix
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

// Helper type to get the value at a specific path
type GetValueAtPath<T, P extends string> = P extends `${infer K}.${infer Rest}`
	? K extends keyof T
		? GetValueAtPath<T[K], Rest>
		: never
	: P extends keyof T
		? T[P]
		: never

// Get the exact type for a specific translation key
export type TranslationValue<K extends TranslationKey> = GetValueAtPath<
	EnglishDict,
	K
>

// Type-safe translation function
export type TranslationFunction = <K extends TranslationKey>(
	key: K,
	params?: Record<string, string | number>,
) => TranslationValue<K>

// Simple type for other language dictionaries - same structure as English
export type TranslationDict = typeof en
