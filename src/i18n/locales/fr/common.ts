export const common = {
	navigation: {
		home: 'Accueil',
		about: 'À propos',
		services: 'Services',
		portfolio: 'Portfolio',
		contact: 'Contact',
		howWeWork: 'Comment nous travaillons',
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
	stepCard: {
		step: 'Étape',
		clickToSeeMore: 'Cliquer pour voir plus',
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
			'Template moderne et performant créé avec Astro et Nextnode',
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
