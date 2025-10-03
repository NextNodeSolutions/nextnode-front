// =============================================================================
// GLOBAL CONSTANTS - Only truly global application constants
// =============================================================================

// HTTP Status Codes
export const HTTP_STATUS = {
	OK: 200,
	BAD_REQUEST: 400,
	METHOD_NOT_ALLOWED: 405,
	INTERNAL_SERVER_ERROR: 500,
	SERVICE_UNAVAILABLE: 503,
} as const

// HTTP Headers
export const HTTP_HEADERS = {
	CONTENT_TYPE_JSON: { 'Content-Type': 'application/json' },
	ALLOW_POST: { Allow: 'POST' },
} as const

// Cookie Names
export const COOKIE_NAMES = {
	LANG: 'preferredLocale',
	THEME: 'themePreference',
} as const

// Add any truly global constants here that don't belong to specific domains
// Domain-specific constants have been moved to their respective folders:
// - I18n constants: src/i18n/config.ts
// - UI constants: src/lib/ui/ui-constants.ts
// - Workflow constants: src/components/features/workflow/workflow-constants.ts
