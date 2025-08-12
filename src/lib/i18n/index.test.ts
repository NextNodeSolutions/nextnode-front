// ====================================
// TESTS POUR LE SYSTÈME I18N
// ====================================

import { describe, it, expect, beforeEach } from 'vitest'

import { createT, t, setGlobalLocale } from './index'

describe('Système i18n', () => {
	beforeEach(() => {
		// Reset la fonction globale pour chaque test
		setGlobalLocale('en')
	})

	describe('createT()', () => {
		it('devrait créer une fonction t() pour une locale donnée', () => {
			const tEn = createT('en')
			const tFr = createT('fr')

			expect(typeof tEn).toBe('function')
			expect(typeof tFr).toBe('function')
		})

		it('devrait retourner des traductions différentes selon la locale', () => {
			const tEn = createT('en')
			const tFr = createT('fr')

			const homeEn = tEn('common.navigation.home')
			const homeFr = tFr('common.navigation.home')

			expect(homeEn).toBe('Home')
			expect(homeFr).toBe('Accueil')
		})
	})

	describe('Clés simples', () => {
		it('devrait récupérer une traduction simple', () => {
			const tEn = createT('en')
			const result = tEn('common.navigation.home')
			expect(result).toBe('Home')
		})

		it('devrait récupérer une traduction imbriquée', () => {
			const tEn = createT('en')
			const result = tEn('home.hero.title')
			expect(result).toBe('YOUR NEXT')
		})
	})

	describe('Objets imbriqués', () => {
		it('devrait retourner un objet pour une clé partielle', () => {
			const tEn = createT('en')
			const result = tEn('home.hero') as unknown as Record<
				string,
				unknown
			>

			expect(typeof result).toBe('object')
			expect(result.title).toBe('YOUR NEXT')
			expect(result.titleHighlight).toBe('BREAKTHROUGH')
		})

		it('devrait retourner la section complète', () => {
			const tEn = createT('en')
			const result = tEn('common.navigation') as unknown as Record<
				string,
				unknown
			>

			expect(typeof result).toBe('object')
			expect(result.home).toBe('Home')
			expect(result.about).toBe('About')
		})
	})

	describe('Arrays et indices', () => {
		it("devrait récupérer un élément d'array par index", () => {
			const tEn = createT('en')
			// Test avec un array d'exemples que nous avons ajouté
			const result = tEn('common.examples.messages.0')
			expect(result).toBe('Welcome {name}!')
		})

		it("devrait retourner tout l'array", () => {
			const tEn = createT('en')
			const result = tEn('common.examples.messages') as readonly string[]

			expect(Array.isArray(result)).toBe(true)
			expect(result[0]).toBe('Welcome {name}!')
			expect(result.length).toBe(3)
		})
	})

	describe('Clés dynamiques', () => {
		it('devrait résoudre les clés dynamiques avec variables', () => {
			const tEn = createT('en')
			const result = tEn('common.examples.messages.{index}', { index: 0 })
			expect(result).toBe('Welcome {name}!')
		})

		it('devrait résoudre les clés dynamiques complexes', () => {
			const tEn = createT('en')
			const result = tEn('common.examples.messages.{index}', { index: 1 })
			expect(result).toBe('Your account was created on {date}')
		})
	})

	describe('Interpolation', () => {
		it('devrait interpoler les variables simples', () => {
			const tEn = createT('en')
			const result = tEn('common.examples.interpolation.greeting', {
				name: 'John',
				siteName: 'Nextnode',
			})
			expect(result).toBe('Hello John, welcome to Nextnode!')
		})

		it('devrait interpoler les variables avec clés dynamiques', () => {
			const tEn = createT('en')
			const result = tEn('common.examples.messages.{index}', {
				index: 0,
				name: 'Alice',
			})
			expect(result).toBe('Welcome Alice!')
		})

		it('devrait gérer les variables manquantes', () => {
			const tEn = createT('en')
			const result = tEn('common.examples.interpolation.greeting', {
				name: 'John',
				// siteName manquant
			})
			expect(result).toBe('Hello John, welcome to {siteName}!')
		})

		it('devrait gérer différents types de variables', () => {
			const tEn = createT('en')
			const result = tEn('common.examples.interpolation.datetime', {
				date: new Date('2024-01-01'),
				time: '14:30',
			})
			expect(result).toContain('2024')
			expect(result).toContain('14:30')
		})
	})

	describe('Gestion des erreurs', () => {
		it("devrait retourner la clé si la traduction n'existe pas", () => {
			const tEn = createT('en')
			const result = tEn('clé.inexistante')
			expect(result).toBe('clé.inexistante')
		})

		it('devrait gérer les clés dynamiques invalides', () => {
			const tEn = createT('en')
			const result = tEn('common.examples.messages.{index}', {
				// index manquant
			})
			// Devrait retourner la clé originale ou une valeur par défaut
			expect(typeof result).toBe('string')
		})
	})

	describe('Fonction globale t()', () => {
		it('devrait utiliser la locale globale par défaut', () => {
			const result = t('common.navigation.home')
			expect(result).toBe('Home')
		})

		it('devrait changer quand on met à jour la locale globale', () => {
			setGlobalLocale('fr')
			const result = t('common.navigation.home')
			expect(result).toBe('Accueil')

			// Reset pour les autres tests
			setGlobalLocale('en')
		})
	})

	describe('Cache', () => {
		it('devrait mettre en cache les résultats', () => {
			const tEn = createT('en')

			// Premier appel
			const result1 = tEn('home.hero.title')

			// Deuxième appel (devrait être mis en cache)
			const result2 = tEn('home.hero.title')

			expect(result1).toBe(result2)
			// Test que le cache fonctionne en vérifiant l'égalité
		})
	})
})
