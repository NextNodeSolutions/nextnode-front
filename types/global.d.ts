import type { Locale, TFunction } from './i18n'

declare global {
	interface Window {
		currentLanguage?: string
		currentLocale?: Locale
		languageManager: {
			getCurrentLanguage(): string
			changeLanguage(newLang: string): void
			init(): void
		}
		themeManager: {
			getCurrentTheme(): string
			applyTheme(theme: string): void
			toggleTheme(): void
			init(): void
		}
		initialLanguage?: string
		initialTheme?: string
	}

	// Astro App namespace extension for middleware
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace App {
		// eslint-disable-next-line @typescript-eslint/no-empty-object-type
		interface Locals {
			locale: Locale
			t: TFunction
		}
	}
}
