import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

describe('Design System Typography Page', () => {
	const filePath = join(process.cwd(), 'src/pages/system/typography.astro')
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
			expect(content).toContain(
				"const title = 'Typography | Design System'",
			)
		})

		it('has page description defined', () => {
			expect(content).toContain('const description =')
			expect(content).toContain('Typography system')
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
			expect(content).toContain('Typography')
			expect(content).toContain('</Text>')
		})

		it('has descriptive paragraph', () => {
			expect(content).toContain('Typography system using DM Sans')
		})
	})

	describe('TypeScript Interfaces', () => {
		it('defines TextVariantExample interface', () => {
			expect(content).toContain('interface TextVariantExample')
		})

		it('defines FontFamily interface', () => {
			expect(content).toContain('interface FontFamily')
		})

		it('TextVariantExample has variant property', () => {
			expect(content).toContain('variant: string')
		})

		it('TextVariantExample has label property', () => {
			expect(content).toContain('label: string')
		})

		it('TextVariantExample has description property', () => {
			expect(content).toContain('description: string')
		})

		it('FontFamily has name property', () => {
			expect(content).toContain('name: string')
		})

		it('FontFamily has className property', () => {
			expect(content).toContain('className: string')
		})

		it('FontFamily has variable property', () => {
			expect(content).toContain('variable: string')
		})

		it('FontFamily has usage property', () => {
			expect(content).toContain('usage: string')
		})
	})

	describe('Font Families Section', () => {
		it('has Font Families heading', () => {
			expect(content).toContain('Font Families')
		})

		it('shows DM Sans font', () => {
			expect(content).toContain("name: 'DM Sans'")
			expect(content).toContain("className: 'font-sans'")
		})

		it('shows Plus Jakarta Sans font', () => {
			expect(content).toContain("name: 'Plus Jakarta Sans'")
			expect(content).toContain("className: 'font-display'")
		})

		it('shows JetBrains Mono font', () => {
			expect(content).toContain("name: 'JetBrains Mono'")
			expect(content).toContain("className: 'font-mono'")
		})

		it('shows font variables', () => {
			expect(content).toContain("variable: '--font-sans'")
			expect(content).toContain("variable: '--font-display'")
			expect(content).toContain("variable: '--font-mono'")
		})

		it('describes font usage', () => {
			expect(content).toContain('Primary body text')
			expect(content).toContain('Display headings')
			expect(content).toContain('Code blocks')
		})
	})

	describe('Display Variants Section', () => {
		it('has Display Variants heading', () => {
			expect(content).toContain('Display Variants')
		})

		it('shows display6XL variant', () => {
			expect(content).toContain("variant: 'display6XL'")
			expect(content).toContain("label: 'Display 6XL'")
		})

		it('shows display5XL variant', () => {
			expect(content).toContain("variant: 'display5XL'")
			expect(content).toContain("label: 'Display 5XL'")
		})

		it('shows display4XL variant', () => {
			expect(content).toContain("variant: 'display4XL'")
			expect(content).toContain("label: 'Display 4XL'")
		})

		it('shows display3XL variant', () => {
			expect(content).toContain("variant: 'display3XL'")
			expect(content).toContain("label: 'Display 3XL'")
		})

		it('shows display2XL variant', () => {
			expect(content).toContain("variant: 'display2XL'")
			expect(content).toContain("label: 'Display 2XL'")
		})

		it('shows displayXL variant', () => {
			expect(content).toContain("variant: 'displayXL'")
			expect(content).toContain("label: 'Display XL'")
		})

		it('shows displayLG variant', () => {
			expect(content).toContain("variant: 'displayLG'")
			expect(content).toContain("label: 'Display LG'")
		})

		it('shows displayMD variant', () => {
			expect(content).toContain("variant: 'displayMD'")
			expect(content).toContain("label: 'Display MD'")
		})

		it('shows displaySM variant', () => {
			expect(content).toContain("variant: 'displaySM'")
			expect(content).toContain("label: 'Display SM'")
		})

		it('shows displayXS variant', () => {
			expect(content).toContain("variant: 'displayXS'")
			expect(content).toContain("label: 'Display XS'")
		})
	})

	describe('Text Variants Section', () => {
		it('has Text Variants heading', () => {
			expect(content).toContain('Text Variants')
		})

		it('shows textXL variant', () => {
			expect(content).toContain("variant: 'textXL'")
			expect(content).toContain("label: 'Text XL'")
		})

		it('shows textLG variant', () => {
			expect(content).toContain("variant: 'textLG'")
			expect(content).toContain("label: 'Text LG'")
		})

		it('shows textBase variant', () => {
			expect(content).toContain("variant: 'textBase'")
			expect(content).toContain("label: 'Text Base'")
		})

		it('shows textSM variant', () => {
			expect(content).toContain("variant: 'textSM'")
			expect(content).toContain("label: 'Text SM'")
		})

		it('shows textXS variant', () => {
			expect(content).toContain("variant: 'textXS'")
			expect(content).toContain("label: 'Text XS'")
		})

		it('includes sample text', () => {
			expect(content).toContain(
				'The quick brown fox jumps over the lazy dog',
			)
		})
	})

	describe('Font Weights Section', () => {
		it('has Font Weights heading', () => {
			expect(content).toContain('Font Weights')
		})

		it('shows light weight', () => {
			expect(content).toContain('Light (300)')
			expect(content).toContain('font-light')
		})

		it('shows normal weight', () => {
			expect(content).toContain('Normal (400)')
			expect(content).toContain('font-normal')
		})

		it('shows medium weight', () => {
			expect(content).toContain('Medium (500)')
			expect(content).toContain('font-medium')
		})

		it('shows semibold weight', () => {
			expect(content).toContain('Semibold (600)')
			expect(content).toContain('font-semibold')
		})

		it('shows bold weight', () => {
			expect(content).toContain('Bold (700)')
			expect(content).toContain('font-bold')
		})

		it('shows extrabold weight', () => {
			expect(content).toContain('Extrabold (800)')
			expect(content).toContain('font-extrabold')
		})
	})

	describe('Code & Monospace Section', () => {
		it('has Code & Monospace heading', () => {
			expect(content).toContain('Code & Monospace')
		})

		it('shows code example', () => {
			expect(content).toContain('const greeting')
		})

		it('shows function example', () => {
			expect(content).toContain('function calculateTotal')
		})

		it('shows command example', () => {
			expect(content).toContain('npx create-astro@latest')
		})
	})

	describe('Usage Guidelines Section', () => {
		it('has Usage Guidelines heading', () => {
			expect(content).toContain('Usage Guidelines')
		})

		it('has Display Headings guideline', () => {
			expect(content).toContain('Display Headings')
			expect(content).toContain('display*')
		})

		it('has Body Text guideline', () => {
			expect(content).toContain('Body Text')
			expect(content).toContain('text*')
		})

		it('has Code Content guideline', () => {
			expect(content).toContain('Code Content')
		})

		it('has Color Combinations guideline', () => {
			expect(content).toContain('Color Combinations')
		})

		it('uses code tags for references', () => {
			expect(content).toContain('<code class=')
		})
	})

	describe('Related Pages Section', () => {
		it('has Related Pages heading', () => {
			expect(content).toContain('Related Pages')
		})

		it('links to overview page', () => {
			expect(content).toContain('href="/system/overview"')
		})

		it('links to colors page', () => {
			expect(content).toContain('href="/system/colors"')
		})

		it('links to buttons page', () => {
			expect(content).toContain('href="/system/buttons"')
		})

		it('links to link page', () => {
			expect(content).toContain('href="/system/link"')
		})
	})

	describe('Grid Layout', () => {
		it('uses responsive grid for font families', () => {
			expect(content).toContain('md:grid-cols-3')
		})

		it('uses gap between grid items', () => {
			expect(content).toContain('gap-6')
		})

		it('uses space-y for variant sections', () => {
			expect(content).toContain('space-y-8')
		})

		it('uses responsive grid for weights', () => {
			expect(content).toContain('md:grid-cols-2')
			expect(content).toContain('lg:grid-cols-3')
		})

		it('uses responsive grid for guidelines', () => {
			expect(content).toContain('md:grid-cols-2')
		})
	})

	describe('Typography Styling', () => {
		it('uses displaySM for section headings', () => {
			expect(content).toContain('variant="displaySM"')
		})

		it('uses textLG for intro paragraph', () => {
			expect(content).toContain('variant="textLG"')
		})

		it('uses textBase for descriptions', () => {
			expect(content).toContain('variant="textBase"')
		})

		it('uses textSM for smaller text', () => {
			expect(content).toContain('variant="textSM"')
		})

		it('uses textXS for labels', () => {
			expect(content).toContain('variant="textXS"')
		})

		it('uses font-display for headings', () => {
			expect(content).toContain('font-display')
		})

		it('uses font-mono for code', () => {
			expect(content).toContain('font-mono')
		})
	})

	describe('Color Tokens Used', () => {
		it('uses white text color', () => {
			expect(content).toContain('text-white')
		})

		it('uses base-300 for secondary text', () => {
			expect(content).toContain('text-base-300')
		})

		it('uses base-400 for tertiary text', () => {
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

		it('uses accent-400 for links', () => {
			expect(content).toContain('text-accent-400')
		})

		it('uses accent-300 for link hover', () => {
			expect(content).toContain('hover:text-accent-300')
		})
	})

	describe('Card Styling', () => {
		it('uses rounded corners for cards', () => {
			expect(content).toContain('rounded-lg')
		})

		it('uses padding for cards', () => {
			expect(content).toContain('p-6')
		})

		it('uses border for dividers', () => {
			expect(content).toContain('border-b')
			expect(content).toContain('border-base-800')
		})
	})
})
