/**
 * Type-safe localStorage utilities
 * Simple wrapper around localStorage API with error handling
 */

import { createLogger } from '@nextnode/logger'

const localStorageLogger = createLogger({ prefix: 'localStorage' })

/**
 * Check if localStorage is available in the current environment
 */
export const isLocalStorageAvailable = (): boolean => {
	if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
		return false
	}

	try {
		const testKey = '__localStorage_test__'
		localStorage.setItem(testKey, 'test')
		localStorage.removeItem(testKey)
		return true
	} catch {
		return false
	}
}

/**
 * Set a value in localStorage
 */
export const setLocalStorage = (key: string, value: string): boolean => {
	if (!isLocalStorageAvailable()) {
		localStorageLogger.warn('localStorage is not available')
		return false
	}

	try {
		localStorage.setItem(key, value)
		return true
	} catch (error) {
		localStorageLogger.error('Failed to set localStorage item', {
			details: { key, error },
		})
		return false
	}
}

/**
 * Get a value from localStorage
 */
export const getLocalStorage = (key: string): string | null => {
	if (!isLocalStorageAvailable()) {
		return null
	}

	try {
		return localStorage.getItem(key)
	} catch (error) {
		localStorageLogger.error('Failed to get localStorage item', {
			details: { key, error },
		})
		return null
	}
}

/**
 * Remove a value from localStorage
 */
export const removeLocalStorage = (key: string): boolean => {
	if (!isLocalStorageAvailable()) {
		return false
	}

	try {
		localStorage.removeItem(key)
		return true
	} catch (error) {
		localStorageLogger.error('Failed to remove localStorage item', {
			details: { key, error },
		})
		return false
	}
}

/**
 * Clear all localStorage items
 */
export const clearLocalStorage = (): boolean => {
	if (!isLocalStorageAvailable()) {
		return false
	}

	try {
		localStorage.clear()
		return true
	} catch (error) {
		localStorageLogger.error('Failed to clear localStorage', {
			details: { error },
		})
		return false
	}
}
