import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

describe('Design System Colors Page', () => {
	const filePath = join(process.cwd(), 'src/pages/system/colors.astro')
	const content = readFileSync(filePath, 'utf-8')

	describe('Layout Integration', () => {
		it('uses BaseLayout', () => {
			expect(content).toContain(
				"import BaseLayout from '@/layouts/BaseLayout.astro'",
			)
		})

		it('wraps content in BaseLayout', () => {
			expect(content).toContain('<BaseLayout')
			expect(content).toContain('</BaseLayout>')
		})

		it('has page title defined', () => {
			expect(content).toContain("const title = 'Colors | Design System'")
		})

		it('has page description defined', () => {
			expect(content).toContain('const description =')
			expect(content).toContain('NextNode color palette')
		})

		it('passes title prop to BaseLayout', () => {
			expect(content).toContain('title={title}')
		})

		it('passes description prop to BaseLayout', () => {
			expect(content).toContain('description={description}')
		})
	})

	describe('Component Imports', () => {
		it('imports Text component', () => {
			expect(content).toContain(
				"import Text from '@/components/fundations/elements/Text.astro'",
			)
		})

		it('imports Wrapper component', () => {
			expect(content).toContain(
				"import Wrapper from '@/components/fundations/containers/Wrapper.astro'",
			)
		})
	})

	describe('Page Structure', () => {
		it('has section element', () => {
			expect(content).toContain('<section>')
		})

		it('uses Wrapper with standard variant', () => {
			expect(content).toContain('Wrapper variant="standard"')
		})

		it('has h1 heading', () => {
			expect(content).toContain('tag="h1"')
		})

		it('uses displayXL variant for heading', () => {
			expect(content).toContain('variant="displayXL"')
		})

		it('has page title text', () => {
			expect(content).toContain('Colors')
			expect(content).toContain('</Text>')
		})

		it('has descriptive paragraph', () => {
			expect(content).toContain('NextNode color palette using OKLCH')
		})
	})

	describe('TypeScript Interfaces', () => {
		it('defines Color interface', () => {
			expect(content).toContain('interface Color')
		})

		it('defines ColorGroup interface', () => {
			expect(content).toContain('interface ColorGroup')
		})

		it('Color interface has name property', () => {
			expect(content).toContain('name: string')
		})

		it('Color interface has class property', () => {
			expect(content).toContain('class: string')
		})

		it('Color interface has value property', () => {
			expect(content).toContain('value: string')
		})

		it('ColorGroup interface has colors array', () => {
			expect(content).toContain('colors: Color[]')
		})
	})

	describe('NextNode Brand Colors', () => {
		it('has NextNode Brand group title', () => {
			expect(content).toContain("title: 'NextNode Brand'")
		})

		it('shows nextnode-50', () => {
			expect(content).toContain("name: 'NextNode 50'")
			expect(content).toContain("class: 'bg-nextnode-50'")
		})

		it('shows nextnode-100', () => {
			expect(content).toContain("name: 'NextNode 100'")
			expect(content).toContain("class: 'bg-nextnode-100'")
		})

		it('shows nextnode-200', () => {
			expect(content).toContain("name: 'NextNode 200'")
			expect(content).toContain("class: 'bg-nextnode-200'")
		})

		it('shows nextnode-300', () => {
			expect(content).toContain("name: 'NextNode 300'")
			expect(content).toContain("class: 'bg-nextnode-300'")
		})

		it('shows nextnode-400', () => {
			expect(content).toContain("name: 'NextNode 400'")
			expect(content).toContain("class: 'bg-nextnode-400'")
		})

		it('shows nextnode-500', () => {
			expect(content).toContain("name: 'NextNode 500'")
			expect(content).toContain("class: 'bg-nextnode-500'")
		})

		it('shows nextnode-600', () => {
			expect(content).toContain("name: 'NextNode 600'")
			expect(content).toContain("class: 'bg-nextnode-600'")
		})

		it('shows nextnode-700', () => {
			expect(content).toContain("name: 'NextNode 700'")
			expect(content).toContain("class: 'bg-nextnode-700'")
		})

		it('shows nextnode-800', () => {
			expect(content).toContain("name: 'NextNode 800'")
			expect(content).toContain("class: 'bg-nextnode-800'")
		})

		it('shows nextnode-900', () => {
			expect(content).toContain("name: 'NextNode 900'")
			expect(content).toContain("class: 'bg-nextnode-900'")
		})

		it('shows nextnode-950', () => {
			expect(content).toContain("name: 'NextNode 950'")
			expect(content).toContain("class: 'bg-nextnode-950")
		})
	})

	describe('Accent Colors', () => {
		it('has Accent group title', () => {
			expect(content).toContain("title: 'Accent'")
		})

		it('shows accent-50', () => {
			expect(content).toContain("name: 'Accent 50'")
			expect(content).toContain("class: 'bg-accent-50'")
		})

		it('shows accent-500', () => {
			expect(content).toContain("name: 'Accent 500'")
			expect(content).toContain("class: 'bg-accent-500'")
		})

		it('shows accent-950', () => {
			expect(content).toContain("name: 'Accent 950'")
			expect(content).toContain("class: 'bg-accent-950")
		})

		it('describes accent as alias', () => {
			expect(content).toContain('aliased to NextNode brand')
		})
	})

	describe('Orange Colors', () => {
		it('has Orange group title', () => {
			expect(content).toContain("title: 'Orange'")
		})

		it('shows orange-50', () => {
			expect(content).toContain("name: 'Orange 50'")
			expect(content).toContain("class: 'bg-orange-50'")
		})

		it('shows orange-500', () => {
			expect(content).toContain("name: 'Orange 500'")
			expect(content).toContain("class: 'bg-orange-500'")
		})

		it('shows orange-950', () => {
			expect(content).toContain("name: 'Orange 950'")
			expect(content).toContain("class: 'bg-orange-950")
		})

		it('describes orange as CTA accent', () => {
			expect(content).toContain('Orange accent')
			expect(content).toContain('CTAs')
		})
	})

	describe('Base Colors', () => {
		it('has Base group title', () => {
			expect(content).toContain("title: 'Base'")
		})

		it('shows base-50', () => {
			expect(content).toContain("name: 'Base 50'")
			expect(content).toContain("class: 'bg-base-50'")
		})

		it('shows base-500', () => {
			expect(content).toContain("name: 'Base 500'")
			expect(content).toContain("class: 'bg-base-500'")
		})

		it('shows base-950', () => {
			expect(content).toContain("name: 'Base 950'")
			expect(content).toContain("class: 'bg-base-950")
		})

		it('describes base as neutral scale', () => {
			expect(content).toContain('Neutral gray scale')
		})
	})

	describe('Special Colors', () => {
		it('has Special group title', () => {
			expect(content).toContain("title: 'Special'")
		})

		it('shows white color', () => {
			expect(content).toContain("name: 'White'")
			expect(content).toContain('bg-white')
		})

		it('shows gradient up', () => {
			expect(content).toContain("name: 'Gradient Up'")
			expect(content).toContain('bg-gradient-up')
		})

		it('shows gradient down', () => {
			expect(content).toContain("name: 'Gradient Down'")
			expect(content).toContain('bg-gradient-down')
		})
	})

	describe('Color Values', () => {
		it('includes OKLCH values for nextnode colors (teal hue 175)', () => {
			expect(content).toContain('oklch(0.97 0.02 175)')
			expect(content).toContain('oklch(0.60 0.13 175)')
		})

		it('includes OKLCH values for orange colors (hue 35-55)', () => {
			expect(content).toContain('oklch(0.98 0.02 55)')
			expect(content).toContain('oklch(0.70 0.19 40)')
		})

		it('includes OKLCH values for base colors', () => {
			expect(content).toContain('oklch(96.74% 0.001 286.38)')
			expect(content).toContain('oklch(16.89% 0.002 286.18)')
		})

		it('includes hex value for white', () => {
			expect(content).toContain('#ffffff')
		})
	})

	describe('Usage Guidelines Section', () => {
		it('has Usage Guidelines heading', () => {
			expect(content).toContain('Usage Guidelines')
		})

		it('has Brand Colors guideline', () => {
			expect(content).toContain('Brand Colors')
			expect(content).toContain('nextnode-*')
		})

		it('has Accent Colors guideline', () => {
			expect(content).toContain('Accent Colors')
			expect(content).toContain('accent-*')
		})

		it('has Orange Accent guideline', () => {
			expect(content).toContain('Orange Accent')
			expect(content).toContain('orange-*')
		})

		it('has Base Colors guideline', () => {
			expect(content).toContain('Base Colors')
			expect(content).toContain('base-*')
		})

		it('uses code tags for token references', () => {
			expect(content).toContain('<code class=')
		})
	})

	describe('Grid Layout', () => {
		it('uses responsive grid for colors', () => {
			expect(content).toContain('grid-cols-2')
			expect(content).toContain('sm:grid-cols-3')
			expect(content).toContain('md:grid-cols-4')
			expect(content).toContain('lg:grid-cols-6')
		})

		it('has gap between grid items', () => {
			expect(content).toContain('gap-4')
		})

		it('uses space-y for group spacing', () => {
			expect(content).toContain('space-y-16')
		})

		it('uses md:grid-cols-2 for guidelines', () => {
			expect(content).toContain('md:grid-cols-2')
		})
	})

	describe('Color Swatch Styling', () => {
		it('uses rounded corners for swatches', () => {
			expect(content).toContain('rounded-lg')
		})

		it('sets swatch height', () => {
			expect(content).toContain('h-16')
		})

		it('uses full width for swatches', () => {
			expect(content).toContain('w-full')
		})

		it('uses class:list for dynamic classes', () => {
			expect(content).toContain('class:list={[')
		})
	})

	describe('Typography', () => {
		it('uses displaySM for section headings', () => {
			expect(content).toContain('variant="displaySM"')
		})

		it('uses textLG for intro paragraph', () => {
			expect(content).toContain('variant="textLG"')
		})

		it('uses textBase for descriptions', () => {
			expect(content).toContain('variant="textBase"')
		})

		it('uses textSM for guideline content', () => {
			expect(content).toContain('variant="textSM"')
		})

		it('uses font-display for headings', () => {
			expect(content).toContain('font-display')
		})

		it('uses font-mono for color values', () => {
			expect(content).toContain('font-mono')
		})
	})

	describe('Color Tokens Used', () => {
		it('uses white text color', () => {
			expect(content).toContain('text-white')
		})

		it('uses base-300 for descriptions', () => {
			expect(content).toContain('text-base-300')
		})

		it('uses base-400 for secondary text', () => {
			expect(content).toContain('text-base-400')
		})

		it('uses base-500 for muted text', () => {
			expect(content).toContain('text-base-500')
		})

		it('uses base-800 for code backgrounds', () => {
			expect(content).toContain('bg-base-800')
		})

		it('uses base-900 for card backgrounds', () => {
			expect(content).toContain('bg-base-900')
		})
	})
})
