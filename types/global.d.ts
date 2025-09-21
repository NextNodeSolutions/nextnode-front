import type { Locale, TFunction } from './i18n'
import type { ThemeManager, Theme } from '../src/lib/client/theme-manager'
import type { LanguageManager } from '../src/lib/client/language-manager'

declare global {
	interface Window {
		currentLanguage: Locale
		currentLocale: Locale
		currentTheme: Theme
		initialTheme: Theme
		languageManager: LanguageManager
		themeManager: ThemeManager
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
