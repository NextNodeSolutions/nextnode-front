/**
 * Configuration centralisée des prix
 * Modifiez les valeurs dans ce fichier pour mettre à jour tous les prix du site
 */
export const PRICING_CONFIG = {
	// Prix de base mensuel pour l'hébergement et maintenance
	monthly: {
		base: 25,
	},

	// Prix des plans de développement
	plans: {
		starter: {
			min: 500,
			max: 800,
		},
		business: {
			min: 1500,
			max: 3500,
		},
	},

	// Prix des niveaux de support
	support: {
		priority: 75,
		urgent: 200,
	},

	// Prix pour le modal professionnel (tranches de budget)
	professional: {
		ranges: [
			{ min: 1500, max: 3500 },
			{ min: 3500, max: 7500 },
			{ min: 7500, max: 15000 },
			{ min: 15000, max: null }, // 15000+
		],
		enterprise: {
			ranges: [
				{ min: 15000, max: 30000 },
				{ min: 30000, max: 50000 },
				{ min: 50000, max: 100000 },
				{ min: 100000, max: null }, // 100000+
			],
		},
	},
} as const

/**
 * Utilitaires pour formater les prix
 */
export const formatPrice = {
	// Formatage simple d'un prix
	simple: (price: number, currency = '€'): string =>
		`${price.toLocaleString('fr-FR')}${currency}`,

	// Formatage d'une fourchette de prix
	range: (min: number, max: number | null, currency = '€'): string =>
		max
			? `${min.toLocaleString('fr-FR')}${currency} - ${max.toLocaleString('fr-FR')}${currency}`
			: `${min.toLocaleString('fr-FR')}${currency}+`,

	// Formatage mensuel
	monthly: (price: number, currency = '€'): string =>
		`${price.toLocaleString('fr-FR')}${currency}/mois`,

	// Formatage avec préfixe pour les suppléments
	supplement: (price: number, currency = '€'): string =>
		`+${price.toLocaleString('fr-FR')}${currency}/mois`,
}

/**
 * Type helpers pour la sécurité des types
 */
export type PricingConfig = typeof PRICING_CONFIG
export type PlanType = keyof typeof PRICING_CONFIG.plans
export type SupportType = keyof typeof PRICING_CONFIG.support
