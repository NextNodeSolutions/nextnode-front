import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for index-two.astro (alternative homepage)
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required patterns.
 */

const pagePath = join(process.cwd(), 'src/pages/index-two.astro')
const pageContent = readFileSync(pagePath, 'utf-8')

describe('index-two.astro (alternative homepage)', () => {
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

	describe('Hero section', () => {
		it('imports Hero1 component', () => {
			expect(pageContent).toContain(
				"import Hero1 from '@/components/headers/Hero1.astro'",
			)
		})

		it('uses Hero1 component with props', () => {
			expect(pageContent).toContain('<Hero1')
			expect(pageContent).toContain('headline={')
			expect(pageContent).toContain('buttons={')
		})

		it('defines hero content', () => {
			expect(pageContent).toContain('const heroContent')
		})
	})

	describe('Testimonial section', () => {
		it('imports Testimonial1 component', () => {
			expect(pageContent).toContain(
				"import Testimonial1 from '@/components/testimonials/Testimonial1.astro'",
			)
		})

		it('uses Testimonial1 with testimonials prop', () => {
			expect(pageContent).toContain('<Testimonial1')
			expect(pageContent).toContain('testimonials={')
		})

		it('defines testimonial content', () => {
			expect(pageContent).toContain('const testimonialContent')
		})
	})

	describe('Feature sections', () => {
		it('imports Feature1 component', () => {
			expect(pageContent).toContain(
				"import Feature1 from '@/components/features/Feature1.astro'",
			)
		})

		it('imports Feature2 component', () => {
			expect(pageContent).toContain(
				"import Feature2 from '@/components/features/Feature2.astro'",
			)
		})

		it('imports Feature3 component', () => {
			expect(pageContent).toContain(
				"import Feature3 from '@/components/features/Feature3.astro'",
			)
		})

		it('uses Feature1 with features prop', () => {
			expect(pageContent).toContain('<Feature1')
			expect(pageContent).toContain('features={')
		})

		it('uses Feature2 with headline and features', () => {
			expect(pageContent).toContain('<Feature2')
		})

		it('uses Feature3 with codeBlock', () => {
			expect(pageContent).toContain('<Feature3')
			expect(pageContent).toContain('codeBlock={')
		})

		it('defines feature content objects', () => {
			expect(pageContent).toContain('const feature1Content')
			expect(pageContent).toContain('const feature2Content')
			expect(pageContent).toContain('const feature3Content')
		})
	})

	describe('Stats section', () => {
		it('imports Stats1 component', () => {
			expect(pageContent).toContain(
				"import Stats1 from '@/components/stats/Stats1.astro'",
			)
		})

		it('uses Stats1 with stats prop', () => {
			expect(pageContent).toContain('<Stats1')
			expect(pageContent).toContain('stats={')
		})

		it('defines stats content', () => {
			expect(pageContent).toContain('const statsContent')
		})
	})

	describe('Pricing section', () => {
		it('imports Pricing1 component', () => {
			expect(pageContent).toContain(
				"import Pricing1 from '@/components/pricing/Pricing1.astro'",
			)
		})

		it('uses Pricing1 with plans prop', () => {
			expect(pageContent).toContain('<Pricing1')
			expect(pageContent).toContain('plans={')
		})

		it('defines pricing content', () => {
			expect(pageContent).toContain('const pricingContent')
		})
	})

	describe('FAQ section', () => {
		it('imports Faq1 component', () => {
			expect(pageContent).toContain(
				"import Faq1 from '@/components/faqs/Faq1.astro'",
			)
		})

		it('uses Faq1 with faqs prop', () => {
			expect(pageContent).toContain('<Faq1')
			expect(pageContent).toContain('faqs={')
		})

		it('defines faq content', () => {
			expect(pageContent).toContain('const faqContent')
		})
	})

	describe('CTA section', () => {
		it('imports Cta1 component', () => {
			expect(pageContent).toContain(
				"import Cta1 from '@/components/ctas/Cta1.astro'",
			)
		})

		it('uses Cta1 with headline prop', () => {
			expect(pageContent).toContain('<Cta1')
			expect(pageContent).toContain('headline={')
		})

		it('defines cta content', () => {
			expect(pageContent).toContain('const ctaContent')
		})
	})

	describe('different section order than index.astro', () => {
		it('has Hero before Testimonial', () => {
			const heroIndex = pageContent.indexOf('<Hero1')
			const testimonialIndex = pageContent.indexOf('<Testimonial1')
			expect(heroIndex).toBeLessThan(testimonialIndex)
		})

		it('has Testimonial before Feature2', () => {
			const testimonialIndex = pageContent.indexOf('<Testimonial1')
			const feature2Index = pageContent.indexOf('<Feature2')
			expect(testimonialIndex).toBeLessThan(feature2Index)
		})

		it('has Feature2 before Stats', () => {
			const feature2Index = pageContent.indexOf('<Feature2')
			const statsIndex = pageContent.indexOf('<Stats1')
			expect(feature2Index).toBeLessThan(statsIndex)
		})

		it('has Stats before Feature1', () => {
			const statsIndex = pageContent.indexOf('<Stats1')
			const feature1Index = pageContent.indexOf('<Feature1')
			expect(statsIndex).toBeLessThan(feature1Index)
		})

		it('has Feature1 before Feature3', () => {
			const feature1Index = pageContent.indexOf('<Feature1')
			const feature3Index = pageContent.indexOf('<Feature3')
			expect(feature1Index).toBeLessThan(feature3Index)
		})

		it('has Feature3 before Faq', () => {
			const feature3Index = pageContent.indexOf('<Feature3')
			const faqIndex = pageContent.indexOf('<Faq1')
			expect(feature3Index).toBeLessThan(faqIndex)
		})

		it('has Faq before Pricing', () => {
			const faqIndex = pageContent.indexOf('<Faq1')
			const pricingIndex = pageContent.indexOf('<Pricing1')
			expect(faqIndex).toBeLessThan(pricingIndex)
		})

		it('has Pricing before CTA', () => {
			const pricingIndex = pageContent.indexOf('<Pricing1')
			const ctaIndex = pageContent.indexOf('<Cta1')
			expect(pricingIndex).toBeLessThan(ctaIndex)
		})
	})

	describe('TypeScript', () => {
		it('has TypeScript frontmatter', () => {
			expect(pageContent).toMatch(/^---\n/)
			expect(pageContent).toContain('---')
		})

		it('uses path alias for imports', () => {
			expect(pageContent).toContain("from '@/")
		})

		it('uses typed const assertions for button variants', () => {
			expect(pageContent).toContain('as const')
		})
	})

	describe('content structure', () => {
		it('has hero with different content than index.astro', () => {
			expect(pageContent).toContain(
				"headline: 'Infrastructure that scales'",
			)
		})

		it('has different testimonials than index.astro', () => {
			expect(pageContent).toContain("id: 'testimonial-a'")
			expect(pageContent).toContain("name: 'Alex Rivera'")
		})

		it('has feature items with id, title, description', () => {
			expect(pageContent).toContain("id: 'feature1-instant'")
			expect(pageContent).toContain("title: 'Instant rollbacks'")
		})

		it('has stats with target numbers', () => {
			expect(pageContent).toContain('target: 15')
			expect(pageContent).toContain('target: 12')
		})

		it('has pricing plans with prices and benefits', () => {
			expect(pageContent).toContain("price: '$0'")
			expect(pageContent).toContain("price: '$49'")
			expect(pageContent).toContain("price: 'Custom'")
		})

		it('has FAQ items with questions and answers', () => {
			expect(pageContent).toContain(
				"question: 'How is NextNode different",
			)
			expect(pageContent).toContain('answer:')
		})
	})
})
