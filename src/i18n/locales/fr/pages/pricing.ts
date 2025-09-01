import {
	PRICING_CONFIG,
	formatPrice,
} from '@/components/features/pricing/pricing-config'

export const pricing = {
	pageTitle: `Développement Web dès ${PRICING_CONFIG.monthly.base}€/mois | Nextnode`,
	sections: {
		plans: {
			title: 'Choisissez Votre Plan',
			subtitle:
				'Des solutions adaptées à chaque étape de votre croissance',
		},
		included: {
			title: 'Tout Ce Qui Est Inclus',
			subtitle: `Dans votre forfait mensuel à ${PRICING_CONFIG.monthly.base}€`,
		},
		idealFor: 'IDÉAL POUR',
		alreadyIncluded: '🎯 Déjà dans votre forfait',
		examplesTitle: '💡 Exemples concrets :',
		discoverPlans: 'Découvrir nos plans',
	},
	hero: {
		title: 'TARIFS',
		titleHighlight: 'TRANSPARENTS',
		titleEnd: 'POUR VOTRE SUCCÈS',
		subtitle:
			'Développement sur-mesure de vrais sites web en code - Liberté maximale, fonctionnalités illimitées',
		description:
			'Contrairement aux solutions no-code limitantes, nous développons de vrais sites web en code qui vous appartiennent entièrement. Liberté totale de fonctionnalités, évolutivité garantie, performances optimales. Tarification transparente sans frais cachés.',
		badge: '💡 Consultation gratuite incluse',
		cta: {
			button: 'Consultation Gratuite pour Cerner Votre Projet',
			subtitle:
				'Échangeons sur vos besoins pour déterminer la solution idéale et vous fournir un devis précis',
		},
	},
	plans: {
		starter: {
			name: 'Starter',
			tagline: 'Site web en code, pas de limitations',
			price: `${formatPrice.range(PRICING_CONFIG.plans.starter.min, PRICING_CONFIG.plans.starter.max, '€')}`,
			recurring: formatPrice.monthly(PRICING_CONFIG.monthly.base, '€'),
			badge: 'Idéal pour débuter',
			description:
				"Votre propre site web développé en code moderne. Contrairement aux plateformes no-code, vous disposez d'une liberté totale pour évoluer et ajouter toutes les fonctionnalités souhaitées.",
			features: [
				"Page d'accueil unique",
				'Design responsive mobile',
				'Intégration formulaire de contact',
				'Optimisation SEO',
				'Certificat SSL',
				'Configuration analytics',
				'Monitoring infrastructure 24/7',
				'Rapports de performance mensuels',
			],
			cta: 'Démarrer Votre Projet',
			examples: [
				'Menu de restaurant avec horaires & contact',
				"Vitrine d'entreprise de services (plombier, avocat...)",
				'Portfolio créatif (photographe, designer...)',
				"Page d'accueil artisan local",
			],
		},
		business: {
			name: 'Business',
			tagline: 'Applications web complètes en code',
			price: `${formatPrice.range(PRICING_CONFIG.plans.business.min, PRICING_CONFIG.plans.business.max, '€')}`,
			recurring: formatPrice.monthly(PRICING_CONFIG.monthly.base, '€'),
			badge: 'Complet et évolutif',
			description:
				"Sites web complets développés en code avec toutes les fonctionnalités avancées possibles. Architecture évolutive permettant d'intégrer n'importe quelle solution ou API.",
			features: [
				'Site multi-pages (5-15 pages)',
				'Design et branding personnalisés',
				'Intégration CMS',
				'Capacités e-commerce',
				'SEO avancé',
				'Intégrations tierces',
				'Optimisation des performances',
				'Support prioritaire',
				"Revues d'optimisation mensuelles",
			],
			cta: 'Obtenir un Devis',
			examples: [
				"Site web d'entreprise multi-pages avec blog",
				'Boutique e-commerce (<100 produits)',
				'Site de réservation (restaurant, coiffeur...)',
				'Site immobilier avec recherche avancée',
				'Plateforme associative avec membres',
			],
		},
		enterprise: {
			name: 'Enterprise',
			tagline: 'Développement sans limites techniques',
			price: 'Devis Personnalisé',
			recurring: `${PRICING_CONFIG.monthly.base}€+/mois`,
			badge: 'Sur-mesure avancé',
			description:
				'Applications web complexes entièrement développées en code. Aucune limite technique, intégrations avancées, performances maximales. Votre vision devient réalité sans compromis.',
			features: [
				'Applications web personnalisées',
				'Intégrations complexes',
				'Support multi-langues',
				'Sécurité avancée',
				'Architecture évolutive',
				'Chef de projet dédié',
				'Garanties SLA',
				"Solutions d'hébergement personnalisées",
				'Support prioritaire 24/7',
			],
			cta: 'Nous Contacter',
			examples: [
				'Applications SaaS personnalisées',
				"Portails d'entreprise avec authentification",
				'Plateformes e-learning avec vidéos',
				'Marketplace multi-vendeurs',
				'Systèmes de gestion sur-mesure',
			],
		},
	},
	pricing: {
		title: 'Ce Qui Est Inclus Dans Chaque Projet',
		subtitle:
			'Une solution complète qui vous donne tous les outils pour réussir',
		development: {
			title: 'Développement Sur-Mesure',
			description:
				'Code propriétaire développé spécifiquement pour vos besoins',
			details: [
				'Architecture moderne et évolutive (React, TypeScript, Node.js)',
				'Code source entièrement à vous - aucune dépendance externe',
				'Design responsive adapté à tous les appareils',
				'Optimisations SEO avancées intégrées',
				'Performances optimales et temps de chargement rapides',
				'Sécurité renforcée avec les meilleures pratiques',
				'Documentation technique complète',
				'Formation pour la gestion de contenu',
			],
		},
		infrastructure: {
			title: 'Infrastructure & Support Pro',
			description:
				"Service d'hébergement et maintenance professionnel pour garantir performance et sécurité 24h/24",
			details: [
				`Hébergement haute performance avec CDN mondial (${PRICING_CONFIG.monthly.base}€/mois)`,
				'Certificats SSL automatiques et renouvellement',
				'Sauvegardes automatisées quotidiennes avec rétention 30 jours',
				'Monitoring proactif et alertes en temps réel',
				'Mises à jour de sécurité automatiques',
				'Support technique standard (réponse sous 48h ouvrables)',
				`Support prioritaire disponible (+${PRICING_CONFIG.support.priority}€/mois, réponse 24h)`,
				`Support urgent disponible (+${PRICING_CONFIG.support.urgent}€/mois, réponse 4h)`,
				'Rapports de performance mensuels détaillés',
				'Protection anti-DDoS et firewall avancé',
				'Optimisation continue des performances',
			],
		},
		guarantee: {
			title: 'Garanties & Engagement',
			description: "Votre tranquillité d'esprit est notre priorité",
			points: [
				'Code source remis en fin de projet - vous êtes propriétaire',
				'Garantie de fonctionnement 99.9% de disponibilité',
				"Migration gratuite si vous souhaitez changer d'hébergeur",
				'Aucun frais caché - tarification transparente',
				'Consultations et devis toujours gratuits',
			],
		},
	},
	support: {
		title: 'Niveaux de Support Technique',
		subtitle: 'Un support adapté à vos besoins et votre budget',
		responseLabel: 'Réponse :',
		levels: [
			{
				name: 'Support Standard',
				price: 'Inclus',
				responseTime: '48h ouvrées',
				availability: 'Lun-Ven 9h-17h',
				description:
					'Support par email pour les questions techniques et maintenance courante',
				features: [
					'Support par email',
					'Résolution de bugs',
					'Questions techniques',
					"Aide à l'utilisation",
					'Rapports mensuels',
				],
				suitable: 'Sites vitrine, petites entreprises',
			},
			{
				name: 'Support Prioritaire',
				price: formatPrice.supplement(
					PRICING_CONFIG.support.priority,
					'€',
				),
				responseTime: '24h ouvrées',
				availability: 'Lun-Ven 8h-19h',
				description:
					'Support renforcé avec réponse rapide et suivi personnalisé',
				features: [
					'Tout du Support Standard',
					'Réponse prioritaire',
					'Suivi personnalisé',
					'Hotline téléphonique',
					"Conseils d'optimisation",
				],
				suitable: 'E-commerce, sites à fort trafic',
			},
			{
				name: 'Support Urgent',
				price: formatPrice.supplement(
					PRICING_CONFIG.support.urgent,
					'€',
				),
				responseTime: '4h maximum',
				availability: 'Lun-Dim 8h-22h',
				description:
					'Support critique pour les applications métier importantes',
				features: [
					'Tout du Support Prioritaire',
					'Intervention urgente',
					'Support weekend',
					'Hotline prioritaire',
					'Monitoring proactif',
				],
				suitable: 'Applications critiques, entreprises',
			},
		],
		note: 'Pour des besoins spécifiques (24/7, SLA personnalisés), nous proposons des accords sur-mesure selon vos exigences.',
	},
	faq: {
		title: 'Questions Fréquemment Posées',
		questions: [
			{
				question: `Que comprend les ${PRICING_CONFIG.monthly.base}€/mois ?`,
				answer: `Notre forfait mensuel à ${PRICING_CONFIG.monthly.base}€ couvre l'hébergement professionnel, CDN, certificats SSL, sauvegardes quotidiennes, monitoring de sécurité, mises à jour automatiques et support technique standard (48h). Cela assure le fonctionnement optimal de votre site 24h/24.`,
			},
			{
				question: 'Comment déterminez-vous le coût de développement ?',
				answer: 'Les coûts de développement dépendent de la complexité, des fonctionnalités et des exigences de design. Nous fournissons des devis détaillés après avoir compris vos besoins spécifiques lors de notre consultation gratuite.',
			},
			{
				question: 'Proposez-vous des plans de paiement ?',
				answer: "Oui, nous offrons des options de paiement flexibles incluant des paiements par étapes pour le développement et une facturation mensuelle pour l'infrastructure et le support.",
			},
			{
				question: 'Que se passe-t-il si je veux annuler ?',
				answer: "Vous possédez votre site web et pouvez annuler à tout moment avec un préavis de 30 jours. Nous vous aiderons à migrer vers votre solution d'hébergement préférée.",
			},
			{
				question: 'Fournissez-vous une maintenance continue ?',
				answer: `Oui, notre forfait à ${PRICING_CONFIG.monthly.base}€/mois inclut les mises à jour régulières, les correctifs de sécurité et la maintenance technique. Les travaux de développement supplémentaires sont devisés séparément.`,
			},
			{
				question: 'Quels sont les niveaux de support disponibles ?',
				answer: `Support standard inclus (48h), support prioritaire (+${PRICING_CONFIG.support.priority}€/mois, 24h), support urgent (+${PRICING_CONFIG.support.urgent}€/mois, 4h). Pour des besoins spécifiques, nous proposons des SLA sur-mesure selon vos besoins.`,
			},
		],
	},
	cta: {
		title: 'Prêt à démarrer votre projet ?',
		description:
			'Obtenez une consultation gratuite et un devis détaillé pour votre site web.',
		button: 'Obtenir Votre Devis Gratuit',
	},
	contactButton: 'Nous Contacter',
	faqContactText:
		"Vous avez d'autres questions ? N'hésitez pas à nous contacter.",
} as const
