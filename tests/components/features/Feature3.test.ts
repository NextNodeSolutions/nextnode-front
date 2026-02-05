import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for Feature3.astro component
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required patterns.
 */

const feature3ComponentPath = join(
	process.cwd(),
	'src/components/features/Feature3.astro',
)
const feature3Content = readFileSync(feature3ComponentPath, 'utf-8')

describe('Feature3.astro', () => {
	describe('component structure', () => {
		it('exists at the expected path', () => {
			expect(feature3Content).toBeTruthy()
		})

		it('is a section element', () => {
			expect(feature3Content).toContain('<section')
		})

		it('uses Wrapper component for layout', () => {
			expect(feature3Content).toContain('import Wrapper')
			expect(feature3Content).toContain('<Wrapper')
		})

		it('uses four-column grid layout for lg screens', () => {
			expect(feature3Content).toContain('lg:grid-cols-4')
		})

		it('uses two-column span for content areas', () => {
			expect(feature3Content).toContain('lg:col-span-2')
		})
	})

	describe('foundation components', () => {
		it('imports Text component', () => {
			expect(feature3Content).toContain(
				"import Text from '@/components/fundations/elements/Text.astro'",
			)
		})

		it('imports Wrapper component', () => {
			expect(feature3Content).toContain(
				"import Wrapper from '@/components/fundations/containers/Wrapper.astro'",
			)
		})

		it('uses Text component for headline', () => {
			expect(feature3Content).toContain('<Text')
			expect(feature3Content).toContain('tag="h3"')
		})

		it('uses Text component for description', () => {
			expect(feature3Content).toContain('tag="p"')
		})

		it('uses Text component for label', () => {
			expect(feature3Content).toContain('tag="span"')
		})
	})

	describe('Code component', () => {
		it('imports Code component from astro:components', () => {
			expect(feature3Content).toContain(
				"import { Code } from 'astro:components'",
			)
		})

		it('uses Code component', () => {
			expect(feature3Content).toContain('<Code')
		})

		it('applies css-variables theme', () => {
			expect(feature3Content).toContain('theme="css-variables"')
		})

		it('supports configurable language', () => {
			expect(feature3Content).toContain('lang={codeBlock.lang')
		})
	})

	describe('AOS animations', () => {
		it('has data-aos attribute', () => {
			expect(feature3Content).toContain('data-aos')
		})

		it('has data-aos-duration attribute', () => {
			expect(feature3Content).toContain('data-aos-duration')
		})

		it('has animation prop', () => {
			expect(feature3Content).toContain('animation')
		})

		it('has animationDuration prop', () => {
			expect(feature3Content).toContain('animationDuration')
		})

		it('has default animation value', () => {
			expect(feature3Content).toContain("animation = 'fade-up'")
		})
	})

	describe('NextNode color tokens', () => {
		it('uses slate color tokens for light mode', () => {
			expect(feature3Content).toContain('slate-')
		})

		it('uses text-slate-900 for main text', () => {
			expect(feature3Content).toContain('text-slate-900')
		})

		it('uses nextnode-400 for highlighted text', () => {
			expect(feature3Content).toContain('text-nextnode-400')
		})

		it('uses text-slate-600 for muted text', () => {
			expect(feature3Content).toContain('text-slate-600')
		})
	})

	describe('TypeScript interface', () => {
		it('exports Feature3Item interface', () => {
			expect(feature3Content).toContain('export interface Feature3Item')
		})

		it('exports Feature3CodeBlock interface', () => {
			expect(feature3Content).toContain(
				'export interface Feature3CodeBlock',
			)
		})

		it('has Props interface', () => {
			expect(feature3Content).toContain('interface Props')
		})

		it('has features prop', () => {
			expect(feature3Content).toContain('features: Feature3Item[]')
		})

		it('extends HTMLAttributes for section', () => {
			expect(feature3Content).toContain("HTMLAttributes<'section'>")
		})
	})

	describe('Feature3Item interface', () => {
		it('has id property', () => {
			expect(feature3Content).toMatch(/Feature3Item[\s\S]*id: string/)
		})

		it('has tagline property', () => {
			expect(feature3Content).toMatch(
				/Feature3Item[\s\S]*tagline: string/,
			)
		})

		it('has title property', () => {
			expect(feature3Content).toMatch(/Feature3Item[\s\S]*title: string/)
		})

		it('has description property', () => {
			expect(feature3Content).toMatch(
				/Feature3Item[\s\S]*description: string/,
			)
		})
	})

	describe('Feature3CodeBlock interface', () => {
		it('has code property', () => {
			expect(feature3Content).toMatch(
				/Feature3CodeBlock[\s\S]*code: string/,
			)
		})

		it('has optional lang property', () => {
			expect(feature3Content).toMatch(/Feature3CodeBlock[\s\S]*lang\?:/)
		})
	})

	describe('Props interface', () => {
		it('has optional label prop', () => {
			expect(feature3Content).toMatch(/Props[\s\S]*label\?:/)
		})

		it('has headline prop', () => {
			expect(feature3Content).toMatch(/Props[\s\S]*headline: string/)
		})

		it('has optional highlightedText prop', () => {
			expect(feature3Content).toMatch(/Props[\s\S]*highlightedText\?:/)
		})

		it('has optional description prop', () => {
			expect(feature3Content).toMatch(/Props[\s\S]*description\?:/)
		})

		it('has optional codeBlock prop', () => {
			expect(feature3Content).toMatch(/Props[\s\S]*codeBlock\?:/)
		})
	})

	describe('typography', () => {
		it('uses displayMD variant for headline', () => {
			expect(feature3Content).toContain('variant="displayMD"')
		})

		it('uses textBase variant for content', () => {
			expect(feature3Content).toContain('variant="textBase"')
		})

		it('uses textSM variant for labels and taglines', () => {
			expect(feature3Content).toContain('variant="textSM"')
		})

		it('uses font-display for headline', () => {
			expect(feature3Content).toContain('font-display')
		})

		it('uses text-balance for readability', () => {
			expect(feature3Content).toContain('text-balance')
		})

		it('uses text-pretty for feature descriptions', () => {
			expect(feature3Content).toContain('text-pretty')
		})
	})

	describe('layout', () => {
		it('uses md:grid-cols-2 for feature grid', () => {
			expect(feature3Content).toContain('md:grid-cols-2')
		})

		it('has responsive padding', () => {
			expect(feature3Content).toContain('py-12')
			expect(feature3Content).toContain('lg:pt-42')
		})

		it('uses relative positioning', () => {
			expect(feature3Content).toContain('relative')
		})

		it('uses Wrapper standard variant', () => {
			expect(feature3Content).toContain('variant="standard"')
		})
	})

	describe('code block styling', () => {
		it('has code window dots', () => {
			expect(feature3Content).toContain('outline-base-600')
			expect(feature3Content).toContain('outline-base-700')
			expect(feature3Content).toContain('outline-base-800')
		})

		it('uses scrollbar-hide on code', () => {
			expect(feature3Content).toContain('scrollbar-hide')
		})

		it('uses text-xs for code font size', () => {
			expect(feature3Content).toContain('text-xs')
		})

		it('has border styling', () => {
			expect(feature3Content).toContain('border-slate-200')
		})

		it('has background styling', () => {
			expect(feature3Content).toContain('bg-slate-100')
		})
	})

	describe('feature item styling', () => {
		it('has vertical line decoration', () => {
			expect(feature3Content).toContain('before:h-6')
			expect(feature3Content).toContain('before:w-px')
			expect(feature3Content).toContain('before:bg-nextnode-500')
		})

		it('has gap for feature items', () => {
			expect(feature3Content).toContain('gap-y-12')
		})
	})

	describe('features rendering', () => {
		it('maps over features array', () => {
			expect(feature3Content).toContain('features.map')
		})

		it('renders feature tagline', () => {
			expect(feature3Content).toContain('{item.tagline}')
		})

		it('renders feature title', () => {
			expect(feature3Content).toContain('{item.title}')
		})

		it('renders feature description', () => {
			expect(feature3Content).toContain('{item.description}')
		})

		it('conditionally renders code block', () => {
			expect(feature3Content).toContain('codeBlock && (')
		})
	})

	describe('conditional rendering', () => {
		it('conditionally renders label', () => {
			expect(feature3Content).toContain('label && (')
		})

		it('conditionally renders highlightedText', () => {
			expect(feature3Content).toContain('highlightedText && (')
		})

		it('conditionally renders description', () => {
			expect(feature3Content).toContain('description && (')
		})
	})

	describe('different layout than Feature1 and Feature2', () => {
		it('does not have sticky positioning (unlike Feature2)', () => {
			expect(feature3Content).not.toContain('lg:sticky')
		})

		it('does not use definition list (unlike Feature2)', () => {
			expect(feature3Content).not.toContain('<dl')
		})

		it('has tagline property in feature items (unique to Feature3)', () => {
			expect(feature3Content).toContain('tagline')
		})

		it('uses displayMD for headline (smaller than Feature1 displayLG)', () => {
			expect(feature3Content).toContain('variant="displayMD"')
		})
	})
})
