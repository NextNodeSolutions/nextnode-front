import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

describe('Team Member Profile Page ([...slug])', () => {
	const filePath = join(process.cwd(), 'src/pages/team/[...slug].astro')
	const content = readFileSync(filePath, 'utf-8')

	describe('Layout Integration', () => {
		it('uses TeamLayout', () => {
			expect(content).toContain(
				"import TeamLayout from '@/layouts/TeamLayout.astro'",
			)
		})

		it('wraps content in TeamLayout', () => {
			expect(content).toContain('<TeamLayout')
			expect(content).toContain('</TeamLayout>')
		})

		it('passes name prop to layout', () => {
			expect(content).toContain('name={name}')
		})

		it('passes role prop to layout', () => {
			expect(content).toContain('role={role}')
		})

		it('passes intro prop from bio', () => {
			expect(content).toContain('intro={bio}')
		})

		it('derives avatar from image url', () => {
			expect(content).toContain('const avatar = image?.url?.src')
		})

		it('passes avatar prop to layout', () => {
			expect(content).toContain('avatar={avatar}')
		})

		it('passes socialLinks prop to layout', () => {
			expect(content).toContain('socialLinks={socialLinks}')
		})

		it('passes education prop to layout', () => {
			expect(content).toContain('education={education}')
		})

		it('passes experience prop to layout', () => {
			expect(content).toContain('experience={experience}')
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
	})

	describe('Static Paths Generation', () => {
		it('exports getStaticPaths function', () => {
			expect(content).toContain('export async function getStaticPaths()')
		})

		it('stores team members in allTeam variable', () => {
			expect(content).toContain(
				"const allTeam = await getCollection('team')",
			)
		})

		it('maps team members to paths', () => {
			expect(content).toContain('allTeam.map')
		})

		it('returns params with slug', () => {
			expect(content).toContain('params: { slug: member.slug }')
		})

		it('returns props with member', () => {
			expect(content).toContain('props: { member }')
		})
	})

	describe('Props Interface', () => {
		it('defines Props interface', () => {
			expect(content).toContain('interface Props')
		})

		it('includes member prop type', () => {
			expect(content).toContain(
				"member: Awaited<ReturnType<typeof getCollection<'team'>>>[number]",
			)
		})

		it('destructures member from props', () => {
			expect(content).toContain('const { member } = Astro.props')
		})
	})

	describe('MDX Content Rendering', () => {
		it('renders member content', () => {
			expect(content).toContain('await member.render()')
		})

		it('destructures Content from render result', () => {
			expect(content).toContain(
				'const { Content } = await member.render()',
			)
		})

		it('uses Content component in layout', () => {
			expect(content).toContain('<Content />')
		})
	})

	describe('Member Data Destructuring', () => {
		it('destructures name from member data', () => {
			expect(content).toContain('name')
			expect(content).toContain('member.data')
		})

		it('destructures role from member data', () => {
			expect(content).toContain('role')
		})

		it('destructures bio from member data', () => {
			expect(content).toContain('bio')
		})

		it('destructures image from member data', () => {
			expect(content).toContain('image')
		})

		it('destructures socialLinks from member data', () => {
			expect(content).toContain('socialLinks')
		})

		it('destructures education from member data', () => {
			expect(content).toContain('education')
		})

		it('destructures experience from member data', () => {
			expect(content).toContain('experience')
		})

		it('uses single destructuring statement for data', () => {
			expect(content).toContain(
				'const { name, role, bio, image, socialLinks, education, experience } =',
			)
			expect(content).toContain('member.data')
		})
	})

	describe('TypeScript', () => {
		it('has file comment documenting purpose', () => {
			expect(content).toContain('Team Member Profile Page')
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
})
