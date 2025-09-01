/**
 * Utility functions for middleware route detection and filtering
 * Shared logic to avoid duplication across middleware modules
 */

/**
 * Check if the request is for an asset file
 */
export const isAssetRequest = (pathname: string): boolean =>
	pathname.includes('.')

/**
 * Check if the request is for an API route
 */
export const isApiRequest = (pathname: string): boolean =>
	pathname.startsWith('/api/')

/**
 * Check if the request is for a system/internal route
 */
export const isSystemRequest = (pathname: string): boolean =>
	pathname.startsWith('/_')

/**
 * Check if the request should be skipped by most middleware
 * (assets, API routes, system paths)
 */
export const shouldSkipRequest = (pathname: string): boolean =>
	isSystemRequest(pathname) ||
	isApiRequest(pathname) ||
	isAssetRequest(pathname)

/**
 * Check if the request should be logged
 * Excludes specific asset types and system routes
 */
export const shouldLogRequest = (pathname: string): boolean =>
	!pathname.startsWith('/api/') &&
	!pathname.startsWith('/_') &&
	!pathname.includes('.') &&
	!pathname.endsWith('.css') &&
	!pathname.endsWith('.js') &&
	!pathname.endsWith('.ico')

/**
 * Check if the request should be tracked for metrics
 * Similar to logging but might have different criteria in the future
 */
export const shouldTrackMetrics = (pathname: string): boolean =>
	!isApiRequest(pathname) &&
	!isSystemRequest(pathname) &&
	!isAssetRequest(pathname)

/**
 * Check if request comes from internal navigation
 */
export const isInternalNavigation = (request: Request): boolean => {
	const referer = request.headers.get('referer')
	const url = new URL(request.url)
	return referer !== null && referer.includes(url.origin)
}

/**
 * Extract user IP from request headers
 */
export const extractUserIP = (request: Request): string | null =>
	request.headers.get('cf-connecting-ip') ||
	request.headers.get('x-forwarded-for') ||
	null

/**
 * Get preferred locale from cookie
 */
export const getPreferredLocaleFromCookie = (request: Request): string => {
	const cookieHeader = request.headers.get('cookie')
	if (!cookieHeader) return 'en'

	const match = cookieHeader.match(/preferred-locale=([^;]+)/)
	return match?.[1] || 'en'
}
