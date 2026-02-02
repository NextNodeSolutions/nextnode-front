import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for Pricing1.astro component
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required patterns.
 */

const pricing1ComponentPath = join(
	process.cwd(),
	'src/components/pricing/Pricing1.astro',
)
const pricing1Content = readFileSync(pricing1ComponentPath, 'utf-8')

describe('Pricing1.astro', () => {
	describe('component structure', () => {
		it('exists at the expected path', () => {
			expect(pricing1Content).toBeTruthy()
		})

		it('is a section element', () => {
			expect(pricing1Content).toContain('<section')
		})

		it('uses Wrapper component for layout', () => {
			expect(pricing1Content).toContain('import Wrapper')
			expect(pricing1Content).toContain('<Wrapper')
		})

		it('uses 4-column grid layout', () => {
			expect(pricing1Content).toContain('lg:grid-cols-4')
		})

		it('uses 3-column grid for plans', () => {
			expect(pricing1Content).toContain('lg:grid-cols-3')
		})
	})

	describe('foundation components', () => {
		it('imports Text component', () => {
			expect(pricing1Content).toContain(
				"import Text from '@/components/fundations/elements/Text.astro'",
			)
		})

		it('imports Button component', () => {
			expect(pricing1Content).toContain(
				"import Button from '@/components/fundations/elements/Button.astro'",
			)
		})

		it('imports Wrapper component', () => {
			expect(pricing1Content).toContain(
				"import Wrapper from '@/components/fundations/containers/Wrapper.astro'",
			)
		})

		it('imports ButtonVariant type', () => {
			expect(pricing1Content).toContain(
				"import type { ButtonVariant } from '@/components/fundations/elements/Button.astro'",
			)
		})

		it('uses Text component for headline', () => {
			expect(pricing1Content).toContain('<Text')
			expect(pricing1Content).toContain('tag="h2"')
		})

		it('uses Text component for plan title', () => {
			expect(pricing1Content).toContain('tag="h3"')
		})

		it('uses Button component for CTA', () => {
			expect(pricing1Content).toContain('<Button')
		})
	})

	describe('AOS animations', () => {
		it('has data-aos attribute', () => {
			expect(pricing1Content).toContain('data-aos')
		})

		it('has data-aos-duration attribute', () => {
			expect(pricing1Content).toContain('data-aos-duration')
		})

		it('has animation prop', () => {
			expect(pricing1Content).toContain('animation')
		})

		it('has animationDuration prop', () => {
			expect(pricing1Content).toContain('animationDuration')
		})

		it('has default animation value', () => {
			expect(pricing1Content).toContain("animation = 'fade-up'")
		})

		it('has staggered animations on plans', () => {
			expect(pricing1Content).toContain(
				'Number(animationDuration) + index * 200',
			)
		})
	})

	describe('NextNode color tokens', () => {
		it('uses base-* color tokens', () => {
			expect(pricing1Content).toContain('base-')
		})

		it('uses gradient background class', () => {
			expect(pricing1Content).toContain('bg-gradient-down')
		})

		it('uses text-white for light text', () => {
			expect(pricing1Content).toContain('text-white')
		})

		it('uses base-400 for muted text', () => {
			expect(pricing1Content).toContain('text-base-400')
		})

		it('uses base-500 for non-popular plan text', () => {
			expect(pricing1Content).toContain('text-base-500')
		})

		it('uses base-900 for popular badge background', () => {
			expect(pricing1Content).toContain('bg-base-900')
		})
	})

	describe('TypeScript interface', () => {
		it('exports PricingPlan interface', () => {
			expect(pricing1Content).toContain('export interface PricingPlan')
		})

		it('has Props interface', () => {
			expect(pricing1Content).toContain('interface Props')
		})

		it('has plans prop', () => {
			expect(pricing1Content).toContain('plans: PricingPlan[]')
		})

		it('extends HTMLAttributes for section', () => {
			expect(pricing1Content).toContain("HTMLAttributes<'section'>")
		})
	})

	describe('PricingPlan interface', () => {
		it('has id property', () => {
			expect(pricing1Content).toMatch(/PricingPlan[\s\S]*id: string/)
		})

		it('has title property', () => {
			expect(pricing1Content).toMatch(/PricingPlan[\s\S]*title: string/)
		})

		it('has price property', () => {
			expect(pricing1Content).toMatch(/PricingPlan[\s\S]*price: string/)
		})

		it('has optional priceSuffix property', () => {
			expect(pricing1Content).toMatch(/PricingPlan[\s\S]*priceSuffix\?:/)
		})

		it('has description property', () => {
			expect(pricing1Content).toMatch(
				/PricingPlan[\s\S]*description: string/,
			)
		})

		it('has benefits property', () => {
			expect(pricing1Content).toMatch(
				/PricingPlan[\s\S]*benefits: string\[\]/,
			)
		})

		it('has optional isPopular property', () => {
			expect(pricing1Content).toMatch(/PricingPlan[\s\S]*isPopular\?:/)
		})

		it('has optional popularBadge property', () => {
			expect(pricing1Content).toMatch(/PricingPlan[\s\S]*popularBadge\?:/)
		})

		it('has optional buttonVariant property', () => {
			expect(pricing1Content).toMatch(
				/PricingPlan[\s\S]*buttonVariant\?:/,
			)
		})

		it('has optional buttonText property', () => {
			expect(pricing1Content).toMatch(/PricingPlan[\s\S]*buttonText\?:/)
		})

		it('has optional buttonHref property', () => {
			expect(pricing1Content).toMatch(/PricingPlan[\s\S]*buttonHref\?:/)
		})
	})

	describe('Props interface', () => {
		it('has optional label prop', () => {
			expect(pricing1Content).toMatch(/interface Props[\s\S]*label\?:/)
		})

		it('has headline prop', () => {
			expect(pricing1Content).toMatch(
				/interface Props[\s\S]*headline: string/,
			)
		})

		it('has optional highlightedText prop', () => {
			expect(pricing1Content).toMatch(
				/interface Props[\s\S]*highlightedText\?:/,
			)
		})

		it('has optional description prop', () => {
			expect(pricing1Content).toMatch(
				/interface Props[\s\S]*description\?: string/,
			)
		})

		it('has plans prop', () => {
			expect(pricing1Content).toMatch(/interface Props[\s\S]*plans:/)
		})
	})

	describe('typography', () => {
		it('uses displayMD variant for headline', () => {
			expect(pricing1Content).toContain('variant="displayMD"')
		})

		it('uses textSM variant for label', () => {
			expect(pricing1Content).toContain('variant="textSM"')
		})

		it('uses textLG variant for plan title', () => {
			expect(pricing1Content).toContain('variant="textLG"')
		})

		it('uses textBase variant for description', () => {
			expect(pricing1Content).toContain('variant="textBase"')
		})

		it('uses font-display for headline and price', () => {
			expect(pricing1Content).toContain('font-display')
		})

		it('uses text-balance for readability', () => {
			expect(pricing1Content).toContain('text-balance')
		})
	})

	describe('pricing tier styling', () => {
		it('has vertical line decoration', () => {
			expect(pricing1Content).toContain('before:bg-white')
			expect(pricing1Content).toContain('before:h-6')
			expect(pricing1Content).toContain('before:w-px')
		})

		it('has extended vertical line', () => {
			expect(pricing1Content).toContain('after:top-8')
			expect(pricing1Content).toContain('after:bottom-0')
			expect(pricing1Content).toContain('after:w-px')
		})

		it('uses relative positioning', () => {
			expect(pricing1Content).toContain('relative')
		})

		it('uses flex layout for plan sections', () => {
			expect(pricing1Content).toContain('flex flex-col')
		})
	})

	describe('popular plan styling', () => {
		it('conditionally renders popular badge', () => {
			expect(pricing1Content).toContain('plan.isPopular &&')
		})

		it('has badge styling', () => {
			expect(pricing1Content).toContain('rounded-full')
			expect(pricing1Content).toContain('text-xs')
		})

		it('has default popular badge text', () => {
			expect(pricing1Content).toContain("plan.popularBadge ?? 'Popular'")
		})

		it('conditionally styles benefits text', () => {
			// Benefits text color changes based on isPopular
			expect(pricing1Content).toContain('plan.isPopular')
			expect(pricing1Content).toContain("'text-white'")
			expect(pricing1Content).toContain("'text-base-500'")
		})
	})

	describe('benefits list', () => {
		it('renders benefits as unordered list', () => {
			expect(pricing1Content).toContain('<ul')
			expect(pricing1Content).toContain('role="list"')
		})

		it('maps over benefits array', () => {
			expect(pricing1Content).toContain('plan.benefits.map')
		})

		it('has check icon for each benefit', () => {
			expect(pricing1Content).toContain('icon-tabler-check')
		})

		it('has aria-hidden on decorative icon', () => {
			expect(pricing1Content).toContain('aria-hidden="true"')
		})

		it('has shrink-0 on icon to prevent shrinking', () => {
			expect(pricing1Content).toContain('shrink-0')
		})
	})

	describe('button configuration', () => {
		it('supports button link mode', () => {
			expect(pricing1Content).toContain('plan.buttonHref')
			expect(pricing1Content).toContain('isLink')
		})

		it('has default button text', () => {
			expect(pricing1Content).toContain(
				"plan.buttonText ?? 'Get started'",
			)
		})

		it('has default button variant', () => {
			expect(pricing1Content).toContain("plan.buttonVariant ?? 'muted'")
		})

		it('uses full width button', () => {
			expect(pricing1Content).toContain('w-full')
		})

		it('centers button content', () => {
			expect(pricing1Content).toContain('justify-center')
		})
	})

	describe('plans rendering', () => {
		it('maps over plans array', () => {
			expect(pricing1Content).toContain('plans.map')
		})

		it('renders plan title', () => {
			expect(pricing1Content).toContain('{plan.title}')
		})

		it('renders plan price', () => {
			expect(pricing1Content).toContain('{plan.price}')
		})

		it('renders plan description', () => {
			expect(pricing1Content).toContain('{plan.description}')
		})

		it('conditionally renders price suffix', () => {
			expect(pricing1Content).toContain('plan.priceSuffix &&')
		})

		it('conditionally renders description', () => {
			expect(pricing1Content).toContain('description && (')
		})
	})

	describe('wrapper configuration', () => {
		it('uses standard variant', () => {
			expect(pricing1Content).toContain('variant="standard"')
		})

		it('has responsive padding', () => {
			expect(pricing1Content).toContain('py-24')
		})

		it('has responsive gap', () => {
			expect(pricing1Content).toContain('gap-y-12')
			expect(pricing1Content).toContain('lg:gap-y-24')
		})
	})

	describe('accessibility', () => {
		it('uses semantic section elements for plans', () => {
			// Count section tags - should have multiple (outer + per plan)
			const sectionMatches = pricing1Content.match(/<section/g)
			expect(sectionMatches?.length).toBeGreaterThan(1)
		})

		it('has proper heading hierarchy', () => {
			expect(pricing1Content).toContain('tag="h2"')
			expect(pricing1Content).toContain('tag="h3"')
		})

		it('uses list for benefits', () => {
			expect(pricing1Content).toContain('<ul')
			expect(pricing1Content).toContain('<li')
		})
	})
})
