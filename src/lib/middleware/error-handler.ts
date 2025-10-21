/**
 * Error Handler Middleware
 * Centralized handling of 404 and 500 errors with i18n support
 *
 * This middleware intercepts responses with 404 or 500 status codes
 * and rewrites them to the appropriate localized error pages.
 */

import { defineMiddleware } from 'astro:middleware'

import { DEFAULT_LOCALE } from '@/i18n/config'

import { middlewareLogger } from '../logging'

/**
 * Path prefixes to skip (bundled assets + organized folders)
 */
const SKIP_PATH_PREFIXES = [
	'/404', // Error pages (avoid infinite loop)
	'/500',
	'/_astro/', // Astro bundled assets (JS, CSS with hashes)
	'/fonts/', // Static fonts from /public/fonts/
] as const

/**
 * File extensions in /public/ root (logos, favicons, manifests)
 */
const SKIP_ROOT_FILES = /\.(png|svg|webp|ico|webmanifest|txt)$/

/**
 * Middleware for handling error responses
 *
 * This must be placed at the END of the middleware sequence
 * to catch all errors from previous middlewares and route handlers
 */
export const errorHandlerMiddleware = defineMiddleware(
	async (context, next) => {
		const pathname = context.url.pathname

		// Early exit for assets (BEFORE await next())
		if (
			SKIP_PATH_PREFIXES.some(prefix => pathname.includes(prefix)) ||
			SKIP_ROOT_FILES.test(pathname)
		) {
			return next()
		}

		// Process the request
		const response = await next()

		// Get current locale from context (injected by i18nMiddleware)
		const locale = context.locals.locale ?? DEFAULT_LOCALE

		// Handle 404 Not Found errors
		if (response.status === 404) {
			middlewareLogger.info('Rewriting to localized 404 page', {
				scope: 'error-handler',
				details: {
					originalPath: pathname,
					locale,
					targetPath: `/${locale}/404`,
				},
			})

			// Rewrite to localized 404 page while preserving 404 status
			return context.rewrite(`/${locale}/404`)
		}

		// Handle 500 Internal Server Error
		if (response.status === 500) {
			middlewareLogger.error('Rewriting to localized 500 page', {
				scope: 'error-handler',
				details: {
					originalPath: pathname,
					locale,
					targetPath: `/${locale}/500`,
				},
			})

			// Rewrite to localized 500 page while preserving 500 status
			return context.rewrite(`/${locale}/500`)
		}

		// For all other responses, pass through unchanged
		return response
	},
)
