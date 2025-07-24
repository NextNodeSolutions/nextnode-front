import { defineMiddleware } from 'astro:middleware'

import { ApplicationMetrics } from './lib/metrics'

import type { MiddlewareHandler } from 'astro'

export const onRequest: MiddlewareHandler = defineMiddleware(
	async (context, next) => {
		const { request } = context
		const startTime = Date.now()
		const url = new URL(request.url)

		// Log incoming requests for debugging
		console.log(`${request.method} ${url.pathname}`)

		// Process the request
		const response = await next()

		// Record metrics after response
		const duration = Date.now() - startTime
		const path = url.pathname

		// Record page view (exclude API and asset requests)
		if (
			!path.startsWith('/api/') &&
			!path.startsWith('/_') &&
			!path.includes('.')
		) {
			ApplicationMetrics.recordPageView(path)
		}

		// Record response time
		ApplicationMetrics.recordResponseTime(duration)

		// Record errors
		if (response.status >= 400) {
			ApplicationMetrics.recordError(`http_${response.status}`, path)
		}

		// Log structured request data
		if (typeof process !== 'undefined') {
			console.log(
				JSON.stringify({
					timestamp: new Date().toISOString(),
					method: request.method,
					path: path,
					status: response.status,
					duration: duration,
					userAgent: request.headers.get('user-agent'),
					referer: request.headers.get('referer'),
					ip:
						request.headers.get('cf-connecting-ip') ||
						request.headers.get('x-forwarded-for'),
				}),
			)
		}

		return response
	},
)
