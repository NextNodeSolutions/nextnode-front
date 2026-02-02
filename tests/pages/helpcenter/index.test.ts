import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

describe('Help Center Listing Page', () => {
	const filePath = join(process.cwd(), 'src/pages/helpcenter/index.astro')
	const content = readFileSync(filePath, 'utf-8')

	describe('Layout Integration', () => {
		it('uses BaseLayout', () => {
			expect(content).toContain(
				"import BaseLayout from '@/layouts/BaseLayout.astro'",
			)
		})

		it('wraps content in BaseLayout', () => {
			expect(content).toContain('<BaseLayout')
			expect(content).toContain('</BaseLayout>')
		})

		it('has page title defined', () => {
			expect(content).toContain("const title = 'Help Center | NextNode'")
		})

		it('has page description defined', () => {
			expect(content).toContain('const description =')
			expect(content).toContain('Get help with NextNode')
		})

		it('passes title prop to BaseLayout', () => {
			expect(content).toContain('title={title}')
		})

		it('passes description prop to BaseLayout', () => {
			expect(content).toContain('description={description}')
		})
	})

	describe('Component Imports', () => {
		it('imports Text component', () => {
			expect(content).toContain(
				"import Text from '@/components/fundations/elements/Text.astro'",
			)
		})

		it('imports Wrapper component', () => {
			expect(content).toContain(
				"import Wrapper from '@/components/fundations/containers/Wrapper.astro'",
			)
		})

		it('imports HelpCenterCard component', () => {
			expect(content).toContain(
				"import HelpCenterCard from '@/components/helpcenter/HelpCenterCard.astro'",
			)
		})
	})

	describe('Content Collection Integration', () => {
		it('imports getCollection from astro:content', () => {
			expect(content).toContain(
				"import { getCollection } from 'astro:content'",
			)
		})

		it('fetches helpcenter collection', () => {
			expect(content).toContain("getCollection('helpcenter')")
		})

		it('stores articles in allArticles variable', () => {
			expect(content).toContain('const allArticles = await getCollection')
		})
	})

	describe('Category Grouping', () => {
		it('defines CategoryGroup interface', () => {
			expect(content).toContain('interface CategoryGroup')
		})

		it('groups articles by category', () => {
			expect(content).toContain('article.data.category')
		})

		it('reduces articles into categories object', () => {
			expect(content).toContain('allArticles.reduce')
		})

		it('sorts articles by pubDate within categories', () => {
			expect(content).toContain(
				'b.data.pubDate.getTime() - a.data.pubDate.getTime()',
			)
		})

		it('sorts category groups alphabetically', () => {
			expect(content).toContain('a.name.localeCompare(b.name)')
		})

		it('extracts unique category names', () => {
			expect(content).toContain(
				'const categoryNames = categoryGroups.map',
			)
		})
	})

	describe('Page Structure', () => {
		it('has multiple sections', () => {
			const sectionMatches = content.match(/<section/g)
			expect(sectionMatches?.length).toBeGreaterThanOrEqual(2)
		})

		it('uses gradient background for header section', () => {
			expect(content).toContain('class="bg-gradient-up"')
		})

		it('uses Wrapper with standard variant', () => {
			expect(content).toContain('Wrapper variant="standard"')
		})

		it('has h1 heading', () => {
			expect(content).toContain('tag="h1"')
		})

		it('uses displayLG variant for main heading', () => {
			expect(content).toContain('variant="displayLG"')
		})

		it('has "Help Center" label text', () => {
			expect(content).toContain('Help Center')
		})

		it('has descriptive heading text', () => {
			expect(content).toContain('How can we help you?')
		})
	})

	describe('Search Functionality', () => {
		it('has search input element', () => {
			expect(content).toContain('type="search"')
		})

		it('search input has id for JavaScript targeting', () => {
			expect(content).toContain('id="help-search"')
		})

		it('search input has placeholder text', () => {
			expect(content).toContain('placeholder="Search help articles..."')
		})

		it('search input has autocomplete off', () => {
			expect(content).toContain('autocomplete="off"')
		})

		it('has search icon', () => {
			expect(content).toContain('M21 21l-5.197-5.197')
		})
	})

	describe('Category Filter', () => {
		it('has category filter buttons', () => {
			expect(content).toContain('data-category=')
		})

		it('has "All" category button', () => {
			expect(content).toContain('data-category="all"')
		})

		it('renders category buttons dynamically', () => {
			expect(content).toContain('categoryNames.map')
		})

		it('buttons have aria-pressed attribute', () => {
			expect(content).toContain('aria-pressed=')
		})

		it('buttons have cursor-pointer class', () => {
			expect(content).toContain('cursor-pointer')
		})
	})

	describe('Articles Display', () => {
		it('maps over categoryGroups to display sections', () => {
			expect(content).toContain('categoryGroups.map')
		})

		it('has category section data attribute', () => {
			expect(content).toContain('data-category-section={group.name}')
		})

		it('displays category name as h2', () => {
			expect(content).toContain('tag="h2"')
			expect(content).toContain('{group.name}')
		})

		it('uses displaySM for category headings', () => {
			expect(content).toContain('variant="displaySM"')
		})

		it('maps articles to HelpCenterCard components', () => {
			expect(content).toContain('group.articles.map')
		})

		it('renders HelpCenterCard with article prop', () => {
			expect(content).toContain('<HelpCenterCard article={article}')
		})

		it('uses responsive grid layout', () => {
			expect(content).toContain('md:grid-cols-2')
			expect(content).toContain('lg:grid-cols-3')
		})
	})

	describe('Empty State', () => {
		it('has no results element', () => {
			expect(content).toContain('id="no-results"')
		})

		it('no results is hidden by default', () => {
			expect(content).toContain('class="hidden py-16 text-center"')
		})

		it('has aria-live for accessibility', () => {
			expect(content).toContain('aria-live="polite"')
		})

		it('has role status for screen readers', () => {
			expect(content).toContain('role="status"')
		})

		it('has no results message text', () => {
			expect(content).toContain('No articles found')
		})

		it('has helpful suggestion text', () => {
			expect(content).toContain('Try adjusting your search')
		})
	})

	describe('Contact CTA Section', () => {
		it('has contact CTA section', () => {
			expect(content).toContain('Still need help?')
		})

		it('has link to contact page', () => {
			expect(content).toContain('href="/contact"')
		})

		it('has contact support button text', () => {
			expect(content).toContain('Contact Support')
		})

		it('uses nextnode-500 for button background', () => {
			expect(content).toContain('bg-nextnode-500')
		})
	})

	describe('Client-side JavaScript', () => {
		it('has script tag for interactivity', () => {
			expect(content).toContain('<script>')
		})

		it('listens for DOMContentLoaded event', () => {
			expect(content).toContain("addEventListener('DOMContentLoaded'")
		})

		it('targets search input by id', () => {
			expect(content).toContain('help-search')
			expect(content).toContain('getElementById')
		})

		it('selects category buttons', () => {
			expect(content).toContain("querySelectorAll('[data-category]')")
		})

		it('selects category sections', () => {
			expect(content).toContain('[data-category-section]')
		})

		it('tracks active category state', () => {
			expect(content).toContain("let activeCategory = 'all'")
		})

		it('handles category button clicks', () => {
			expect(content).toContain("addEventListener('click'")
		})

		it('handles search input events', () => {
			expect(content).toContain("addEventListener('input'")
		})

		it('has filterContent function', () => {
			expect(content).toContain('function filterContent()')
		})

		it('filters by search term', () => {
			expect(content).toContain('searchTerm')
		})

		it('updates button active states', () => {
			expect(content).toContain("setAttribute('aria-pressed'")
		})

		it('toggles section visibility', () => {
			expect(content).toContain('sectionElement.style.display')
		})

		it('toggles no results visibility', () => {
			expect(content).toContain("noResults.classList.toggle('hidden'")
		})
	})

	describe('TypeScript', () => {
		it('uses proper type annotations for search input', () => {
			expect(content).toContain('HTMLInputElement | null')
		})

		it('uses type parameter for reduce', () => {
			expect(content).toContain(
				'reduce<Record<string, typeof allArticles>>',
			)
		})
	})

	describe('Styling', () => {
		it('uses NextNode color tokens', () => {
			expect(content).toContain('text-nextnode-400')
			expect(content).toContain('bg-nextnode-500')
		})

		it('uses base color tokens for backgrounds', () => {
			expect(content).toContain('bg-base-950')
			expect(content).toContain('bg-base-900')
			expect(content).toContain('bg-base-800')
		})

		it('uses base color tokens for text', () => {
			expect(content).toContain('text-base-300')
			expect(content).toContain('text-base-400')
			expect(content).toContain('text-base-500')
		})

		it('uses white text color', () => {
			expect(content).toContain('text-white')
		})

		it('uses font-display for headings', () => {
			expect(content).toContain('font-display')
		})

		it('uses rounded-lg for elements', () => {
			expect(content).toContain('rounded-lg')
		})

		it('uses rounded-full for filter buttons', () => {
			expect(content).toContain('rounded-full')
		})

		it('uses transition-colors for hover effects', () => {
			expect(content).toContain('transition-colors')
		})
	})

	describe('Accessibility', () => {
		it('has aria-hidden on decorative icons', () => {
			expect(content).toContain('aria-hidden="true"')
		})

		it('uses proper form input attributes', () => {
			expect(content).toContain('type="search"')
			expect(content).toContain('name="search"')
		})

		it('has focusable input styling', () => {
			expect(content).toContain('focus:border-nextnode-500')
			expect(content).toContain('focus:ring-nextnode-500')
		})
	})
})
