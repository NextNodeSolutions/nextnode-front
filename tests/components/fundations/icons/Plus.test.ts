import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for Plus.astro icon component
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required patterns.
 */

const plusComponentPath = join(
	process.cwd(),
	'src/components/fundations/icons/Plus.astro',
)
const plusContent = readFileSync(plusComponentPath, 'utf-8')

describe('Plus.astro', () => {
	describe('SVG structure', () => {
		it('is a valid SVG element', () => {
			expect(plusContent).toContain('<svg')
			expect(plusContent).toContain('</svg>')
		})

		it('has xmlns attribute for SVG namespace', () => {
			expect(plusContent).toContain('xmlns="http://www.w3.org/2000/svg"')
		})

		it('has viewBox attribute', () => {
			expect(plusContent).toContain('viewBox="0 0 256 256"')
		})

		it('uses currentColor for fill', () => {
			expect(plusContent).toContain('fill="currentColor"')
		})

		it('contains path element for plus icon', () => {
			expect(plusContent).toContain('<path')
			// Plus sign pattern (vertical and horizontal lines)
			expect(plusContent).toMatch(/d="[^"]*"/)
		})
	})

	describe('TypeScript interface', () => {
		it('exports IconSize type', () => {
			expect(plusContent).toContain('export type IconSize')
		})

		it('exports Props interface', () => {
			expect(plusContent).toContain('export interface Props')
		})

		it('extends HTMLAttributes<svg>', () => {
			expect(plusContent).toContain("HTMLAttributes<'svg'>")
		})

		it('has size prop of type IconSize', () => {
			expect(plusContent).toMatch(/size\??: IconSize/)
		})

		it('has class prop', () => {
			expect(plusContent).toMatch(/class\??: string/)
		})
	})

	describe('size props', () => {
		it('has default size of base', () => {
			expect(plusContent).toContain("size = 'base'")
		})

		it('supports xs size (size-3)', () => {
			expect(plusContent).toContain("xs: 'size-3'")
		})

		it('supports sm size (size-4)', () => {
			expect(plusContent).toContain("sm: 'size-4'")
		})

		it('supports base size (size-5)', () => {
			expect(plusContent).toContain("base: 'size-5'")
		})

		it('supports md size (size-6)', () => {
			expect(plusContent).toContain("md: 'size-6'")
		})

		it('supports lg size (size-7)', () => {
			expect(plusContent).toContain("lg: 'size-7'")
		})

		it('supports xl size (size-8)', () => {
			expect(plusContent).toContain("xl: 'size-8'")
		})
	})

	describe('class handling', () => {
		it('uses class:list for class composition', () => {
			expect(plusContent).toContain('class:list=')
		})

		it('includes icon base class', () => {
			expect(plusContent).toMatch(/class:list=\{?\[['"]icon['"]/)
		})

		it('accepts custom className', () => {
			expect(plusContent).toContain('class: className')
			expect(plusContent).toContain('className')
		})
	})

	describe('prop spreading', () => {
		it('uses rest props for additional SVG attributes', () => {
			expect(plusContent).toContain('...rest')
			expect(plusContent).toContain('{...rest}')
		})
	})
})
