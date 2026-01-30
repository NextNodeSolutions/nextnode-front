import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for Menu.astro icon component
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required patterns.
 */

const menuComponentPath = join(
	process.cwd(),
	'src/components/fundations/icons/Menu.astro',
)
const menuContent = readFileSync(menuComponentPath, 'utf-8')

describe('Menu.astro', () => {
	describe('SVG structure', () => {
		it('is a valid SVG element', () => {
			expect(menuContent).toContain('<svg')
			expect(menuContent).toContain('</svg>')
		})

		it('has xmlns attribute for SVG namespace', () => {
			expect(menuContent).toContain('xmlns="http://www.w3.org/2000/svg"')
		})

		it('has viewBox attribute', () => {
			expect(menuContent).toContain('viewBox="0 0 256 256"')
		})

		it('uses currentColor for fill', () => {
			expect(menuContent).toContain('fill="currentColor"')
		})

		it('contains path element for hamburger menu icon', () => {
			expect(menuContent).toContain('<path')
			// Three horizontal lines pattern (hamburger menu)
			expect(menuContent).toMatch(/d="[^"]*"/)
		})
	})

	describe('TypeScript interface', () => {
		it('exports IconSize type', () => {
			expect(menuContent).toContain('export type IconSize')
		})

		it('exports Props interface', () => {
			expect(menuContent).toContain('export interface Props')
		})

		it('extends HTMLAttributes<svg>', () => {
			expect(menuContent).toContain("HTMLAttributes<'svg'>")
		})

		it('has size prop of type IconSize', () => {
			expect(menuContent).toMatch(/size\??: IconSize/)
		})

		it('has class prop', () => {
			expect(menuContent).toMatch(/class\??: string/)
		})
	})

	describe('size props', () => {
		it('has default size of base', () => {
			expect(menuContent).toContain("size = 'base'")
		})

		it('supports xs size (size-3)', () => {
			expect(menuContent).toContain("xs: 'size-3'")
		})

		it('supports sm size (size-4)', () => {
			expect(menuContent).toContain("sm: 'size-4'")
		})

		it('supports base size (size-5)', () => {
			expect(menuContent).toContain("base: 'size-5'")
		})

		it('supports md size (size-6)', () => {
			expect(menuContent).toContain("md: 'size-6'")
		})

		it('supports lg size (size-7)', () => {
			expect(menuContent).toContain("lg: 'size-7'")
		})

		it('supports xl size (size-8)', () => {
			expect(menuContent).toContain("xl: 'size-8'")
		})
	})

	describe('class handling', () => {
		it('uses class:list for class composition', () => {
			expect(menuContent).toContain('class:list=')
		})

		it('includes icon base class', () => {
			expect(menuContent).toMatch(/class:list=\{?\[['"]icon['"]/)
		})

		it('accepts custom className', () => {
			expect(menuContent).toContain('class: className')
			expect(menuContent).toContain('className')
		})
	})

	describe('prop spreading', () => {
		it('uses rest props for additional SVG attributes', () => {
			expect(menuContent).toContain('...rest')
			expect(menuContent).toContain('{...rest}')
		})
	})
})
