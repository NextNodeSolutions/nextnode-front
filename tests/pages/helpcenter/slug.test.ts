import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

describe('Help Center Article Page ([...slug])', () => {
	const filePath = join(process.cwd(), 'src/pages/helpcenter/[...slug].astro')
	const content = readFileSync(filePath, 'utf-8')

	describe('Layout Integration', () => {
		it('uses HelpCenterLayout', () => {
			expect(content).toContain(
				"import HelpCenterLayout from '@/layouts/HelpCenterLayout.astro'",
			)
		})

		it('wraps content in HelpCenterLayout', () => {
			expect(content).toContain('<HelpCenterLayout')
			expect(content).toContain('</HelpCenterLayout>')
		})

		it('passes title prop to layout', () => {
			expect(content).toContain('title={title}')
		})

		it('passes description prop to layout', () => {
			expect(content).toContain('description={description}')
		})

		it('passes category prop to layout', () => {
			expect(content).toContain('category={category}')
		})

		it('passes categories prop to layout', () => {
			expect(content).toContain('categories={categories}')
		})

		it('passes pubDate prop to layout', () => {
			expect(content).toContain('pubDate={pubDate}')
		})

		it('passes lastUpdated prop to layout', () => {
			expect(content).toContain('lastUpdated={lastUpdated}')
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

		it('imports HelpCategory type from layout', () => {
			expect(content).toContain(
				"import type { HelpCategory } from '@/layouts/HelpCenterLayout.astro'",
			)
		})
	})

	describe('Static Paths Generation', () => {
		it('exports getStaticPaths function', () => {
			expect(content).toContain('export async function getStaticPaths()')
		})

		it('stores articles in allArticles variable', () => {
			expect(content).toContain(
				"const allArticles = await getCollection('helpcenter')",
			)
		})

		it('maps articles to paths', () => {
			expect(content).toContain('allArticles.map')
		})

		it('returns params with slug', () => {
			expect(content).toContain('params: { slug: article.slug }')
		})

		it('returns props with article', () => {
			expect(content).toContain('props: { article, categories }')
		})
	})

	describe('Category Sidebar Navigation', () => {
		it('builds category map from articles', () => {
			expect(content).toContain('const categoryMap = allArticles.reduce')
		})

		it('uses proper TypeScript type for reduce', () => {
			expect(content).toContain('reduce<Record<string, number>>')
		})

		it('counts articles per category', () => {
			expect(content).toContain(
				'acc[category] = (acc[category] || 0) + 1',
			)
		})

		it('creates HelpCategory array from map', () => {
			expect(content).toContain('const categories: HelpCategory[]')
		})

		it('sorts categories alphabetically', () => {
			expect(content).toContain('a.localeCompare(b)')
		})

		it('generates category id from name', () => {
			expect(content).toContain(
				"id: name.toLowerCase().replace(/\\s+/g, '-')",
			)
		})

		it('includes article count in category', () => {
			expect(content).toContain('articleCount: count')
		})
	})

	describe('Props Interface', () => {
		it('defines Props interface', () => {
			expect(content).toContain('interface Props')
		})

		it('includes article prop type', () => {
			expect(content).toContain(
				"article: Awaited<ReturnType<typeof getCollection<'helpcenter'>>>[number]",
			)
		})

		it('includes categories prop type', () => {
			expect(content).toContain('categories: HelpCategory[]')
		})

		it('destructures article from props', () => {
			expect(content).toContain(
				'const { article, categories } = Astro.props',
			)
		})
	})

	describe('MDX Content Rendering', () => {
		it('renders article content', () => {
			expect(content).toContain('await article.render()')
		})

		it('destructures Content from render result', () => {
			expect(content).toContain(
				'const { Content } = await article.render()',
			)
		})

		it('uses Content component in layout', () => {
			expect(content).toContain('<Content />')
		})
	})

	describe('Article Data Destructuring', () => {
		it('destructures title from article data', () => {
			expect(content).toContain('title')
			expect(content).toContain('article.data')
		})

		it('destructures description from article data', () => {
			expect(content).toContain('description')
		})

		it('destructures category from article data', () => {
			expect(content).toContain('category')
		})

		it('destructures pubDate from article data', () => {
			expect(content).toContain('pubDate')
		})

		it('destructures lastUpdated from article data', () => {
			expect(content).toContain('lastUpdated')
		})

		it('uses single destructuring statement for data', () => {
			expect(content).toContain(
				'const { title, description, category, pubDate, lastUpdated } = article.data',
			)
		})
	})

	describe('TypeScript', () => {
		it('has file comment documenting purpose', () => {
			expect(content).toContain('Help Center Article Page')
		})

		it('mentions dynamic route in comment', () => {
			expect(content).toContain('Dynamic route')
		})

		it('mentions MDX content in comment', () => {
			expect(content).toContain('MDX content')
		})

		it('mentions static paths in comment', () => {
			expect(content).toContain('static paths')
		})
	})

	describe('Code Structure', () => {
		it('has frontmatter delimiters', () => {
			const frontmatterMatches = content.match(/---/g)
			expect(frontmatterMatches?.length).toBe(2)
		})

		it('imports are at the top of frontmatter', () => {
			const importIndex = content.indexOf('import {')
			const frontmatterStart = content.indexOf('---')
			expect(importIndex).toBeGreaterThan(frontmatterStart)
		})

		it('getStaticPaths is exported', () => {
			expect(content).toContain('export async function getStaticPaths')
		})
	})
})
