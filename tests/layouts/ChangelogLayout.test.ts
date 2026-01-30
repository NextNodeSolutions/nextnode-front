import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for ChangelogLayout.astro layout
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required patterns.
 */

const layoutPath = join(process.cwd(), 'src/layouts/ChangelogLayout.astro')
const layoutContent = readFileSync(layoutPath, 'utf-8')

describe('ChangelogLayout.astro', () => {
	describe('BaseLayout integration', () => {
		it('imports BaseLayout', () => {
			expect(layoutContent).toContain(
				"import BaseLayout from '@/layouts/BaseLayout.astro'",
			)
		})

		it('uses BaseLayout as wrapper', () => {
			expect(layoutContent).toContain('<BaseLayout')
			expect(layoutContent).toContain('</BaseLayout>')
		})

		it('passes title to BaseLayout', () => {
			expect(layoutContent).toContain('title={pageTitle}')
		})

		it('passes description to BaseLayout', () => {
			expect(layoutContent).toContain('description={pageDescription}')
		})
	})

	describe('TypeScript Props interface', () => {
		it('exports Props interface', () => {
			expect(layoutContent).toContain('export interface Props')
		})

		it('has version prop', () => {
			expect(layoutContent).toContain('version: string')
		})

		it('has date prop', () => {
			expect(layoutContent).toContain('date: Date | string')
		})

		it('has type prop', () => {
			expect(layoutContent).toContain('type: ChangelogType')
		})

		it('has optional title prop', () => {
			expect(layoutContent).toContain('title?: string')
		})

		it('has optional description prop', () => {
			expect(layoutContent).toContain('description?: string')
		})
	})

	describe('ChangelogType type', () => {
		it('exports ChangelogType type', () => {
			expect(layoutContent).toContain('export type ChangelogType')
		})

		it('includes major type', () => {
			expect(layoutContent).toContain("'major'")
		})

		it('includes minor type', () => {
			expect(layoutContent).toContain("'minor'")
		})

		it('includes patch type', () => {
			expect(layoutContent).toContain("'patch'")
		})

		it('includes feature type', () => {
			expect(layoutContent).toContain("'feature'")
		})

		it('includes fix type', () => {
			expect(layoutContent).toContain("'fix'")
		})
	})

	describe('logger integration', () => {
		it('imports logger from @nextnode/logger', () => {
			expect(layoutContent).toContain(
				"import { logger } from '@nextnode/logger'",
			)
		})

		it('logs changelog page load event', () => {
			expect(layoutContent).toContain(
				"logger.info('Changelog page loaded'",
			)
		})

		it('uses details object for log data', () => {
			expect(layoutContent).toContain('details: {')
		})

		it('logs version in details', () => {
			expect(layoutContent).toContain('version,')
		})

		it('logs type in details', () => {
			// Check for 'type,' (with comma, as it's in the object)
			const detailsMatch = layoutContent.match(/details:\s*\{[^}]+\}/s)
			expect(detailsMatch).toBeTruthy()
			expect(detailsMatch?.[0]).toContain('type,')
		})

		it('logs pathname in details', () => {
			expect(layoutContent).toContain('pathname: Astro.url.pathname')
		})
	})

	describe('version display', () => {
		it('displays version with v prefix', () => {
			expect(layoutContent).toContain('v{version}')
		})

		it('uses display2XL variant for version heading', () => {
			expect(layoutContent).toContain('variant="display2XL"')
		})

		it('uses h1 tag for version heading', () => {
			expect(layoutContent).toContain('tag="h1"')
		})
	})

	describe('date display', () => {
		it('has time element for semantic date', () => {
			expect(layoutContent).toContain('<time')
			expect(layoutContent).toContain('</time>')
		})

		it('has datetime attribute on time element', () => {
			expect(layoutContent).toContain('datetime=')
		})

		it('formats date with full locale string', () => {
			expect(layoutContent).toContain("toLocaleDateString('en-US'")
		})

		it('includes year in date format', () => {
			expect(layoutContent).toContain("year: 'numeric'")
		})

		it('includes month in date format', () => {
			expect(layoutContent).toContain("month: 'long'")
		})

		it('includes day in date format', () => {
			expect(layoutContent).toContain("day: '2-digit'")
		})

		it('displays Published prefix', () => {
			expect(layoutContent).toContain('Published')
		})
	})

	describe('type badge display', () => {
		it('displays type badge', () => {
			expect(layoutContent).toContain('{type}')
		})

		it('has type color mapping', () => {
			expect(layoutContent).toContain('typeColors')
		})

		it('uses class:list for conditional type colors', () => {
			expect(layoutContent).toContain('class:list={[')
		})

		it('badge has rounded-full class', () => {
			expect(layoutContent).toContain('rounded-full')
		})

		it('badge has border class', () => {
			expect(layoutContent).toContain('border')
		})

		describe('type color variants', () => {
			it('has major type colors (red)', () => {
				expect(layoutContent).toContain('bg-red-500')
				expect(layoutContent).toContain('text-red-400')
			})

			it('has minor type colors (amber)', () => {
				expect(layoutContent).toContain('bg-amber-500')
				expect(layoutContent).toContain('text-amber-400')
			})

			it('has patch type colors (blue)', () => {
				expect(layoutContent).toContain('bg-blue-500')
				expect(layoutContent).toContain('text-blue-400')
			})

			it('has feature type colors (green)', () => {
				expect(layoutContent).toContain('bg-green-500')
				expect(layoutContent).toContain('text-green-400')
			})

			it('has fix type colors (purple)', () => {
				expect(layoutContent).toContain('bg-purple-500')
				expect(layoutContent).toContain('text-purple-400')
			})
		})
	})

	describe('fundation components', () => {
		it('imports Text component', () => {
			expect(layoutContent).toContain(
				"import Text from '@/components/fundations/elements/Text.astro'",
			)
		})

		it('imports Wrapper component', () => {
			expect(layoutContent).toContain(
				"import Wrapper from '@/components/fundations/containers/Wrapper.astro'",
			)
		})

		it('uses Text component', () => {
			expect(layoutContent).toContain('<Text')
		})

		it('uses Wrapper component', () => {
			expect(layoutContent).toContain('<Wrapper')
		})

		it('uses prose wrapper for content', () => {
			expect(layoutContent).toContain('variant="prose"')
		})

		it('uses standard wrapper for main container', () => {
			expect(layoutContent).toContain('variant="standard"')
		})
	})

	describe('layout structure', () => {
		it('has section element', () => {
			expect(layoutContent).toContain('<section>')
			expect(layoutContent).toContain('</section>')
		})

		it('has slot for content', () => {
			expect(layoutContent).toContain('<slot />')
		})

		it('uses grid layout', () => {
			expect(layoutContent).toContain('grid')
			expect(layoutContent).toContain('grid-cols-1')
			expect(layoutContent).toContain('lg:grid-cols-4')
		})

		it('has vertical padding', () => {
			expect(layoutContent).toContain('py-42')
		})

		it('has responsive column span', () => {
			expect(layoutContent).toContain('lg:col-span-2')
		})
	})

	describe('default values', () => {
		it('has default page title based on version', () => {
			expect(layoutContent).toContain('title ??')
			expect(layoutContent).toContain('Changelog v')
			expect(layoutContent).toContain('{version}')
		})

		it('has default page description based on version and type', () => {
			expect(layoutContent).toContain('description ??')
			expect(layoutContent).toContain('Release notes for version')
		})
	})

	describe('styling', () => {
		it('uses white text for version heading', () => {
			expect(layoutContent).toContain('text-white')
		})

		it('uses text-balance for heading', () => {
			expect(layoutContent).toContain('text-balance')
		})

		it('uses font-display for heading', () => {
			expect(layoutContent).toContain('font-display')
		})

		it('uses base-400 text for date', () => {
			expect(layoutContent).toContain('text-base-400')
		})

		it('uses textSM variant for date', () => {
			expect(layoutContent).toContain('variant="textSM"')
		})
	})

	describe('component order', () => {
		it('has type badge before version heading', () => {
			const badgeIndex = layoutContent.indexOf('{type}')
			const versionIndex = layoutContent.indexOf('v{version}')
			expect(badgeIndex).toBeLessThan(versionIndex)
		})

		it('has version heading before date', () => {
			const versionIndex = layoutContent.indexOf('v{version}')
			const dateIndex = layoutContent.indexOf('Published')
			expect(versionIndex).toBeLessThan(dateIndex)
		})

		it('has header section before prose content', () => {
			const headerIndex = layoutContent.indexOf('v{version}')
			const proseIndex = layoutContent.indexOf('variant="prose"')
			expect(headerIndex).toBeLessThan(proseIndex)
		})
	})
})
