/**
 * Unified storage manager for client-side preferences
 * Provides optimized storage using localStorage with cookie fallback for SSR
 * Follows DRY principles for theme and language preferences
 */

import { createLogger } from '@nextnode/logger'

import type { Locale } from '@/types/i18n'

const storageLogger = createLogger({ prefix: 'storage' })

export type Theme = 'light' | 'dark' | 'system'

export type StorageKey = 'theme' | 'language'

export interface StorageValues {
	theme: Theme
	language: Locale
}

/**
 * Cookie configuration for different storage types
 */
const getCookieConfig = (key: StorageKey): string => {
	const baseConfig = 'path=/; SameSite=Lax'

	switch (key) {
		case 'theme':
			return `${baseConfig}; max-age=31536000` // 1 year
		case 'language':
			return `${baseConfig}; max-age=31536000` // 1 year
		default:
			return `${baseConfig}; max-age=86400` // 24 hours
	}
}

/**
 * Map storage keys to cookie names and localStorage keys
 */
const getStorageKeys = (key: StorageKey) => ({
	localStorage: key === 'language' ? 'preferred-locale' : key,
	cookie: key === 'language' ? 'preferred-locale' : `${key}-preference`,
})

export class StorageManager {
	private static instance: StorageManager | null = null

	static getInstance(): StorageManager {
		if (!StorageManager.instance) {
			StorageManager.instance = new StorageManager()
		}
		return StorageManager.instance
	}

	/**
	 * Check if localStorage is available
	 */
	private isLocalStorageAvailable(): boolean {
		if (typeof window === 'undefined') return false

		try {
			const testKey = '__storage_test__'
			localStorage.setItem(testKey, 'test')
			localStorage.removeItem(testKey)
			return true
		} catch {
			return false
		}
	}

	/**
	 * Check if cookies are available
	 */
	private isCookieAvailable(): boolean {
		if (typeof document === 'undefined') return false

		try {
			const testKey = '__cookie_test__'
			// biome-ignore lint/suspicious/noDocumentCookie: Testing cookie support
			document.cookie = `${testKey}=test; path=/`
			const hasSupport = document.cookie.includes(testKey)

			// Clean up test cookie
			if (hasSupport) {
				// biome-ignore lint/suspicious/noDocumentCookie: Cleaning up test cookie
				document.cookie = `${testKey}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
			}

			return hasSupport
		} catch {
			return false
		}
	}

	/**
	 * Get value from localStorage
	 */
	private getFromLocalStorage<K extends StorageKey>(
		key: K,
	): StorageValues[K] | null {
		if (!this.isLocalStorageAvailable()) return null

		try {
			const { localStorage: storageKey } = getStorageKeys(key)
			const value = localStorage.getItem(storageKey)
			return value as StorageValues[K] | null
		} catch (error) {
			storageLogger.error('Failed to get from localStorage', {
				details: { key, error },
			})
			return null
		}
	}

	/**
	 * Set value in localStorage
	 */
	private setInLocalStorage<K extends StorageKey>(
		key: K,
		value: StorageValues[K],
	): boolean {
		if (!this.isLocalStorageAvailable()) return false

		try {
			const { localStorage: storageKey } = getStorageKeys(key)
			localStorage.setItem(storageKey, value)
			return true
		} catch (error) {
			storageLogger.error('Failed to set in localStorage', {
				details: { key, value, error },
			})
			return false
		}
	}

	/**
	 * Get value from cookie (synchronous)
	 */
	private getFromCookie<K extends StorageKey>(
		key: K,
	): StorageValues[K] | null {
		if (!this.isCookieAvailable()) return null

		try {
			const { cookie: cookieName } = getStorageKeys(key)
			const name = `${encodeURIComponent(cookieName)}=`
			const cookies = document.cookie.split(';')

			for (const cookie of cookies) {
				const trimmedCookie = cookie.trim()
				if (trimmedCookie.startsWith(name)) {
					const value = trimmedCookie.substring(name.length)
					return decodeURIComponent(value) as StorageValues[K]
				}
			}

			return null
		} catch (error) {
			storageLogger.error('Failed to get from cookie', {
				details: { key, error },
			})
			return null
		}
	}

	/**
	 * Set value in cookie (synchronous)
	 */
	private setInCookie<K extends StorageKey>(
		key: K,
		value: StorageValues[K],
	): boolean {
		if (!this.isCookieAvailable()) return false

		try {
			const { cookie: cookieName } = getStorageKeys(key)
			const config = getCookieConfig(key)
			const cookieString = `${encodeURIComponent(cookieName)}=${encodeURIComponent(String(value))}; ${config}`

			// biome-ignore lint/suspicious/noDocumentCookie: Synchronous cookie setting for performance
			document.cookie = cookieString
			return true
		} catch (error) {
			storageLogger.error('Failed to set cookie', {
				details: { key, value, error },
			})
			return false
		}
	}

	/**
	 * Get a preference value (localStorage first, cookie fallback)
	 */
	get<K extends StorageKey>(key: K): StorageValues[K] | null {
		// Try localStorage first (faster, more reliable)
		const localValue = this.getFromLocalStorage(key)
		if (localValue !== null) {
			return localValue
		}

		// Fallback to cookie
		return this.getFromCookie(key)
	}

	/**
	 * Set a preference value (both localStorage and cookie for maximum compatibility)
	 */
	set<K extends StorageKey>(key: K, value: StorageValues[K]): boolean {
		let success = false

		// Set in localStorage for performance
		if (this.setInLocalStorage(key, value)) {
			success = true
		}

		// Also set in cookie for SSR compatibility
		if (this.setInCookie(key, value)) {
			success = true
		}

		if (!success) {
			storageLogger.warn(
				'Failed to set preference in any storage method',
				{
					details: { key, value },
				},
			)
		}

		return success
	}

	/**
	 * Remove a preference from all storage methods
	 */
	remove<K extends StorageKey>(key: K): boolean {
		let success = false

		// Remove from localStorage
		if (this.isLocalStorageAvailable()) {
			try {
				const { localStorage: storageKey } = getStorageKeys(key)
				localStorage.removeItem(storageKey)
				success = true
			} catch (error) {
				storageLogger.error('Failed to remove from localStorage', {
					details: { key, error },
				})
			}
		}

		// Remove from cookie
		if (this.isCookieAvailable()) {
			try {
				const { cookie: cookieName } = getStorageKeys(key)
				// biome-ignore lint/suspicious/noDocumentCookie: Removing cookie with expiration
				document.cookie = `${encodeURIComponent(cookieName)}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
				success = true
			} catch (error) {
				storageLogger.error('Failed to remove cookie', {
					details: { key, error },
				})
			}
		}

		return success
	}

