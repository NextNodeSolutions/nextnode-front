import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for ChevronLeft.astro icon component
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required patterns.
 */

const chevronLeftComponentPath = join(
	process.cwd(),
	'src/components/fundations/icons/ChevronLeft.astro',
)
const chevronLeftContent = readFileSync(chevronLeftComponentPath, 'utf-8')

describe('ChevronLeft.astro', () => {
	describe('SVG structure', () => {
		it('is a valid SVG element', () => {
			expect(chevronLeftContent).toContain('<svg')
			expect(chevronLeftContent).toContain('</svg>')
		})

		it('has xmlns attribute for SVG namespace', () => {
			expect(chevronLeftContent).toContain(
				'xmlns="http://www.w3.org/2000/svg"',
			)
		})

		it('has viewBox attribute', () => {
			expect(chevronLeftContent).toContain('viewBox="0 0 256 256"')
		})

		it('uses currentColor for fill', () => {
			expect(chevronLeftContent).toContain('fill="currentColor"')
		})

		it('contains path element for chevron left icon', () => {
			expect(chevronLeftContent).toContain('<path')
			// Chevron left arrow pattern
			expect(chevronLeftContent).toMatch(/d="[^"]*"/)
		})
	})

	describe('TypeScript interface', () => {
		it('exports IconSize type', () => {
			expect(chevronLeftContent).toContain('export type IconSize')
		})

		it('exports Props interface', () => {
			expect(chevronLeftContent).toContain('export interface Props')
		})

		it('extends HTMLAttributes<svg>', () => {
			expect(chevronLeftContent).toContain("HTMLAttributes<'svg'>")
		})

		it('has size prop of type IconSize', () => {
			expect(chevronLeftContent).toMatch(/size\??: IconSize/)
		})

		it('has class prop', () => {
			expect(chevronLeftContent).toMatch(/class\??: string/)
		})
	})

	describe('size props', () => {
		it('has default size of base', () => {
			expect(chevronLeftContent).toContain("size = 'base'")
		})

		it('supports xs size (size-3)', () => {
			expect(chevronLeftContent).toContain("xs: 'size-3'")
		})

		it('supports sm size (size-4)', () => {
			expect(chevronLeftContent).toContain("sm: 'size-4'")
		})

		it('supports base size (size-5)', () => {
			expect(chevronLeftContent).toContain("base: 'size-5'")
		})

		it('supports md size (size-6)', () => {
			expect(chevronLeftContent).toContain("md: 'size-6'")
		})

		it('supports lg size (size-7)', () => {
			expect(chevronLeftContent).toContain("lg: 'size-7'")
		})

		it('supports xl size (size-8)', () => {
			expect(chevronLeftContent).toContain("xl: 'size-8'")
		})
	})

	describe('class handling', () => {
		it('uses class:list for class composition', () => {
			expect(chevronLeftContent).toContain('class:list=')
		})

		it('includes icon base class', () => {
			expect(chevronLeftContent).toMatch(/class:list=\{?\[['"]icon['"]/)
		})

		it('accepts custom className', () => {
			expect(chevronLeftContent).toContain('class: className')
			expect(chevronLeftContent).toContain('className')
		})
	})

	describe('prop spreading', () => {
		it('uses rest props for additional SVG attributes', () => {
			expect(chevronLeftContent).toContain('...rest')
			expect(chevronLeftContent).toContain('{...rest}')
		})
	})
})
