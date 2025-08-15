import type { Locale } from '@/lib/i18n/types'

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

export {}
