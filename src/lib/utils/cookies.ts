/**
 * Type-safe cookie management utilities
 * Provides secure cookie operations with TypeScript support
 */

import { createLogger } from '@nextnode/logger'

import type { Locale } from '@/types/i18n'

const cookieLogger = createLogger({ prefix: 'cookie' })

// Document interface for cookie operations
interface DocumentCookieInterface {
	cookie: string
}

// Safe cookie access for legacy browsers
const getLegacyCookies = (): string => {
	if (typeof document === 'undefined') return ''
	return (document as DocumentCookieInterface).cookie
}

const setLegacyCookie = (value: string): void => {
	if (typeof document === 'undefined') return
	;(document as DocumentCookieInterface).cookie = value
}

// Cookie Store API types
interface CookieStoreSetOptions {
	name: string
	value: string
	path?: string
	domain?: string
	expires?: Date | number
	secure?: boolean
	sameSite?: 'strict' | 'lax' | 'none'
}

interface CookieStoreDeleteOptions {
	name: string
	path?: string
	domain?: string
}

// Cookie Store API interface for windows that support it
interface CookieStoreAPI {
	set(options: CookieStoreSetOptions): Promise<void>
	get(name: string): Promise<{ name: string; value: string } | undefined>
	getAll(): Promise<Array<{ name: string; value: string }>>
	delete(options: string | CookieStoreDeleteOptions): Promise<void>
}

// Type guard to check if cookieStore is available
const hasCookieStore = (
	window: Window,
): window is Window & { cookieStore: CookieStoreAPI } => {
	return 'cookieStore' in window
}

// Cookie configuration interface
export interface CookieOptions {
	path?: string
	domain?: string
	expires?: Date
	maxAge?: number // in seconds
	secure?: boolean
	httpOnly?: boolean
	sameSite?: 'strict' | 'lax' | 'none'
}

// Dynamic cookie configurations for different use cases
export const getCookieConfigs = () =>
	({
		// Language preference - long lasting, secure
		language: {
			path: '/',
			maxAge: 365 * 24 * 60 * 60, // 1 year
			secure:
				typeof window !== 'undefined'
					? window.location.protocol === 'https:'
					: true,
			sameSite: 'lax' as const,
		},
		// Session preferences - shorter duration
		session: {
			path: '/',
			maxAge: 24 * 60 * 60, // 24 hours
			secure:
				typeof window !== 'undefined'
					? window.location.protocol === 'https:'
					: true,
			sameSite: 'lax' as const,
		},
		// Analytics consent - long lasting
		consent: {
			path: '/',
			maxAge: 365 * 24 * 60 * 60, // 1 year
			secure:
				typeof window !== 'undefined'
					? window.location.protocol === 'https:'
					: true,
			sameSite: 'strict' as const,
		},
	}) as const

// Type-safe cookie keys
export type CookieKey =
	| 'preferred-locale'
	| 'theme-preference'
	| 'analytics-consent'
	| 'session-id'

// Cookie value types for type safety
export interface CookieValues {
	'preferred-locale': Locale
	'theme-preference': 'light' | 'dark' | 'system'
	'analytics-consent': 'accepted' | 'rejected' | 'pending'
	'session-id': string
}

/**
 * Cookie Management Class
 * Provides type-safe cookie operations with security best practices
 */
export class CookieManager {
	private static instance: CookieManager | null = null

	static getInstance(): CookieManager {
		if (!CookieManager.instance) {
			CookieManager.instance = new CookieManager()
		}
		return CookieManager.instance
	}

