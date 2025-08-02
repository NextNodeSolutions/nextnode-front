import { defineMiddleware, sequence } from 'astro:middleware'

import { ApplicationMetrics } from './lib/metrics'
import { initI18n } from './lib/i18n-server'

// Middleware pour injecter les cookies dans Accept-Language
const cookieMiddleware = defineMiddleware(async (context, next) => {
	const request = context.request
	const cookieHeader = request.headers.get('cookie')

	if (cookieHeader) {
		const cookies = Object.fromEntries(
			cookieHeader.split('; ').map(cookie => {
				const [key, value] = cookie.split('=')
				return [key, decodeURIComponent(value || '')]
			}),
		)

		// Si cookie language existe et est valide
		if (cookies.language && ['en', 'fr'].includes(cookies.language)) {
			// Modifier Accept-Language pour que Astro i18n le détecte
			const newHeaders = new Headers(request.headers)
			newHeaders.set('accept-language', `${cookies.language},en;q=0.5`)

			// Créer nouvelle requête avec headers modifiés
			const newRequest = new Request(request.url, {
				method: request.method,
				headers: newHeaders,
				body: request.body,
			})

			// Remplacer la requête dans le context
			context.request = newRequest
		}
	}

	return next()
})

// Middleware pour les métriques et analytics
const metricsMiddleware = defineMiddleware(async (context, next) => {
	const { request } = context

	// Get language from Astro's i18n routing (already set by i18nMiddleware)
	const currentLang = context.currentLocale || 'en'
	await initI18n(request, currentLang)

	// Store language in context for components to access
	context.locals.lang = currentLang
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
})

// Combiner les middlewares : cookies puis metrics (Astro i18n s'active automatiquement)
export const onRequest = sequence(
	cookieMiddleware, // 1. Injection cookies → Accept-Language
	metricsMiddleware, // 2. Métriques (Astro i18n automatique entre)
)
