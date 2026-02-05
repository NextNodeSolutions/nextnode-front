import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for Wrapper.astro component
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required configurations.
 */

const wrapperComponentPath = join(
	process.cwd(),
	'src/components/fundations/containers/Wrapper.astro',
)
const wrapperContent = readFileSync(wrapperComponentPath, 'utf-8')

describe('Wrapper.astro', () => {
	describe('TypeScript interface', () => {
		it('exports WrapperVariant type', () => {
			expect(wrapperContent).toContain('export type WrapperVariant')
		})

		it('has Props interface', () => {
			expect(wrapperContent).toContain('interface Props')
		})

		it('extends HTMLAttributes', () => {
			expect(wrapperContent).toContain("HTMLAttributes<'div'>")
		})

		it('has variant prop with WrapperVariant type', () => {
			expect(wrapperContent).toContain('variant?: WrapperVariant')
		})

		it('has class prop', () => {
			expect(wrapperContent).toContain('class?: string')
		})

		it('has id prop', () => {
			expect(wrapperContent).toContain('id?: string')
		})
	})

	describe('variants', () => {
		it('supports standard variant', () => {
			expect(wrapperContent).toContain("'standard'")
		})

		it('supports narrow variant', () => {
			expect(wrapperContent).toContain("'narrow'")
		})

		it('supports prose variant', () => {
			expect(wrapperContent).toContain("'prose'")
		})

		it('has variantClasses Record with all variants', () => {
			expect(wrapperContent).toMatch(
				/variantClasses:\s*Record<WrapperVariant,\s*string>/,
			)
		})

		it('defaults to standard variant', () => {
			expect(wrapperContent).toContain("variant = 'standard'")
		})
	})

	describe('max-width values', () => {
		it('standard variant uses max-w-7xl', () => {
			expect(wrapperContent).toContain('max-w-7xl')
		})

		it('narrow variant uses max-w-2xl', () => {
			expect(wrapperContent).toContain('max-w-2xl')
		})

		it('all variants use mx-auto for centering', () => {
			expect(wrapperContent).toContain('mx-auto')
		})

		it('includes px-4 horizontal padding', () => {
			expect(wrapperContent).toContain('px-4')
		})
	})

	describe('prose variant', () => {
		it('includes prose class', () => {
			expect(wrapperContent).toMatch(/prose(?:\s|')/)
		})

		it('sets text color for paragraphs', () => {
			expect(wrapperContent).toContain('prose-p:text-slate-700')
		})

		it('sets heading styles', () => {
			expect(wrapperContent).toContain('prose-headings:text-slate-900')
			expect(wrapperContent).toContain('prose-headings:font-light')
		})

		it('sets link styles', () => {
			expect(wrapperContent).toContain('prose-a:!text-nextnode-600')
		})

		it('sets code block styles', () => {
			expect(wrapperContent).toContain('prose-code:text-slate-800')
			expect(wrapperContent).toContain('prose-pre:rounded-none')
			expect(wrapperContent).toContain('prose-pre:border')
		})

		it('sets list styles', () => {
			expect(wrapperContent).toContain('prose-ol:text-slate-700')
			expect(wrapperContent).toContain('prose-li:text-slate-700')
			expect(wrapperContent).toContain('prose-ul:text-slate-700')
		})
	})

	describe('slots', () => {
		it('has default slot for content', () => {
			expect(wrapperContent).toContain('<slot />')
		})
	})

	describe('rendering', () => {
		it('renders as div element', () => {
			expect(wrapperContent).toContain('<div')
		})

		it('applies classes to div', () => {
			expect(wrapperContent).toContain('class={classes}')
		})

		it('applies id to div', () => {
			expect(wrapperContent).toContain('id={id}')
		})

		it('spreads rest props', () => {
			expect(wrapperContent).toContain('{...rest}')
		})

		it('combines variant and extra classes', () => {
			expect(wrapperContent).toContain('variantClasses[variant]')
			expect(wrapperContent).toContain('extraClass')
		})
	})
})
