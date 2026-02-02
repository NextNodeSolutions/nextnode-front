import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

describe('Customer Case Study Page ([...slug])', () => {
	const filePath = join(process.cwd(), 'src/pages/customers/[...slug].astro')
	const content = readFileSync(filePath, 'utf-8')

	describe('File Structure', () => {
		it('has frontmatter delimiters', () => {
			const frontmatterMatches = content.match(/---/g)
			expect(frontmatterMatches?.length).toBe(2)
		})

		it('has file comment documenting purpose', () => {
			expect(content).toContain('Customer Case Study Page')
		})

		it('mentions dynamic route in comment', () => {
			expect(content).toContain('Dynamic route')
		})

		it('mentions MDX content in comment', () => {
			expect(content).toContain('MDX')
		})

		it('mentions static paths in comment', () => {
			expect(content).toContain('static paths')
		})
	})

	describe('Layout Integration', () => {
		it('imports CustomersLayout', () => {
			expect(content).toContain(
				"import CustomersLayout from '@/layouts/CustomersLayout.astro'",
			)
		})

		it('wraps content in CustomersLayout', () => {
			expect(content).toContain('<CustomersLayout')
			expect(content).toContain('</CustomersLayout>')
		})

		it('passes customer prop to layout', () => {
			expect(content).toContain('customer={name}')
		})

		it('passes logo prop to layout', () => {
			expect(content).toContain('logo={logoUrl}')
		})

		it('passes quote prop to layout', () => {
			expect(content).toContain('quote={quote}')
		})

		it('passes quoteAttribution prop to layout', () => {
			expect(content).toContain('quoteAttribution={quoteAttribution}')
		})

		it('passes about prop to layout', () => {
			expect(content).toContain('about={about}')
		})

		it('passes details prop to layout', () => {
			expect(content).toContain('details={customerDetails}')
		})

		it('passes challengesAndSolutions prop to layout', () => {
			expect(content).toContain(
				'challengesAndSolutions={caseStudy?.challengesAndSolutions}',
			)
		})

		it('passes results prop to layout', () => {
			expect(content).toContain('results={caseStudy?.results}')
		})
	})

	describe('Content Collection Integration', () => {
		it('imports getCollection from astro:content', () => {
			expect(content).toContain(
				"import { getCollection } from 'astro:content'",
			)
		})

		it('fetches customers collection', () => {
			expect(content).toContain("getCollection('customers')")
		})
	})

	describe('Static Paths Generation', () => {
		it('exports getStaticPaths function', () => {
			expect(content).toContain('export async function getStaticPaths()')
		})

		it('stores customers in allCustomers variable', () => {
			expect(content).toContain(
				"const allCustomers = await getCollection('customers')",
			)
		})

		it('maps customers to paths', () => {
			expect(content).toContain('allCustomers.map')
		})

		it('returns params with slug', () => {
			expect(content).toContain('params: { slug: customer.slug }')
		})

		it('returns props with customer', () => {
			expect(content).toContain('props: { customer }')
		})
	})

	describe('Props Interface', () => {
		it('defines Props interface', () => {
			expect(content).toContain('interface Props')
		})

		it('includes customer prop type', () => {
			expect(content).toContain(
				"customer: Awaited<ReturnType<typeof getCollection<'customers'>>>[number]",
			)
		})

		it('destructures customer from props', () => {
			expect(content).toContain('const { customer } = Astro.props')
		})
	})

	describe('MDX Content Rendering', () => {
		it('renders customer content', () => {
			expect(content).toContain('await customer.render()')
		})

		it('destructures Content from render result', () => {
			expect(content).toContain(
				'const { Content } = await customer.render()',
			)
		})

		it('uses Content component in layout', () => {
			expect(content).toContain('<Content />')
		})
	})

	describe('Customer Data Destructuring', () => {
		it('destructures name from customer data', () => {
			expect(content).toContain('name')
			expect(content).toContain('customer.data')
		})

		it('destructures logo from customer data', () => {
			expect(content).toContain('logo')
		})

		it('destructures industry from customer data', () => {
			expect(content).toContain('industry')
		})

		it('destructures quote from customer data', () => {
			expect(content).toContain('quote')
		})

		it('destructures quoteAttribution from customer data', () => {
			expect(content).toContain('quoteAttribution')
		})

		it('destructures about from customer data', () => {
			expect(content).toContain('about')
		})

		it('destructures caseStudy from customer data', () => {
			expect(content).toContain('caseStudy')
		})

		it('destructures details from customer data', () => {
			expect(content).toContain('details')
		})

		it('uses single destructuring statement for data', () => {
			expect(content).toContain(
				'const { name, logo, industry, quote, quoteAttribution, about, caseStudy, details } =',
			)
			expect(content).toContain('customer.data')
		})
	})

	describe('Logo URL Derivation', () => {
		it('derives logo URL from image object', () => {
			expect(content).toContain('const logoUrl = logo?.url?.src')
		})

		it('handles optional logo with optional chaining', () => {
			expect(content).toContain('logo?.url?.src')
		})
	})

	describe('Customer Details Building', () => {
		it('creates customerDetails object', () => {
			expect(content).toContain('const customerDetails')
		})

		it('includes industry in customerDetails', () => {
			expect(content).toContain('industry,')
		})

		it('spreads additional details', () => {
			expect(content).toContain('...details')
		})
	})

	describe('TypeScript', () => {
		it('uses proper TypeScript syntax in frontmatter', () => {
			expect(content).toContain('interface Props')
		})

		it('uses Awaited type helper', () => {
			expect(content).toContain('Awaited<')
		})

		it('uses ReturnType type helper', () => {
			expect(content).toContain('ReturnType<')
		})

		it('uses typeof for getCollection', () => {
			expect(content).toContain('typeof getCollection')
		})
	})

	describe('Code Structure', () => {
		it('imports are at the top of frontmatter', () => {
			const importIndex = content.indexOf('import {')
			const frontmatterStart = content.indexOf('---')
			expect(importIndex).toBeGreaterThan(frontmatterStart)
		})

		it('getStaticPaths is exported', () => {
			expect(content).toContain('export async function getStaticPaths')
		})

		it('has correct order: imports, getStaticPaths, interface, props, render', () => {
			const importIndex = content.indexOf('import {')
			const getStaticPathsIndex = content.indexOf(
				'export async function getStaticPaths',
			)
			const interfaceIndex = content.indexOf('interface Props')
			const propsIndex = content.indexOf(
				'const { customer } = Astro.props',
			)
			const renderIndex = content.indexOf('await customer.render()')

			expect(importIndex).toBeLessThan(getStaticPathsIndex)
			expect(getStaticPathsIndex).toBeLessThan(interfaceIndex)
			expect(interfaceIndex).toBeLessThan(propsIndex)
			expect(propsIndex).toBeLessThan(renderIndex)
		})
	})
})
