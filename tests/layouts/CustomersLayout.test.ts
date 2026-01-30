import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for CustomersLayout.astro layout
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required patterns.
 */

const layoutPath = join(process.cwd(), 'src/layouts/CustomersLayout.astro')
const layoutContent = readFileSync(layoutPath, 'utf-8')

describe('CustomersLayout.astro', () => {
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

		it('has customer prop', () => {
			expect(layoutContent).toContain('customer: string')
		})

		it('has optional logo prop', () => {
			expect(layoutContent).toContain('logo?: string')
		})

		it('has optional quote prop', () => {
			expect(layoutContent).toContain('quote?: string')
		})

		it('has optional quoteAttribution prop', () => {
			expect(layoutContent).toContain('quoteAttribution?: string')
		})

		it('has optional about prop', () => {
			expect(layoutContent).toContain('about?: string')
		})

		it('has optional details prop', () => {
			expect(layoutContent).toContain('details?: CustomerDetails')
		})

		it('has optional challengesAndSolutions prop', () => {
			expect(layoutContent).toContain(
				'challengesAndSolutions?: ChallengeOrSolution[]',
			)
		})

		it('has optional results prop', () => {
			expect(layoutContent).toContain('results?: string[]')
		})

		it('has optional title prop', () => {
			expect(layoutContent).toContain('title?: string')
		})

		it('has optional description prop', () => {
			expect(layoutContent).toContain('description?: string')
		})
	})

	describe('ChallengeOrSolution interface', () => {
		it('exports ChallengeOrSolution interface', () => {
			expect(layoutContent).toContain(
				'export interface ChallengeOrSolution',
			)
		})

		it('has title property', () => {
			const interfaceMatch = layoutContent.match(
				/export interface ChallengeOrSolution\s*\{[^}]+\}/s,
			)
			expect(interfaceMatch).toBeTruthy()
			expect(interfaceMatch?.[0]).toContain('title: string')
		})

		it('has content property', () => {
			const interfaceMatch = layoutContent.match(
				/export interface ChallengeOrSolution\s*\{[^}]+\}/s,
			)
			expect(interfaceMatch).toBeTruthy()
			expect(interfaceMatch?.[0]).toContain('content: string')
		})
	})

	describe('CustomerDetails interface', () => {
		it('exports CustomerDetails interface', () => {
			expect(layoutContent).toContain('export interface CustomerDetails')
		})

		it('has optional industry property', () => {
			expect(layoutContent).toContain('industry?: string')
		})

		it('has optional size property', () => {
			expect(layoutContent).toContain('size?: string')
		})

		it('has optional location property', () => {
			expect(layoutContent).toContain('location?: string')
		})

		it('has optional website property', () => {
			expect(layoutContent).toContain('website?: string')
		})

		it('has index signature for extensibility', () => {
			expect(layoutContent).toContain('[key: string]: string | undefined')
		})
	})

	describe('logger integration', () => {
		it('imports logger from @nextnode/logger', () => {
			expect(layoutContent).toContain(
				"import { logger } from '@nextnode/logger'",
			)
		})

		it('logs customer case study load event', () => {
			expect(layoutContent).toContain(
				"logger.info('Customer case study loaded'",
			)
		})

		it('uses details object for log data', () => {
			expect(layoutContent).toContain('details: {')
		})

		it('logs customer name in details', () => {
			const detailsMatch = layoutContent.match(
				/logger\.info[^}]+details:\s*\{[^}]+\}/s,
			)
			expect(detailsMatch).toBeTruthy()
			expect(detailsMatch?.[0]).toContain('customer,')
		})

		it('logs pathname in details', () => {
			expect(layoutContent).toContain('pathname: Astro.url.pathname')
		})
	})

	describe('customer logo display', () => {
		it('has conditional logo rendering', () => {
			expect(layoutContent).toContain('logo &&')
		})

		it('has img element for logo', () => {
			expect(layoutContent).toContain('<img')
		})

		it('has alt attribute for logo', () => {
			expect(layoutContent).toContain('alt={')
			expect(layoutContent).toContain('logo')
		})

		it('uses customer name in logo alt text', () => {
			expect(layoutContent).toContain('${customer}')
		})
	})

	describe('customer heading display', () => {
		it('displays customer name', () => {
			expect(layoutContent).toContain('{customer}')
		})

		it('uses h1 tag for customer name', () => {
			expect(layoutContent).toContain('tag="h1"')
		})

		it('uses displayXL variant for heading', () => {
			expect(layoutContent).toContain('variant="displayXL"')
		})

		it('uses font-display for heading', () => {
			expect(layoutContent).toContain('font-display')
		})

		it('uses italic styling for heading', () => {
			expect(layoutContent).toContain('italic')
		})

		it('uses white text for heading', () => {
			expect(layoutContent).toContain('text-white')
		})
	})

	describe('customer quote display', () => {
		it('has conditional quote rendering', () => {
			expect(layoutContent).toContain('quote &&')
		})

		it('has blockquote element', () => {
			expect(layoutContent).toContain('<blockquote')
		})

		it('uses nextnode color for quote border', () => {
			expect(layoutContent).toContain('border-nextnode-500')
		})

		it('has quote attribution rendering', () => {
			expect(layoutContent).toContain('quoteAttribution &&')
		})

		it('uses cite element for attribution', () => {
			expect(layoutContent).toContain('<cite')
			expect(layoutContent).toContain('</cite>')
		})

		it('has not-italic class for attribution', () => {
			expect(layoutContent).toContain('not-italic')
		})
	})

	describe('customer details display', () => {
		it('has conditional details rendering', () => {
			expect(layoutContent).toContain('Object.keys(details).length > 0')
		})

		it('iterates over details entries', () => {
			expect(layoutContent).toContain('Object.entries(details).map')
		})

		it('displays detail key as heading', () => {
			expect(layoutContent).toContain('{key}')
		})

		it('displays detail value as text', () => {
			expect(layoutContent).toContain('{value}')
		})

		it('capitalizes detail key', () => {
			expect(layoutContent).toContain('capitalize')
		})
	})

	describe('about section display', () => {
		it('has conditional about rendering', () => {
			expect(layoutContent).toMatch(/about\s*(&&|\|\|)/)
		})

		it('has About heading', () => {
			expect(layoutContent).toContain('About')
		})

		it('displays about content', () => {
			expect(layoutContent).toContain('{about}')
		})
	})

	describe('challenges and solutions display', () => {
		it('has conditional challenges rendering', () => {
			expect(layoutContent).toContain('challengesAndSolutions.length > 0')
		})

		it('iterates over challenges', () => {
			expect(layoutContent).toContain('challengesAndSolutions.map')
		})

		it('displays challenge title', () => {
			expect(layoutContent).toContain('{item.title}')
		})

		it('displays challenge content', () => {
			expect(layoutContent).toContain('{item.content}')
		})

		it('uses definition list for challenges', () => {
			expect(layoutContent).toContain('<dl')
			expect(layoutContent).toContain('<dt>')
			expect(layoutContent).toContain('<dd')
		})
	})

	describe('results display', () => {
		it('has conditional results rendering', () => {
			expect(layoutContent).toContain('results.length > 0')
		})

		it('has Results heading', () => {
			expect(layoutContent).toContain('Results')
		})

		it('iterates over results', () => {
			expect(layoutContent).toContain('results.map')
		})

		it('displays individual result', () => {
			expect(layoutContent).toContain('{result}')
		})

		it('has role list for results container', () => {
			expect(layoutContent).toContain('role="list"')
		})

		it('uses displaySM variant for Results heading', () => {
			expect(layoutContent).toContain('variant="displaySM"')
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

		it('uses prose wrapper for content slot', () => {
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

		it('has responsive column span for main content', () => {
			expect(layoutContent).toContain('md:col-span-3')
		})

		it('has sticky sidebar on large screens', () => {
			expect(layoutContent).toContain('lg:sticky')
			expect(layoutContent).toContain('lg:top-42')
		})
	})

	describe('default values', () => {
		it('has default page title based on customer name', () => {
			expect(layoutContent).toContain('title ??')
			expect(layoutContent).toContain('Case Study')
		})

		it('has default page description', () => {
			expect(layoutContent).toContain('description ??')
			expect(layoutContent).toContain('How')
			expect(layoutContent).toContain('uses NextNode')
		})

		it('has default empty object for details', () => {
			expect(layoutContent).toContain('details = {}')
		})

		it('has default empty array for challengesAndSolutions', () => {
			expect(layoutContent).toContain('challengesAndSolutions = []')
		})

		it('has default empty array for results', () => {
			expect(layoutContent).toContain('results = []')
		})
	})

	describe('styling', () => {
		it('uses white text for headings', () => {
			expect(layoutContent).toContain('text-white')
		})

		it('uses text-balance for description', () => {
			expect(layoutContent).toContain('text-balance')
		})

		it('uses base-500 text for muted content', () => {
			expect(layoutContent).toContain('text-base-500')
		})

		it('uses base-400 text for quote attribution', () => {
			expect(layoutContent).toContain('text-base-400')
		})

		it('has responsive grid for results', () => {
			expect(layoutContent).toContain('sm:grid-cols-2')
			expect(layoutContent).toContain('lg:grid-cols-3')
		})

		it('uses vertical line decorations', () => {
			expect(layoutContent).toContain('before:w-px')
			expect(layoutContent).toContain('after:w-px')
		})
	})

	describe('component order', () => {
		it('has logo before customer heading', () => {
			const logoIndex = layoutContent.indexOf('logo &&')
			const customerIndex = layoutContent.indexOf(
				'<Text\n\t\t\t\t\t\ttag="h1"',
			)
			expect(logoIndex).toBeLessThan(customerIndex)
		})

		it('has details before main content area', () => {
			const detailsIndex = layoutContent.indexOf(
				'Object.entries(details).map',
			)
			const mainContentIndex = layoutContent.indexOf('md:col-span-3')
			expect(detailsIndex).toBeLessThan(mainContentIndex)
		})

		it('has about before challenges', () => {
			const aboutIndex = layoutContent.indexOf('About')
			const challengesIndex = layoutContent.indexOf(
				'challengesAndSolutions.map',
			)
			expect(aboutIndex).toBeLessThan(challengesIndex)
		})

		it('has results before quote', () => {
			const resultsIndex = layoutContent.indexOf('Results')
			const quoteIndex = layoutContent.indexOf('quote &&')
			expect(resultsIndex).toBeLessThan(quoteIndex)
		})

		it('has quote before prose content', () => {
			const quoteIndex = layoutContent.indexOf('blockquote')
			const proseIndex = layoutContent.indexOf('variant="prose"')
			expect(quoteIndex).toBeLessThan(proseIndex)
		})
	})

	describe('accessibility', () => {
		it('has semantic dl for challenges section', () => {
			expect(layoutContent).toContain('<dl')
		})

		it('has semantic dt for challenge titles', () => {
			expect(layoutContent).toContain('<dt>')
		})

		it('has semantic dd for challenge content', () => {
			expect(layoutContent).toContain('<dd')
		})

		it('has role list for results', () => {
			expect(layoutContent).toContain('role="list"')
		})

		it('has alt text for logo image', () => {
			expect(layoutContent).toContain('alt={')
		})
	})
})