	/**
	 * Check if cookies are supported in the current environment
	 */
	isSupported(): boolean {
		if (typeof document === 'undefined') return false

		try {
			// Test cookie write/read
			const testKey = '__cookie_test__'
			setLegacyCookie(`${testKey}=test; path=/`)
			const hasSupport = getLegacyCookies().includes(testKey)

			// Clean up test cookie
			if (hasSupport) {
				setLegacyCookie(
					`${testKey}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
				)
			}

			return hasSupport
		} catch {
			return false
		}
	}

	/**
	 * Set a cookie with type safety and proper configuration
	 */
	async set<K extends CookieKey>(
		key: K,
		value: CookieValues[K],
		options: CookieOptions = {},
	): Promise<boolean> {
		if (!this.isSupported()) {
			cookieLogger.warn('Cookies are not supported in this environment')
			return false
		}

		try {
			// Get default config based on cookie type
			const defaultConfig = this.getDefaultConfig(key)
			const finalOptions = { ...defaultConfig, ...options }

			// Use Cookie Store API if available
			if (hasCookieStore(window)) {
				return await this.setCookieWithAPI(key, value, finalOptions)
			}

			// Fallback to document.cookie for older browsers
			return this.setCookieWithDocument(key, value, finalOptions)
		} catch (error) {
			cookieLogger.error('Failed to set cookie', {
				details: { key, value, error },
			})
			return false
		}
	}

	/**
	 * Get a cookie value with type safety
	 */
	async get<K extends CookieKey>(key: K): Promise<CookieValues[K] | null> {
		if (!this.isSupported()) {
			return null
		}

		try {
			// Use Cookie Store API if available
			if (hasCookieStore(window)) {
				const cookie = await window.cookieStore.get(key)
				return cookie ? (cookie.value as CookieValues[K]) : null
			}

			// Fallback to document.cookie for older browsers
			const name = `${encodeURIComponent(key)}=`
			const cookies = getLegacyCookies().split(';')

			for (const cookie of cookies) {
				const trimmedCookie = cookie.trim()
				if (trimmedCookie.startsWith(name)) {
					const value = trimmedCookie.substring(name.length)
					return decodeURIComponent(value) as CookieValues[K]
				}
			}

			return null
		} catch (error) {
			cookieLogger.error('Failed to get cookie', {
				details: { key, error },
			})
			return null
		}
	}

	/**
	 * Check if a cookie exists
	 */
	async has(key: CookieKey): Promise<boolean> {
		const value = await this.get(key)
		return value !== null
	}

	/**
	 * Remove a cookie
	 */
	async remove(
		key: CookieKey,
		options: Pick<CookieOptions, 'path' | 'domain'> = {},
	): Promise<boolean> {
		if (!this.isSupported()) {
			return false
		}

		try {
			// Use Cookie Store API if available
			if (hasCookieStore(window)) {
				const deleteOptions: CookieStoreDeleteOptions = { name: key }
				if (options.path) deleteOptions.path = options.path
				if (options.domain) deleteOptions.domain = options.domain

				await window.cookieStore.delete(deleteOptions)
				return true
			}

			// Fallback to document.cookie for older browsers
			const defaultConfig = this.getDefaultConfig(key)
			const finalOptions = {
				...defaultConfig,
				...options,
				expires: new Date(0), // Set to past date
				maxAge: 0,
			}

			let cookieString = `${encodeURIComponent(key)}=`

			if (finalOptions.path) {
				cookieString += `; path=${finalOptions.path}`
			}
			if (finalOptions.domain) {
				cookieString += `; domain=${finalOptions.domain}`
			}
			cookieString += '; expires=Thu, 01 Jan 1970 00:00:00 GMT'

			// biome-ignore lint/suspicious/noDocumentCookie: Fallback for older browsers
			document.cookie = cookieString
			return true
		} catch (error) {
			cookieLogger.error('Failed to remove cookie', {
				details: { key, error },
			})
			return false
		}
	}

	/**
	 * Get all cookies as an object
	 */
	async getAll(): Promise<Record<string, string>> {
		if (!this.isSupported()) {
			return {}
		}

		try {
			// Use Cookie Store API if available
			if (hasCookieStore(window)) {
				const cookieList = await window.cookieStore.getAll()
				const cookies: Record<string, string> = {}
				for (const cookie of cookieList) {
					if (cookie.name && cookie.value) {
						cookies[cookie.name] = cookie.value
					}
				}
				return cookies
			}

			// Fallback to document.cookie for older browsers
			const cookies: Record<string, string> = {}

			const legacyCookies = getLegacyCookies()
			if (legacyCookies) {
				legacyCookies.split(';').forEach(cookie => {
					const [name, value] = cookie.trim().split('=')
					if (name && value) {
						cookies[decodeURIComponent(name)] =
							decodeURIComponent(value)
					}
				})
			}

			return cookies
		} catch (error) {
			cookieLogger.error('Failed to get all cookies', {
				details: { error },
			})
			return {}
		}
	}

	/**
	 * Clear all cookies (that we can access)
	 */
	async clearAll(): Promise<boolean> {
		if (!this.isSupported()) {
			return false
		}

		try {
			const cookies = await this.getAll()
			let success = true

			// Use Cookie Store API if available
			if (hasCookieStore(window)) {
				for (const name of Object.keys(cookies)) {
					try {
						await window.cookieStore.delete(name)
					} catch {
						success = false
					}
				}
			} else {
				// Fallback to document.cookie for older browsers
				for (const name of Object.keys(cookies)) {
					try {
						setLegacyCookie(
							`${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
						)
					} catch {
						success = false
					}
				}
			}

			return success
		} catch (error) {
			cookieLogger.error('Failed to clear all cookies', {
				details: { error },
			})
			return false
		}
	}

	/**
	 * Set cookie using Cookie Store API
	 */
	private async setCookieWithAPI<K extends CookieKey>(
		key: K,
		value: CookieValues[K],
		options: CookieOptions,
	): Promise<boolean> {
		// Use the native CookieInit interface from the Cookie Store API
		const cookieOptions: {
			name: string
			value: string
			[key: string]: unknown
		} = {
			name: key,
			value: String(value),
		}

		if (options.path) cookieOptions.path = options.path
		if (options.domain) cookieOptions.domain = options.domain
		if (options.expires) cookieOptions.expires = options.expires.getTime()
		if (options.secure !== undefined) cookieOptions.secure = options.secure
		if (options.sameSite) cookieOptions.sameSite = options.sameSite

		await window.cookieStore.set(cookieOptions)
		return true
	}

	/**
	 * Set cookie using document.cookie fallback
	 */
	private setCookieWithDocument<K extends CookieKey>(
		key: K,
		value: CookieValues[K],
		options: CookieOptions,
	): boolean {
		let cookieString = `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`

		// Add options
		if (options.path) {
			cookieString += `; path=${options.path}`
		}
		if (options.domain) {
			cookieString += `; domain=${options.domain}`
		}
		if (options.expires) {
			cookieString += `; expires=${options.expires.toUTCString()}`
		}
		if (options.maxAge) {
			cookieString += `; max-age=${options.maxAge}`
		}
		if (options.secure) {
			cookieString += '; secure'
		}
		if (options.httpOnly) {
			cookieString += '; httponly'
		}
		if (options.sameSite) {
			cookieString += `; samesite=${options.sameSite}`
		}

		setLegacyCookie(cookieString)
		return true
	}

	/**
	 * Get default configuration for a specific cookie type
	 */
	private getDefaultConfig(key: CookieKey): CookieOptions {
		const configs = getCookieConfigs()
		if (key === 'preferred-locale') {
			return configs.language
		}
		if (key === 'analytics-consent') {
			return configs.consent
		}
		if (key === 'session-id') {
			return configs.session
		}
		// Default for other cookie types
		return configs.session
	}
}

