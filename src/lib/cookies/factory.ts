/**
 * Factory to create the appropriate cookie strategy
 */

import { createLogger } from '@nextnode/logger'

import { CookieStoreStrategy } from './cookie-store-strategy'
import { DocumentCookieStrategy } from './document-cookie-strategy'
import { CookieError } from './errors'
import type { CookieStrategy } from './types'

const strategyLogger = createLogger({ prefix: 'cookie-strategy' })

/**
 * Create the appropriate cookie strategy based on environment
 * Automatically selects Cookie Store API or document.cookie fallback
 */
export const createCookieStrategy = (): CookieStrategy => {
	if (typeof window === 'undefined') {
		throw new CookieError(
			'Cannot create cookie strategy: window is undefined',
			{
				strategy: 'factory',
			},
		)
	}

	// Cookie Store API requires secure context (HTTPS)
	const isSecureContext = window.isSecureContext
	const apiAvailable = 'cookieStore' in window

	if (apiAvailable && isSecureContext) {
		strategyLogger.info('Using Cookie Store API strategy', {
			details: { isSecureContext, protocol: window.location.protocol },
		})
		return new CookieStoreStrategy()
	}

	// Log why we're using fallback
	if (apiAvailable && !isSecureContext) {
		strategyLogger.info(
			'Cookie Store API available but not in secure context (HTTP), using document.cookie fallback',
			{
				details: { protocol: window.location.protocol },
			},
		)
	} else {
		strategyLogger.info(
			'Cookie Store API not available, using document.cookie fallback',
			{
				details: { apiAvailable, isSecureContext },
			},
		)
	}

	return new DocumentCookieStrategy()
}
