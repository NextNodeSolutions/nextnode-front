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
			expect(logoContent).toContain('viewBox="0 0 320 100"')
		})

		it('contains NN icon path and NextNode text', () => {
			expect(logoContent).toContain('<path')
			expect(logoContent).toContain('<text')
			expect(logoContent).toContain('NextNode')
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
			expect(logoContent).toContain("variant === 'light'")
		})

		it('supports dark variant', () => {
			expect(logoContent).toContain("LogoVariant = 'light' | 'dark'")
		})

		it('light variant uses white gradient', () => {
			expect(logoContent).toContain('#FFFFFF')
			expect(logoContent).toContain('#E2E8F0')
			expect(logoContent).toContain('#CBD5E1')
		})

		it('dark variant uses teal gradient', () => {
			expect(logoContent).toContain('#5EEAD4')
			expect(logoContent).toContain('#14B8A6')
			expect(logoContent).toContain('#0D9488')
		})

		it('uses linearGradient for fill', () => {
			expect(logoContent).toContain('<linearGradient')
			expect(logoContent).toContain('gradientId')
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
		it('contains NextNode brand name', () => {
			expect(logoContent).toContain('NextNode')
		})

		it('uses Plus Jakarta Sans font', () => {
			expect(logoContent).toContain('Plus Jakarta Sans')
		})

		it('does not use buio branding', () => {
			expect(logoContent).not.toContain('buio')
		})
	})
})
