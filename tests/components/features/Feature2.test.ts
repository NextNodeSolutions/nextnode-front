import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for Feature2.astro component
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required patterns.
 */

const feature2ComponentPath = join(
	process.cwd(),
	'src/components/features/Feature2.astro',
)
const feature2Content = readFileSync(feature2ComponentPath, 'utf-8')

describe('Feature2.astro', () => {
	describe('component structure', () => {
		it('exists at the expected path', () => {
			expect(feature2Content).toBeTruthy()
		})

		it('is a section element', () => {
			expect(feature2Content).toContain('<section')
		})

		it('uses Wrapper component for layout', () => {
			expect(feature2Content).toContain('import Wrapper')
			expect(feature2Content).toContain('<Wrapper')
		})

		it('uses 4-column grid layout with sidebar', () => {
			expect(feature2Content).toContain('lg:grid-cols-4')
		})

		it('uses 3-column grid for features', () => {
			expect(feature2Content).toContain('lg:grid-cols-3')
		})

		it('different layout than Feature1', () => {
			// Feature2 has sticky sidebar + 3-col grid, not 2-col code blocks
			expect(feature2Content).toContain('lg:sticky')
			expect(feature2Content).toContain('lg:col-span-3')
		})
	})

	describe('foundation components', () => {
		it('imports Text component', () => {
			expect(feature2Content).toContain(
				"import Text from '@/components/fundations/elements/Text.astro'",
			)
		})

		it('imports Wrapper component', () => {
			expect(feature2Content).toContain(
				"import Wrapper from '@/components/fundations/containers/Wrapper.astro'",
			)
		})

		it('uses Text component for headline', () => {
			expect(feature2Content).toContain('<Text')
			expect(feature2Content).toContain('tag="h1"')
		})

		it('uses Text component for feature title', () => {
			expect(feature2Content).toContain('tag="h3"')
		})

		it('uses Text component for description', () => {
			expect(feature2Content).toContain('tag="p"')
		})
	})

	describe('AOS animations', () => {
		it('has data-aos attribute', () => {
			expect(feature2Content).toContain('data-aos')
		})

		it('has data-aos-duration attribute', () => {
			expect(feature2Content).toContain('data-aos-duration')
		})

		it('has animation prop', () => {
			expect(feature2Content).toContain('animation')
		})

		it('has animationDuration prop', () => {
			expect(feature2Content).toContain('animationDuration')
		})

		it('has default animation value', () => {
			expect(feature2Content).toContain("animation = 'fade-up'")
		})

		it('has default animationDuration value', () => {
			expect(feature2Content).toContain('animationDuration = 1500')
		})

		it('supports per-feature animation duration', () => {
			expect(feature2Content).toContain(
				'feature.animationDuration ?? animationDuration',
			)
		})
	})

	describe('NextNode color tokens', () => {
		it('uses base-* color tokens', () => {
			expect(feature2Content).toContain('base-')
		})

		it('uses gradient background class', () => {
			expect(feature2Content).toContain('bg-gradient-down')
		})

		it('uses text-white for light text', () => {
			expect(feature2Content).toContain('text-white')
		})

		it('uses base-400 for muted text', () => {
			expect(feature2Content).toContain('text-base-400')
		})
	})

	describe('TypeScript interface', () => {
		it('exports Feature2Item interface', () => {
			expect(feature2Content).toContain('export interface Feature2Item')
		})

		it('has Props interface', () => {
			expect(feature2Content).toContain('interface Props')
		})

		it('has features prop', () => {
			expect(feature2Content).toContain('features: Feature2Item[]')
		})

		it('extends HTMLAttributes for section', () => {
			expect(feature2Content).toContain("HTMLAttributes<'section'>")
		})
	})

	describe('Feature2Item interface', () => {
		it('has id property', () => {
			expect(feature2Content).toMatch(/Feature2Item[\s\S]*id: string/)
		})

		it('has title property', () => {
			expect(feature2Content).toMatch(/Feature2Item[\s\S]*title: string/)
		})

		it('has description property', () => {
			expect(feature2Content).toMatch(
				/Feature2Item[\s\S]*description: string/,
			)
		})

		it('has optional icon property', () => {
			expect(feature2Content).toMatch(/Feature2Item[\s\S]*icon\?:/)
		})

		it('has optional animationDuration property', () => {
			expect(feature2Content).toMatch(
				/Feature2Item[\s\S]*animationDuration\?: number/,
			)
		})
	})

	describe('Props interface', () => {
		it('has optional label prop', () => {
			expect(feature2Content).toContain('label?:')
		})

		it('has headline prop', () => {
			expect(feature2Content).toContain('headline: string')
		})

		it('has optional highlightedText prop', () => {
			expect(feature2Content).toContain('highlightedText?:')
		})

		it('has optional description prop', () => {
			expect(feature2Content).toMatch(/Props[\s\S]*description\?:/)
		})
	})

	describe('typography', () => {
		it('uses displayLG variant for headline', () => {
			expect(feature2Content).toContain('variant="displayLG"')
		})

		it('uses textLG variant for feature titles', () => {
			expect(feature2Content).toContain('variant="textLG"')
		})

		it('uses textSM variant for label and description', () => {
			expect(feature2Content).toContain('variant="textSM"')
		})

		it('uses textBase variant for main description', () => {
			expect(feature2Content).toContain('variant="textBase"')
		})

		it('uses font-display for headline', () => {
			expect(feature2Content).toContain('font-display')
		})

		it('uses text-balance for readability', () => {
			expect(feature2Content).toContain('text-balance')
		})
	})

	describe('styling', () => {
		it('has overflow-hidden for content containment', () => {
			expect(feature2Content).toContain('overflow-hidden')
		})

		it('has relative positioning', () => {
			expect(feature2Content).toContain('relative')
		})

		it('uses Wrapper standard variant', () => {
			expect(feature2Content).toContain('variant="standard"')
		})

		it('has sticky sidebar styling', () => {
			expect(feature2Content).toContain('lg:sticky')
			expect(feature2Content).toContain('lg:top-62')
		})

		it('has vertical line decoration', () => {
			expect(feature2Content).toContain('before:bg-white')
			expect(feature2Content).toContain('before:h-6')
			expect(feature2Content).toContain('before:w-px')
		})
	})

	describe('features rendering', () => {
		it('maps over features array', () => {
			expect(feature2Content).toContain('features.map')
		})

		it('renders feature title', () => {
			expect(feature2Content).toContain('{feature.title}')
		})

		it('renders feature description', () => {
			expect(feature2Content).toContain('{feature.description}')
		})

		it('conditionally renders icon', () => {
			expect(feature2Content).toContain('{feature.icon &&')
		})

		it('uses set:html for icon rendering', () => {
			expect(feature2Content).toContain('set:html={feature.icon}')
		})
	})

	describe('sidebar content', () => {
		it('conditionally renders label', () => {
			expect(feature2Content).toContain('label && (')
		})

		it('conditionally renders highlighted text', () => {
			expect(feature2Content).toContain('highlightedText && (')
		})

		it('conditionally renders description', () => {
			expect(feature2Content).toContain('description && (')
		})

		it('renders headline', () => {
			expect(feature2Content).toContain('{headline}')
		})
	})

	describe('semantic HTML', () => {
		it('uses dl for feature list', () => {
			expect(feature2Content).toContain('<dl')
		})

		it('uses dt for feature terms', () => {
			expect(feature2Content).toContain('<dt')
		})

		it('uses dd for feature definitions', () => {
			expect(feature2Content).toContain('<dd')
		})
	})
})
