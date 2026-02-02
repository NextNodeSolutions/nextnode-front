import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

describe('Design System Links Page', () => {
	const filePath = join(process.cwd(), 'src/pages/system/link.astro')
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
			expect(content).toContain("const title = 'Links | Design System'")
		})

		it('has page description defined', () => {
			expect(content).toContain('const description =')
			expect(content).toContain('Link styles and variants')
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
			expect(content).toContain('Links')
			expect(content).toContain('</Text>')
		})

		it('has descriptive paragraph', () => {
			expect(content).toContain(
				'Button component rendered as anchor elements',
			)
		})
	})

	describe('Default Variant Links', () => {
		it('has Default text label', () => {
			expect(content).toContain('Default text')
		})

		it('uses isLink prop for default links', () => {
			expect(content).toContain('isLink={true}')
		})

		it('uses href attribute', () => {
			expect(content).toContain('href="#_"')
		})

		it('shows all default variant sizes', () => {
			expect(content).toContain('variant="default"')
			expect(content).toContain('Default XXS')
			expect(content).toContain('Default XS')
			expect(content).toContain('Default SM')
			expect(content).toContain('Default Base')
			expect(content).toContain('Default MD')
			expect(content).toContain('Default LG')
			expect(content).toContain('Default XL')
		})

		it('has icon-only default links', () => {
			expect(content).toContain('variant="default"')
			expect(content).toContain('iconOnly')
		})
	})

	describe('Accent Variant Links', () => {
		it('has Accent text label', () => {
			expect(content).toContain('Accent text')
		})

		it('shows all accent variant sizes', () => {
			expect(content).toContain('variant="accent"')
			expect(content).toContain('Accent XXS')
			expect(content).toContain('Accent XS')
			expect(content).toContain('Accent SM')
			expect(content).toContain('Accent Base')
			expect(content).toContain('Accent MD')
			expect(content).toContain('Accent LG')
			expect(content).toContain('Accent XL')
		})

		it('has icon-only accent links', () => {
			expect(content).toContain('variant="accent"')
			expect(content).toContain('iconOnly')
		})
	})

	describe('Muted Variant Links', () => {
		it('has Muted text label', () => {
			expect(content).toContain('Muted text')
		})

		it('shows all muted variant sizes', () => {
			expect(content).toContain('variant="muted"')
			expect(content).toContain('Muted XXS')
			expect(content).toContain('Muted XS')
			expect(content).toContain('Muted SM')
			expect(content).toContain('Muted Base')
			expect(content).toContain('Muted MD')
			expect(content).toContain('Muted LG')
			expect(content).toContain('Muted XL')
		})

		it('has icon-only muted links', () => {
			expect(content).toContain('variant="muted"')
			expect(content).toContain('iconOnly')
		})
	})

	describe('Text Links Section', () => {
		it('has Text Links section heading', () => {
			expect(content).toContain('Text Links')
		})

		it('has text links description', () => {
			expect(content).toContain(
				'Simple text links with underline styling',
			)
		})

		it('shows link variant', () => {
			expect(content).toContain('variant="link"')
		})

		it('uses accent color for link', () => {
			expect(content).toContain('text-accent-400')
		})

		it('has underline styling', () => {
			expect(content).toContain('underline')
		})

		it('has muted link option', () => {
			expect(content).toContain('Muted Link')
		})

		it('has white link option', () => {
			expect(content).toContain('White Link')
		})
	})

	describe('Hover States Section', () => {
		it('has Hover States section heading', () => {
			expect(content).toContain('Hover States')
		})

		it('has hover states description', () => {
			expect(content).toContain('hover state transitions')
		})

		it('has tip about hover behavior', () => {
			expect(content).toContain('automatically handles hover states')
		})
	})

	describe('Navigation Links Section', () => {
		it('has Navigation Links section heading', () => {
			expect(content).toContain('Navigation Links')
		})

		it('has navigation links description', () => {
			expect(content).toContain('Links to other design system pages')
		})

		it('links to overview page', () => {
			expect(content).toContain('href="/system/overview"')
			expect(content).toContain('Overview')
		})

		it('links to buttons page', () => {
			expect(content).toContain('href="/system/buttons"')
			expect(content).toContain('Buttons')
		})

		it('links to colors page', () => {
			expect(content).toContain('href="/system/colors"')
			expect(content).toContain('Colors')
		})

		it('links to typography page', () => {
			expect(content).toContain('href="/system/typography"')
			expect(content).toContain('Typography')
		})
	})

	describe('All Link Sizes', () => {
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

		it('uses flex layout for link columns', () => {
			expect(content).toContain('flex flex-col')
		})

		it('has gap between links', () => {
			expect(content).toContain('gap-4')
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

		it('uses base-900 for background', () => {
			expect(content).toContain('bg-base-900')
		})

		it('uses hover color transitions', () => {
			expect(content).toContain('hover:text-accent-300')
			expect(content).toContain('hover:text-white')
		})
	})

	describe('isLink Pattern', () => {
		it('all main link examples use isLink={true}', () => {
			// Count occurrences of isLink={true}
			const isLinkCount = (content.match(/isLink=\{true\}/g) || []).length
			// Should have many isLink usages for all the link examples
			expect(isLinkCount).toBeGreaterThanOrEqual(20)
		})

		it('links have href attributes', () => {
			// Count occurrences of href=
			const hrefCount = (content.match(/href="/g) || []).length
			expect(hrefCount).toBeGreaterThanOrEqual(20)
		})
	})
})
