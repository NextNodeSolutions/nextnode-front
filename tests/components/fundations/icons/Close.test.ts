import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for Close.astro icon component
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required patterns.
 */

const closeComponentPath = join(
	process.cwd(),
	'src/components/fundations/icons/Close.astro',
)
const closeContent = readFileSync(closeComponentPath, 'utf-8')

describe('Close.astro', () => {
	describe('SVG structure', () => {
		it('is a valid SVG element', () => {
			expect(closeContent).toContain('<svg')
			expect(closeContent).toContain('</svg>')
		})

		it('has xmlns attribute for SVG namespace', () => {
			expect(closeContent).toContain('xmlns="http://www.w3.org/2000/svg"')
		})

		it('has viewBox attribute', () => {
			expect(closeContent).toContain('viewBox="0 0 256 256"')
		})

		it('uses currentColor for fill', () => {
			expect(closeContent).toContain('fill="currentColor"')
		})

		it('contains path element for close X icon', () => {
			expect(closeContent).toContain('<path')
			// X pattern path
			expect(closeContent).toMatch(/d="[^"]*"/)
		})
	})

	describe('TypeScript interface', () => {
		it('exports IconSize type', () => {
			expect(closeContent).toContain('export type IconSize')
		})

		it('exports Props interface', () => {
			expect(closeContent).toContain('export interface Props')
		})

		it('extends HTMLAttributes<svg>', () => {
			expect(closeContent).toContain("HTMLAttributes<'svg'>")
		})

		it('has size prop of type IconSize', () => {
			expect(closeContent).toMatch(/size\??: IconSize/)
		})

		it('has class prop', () => {
			expect(closeContent).toMatch(/class\??: string/)
		})
	})

	describe('size props', () => {
		it('has default size of base', () => {
			expect(closeContent).toContain("size = 'base'")
		})

		it('supports xs size (size-3)', () => {
			expect(closeContent).toContain("xs: 'size-3'")
		})

		it('supports sm size (size-4)', () => {
			expect(closeContent).toContain("sm: 'size-4'")
		})

		it('supports base size (size-5)', () => {
			expect(closeContent).toContain("base: 'size-5'")
		})

		it('supports md size (size-6)', () => {
			expect(closeContent).toContain("md: 'size-6'")
		})

		it('supports lg size (size-7)', () => {
			expect(closeContent).toContain("lg: 'size-7'")
		})

		it('supports xl size (size-8)', () => {
			expect(closeContent).toContain("xl: 'size-8'")
		})
	})

	describe('class handling', () => {
		it('uses class:list for class composition', () => {
			expect(closeContent).toContain('class:list=')
		})

		it('includes icon base class', () => {
			expect(closeContent).toMatch(/class:list=\{?\[['"]icon['"]/)
		})

		it('accepts custom className', () => {
			expect(closeContent).toContain('class: className')
			expect(closeContent).toContain('className')
		})
	})

	describe('prop spreading', () => {
		it('uses rest props for additional SVG attributes', () => {
			expect(closeContent).toContain('...rest')
			expect(closeContent).toContain('{...rest}')
		})
	})
})
