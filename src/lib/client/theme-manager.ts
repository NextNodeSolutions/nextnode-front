/**
 * Theme management utilities for client-side theme switching
 * Handles dark/light mode toggle, persistence, and system preference detection
 */

import { createLogger } from '@nextnode/logger'

import { storage } from '@/lib/client/storage-manager'

import type { Theme } from '@/lib/client/storage-manager'

const themeLogger = createLogger({ prefix: 'theme' })

export class ThemeManager {
	private static instance: ThemeManager | null = null

	static getInstance(): ThemeManager {
		if (!ThemeManager.instance) {
			ThemeManager.instance = new ThemeManager()
		}
		return ThemeManager.instance
	}

	/**
	 * Get the current theme preference
	 */
	getCurrentTheme(): Theme {
		const savedTheme = storage.getTheme()

		// If no saved preference, check system preference
		if (!savedTheme || savedTheme === 'system') {
			const systemPrefersDark = window.matchMedia(
				'(prefers-color-scheme: dark)',
			).matches
			return systemPrefersDark ? 'dark' : 'light'
		}

		return savedTheme
	}

	/**
	 * Apply theme to the document and update UI elements
	 */
	applyTheme(theme: Theme): void {
		// Update document class
		if (theme === 'dark') {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}

		// Update theme toggle icons across all components
		this.updateThemeIcons(theme)

		// Store globally for other components
		window.currentTheme = theme
	}

	/**
	 * Set a specific theme
	 */
	setTheme(theme: Theme): void {
		// Save preference using unified storage
		const success = storage.setTheme(theme)
		if (!success) {
			themeLogger.warn(
				'Failed to save theme preference, continuing with theme change',
				{
					details: { theme },
				},
			)
		}

		// Apply theme
		this.applyTheme(theme)

		// Store globally for other components
		window.currentTheme = theme

		// Dispatch custom event for React components
		window.dispatchEvent(
			new CustomEvent('theme-changed', {
				detail: { theme },
			}),
		)
	}

	/**
	 * Toggle between light and dark themes
	 */
	toggleTheme(): void {
		const currentTheme = this.getCurrentTheme()
		const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light'

		this.setTheme(newTheme)
	}

	/**
	 * Update all theme toggle icons in the document
	 */
	private updateThemeIcons(theme: Theme): void {
		const sunIcons = document.querySelectorAll('[id^="sun-icon"]')
		const moonIcons = document.querySelectorAll('[id^="moon-icon"]')

		sunIcons.forEach(sunIcon => {
			if (theme === 'dark') {
				sunIcon.classList.add('hidden')
			} else {
				sunIcon.classList.remove('hidden')
			}
		})

		moonIcons.forEach(moonIcon => {
			if (theme === 'dark') {
				moonIcon.classList.remove('hidden')
			} else {
				moonIcon.classList.add('hidden')
			}
		})
	}

	/**
	 * Set up event listeners and initial theme
	 */
	init(): void {
		// Apply initial theme
		this.applyTheme(this.getCurrentTheme())

		// Listen for system theme changes
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		mediaQuery.addEventListener('change', e => {
			// Only apply system theme if user hasn't set a preference or chose 'system'
			const savedTheme = storage.getTheme()
			if (!savedTheme || savedTheme === 'system') {
				this.applyTheme(e.matches ? 'dark' : 'light')
			}
		})

		// Set up theme toggle buttons
		const themeToggleButtons = document.querySelectorAll(
			'[id^="theme-toggle"]',
		)
		themeToggleButtons.forEach(button => {
			button.addEventListener('click', () => this.toggleTheme())
		})
	}
}

// Export singleton instance for global use
export const themeManager = ThemeManager.getInstance()

// Global types are declared in types/global.d.ts

// Make available globally
window.themeManager = themeManager
