/// <reference types="astro/client" />

declare global {
	interface Window {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace App {
	interface Locals {
		lang: string
	}
}

export {}
