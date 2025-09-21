/**
 * Tests for cookie management utilities
 * Comprehensive testing of client-side and server-side cookie operations
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { CookieKey } from './cookies'
import {
	CookieManager,
	cookies,
	createServerCookieManager,
	ServerCookieManager,
} from './cookies'

// Cookie Store API mock
const createMockCookieStore = () => {
	const store = new Map<string, { name: string; value: string }>()

	return {
		async set(options: { name: string; value: string }) {
			store.set(options.name, options)
		},
		async get(name: string) {
			return store.get(name) || undefined
		},
		async getAll() {
			return Array.from(store.values())
		},
		async delete(nameOrOptions: string | { name: string }) {
			const name =
				typeof nameOrOptions === 'string'
					? nameOrOptions
					: nameOrOptions.name
			store.delete(name)
		},
	}
}

// Type for CookieManager with accessible instance property
interface CookieManagerConstructor {
	new (): CookieManager
	getInstance(): CookieManager
	instance: CookieManager | null
}

// Helper function to remove a cookie from storage
const removeCookieFromStorage = (
	cookieStorage: string,
	name: string,
): string => {
	const cookies = cookieStorage
		.split(';')
		.filter(c => c.trim() && !c.trim().startsWith(`${name.trim()}=`))
	return cookies.join(';')
}

// Helper function to add or update a cookie in storage
const addCookieToStorage = (
	cookieStorage: string,
	nameValue: string,
	name: string,
): string => {
	const existingCookies = cookieStorage
		.split(';')
		.filter(c => c.trim() && !c.trim().startsWith(`${name.trim()}=`))

	if (existingCookies.length > 0) {
		return `${existingCookies.join(';')};${nameValue}`
	}
	return nameValue
}

// Helper function to extract cookie name from value string
const extractCookieName = (value: string): string | null => {
	const nameMatch = value.match(/^([^=]+)=/)
	return nameMatch?.[1] || null
}

// Helper function to extract name=value from cookie string
const extractNameValue = (value: string): string | null => {
	const nameValueMatch = value.match(/^([^;]+)/)
	return nameValueMatch?.[1] || null
}

// Mock document with proper cookie simulation
const createMockDocument = () => {
	let cookieStorage = ''

	return {
		get cookie() {
			return cookieStorage
		},
		set cookie(value: string) {
			if (value.includes('expires=Thu, 01 Jan 1970 00:00:00 GMT')) {
				// Remove cookie
				const name = extractCookieName(value)
				if (name) {
					cookieStorage = removeCookieFromStorage(cookieStorage, name)
				}
			} else {
				// Add/update cookie
				const nameValue = extractNameValue(value)
				if (nameValue) {
					const name = extractCookieName(nameValue)
					if (name) {
						cookieStorage = addCookieToStorage(
							cookieStorage,
							nameValue,
							name,
						)
					}
				}
			}
		},
	}
}

let mockDocument: ReturnType<typeof createMockDocument>

describe('CookieManager', () => {
	let cookieManager: CookieManager

	beforeEach(() => {
		// Reset singleton instance for clean tests
		;(CookieManager as unknown as CookieManagerConstructor).instance = null
		cookieManager = CookieManager.getInstance()

		// Create fresh mock document for each test
		mockDocument = createMockDocument()
		vi.stubGlobal('document', mockDocument)

		// Setup Cookie Store API mock
		const mockCookieStore = createMockCookieStore()
		vi.stubGlobal('window', {
			cookieStore: mockCookieStore,
			location: { protocol: 'https:' },
		})
	})

	describe('isSupported()', () => {
		it('should return false in non-browser environment', async () => {
			vi.stubGlobal('document', undefined)
			expect(cookieManager.isSupported()).toBe(false)
		})

		it('should return true when cookies are supported', async () => {
			expect(cookieManager.isSupported()).toBe(true)
		})

		it('should return false when cookie operations throw errors', async () => {
			const mockDoc = {
				get cookie() {
					throw new Error('Cookie access denied')
				},
				set cookie(_value: string) {
					throw new Error('Cookie access denied')
				},
			}
			vi.stubGlobal('document', mockDoc)

			expect(cookieManager.isSupported()).toBe(false)
		})
	})

	describe('set() and get()', () => {
		it('should set and get language preference cookie', async () => {
			const success = await cookieManager.set('preferred-locale', 'fr')
			expect(success).toBe(true)

			const retrieved = await cookieManager.get('preferred-locale')
			expect(retrieved).toBe('fr')
		})

		it('should set and get theme preference cookie', async () => {
			const success = await cookieManager.set('theme-preference', 'dark')
			expect(success).toBe(true)

			const retrieved = await cookieManager.get('theme-preference')
			expect(retrieved).toBe('dark')
		})

		it('should return null for non-existent cookies', async () => {
			const retrieved = await cookieManager.get('preferred-locale')
			expect(retrieved).toBeNull()
		})

		it('should handle URL encoding/decoding', async () => {
			const testValue = 'test with spaces & symbols!'
			await cookieManager.set('session-id', testValue)

			const retrieved = await cookieManager.get('session-id')
			expect(retrieved).toBe(testValue)
		})

		it('should return false when setting fails', async () => {
			vi.stubGlobal('document', undefined)
			const success = await cookieManager.set('preferred-locale', 'en')
			expect(success).toBe(false)
		})
	})

	describe('has()', () => {
		it('should return true for existing cookies', async () => {
			await cookieManager.set('preferred-locale', 'fr')
			expect(await cookieManager.has('preferred-locale')).toBe(true)
		})

		it('should return false for non-existent cookies', async () => {
			expect(await cookieManager.has('preferred-locale')).toBe(false)
		})
	})

	describe('remove()', () => {
		it('should remove an existing cookie', async () => {
			await cookieManager.set('preferred-locale', 'fr')

			const success = await cookieManager.remove('preferred-locale')
			expect(success).toBe(true)

			// Verify it's actually removed
			expect(await cookieManager.has('preferred-locale')).toBe(false)
		})

		it('should return false when removal fails', async () => {
			vi.stubGlobal('document', undefined)
			const success = await cookieManager.remove('preferred-locale')
			expect(success).toBe(false)
		})
	})

	describe('getAll()', () => {
		it('should return all cookies as object', async () => {
			await cookieManager.set('preferred-locale', 'fr')
			await cookieManager.set('theme-preference', 'dark')
			await cookieManager.set('session-id', 'abc123')

			const allCookies = await cookieManager.getAll()
			expect(allCookies).toEqual({
				'preferred-locale': 'fr',
				'theme-preference': 'dark',
				'session-id': 'abc123',
			})
		})

		it('should return empty object when no cookies exist', async () => {
			const allCookies = await cookieManager.getAll()
			expect(allCookies).toEqual({})
		})
	})

	describe('clearAll()', () => {
		it('should clear all accessible cookies', async () => {
			await cookieManager.set('session-id', 'value1')
			await cookieManager.set('theme-preference', 'light')

			const success = await cookieManager.clearAll()
			expect(success).toBe(true)

			// Verify cookies are cleared
			expect(await cookieManager.getAll()).toEqual({})
		})

		it('should return false when clearing fails', async () => {
			vi.stubGlobal('document', undefined)
			const success = await cookieManager.clearAll()
			expect(success).toBe(false)
		})
	})
})

describe('cookies convenience functions', () => {
	beforeEach(() => {
		// Reset singleton instance for clean tests
		;(CookieManager as unknown as CookieManagerConstructor).instance = null
		mockDocument = createMockDocument()
		vi.stubGlobal('document', mockDocument)
	})

	it('should provide set convenience function', async () => {
		const success = await cookies.set('preferred-locale', 'fr')
		expect(success).toBe(true)
	})

	it('should provide get convenience function', async () => {
		await cookies.set('preferred-locale', 'en')
		const value = await cookies.get('preferred-locale')
		expect(value).toBe('en')
	})

	it('should provide has convenience function', async () => {
		await cookies.set('preferred-locale', 'en')
		expect(await cookies.has('preferred-locale')).toBe(true)
		expect(await cookies.has('theme-preference')).toBe(false)
	})

	it('should provide remove convenience function', async () => {
		await cookies.set('preferred-locale', 'en')
		const success = await cookies.remove('preferred-locale')
		expect(success).toBe(true)
		expect(await cookies.has('preferred-locale')).toBe(false)
	})

	it('should provide isSupported convenience function', async () => {
		expect(cookies.isSupported()).toBe(true)
	})
})

describe('ServerCookieManager', () => {
	let serverCookieManager: ServerCookieManager
	let mockRequest: Request

	beforeEach(() => {
		mockRequest = new Request('https://example.com', {
			headers: {
				cookie: 'preferred-locale=fr; theme-preference=dark; session-id=abc123',
			},
		})
		serverCookieManager = new ServerCookieManager(mockRequest)
	})

	describe('get()', () => {
		it('should get cookie value from request headers', async () => {
			const locale = serverCookieManager.get('preferred-locale')
			expect(locale).toBe('fr')

			const theme = serverCookieManager.get('theme-preference')
			expect(theme).toBe('dark')
		})

		it('should return null for non-existent cookies', async () => {
			const analytics = serverCookieManager.get('analytics-consent')
			expect(analytics).toBeNull()
		})

		it('should handle requests without cookie header', async () => {
			const requestWithoutCookies = new Request('https://example.com')
			const manager = new ServerCookieManager(requestWithoutCookies)

			const locale = manager.get('preferred-locale')
			expect(locale).toBeNull()
		})

		it('should handle URL encoding/decoding', async () => {
			const encodedRequest = new Request('https://example.com', {
				headers: {
					cookie: `session-id=${encodeURIComponent('test with spaces & symbols!')}`,
				},
			})
			const manager = new ServerCookieManager(encodedRequest)

			const sessionId = manager.get('session-id')
			expect(sessionId).toBe('test with spaces & symbols!')
		})
	})

	describe('has()', () => {
		it('should return true for existing cookies', async () => {
			expect(serverCookieManager.has('preferred-locale')).toBe(true)
			expect(serverCookieManager.has('theme-preference')).toBe(true)
		})

		it('should return false for non-existent cookies', async () => {
			expect(serverCookieManager.has('analytics-consent')).toBe(false)
		})
	})

	describe('getAll()', () => {
		it('should return all cookies as object', async () => {
			const allCookies = serverCookieManager.getAll()
			expect(allCookies).toEqual({
				'preferred-locale': 'fr',
				'theme-preference': 'dark',
				'session-id': 'abc123',
			})
		})

		it('should handle malformed cookies gracefully', async () => {
			const malformedRequest = new Request('https://example.com', {
				headers: {
					cookie: 'validCookie=value; malformed; anotherValid=test',
				},
			})
			const manager = new ServerCookieManager(malformedRequest)

			const allCookies = manager.getAll()
			expect(allCookies).toEqual({
				validCookie: 'value',
				anotherValid: 'test',
			})
		})
	})
})

describe('createServerCookieManager', () => {
	it('should create a ServerCookieManager instance', async () => {
		const request = new Request('https://example.com', {
			headers: { cookie: 'test=value' },
		})

		const manager = createServerCookieManager(request)
		expect(manager).toBeInstanceOf(ServerCookieManager)
		expect(manager.get('test' as CookieKey)).toBe('value')
	})
})

describe('Cookie security configurations', () => {
	let cookieManager: CookieManager

	beforeEach(() => {
		;(CookieManager as unknown as CookieManagerConstructor).instance = null
		cookieManager = CookieManager.getInstance()
		mockDocument = createMockDocument()
		vi.stubGlobal('document', mockDocument)
	})

	it('should apply secure configuration for language cookies', async () => {
		// Mock HTTPS environment before creating the CookieManager
		vi.stubGlobal('window', {
			location: { protocol: 'https:' },
		})

		// Create new cookieManager instance to pick up the window mock
		;(CookieManager as unknown as CookieManagerConstructor).instance = null
		const httpsManager = CookieManager.getInstance()

		// Mock the document cookie setter to capture the full cookie string
		let lastCookieSet = ''
		const mockDoc = {
			get cookie() {
				return mockDocument.cookie
			},
			set cookie(value: string) {
				lastCookieSet = value
				mockDocument.cookie = value
			},
		}
		vi.stubGlobal('document', mockDoc)

		await httpsManager.set('preferred-locale', 'fr')

		// The cookie string should include secure settings
		expect(lastCookieSet).toContain('secure')
		expect(lastCookieSet).toContain('samesite=lax')
		expect(lastCookieSet).toContain('max-age=31536000') // 1 year
	})

	it('should apply appropriate configuration for session cookies', async () => {
		let lastCookieSet = ''
		const mockDoc = {
			get cookie() {
				return mockDocument.cookie
			},
			set cookie(value: string) {
				lastCookieSet = value
				mockDocument.cookie = value
			},
		}
		vi.stubGlobal('document', mockDoc)

		await cookieManager.set('session-id', 'abc123')

		// Should have shorter max-age for session cookies
		expect(lastCookieSet).toContain('max-age=86400') // 24 hours
	})

	it('should apply strict samesite for consent cookies', async () => {
		let lastCookieSet = ''
		const mockDoc = {
			get cookie() {
				return mockDocument.cookie
			},
			set cookie(value: string) {
				lastCookieSet = value
				mockDocument.cookie = value
			},
		}
		vi.stubGlobal('document', mockDoc)

		await cookieManager.set('analytics-consent', 'accepted')

		// Consent cookies should be strict
		expect(lastCookieSet).toContain('samesite=strict')
	})
})

describe('Integration with i18n system', () => {
	beforeEach(() => {
		;(CookieManager as unknown as CookieManagerConstructor).instance = null
		mockDocument = createMockDocument()
		vi.stubGlobal('document', mockDocument)
	})

	it('should store and retrieve locale preferences', async () => {
		// Test the integration pattern used by LanguageManager
		const success = await cookies.set('preferred-locale', 'fr')
		expect(success).toBe(true)

		const storedLocale = await cookies.get('preferred-locale')
		expect(storedLocale).toBe('fr')
	})

	it('should handle server-side locale detection', async () => {
		const request = new Request('https://example.com', {
			headers: {
				cookie: 'preferred-locale=fr',
			},
		})

		const serverManager = createServerCookieManager(request)
		const locale = serverManager.get('preferred-locale')
		expect(locale).toBe('fr')
	})
})
