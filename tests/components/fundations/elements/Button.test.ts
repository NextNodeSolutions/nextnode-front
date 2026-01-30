import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for Button.astro component
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required configurations.
 */

const buttonComponentPath = join(
	process.cwd(),
	'src/components/fundations/elements/Button.astro',
)
const buttonContent = readFileSync(buttonComponentPath, 'utf-8')

describe('Button.astro', () => {
	describe('TypeScript interface', () => {
		it('exports ButtonVariant type', () => {
			expect(buttonContent).toContain('export type ButtonVariant')
		})

		it('exports ButtonSize type', () => {
			expect(buttonContent).toContain('export type ButtonSize')
		})

		it('exports ButtonGap type', () => {
			expect(buttonContent).toContain('export type ButtonGap')
		})

		it('has Props interface', () => {
			expect(buttonContent).toContain('interface Props')
		})
	})

	describe('variants', () => {
		it('supports default variant', () => {
			expect(buttonContent).toContain("'default'")
			expect(buttonContent).toContain('defaultClass')
		})

		it('supports accent variant', () => {
			expect(buttonContent).toContain("'accent'")
			expect(buttonContent).toContain('accentClass')
		})

		it('supports muted variant', () => {
			expect(buttonContent).toContain("'muted'")
			expect(buttonContent).toContain('mutedClass')
		})

		it('supports link variant', () => {
			expect(buttonContent).toContain("'link'")
		})

		it('supports none variant', () => {
			expect(buttonContent).toContain("'none'")
		})

		it('has variantClass mapping for all variants', () => {
			expect(buttonContent).toMatch(
				/variantClass:\s*Record<ButtonVariant,\s*string\[\]>/,
			)
		})
	})

	describe('sizes', () => {
		const expectedSizes = ['xxs', 'xs', 'sm', 'base', 'md', 'lg', 'xl']

		it.each(expectedSizes)('supports %s size', size => {
			expect(buttonContent).toContain(`${size}:`)
		})

		it('has sizes Record with all ButtonSize keys', () => {
			expect(buttonContent).toMatch(
				/sizes:\s*Record<ButtonSize,\s*string\[\]>/,
			)
		})

		it('has iconSizes Record for icon-only mode', () => {
			expect(buttonContent).toMatch(
				/iconSizes:\s*Record<ButtonSize,\s*string\[\]>/,
			)
		})
	})

	describe('icon-only mode', () => {
		it('supports iconOnly prop', () => {
			expect(buttonContent).toContain('iconOnly')
		})

		it('has slot for icon in icon-only mode', () => {
			expect(buttonContent).toContain('<slot name="icon" />')
		})

		it('uses iconSizes when iconOnly is true', () => {
			expect(buttonContent).toContain(
				'iconOnly ? iconSizes[size] : sizes[size]',
			)
		})
	})

	describe('link mode', () => {
		it('supports isLink prop', () => {
			expect(buttonContent).toContain('isLink')
		})

		it('supports href prop', () => {
			expect(buttonContent).toContain('href')
		})

		it('renders anchor tag when isLink is true', () => {
			expect(buttonContent).toContain('<a')
			expect(buttonContent).toContain('href={href}')
		})

		it('renders button tag when isLink is false', () => {
			expect(buttonContent).toContain('<button')
		})
	})

	describe('slots', () => {
		it('has default slot for button content', () => {
			expect(buttonContent).toContain('<slot />')
		})

		it('has left-icon slot', () => {
			expect(buttonContent).toContain('<slot name="left-icon" />')
		})

		it('has right-icon slot', () => {
			expect(buttonContent).toContain('<slot name="right-icon" />')
		})
	})

	describe('styling', () => {
		it('uses NextNode color tokens for accent variant', () => {
			expect(buttonContent).toContain('from-accent-700')
			expect(buttonContent).toContain('to-accent-500')
		})

		it('uses base color tokens for default variant', () => {
			expect(buttonContent).toContain('from-base-800')
			expect(buttonContent).toContain('to-base-600')
		})

		it('includes shadow-dimensional class', () => {
			expect(buttonContent).toContain('shadow-dimensional')
		})

		it('has transition classes for animations', () => {
			expect(buttonContent).toContain('transition-colors')
			expect(buttonContent).toContain('duration-500')
		})

		it('uses rounded-full for button shape', () => {
			expect(buttonContent).toContain('rounded-full')
		})
	})

	describe('gap prop', () => {
		const expectedGaps = ['xs', 'sm', 'base', 'md', 'lg']

		it.each(expectedGaps)('supports %s gap', gap => {
			expect(buttonContent).toContain(`${gap}:`)
		})

		it('has gapMap Record', () => {
			expect(buttonContent).toMatch(
				/gapMap:\s*Record<ButtonGap,\s*string\[\]>/,
			)
		})
	})

	describe('accessibility', () => {
		it('includes focus outline styles', () => {
			expect(buttonContent).toContain('focus:outline')
		})

		it('includes outline offset for focus visibility', () => {
			expect(buttonContent).toContain('outline-offset-4')
		})
	})
})
