/**
 * Theme middleware - Handles theme preference detection and injection
 * Reads theme from cookies and injects into context for SSR
 */

import { createLogger } from '@nextnode/logger'
import type { MiddlewareHandler } from 'astro'

import { getThemeFromCookie, resolveTheme, shouldSkipRequest } from './utils'

const themeLogger = createLogger({ prefix: 'theme-middleware' })

/**
 * Theme middleware - Detects and injects theme preference for SSR
 */
export const themeMiddleware: MiddlewareHandler = async (context, next) => {
	const { request, locals } = context
	const pathname = new URL(request.url).pathname

	// Skip middleware for assets, API routes, and system paths
	if (shouldSkipRequest(pathname)) {
		return next()
	}

	try {
		// Get theme preference from cookie
		const themePreference = getThemeFromCookie(request)

		// Resolve to actual theme (light or dark)
		const resolvedTheme = resolveTheme(themePreference, request)

		// Inject into context for SSR usage
		locals.theme = resolvedTheme
	} catch (error) {
		// Fallback to light theme on error
		locals.theme = 'light'

		themeLogger.warn('Failed to resolve theme, using default', {
			details: { pathname, error },
		})
	}

	return next()
}
