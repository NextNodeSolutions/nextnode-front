import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

describe('Changelog Detail Page ([...slug])', () => {
	const filePath = join(process.cwd(), 'src/pages/changelog/[...slug].astro')
	const content = readFileSync(filePath, 'utf-8')

	describe('File Structure', () => {
		it('has frontmatter delimiters', () => {
			const frontmatterMatches = content.match(/---/g)
			expect(frontmatterMatches?.length).toBe(2)
		})

		it('has file comment documenting purpose', () => {
			expect(content).toContain('Changelog Detail Page')
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

		it('documents changelog prop in comment', () => {
			expect(content).toContain('changelog: The changelog entry')
		})
	})

	describe('Layout Integration', () => {
		it('imports ChangelogLayout', () => {
			expect(content).toContain(
				"import ChangelogLayout from '@/layouts/ChangelogLayout.astro'",
			)
		})

		it('wraps content in ChangelogLayout', () => {
			expect(content).toContain('<ChangelogLayout')
			expect(content).toContain('</ChangelogLayout>')
		})

		it('passes version prop to layout', () => {
			expect(content).toContain('version={version}')
		})

		it('passes date prop to layout', () => {
			expect(content).toContain('date={date}')
		})

		it('passes type prop to layout', () => {
			expect(content).toContain('type={type}')
		})

		it('passes description prop to layout', () => {
			expect(content).toContain('description={description}')
		})
	})

	describe('Content Collection Integration', () => {
		it('imports getCollection from astro:content', () => {
			expect(content).toContain(
				"import { getCollection } from 'astro:content'",
			)
		})

		it('fetches changelog collection', () => {
			expect(content).toContain("getCollection('changelog')")
		})
	})

	describe('Static Paths Generation', () => {
		it('exports getStaticPaths function', () => {
			expect(content).toContain('export async function getStaticPaths()')
		})

		it('stores changelogs in allChangelogs variable', () => {
			expect(content).toContain(
				"const allChangelogs = await getCollection('changelog')",
			)
		})

		it('maps changelogs to paths', () => {
			expect(content).toContain('allChangelogs.map')
		})

		it('returns params with slug', () => {
			expect(content).toContain('params: { slug: changelog.slug }')
		})

		it('returns props with changelog', () => {
			expect(content).toContain('props: { changelog }')
		})
	})

	describe('Props Interface', () => {
		it('defines Props interface', () => {
			expect(content).toContain('interface Props')
		})

		it('includes changelog prop type', () => {
			expect(content).toContain(
				"changelog: Awaited<ReturnType<typeof getCollection<'changelog'>>>[number]",
			)
		})

		it('destructures changelog from props', () => {
			expect(content).toContain('const { changelog } = Astro.props')
		})
	})

	describe('MDX Content Rendering', () => {
		it('renders changelog content', () => {
			expect(content).toContain('await changelog.render()')
		})

		it('destructures Content from render result', () => {
			expect(content).toContain(
				'const { Content } = await changelog.render()',
			)
		})

		it('uses Content component in layout', () => {
			expect(content).toContain('<Content />')
		})
	})

	describe('Changelog Data Destructuring', () => {
		it('destructures version from changelog data', () => {
			expect(content).toContain('version')
			expect(content).toContain('changelog.data')
		})

		it('destructures date from changelog data', () => {
			expect(content).toContain('date')
		})

		it('destructures type from changelog data', () => {
			expect(content).toContain('type')
		})

		it('destructures description from changelog data', () => {
			expect(content).toContain('description')
		})

		it('uses single destructuring statement for data', () => {
			expect(content).toContain('const {')
			expect(content).toContain('version,')
			expect(content).toContain('date,')
			expect(content).toContain('type,')
			expect(content).toContain('description')
			expect(content).toContain('} = changelog.data')
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
				'const { changelog } = Astro.props',
			)
			const renderIndex = content.indexOf('await changelog.render()')

			expect(importIndex).toBeLessThan(getStaticPathsIndex)
			expect(getStaticPathsIndex).toBeLessThan(interfaceIndex)
			expect(interfaceIndex).toBeLessThan(propsIndex)
			expect(propsIndex).toBeLessThan(renderIndex)
		})
	})

	describe('Layout Props', () => {
		it('passes version as string from changelog data', () => {
			expect(content).toContain('version={version}')
		})

		it('passes date for formatting', () => {
			expect(content).toContain('date={date}')
		})

		it('passes type for badge display', () => {
			expect(content).toContain('type={type}')
		})

		it('passes description for meta', () => {
			expect(content).toContain('description={description}')
		})
	})
})
