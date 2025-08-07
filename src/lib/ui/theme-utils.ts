/**
 * Theme utilities for managing dark/light mode
 */

export interface ThemeIconElements {
	sunIcon: HTMLElement | null
	moonIcon: HTMLElement | null
}

/**
 * Initialize theme toggle icons based on current theme state
 * Consolidates the duplicated script logic from mobile and desktop controls
 */
export function initializeThemeIcons(
	sunIconId: string,
	moonIconId: string,
): void {
	const savedTheme = localStorage.getItem('theme')
	const systemPrefersDark = window.matchMedia(
		'(prefers-color-scheme: dark)',
	).matches
	const isDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark)

	const sunIcon = document.getElementById(sunIconId)
	const moonIcon = document.getElementById(moonIconId)

	if (sunIcon && moonIcon) {
		if (isDark) {
			sunIcon.classList.add('hidden')
			moonIcon.classList.remove('hidden')
		} else {
			sunIcon.classList.remove('hidden')
			moonIcon.classList.add('hidden')
		}
	}
}

/**
 * Generate the theme toggle script as a string for inline scripts
 * Used in Astro components with is:inline scripts
 */
export function generateThemeToggleScript(
	sunIconId: string,
	moonIconId: string,
): string {
	return `
		function initThemeIcons() {
			const savedTheme = localStorage.getItem('theme')
			const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
			const isDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark)

			const sunIcon = document.getElementById('${sunIconId}')
			const moonIcon = document.getElementById('${moonIconId}')

			if (sunIcon && moonIcon) {
				if (isDark) {
					sunIcon.classList.add('hidden')
					moonIcon.classList.remove('hidden')
				} else {
					sunIcon.classList.remove('hidden')
					moonIcon.classList.add('hidden')
				}
			}
		}
		initThemeIcons()
	`.trim()
}

/**
 * Common theme detection utilities
 */
export const themeUtils = {
	/**
	 * Get current theme preference
	 */
	getCurrentTheme(): 'light' | 'dark' {
		const savedTheme = localStorage.getItem('theme')
		const systemPrefersDark = window.matchMedia(
			'(prefers-color-scheme: dark)',
		).matches
		return savedTheme === 'dark' || (!savedTheme && systemPrefersDark)
			? 'dark'
			: 'light'
	},

	/**
	 * Check if dark mode is active
	 */
	isDarkMode(): boolean {
		return this.getCurrentTheme() === 'dark'
	},

	/**
	 * Toggle between light and dark theme
	 */
	toggleTheme(): void {
		const currentTheme = this.getCurrentTheme()
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
		localStorage.setItem('theme', newTheme)

		// Update document class
		if (newTheme === 'dark') {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	},
}
