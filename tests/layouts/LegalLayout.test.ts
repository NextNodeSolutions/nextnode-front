import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for LegalLayout.astro layout
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required patterns.
 */

const layoutPath = join(process.cwd(), 'src/layouts/LegalLayout.astro')
const layoutContent = readFileSync(layoutPath, 'utf-8')

describe('LegalLayout.astro', () => {
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
			expect(layoutContent).toContain('title={title}')
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

		it('has lastUpdated prop', () => {
			expect(layoutContent).toContain('lastUpdated: Date | string')
		})

		it('has optional description prop', () => {
			expect(layoutContent).toContain('description?: string')
		})
	})

	describe('logger integration', () => {
		it('imports logger from @nextnode/logger', () => {
			expect(layoutContent).toContain(
				"import { logger } from '@nextnode/logger'",
			)
		})

		it('logs legal page load event', () => {
			expect(layoutContent).toContain("logger.info('Legal page loaded'")
		})

		it('uses details object for log data', () => {
			expect(layoutContent).toContain('details: {')
		})

		it('logs title in details', () => {
			const detailsMatch = layoutContent.match(/details:\s*\{[^}]+\}/s)
			expect(detailsMatch).toBeTruthy()
			expect(detailsMatch?.[0]).toContain('title,')
		})

		it('logs pathname in details', () => {
			expect(layoutContent).toContain('pathname: Astro.url.pathname')
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

	describe('date display', () => {
		it('has time element for semantic date', () => {
			expect(layoutContent).toContain('<time')
			expect(layoutContent).toContain('</time>')
		})

		it('has datetime attribute on time element', () => {
			expect(layoutContent).toContain('datetime=')
		})

		it('uses ISO string for datetime attribute', () => {
			expect(layoutContent).toContain('toISOString()')
		})

		it('formats date with full locale string', () => {
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

		it('displays Last updated prefix', () => {
			expect(layoutContent).toContain('Last updated')
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

		it('has responsive column span', () => {
			expect(layoutContent).toContain('lg:col-span-2')
		})
	})

	describe('default values', () => {
		it('has default page description based on title', () => {
			expect(layoutContent).toContain('description ??')
			expect(layoutContent).toContain('for NextNode services')
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

		it('uses base-400 text for date', () => {
			expect(layoutContent).toContain('text-base-400')
		})

		it('uses textSM variant for date', () => {
			expect(layoutContent).toContain('variant="textSM"')
		})
	})

	describe('component order', () => {
		it('has title heading before date', () => {
			const titleMatch = layoutContent.match(/<Text[^>]*tag="h1"[^>]*>/)
			const dateMatch = layoutContent.match(/Last updated/)
			expect(titleMatch).toBeTruthy()
			expect(dateMatch).toBeTruthy()
			expect(titleMatch?.index).toBeLessThan(dateMatch?.index ?? 0)
		})

		it('has header section before prose content', () => {
			const headerIndex = layoutContent.indexOf('tag="h1"')
			const proseIndex = layoutContent.indexOf('variant="prose"')
			expect(headerIndex).toBeLessThan(proseIndex)
		})
	})

	describe('clean typography for legal content', () => {
		it('uses prose wrapper for legal content', () => {
			expect(layoutContent).toContain('variant="prose"')
		})

		it('prose section has margin top', () => {
			// Find the prose wrapper and check its classes
			const proseMatch = layoutContent.match(
				/<Wrapper[^>]*variant="prose"[^>]*>/,
			)
			expect(proseMatch).toBeTruthy()
			expect(proseMatch?.[0]).toContain('mt-12')
		})

		it('prose section spans correct columns on large screens', () => {
			const proseMatch = layoutContent.match(
				/<Wrapper[^>]*variant="prose"[^>]*>/,
			)
			expect(proseMatch).toBeTruthy()
			expect(proseMatch?.[0]).toContain('lg:col-span-2')
		})

		it('prose section starts at row 2 on large screens', () => {
			const proseMatch = layoutContent.match(
				/<Wrapper[^>]*variant="prose"[^>]*>/,
			)
			expect(proseMatch).toBeTruthy()
			expect(proseMatch?.[0]).toContain('lg:row-start-2')
		})
	})

	describe('lastUpdated prop handling', () => {
		it('destructures lastUpdated from props', () => {
			expect(layoutContent).toContain('lastUpdated')
		})

		it('creates Date object from lastUpdated for formatting', () => {
			expect(layoutContent).toContain('new Date(lastUpdated)')
		})

		it('stores formatted date in variable', () => {
			expect(layoutContent).toContain('formattedDate')
		})

		it('displays formatted date', () => {
			expect(layoutContent).toContain('{formattedDate}')
		})
	})
})
