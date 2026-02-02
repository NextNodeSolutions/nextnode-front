import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for pricing.astro
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required patterns.
 */

const pagePath = join(process.cwd(), 'src/pages/pricing.astro')
const pageContent = readFileSync(pagePath, 'utf-8')

describe('pricing.astro', () => {
	describe('layout integration', () => {
		it('imports BaseLayout', () => {
			expect(pageContent).toContain(
				"import BaseLayout from '@/layouts/BaseLayout.astro'",
			)
		})

		it('uses BaseLayout as root element', () => {
			expect(pageContent).toContain('<BaseLayout>')
			expect(pageContent).toContain('</BaseLayout>')
		})
	})

	describe('Pricing section', () => {
		it('imports Pricing1 component', () => {
			expect(pageContent).toContain(
				"import Pricing1 from '@/components/pricing/Pricing1.astro'",
			)
		})

		it('uses Pricing1 component with props', () => {
			expect(pageContent).toContain('<Pricing1')
			expect(pageContent).toContain('headline={')
			expect(pageContent).toContain('plans={')
		})

		it('defines pricing content', () => {
			expect(pageContent).toContain('const pricingContent')
		})

		it('has anchor id for navigation', () => {
			expect(pageContent).toContain('id="pricing"')
		})
	})

	describe('FAQ section', () => {
		it('imports Faq1 component', () => {
			expect(pageContent).toContain(
				"import Faq1 from '@/components/faqs/Faq1.astro'",
			)
		})

		it('uses Faq1 component with props', () => {
			expect(pageContent).toContain('<Faq1')
			expect(pageContent).toContain('faqs={')
		})

		it('defines FAQ content', () => {
			expect(pageContent).toContain('const faqContent')
		})
	})

	describe('CTA section', () => {
		it('imports Cta1 component', () => {
			expect(pageContent).toContain(
				"import Cta1 from '@/components/ctas/Cta1.astro'",
			)
		})

		it('uses Cta1 component with props', () => {
			expect(pageContent).toContain('<Cta1')
			expect(pageContent).toContain('headline={')
			expect(pageContent).toContain('buttons={')
		})

		it('defines CTA content', () => {
			expect(pageContent).toContain('const ctaContent')
		})
	})

	describe('pricing plans data', () => {
		it('includes Starter plan', () => {
			expect(pageContent).toContain("id: 'plan-starter'")
			expect(pageContent).toContain("title: 'Starter'")
		})

		it('includes Pro plan', () => {
			expect(pageContent).toContain("id: 'plan-pro'")
			expect(pageContent).toContain("title: 'Pro'")
		})

		it('includes Enterprise plan', () => {
			expect(pageContent).toContain("id: 'plan-enterprise'")
			expect(pageContent).toContain("title: 'Enterprise'")
		})

		it('marks Pro plan as popular', () => {
			expect(pageContent).toContain('isPopular: true')
			expect(pageContent).toContain("popularBadge: 'Most Popular'")
		})

		it('has pricing for all plans', () => {
			expect(pageContent).toContain("price: '$0'")
			expect(pageContent).toContain("price: '$29'")
			expect(pageContent).toContain("price: 'Custom'")
		})

		it('uses proper button variants', () => {
			expect(pageContent).toContain("buttonVariant: 'muted' as const")
			expect(pageContent).toContain("buttonVariant: 'default' as const")
		})

		it('has benefits for all plans', () => {
			expect(pageContent).toContain('benefits: [')
			expect(pageContent).toContain("'100k requests/month'")
			expect(pageContent).toContain("'10M requests/month'")
			expect(pageContent).toContain("'Unlimited requests'")
		})
	})

	describe('pricing FAQ data', () => {
		it('has multiple FAQ items', () => {
			expect(pageContent).toMatch(/id: 'pricing-faq-\d+'/g)
		})

		it('includes questions about plan changes', () => {
			expect(pageContent).toContain('Can I change plans at any time?')
		})

		it('includes questions about billing', () => {
			expect(pageContent).toContain(
				'Do you offer annual billing discounts?',
			)
		})

		it('includes questions about payment', () => {
			expect(pageContent).toContain('What payment methods do you accept?')
		})

		it('includes refund policy question', () => {
			expect(pageContent).toContain('Can I get a refund if I cancel?')
		})

		it('has contact support CTA', () => {
			expect(pageContent).toContain("ctaText: 'Contact Support'")
			expect(pageContent).toContain("ctaHref: '/contact'")
		})
	})

	describe('CTA data', () => {
		it('has call to action headline', () => {
			expect(pageContent).toContain("headline: 'Start building today'")
		})

		it('has action buttons', () => {
			expect(pageContent).toContain("label: 'Start Free'")
			expect(pageContent).toContain("label: 'Compare Plans'")
		})

		it('links to sign-up', () => {
			expect(pageContent).toContain("href: '/sign-up'")
		})

		it('links to pricing anchor', () => {
			expect(pageContent).toContain("href: '#pricing'")
		})
	})

	describe('proper TypeScript usage', () => {
		it('uses as const for ButtonVariant types', () => {
			expect(pageContent).toContain('as const')
		})

		it('has proper prop bindings', () => {
			expect(pageContent).toContain('label={pricingContent.label}')
			expect(pageContent).toContain('plans={pricingContent.plans}')
			expect(pageContent).toContain('faqs={faqContent.faqs}')
		})
	})
})
