/**
 * Language management utilities for client-side language switching
 * Handles locale switching, URL generation, and persistence
 */

import { createLogger } from '@nextnode/logger'

import { storage } from '@/lib/client/storage-manager'

import type { Locale } from '@/types/i18n'

const languageLogger = createLogger({ prefix: 'language' })

export class LanguageManager {
	private static instance: LanguageManager | null = null

	static getInstance(): LanguageManager {
		if (!LanguageManager.instance) {
			LanguageManager.instance = new LanguageManager()
		}
		return LanguageManager.instance
	}

	/**
	 * Get the current language from the global context
	 */
	getCurrentLanguage(): Locale {
		return (window.currentLanguage as Locale) || 'en'
	}

	/**
	 * Generate the correct URL for a given locale
	 */
	private buildLocaleUrl(newLocale: Locale): string {
		const currentPath = window.location.pathname
		const pathWithoutLang = currentPath.replace(/^\/(en|fr)/, '') || '/'

		if (newLocale === 'en') {
			// English is default, no prefix needed
			return pathWithoutLang
		}
		// French needs /fr prefix
		return `/fr${pathWithoutLang}`
	}

	/**
	 * Set language preference using unified storage
	 */
	private setLanguagePreference(locale: Locale): boolean {
		return storage.setLanguage(locale)
	}

	/**
	 * Get the stored language preference
	 */
	getStoredLanguagePreference(): Locale | null {
		return storage.getLanguage()
	}

	/**
	 * Change the current language and navigate to the new URL
	 */
	changeLanguage(newLocale: Locale): void {
		// Validate locale (TypeScript should catch this, but extra safety)
		const validLocales: Locale[] = ['en', 'fr']
		const safeLocale = validLocales.includes(newLocale) ? newLocale : 'en'

		// Set preference synchronously before navigation
		const success = this.setLanguagePreference(safeLocale)
		if (!success) {
			languageLogger.warn(
				'Failed to save language preference, continuing with navigation',
				{
					details: { safeLocale },
				},
			)
		}

		// Update HTML lang attribute immediately
		this.updateHtmlLang(safeLocale)

		// Update global current language
		window.currentLanguage = safeLocale

		// Build new URL
		const newPath = this.buildLocaleUrl(safeLocale)

		// Navigate to new URL
		window.location.href = newPath
	}

	/**
	 * Update the HTML lang attribute
	 */
	private updateHtmlLang(locale: Locale): void {
		document.documentElement.setAttribute('lang', locale)
	}

	/**
	 * Set up language selector event listeners
	 */
	private setupLanguageSelectors(): void {
		const languageButtons = document.querySelectorAll('[data-lang]')

		languageButtons.forEach(button => {
			button.addEventListener('click', e => {
				e.preventDefault()
				const lang = button.getAttribute('data-lang') as Locale

				const validLocales: Locale[] = ['en', 'fr']
				if (lang && validLocales.includes(lang as Locale)) {
					this.changeLanguage(lang)
				}
			})
		})
	}

	/**
	 * Initialize language management
	 */
	init(): void {
		// Set initial HTML lang attribute
		const currentLang = this.getCurrentLanguage()
		this.updateHtmlLang(currentLang)

		// Set up language selector buttons
		this.setupLanguageSelectors()

		// Make current language globally available
		window.currentLanguage = currentLang
	}
}

// Export singleton instance for global use
export const languageManager = LanguageManager.getInstance()

// Global types are declared in types/global.d.ts

// Make available globally
window.languageManager = languageManager
