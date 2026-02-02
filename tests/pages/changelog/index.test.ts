import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

const changelogPagePath = path.join(
	process.cwd(),
	'src/pages/changelog/index.astro',
)
const changelogPageContent = fs.readFileSync(changelogPagePath, 'utf-8')

describe('Changelog Listing Page', () => {
	describe('File Structure', () => {
		it('should exist at correct path', () => {
			expect(fs.existsSync(changelogPagePath)).toBe(true)
		})

		it('should have frontmatter section', () => {
			expect(changelogPageContent).toMatch(/^---[\s\S]*?---/)
		})

		it('should have documentation comment', () => {
			expect(changelogPageContent).toContain('Changelog Listing Page')
		})
	})

	describe('Imports', () => {
		it('should import BaseLayout', () => {
			expect(changelogPageContent).toContain(
				"import BaseLayout from '@/layouts/BaseLayout.astro'",
			)
		})

		it('should import Text component', () => {
			expect(changelogPageContent).toContain(
				"import Text from '@/components/fundations/elements/Text.astro'",
			)
		})

		it('should import Wrapper component', () => {
			expect(changelogPageContent).toContain(
				"import Wrapper from '@/components/fundations/containers/Wrapper.astro'",
			)
		})

		it('should import ChangelogCard component', () => {
			expect(changelogPageContent).toContain(
				"import ChangelogCard from '@/components/changelog/ChangelogCard.astro'",
			)
		})

		it('should import getCollection from astro:content', () => {
			expect(changelogPageContent).toContain(
				"import { getCollection } from 'astro:content'",
			)
		})
	})

	describe('Content Collection', () => {
		it('should fetch changelog collection', () => {
			expect(changelogPageContent).toContain("getCollection('changelog')")
		})

		it('should sort changelogs by date (newest first)', () => {
			expect(changelogPageContent).toContain('.sort(')
			expect(changelogPageContent).toContain('b.data.date')
			expect(changelogPageContent).toContain('a.data.date')
		})

		it('should store changelogs in allChangelogs variable', () => {
			expect(changelogPageContent).toContain('allChangelogs')
		})

		it('should store sorted changelogs in sortedChangelogs variable', () => {
			expect(changelogPageContent).toContain('sortedChangelogs')
		})

		it('should use getTime() for date comparison', () => {
			expect(changelogPageContent).toContain('.getTime()')
		})
	})

	describe('BaseLayout Props', () => {
		it('should pass title prop', () => {
			expect(changelogPageContent).toContain('title="Changelog"')
		})

		it('should pass description prop', () => {
			expect(changelogPageContent).toContain(
				'description="Stay up to date with',
			)
		})
	})

	describe('Page Structure', () => {
		it('should have a section element', () => {
			expect(changelogPageContent).toContain('<section>')
		})

		it('should use Wrapper component', () => {
			expect(changelogPageContent).toContain('<Wrapper')
		})

		it('should use standard variant for wrapper', () => {
			expect(changelogPageContent).toContain('variant="standard"')
		})

		it('should have grid layout classes', () => {
			expect(changelogPageContent).toContain('grid-cols-1')
			expect(changelogPageContent).toContain('md:grid-cols-4')
		})
	})

	describe('Hero Section', () => {
		it('should have Changelog label', () => {
			expect(changelogPageContent).toContain('>Changelog<')
		})

		it('should have main heading', () => {
			expect(changelogPageContent).toContain('Follow our journey')
		})

		it('should have secondary heading text', () => {
			expect(changelogPageContent).toContain('and keep track of us.')
		})

		it('should use displayXL variant for heading', () => {
			expect(changelogPageContent).toContain('variant="displayXL"')
		})

		it('should use textSM variant for label', () => {
			expect(changelogPageContent).toContain('variant="textSM"')
		})
	})

	describe('Changelog List', () => {
		it('should have flex column layout for list', () => {
			expect(changelogPageContent).toContain('flex flex-col')
		})

		it('should map over sortedChangelogs', () => {
			expect(changelogPageContent).toContain('sortedChangelogs.map')
		})

		it('should render ChangelogCard for each entry', () => {
			expect(changelogPageContent).toContain('<ChangelogCard')
		})

		it('should pass post prop to ChangelogCard', () => {
			expect(changelogPageContent).toContain('post={post}')
		})
	})

	describe('Styling', () => {
		it('should use py-42 for vertical padding', () => {
			expect(changelogPageContent).toContain('py-42')
		})

		it('should have white text for hero content', () => {
			expect(changelogPageContent).toContain('text-white')
		})

		it('should use font-display for heading', () => {
			expect(changelogPageContent).toContain('font-display')
		})

		it('should use text-balance for text wrapping', () => {
			expect(changelogPageContent).toContain('text-balance')
		})

		it('should have nextnode-400 color for highlighted text', () => {
			expect(changelogPageContent).toContain('text-nextnode-400')
		})

		it('should have gap for grid spacing', () => {
			expect(changelogPageContent).toContain('gap-y-12')
			expect(changelogPageContent).toContain('lg:gap-y-24')
		})
	})

	describe('Layout Structure', () => {
		it('should have col-span-2 for hero on medium screens', () => {
			expect(changelogPageContent).toContain('md:col-span-2')
		})

		it('should have col-start-2 to center hero', () => {
			expect(changelogPageContent).toContain('md:col-start-2')
		})

		it('should center text on medium screens', () => {
			expect(changelogPageContent).toContain('md:text-center')
		})

		it('should have row-start-2 for changelog list', () => {
			expect(changelogPageContent).toContain('md:row-start-2')
		})
	})

	describe('Text Component Usage', () => {
		it('should use span tag for label', () => {
			expect(changelogPageContent).toContain('tag="span"')
		})

		it('should use h1 tag for main heading', () => {
			expect(changelogPageContent).toContain('tag="h1"')
		})
	})

	describe('Accessibility', () => {
		it('should have proper heading hierarchy with h1', () => {
			expect(changelogPageContent).toContain('tag="h1"')
		})

		it('should have semantic section element', () => {
			expect(changelogPageContent).toContain('<section>')
		})
	})

	describe('TypeScript', () => {
		it('should use Date constructor for date parsing', () => {
			expect(changelogPageContent).toContain('new Date(')
		})

		it('should use async await for getCollection', () => {
			expect(changelogPageContent).toContain('await getCollection')
		})
	})

	describe('Date Sorting', () => {
		it('should compare b date first for descending order', () => {
			// b.data.date should come before a.data.date in subtraction for newest first
			expect(changelogPageContent).toContain(
				'new Date(b.data.date).getTime() - new Date(a.data.date).getTime()',
			)
		})
	})
})
