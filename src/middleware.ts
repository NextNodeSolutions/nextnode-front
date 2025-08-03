import { defineMiddleware, sequence } from 'astro:middleware'

import { ApplicationMetrics } from './lib/metrics'
import { initI18n } from './lib/i18n-server'

// Middleware for intelligent URL mapping with locale handling
const urlMappingMiddleware = defineMiddleware(async (context, next) => {
	const url = new URL(context.request.url)
	const pathname = url.pathname

	// Skip for assets, API routes, and other system paths
	if (
		pathname.startsWith('/_') ||
		pathname.startsWith('/api/') ||
		pathname.includes('.')
	) {
		return next()
	}

	// Check if request comes from internal navigation or manual URL entry
	const referer = context.request.headers.get('referer')
	const isInternalNavigation = referer && referer.includes(url.origin)

	// Get user's language preference from cookie
	const languageCookie = context.cookies.get('language')
	const preferredLang = languageCookie?.value || 'en'

	// Handle French URLs - always pass through
	if (pathname.startsWith('/fr/')) {
		return next()
	}

	// Handle root URL - always redirect to preferred language
	if (pathname === '/') {
		if (preferredLang === 'fr') {
			return context.redirect('/fr/')
		}
		return context.rewrite('/en/')
	}

	// For any other path without locale prefix
	if (!pathname.startsWith('/en/')) {
		if (isInternalNavigation && preferredLang === 'fr') {
			// Internal navigation + French preference = redirect to French
			return context.redirect(`/fr${pathname}`)
		}
		// Manual navigation or English preference = rewrite to English
		return context.rewrite(`/en${pathname}`)
	}

	return next()
})

// Middleware pour les métriques et analytics
const metricsMiddleware = defineMiddleware(async (context, next) => {
	const { request } = context

	// Get language from URL path (manual routing)
	const url = new URL(request.url)
	const pathname = url.pathname
	let currentLang = 'en' // default

	if (pathname.startsWith('/fr/')) {
		currentLang = 'fr'
	} else if (pathname.startsWith('/en/')) {
		currentLang = 'en'
	}

	// Initialize i18n with detected language
	await initI18n(request, currentLang)

	// Store language in context for components to access
	context.locals.lang = currentLang
	const startTime = Date.now()

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

// Combiner les middlewares : URL mapping puis metrics
// Routing manuel avec mapping intelligent vers structure [locale]/
// Astro gère naturellement les 404 si la route n'existe pas
export const onRequest = sequence(
	urlMappingMiddleware, // 1. Map URLs → structure [locale]/ interne
	metricsMiddleware, // 2. Métriques et analytics
)
