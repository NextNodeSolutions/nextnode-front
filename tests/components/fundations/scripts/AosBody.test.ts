import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for AosBody.astro component
 *
 * Since Astro components are compiled at build time,
 * we test the source file to ensure it imports AOS JS from npm
 * and initializes with proper configuration.
 */

const componentPath = join(
	process.cwd(),
	'src/components/fundations/scripts/AosBody.astro',
)
const componentContent = readFileSync(componentPath, 'utf-8')

describe('AosBody.astro', () => {
	describe('npm import', () => {
		it('imports AOS from node_modules', () => {
			expect(componentContent).toContain("import AOS from 'aos'")
		})

		it('does not use CDN URLs', () => {
			expect(componentContent).not.toContain('unpkg.com')
			expect(componentContent).not.toContain('jsdelivr.net')
			expect(componentContent).not.toContain('cdnjs.cloudflare.com')
		})
	})

	describe('initialization', () => {
		it('calls AOS.init()', () => {
			expect(componentContent).toContain('AOS.init(')
		})

		it('initializes with once: true option', () => {
			expect(componentContent).toContain('once: true')
		})
	})

	describe('documentation', () => {
		it('includes JSDoc comment', () => {
			expect(componentContent).toContain('* AosBody.astro')
		})

		it('references AOS GitHub repository', () => {
			expect(componentContent).toContain(
				'https://github.com/michalsnik/aos',
			)
		})

		it('mentions pairing with AosHead.astro', () => {
			expect(componentContent).toContain('AosHead.astro')
		})
	})

	describe('component structure', () => {
		it('has frontmatter block', () => {
			expect(componentContent).toMatch(/^---/)
		})

		it('has script tag for client-side execution', () => {
			expect(componentContent).toContain('<script>')
			expect(componentContent).toContain('</script>')
		})
	})
})
