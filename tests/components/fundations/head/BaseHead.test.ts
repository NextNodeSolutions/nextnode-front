import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for BaseHead.astro component
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required elements.
 */

const baseHeadComponentPath = join(
	process.cwd(),
	'src/components/fundations/head/BaseHead.astro',
)
const baseHeadContent = readFileSync(baseHeadComponentPath, 'utf-8')

describe('BaseHead.astro', () => {
	describe('meta tags', () => {
		it('includes charset meta tag', () => {
			expect(baseHeadContent).toContain('charset=')
			expect(baseHeadContent).toMatch(/<meta\s+charset=/)
		})

		it('includes viewport meta tag', () => {
			expect(baseHeadContent).toContain('name="viewport"')
			expect(baseHeadContent).toMatch(/<meta\s+name="viewport"/)
		})

		it('has default charset value of utf-8', () => {
			expect(baseHeadContent).toContain("charset = 'utf-8'")
		})

		it('has default viewport value for responsive design', () => {
			expect(baseHeadContent).toContain('width=device-width')
			expect(baseHeadContent).toContain('initial-scale=1')
		})
	})

	describe('TypeScript props interface', () => {
		it('exports Props interface', () => {
			expect(baseHeadContent).toMatch(/export\s+interface\s+Props/)
		})

		it('has charset prop with optional type', () => {
			expect(baseHeadContent).toMatch(/charset\?:\s*string/)
		})

		it('has viewport prop with optional type', () => {
			expect(baseHeadContent).toMatch(/viewport\?:\s*string/)
		})
	})

	describe('head components', () => {
		it('imports Fonts component', () => {
			expect(baseHeadContent).toContain(
				"import Fonts from '@/components/fundations/head/Fonts.astro'",
			)
		})

		it('renders Fonts component', () => {
			expect(baseHeadContent).toContain('<Fonts />')
		})
	})

	describe('documentation', () => {
		it('has component documentation', () => {
			expect(baseHeadContent).toContain('BaseHead.astro')
			expect(baseHeadContent).toContain('Base head component')
		})

		it('documents included components', () => {
			expect(baseHeadContent).toContain('Fonts')
		})
	})
})