// Export singleton instance
export const cookieManager = CookieManager.getInstance()

// Convenience functions for common operations
export const cookies = {
	/**
	 * Set a cookie with type safety
	 */
	set: <K extends CookieKey>(
		key: K,
		value: CookieValues[K],
		options?: CookieOptions,
	) => cookieManager.set(key, value, options),

	/**
	 * Get a cookie with type safety
	 */
	get: <K extends CookieKey>(key: K) => cookieManager.get(key),

	/**
	 * Check if a cookie exists
	 */
	has: (key: CookieKey) => cookieManager.has(key),

	/**
	 * Remove a cookie
	 */
	remove: (
		key: CookieKey,
		options?: Pick<CookieOptions, 'path' | 'domain'>,
	) => cookieManager.remove(key, options),

	/**
	 * Check if cookies are supported
	 */
	isSupported: () => cookieManager.isSupported(),
}

// Server-side cookie utilities for Astro
export class ServerCookieManager {
	private request: Request

	constructor(request: Request) {
		this.request = request
	}

	/**
	 * Parse cookies from request headers
	 */
	private parseCookies(): Record<string, string> {
		const cookieHeader = this.request.headers.get('cookie')
		if (!cookieHeader) return {}

		const cookies: Record<string, string> = {}

		cookieHeader.split(';').forEach(cookie => {
			const [name, value] = cookie.trim().split('=')
			if (name && value) {
				cookies[decodeURIComponent(name)] = decodeURIComponent(value)
			}
		})

		return cookies
	}

	/**
	 * Get a specific cookie value
	 */
	get<K extends CookieKey>(key: K): CookieValues[K] | null {
		const cookies = this.parseCookies()
		const value = cookies[key]
		return value ? (value as CookieValues[K]) : null
	}

	/**
	 * Check if a cookie exists
	 */
	has(key: CookieKey): boolean {
		const cookies = this.parseCookies()
		return key in cookies
	}

	/**
	 * Get all cookies
	 */
	getAll(): Record<string, string> {
		return this.parseCookies()
	}
}

/**
 * Create a server-side cookie manager for Astro middleware/pages
 */
export const createServerCookieManager = (request: Request) =>
	new ServerCookieManager(request)

// Types are already exported above
