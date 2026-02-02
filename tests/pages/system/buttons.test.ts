import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

describe('Design System Buttons Page', () => {
	const filePath = join(process.cwd(), 'src/pages/system/buttons.astro')
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
			expect(content).toContain("const title = 'Buttons | Design System'")
		})

		it('has page description defined', () => {
			expect(content).toContain(
				"const description = 'Button component variants and sizes",
			)
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

		it('imports Button component', () => {
			expect(content).toContain(
				"import Button from '@/components/fundations/elements/Button.astro'",
			)
		})

		it('imports Wrapper component', () => {
			expect(content).toContain(
				"import Wrapper from '@/components/fundations/containers/Wrapper.astro'",
			)
		})

		it('imports Plus icon', () => {
			expect(content).toContain(
				"import Plus from '@/components/fundations/icons/Plus.astro'",
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
			expect(content).toContain('Buttons')
			expect(content).toContain('</Text>')
		})

		it('has descriptive paragraph', () => {
			expect(content).toContain(
				'Button component with multiple visual variants',
			)
		})
	})

	describe('Default Variant', () => {
		it('has Default text label', () => {
			expect(content).toContain('Default text')
		})

		it('shows all default variant sizes', () => {
			expect(content).toContain('variant="default">Default XXS</Button>')
			expect(content).toContain('variant="default">Default XS</Button>')
			expect(content).toContain('variant="default">Default SM</Button>')
			expect(content).toContain('variant="default">Default Base</Button>')
			expect(content).toContain('variant="default">Default MD</Button>')
			expect(content).toContain('variant="default">Default LG</Button>')
			expect(content).toContain('variant="default">Default XL</Button>')
		})

		it('has icon-only default buttons', () => {
			expect(content).toContain('variant="default" iconOnly')
		})
	})

	describe('Accent Variant', () => {
		it('has Accent text label', () => {
			expect(content).toContain('Accent text')
		})

		it('shows all accent variant sizes', () => {
			expect(content).toContain('variant="accent">Accent XXS</Button>')
			expect(content).toContain('variant="accent">Accent XS</Button>')
			expect(content).toContain('variant="accent">Accent SM</Button>')
			expect(content).toContain('variant="accent">Accent Base</Button>')
			expect(content).toContain('variant="accent">Accent MD</Button>')
			expect(content).toContain('variant="accent">Accent LG</Button>')
			expect(content).toContain('variant="accent">Accent XL</Button>')
		})

		it('has icon-only accent buttons', () => {
			expect(content).toContain('variant="accent" iconOnly')
		})
	})

	describe('Muted Variant', () => {
		it('has Muted text label', () => {
			expect(content).toContain('Muted text')
		})

		it('shows all muted variant sizes', () => {
			expect(content).toContain('variant="muted">Muted XXS</Button>')
			expect(content).toContain('variant="muted">Muted XS</Button>')
			expect(content).toContain('variant="muted">Muted SM</Button>')
			expect(content).toContain('variant="muted">Muted Base</Button>')
			expect(content).toContain('variant="muted">Muted MD</Button>')
			expect(content).toContain('variant="muted">Muted LG</Button>')
			expect(content).toContain('variant="muted">Muted XL</Button>')
		})

		it('has icon-only muted buttons', () => {
			expect(content).toContain('variant="muted" iconOnly')
		})
	})

	describe('Link Variant', () => {
		it('has Link Variant section heading', () => {
			expect(content).toContain('>Link Variant</Text>')
		})

		it('has link variant description', () => {
			expect(content).toContain('Buttons rendered as text links')
		})

		it('shows link variant button', () => {
			expect(content).toContain('variant="link"')
		})

		it('uses accent color for link button', () => {
			expect(content).toContain('text-accent-400')
		})

		it('has underline styling', () => {
			expect(content).toContain('underline')
		})
	})

	describe('None Variant', () => {
		it('has None Variant section heading', () => {
			expect(content).toContain('>None Variant</Text>')
		})

		it('has none variant description', () => {
			expect(content).toContain('Buttons with no default styling')
		})

		it('shows none variant button', () => {
			expect(content).toContain('variant="none"')
		})

		it('demonstrates custom styling', () => {
			expect(content).toContain('Custom Styled')
		})

		it('shows square button example', () => {
			expect(content).toContain('Square Button')
		})
	})

	describe('Button as Link', () => {
		it('has Button as Link section heading', () => {
			expect(content).toContain('>Button as Link</Text>')
		})

		it('has isLink description', () => {
			expect(content).toContain('Buttons rendered as anchor tags')
		})

		it('uses isLink prop', () => {
			expect(content).toContain('isLink={true}')
		})

		it('has href attributes', () => {
			expect(content).toContain('href="/system/overview"')
			expect(content).toContain('href="/system/colors"')
			expect(content).toContain('href="/system/typography"')
		})

		it('shows navigation links', () => {
			expect(content).toContain('Go to Overview')
			expect(content).toContain('View Colors')
			expect(content).toContain('Typography')
		})
	})

	describe('All Button Sizes', () => {
		it('uses xxs size', () => {
			expect(content).toContain('size="xxs"')
		})

		it('uses xs size', () => {
			expect(content).toContain('size="xs"')
		})

		it('uses sm size', () => {
			expect(content).toContain('size="sm"')
		})

		it('uses base size', () => {
			expect(content).toContain('size="base"')
		})

		it('uses md size', () => {
			expect(content).toContain('size="md"')
		})

		it('uses lg size', () => {
			expect(content).toContain('size="lg"')
		})

		it('uses xl size', () => {
			expect(content).toContain('size="xl"')
		})
	})

	describe('Icon Only Mode', () => {
		it('uses iconOnly prop', () => {
			expect(content).toContain('iconOnly')
		})

		it('uses icon slot', () => {
			expect(content).toContain('slot="icon"')
		})

		it('uses Plus icon component', () => {
			expect(content).toContain('<Plus slot="icon"')
		})

		it('has various icon sizes', () => {
			expect(content).toContain('size="sm"')
			expect(content).toContain('size="base"')
			expect(content).toContain('size="lg"')
			expect(content).toContain('size="xl"')
		})
	})

	describe('Grid Layout', () => {
		it('uses responsive grid', () => {
			expect(content).toContain('grid-cols-1')
			expect(content).toContain('md:grid-cols-2')
			expect(content).toContain('lg:grid-cols-3')
		})

		it('has gap between grid items', () => {
			expect(content).toContain('gap-12')
		})

		it('uses flex layout for button columns', () => {
			expect(content).toContain('flex flex-col')
		})

		it('has gap between buttons', () => {
			expect(content).toContain('gap-4')
		})
	})

	describe('Interactive Examples', () => {
		it('has icon column label', () => {
			expect(content).toContain('Icon')
		})

		it('has buttons with href="#_"', () => {
			expect(content).toContain('href="#_"')
		})
	})

	describe('Typography', () => {
		it('uses displaySM for section headings', () => {
			expect(content).toContain('variant="displaySM"')
		})

		it('uses textXS for labels', () => {
			expect(content).toContain('variant="textXS"')
		})

		it('uses uppercase for labels', () => {
			expect(content).toContain('uppercase')
		})

		it('uses font-medium for labels', () => {
			expect(content).toContain('font-medium')
		})

		it('uses font-display for headings', () => {
			expect(content).toContain('font-display')
		})
	})

	describe('Color Tokens', () => {
		it('uses white text color', () => {
			expect(content).toContain('text-white')
		})

		it('uses base-300 for descriptions', () => {
			expect(content).toContain('text-base-300')
		})

		it('uses accent-400 for links', () => {
			expect(content).toContain('text-accent-400')
		})

		it('uses accent-500 for borders', () => {
			expect(content).toContain('border-accent-500')
		})

		it('uses base-800 for backgrounds', () => {
			expect(content).toContain('bg-base-800')
		})
	})
})
