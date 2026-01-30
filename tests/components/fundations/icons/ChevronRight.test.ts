import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for ChevronRight.astro icon component
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required patterns.
 */

const chevronRightComponentPath = join(
	process.cwd(),
	'src/components/fundations/icons/ChevronRight.astro',
)
const chevronRightContent = readFileSync(chevronRightComponentPath, 'utf-8')

describe('ChevronRight.astro', () => {
	describe('SVG structure', () => {
		it('is a valid SVG element', () => {
			expect(chevronRightContent).toContain('<svg')
			expect(chevronRightContent).toContain('</svg>')
		})

		it('has xmlns attribute for SVG namespace', () => {
			expect(chevronRightContent).toContain(
				'xmlns="http://www.w3.org/2000/svg"',
			)
		})

		it('has viewBox attribute', () => {
			expect(chevronRightContent).toContain('viewBox="0 0 256 256"')
		})

		it('uses currentColor for fill', () => {
			expect(chevronRightContent).toContain('fill="currentColor"')
		})

		it('contains path element for chevron right icon', () => {
			expect(chevronRightContent).toContain('<path')
			// Chevron right arrow pattern
			expect(chevronRightContent).toMatch(/d="[^"]*"/)
		})
	})

	describe('TypeScript interface', () => {
		it('exports IconSize type', () => {
			expect(chevronRightContent).toContain('export type IconSize')
		})

		it('exports Props interface', () => {
			expect(chevronRightContent).toContain('export interface Props')
		})

		it('extends HTMLAttributes<svg>', () => {
			expect(chevronRightContent).toContain("HTMLAttributes<'svg'>")
		})

		it('has size prop of type IconSize', () => {
			expect(chevronRightContent).toMatch(/size\??: IconSize/)
		})

		it('has class prop', () => {
			expect(chevronRightContent).toMatch(/class\??: string/)
		})
	})

	describe('size props', () => {
		it('has default size of base', () => {
			expect(chevronRightContent).toContain("size = 'base'")
		})

		it('supports xs size (size-3)', () => {
			expect(chevronRightContent).toContain("xs: 'size-3'")
		})

		it('supports sm size (size-4)', () => {
			expect(chevronRightContent).toContain("sm: 'size-4'")
		})

		it('supports base size (size-5)', () => {
			expect(chevronRightContent).toContain("base: 'size-5'")
		})

		it('supports md size (size-6)', () => {
			expect(chevronRightContent).toContain("md: 'size-6'")
		})

		it('supports lg size (size-7)', () => {
			expect(chevronRightContent).toContain("lg: 'size-7'")
		})

		it('supports xl size (size-8)', () => {
			expect(chevronRightContent).toContain("xl: 'size-8'")
		})
	})

	describe('class handling', () => {
		it('uses class:list for class composition', () => {
			expect(chevronRightContent).toContain('class:list=')
		})

		it('includes icon base class', () => {
			expect(chevronRightContent).toMatch(/class:list=\{?\[['"]icon['"]/)
		})

		it('accepts custom className', () => {
			expect(chevronRightContent).toContain('class: className')
			expect(chevronRightContent).toContain('className')
		})
	})

	describe('prop spreading', () => {
		it('uses rest props for additional SVG attributes', () => {
			expect(chevronRightContent).toContain('...rest')
			expect(chevronRightContent).toContain('{...rest}')
		})
	})
})
