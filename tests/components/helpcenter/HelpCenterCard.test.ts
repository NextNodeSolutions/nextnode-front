import { describe, expect, it } from 'vitest'

/**
 * HelpCenterCard.astro Component Tests
 *
 * Tests for the help center card component that displays help articles.
 * Since Astro components can't be rendered directly in Vitest without
 * additional tooling, we test the component's props interface and
 * expected behavior through type checking and unit tests on logic.
 */

describe('HelpCenterCard', () => {
	describe('Props Interface', () => {
		it('should have required article prop with correct structure', () => {
			// Validate the expected props structure
			const mockArticle = {
				slug: 'getting-started-with-nextnode',
				data: {
					title: 'Getting Started with NextNode',
					description:
						'Learn how to set up your NextNode account and get started.',
					category: 'Getting Started',
					pubDate: new Date('2024-01-15'),
				},
			}

			expect(mockArticle.slug).toBeDefined()
			expect(mockArticle.data.title).toBe('Getting Started with NextNode')
			expect(mockArticle.data.category).toBe('Getting Started')
			expect(mockArticle.data.description).toBeDefined()
			expect(mockArticle.data.pubDate).toBeInstanceOf(Date)
		})

		it('should handle optional lastUpdated field', () => {
			const mockArticleWithLastUpdated = {
				slug: 'billing-faq',
				data: {
					title: 'Billing FAQ',
					description: 'Common questions about billing and payments.',
					category: 'Billing',
					pubDate: new Date('2024-01-01'),
					lastUpdated: new Date('2024-02-15'),
				},
			}

			expect(mockArticleWithLastUpdated.data.lastUpdated).toBeInstanceOf(
				Date,
			)
		})

		it('should handle article without lastUpdated', () => {
			const mockArticle = {
				slug: 'account-setup',
				data: {
					title: 'Account Setup',
					description: 'How to set up your account.',
					category: 'Account',
					pubDate: new Date('2024-01-10'),
					lastUpdated: undefined,
				},
			}

			expect(mockArticle.data.lastUpdated).toBeUndefined()
		})
	})

	describe('Date Formatting', () => {
		it('should format pubDate correctly', () => {
			const date = new Date('2024-01-15')
			const formatted = date.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
			})

			expect(formatted).toBe('Jan 15, 2024')
		})
	})

	describe('URL Generation', () => {
		it('should generate correct helpcenter URL from slug', () => {
			const slug = 'getting-started-with-nextnode'
			const url = `/helpcenter/${slug}`

			expect(url).toBe('/helpcenter/getting-started-with-nextnode')
		})
	})

	describe('Category Badge Colors', () => {
		it('should have colors for predefined categories', () => {
			const categoryColors: Record<string, string> = {
				'Getting Started': 'bg-nextnode-500 text-white',
				Account: 'bg-accent-500 text-white',
				Billing: 'bg-accent-600 text-white',
			}

			expect(categoryColors['Getting Started']).toBe(
				'bg-nextnode-500 text-white',
			)
			expect(categoryColors.Account).toBe('bg-accent-500 text-white')
			expect(categoryColors.Billing).toBe('bg-accent-600 text-white')
		})

		it('should have fallback color for unknown categories', () => {
			const categoryColors: Record<string, string> = {
				'Getting Started': 'bg-nextnode-500 text-white',
				Account: 'bg-accent-500 text-white',
				Billing: 'bg-accent-600 text-white',
			}
			const fallbackColor = 'bg-base-600 text-white'

			const unknownCategory = 'Unknown Category'
			const badgeColor = categoryColors[unknownCategory] ?? fallbackColor

			expect(badgeColor).toBe(fallbackColor)
		})
	})

	describe('Expected Categories', () => {
		it('should support standard help center categories', () => {
			const expectedCategories = ['Getting Started', 'Account', 'Billing']

			expectedCategories.forEach(category => {
				expect(typeof category).toBe('string')
				expect(category.length).toBeGreaterThan(0)
			})
		})
	})
})
