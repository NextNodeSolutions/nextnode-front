import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for Text.astro component
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required configurations.
 */

const textComponentPath = join(
	process.cwd(),
	'src/components/fundations/elements/Text.astro',
)
const textContent = readFileSync(textComponentPath, 'utf-8')

describe('Text.astro', () => {
	describe('TypeScript interface', () => {
		it('exports TextTag type', () => {
			expect(textContent).toContain('export type TextTag')
		})

		it('exports TextVariant type', () => {
			expect(textContent).toContain('export type TextVariant')
		})

		it('has Props interface', () => {
			expect(textContent).toContain('interface Props')
		})

		it('Props extends HTMLAttributes', () => {
			expect(textContent).toContain("HTMLAttributes<'p'>")
		})
	})

	describe('HTML tags', () => {
		const expectedTags = [
			'a',
			'p',
			'em',
			'span',
			'small',
			'strong',
			'blockquote',
			'h1',
			'h2',
			'h3',
			'h4',
			'h5',
			'h6',
		]

		it.each(expectedTags)('supports %s tag', tag => {
			expect(textContent).toContain(`'${tag}'`)
		})

		it('defaults to p tag', () => {
			expect(textContent).toContain("tag: Tag = 'p'")
		})
	})

	describe('display variants', () => {
		const displayVariants = [
			'display6XL',
			'display5XL',
			'display4XL',
			'display3XL',
			'display2XL',
			'displayXL',
			'displayLG',
			'displayMD',
			'displaySM',
			'displayXS',
		]

		it.each(displayVariants)('supports %s variant', variant => {
			expect(textContent).toContain(`${variant}:`)
		})

		it('display variants have responsive classes', () => {
			// display6XL should have sm:, md:, lg: breakpoints
			expect(textContent).toMatch(
				/display6XL:.*sm:text-.*md:text-.*lg:text-/,
			)
		})
	})

	describe('text variants', () => {
		const textVariants = [
			'textXL',
			'textLG',
			'textBase',
			'textSM',
			'textXS',
		]

		it.each(textVariants)('supports %s variant', variant => {
			expect(textContent).toContain(`${variant}:`)
		})
	})

	describe('variant count', () => {
		it('has at least 14 variants', () => {
			const variantMatches = textContent.match(
				/\|\s*'(display|text)\w+'/g,
			)
			expect(variantMatches?.length).toBeGreaterThanOrEqual(14)
		})
	})

	describe('textStyles configuration', () => {
		it('has textStyles Record with TextVariant keys', () => {
			expect(textContent).toMatch(
				/textStyles:\s*Record<TextVariant,\s*string>/,
			)
		})

		it('uses Tailwind text size classes', () => {
			expect(textContent).toContain('text-base')
			expect(textContent).toContain('text-sm')
			expect(textContent).toContain('text-xs')
			expect(textContent).toContain('text-xl')
		})
	})

	describe('slots', () => {
		it('has default slot for text content', () => {
			expect(textContent).toContain('<slot />')
		})

		it('has left-icon slot', () => {
			expect(textContent).toContain('<slot name="left-icon" />')
		})

		it('has right-icon slot', () => {
			expect(textContent).toContain('<slot name="right-icon" />')
		})
	})

	describe('class handling', () => {
		it('accepts class prop', () => {
			expect(textContent).toContain('class?: string')
		})

		it('combines base classes with custom classes', () => {
			expect(textContent).toContain('combinedClasses')
		})

		it('uses class on the element', () => {
			expect(textContent).toMatch(/<Tag\s+class=/)
		})
	})

	describe('font configuration', () => {
		it('does not reference external CDN URLs', () => {
			expect(textContent).not.toContain('googleapis.com')
			expect(textContent).not.toContain('fonts.google.com')
			expect(textContent).not.toContain('cdnjs.cloudflare.com')
		})
	})

	describe('props spreading', () => {
		it('spreads remaining props to element', () => {
			expect(textContent).toContain('{...rest}')
		})
	})
})
