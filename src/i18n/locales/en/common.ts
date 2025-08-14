export const common = {
	navigation: {
		home: 'Home',
		about: 'About',
		services: 'Services',
		portfolio: 'Portfolio',
		contact: 'Contact',
		howWeWork: 'How we work',
		pricing: 'Pricing',
	},
	ui: {
		toggleTheme: 'Toggle theme',
		selectLanguage: 'Select language',
		openMenu: 'Open menu',
		closeMenu: 'Close menu',
		scrollToDiscover: 'Scroll to discover more',
		theme: 'Theme',
		language: 'Language',
	},
	stepCard: {
		step: 'Step',
		clickToSeeMore: 'Click to see more',
	},
	languages: {
		en: 'EN',
		fr: 'FR',
	},
	legal: {
		lastUpdated: 'Last updated',
	},
	meta: {
		defaultDescription:
			'Modern and performant template built with Astro and Nextnode',
	},
	// Exemples pour tester le nouveau système i18n
	examples: {
		messages: [
			'Welcome {name}!',
			'Your account was created on {date}',
			'You have {count} new notifications',
		],
		interpolation: {
			greeting: 'Hello {name}, welcome to {siteName}!',
			datetime: 'Today is {date} and it is {time}',
			plural: 'You have {count} {count, plural, =0 {items} one {item} other {items}}',
		},
		nested: {
			level1: {
				level2: {
					value: 'Deep nested value for testing',
				},
			},
		},
	},
} as const
