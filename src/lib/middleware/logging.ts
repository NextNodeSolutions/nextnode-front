/**
 * Request/Response Logging Middleware
 * Handles structured logging of HTTP requests and responses
 */

import { defineMiddleware } from 'astro:middleware'

import { middlewareLogger } from '../logging'
import { extractUserIP } from './utils'

/**
 * Middleware for logging requests and responses
 */
export const loggingMiddleware = defineMiddleware(async (context, next) => {
	const { request } = context
	const startTime = Date.now()
	const url = new URL(request.url)
	const path = url.pathname

	// Process the request
	const response = await next()

	// Calculate request duration
	const duration = Date.now() - startTime

	// Log only errors (HTTP status >= 400)
	if (response.status >= 400) {
		middlewareLogger.error('Request failed', {
			scope: 'http-error',
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
