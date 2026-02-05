import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for Faq1.astro component
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required patterns.
 */

const faq1ComponentPath = join(process.cwd(), 'src/components/faqs/Faq1.astro')
const faq1Content = readFileSync(faq1ComponentPath, 'utf-8')

describe('Faq1.astro', () => {
	describe('component structure', () => {
		it('exists at the expected path', () => {
			expect(faq1Content).toBeTruthy()
		})

		it('is a section element', () => {
			expect(faq1Content).toContain('<section')
		})

		it('uses Wrapper component for layout', () => {
			expect(faq1Content).toContain('import Wrapper')
			expect(faq1Content).toContain('<Wrapper')
		})

		it('uses 4-column grid layout', () => {
			expect(faq1Content).toContain('lg:grid-cols-4')
		})

		it('uses 3-column span for FAQ list', () => {
			expect(faq1Content).toContain('lg:col-span-3')
		})
	})

	describe('foundation components', () => {
		it('imports Text component', () => {
			expect(faq1Content).toContain(
				"import Text from '@/components/fundations/elements/Text.astro'",
			)
		})

		it('imports Button component', () => {
			expect(faq1Content).toContain(
				"import Button from '@/components/fundations/elements/Button.astro'",
			)
		})

		it('imports Wrapper component', () => {
			expect(faq1Content).toContain(
				"import Wrapper from '@/components/fundations/containers/Wrapper.astro'",
			)
		})

		it('imports Plus icon component', () => {
			expect(faq1Content).toContain(
				"import Plus from '@/components/fundations/icons/Plus.astro'",
			)
		})

		it('uses Text component for headline', () => {
			expect(faq1Content).toContain('<Text')
			expect(faq1Content).toContain('tag="h2"')
		})

		it('uses Button component for CTA', () => {
			expect(faq1Content).toContain('<Button')
		})

		it('uses Plus icon in summary', () => {
			expect(faq1Content).toContain('<Plus')
		})
	})

	describe('AOS animations', () => {
		it('has data-aos attribute', () => {
			expect(faq1Content).toContain('data-aos')
		})

		it('has data-aos-duration attribute', () => {
			expect(faq1Content).toContain('data-aos-duration')
		})

		it('has animation prop', () => {
			expect(faq1Content).toContain('animation')
		})

		it('has animationDuration prop', () => {
			expect(faq1Content).toContain('animationDuration')
		})

		it('has default animation value', () => {
			expect(faq1Content).toContain("animation = 'fade-up'")
		})

		it('has staggered animations on FAQ items', () => {
			expect(faq1Content).toContain(
				'Number(animationDuration) + index * 100',
			)
		})
	})

	describe('NextNode color tokens', () => {
		it('uses slate color tokens for light mode', () => {
			expect(faq1Content).toContain('slate-')
		})

		it('uses text-slate-900 for main text', () => {
			expect(faq1Content).toContain('text-slate-900')
		})

		it('uses text-slate-600 for muted text', () => {
			expect(faq1Content).toContain('text-slate-600')
		})

		it('uses nextnode-500 for highlighted text', () => {
			expect(faq1Content).toContain('text-nextnode-500')
		})
	})

	describe('TypeScript interface', () => {
		it('exports FaqItem interface', () => {
			expect(faq1Content).toContain('export interface FaqItem')
		})

		it('has Props interface', () => {
			expect(faq1Content).toContain('interface Props')
		})

		it('has faqs prop', () => {
			expect(faq1Content).toContain('faqs: FaqItem[]')
		})

		it('extends HTMLAttributes for section', () => {
			expect(faq1Content).toContain("HTMLAttributes<'section'>")
		})
	})

	describe('FaqItem interface', () => {
		it('has id property', () => {
			expect(faq1Content).toMatch(/FaqItem[\s\S]*id: string/)
		})

		it('has question property', () => {
			expect(faq1Content).toMatch(/FaqItem[\s\S]*question: string/)
		})

		it('has answer property', () => {
			expect(faq1Content).toMatch(/FaqItem[\s\S]*answer: string/)
		})
	})

	describe('Props interface', () => {
		it('has optional label prop', () => {
			expect(faq1Content).toMatch(/interface Props[\s\S]*label\?:/)
		})

		it('has headline prop', () => {
			expect(faq1Content).toMatch(
				/interface Props[\s\S]*headline: string/,
			)
		})

		it('has optional highlightedText prop', () => {
			expect(faq1Content).toMatch(
				/interface Props[\s\S]*highlightedText\?:/,
			)
		})

		it('has optional description prop', () => {
			expect(faq1Content).toMatch(
				/interface Props[\s\S]*description\?: string/,
			)
		})

		it('has faqs prop', () => {
			expect(faq1Content).toMatch(/interface Props[\s\S]*faqs:/)
		})

		it('has optional ctaText prop', () => {
			expect(faq1Content).toMatch(/interface Props[\s\S]*ctaText\?:/)
		})

		it('has optional ctaHref prop', () => {
			expect(faq1Content).toMatch(/interface Props[\s\S]*ctaHref\?:/)
		})
	})

	describe('typography', () => {
		it('uses displayMD variant for headline', () => {
			expect(faq1Content).toContain('variant="displayMD"')
		})

		it('uses textSM variant for label', () => {
			expect(faq1Content).toContain('variant="textSM"')
		})

		it('uses textBase variant for description', () => {
			expect(faq1Content).toContain('variant="textBase"')
		})

		it('uses font-display for headline', () => {
			expect(faq1Content).toContain('font-display')
		})

		it('uses text-balance for readability', () => {
			expect(faq1Content).toContain('text-balance')
		})
	})

	describe('header styling', () => {
		it('has vertical line decoration', () => {
			expect(faq1Content).toContain('before:bg-nextnode-500')
			expect(faq1Content).toContain('before:h-6')
			expect(faq1Content).toContain('before:w-px')
		})

		it('uses relative positioning', () => {
			expect(faq1Content).toContain('relative')
		})
	})

	describe('accordion functionality', () => {
		it('uses details element for accordion', () => {
			expect(faq1Content).toContain('<details')
		})

		it('uses summary element for question', () => {
			expect(faq1Content).toContain('<summary')
		})

		it('has group class for styling open state', () => {
			expect(faq1Content).toContain('class="group')
		})

		it('has cursor-pointer on details', () => {
			expect(faq1Content).toContain('cursor-pointer')
		})

		it('rotates Plus icon when open', () => {
			expect(faq1Content).toContain('group-open:-rotate-45')
		})

		it('changes icon color when open', () => {
			expect(faq1Content).toContain('group-open:text-slate-600')
		})

		it('has transition duration on icon', () => {
			expect(faq1Content).toContain('duration-300')
		})
	})

	describe('FAQ item rendering', () => {
		it('maps over faqs array', () => {
			expect(faq1Content).toContain('faqs.map')
		})

		it('renders question text', () => {
			expect(faq1Content).toContain('{faq.question}')
		})

		it('renders answer text', () => {
			expect(faq1Content).toContain('{faq.answer}')
		})

		it('has spacing between question and icon', () => {
			expect(faq1Content).toContain('pr-8')
		})
	})

	describe('CTA button', () => {
		it('conditionally renders CTA', () => {
			expect(faq1Content).toContain('ctaText && ctaHref &&')
		})

		it('uses small button size', () => {
			expect(faq1Content).toContain('size="sm"')
		})

		it('uses default button variant', () => {
			expect(faq1Content).toContain('variant="default"')
		})

		it('is a link button', () => {
			expect(faq1Content).toContain('isLink')
		})

		it('has accessible aria-label', () => {
			expect(faq1Content).toContain('aria-label={ctaText}')
		})
	})

	describe('wrapper configuration', () => {
		it('uses standard variant', () => {
			expect(faq1Content).toContain('variant="standard"')
		})

		it('has responsive padding', () => {
			expect(faq1Content).toContain('py-24')
		})

		it('has responsive gap', () => {
			expect(faq1Content).toContain('gap-y-12')
			expect(faq1Content).toContain('lg:gap-y-24')
		})
	})

	describe('accessibility', () => {
		it('uses semantic details/summary for accordion', () => {
			expect(faq1Content).toContain('<details')
			expect(faq1Content).toContain('<summary')
		})

		it('has aria-hidden on decorative icon', () => {
			expect(faq1Content).toContain('aria-hidden="true"')
		})

		it('has shrink-0 on icon to prevent shrinking', () => {
			expect(faq1Content).toContain('shrink-0')
		})

		it('uses select-none on summary to prevent text selection', () => {
			expect(faq1Content).toContain('select-none')
		})
	})

	describe('conditional rendering', () => {
		it('conditionally renders label', () => {
			expect(faq1Content).toContain('label && (')
		})

		it('conditionally renders highlighted text', () => {
			expect(faq1Content).toContain('highlightedText && (')
		})

		it('conditionally renders description', () => {
			expect(faq1Content).toContain('description && (')
		})
	})
})
