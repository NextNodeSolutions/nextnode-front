import { defineMiddleware, sequence } from 'astro:middleware'
import { initConfig } from '@nextnode/config-manager'

import { ApplicationMetrics } from './lib/core/metrics'
import { initializeI18n } from './lib/i18n/astro'
import { middlewareLogger, configLogger } from './lib/logging'

// Global flag to ensure config is initialized only once
let isConfigInitialized = false

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
	const preferredLocaleCookie = context.cookies.get('preferred-locale')
	const preferredLang = preferredLocaleCookie?.value || 'en'

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

// Middleware for metrics and analytics
const metricsMiddleware = defineMiddleware(async (context, next) => {
	const { request } = context
	const startTime = Date.now()
	const url = new URL(request.url)
	const path = url.pathname

	// Initialize configuration once at application startup
	if (!isConfigInitialized) {
		try {
			await initConfig()
			isConfigInitialized = true
			configLogger.info('✅ Configuration initialized successfully', {
				scope: 'config-init',
				details: {
					environment: process.env.NODE_ENV || 'development',
				},
			})
		} catch (error) {
			configLogger.error('❌ Failed to initialize configuration', {
				scope: 'config-init-error',
				details: {
					error:
						error instanceof Error
							? error.message
							: 'Unknown error',
					path,
				},
			})
			// Continue without crashing - the app can work with default configs
		}
	}

	// Initialize new i18n system
	try {
		const { locale, t } = initializeI18n(request)

		// Store i18n context in locals for components to access
		context.locals.locale = locale
		context.locals.t = t

		// Log successful i18n initialization on first request
		if (path === '/en/' || path === '/fr/' || path === '/') {
			configLogger.info('I18n system initialized', {
				scope: 'i18n-init',
				details: {
					locale,
					path,
				},
			})
		}
	} catch (error) {
		configLogger.error('I18n initialization failed', {
			scope: 'i18n-init-error',
			details: {
				error,
				path,
			},
		})
		// Fallback to default locale
		context.locals.locale = 'en'
		context.locals.t = (key: string): string => key
	}

	// Log incoming requests for debugging (only non-asset requests)
	if (
		!path.startsWith('/api/') &&
		!path.startsWith('/_') &&
		!path.includes('.') &&
		!path.endsWith('.css') &&
		!path.endsWith('.js') &&
		!path.endsWith('.ico')
	) {
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

	// Record metrics after response
	const duration = Date.now() - startTime

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
	if (
		response.status >= 400 ||
		(!path.startsWith('/api/') &&
			!path.startsWith('/_') &&
			!path.includes('.') &&
			!path.endsWith('.css') &&
			!path.endsWith('.js') &&
			!path.endsWith('.ico'))
	) {
		middlewareLogger.info('Request completed', {
			scope: 'http-response',
			status: response.status,
			details: {
				method: request.method,
				path: path,
				duration: duration,
				userAgent: request.headers.get('user-agent'),
				referer: request.headers.get('referer'),
				ip:
					request.headers.get('cf-connecting-ip') ||
					request.headers.get('x-forwarded-for'),
			},
		})
	}

	return response
})

export const onRequest = sequence(
	urlMappingMiddleware, // 1. Map URLs → internal [locale]/ structure
	metricsMiddleware,
)
