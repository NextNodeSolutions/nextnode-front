import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

const customersPagePath = path.join(
	process.cwd(),
	'src/pages/customers/index.astro',
)
const customersPageContent = fs.readFileSync(customersPagePath, 'utf-8')

describe('Customers Listing Page', () => {
	describe('File Structure', () => {
		it('should exist at correct path', () => {
			expect(fs.existsSync(customersPagePath)).toBe(true)
		})

		it('should have frontmatter section', () => {
			expect(customersPageContent).toMatch(/^---[\s\S]*?---/)
		})

		it('should have documentation comment', () => {
			expect(customersPageContent).toContain('Customers Listing Page')
		})
	})

	describe('Imports', () => {
		it('should import BaseLayout', () => {
			expect(customersPageContent).toContain(
				"import BaseLayout from '@/layouts/BaseLayout.astro'",
			)
		})

		it('should import Text component', () => {
			expect(customersPageContent).toContain(
				"import Text from '@/components/fundations/elements/Text.astro'",
			)
		})

		it('should import Wrapper component', () => {
			expect(customersPageContent).toContain(
				"import Wrapper from '@/components/fundations/containers/Wrapper.astro'",
			)
		})

		it('should import CustomerCard component', () => {
			expect(customersPageContent).toContain(
				"import CustomerCard from '@/components/customers/CustomerCard.astro'",
			)
		})

		it('should import getCollection from astro:content', () => {
			expect(customersPageContent).toContain(
				"import { getCollection } from 'astro:content'",
			)
		})
	})

	describe('Content Collection', () => {
		it('should fetch customers collection', () => {
			expect(customersPageContent).toContain("getCollection('customers')")
		})

		it('should sort customers alphabetically', () => {
			expect(customersPageContent).toContain('localeCompare')
		})

		it('should store customers in allCustomers variable', () => {
			expect(customersPageContent).toContain('allCustomers')
		})

		it('should store sorted customers in sortedCustomers variable', () => {
			expect(customersPageContent).toContain('sortedCustomers')
		})
	})

	describe('BaseLayout Props', () => {
		it('should pass title prop', () => {
			expect(customersPageContent).toContain('title="Customer Stories"')
		})

		it('should pass description prop', () => {
			expect(customersPageContent).toContain('description="Discover how')
		})
	})

	describe('Page Structure', () => {
		it('should have a section element', () => {
			expect(customersPageContent).toContain('<section>')
		})

		it('should use Wrapper component', () => {
			expect(customersPageContent).toContain('<Wrapper')
		})

		it('should use standard variant for wrapper', () => {
			expect(customersPageContent).toContain('variant="standard"')
		})

		it('should have grid layout classes', () => {
			expect(customersPageContent).toContain('grid-cols-1')
			expect(customersPageContent).toContain('lg:grid-cols-4')
		})
	})

	describe('Hero Section', () => {
		it('should have Case Studies label', () => {
			expect(customersPageContent).toContain('Case Studies')
		})

		it('should have main heading', () => {
			expect(customersPageContent).toContain("Our Customers'")
			expect(customersPageContent).toContain('Success Stories')
		})

		it('should have description paragraph', () => {
			expect(customersPageContent).toContain(
				'Discover how leading companies are using NextNode',
			)
		})

		it('should use displayLG variant for heading', () => {
			expect(customersPageContent).toContain('variant="displayLG"')
		})

		it('should use textSM variant for label', () => {
			expect(customersPageContent).toContain('variant="textSM"')
		})

		it('should use textBase variant for description', () => {
			expect(customersPageContent).toContain('variant="textBase"')
		})
	})

	describe('Customers Grid', () => {
		it('should have ul element for customers list', () => {
			expect(customersPageContent).toContain('<ul')
		})

		it('should have responsive grid classes', () => {
			expect(customersPageContent).toContain('grid-cols-1')
			expect(customersPageContent).toContain('sm:grid-cols-2')
			expect(customersPageContent).toContain('lg:grid-cols-4')
		})

		it('should have divider styling', () => {
			expect(customersPageContent).toContain('divide-y')
			expect(customersPageContent).toContain('divide-base-900')
		})

		it('should map over sortedCustomers', () => {
			expect(customersPageContent).toContain('sortedCustomers.map')
		})

		it('should render CustomerCard for each customer', () => {
			expect(customersPageContent).toContain('<CustomerCard')
		})

		it('should pass post prop to CustomerCard', () => {
			expect(customersPageContent).toContain('post={post}')
		})
	})

	describe('Styling', () => {
		it('should use py-42 for vertical padding', () => {
			expect(customersPageContent).toContain('py-42')
		})

		it('should have white text for hero content', () => {
			expect(customersPageContent).toContain('text-white')
		})

		it('should use font-display for heading', () => {
			expect(customersPageContent).toContain('font-display')
		})

		it('should use text-balance for text wrapping', () => {
			expect(customersPageContent).toContain('text-balance')
		})

		it('should have base-400 color for secondary text', () => {
			expect(customersPageContent).toContain('text-base-400')
		})

		it('should have gap for grid spacing', () => {
			expect(customersPageContent).toContain('gap-y-12')
			expect(customersPageContent).toContain('lg:gap-y-24')
		})
	})

	describe('Layout Structure', () => {
		it('should have col-span-2 for hero on large screens', () => {
			expect(customersPageContent).toContain('lg:col-span-2')
		})

		it('should have col-span-full for customers grid', () => {
			expect(customersPageContent).toContain('lg:col-span-full')
		})

		it('should have row-start-2 for customers grid', () => {
			expect(customersPageContent).toContain('lg:row-start-2')
		})
	})

	describe('Text Component Usage', () => {
		it('should use span tag for label', () => {
			expect(customersPageContent).toContain('tag="span"')
		})

		it('should use h1 tag for main heading', () => {
			expect(customersPageContent).toContain('tag="h1"')
		})

		it('should use p tag for description', () => {
			expect(customersPageContent).toContain('tag="p"')
		})
	})

	describe('Accessibility', () => {
		it('should have proper heading hierarchy with h1', () => {
			expect(customersPageContent).toContain('tag="h1"')
		})

		it('should use semantic list element', () => {
			expect(customersPageContent).toContain('<ul')
		})
	})

	describe('TypeScript', () => {
		it('should use proper sorting comparison', () => {
			expect(customersPageContent).toContain('a.data.name.localeCompare')
			expect(customersPageContent).toContain('b.data.name')
		})

		it('should use async await for getCollection', () => {
			expect(customersPageContent).toContain('await getCollection')
		})
	})
})