	/**
	 * Check if a preference exists
	 */
	has<K extends StorageKey>(key: K): boolean {
		return this.get(key) !== null
	}

	/**
	 * Get all available preferences
	 */
	getAll(): Partial<StorageValues> {
		const preferences: Partial<StorageValues> = {}

		// Check theme
		const theme = this.get('theme')
		if (theme) preferences.theme = theme

		// Check language
		const language = this.get('language')
		if (language) preferences.language = language

		return preferences
	}

	/**
	 * Clear all preferences
	 */
	clearAll(): boolean {
		let success = true

		const keys: StorageKey[] = ['theme', 'language']

		for (const key of keys) {
			if (!this.remove(key)) {
				success = false
			}
		}

		return success
	}

	/**
	 * Get storage availability status
	 */
	getAvailability() {
		return {
			localStorage: this.isLocalStorageAvailable(),
			cookies: this.isCookieAvailable(),
		}
	}
}

// Export singleton instance
export const storageManager = StorageManager.getInstance()

// Convenience functions for common operations
export const storage = {
	/**
	 * Get theme preference
	 */
	getTheme: (): Theme | null => storageManager.get('theme'),

	/**
	 * Set theme preference
	 */
	setTheme: (theme: Theme): boolean => storageManager.set('theme', theme),

	/**
	 * Get language preference
	 */
	getLanguage: (): Locale | null => storageManager.get('language'),

	/**
	 * Set language preference
	 */
	setLanguage: (language: Locale): boolean =>
		storageManager.set('language', language),

	/**
	 * Remove a preference
	 */
	remove: <K extends StorageKey>(key: K): boolean =>
		storageManager.remove(key),

	/**
	 * Check storage availability
	 */
	isAvailable: () => storageManager.getAvailability(),

	/**
	 * Get all preferences
	 */
	getAll: () => storageManager.getAll(),

	/**
	 * Clear all preferences
	 */
	clearAll: () => storageManager.clearAll(),
}

// Make available globally for debugging
if (typeof window !== 'undefined') {
	window.storageManager = storageManager
}
