/**
 * Helpers TypeScript pour le tracking Google Analytics
 * Optimisé pour le SEO local Paris et les conversions
 */

// Types pour les événements personnalisés
export interface GAEvent {
	name: string
	category: string
	label?: string
	value?: number
	location_type?: 'paris' | 'ile_de_france' | 'france'
	service_area?: string
}

// Types pour les conversions
export interface ConversionEvent extends GAEvent {
	currency?: 'EUR'
	items?: Array<{
		item_id: string
		item_name: string
		category: string
		price: number
	}>
}

// Extension de Window pour TypeScript
declare global {
	interface Window {
		gtag_nextnode?: {
			trackContactForm: (formType?: string) => void
			trackQuoteRequest: (projectType?: string) => void
			trackProjectStart: (planType?: string) => void
			trackPricingView: (planViewed?: string) => void
			trackWorkflowStep: (stepNumber: number) => void
			trackLocalInteraction: (interactionType: string) => void
			trackLocalSearch: (searchTerm: string) => void
		}
		gtag?: (...args: unknown[]) => void
	}
}

/**
 * Helper pour tracker les formulaires de contact
 * Conversion principale pour le SEO local
 */
export const trackContactForm = (formType: 'general' | 'pricing' | 'project' | 'quote' = 'general') => {
	window.gtag_nextnode?.trackContactForm(formType)
}

/**
 * Helper pour tracker les demandes de devis
 * Conversion haute valeur pour le SEO
 */
export const trackQuoteRequest = (projectType: 'website' | 'ecommerce' | 'app' | 'enterprise' = 'website') => {
	window.gtag_nextnode?.trackQuoteRequest(projectType)
}

/**
 * Helper pour tracker le démarrage de projet
 * Conversion finale - succès SEO
 */
export const trackProjectStart = (planType: 'starter' | 'business' | 'enterprise' = 'business') => {
	window.gtag_nextnode?.trackProjectStart(planType)
}

/**
 * Helper pour tracker les vues de pricing
 * Signal d'intention - important pour le SEO
 */
export const trackPricingView = (planViewed: 'starter' | 'business' | 'enterprise' | 'all' = 'all') => {
	window.gtag_nextnode?.trackPricingView(planViewed)
}

/**
 * Helper pour tracker les étapes du workflow
 * Engagement utilisateur - signal de qualité
 */
export const trackWorkflowStep = (stepNumber: number) => {
	window.gtag_nextnode?.trackWorkflowStep(stepNumber)
}

/**
 * Helper pour tracker les interactions locales Paris
 * Spécifique SEO local - très important
 */
export const trackLocalInteraction = (interactionType: 'address_click' | 'phone_click' | 'map_view' | 'area_select') => {
	window.gtag_nextnode?.trackLocalInteraction(interactionType)
}

/**
 * Helper pour tracker les recherches locales
 * SEO local - comprendre les intentions
 */
export const trackLocalSearch = (searchTerm: string) => {
	window.gtag_nextnode?.trackLocalSearch(searchTerm)
}

/**
 * Helper pour tracker les téléchargements de fichiers
 * Engagement - signaux pour le SEO
 */
export const trackFileDownload = (fileName: string, fileType: 'pdf' | 'doc' | 'image' | 'other' = 'other') => {
	window.gtag?.('event', 'file_download', {
		event_category: 'engagement',
		event_label: fileName,
		file_extension: fileType,
		location_type: 'paris'
	})
}

/**
 * Helper pour tracker les clics externes
 * Comprendre le parcours utilisateur
 */
export const trackExternalClick = (url: string, linkText: string) => {
	window.gtag?.('event', 'click', {
		event_category: 'outbound',
		event_label: url,
		transport_type: 'beacon',
		description: linkText
	})
}

/**
 * Helper pour tracker les erreurs 404
 * SEO technique - identifier les problèmes
 */
export const track404Error = (page: string, referrer?: string) => {
	window.gtag?.('event', 'page_not_found', {
		event_category: 'error',
		event_label: page,
		referrer: referrer || document.referrer,
		value: 0
	})
}

/**
 * Helper pour tracker les temps de chargement
 * Core Web Vitals - crucial pour le SEO
 */
export const trackPagePerformance = (metric: 'LCP' | 'FID' | 'CLS', value: number) => {
	window.gtag?.('event', 'web_vitals', {
		event_category: 'performance',
		event_label: metric,
		value: Math.round(value),
		custom_parameter_1: 'core_web_vitals'
	})
}

/**
 * Helper pour tracker les conversions e-commerce simulées
 * Pour les devis et projets - important pour le ROI SEO
 */
export const trackEcommerceConversion = (transactionId: string, value: number, currency: 'EUR' = 'EUR') => {
	window.gtag?.('event', 'purchase', {
		transaction_id: transactionId,
		value: value,
		currency: currency,
		event_category: 'ecommerce',
		location_type: 'paris',
		service_area: 'ile_de_france'
	})
}

/**
 * Helper pour tracker les sessions avec intention d'achat
 * Signal fort pour le SEO et les algorithmes
 */
export const trackHighIntentSession = (intentLevel: 'low' | 'medium' | 'high', actions: string[]) => {
	window.gtag?.('event', 'high_intent_session', {
		event_category: 'user_behavior',
		event_label: intentLevel,
		custom_parameter_1: actions.join(','),
		value: intentLevel === 'high' ? 3 : intentLevel === 'medium' ? 2 : 1
	})
}

/**
 * Utilitaires pour le debug en développement
 */
export const analyticsUtils = {
	/**
	 * Log des événements en mode développement
	 */
	debugEvent: (eventName: string, parameters: Record<string, unknown>) => {
		if (import.meta.env.DEV) {
			// biome-ignore lint/suspicious/noConsole: Debug mode only
			console.group(`📊 Analytics Event: ${eventName}`)
			// biome-ignore lint/suspicious/noConsole: Debug mode only
			console.table(parameters)
			// biome-ignore lint/suspicious/noConsole: Debug mode only
			console.groupEnd()
		}
	},
	
	/**
	 * Vérification de la configuration GA
	 */
	checkConfiguration: () => {
		if (typeof window !== 'undefined') {
			const hasGtag = !!window.gtag
			const hasCustomTracking = !!window.gtag_nextnode
			
			if (import.meta.env.DEV) {
				// biome-ignore lint/suspicious/noConsole: Debug mode only
				console.log('📊 Analytics Configuration:', {
					gtag: hasGtag ? '✅' : '❌',
					customTracking: hasCustomTracking ? '✅' : '❌',
					environment: import.meta.env.MODE
				})
			}
			
			return hasGtag && hasCustomTracking
		}
		return false
	}
}

// Export des constantes pour les événements
export const ANALYTICS_EVENTS = {
	CONTACT_FORM: 'contact_form_submit',
	QUOTE_REQUEST: 'quote_request',
	PROJECT_START: 'project_start',
	PRICING_VIEW: 'pricing_view',
	WORKFLOW_STEP: 'workflow_step_view',
	LOCAL_INTERACTION: 'paris_location_click',
	LOCAL_SEARCH: 'ile_de_france_search'
} as const

export type AnalyticsEventType = typeof ANALYTICS_EVENTS[keyof typeof ANALYTICS_EVENTS]