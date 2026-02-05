import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for Feature1.astro component
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required patterns.
 */

const feature1ComponentPath = join(
	process.cwd(),
	'src/components/features/Feature1.astro',
)
const feature1Content = readFileSync(feature1ComponentPath, 'utf-8')

describe('Feature1.astro', () => {
	describe('component structure', () => {
		it('exists at the expected path', () => {
			expect(feature1Content).toBeTruthy()
		})

		it('is a section element', () => {
			expect(feature1Content).toContain('<section')
		})

		it('uses Wrapper component for layout', () => {
			expect(feature1Content).toContain('import Wrapper')
			expect(feature1Content).toContain('<Wrapper')
		})

		it('uses two-column grid layout', () => {
			expect(feature1Content).toContain('md:grid-cols-2')
		})
	})

	describe('foundation components', () => {
		it('imports Text component', () => {
			expect(feature1Content).toContain(
				"import Text from '@/components/fundations/elements/Text.astro'",
			)
		})

		it('imports Wrapper component', () => {
			expect(feature1Content).toContain(
				"import Wrapper from '@/components/fundations/containers/Wrapper.astro'",
			)
		})

		it('uses Text component for title', () => {
			expect(feature1Content).toContain('<Text')
			expect(feature1Content).toContain('tag="h2"')
		})

		it('uses Text component for description', () => {
			expect(feature1Content).toContain('tag="p"')
		})
	})

	describe('Code component', () => {
		it('imports Code component from astro:components', () => {
			expect(feature1Content).toContain(
				"import { Code } from 'astro:components'",
			)
		})

		it('uses Code component', () => {
			expect(feature1Content).toContain('<Code')
		})

		it('applies css-variables theme', () => {
			expect(feature1Content).toContain('theme="css-variables"')
		})

		it('supports configurable language', () => {
			expect(feature1Content).toContain('lang={feature.codeBlock.lang')
		})
	})

	describe('AOS animations', () => {
		it('has data-aos attribute', () => {
			expect(feature1Content).toContain('data-aos')
		})

		it('has data-aos-duration attribute', () => {
			expect(feature1Content).toContain('data-aos-duration')
		})

		it('has animation prop', () => {
			expect(feature1Content).toContain('animation')
		})

		it('has animationDuration prop', () => {
			expect(feature1Content).toContain('animationDuration')
		})

		it('has default animation value', () => {
			expect(feature1Content).toContain("animation = 'fade-up'")
		})
	})

	describe('NextNode color tokens', () => {
		it('uses slate color tokens for light mode', () => {
			expect(feature1Content).toContain('slate-')
		})

		it('uses text-slate-900 for main text', () => {
			expect(feature1Content).toContain('text-slate-900')
		})

		it('uses bg-slate-50 for card background', () => {
			expect(feature1Content).toContain('bg-slate-50')
		})

		it('uses text-slate-600 for description text', () => {
			expect(feature1Content).toContain('text-slate-600')
		})
	})

	describe('TypeScript interface', () => {
		it('exports FeatureItem interface', () => {
			expect(feature1Content).toContain('export interface FeatureItem')
		})

		it('exports FeatureCodeBlock interface', () => {
			expect(feature1Content).toContain(
				'export interface FeatureCodeBlock',
			)
		})

		it('has Props interface', () => {
			expect(feature1Content).toContain('interface Props')
		})

		it('has features prop', () => {
			expect(feature1Content).toContain('features: FeatureItem[]')
		})

		it('extends HTMLAttributes for section', () => {
			expect(feature1Content).toContain("HTMLAttributes<'section'>")
		})
	})

	describe('FeatureItem interface', () => {
		it('has id property', () => {
			expect(feature1Content).toMatch(/FeatureItem[\s\S]*id: string/)
		})

		it('has title property', () => {
			expect(feature1Content).toMatch(/FeatureItem[\s\S]*title: string/)
		})

		it('has description property', () => {
			expect(feature1Content).toMatch(
				/FeatureItem[\s\S]*description: string/,
			)
		})

		it('has optional codeBlock property', () => {
			expect(feature1Content).toMatch(/FeatureItem[\s\S]*codeBlock\?:/)
		})
	})

	describe('FeatureCodeBlock interface', () => {
		it('has code property', () => {
			expect(feature1Content).toMatch(
				/FeatureCodeBlock[\s\S]*code: string/,
			)
		})

		it('has optional lang property', () => {
			expect(feature1Content).toMatch(/FeatureCodeBlock[\s\S]*lang\?:/)
		})
	})

	describe('typography', () => {
		it('uses displayLG variant for title', () => {
			expect(feature1Content).toContain('variant="displayLG"')
		})

		it('uses textBase variant for description', () => {
			expect(feature1Content).toContain('variant="textBase"')
		})

		it('uses font-display for title', () => {
			expect(feature1Content).toContain('font-display')
		})

		it('uses text-balance for readability', () => {
			expect(feature1Content).toContain('text-balance')
		})
	})

	describe('styling', () => {
		it('has overflow-hidden for content containment', () => {
			expect(feature1Content).toContain('overflow-hidden')
		})

		it('has relative positioning', () => {
			expect(feature1Content).toContain('relative')
		})

		it('uses Wrapper standard variant', () => {
			expect(feature1Content).toContain('variant="standard"')
		})

		it('has border styling', () => {
			expect(feature1Content).toContain('border-slate-200')
		})

		it('uses shadow-dimensional for code block', () => {
			expect(feature1Content).toContain('shadow-dimensional')
		})
	})

	describe('code block styling', () => {
		it('has code window dots', () => {
			expect(feature1Content).toContain('bg-red-400')
			expect(feature1Content).toContain('bg-yellow-400')
			expect(feature1Content).toContain('bg-green-400')
		})

		it('uses scrollbar-hide on code', () => {
			expect(feature1Content).toContain('scrollbar-hide')
		})

		it('uses text-xs for code font size', () => {
			expect(feature1Content).toContain('text-xs')
		})
	})

	describe('features rendering', () => {
		it('maps over features array', () => {
			expect(feature1Content).toContain('features.map')
		})

		it('renders feature title', () => {
			expect(feature1Content).toContain('{feature.title}')
		})

		it('renders feature description', () => {
			expect(feature1Content).toContain('{feature.description}')
		})

		it('conditionally renders code block', () => {
			expect(feature1Content).toContain('{feature.codeBlock &&')
		})
	})
})
