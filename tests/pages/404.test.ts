import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for 404.astro (error page)
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required patterns.
 */

const pagePath = join(process.cwd(), 'src/pages/404.astro')
const pageContent = readFileSync(pagePath, 'utf-8')

describe('404.astro (error page)', () => {
	describe('file structure', () => {
		it('has frontmatter delimiters', () => {
			expect(pageContent).toMatch(/^---\n/)
			expect(pageContent).toContain('---')
		})

		it('has JSDoc comment', () => {
			expect(pageContent).toContain('404.astro')
			expect(pageContent).toContain('404 error page')
		})
	})

	describe('layout integration', () => {
		it('imports BaseLayout', () => {
			expect(pageContent).toContain(
				"import BaseLayout from '@/layouts/BaseLayout.astro'",
			)
		})

		it('uses BaseLayout as root element', () => {
			expect(pageContent).toContain('<BaseLayout')
			expect(pageContent).toContain('</BaseLayout>')
		})

		it('passes title prop to BaseLayout', () => {
			expect(pageContent).toContain('title="Page Not Found')
		})

		it('passes description prop to BaseLayout', () => {
			expect(pageContent).toContain('description=')
			expect(pageContent).toContain('could not be found')
		})
	})

	describe('component imports', () => {
		it('imports Text component', () => {
			expect(pageContent).toContain(
				"import Text from '@/components/fundations/elements/Text.astro'",
			)
		})

		it('imports Button component', () => {
			expect(pageContent).toContain(
				"import Button from '@/components/fundations/elements/Button.astro'",
			)
		})

		it('imports Wrapper component', () => {
			expect(pageContent).toContain(
				"import Wrapper from '@/components/fundations/containers/Wrapper.astro'",
			)
		})
	})

	describe('page structure', () => {
		it('has a section element', () => {
			expect(pageContent).toContain('<section')
		})

		it('uses Wrapper component', () => {
			expect(pageContent).toContain('<Wrapper')
		})

		it('uses standard variant for main wrapper', () => {
			expect(pageContent).toContain('variant="standard"')
		})

		it('uses prose variant for content', () => {
			expect(pageContent).toContain('variant="prose"')
		})
	})

	describe('error message content', () => {
		it('displays 404 error heading', () => {
			expect(pageContent).toContain('Error 404')
		})

		it('has friendly error message', () => {
			expect(pageContent).toContain('uncharted')
			expect(pageContent).toContain('territory')
		})

		it('has explanatory paragraph', () => {
			expect(pageContent).toContain("page you're looking for")
			expect(pageContent).toContain('gone missing')
		})

		it('has list of helpful suggestions', () => {
			expect(pageContent).toContain('<ul>')
			expect(pageContent).toContain('<li>')
		})

		it('suggests visiting homepage', () => {
			expect(pageContent).toContain('href="/"')
			expect(pageContent).toContain('homepage')
		})

		it('suggests using search feature', () => {
			expect(pageContent).toContain('search')
			expect(pageContent).toContain('feature')
		})

		it('suggests reading articles', () => {
			expect(pageContent).toContain('articles')
		})

		it('suggests contacting support', () => {
			expect(pageContent).toContain('support team')
			expect(pageContent).toContain('href="/contact"')
		})

		it('ends with encouraging message', () => {
			expect(pageContent).toContain('Stay curious')
		})
	})

	describe('homepage link button', () => {
		it('has Button component for home link', () => {
			expect(pageContent).toContain('<Button')
		})

		it('button is a link (isLink prop)', () => {
			expect(pageContent).toContain('isLink')
		})

		it('links to homepage', () => {
			expect(pageContent).toMatch(/Button[\s\S]*?href="\/"/m)
		})

		it('uses muted variant', () => {
			expect(pageContent).toContain('variant="muted"')
		})

		it('uses base size', () => {
			expect(pageContent).toContain('size="base"')
		})

		it('has "Go back home" text', () => {
			expect(pageContent).toContain('Go back home')
		})
	})

	describe('typography', () => {
		it('uses Text component for heading', () => {
			expect(pageContent).toContain('<Text')
			expect(pageContent).toContain('tag="h1"')
		})

		it('uses display2XL variant for heading', () => {
			expect(pageContent).toContain('variant="display2XL"')
		})

		it('uses Text component for subheading', () => {
			expect(pageContent).toContain('tag="p"')
			expect(pageContent).toContain('variant="textBase"')
		})

		it('uses text-balance for heading', () => {
			expect(pageContent).toContain('text-balance')
		})

		it('uses font-display for heading', () => {
			expect(pageContent).toContain('font-display')
		})
	})

	describe('styling', () => {
		it('uses gradient background on section', () => {
			expect(pageContent).toContain('bg-gradient-up')
		})

		it('uses white text color', () => {
			expect(pageContent).toContain('text-white')
		})

		it('uses responsive grid layout', () => {
			expect(pageContent).toContain('grid-cols-1')
			expect(pageContent).toContain('sm:grid-cols-2')
			expect(pageContent).toContain('md:grid-cols-4')
		})

		it('centers content with column span', () => {
			expect(pageContent).toContain('md:col-span-2')
			expect(pageContent).toContain('md:col-start-2')
		})

		it('has vertical padding', () => {
			expect(pageContent).toContain('py-42')
		})

		it('has margin top on content sections', () => {
			expect(pageContent).toContain('mt-12')
			expect(pageContent).toContain('mt-8')
		})
	})

	describe('TypeScript', () => {
		it('has TypeScript frontmatter', () => {
			const frontmatterMatch = pageContent.match(/^---\n([\s\S]*?)\n---/)
			expect(frontmatterMatch).toBeTruthy()
		})

		it('uses path alias for imports', () => {
			expect(pageContent).toContain("from '@/")
		})
	})

	describe('accessibility', () => {
		it('has proper heading hierarchy (h1)', () => {
			expect(pageContent).toContain('tag="h1"')
		})

		it('links have descriptive text', () => {
			expect(pageContent).toContain('>homepage</a>')
			expect(pageContent).toContain('>support team</a>')
		})
	})

	describe('NextNode branding', () => {
		it('mentions NextNode in title', () => {
			expect(pageContent).toContain('NextNode')
		})

		it('uses NextNode color scheme via gradient', () => {
			expect(pageContent).toContain('bg-gradient-up')
		})
	})
})
