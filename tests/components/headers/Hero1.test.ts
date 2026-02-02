import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for Hero1.astro component
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required patterns.
 */

const hero1ComponentPath = join(
	process.cwd(),
	'src/components/headers/Hero1.astro',
)
const hero1Content = readFileSync(hero1ComponentPath, 'utf-8')

describe('Hero1.astro', () => {
	describe('component structure', () => {
		it('exists at the expected path', () => {
			expect(hero1Content).toBeTruthy()
		})

		it('is a section element', () => {
			expect(hero1Content).toContain('<section')
		})

		it('uses Wrapper component for layout', () => {
			expect(hero1Content).toContain('import Wrapper')
			expect(hero1Content).toContain('<Wrapper')
		})

		it('has a slot for additional content', () => {
			expect(hero1Content).toContain('<slot')
		})
	})

	describe('foundation components', () => {
		it('imports Button component', () => {
			expect(hero1Content).toContain(
				"import Button from '@/components/fundations/elements/Button.astro'",
			)
		})

		it('imports Text component', () => {
			expect(hero1Content).toContain(
				"import Text from '@/components/fundations/elements/Text.astro'",
			)
		})

		it('imports Wrapper component', () => {
			expect(hero1Content).toContain(
				"import Wrapper from '@/components/fundations/containers/Wrapper.astro'",
			)
		})

		it('uses Text component for headline', () => {
			expect(hero1Content).toContain('<Text')
			expect(hero1Content).toContain('tag="h1"')
		})

		it('uses Button component for CTAs', () => {
			expect(hero1Content).toContain('<Button')
		})
	})

	describe('AOS animations', () => {
		it('has data-aos attribute', () => {
			expect(hero1Content).toContain('data-aos')
		})

		it('has data-aos-duration attribute', () => {
			expect(hero1Content).toContain('data-aos-duration')
		})

		it('has animation prop', () => {
			expect(hero1Content).toContain('animation')
		})

		it('has animationDuration prop', () => {
			expect(hero1Content).toContain('animationDuration')
		})

		it('has default animation value', () => {
			expect(hero1Content).toContain("animation = 'fade-up'")
		})
	})

	describe('NextNode color tokens', () => {
		it('uses nextnode-* color tokens for highlighted text', () => {
			expect(hero1Content).toContain('text-nextnode-400')
		})

		it('uses gradient background class', () => {
			expect(hero1Content).toContain('bg-gradient-up')
		})

		it('uses text-white for light text on dark background', () => {
			expect(hero1Content).toContain('text-white')
		})
	})

	describe('TypeScript interface', () => {
		it('exports HeroButton interface', () => {
			expect(hero1Content).toContain('export interface HeroButton')
		})

		it('has Props interface', () => {
			expect(hero1Content).toContain('interface Props')
		})

		it('has headline prop', () => {
			expect(hero1Content).toContain('headline: string')
		})

		it('has optional label prop', () => {
			expect(hero1Content).toContain('label?:')
		})

		it('has optional subheadline prop', () => {
			expect(hero1Content).toContain('subheadline?:')
		})

		it('has optional highlightedText prop', () => {
			expect(hero1Content).toContain('highlightedText?:')
		})

		it('has optional buttons prop', () => {
			expect(hero1Content).toContain('buttons?:')
		})

		it('extends HTMLAttributes for section', () => {
			expect(hero1Content).toContain("HTMLAttributes<'section'>")
		})
	})

	describe('HeroButton interface', () => {
		it('has label property', () => {
			expect(hero1Content).toMatch(/HeroButton[\s\S]*label: string/)
		})

		it('has href property', () => {
			expect(hero1Content).toMatch(/HeroButton[\s\S]*href: string/)
		})

		it('has optional variant property', () => {
			expect(hero1Content).toMatch(/HeroButton[\s\S]*variant\?:/)
		})
	})

	describe('typography', () => {
		it('uses display2XL variant for headline', () => {
			expect(hero1Content).toContain('variant="display2XL"')
		})

		it('uses textSM variant for label', () => {
			expect(hero1Content).toContain('variant="textSM"')
		})

		it('uses textBase variant for subheadline', () => {
			expect(hero1Content).toContain('variant="textBase"')
		})

		it('uses font-display for headline', () => {
			expect(hero1Content).toContain('font-display')
		})

		it('uses text-balance for readability', () => {
			expect(hero1Content).toContain('text-balance')
		})
	})

	describe('styling', () => {
		it('has overflow-hidden for gradient containment', () => {
			expect(hero1Content).toContain('overflow-hidden')
		})

		it('has relative positioning for layering', () => {
			expect(hero1Content).toContain('relative')
		})

		it('has max-width constraint on content', () => {
			expect(hero1Content).toContain('max-w-xl')
		})

		it('uses Wrapper standard variant', () => {
			expect(hero1Content).toContain('variant="standard"')
		})
	})

	describe('buttons rendering', () => {
		it('maps over buttons array', () => {
			expect(hero1Content).toContain('buttons.map')
		})

		it('uses isLink on Button for anchor behavior', () => {
			expect(hero1Content).toContain('isLink')
		})

		it('passes href to Button', () => {
			expect(hero1Content).toContain('href={button.href}')
		})

		it('has buttons container with flex', () => {
			expect(hero1Content).toContain('flex')
			expect(hero1Content).toContain('gap-4')
		})
	})
})
