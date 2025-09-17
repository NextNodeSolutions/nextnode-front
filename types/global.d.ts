import type { Locale } from './i18n'

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
}
