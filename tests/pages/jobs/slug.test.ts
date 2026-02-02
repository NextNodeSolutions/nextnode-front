import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

describe('Job Detail Page ([...slug])', () => {
	const filePath = join(process.cwd(), 'src/pages/jobs/[...slug].astro')
	const content = readFileSync(filePath, 'utf-8')

	describe('Layout Integration', () => {
		it('uses JobsLayout', () => {
			expect(content).toContain(
				"import JobsLayout from '@/layouts/JobsLayout.astro'",
			)
		})

		it('wraps content in JobsLayout', () => {
			expect(content).toContain('<JobsLayout')
			expect(content).toContain('</JobsLayout>')
		})

		it('passes title prop to layout', () => {
			expect(content).toContain('title={title}')
		})

		it('passes details prop to layout', () => {
			expect(content).toContain('details={details}')
		})

		it('passes description prop to layout', () => {
			expect(content).toContain('description={description}')
		})

		it('builds details object from job data', () => {
			expect(content).toContain(
				'const details = { department, location, type }',
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
	})

	describe('Static Paths Generation', () => {
		it('exports getStaticPaths function', () => {
			expect(content).toContain('export async function getStaticPaths()')
		})

		it('stores jobs in allJobs variable', () => {
			expect(content).toContain(
				"const allJobs = await getCollection('jobs')",
			)
		})

		it('maps jobs to paths', () => {
			expect(content).toContain('allJobs.map')
		})

		it('returns params with slug', () => {
			expect(content).toContain('params: { slug: job.slug }')
		})

		it('returns props with job', () => {
			expect(content).toContain('props: { job }')
		})
	})

	describe('Props Interface', () => {
		it('defines Props interface', () => {
			expect(content).toContain('interface Props')
		})

		it('includes job prop type', () => {
			expect(content).toContain(
				"job: Awaited<ReturnType<typeof getCollection<'jobs'>>>[number]",
			)
		})

		it('destructures job from props', () => {
			expect(content).toContain('const { job } = Astro.props')
		})
	})

	describe('MDX Content Rendering', () => {
		it('renders job content', () => {
			expect(content).toContain('await job.render()')
		})

		it('destructures Content from render result', () => {
			expect(content).toContain('const { Content } = await job.render()')
		})

		it('uses Content component in layout', () => {
			expect(content).toContain('<Content />')
		})
	})

	describe('Job Data Destructuring', () => {
		it('destructures title from job data', () => {
			expect(content).toContain('title')
			expect(content).toContain('job.data')
		})

		it('destructures department from job data', () => {
			expect(content).toContain('department')
		})

		it('destructures location from job data', () => {
			expect(content).toContain('location')
		})

		it('destructures type from job data', () => {
			expect(content).toContain('type')
		})

		it('destructures description from job data', () => {
			expect(content).toContain('description')
		})

		it('uses destructuring statement for data', () => {
			expect(content).toContain(
				'const { title, department, location, type, description } = job.data',
			)
		})
	})

	describe('TypeScript', () => {
		it('has file comment documenting purpose', () => {
			expect(content).toContain('Job Detail Page')
		})

		it('mentions dynamic route in comment', () => {
			expect(content).toContain('Dynamic route')
		})

		it('mentions MDX content in comment', () => {
			expect(content).toContain('MDX')
		})

		it('mentions static paths in comment', () => {
			expect(content).toContain('static paths')
		})
	})

	describe('Code Structure', () => {
		it('has frontmatter delimiters', () => {
			const frontmatterMatches = content.match(/---/g)
			expect(frontmatterMatches?.length).toBe(2)
		})

		it('imports are at the top of frontmatter', () => {
			const importIndex = content.indexOf('import {')
			const frontmatterStart = content.indexOf('---')
			expect(importIndex).toBeGreaterThan(frontmatterStart)
		})

		it('getStaticPaths is exported', () => {
			expect(content).toContain('export async function getStaticPaths')
		})
	})

	describe('JobsLayout Props Mapping', () => {
		it('maps job data fields to JobsLayout props correctly', () => {
			expect(content).toContain('title={title}')
			expect(content).toContain('details={details}')
			expect(content).toContain('description={description}')
		})

		it('creates details object with department', () => {
			expect(content).toContain('department')
			expect(content).toContain('details = {')
		})

		it('creates details object with location', () => {
			expect(content).toContain('location')
		})

		it('creates details object with type', () => {
			expect(content).toContain('type')
		})
	})
})
