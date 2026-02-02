import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

describe('Legal Page ([...slug])', () => {
	const filePath = join(process.cwd(), 'src/pages/legal/[...slug].astro')
	const content = readFileSync(filePath, 'utf-8')

	describe('File Structure', () => {
		it('has frontmatter delimiters', () => {
			const frontmatterMatches = content.match(/---/g)
			expect(frontmatterMatches?.length).toBe(2)
		})

		it('has file comment documenting purpose', () => {
			expect(content).toContain('Legal Page')
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

		it('documents Props in comment', () => {
			expect(content).toContain('Props:')
		})

		it('documents page prop in comment', () => {
			expect(content).toContain('page: The legal document')
		})

		it('mentions legal documents in comment', () => {
			expect(content).toContain('privacy policy')
			expect(content).toContain('terms of service')
		})
	})

	describe('Layout Integration', () => {
		it('imports LegalLayout', () => {
			expect(content).toContain(
				"import LegalLayout from '@/layouts/LegalLayout.astro'",
			)
		})

		it('wraps content in LegalLayout', () => {
			expect(content).toContain('<LegalLayout')
			expect(content).toContain('</LegalLayout>')
		})

		it('passes title prop to layout', () => {
			expect(content).toContain('title={title}')
		})

		it('passes lastUpdated prop to layout', () => {
			expect(content).toContain('lastUpdated={lastUpdated}')
		})

		it('passes description prop to layout', () => {
			expect(content).toContain('description={content}')
		})
	})

	describe('Content Collection Integration', () => {
		it('imports getCollection from astro:content', () => {
			expect(content).toContain(
				"import { getCollection } from 'astro:content'",
			)
		})

		it('fetches legal collection', () => {
			expect(content).toContain("getCollection('legal')")
		})
	})

	describe('Static Paths Generation', () => {
		it('exports getStaticPaths function', () => {
			expect(content).toContain('export async function getStaticPaths()')
		})

		it('stores legal pages in allLegalPages variable', () => {
			expect(content).toContain(
				"const allLegalPages = await getCollection('legal')",
			)
		})

		it('maps legal pages to paths', () => {
			expect(content).toContain('allLegalPages.map')
		})

		it('returns params with slug', () => {
			expect(content).toContain('params: { slug: page.slug }')
		})

		it('returns props with page', () => {
			expect(content).toContain('props: { page }')
		})
	})

	describe('Props Interface', () => {
		it('defines Props interface', () => {
			expect(content).toContain('interface Props')
		})

		it('includes page prop type', () => {
			expect(content).toContain(
				"page: Awaited<ReturnType<typeof getCollection<'legal'>>>[number]",
			)
		})

		it('destructures page from props', () => {
			expect(content).toContain('const { page } = Astro.props')
		})
	})

	describe('MDX Content Rendering', () => {
		it('renders page content', () => {
			expect(content).toContain('await page.render()')
		})

		it('destructures Content from render result', () => {
			expect(content).toContain('const { Content } = await page.render()')
		})

		it('uses Content component in layout', () => {
			expect(content).toContain('<Content />')
		})
	})

	describe('Legal Data Destructuring', () => {
		it('destructures title from page data', () => {
			expect(content).toContain('title')
			expect(content).toContain('page.data')
		})

		it('destructures lastUpdated from page data', () => {
			expect(content).toContain('lastUpdated')
		})

		it('destructures content from page data', () => {
			expect(content).toContain('content')
		})

		it('uses single destructuring statement for data', () => {
			expect(content).toContain('const {')
			expect(content).toContain('title,')
			expect(content).toContain('lastUpdated,')
			expect(content).toContain('content')
			expect(content).toContain('} = page.data')
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
			const propsIndex = content.indexOf('const { page } = Astro.props')
			const renderIndex = content.indexOf('await page.render()')

			expect(importIndex).toBeLessThan(getStaticPathsIndex)
			expect(getStaticPathsIndex).toBeLessThan(interfaceIndex)
			expect(interfaceIndex).toBeLessThan(propsIndex)
			expect(propsIndex).toBeLessThan(renderIndex)
		})
	})

	describe('Layout Props', () => {
		it('passes title as string from page data', () => {
			expect(content).toContain('title={title}')
		})

		it('passes lastUpdated for date display', () => {
			expect(content).toContain('lastUpdated={lastUpdated}')
		})

		it('passes content as description for meta', () => {
			expect(content).toContain('description={content}')
		})
	})
})
