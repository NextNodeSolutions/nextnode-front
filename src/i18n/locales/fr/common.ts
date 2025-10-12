export const common = {
	navigation: {
		home: 'Accueil',
		about: 'À propos',
		services: 'Services',
		portfolio: 'Portfolio',
		contact: 'Contact',
		pricing: 'Tarifs',
	},
	ui: {
		toggleTheme: 'Changer le thème',
		selectLanguage: 'Choisir la langue',
		openMenu: 'Ouvrir le menu',
		closeMenu: 'Fermer le menu',
		scrollToDiscover: 'Faites défiler pour découvrir plus',
		theme: 'Thème',
		language: 'Langue',
	},
	cal: {
		scheduleButton: '📅 Réserver un rendez-vous',
		scheduleMeeting: 'Planifier un appel',
		bookConsultation: 'Réserver une consultation',
		letsChat: 'Discutons de votre projet',
		freeConsultation: 'Consultation gratuite',
		loading: 'Chargement du calendrier...',
		opensInModal: 'Ouvre la fenêtre de réservation du calendrier',
		error: 'Impossible de charger le calendrier, ouverture dans un nouvel onglet',
	},
	stepCard: {
		step: 'Étape',
		clickToSeeMore: 'Cliquer pour plus',
	},
	languages: {
		en: 'EN',
		fr: 'FR',
	},
	legal: {
		lastUpdated: 'Dernière mise à jour',
	},
	meta: {
		defaultDescription:
			'Agence web à Paris spécialisée dans la création de sites internet sur mesure. Devis gratuit, accompagnement personnalisé. Expert développement web Île-de-France.',
		homepage: {
			title: 'NextNode | Agence Web Paris - Création Sites Internet Île-de-France',
			description:
				'Agence web à Paris spécialisée dans la création de sites internet sur mesure, développement web et solutions digitales. Devis gratuit en 48h. Expertise Île-de-France.',
		},
		pricing: {
			title: 'Tarifs Site Web Paris | Devis Gratuit - NextNode',
			description:
				'Découvrez nos tarifs transparents pour la création de votre site web à Paris. Formules adaptées TPE/PME, devis personnalisé sous 48h. Agence web Île-de-France.',
		},
		services: {
			title: 'Services Web Paris | Développement, Design, SEO - NextNode',
			description:
				'Agence digitale Paris : création site vitrine, e-commerce, application web. Solutions sur mesure pour entreprises Île-de-France. Expertise technique reconnue.',
		},
	},
	// Exemples pour tester le nouveau système i18n
	examples: {
		messages: [
			'Bienvenue {name} !',
			'Votre compte a été créé le {date}',
			'Vous avez {count} nouvelles notifications',
		],
		interpolation: {
			greeting: 'Bonjour {name}, bienvenue sur {siteName} !',
			datetime: 'Nous sommes le {date} et il est {time}',
			plural: 'Vous avez {count} {count, plural, =0 {éléments} one {élément} other {éléments}}',
		},
		nested: {
			level1: {
				level2: {
					value: 'Valeur imbriquée profonde pour les tests',
				},
			},
		},
	},
} as const
