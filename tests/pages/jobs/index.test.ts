import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

describe('Jobs Listing Page', () => {
	const filePath = join(process.cwd(), 'src/pages/jobs/index.astro')
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
			expect(content).toContain("const title = 'Careers | NextNode'")
		})

		it('has page description defined', () => {
			expect(content).toContain('const description =')
			expect(content).toContain('Join the NextNode team')
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

		it('imports JobCard component', () => {
			expect(content).toContain(
				"import JobCard from '@/components/jobs/JobCard.astro'",
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

		it('fetches jobs collection', () => {
			expect(content).toContain("getCollection('jobs')")
		})

		it('stores jobs in allJobs variable', () => {
			expect(content).toContain('const allJobs = await getCollection')
		})

		it('sorts jobs by publication date', () => {
			expect(content).toContain('sortedJobs')
			expect(content).toContain('pubDate')
		})

		it('extracts unique departments for filtering', () => {
			expect(content).toContain('const departments =')
			expect(content).toContain('new Set')
			expect(content).toContain('department')
		})
	})

	describe('Page Structure', () => {
		it('has section elements', () => {
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

		it('has "Careers" label text', () => {
			expect(content).toContain('Careers')
		})

		it('has hero section with CTA button', () => {
			expect(content).toContain('See open positions')
			expect(content).toContain('href="#open-positions"')
		})
	})

	describe('Open Positions Section', () => {
		it('has open positions section with id', () => {
			expect(content).toContain('id="open-positions"')
		})

		it('has h2 heading for open positions', () => {
			expect(content).toContain('tag="h2"')
			expect(content).toContain('Join our team')
		})

		it('has jobs list container', () => {
			expect(content).toContain('id="jobs-list"')
		})
	})

	describe('Department Filtering', () => {
		it('has filter buttons container', () => {
			expect(content).toContain('id="department-filters"')
		})

		it('has All filter button', () => {
			expect(content).toContain('data-department="all"')
			// The "All" text appears between open/close button tags with whitespace
			expect(content).toMatch(/>\s*All\s*<\/button>/)
		})

		it('maps over departments for filter buttons', () => {
			expect(content).toContain('departments.map')
		})

		it('uses filter-btn class for buttons', () => {
			expect(content).toContain('class="filter-btn')
		})

		it('includes client-side filtering script', () => {
			expect(content).toContain('<script>')
			expect(content).toContain('filterButtons')
		})

		it('filters job cards on button click', () => {
			expect(content).toContain("addEventListener('click'")
			expect(content).toContain('data-department')
		})

		it('has no jobs message element', () => {
			expect(content).toContain('id="no-jobs-message"')
		})
	})

	describe('Job Cards Display', () => {
		it('maps over sortedJobs to display cards', () => {
			expect(content).toContain('sortedJobs.map')
		})

		it('renders JobCard with post prop', () => {
			expect(content).toContain('<JobCard post={post}')
		})

		it('wraps job cards with data-department attribute', () => {
			expect(content).toContain('data-department={post.data.department}')
		})

		it('uses dividers between job cards', () => {
			expect(content).toContain('divide-y')
			expect(content).toContain('divide-white/10')
		})

		it('has border styling for jobs list', () => {
			expect(content).toContain('border-y')
			expect(content).toContain('border-white/10')
		})
	})

	describe('Benefits Section', () => {
		it('has benefits data array', () => {
			expect(content).toContain('const benefits =')
		})

		it('includes Remote-First Culture benefit', () => {
			expect(content).toContain('Remote-First Culture')
		})

		it('includes Competitive Compensation benefit', () => {
			expect(content).toContain('Competitive Compensation')
		})

		it('includes Health & Wellness benefit', () => {
			expect(content).toContain('Health & Wellness')
		})

		it('includes Generous Time Off benefit', () => {
			expect(content).toContain('Generous Time Off')
		})

		it('includes Learning & Growth benefit', () => {
			expect(content).toContain('Learning & Growth')
		})

		it('includes Modern Equipment benefit', () => {
			expect(content).toContain('Modern Equipment')
		})

		it('maps over benefits columns', () => {
			expect(content).toContain('benefits.map')
		})

		it('uses dl element for benefits list', () => {
			expect(content).toContain('<dl')
		})

		it('uses dt element for benefit titles', () => {
			expect(content).toContain('<dt>')
		})

		it('uses dd element for benefit descriptions', () => {
			expect(content).toContain('<dd')
		})
	})

	describe('CTA Section', () => {
		it('includes Cta component', () => {
			expect(content).toContain('<Cta')
		})

		it('has custom heading for CTA', () => {
			expect(content).toContain('heading="Don\'t see the right role?"')
		})

		it('has custom button text for CTA', () => {
			expect(content).toContain('buttonText="Get in touch"')
		})

		it('links to contact page from CTA', () => {
			expect(content).toContain('buttonHref="/contact"')
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

		it('uses py-42 for hero vertical padding', () => {
			expect(content).toContain('py-42')
		})

		it('uses nextnode color for active filter', () => {
			expect(content).toContain('bg-nextnode-500')
		})
	})

	describe('Responsive Design', () => {
		it('uses md:col-span-2 for column span', () => {
			expect(content).toContain('md:col-span-2')
		})

		it('uses md:col-start-2 for column positioning', () => {
			expect(content).toContain('md:col-start-2')
		})

		it('uses md:grid-cols-4 for main grid', () => {
			expect(content).toContain('md:grid-cols-4')
		})

		it('uses md:grid-cols-2 for benefits grid', () => {
			expect(content).toContain('md:grid-cols-2')
		})

		it('has gap-y-12 for mobile spacing', () => {
			expect(content).toContain('gap-y-12')
		})

		it('uses relative positioning', () => {
			expect(content).toContain('relative')
		})
	})

	describe('Text Component Variants', () => {
		it('uses textSM variant for labels', () => {
			expect(content).toContain('variant="textSM"')
		})

		it('uses textBase variant for paragraphs', () => {
			expect(content).toContain('variant="textBase"')
		})

		it('uses displayXL variant for main heading', () => {
			expect(content).toContain('variant="displayXL"')
		})

		it('uses displayMD variant for secondary heading', () => {
			expect(content).toContain('variant="displayMD"')
		})
	})

	describe('Semantic HTML', () => {
		it('uses span tag for labels', () => {
			expect(content).toContain('tag="span"')
		})

		it('uses h1 tag for main heading', () => {
			expect(content).toContain('tag="h1"')
		})

		it('uses h2 tag for section headings', () => {
			expect(content).toContain('tag="h2"')
		})

		it('uses h3 tag for benefit titles', () => {
			expect(content).toContain('tag="h3"')
		})

		it('uses h4 tag for subsection heading', () => {
			expect(content).toContain('tag="h4"')
		})

		it('uses p tag for description paragraphs', () => {
			expect(content).toContain('tag="p"')
		})
	})

	describe('Prose Content', () => {
		it('uses Wrapper with prose variant', () => {
			expect(content).toContain('variant="prose"')
		})

		it('has paragraph content about NextNode mission', () => {
			expect(content).toContain('At NextNode')
		})

		it('has paragraph about deploying', () => {
			expect(content).toContain('deploying')
		})
	})

	describe('Client-Side JavaScript', () => {
		it('queries filter buttons', () => {
			expect(content).toContain("querySelectorAll('.filter-btn')")
		})

		it('queries job cards', () => {
			expect(content).toContain("querySelectorAll('.job-card')")
		})

		it('gets jobs list element', () => {
			expect(content).toContain("getElementById('jobs-list')")
		})

		it('gets no jobs message element', () => {
			expect(content).toContain("getElementById('no-jobs-message')")
		})

		it('toggles hidden class for filtering', () => {
			expect(content).toContain("classList.add('hidden')")
			expect(content).toContain("classList.remove('hidden')")
		})

		it('updates button active state', () => {
			expect(content).toContain('classList.add')
			expect(content).toContain('classList.remove')
		})
	})
})
