import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for Stats1.astro component
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required patterns.
 */

const stats1ComponentPath = join(
	process.cwd(),
	'src/components/stats/Stats1.astro',
)
const stats1Content = readFileSync(stats1ComponentPath, 'utf-8')

describe('Stats1.astro', () => {
	describe('component structure', () => {
		it('exists at the expected path', () => {
			expect(stats1Content).toBeTruthy()
		})

		it('is a section element', () => {
			expect(stats1Content).toContain('<section')
		})

		it('uses Wrapper component for layout', () => {
			expect(stats1Content).toContain('import Wrapper')
			expect(stats1Content).toContain('<Wrapper')
		})

		it('uses two-column grid layout', () => {
			expect(stats1Content).toContain('lg:grid-cols-2')
		})

		it('has responsive stat columns', () => {
			expect(stats1Content).toContain('sm:grid-cols-4')
		})
	})

	describe('foundation components', () => {
		it('imports Text component', () => {
			expect(stats1Content).toContain(
				"import Text from '@/components/fundations/elements/Text.astro'",
			)
		})

		it('imports Wrapper component', () => {
			expect(stats1Content).toContain(
				"import Wrapper from '@/components/fundations/containers/Wrapper.astro'",
			)
		})

		it('uses Text component for headline', () => {
			expect(stats1Content).toContain('<Text')
			expect(stats1Content).toContain('tag="h2"')
		})

		it('uses Text component for description', () => {
			expect(stats1Content).toContain('tag="p"')
		})

		it('uses Text component for label', () => {
			expect(stats1Content).toContain('tag="span"')
		})
	})

	describe('AOS animations', () => {
		it('has data-aos attribute', () => {
			expect(stats1Content).toContain('data-aos')
		})

		it('has data-aos-duration attribute', () => {
			expect(stats1Content).toContain('data-aos-duration')
		})

		it('has animation prop', () => {
			expect(stats1Content).toContain('animation')
		})

		it('has animationDuration prop', () => {
			expect(stats1Content).toContain('animationDuration')
		})

		it('has default animation value', () => {
			expect(stats1Content).toContain("animation = 'fade-up'")
		})

		it('has default animationDuration value', () => {
			expect(stats1Content).toContain("animationDuration = '1500'")
		})
	})

	describe('NextNode color tokens', () => {
		it('uses base-* color tokens', () => {
			expect(stats1Content).toContain('base-')
		})

		it('uses text-white for light text', () => {
			expect(stats1Content).toContain('text-white')
		})

		it('uses base-400 for muted text', () => {
			expect(stats1Content).toContain('text-base-400')
		})

		it('uses nextnode-400 for highlighted text', () => {
			expect(stats1Content).toContain('text-nextnode-400')
		})

		it('uses gradient background class when chart enabled', () => {
			expect(stats1Content).toContain('bg-gradient-up')
		})
	})

	describe('TypeScript interface', () => {
		it('exports StatItem interface', () => {
			expect(stats1Content).toContain('export interface StatItem')
		})

		it('has Props interface', () => {
			expect(stats1Content).toContain('interface Props')
		})

		it('has stats prop', () => {
			expect(stats1Content).toContain('stats: StatItem[]')
		})

		it('extends HTMLAttributes for section', () => {
			expect(stats1Content).toContain("HTMLAttributes<'section'>")
		})
	})

	describe('StatItem interface', () => {
		it('has id property', () => {
			expect(stats1Content).toMatch(/StatItem[\s\S]*id: string/)
		})

		it('has label property', () => {
			expect(stats1Content).toMatch(/StatItem[\s\S]*label: string/)
		})

		it('has target property', () => {
			expect(stats1Content).toMatch(/StatItem[\s\S]*target: number/)
		})

		it('has optional suffix property', () => {
			expect(stats1Content).toMatch(/StatItem[\s\S]*suffix\?:/)
		})

		it('has optional prefix property', () => {
			expect(stats1Content).toMatch(/StatItem[\s\S]*prefix\?:/)
		})
	})

	describe('Props interface', () => {
		it('has optional label prop', () => {
			expect(stats1Content).toContain('label?:')
		})

		it('has headline prop', () => {
			expect(stats1Content).toContain('headline:')
		})

		it('has optional highlightedText prop', () => {
			expect(stats1Content).toContain('highlightedText?:')
		})

		it('has optional description prop', () => {
			expect(stats1Content).toContain('description?:')
		})

		it('has optional secondaryDescription prop', () => {
			expect(stats1Content).toContain('secondaryDescription?:')
		})

		it('has optional showChart prop', () => {
			expect(stats1Content).toContain('showChart?:')
		})
	})

	describe('typography', () => {
		it('uses displayLG variant for headline', () => {
			expect(stats1Content).toContain('variant="displayLG"')
		})

		it('uses textBase variant for description', () => {
			expect(stats1Content).toContain('variant="textBase"')
		})

		it('uses textSM variant for label', () => {
			expect(stats1Content).toContain('variant="textSM"')
		})

		it('uses font-display for headline', () => {
			expect(stats1Content).toContain('font-display')
		})

		it('uses text-balance for readability', () => {
			expect(stats1Content).toContain('text-balance')
		})
	})

	describe('styling', () => {
		it('has overflow-hidden for content containment', () => {
			expect(stats1Content).toContain('overflow-hidden')
		})

		it('has relative positioning', () => {
			expect(stats1Content).toContain('relative')
		})

		it('uses Wrapper standard variant', () => {
			expect(stats1Content).toContain('variant="standard"')
		})

		it('has py-24 padding', () => {
			expect(stats1Content).toContain('py-24')
		})
	})

	describe('stat item styling', () => {
		it('has vertical line decoration with before pseudo-element', () => {
			expect(stats1Content).toContain('before:bg-white')
		})

		it('has before:h-6 for line height', () => {
			expect(stats1Content).toContain('before:h-6')
		})

		it('has before:w-px for line width', () => {
			expect(stats1Content).toContain('before:w-px')
		})

		it('positions line at left with before:left-0', () => {
			expect(stats1Content).toContain('before:left-0')
		})

		it('positions line at top with before:top-0', () => {
			expect(stats1Content).toContain('before:top-0')
		})
	})

	describe('stats rendering', () => {
		it('maps over stats array', () => {
			expect(stats1Content).toContain('statsWithIds.map')
		})

		it('renders stat label', () => {
			expect(stats1Content).toContain('{stat.label}')
		})

		it('has unique element IDs for counters', () => {
			expect(stats1Content).toContain('stat.elementId')
		})

		it('passes target as data attribute', () => {
			expect(stats1Content).toContain('data-target={stat.target}')
		})

		it('passes prefix as data attribute', () => {
			expect(stats1Content).toContain('data-prefix={stat.prefix')
		})

		it('passes suffix as data attribute', () => {
			expect(stats1Content).toContain('data-suffix={stat.suffix')
		})
	})

	describe('conditional rendering', () => {
		it('conditionally renders label', () => {
			expect(stats1Content).toContain('label && (')
		})

		it('conditionally renders highlightedText', () => {
			expect(stats1Content).toContain('highlightedText && (')
		})

		it('conditionally renders description', () => {
			expect(stats1Content).toContain('description && (')
		})

		it('conditionally renders secondaryDescription', () => {
			expect(stats1Content).toContain('secondaryDescription && (')
		})

		it('conditionally renders chart', () => {
			expect(stats1Content).toContain('showChart && (')
		})
	})

	describe('counter script', () => {
		it('has script tag', () => {
			expect(stats1Content).toContain('<script>')
		})

		it('uses IntersectionObserver for viewport detection', () => {
			expect(stats1Content).toContain('IntersectionObserver')
		})

		it('queries counter elements by ID prefix', () => {
			expect(stats1Content).toContain('[id^="stat-count-"]')
		})

		it('reads target from data attribute', () => {
			expect(stats1Content).toContain('element.dataset.target')
		})

		it('reads prefix from data attribute', () => {
			expect(stats1Content).toContain('element.dataset.prefix')
		})

		it('reads suffix from data attribute', () => {
			expect(stats1Content).toContain('element.dataset.suffix')
		})

		it('uses setInterval for animation', () => {
			expect(stats1Content).toContain('setInterval')
		})

		it('clears interval when target reached', () => {
			expect(stats1Content).toContain('clearInterval')
		})

		it('handles Astro page transitions', () => {
			expect(stats1Content).toContain('astro:page-load')
		})

		it('handles DOMContentLoaded', () => {
			expect(stats1Content).toContain('DOMContentLoaded')
		})
	})

	describe('chart container', () => {
		it('has canvas element for chart', () => {
			expect(stats1Content).toContain('<canvas')
		})

		it('has chart ID', () => {
			expect(stats1Content).toContain('id="stats1-chart"')
		})

		it('uses border-base-900 for chart container', () => {
			expect(stats1Content).toContain('border-base-900')
		})

		it('has max height constraint', () => {
			expect(stats1Content).toContain('lg:max-h-100')
		})
	})
})
