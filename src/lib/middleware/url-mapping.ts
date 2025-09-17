/**
 * URL Mapping and Locale Handling Middleware
 * Handles intelligent URL mapping with locale detection and redirection
 */

import { defineMiddleware } from 'astro:middleware'

import {
	getPreferredLocaleFromCookie,
	isInternalNavigation,
	shouldSkipRequest,
} from './utils'

/**
 * Middleware for intelligent URL mapping with locale handling
 */
export const urlMappingMiddleware = defineMiddleware(async (context, next) => {
	const url = new URL(context.request.url)
	const pathname = url.pathname

	// Skip for assets, API routes, and other system paths
	if (shouldSkipRequest(pathname)) {
		return next()
	}

	// Check if request comes from internal navigation or manual URL entry
	const isInternal = isInternalNavigation(context.request)

	// Get user's language preference from cookie
	const preferredLang = getPreferredLocaleFromCookie(context.request)

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
		if (isInternal && preferredLang === 'fr') {
			// Internal navigation + French preference = redirect to French
			return context.redirect(`/fr${pathname}`)
		}
		// Manual navigation or English preference = rewrite to English
		return context.rewrite(`/en${pathname}`)
	}

	return next()
})
