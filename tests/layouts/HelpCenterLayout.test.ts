import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for HelpCenterLayout.astro layout
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required patterns.
 */

const layoutPath = join(process.cwd(), 'src/layouts/HelpCenterLayout.astro')
const layoutContent = readFileSync(layoutPath, 'utf-8')

describe('HelpCenterLayout.astro', () => {
	describe('BaseLayout integration', () => {
		it('imports BaseLayout', () => {
			expect(layoutContent).toContain(
				"import BaseLayout from '@/layouts/BaseLayout.astro'",
			)
		})

		it('uses BaseLayout as wrapper', () => {
			expect(layoutContent).toContain('<BaseLayout')
			expect(layoutContent).toContain('</BaseLayout>')
		})

		it('passes title to BaseLayout', () => {
			expect(layoutContent).toContain('title={pageTitle}')
		})

		it('passes description to BaseLayout', () => {
			expect(layoutContent).toContain('description={pageDescription}')
		})
	})

	describe('TypeScript Props interface', () => {
		it('exports Props interface', () => {
			expect(layoutContent).toContain('export interface Props')
		})

		it('has title prop', () => {
			expect(layoutContent).toContain('title: string')
		})

		it('has description prop', () => {
			expect(layoutContent).toContain('description: string')
		})

		it('has category prop', () => {
			expect(layoutContent).toContain('category: string')
		})

		it('has optional categories prop', () => {
			expect(layoutContent).toContain('categories?: HelpCategory[]')
		})

		it('has optional pubDate prop', () => {
			expect(layoutContent).toContain('pubDate?: Date | string')
		})

		it('has optional lastUpdated prop', () => {
			expect(layoutContent).toContain('lastUpdated?: Date | string')
		})
	})

	describe('HelpCategory interface', () => {
		it('exports HelpCategory interface', () => {
			expect(layoutContent).toContain('export interface HelpCategory')
		})

		it('has id property', () => {
			expect(layoutContent).toContain('id: string')
		})

		it('has name property', () => {
			expect(layoutContent).toContain('name: string')
		})

		it('has optional icon property', () => {
			expect(layoutContent).toContain('icon?: string')
		})

		it('has optional articleCount property', () => {
			expect(layoutContent).toContain('articleCount?: number')
		})
	})

	describe('logger integration', () => {
		it('imports logger from @nextnode/logger', () => {
			expect(layoutContent).toContain(
				"import { logger } from '@nextnode/logger'",
			)
		})

		it('logs help center page load event', () => {
			expect(layoutContent).toContain(
				"logger.info('Help center page loaded'",
			)
		})

		it('uses details object for log data', () => {
			expect(layoutContent).toContain('details: {')
		})

		it('logs title in details', () => {
			const detailsMatch = layoutContent.match(/details:\s*\{[^}]+\}/s)
			expect(detailsMatch).toBeTruthy()
			expect(detailsMatch?.[0]).toContain('title,')
		})

		it('logs category in details', () => {
			const detailsMatch = layoutContent.match(/details:\s*\{[^}]+\}/s)
			expect(detailsMatch).toBeTruthy()
			expect(detailsMatch?.[0]).toContain('category,')
		})

		it('logs pathname in details', () => {
			expect(layoutContent).toContain('pathname: Astro.url.pathname')
		})
	})

	describe('sidebar navigation', () => {
		it('has aside element for sidebar', () => {
			expect(layoutContent).toContain('<aside')
			expect(layoutContent).toContain('</aside>')
		})

		it('has nav element within sidebar', () => {
			expect(layoutContent).toContain('<nav')
			expect(layoutContent).toContain('</nav>')
		})

		it('has accessible nav label', () => {
			expect(layoutContent).toContain(
				'aria-label="Help center categories"',
			)
		})

		it('has Categories heading', () => {
			expect(layoutContent).toContain('Categories')
		})

		it('has sticky positioning on large screens', () => {
			expect(layoutContent).toContain('lg:sticky')
			expect(layoutContent).toContain('lg:top-24')
		})

		it('uses unordered list for categories', () => {
			expect(layoutContent).toContain('<ul')
			expect(layoutContent).toContain('</ul>')
		})

		it('iterates over categories', () => {
			expect(layoutContent).toContain('categories.map')
		})

		it('links to category pages', () => {
			expect(layoutContent).toContain('href={`/help/${cat.id}`}')
		})

		it('highlights active category', () => {
			expect(layoutContent).toContain('category === cat.id')
		})

		it('uses aria-current for active category', () => {
			// Check that aria-current is used with the correct pattern
			expect(layoutContent).toContain('aria-current={')
			expect(layoutContent).toContain("'page'")
			// Verify the full pattern with potential whitespace/newlines
			const ariaCurrent = layoutContent.match(
				/aria-current=\{[\s\S]*?category === cat\.id[\s\S]*?\}/m,
			)
			expect(ariaCurrent).toBeTruthy()
		})

		it('displays article count when available', () => {
			expect(layoutContent).toContain('cat.articleCount')
		})

		it('displays category icon when available', () => {
			expect(layoutContent).toContain('cat.icon')
		})
	})

	describe('title display', () => {
		it('displays title', () => {
			expect(layoutContent).toContain('{title}')
		})

		it('uses display2XL variant for title heading', () => {
			expect(layoutContent).toContain('variant="display2XL"')
		})

		it('uses h1 tag for title heading', () => {
			expect(layoutContent).toContain('tag="h1"')
		})
	})

	describe('description display', () => {
		it('displays description', () => {
			expect(layoutContent).toContain('{description}')
		})

		it('uses textBase variant for description', () => {
			expect(layoutContent).toContain('variant="textBase"')
		})

		it('uses p tag for description', () => {
			expect(layoutContent).toContain('tag="p"')
		})
	})

	describe('category badge', () => {
		it('displays category as badge', () => {
			expect(layoutContent).toContain('{category}')
		})

		it('badge has rounded-full class', () => {
			expect(layoutContent).toContain('rounded-full')
		})

		it('badge has border class', () => {
			expect(layoutContent).toContain('border')
		})

		it('badge uses nextnode colors', () => {
			expect(layoutContent).toContain('bg-nextnode-500/20')
			expect(layoutContent).toContain('text-nextnode-400')
			expect(layoutContent).toContain('border-nextnode-500/30')
		})
	})

	describe('date display', () => {
		it('has conditional date display', () => {
			expect(layoutContent).toContain(
				'formattedPubDate || formattedLastUpdated',
			)
		})

		it('displays Published for pubDate', () => {
			expect(layoutContent).toContain('Published')
		})

		it('displays Updated for lastUpdated', () => {
			expect(layoutContent).toContain('Updated')
		})

		it('has time elements for semantic dates', () => {
			expect(layoutContent).toContain('<time')
			expect(layoutContent).toContain('</time>')
		})

		it('has datetime attribute on time elements', () => {
			expect(layoutContent).toContain('datetime=')
		})

		it('formats dates with full locale string', () => {
			expect(layoutContent).toContain("toLocaleDateString('en-US'")
		})

		it('includes year in date format', () => {
			expect(layoutContent).toContain("year: 'numeric'")
		})

		it('includes month in date format', () => {
			expect(layoutContent).toContain("month: 'long'")
		})

		it('includes day in date format', () => {
			expect(layoutContent).toContain("day: '2-digit'")
		})
	})

	describe('fundation components', () => {
		it('imports Text component', () => {
			expect(layoutContent).toContain(
				"import Text from '@/components/fundations/elements/Text.astro'",
			)
		})

		it('imports Wrapper component', () => {
			expect(layoutContent).toContain(
				"import Wrapper from '@/components/fundations/containers/Wrapper.astro'",
			)
		})

		it('uses Text component', () => {
			expect(layoutContent).toContain('<Text')
		})

		it('uses Wrapper component', () => {
			expect(layoutContent).toContain('<Wrapper')
		})

		it('uses prose wrapper for content', () => {
			expect(layoutContent).toContain('variant="prose"')
		})

		it('uses standard wrapper for main container', () => {
			expect(layoutContent).toContain('variant="standard"')
		})
	})

	describe('layout structure', () => {
		it('has section element', () => {
			expect(layoutContent).toContain('<section>')
			expect(layoutContent).toContain('</section>')
		})

		it('has slot for content', () => {
			expect(layoutContent).toContain('<slot />')
		})

		it('uses grid layout', () => {
			expect(layoutContent).toContain('grid')
			expect(layoutContent).toContain('grid-cols-1')
			expect(layoutContent).toContain('lg:grid-cols-4')
		})

		it('has vertical padding', () => {
			expect(layoutContent).toContain('py-42')
		})

		it('has gap between grid items', () => {
			expect(layoutContent).toContain('gap-8')
		})

		it('sidebar takes 1 column on large screens', () => {
			expect(layoutContent).toContain('lg:col-span-1')
		})

		it('main content takes 3 columns on large screens', () => {
			expect(layoutContent).toContain('lg:col-span-3')
		})
	})

	describe('default values', () => {
		it('has default empty categories array', () => {
			expect(layoutContent).toContain('categories = []')
		})

		it('has page title with Help Center suffix', () => {
			expect(layoutContent).toContain('| Help Center')
		})
	})

	describe('styling', () => {
		it('uses white text for title heading', () => {
			expect(layoutContent).toContain('text-white')
		})

		it('uses text-balance for heading', () => {
			expect(layoutContent).toContain('text-balance')
		})

		it('uses font-display for heading', () => {
			expect(layoutContent).toContain('font-display')
		})

		it('uses base-400 text for description', () => {
			expect(layoutContent).toContain('text-base-400')
		})

		it('uses base-500 text for dates', () => {
			expect(layoutContent).toContain('text-base-500')
		})

		it('uses nextnode-500 for active category styling', () => {
			expect(layoutContent).toContain('bg-nextnode-500/20')
			expect(layoutContent).toContain('text-nextnode-400')
		})

		it('uses base-800 for category hover', () => {
			expect(layoutContent).toContain('hover:bg-base-800')
		})

		it('has transition-colors for category links', () => {
			expect(layoutContent).toContain('transition-colors')
		})
	})

	describe('component order', () => {
		it('has sidebar before main content', () => {
			const sidebarIndex = layoutContent.indexOf('<aside')
			const mainContentIndex = layoutContent.indexOf('lg:col-span-3')
			expect(sidebarIndex).toBeLessThan(mainContentIndex)
		})

		it('has category badge before title in main content', () => {
			// Find the main content section and check order within it
			const mainContentStart = layoutContent.indexOf('lg:col-span-3')
			const mainContent = layoutContent.slice(mainContentStart)
			const badgeIndex = mainContent.indexOf('{category}')
			const titleIndex = mainContent.indexOf('{title}')
			expect(badgeIndex).toBeLessThan(titleIndex)
		})

		it('has title before description', () => {
			const titleMatch = layoutContent.match(/tag="h1"[\s\S]*?\{title\}/)
			const descMatch = layoutContent.match(
				/tag="p"[\s\S]*?\{description\}/,
			)
			expect(titleMatch).toBeTruthy()
			expect(descMatch).toBeTruthy()
			expect(titleMatch!.index).toBeLessThan(descMatch!.index!)
		})

		it('has header before prose content', () => {
			const headerIndex = layoutContent.indexOf('<header')
			const proseIndex = layoutContent.indexOf('variant="prose"')
			expect(headerIndex).toBeLessThan(proseIndex)
		})
	})

	describe('accessibility', () => {
		it('has header element for article header', () => {
			expect(layoutContent).toContain('<header')
			expect(layoutContent).toContain('</header>')
		})

		it('uses semantic h1 for article title', () => {
			expect(layoutContent).toContain('tag="h1"')
		})

		it('uses semantic h2 for sidebar heading', () => {
			expect(layoutContent).toContain('tag="h2"')
		})

		it('nav has aria-label', () => {
			expect(layoutContent).toContain('aria-label=')
		})
	})
})
