/**
 * Request/Response Logging Middleware
 * Handles structured logging of HTTP requests and responses
 */

import { defineMiddleware } from 'astro:middleware'

import { middlewareLogger } from '../logging'
import { shouldLogRequest, extractUserIP } from './utils'

/**
 * Middleware for logging requests and responses
 */
export const loggingMiddleware = defineMiddleware(async (context, next) => {
	const { request } = context
	const startTime = Date.now()
	const url = new URL(request.url)
	const path = url.pathname

	// Log incoming requests for debugging (only non-asset requests)
	if (shouldLogRequest(path)) {
		middlewareLogger.info('Page request', {
			scope: 'http-request',
			details: {
				method: request.method,
				path,
				locale: context.locals.locale,
			},
		})
	}

	// Process the request
	const response = await next()

	// Calculate request duration
	const duration = Date.now() - startTime

	// Log errors
	if (response.status >= 400) {
		middlewareLogger.error('Request failed', {
			scope: 'http-error',
			status: response.status,
			details: {
				method: request.method,
				path: path,
				duration: duration,
			},
		})
	}

	// Log structured request data (only for pages and errors)
	if (response.status >= 400 || shouldLogRequest(path)) {
		middlewareLogger.info('Request completed', {
			scope: 'http-response',
			status: response.status,
			details: {
				method: request.method,
				path: path,
				duration: duration,
				userAgent: request.headers.get('user-agent'),
				referer: request.headers.get('referer'),
				ip: extractUserIP(request),
			},
		})
	}

	return response
})
