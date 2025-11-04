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
