import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for AosHead.astro component
 *
 * Since Astro components are compiled at build time,
 * we test the source file to ensure it imports AOS CSS from npm.
 */

const componentPath = join(
	process.cwd(),
	'src/components/fundations/scripts/AosHead.astro',
)
const componentContent = readFileSync(componentPath, 'utf-8')

describe('AosHead.astro', () => {
	describe('npm import', () => {
		it('imports AOS CSS from node_modules', () => {
			expect(componentContent).toContain("import 'aos/dist/aos.css'")
		})

		it('does not use CDN URLs', () => {
			expect(componentContent).not.toContain('unpkg.com')
			expect(componentContent).not.toContain('jsdelivr.net')
			expect(componentContent).not.toContain('cdnjs.cloudflare.com')
		})
	})

	describe('documentation', () => {
		it('includes JSDoc comment', () => {
			expect(componentContent).toContain('* AosHead.astro')
		})

		it('references AOS GitHub repository', () => {
			expect(componentContent).toContain(
				'https://github.com/michalsnik/aos',
			)
		})
	})

	describe('component structure', () => {
		it('has frontmatter block', () => {
			expect(componentContent).toMatch(/^---/)
			expect(componentContent).toMatch(/---\s*$/)
		})

		it('has no template content (head component)', () => {
			// After frontmatter, there should be no template content
			const parts = componentContent.split('---')
			// parts[0] is empty, parts[1] is frontmatter, parts[2] is template
			expect(parts[2]?.trim() || '').toBe('')
		})
	})
})
