import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for Cta1.astro component
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required patterns.
 */

const cta1ComponentPath = join(process.cwd(), 'src/components/ctas/Cta1.astro')
const cta1Content = readFileSync(cta1ComponentPath, 'utf-8')

describe('Cta1.astro', () => {
	describe('component structure', () => {
		it('exists at the expected path', () => {
			expect(cta1Content).toBeTruthy()
		})

		it('is a section element', () => {
			expect(cta1Content).toContain('<section')
		})

		it('uses Wrapper component for layout', () => {
			expect(cta1Content).toContain('import Wrapper')
			expect(cta1Content).toContain('<Wrapper')
		})

		it('has centered text layout', () => {
			expect(cta1Content).toContain('text-center')
		})

		it('has overflow hidden', () => {
			expect(cta1Content).toContain('overflow-hidden')
		})
	})

	describe('foundation components', () => {
		it('imports Text component', () => {
			expect(cta1Content).toContain(
				"import Text from '@/components/fundations/elements/Text.astro'",
			)
		})

		it('imports Button component', () => {
			expect(cta1Content).toContain('import Button')
			expect(cta1Content).toContain(
				'@/components/fundations/elements/Button.astro',
			)
		})

		it('imports ButtonVariant type', () => {
			expect(cta1Content).toContain('type ButtonVariant')
		})

		it('imports Wrapper component', () => {
			expect(cta1Content).toContain(
				"import Wrapper from '@/components/fundations/containers/Wrapper.astro'",
			)
		})

		it('uses Text component for headline', () => {
			expect(cta1Content).toContain('<Text')
			expect(cta1Content).toContain('tag="h2"')
		})

		it('uses Button component for CTA buttons', () => {
			expect(cta1Content).toContain('<Button')
		})
	})

	describe('AOS animations', () => {
		it('has data-aos attribute', () => {
			expect(cta1Content).toContain('data-aos')
		})

		it('has data-aos-duration attribute', () => {
			expect(cta1Content).toContain('data-aos-duration')
		})

		it('has animation prop', () => {
			expect(cta1Content).toContain('animation')
		})

		it('has animationDuration prop', () => {
			expect(cta1Content).toContain('animationDuration')
		})

		it('has default animation value', () => {
			expect(cta1Content).toContain("animation = 'fade-up'")
		})
	})

	describe('NextNode color tokens', () => {
		it('uses base-* color tokens', () => {
			expect(cta1Content).toContain('base-')
		})

		it('uses gradient background class', () => {
			expect(cta1Content).toContain('bg-gradient-down')
		})

		it('uses text-white for light text', () => {
			expect(cta1Content).toContain('text-white')
		})

		it('uses nextnode-500 for highlighted text', () => {
			expect(cta1Content).toContain('text-nextnode-500')
		})

		it('uses border-base-900 for borders', () => {
			expect(cta1Content).toContain('border-base-900')
		})
	})

	describe('TypeScript interface', () => {
		it('exports CtaButton interface', () => {
			expect(cta1Content).toContain('export interface CtaButton')
		})

		it('has Props interface', () => {
			expect(cta1Content).toContain('interface Props')
		})

		it('has buttons prop', () => {
			expect(cta1Content).toContain('buttons?: CtaButton[]')
		})

		it('extends HTMLAttributes for section', () => {
			expect(cta1Content).toContain("HTMLAttributes<'section'>")
		})
	})

	describe('CtaButton interface', () => {
		it('has label property', () => {
			expect(cta1Content).toMatch(/CtaButton[\s\S]*label: string/)
		})

		it('has href property', () => {
			expect(cta1Content).toMatch(/CtaButton[\s\S]*href: string/)
		})

		it('has optional variant property', () => {
			expect(cta1Content).toMatch(
				/CtaButton[\s\S]*variant\?: ButtonVariant/,
			)
		})
	})

	describe('Props interface', () => {
		it('has headline prop', () => {
			expect(cta1Content).toMatch(
				/interface Props[\s\S]*headline: string/,
			)
		})

		it('has optional highlightedText prop', () => {
			expect(cta1Content).toMatch(
				/interface Props[\s\S]*highlightedText\?:/,
			)
		})

		it('has optional subheadline prop', () => {
			expect(cta1Content).toMatch(
				/interface Props[\s\S]*subheadline\?: string/,
			)
		})

		it('has optional buttons prop', () => {
			expect(cta1Content).toMatch(/interface Props[\s\S]*buttons\?:/)
		})
	})

	describe('typography', () => {
		it('uses displayLG variant for headline', () => {
			expect(cta1Content).toContain('variant="displayLG"')
		})

		it('uses textBase variant for subheadline', () => {
			expect(cta1Content).toContain('variant="textBase"')
		})

		it('uses font-display for headline', () => {
			expect(cta1Content).toContain('font-display')
		})

		it('uses text-balance for readability', () => {
			expect(cta1Content).toContain('text-balance')
		})
	})

	describe('CTA buttons', () => {
		it('maps over buttons array', () => {
			expect(cta1Content).toContain('buttons.map')
		})

		it('conditionally renders buttons container', () => {
			expect(cta1Content).toContain('buttons.length > 0 && (')
		})

		it('uses small button size', () => {
			expect(cta1Content).toContain('size="sm"')
		})

		it('is a link button', () => {
			expect(cta1Content).toContain('isLink')
		})

		it('has accessible aria-label', () => {
			expect(cta1Content).toContain('aria-label={button.label}')
		})

		it('has flex gap for button spacing', () => {
			expect(cta1Content).toContain('gap-2')
		})

		it('centers buttons horizontally', () => {
			expect(cta1Content).toContain('justify-center')
		})

		it('has default variant fallback', () => {
			expect(cta1Content).toContain("index === 0 ? 'default' : 'muted'")
		})
	})

	describe('wrapper configuration', () => {
		it('uses standard variant', () => {
			expect(cta1Content).toContain('variant="standard"')
		})

		it('has responsive padding', () => {
			expect(cta1Content).toContain('py-24')
		})
	})

	describe('inner container styling', () => {
		it('has border-x for side borders', () => {
			expect(cta1Content).toContain('border-x')
		})

		it('has padding', () => {
			expect(cta1Content).toContain('p-8')
		})

		it('has larger desktop top padding', () => {
			expect(cta1Content).toContain('lg:pt-20')
		})

		it('has bottom padding', () => {
			expect(cta1Content).toContain('pb-12')
		})
	})

	describe('accessibility', () => {
		it('has aria-label on buttons', () => {
			expect(cta1Content).toContain('aria-label={button.label}')
		})

		it('has title on buttons', () => {
			expect(cta1Content).toContain('title={button.label}')
		})
	})

	describe('conditional rendering', () => {
		it('conditionally renders highlighted text', () => {
			expect(cta1Content).toContain('highlightedText && (')
		})

		it('conditionally renders subheadline', () => {
			expect(cta1Content).toContain('subheadline && (')
		})
	})

	describe('subheadline styling', () => {
		it('has max-width constraint', () => {
			expect(cta1Content).toContain('max-w-xl')
		})

		it('has auto margins for centering', () => {
			expect(cta1Content).toContain('mx-auto')
		})

		it('has top margin', () => {
			expect(cta1Content).toContain('mt-4')
		})
	})
})
