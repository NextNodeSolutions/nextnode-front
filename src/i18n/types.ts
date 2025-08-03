import type { en } from './locales/en'

// Create a flexible type that matches the English structure but allows any string values
type FlexibleTranslations<T> = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	readonly [K in keyof T]: T[K] extends readonly any[]
		? T[K] extends readonly string[]
			? readonly string[]
			: T[K] extends readonly {
						readonly name: string
						readonly description: string
				  }[]
				? readonly {
						readonly name: string
						readonly description: string
					}[]
				: T[K] extends readonly {
							readonly question: string
							readonly answer: string
					  }[]
					? readonly {
							readonly question: string
							readonly answer: string
						}[]
					: readonly string[]
		: T[K] extends object
			? FlexibleTranslations<T[K]>
			: string
}

// Use the English structure as the canonical type
export type Translations = FlexibleTranslations<typeof en>

// Extract specific types for better type safety
export type NavigationKeys = keyof Translations['navigation']
export type UIKeys = keyof Translations['ui']
export type LanguageKeys = keyof Translations['languages']

// FAQ category type
export type FaqCategoryKey = keyof Translations['faqCategories']

// Tech category type
export type TechCategoryKey =
	keyof Translations['howWeWork']['techStack']['categories']

// Generic function to get nested translation values with type safety
export type TranslationKey = string
export type TranslationValue<T extends string> = T extends keyof Translations
	? Translations[T]
	: T extends `${infer K}.${infer Rest}`
		? K extends keyof Translations
			? TranslationValue<Rest> extends string
				? string
				: unknown
			: unknown
		: unknown

// Language locales
export type Locale = 'en' | 'fr'

// Translation function type
export type TranslationFunction = (
	key: TranslationKey,
	params?: Record<string, unknown>,
) => string

// Overloaded translation function type for specific return types
export interface TypedTranslationFunction {
	(key: string): string
	<T = unknown>(key: string): T
}
