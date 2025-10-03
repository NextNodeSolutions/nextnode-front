/**
 * Language management utilities for client-side language switching
 * Handles locale switching, URL generation, and persistence via cookies
 */

import { createLogger } from '@nextnode/logger'

import { DEFAULT_LOCALE, isValidLocale, SUPPORTED_LOCALES } from '@/i18n/config'
import { COOKIE_NAMES } from '@/lib/constants'
import { setCookie } from '@/lib/cookies'

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
		return (window.currentLanguage as Locale) || DEFAULT_LOCALE
	}

	/**
	 * Generate the correct URL for a given locale
	 * Uses dynamic locale detection based on SUPPORTED_LOCALES
	 */
	private buildLocaleUrl(newLocale: Locale): string {
		const currentPath = window.location.pathname

		// Build regex pattern from supported locales
		const localePattern = new RegExp(`^/(${SUPPORTED_LOCALES.join('|')})`)
		const pathWithoutLang = currentPath.replace(localePattern, '') || '/'

		// Default locale: no prefix needed (clean URLs)
		if (newLocale === DEFAULT_LOCALE) {
			return pathWithoutLang
		}

		// Other locales: add locale prefix
		return `/${newLocale}${pathWithoutLang}`
	}

	/**
	 * Change the current language and navigate to the new URL
	 */
	async changeLanguage(newLocale: Locale): Promise<void> {
		// Validate locale against supported locales
		const safeLocale = SUPPORTED_LOCALES.includes(newLocale)
			? newLocale
			: DEFAULT_LOCALE

		languageLogger.info('Attempting to change language', {
			details: { newLocale, safeLocale },
		})

		// Set preference in cookie before navigation
		const success = await setCookie(COOKIE_NAMES.LANG, safeLocale, {
			path: '/',
			maxAge: 365 * 24 * 60 * 60, // 1 year
			sameSite: 'lax',
		})

		if (!success) {
			languageLogger.error('Failed to save language preference cookie', {
				details: { safeLocale },
			})
		} else {
			languageLogger.info(
				'Language preference cookie saved successfully',
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

		languageLogger.info('Navigating to new locale URL', {
			details: { newPath },
		})

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

		languageLogger.info('Setting up language selectors', {
			details: { buttonsFound: languageButtons.length },
		})

		if (languageButtons.length === 0) {
			languageLogger.warn(
				'No language buttons found with [data-lang] attribute',
			)
			return
		}

		languageButtons.forEach((button, index) => {
			const lang = button.getAttribute('data-lang')
			languageLogger.info('Attaching listener to language button', {
				details: { index, lang, element: button.id || 'no-id' },
			})

			button.addEventListener('click', async e => {
				e.preventDefault()
				const clickedLang = button.getAttribute('data-lang')

				languageLogger.info('Language button clicked', {
					details: { lang: clickedLang },
				})

				if (isValidLocale(clickedLang)) {
					await this.changeLanguage(clickedLang)
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
