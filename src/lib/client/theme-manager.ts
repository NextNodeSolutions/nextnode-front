/**
 * Theme management utilities for client-side theme switching
 * Handles dark/light mode toggle, persistence, and system preference detection
 */

export type Theme = 'light' | 'dark'

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
		const savedTheme = localStorage.getItem('theme') as Theme | null
		const systemPrefersDark = window.matchMedia(
			'(prefers-color-scheme: dark)',
		).matches

		return savedTheme || (systemPrefersDark ? 'dark' : 'light')
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
	 * Toggle between light and dark themes
	 */
	toggleTheme(): void {
		const currentTheme = this.getCurrentTheme()
		const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light'

		// Save preference
		localStorage.setItem('theme', newTheme)

		// Apply theme
		this.applyTheme(newTheme)

		// Dispatch custom event for React components
		window.dispatchEvent(
			new CustomEvent('theme-changed', {
				detail: { theme: newTheme },
			}),
		)
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
			// Only apply system theme if user hasn't set a preference
			if (!localStorage.getItem('theme')) {
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
