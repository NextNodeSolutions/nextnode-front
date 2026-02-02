import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for Testimonial1.astro component
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required patterns.
 */

const testimonial1ComponentPath = join(
	process.cwd(),
	'src/components/testimonials/Testimonial1.astro',
)
const testimonial1Content = readFileSync(testimonial1ComponentPath, 'utf-8')

describe('Testimonial1.astro', () => {
	describe('component structure', () => {
		it('exists at the expected path', () => {
			expect(testimonial1Content).toBeTruthy()
		})

		it('is a section element', () => {
			expect(testimonial1Content).toContain('<section')
		})

		it('uses Wrapper component for layout', () => {
			expect(testimonial1Content).toContain('import Wrapper')
			expect(testimonial1Content).toContain('<Wrapper')
		})

		it('has four-column grid layout', () => {
			expect(testimonial1Content).toContain('lg:grid-cols-4')
		})

		it('has overflow-hidden for carousel containment', () => {
			expect(testimonial1Content).toContain('overflow-hidden')
		})

		it('has py-24 padding', () => {
			expect(testimonial1Content).toContain('py-24')
		})
	})

	describe('foundation components', () => {
		it('imports Text component', () => {
			expect(testimonial1Content).toContain(
				"import Text from '@/components/fundations/elements/Text.astro'",
			)
		})

		it('imports Button component', () => {
			expect(testimonial1Content).toContain(
				"import Button from '@/components/fundations/elements/Button.astro'",
			)
		})

		it('imports Wrapper component', () => {
			expect(testimonial1Content).toContain(
				"import Wrapper from '@/components/fundations/containers/Wrapper.astro'",
			)
		})

		it('imports ChevronLeft icon', () => {
			expect(testimonial1Content).toContain(
				"import ChevronLeft from '@/components/fundations/icons/ChevronLeft.astro'",
			)
		})

		it('imports ChevronRight icon', () => {
			expect(testimonial1Content).toContain(
				"import ChevronRight from '@/components/fundations/icons/ChevronRight.astro'",
			)
		})

		it('uses Text component for headline', () => {
			expect(testimonial1Content).toContain('<Text')
			expect(testimonial1Content).toContain('tag="h3"')
		})

		it('uses Button component for navigation', () => {
			expect(testimonial1Content).toContain('<Button')
		})
	})

	describe('carousel navigation', () => {
		it('has previous button', () => {
			expect(testimonial1Content).toContain('id="keen-slider-previous"')
		})

		it('has next button', () => {
			expect(testimonial1Content).toContain('id="keen-slider-next"')
		})

		it('uses iconOnly buttons', () => {
			expect(testimonial1Content).toContain('iconOnly')
		})

		it('has aria-label for previous button', () => {
			expect(testimonial1Content).toContain('aria-label="Previous slide"')
		})

		it('has aria-label for next button', () => {
			expect(testimonial1Content).toContain('aria-label="Next slide"')
		})

		it('uses ChevronLeft icon for previous', () => {
			expect(testimonial1Content).toContain('<ChevronLeft')
		})

		it('uses ChevronRight icon for next', () => {
			expect(testimonial1Content).toContain('<ChevronRight')
		})
	})

	describe('KeenSlider integration', () => {
		it('has keen-slider container', () => {
			expect(testimonial1Content).toContain('id="keen-slider"')
		})

		it('has keen-slider class', () => {
			expect(testimonial1Content).toContain('class="keen-slider"')
		})

		it('has keen-slider__slide class on slides', () => {
			expect(testimonial1Content).toContain('class="keen-slider__slide"')
		})

		it('imports KeenSlider in script', () => {
			expect(testimonial1Content).toContain(
				"import KeenSlider from 'keen-slider'",
			)
		})

		it('initializes KeenSlider with loop', () => {
			expect(testimonial1Content).toContain('loop: true')
		})

		it('configures slides for mobile', () => {
			expect(testimonial1Content).toContain('perView: 1.11')
		})

		it('configures responsive breakpoint', () => {
			expect(testimonial1Content).toContain("'(min-width: 1024px)'")
		})

		it('connects navigation buttons to slider', () => {
			expect(testimonial1Content).toContain('keenSlider.prev()')
			expect(testimonial1Content).toContain('keenSlider.next()')
		})
	})

	describe('AOS animations', () => {
		it('has data-aos attribute', () => {
			expect(testimonial1Content).toContain('data-aos')
		})

		it('has data-aos-duration attribute', () => {
			expect(testimonial1Content).toContain('data-aos-duration')
		})

		it('has animation prop', () => {
			expect(testimonial1Content).toContain('animation')
		})

		it('has animationDuration prop', () => {
			expect(testimonial1Content).toContain('animationDuration')
		})

		it('has default animation value', () => {
			expect(testimonial1Content).toContain("animation = 'fade-up'")
		})

		it('has default animationDuration value', () => {
			expect(testimonial1Content).toContain("animationDuration = '1500'")
		})

		it('applies staggered animation to slides', () => {
			expect(testimonial1Content).toContain('index * 200')
		})
	})

	describe('NextNode color tokens', () => {
		it('uses base-* color tokens', () => {
			expect(testimonial1Content).toContain('base-')
		})

		it('uses text-white for light text', () => {
			expect(testimonial1Content).toContain('text-white')
		})

		it('uses base-400 for highlighted text', () => {
			expect(testimonial1Content).toContain('text-base-400')
		})

		it('uses base-500 for role text', () => {
			expect(testimonial1Content).toContain('text-base-500')
		})

		it('uses base-900 for borders', () => {
			expect(testimonial1Content).toContain('border-t-base-900')
			expect(testimonial1Content).toContain('border-b-base-900')
		})
	})

	describe('TypeScript interface', () => {
		it('exports TestimonialItem interface', () => {
			expect(testimonial1Content).toContain(
				'export interface TestimonialItem',
			)
		})

		it('has Props interface', () => {
			expect(testimonial1Content).toContain('interface Props')
		})

		it('has testimonials prop', () => {
			expect(testimonial1Content).toContain(
				'testimonials: TestimonialItem[]',
			)
		})

		it('extends HTMLAttributes for section', () => {
			expect(testimonial1Content).toContain("HTMLAttributes<'section'>")
		})
	})

	describe('TestimonialItem interface', () => {
		it('has id property', () => {
			expect(testimonial1Content).toMatch(
				/TestimonialItem[\s\S]*id: string/,
			)
		})

		it('has name property', () => {
			expect(testimonial1Content).toMatch(
				/TestimonialItem[\s\S]*name: string/,
			)
		})

		it('has role property', () => {
			expect(testimonial1Content).toMatch(
				/TestimonialItem[\s\S]*role: string/,
			)
		})

		it('has content property', () => {
			expect(testimonial1Content).toMatch(
				/TestimonialItem[\s\S]*content: string/,
			)
		})

		it('has imageUrl property', () => {
			expect(testimonial1Content).toMatch(
				/TestimonialItem[\s\S]*imageUrl: ImageMetadata \| string/,
			)
		})
	})

	describe('Props interface', () => {
		it('has optional label prop', () => {
			expect(testimonial1Content).toContain('label?:')
		})

		it('has headline prop', () => {
			expect(testimonial1Content).toContain('headline:')
		})

		it('has optional highlightedText prop', () => {
			expect(testimonial1Content).toContain('highlightedText?:')
		})

		it('has testimonials prop', () => {
			expect(testimonial1Content).toContain('testimonials:')
		})
	})

	describe('typography', () => {
		it('uses displayLG variant for headline', () => {
			expect(testimonial1Content).toContain('variant="displayLG"')
		})

		it('uses textSM variant for label', () => {
			expect(testimonial1Content).toContain('variant="textSM"')
		})

		it('uses textBase variant for quote', () => {
			expect(testimonial1Content).toContain('variant="textBase"')
		})

		it('uses font-display for headline', () => {
			expect(testimonial1Content).toContain('font-display')
		})

		it('uses text-balance for readability', () => {
			expect(testimonial1Content).toContain('text-balance')
		})

		it('uses text-pretty for quote text', () => {
			expect(testimonial1Content).toContain('text-pretty')
		})

		it('uses italic for quotes', () => {
			expect(testimonial1Content).toContain('italic')
		})
	})

	describe('testimonial card styling', () => {
		it('has vertical line decoration with before pseudo-element', () => {
			expect(testimonial1Content).toContain('before:bg-white')
		})

		it('has before:h-6 for line height', () => {
			expect(testimonial1Content).toContain('before:h-6')
		})

		it('has before:w-px for line width', () => {
			expect(testimonial1Content).toContain('before:w-px')
		})

		it('positions line at left with before:left-0', () => {
			expect(testimonial1Content).toContain('before:left-0')
		})

		it('positions line at top with before:top-0', () => {
			expect(testimonial1Content).toContain('before:top-0')
		})

		it('has after pseudo-element for connecting line', () => {
			expect(testimonial1Content).toContain('after:absolute')
		})
	})

	describe('testimonial rendering', () => {
		it('maps over testimonials array', () => {
			expect(testimonial1Content).toContain('testimonials.map')
		})

		it('renders testimonial name', () => {
			expect(testimonial1Content).toContain('{testimonial.name}')
		})

		it('renders testimonial role', () => {
			expect(testimonial1Content).toContain('{testimonial.role}')
		})

		it('renders testimonial content', () => {
			expect(testimonial1Content).toContain('{testimonial.content}')
		})

		it('uses blockquote for semantic quote markup', () => {
			expect(testimonial1Content).toContain('<blockquote')
		})
	})

	describe('image handling', () => {
		it('imports Image from astro:assets', () => {
			expect(testimonial1Content).toContain(
				"import { Image } from 'astro:assets'",
			)
		})

		it('supports ImageMetadata type for images', () => {
			expect(testimonial1Content).toContain('ImageMetadata')
		})

		it('supports string URLs for images', () => {
			expect(testimonial1Content).toContain(
				'typeof testimonial.imageUrl ===',
			)
			expect(testimonial1Content).toContain("'string' ?")
		})

		it('renders img tag for string URLs', () => {
			expect(testimonial1Content).toContain('<img')
		})

		it('renders Image component for ImageMetadata', () => {
			expect(testimonial1Content).toContain('<Image')
		})

		it('applies grayscale filter to images', () => {
			expect(testimonial1Content).toContain('grayscale')
		})

		it('uses aspect-square for images', () => {
			expect(testimonial1Content).toContain('aspect-square')
		})

		it('uses object-cover for image fit', () => {
			expect(testimonial1Content).toContain('object-cover')
		})

		it('sets image dimensions', () => {
			expect(testimonial1Content).toContain('width={600}')
			expect(testimonial1Content).toContain('height={600}')
		})
	})

	describe('conditional rendering', () => {
		it('conditionally renders label', () => {
			expect(testimonial1Content).toContain('label && (')
		})

		it('conditionally renders highlightedText', () => {
			expect(testimonial1Content).toContain('highlightedText && (')
		})
	})

	describe('slider script', () => {
		it('has script tag', () => {
			expect(testimonial1Content).toContain('<script>')
		})

		it('checks for slider element before initialization', () => {
			expect(testimonial1Content).toContain(
				"getElementById('keen-slider')",
			)
		})

		it('handles Astro page transitions', () => {
			expect(testimonial1Content).toContain('astro:page-load')
		})

		it('handles DOMContentLoaded', () => {
			expect(testimonial1Content).toContain('DOMContentLoaded')
		})

		it('uses optional chaining for button event listeners', () => {
			expect(testimonial1Content).toContain('?.addEventListener')
		})
	})

	describe('responsive layout', () => {
		it('has single column on mobile', () => {
			expect(testimonial1Content).toContain('grid-cols-1')
		})

		it('has four columns on large screens', () => {
			expect(testimonial1Content).toContain('lg:grid-cols-4')
		})

		it('has three-column layout for testimonial cards', () => {
			expect(testimonial1Content).toContain('lg:grid-cols-3')
		})

		it('has negative margin on mobile for slider', () => {
			expect(testimonial1Content).toContain('-mx-6')
		})

		it('removes negative margin on desktop', () => {
			expect(testimonial1Content).toContain('lg:mx-0')
		})
	})
})
