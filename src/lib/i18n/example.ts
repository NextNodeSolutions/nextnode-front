// ====================================
// EXEMPLES D'UTILISATION DU SYSTÈME I18N
// ====================================
// Ce fichier montre les différentes façons d'utiliser la nouvelle fonction t()

import { createT, t } from './index'

// ====================================
// EXEMPLES DE BASE
// ====================================

// Créer une fonction t() pour une locale spécifique
const tEn = createT('en')
const tFr = createT('fr')

// Exemple 1: Clés simples
const homeEn = tEn('common.navigation.home') // 'Home'
const homeFr = tFr('common.navigation.home') // 'Accueil'

// Exemple 2: Objets imbriqués - récupérer une section complète
const navigationEn = tEn('common.navigation')
// Retourne: { home: 'Home', about: 'About', services: 'Services', ... }

const heroSectionFr = tFr('home.hero')
// Retourne tout l'objet hero avec toutes ses traductions

// ====================================
// CLÉS DYNAMIQUES
// ====================================

// Exemple 3: Accès aux arrays avec index dynamique
const firstMessageEn = tEn('common.examples.messages.{index}', { index: 0 })
// Retourne: 'Welcome {name}!'

// const secondMessageFr = tFr('common.examples.messages.{index}', { index: 1 })
// Returns: 'Votre compte a été créé le {date}'

// ====================================
// INTERPOLATION DE VARIABLES
// ====================================

// Exemple 4: Interpolation simple
const greetingEn = tEn('common.examples.interpolation.greeting', {
	name: 'John',
	siteName: 'Nextnode',
})
// Retourne: 'Hello John, welcome to Nextnode!'

// Exemple 5: Combinaison clés dynamiques + interpolation
const personalizedMessageEn = tEn('common.examples.messages.{index}', {
	index: 0,
	name: 'Alice',
})
// Retourne: 'Welcome Alice!' (résout l'index ET interpole le nom)

// ====================================
// UTILISATION GLOBALE
// ====================================

// Exemple 6: Fonction t() globale (utilise la locale courante)
// Ces appels utiliseront la locale définie par le middleware Astro

// const globalHome = t('common.navigation.home')
// const globalHero = t('home.hero') // Retourne l'objet complet
// const globalGreeting = t('common.examples.interpolation.greeting', {
// 	name: 'User',
// 	siteName: 'MyApp',
// })

// ====================================
// EXEMPLES AVANCÉS AVEC TYPES
// ====================================

// Exemple 7: Types inférés automatiquement
function getNavigationData(): unknown {
	// TypeScript infère automatiquement le type de retour
	const nav = t('common.navigation')
	// nav est typé comme: Readonly<{ home: string, about: string, ... }>

	return nav
}

// Exemple 8: Utilisation dans une FAQ dynamique
function getFaqItem(index: number): { question: string; answer: string } {
	// Pour les arrays plus complexes comme dans pricing.faq.questions
	const question = t('pricing.faq.questions.{index}.question', { index })
	const answer = t('pricing.faq.questions.{index}.answer', { index })

	return { question, answer }
}

// ====================================
// PATTERNS D'UTILISATION RECOMMANDÉS
// ====================================

// Pattern 1: Récupérer une section et la propager
function getHomePageData(): { hero: unknown; sidePanel: unknown } {
	return {
		hero: t('home.hero'),
		sidePanel: t('home.sidePanel'),
	}
}

// Pattern 2: Fonction helper pour les listes dynamiques
function formatNotifications(count: number): string {
	return t('common.examples.messages.{index}', {
		index: 2, // "You have {count} new notifications"
		count: count.toString(),
	})
}

// Pattern 3: Component that receives section from server
// interface Props {
// 	heroData: ReturnType<typeof getHomePageData>['hero']
// }

export {
	// Examples for tests and documentation
	tEn,
	tFr,
	homeEn,
	homeFr,
	navigationEn,
	heroSectionFr,
	firstMessageEn,
	greetingEn,
	personalizedMessageEn,
	getNavigationData,
	getFaqItem,
	getHomePageData,
	formatNotifications,
}
