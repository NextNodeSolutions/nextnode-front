import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for Logo.astro component
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required patterns.
 */

const logoComponentPath = join(
	process.cwd(),
	'src/components/assets/Logo.astro',
)
const logoContent = readFileSync(logoComponentPath, 'utf-8')

describe('Logo.astro', () => {
	describe('SVG structure', () => {
		it('is a valid SVG element', () => {
			expect(logoContent).toContain('<svg')
			expect(logoContent).toContain('</svg>')
		})

		it('has xmlns attribute for SVG namespace', () => {
			expect(logoContent).toContain('xmlns="http://www.w3.org/2000/svg"')
		})

		it('has viewBox attribute', () => {
			expect(logoContent).toContain('viewBox="0 0 180 40"')
		})

		it('contains logo mark and wordmark elements', () => {
			expect(logoContent).toContain('<circle')
			expect(logoContent).toContain('<path')
		})
	})

	describe('TypeScript interface', () => {
		it('exports LogoSize type', () => {
			expect(logoContent).toContain('export type LogoSize')
		})

		it('exports LogoVariant type', () => {
			expect(logoContent).toContain('export type LogoVariant')
		})

		it('exports Props interface', () => {
			expect(logoContent).toContain('export interface Props')
		})

		it('extends HTMLAttributes<svg>', () => {
			expect(logoContent).toContain("HTMLAttributes<'svg'>")
		})

		it('has size prop of type LogoSize', () => {
			expect(logoContent).toMatch(/size\??: LogoSize/)
		})

		it('has variant prop of type LogoVariant', () => {
			expect(logoContent).toMatch(/variant\??: LogoVariant/)
		})

		it('has class prop', () => {
			expect(logoContent).toMatch(/class\??: string/)
		})
	})

	describe('size props', () => {
		it('has default size of md', () => {
			expect(logoContent).toContain("size = 'md'")
		})

		it('supports sm size (h-6)', () => {
			expect(logoContent).toContain("sm: 'h-6'")
		})

		it('supports md size (h-8)', () => {
			expect(logoContent).toContain("md: 'h-8'")
		})

		it('supports lg size (h-12)', () => {
			expect(logoContent).toContain("lg: 'h-12'")
		})
	})

	describe('variant props', () => {
		it('has default variant of dark', () => {
			expect(logoContent).toContain("variant = 'dark'")
		})

		it('supports light variant', () => {
			expect(logoContent).toContain('light:')
		})

		it('supports dark variant', () => {
			expect(logoContent).toContain('dark:')
		})

		it('light variant uses white text fill', () => {
			expect(logoContent).toContain("text: 'fill-white'")
		})

		it('dark variant uses base-950 text fill', () => {
			expect(logoContent).toContain("text: 'fill-base-950'")
		})

		it('light variant uses nextnode-300 accent', () => {
			expect(logoContent).toContain("accent: 'fill-nextnode-300'")
		})

		it('dark variant uses nextnode-500 accent', () => {
			expect(logoContent).toContain("accent: 'fill-nextnode-500'")
		})
	})

	describe('class handling', () => {
		it('uses class:list for class composition', () => {
			expect(logoContent).toContain('class:list=')
		})

		it('includes logo base class', () => {
			expect(logoContent).toMatch(/class:list=\{?\[['"]logo['"]/)
		})

		it('accepts custom className', () => {
			expect(logoContent).toContain('class: className')
			expect(logoContent).toContain('className')
		})
	})

	describe('prop spreading', () => {
		it('uses rest props for additional SVG attributes', () => {
			expect(logoContent).toContain('...rest')
			expect(logoContent).toContain('{...rest}')
		})
	})

	describe('NextNode branding', () => {
		it('uses NextNode color tokens', () => {
			expect(logoContent).toContain('nextnode-')
		})

		it('does not use buio branding', () => {
			expect(logoContent).not.toContain('buio')
		})
	})
})
