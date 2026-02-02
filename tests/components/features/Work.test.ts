import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for Work.astro component
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required patterns.
 */

const workComponentPath = join(
	process.cwd(),
	'src/components/features/Work.astro',
)
const workContent = readFileSync(workComponentPath, 'utf-8')

describe('Work.astro', () => {
	describe('component structure', () => {
		it('exists at the expected path', () => {
			expect(workContent).toBeTruthy()
		})

		it('is a section element', () => {
			expect(workContent).toContain('<section')
		})

		it('uses Wrapper component for layout', () => {
			expect(workContent).toContain('import Wrapper')
			expect(workContent).toContain('<Wrapper')
		})

		it('uses 2-column grid layout for steps and image', () => {
			expect(workContent).toContain('lg:grid-cols-2')
		})

		it('has step-by-step layout', () => {
			expect(workContent).toContain('steps.map')
		})
	})

	describe('foundation components', () => {
		it('imports Text component', () => {
			expect(workContent).toContain(
				"import Text from '@/components/fundations/elements/Text.astro'",
			)
		})

		it('imports Wrapper component', () => {
			expect(workContent).toContain(
				"import Wrapper from '@/components/fundations/containers/Wrapper.astro'",
			)
		})

		it('uses Text component for headline', () => {
			expect(workContent).toContain('<Text')
			expect(workContent).toContain('tag="h2"')
		})

		it('uses Text component for step title', () => {
			expect(workContent).toContain('tag="h3"')
		})

		it('uses Text component for description', () => {
			expect(workContent).toContain('tag="p"')
		})
	})

	describe('AOS animations', () => {
		it('has data-aos attribute', () => {
			expect(workContent).toContain('data-aos')
		})

		it('has data-aos-duration attribute', () => {
			expect(workContent).toContain('data-aos-duration')
		})

		it('has animation prop', () => {
			expect(workContent).toContain('animation')
		})

		it('has animationDuration prop', () => {
			expect(workContent).toContain('animationDuration')
		})

		it('has default animation value', () => {
			expect(workContent).toContain("animation = 'fade-up'")
		})

		it('has default animationDuration value', () => {
			expect(workContent).toContain("animationDuration = '1500'")
		})

		it('supports staggered animation for steps', () => {
			expect(workContent).toContain('index * 200')
		})
	})

	describe('NextNode color tokens', () => {
		it('uses base-* color tokens', () => {
			expect(workContent).toContain('base-')
		})

		it('uses nextnode-* color tokens', () => {
			expect(workContent).toContain('nextnode-')
		})

		it('uses text-white for light text', () => {
			expect(workContent).toContain('text-white')
		})

		it('uses base-400 for muted text', () => {
			expect(workContent).toContain('text-base-400')
		})

		it('uses accent-400 for label text', () => {
			expect(workContent).toContain('text-accent-400')
		})
	})

	describe('TypeScript interface', () => {
		it('exports WorkStep interface', () => {
			expect(workContent).toContain('export interface WorkStep')
		})

		it('has Props interface', () => {
			expect(workContent).toContain('interface Props')
		})

		it('has steps prop', () => {
			expect(workContent).toContain('steps: WorkStep[]')
		})

		it('extends HTMLAttributes for section', () => {
			expect(workContent).toContain("HTMLAttributes<'section'>")
		})
	})

	describe('WorkStep interface', () => {
		it('has id property', () => {
			expect(workContent).toMatch(/WorkStep[\s\S]*id: string/)
		})

		it('has step property for number', () => {
			expect(workContent).toMatch(/WorkStep[\s\S]*step: number/)
		})

		it('has title property', () => {
			expect(workContent).toMatch(/WorkStep[\s\S]*title: string/)
		})

		it('has description property', () => {
			expect(workContent).toMatch(/WorkStep[\s\S]*description: string/)
		})
	})

	describe('Props interface', () => {
		it('has optional label prop', () => {
			expect(workContent).toContain('label?:')
		})

		it('has headline prop', () => {
			expect(workContent).toContain('headline: string')
		})

		it('has optional highlightedText prop', () => {
			expect(workContent).toContain('highlightedText?:')
		})

		it('has optional description prop', () => {
			expect(workContent).toMatch(/Props[\s\S]*description\?:/)
		})

		it('has optional imageUrl prop', () => {
			expect(workContent).toContain('imageUrl?:')
		})

		it('has optional imageAlt prop', () => {
			expect(workContent).toContain('imageAlt?:')
		})
	})

	describe('typography', () => {
		it('uses displayLG variant for headline', () => {
			expect(workContent).toContain('variant="displayLG"')
		})

		it('uses textLG variant for step titles', () => {
			expect(workContent).toContain('variant="textLG"')
		})

		it('uses textSM variant for label', () => {
			expect(workContent).toContain('variant="textSM"')
		})

		it('uses textBase variant for step descriptions', () => {
			expect(workContent).toContain('variant="textBase"')
		})

		it('uses font-display for headline', () => {
			expect(workContent).toContain('font-display')
		})

		it('uses text-balance for readability', () => {
			expect(workContent).toContain('text-balance')
		})
	})

	describe('styling', () => {
		it('has relative positioning', () => {
			expect(workContent).toContain('relative')
		})

		it('uses Wrapper standard variant', () => {
			expect(workContent).toContain('variant="standard"')
		})

		it('has vertical line for steps', () => {
			expect(workContent).toContain('border-l')
		})

		it('has step number circle', () => {
			expect(workContent).toContain('rounded-full')
		})

		it('uses nextnode-500 for step number background', () => {
			expect(workContent).toContain('bg-nextnode-500')
		})
	})

	describe('steps rendering', () => {
		it('maps over steps array', () => {
			expect(workContent).toContain('steps.map')
		})

		it('renders step number', () => {
			expect(workContent).toContain('{step.step}')
		})

		it('renders step title', () => {
			expect(workContent).toContain('{step.title}')
		})

		it('renders step description', () => {
			expect(workContent).toContain('{step.description}')
		})
	})

	describe('header content', () => {
		it('conditionally renders label', () => {
			expect(workContent).toContain('label && (')
		})

		it('conditionally renders highlighted text', () => {
			expect(workContent).toContain('highlightedText && (')
		})

		it('conditionally renders description', () => {
			expect(workContent).toContain('description && (')
		})

		it('renders headline', () => {
			expect(workContent).toContain('{headline}')
		})
	})

	describe('image section', () => {
		it('conditionally renders image', () => {
			expect(workContent).toContain('imageUrl && (')
		})

		it('renders img element', () => {
			expect(workContent).toContain('<img')
		})

		it('uses imageUrl for src', () => {
			expect(workContent).toContain('src={imageUrl}')
		})

		it('uses imageAlt for alt', () => {
			expect(workContent).toContain('alt={imageAlt}')
		})

		it('has default alt text', () => {
			expect(workContent).toContain(
				"imageAlt = 'How it works illustration'",
			)
		})
	})
})
