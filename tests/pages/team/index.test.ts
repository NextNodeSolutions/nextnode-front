import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

describe('Team Listing Page', () => {
	const filePath = join(process.cwd(), 'src/pages/team/index.astro')
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
			expect(content).toContain("const title = 'Our Team | NextNode'")
		})

		it('has page description defined', () => {
			expect(content).toContain('const description =')
			expect(content).toContain('Meet the talented team behind NextNode')
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

		it('imports TeamCard component', () => {
			expect(content).toContain(
				"import TeamCard from '@/components/team/TeamCard.astro'",
			)
		})

		it('imports jobs Cta component', () => {
			expect(content).toContain(
				"import Cta from '@/components/jobs/Cta.astro'",
			)
		})
	})

	describe('Content Collection Integration', () => {
		it('imports getCollection from astro:content', () => {
			expect(content).toContain(
				"import { getCollection } from 'astro:content'",
			)
		})

		it('fetches team collection', () => {
			expect(content).toContain("getCollection('team')")
		})

		it('stores team members in allTeam variable', () => {
			expect(content).toContain('const allTeam = await getCollection')
		})

		it('sorts team members by name', () => {
			expect(content).toContain('allTeam.sort')
			expect(content).toContain('a.data.name.localeCompare(b.data.name)')
		})
	})

	describe('Page Structure', () => {
		it('has section element', () => {
			expect(content).toContain('<section')
		})

		it('uses gradient background', () => {
			expect(content).toContain('class="bg-gradient-up"')
		})

		it('uses Wrapper with standard variant', () => {
			expect(content).toContain('Wrapper')
			expect(content).toContain('variant="standard"')
		})

		it('has h1 heading', () => {
			expect(content).toContain('tag="h1"')
		})

		it('uses displayXL variant for main heading', () => {
			expect(content).toContain('variant="displayXL"')
		})

		it('has "Our team" label text', () => {
			expect(content).toContain('Our team')
		})

		it('has "Meet the people" heading text', () => {
			expect(content).toContain('Meet the people')
		})

		it('has "building NextNode" subtext', () => {
			expect(content).toContain('building NextNode')
		})

		it('has descriptive paragraph', () => {
			expect(content).toContain(
				'talented team of engineers, designers, and dreamers',
			)
		})
	})

	describe('Team Grid Display', () => {
		it('maps over sortedTeam to display cards', () => {
			expect(content).toContain('sortedTeam.map')
		})

		it('renders TeamCard with post prop', () => {
			expect(content).toContain('<TeamCard post={post}')
		})

		it('uses responsive grid layout', () => {
			expect(content).toContain('grid-cols-1')
			expect(content).toContain('md:grid-cols-2')
			expect(content).toContain('lg:grid-cols-4')
		})

		it('has grid container for team cards', () => {
			expect(content).toContain('class="grid')
		})

		it('has responsive gap spacing', () => {
			expect(content).toContain('gap-12')
			expect(content).toContain('lg:gap-y-24')
		})
	})

	describe('CTA Section', () => {
		it('includes Cta component', () => {
			expect(content).toContain('<Cta />')
		})
	})

	describe('Styling', () => {
		it('uses base color tokens for label text', () => {
			expect(content).toContain('text-base-400')
		})

		it('uses white text color for headings', () => {
			expect(content).toContain('text-white')
		})

		it('uses font-display for headings', () => {
			expect(content).toContain('font-display')
		})

		it('uses text-balance for heading balance', () => {
			expect(content).toContain('text-balance')
		})

		it('uses py-42 for vertical padding', () => {
			expect(content).toContain('py-42')
		})

		it('uses max-w-md for paragraph width', () => {
			expect(content).toContain('max-w-md')
		})
	})

	describe('Responsive Design', () => {
		it('uses md:col-span-2 for header column span', () => {
			expect(content).toContain('md:col-span-2')
		})

		it('uses md:col-span-full for grid container', () => {
			expect(content).toContain('md:col-span-full')
		})

		it('uses md:row-start-2 for grid positioning', () => {
			expect(content).toContain('md:row-start-2')
		})

		it('uses lg:gap-y-24 for larger screen gaps', () => {
			expect(content).toContain('lg:gap-y-24')
		})
	})

	describe('Text Component Variants', () => {
		it('uses textSM variant for label', () => {
			expect(content).toContain('variant="textSM"')
		})

		it('uses textBase variant for paragraph', () => {
			expect(content).toContain('variant="textBase"')
		})

		it('uses displayXL variant for main heading', () => {
			expect(content).toContain('variant="displayXL"')
		})
	})

	describe('Semantic HTML', () => {
		it('uses span tag for label', () => {
			expect(content).toContain('tag="span"')
		})

		it('uses h1 tag for main heading', () => {
			expect(content).toContain('tag="h1"')
		})

		it('uses p tag for description paragraph', () => {
			expect(content).toContain('tag="p"')
		})
	})

	describe('Grid Layout Structure', () => {
		it('uses md:grid-cols-4 for main grid', () => {
			expect(content).toContain('md:grid-cols-4')
		})

		it('has gap-y-12 for mobile spacing', () => {
			expect(content).toContain('gap-y-12')
		})

		it('uses relative positioning', () => {
			expect(content).toContain('relative')
		})
	})
})
