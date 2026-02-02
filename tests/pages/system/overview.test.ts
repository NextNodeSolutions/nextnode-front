import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

describe('Design System Overview Page', () => {
	const filePath = join(process.cwd(), 'src/pages/system/overview.astro')
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

		it('has page title', () => {
			expect(content).toContain(
				'title="Design System Overview | NextNode"',
			)
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

		it('has descriptive text', () => {
			expect(content).toContain('comprehensive overview')
		})
	})

	describe('Page Data Structure', () => {
		it('defines PageLink interface', () => {
			expect(content).toContain('interface PageLink')
		})

		it('defines PageCategory interface', () => {
			expect(content).toContain('interface PageCategory')
		})

		it('defines PageSection interface', () => {
			expect(content).toContain('interface PageSection')
		})

		it('has pageData array', () => {
			expect(content).toContain('const pageData: PageSection[]')
		})
	})

	describe('All Pages Section', () => {
		it('has All Pages section', () => {
			expect(content).toContain("sectionTitle: 'All Pages'")
		})

		it('has Main category', () => {
			expect(content).toContain("title: 'Main'")
		})

		it('includes Homepage link', () => {
			expect(content).toContain("name: 'Homepage'")
			expect(content).toContain("url: '/'")
		})

		it('includes Alternative Homepage link', () => {
			expect(content).toContain("name: 'Alternative Homepage'")
			expect(content).toContain("url: '/index-two'")
		})

		it('includes Contact link', () => {
			expect(content).toContain("name: 'Contact'")
			expect(content).toContain("url: '/contact'")
		})

		it('includes Pricing link', () => {
			expect(content).toContain("name: 'Pricing'")
			expect(content).toContain("url: '/pricing'")
		})
	})

	describe('Design System Section', () => {
		it('has Design System category', () => {
			expect(content).toContain("title: 'Design System'")
		})

		it('includes Overview link', () => {
			expect(content).toContain("url: '/system/overview'")
		})

		it('includes Buttons link', () => {
			expect(content).toContain("url: '/system/buttons'")
		})

		it('includes Colors link', () => {
			expect(content).toContain("url: '/system/colors'")
		})

		it('includes Links link', () => {
			expect(content).toContain("url: '/system/link'")
		})

		it('includes Typography link', () => {
			expect(content).toContain("url: '/system/typography'")
		})
	})

	describe('Content Collections Section', () => {
		it('has Content Collections section', () => {
			expect(content).toContain("sectionTitle: 'Content Collections'")
		})

		it('has Changelog category', () => {
			expect(content).toContain("title: 'Changelog'")
		})

		it('has Legal category', () => {
			expect(content).toContain("title: 'Legal'")
		})

		it('includes Privacy Policy link', () => {
			expect(content).toContain("url: '/legal/privacy-policy'")
		})

		it('includes Terms of Service link', () => {
			expect(content).toContain("url: '/legal/terms-of-service'")
		})
	})

	describe('Components Section', () => {
		it('has Components section', () => {
			expect(content).toContain("sectionTitle: 'Components'")
		})

		it('has Headers category', () => {
			expect(content).toContain("title: 'Headers'")
		})

		it('has Features category', () => {
			expect(content).toContain("title: 'Features'")
		})

		it('has Sections category', () => {
			expect(content).toContain("title: 'Sections'")
		})

		it('has Cards category', () => {
			expect(content).toContain("title: 'Cards'")
		})

		it('lists Feature components', () => {
			expect(content).toContain("name: 'Feature1'")
			expect(content).toContain("name: 'Feature2'")
			expect(content).toContain("name: 'Feature3'")
		})

		it('lists Section components', () => {
			expect(content).toContain("name: 'Pricing1'")
			expect(content).toContain("name: 'Faq1'")
			expect(content).toContain("name: 'Cta1'")
			expect(content).toContain("name: 'Testimonial1'")
		})

		it('lists Card components', () => {
			expect(content).toContain("name: 'TeamCard'")
			expect(content).toContain("name: 'JobCard'")
			expect(content).toContain("name: 'CustomerCard'")
			expect(content).toContain("name: 'ChangelogCard'")
			expect(content).toContain("name: 'HelpCenterCard'")
		})
	})

	describe('Help Center Section', () => {
		it('has Help Center category', () => {
			expect(content).toContain("title: 'Help Center'")
		})

		it('includes Help Center Home link', () => {
			expect(content).toContain("url: '/helpcenter'")
		})

		it('includes System Status link', () => {
			expect(content).toContain("url: '/helpcenter/status'")
		})
	})

	describe('Company Section', () => {
		it('has Company category', () => {
			expect(content).toContain("title: 'Company'")
		})

		it('includes Team link', () => {
			expect(content).toContain("url: '/team'")
		})

		it('includes Jobs link', () => {
			expect(content).toContain("url: '/jobs'")
		})

		it('includes Customers link', () => {
			expect(content).toContain("url: '/customers'")
		})
	})

	describe('Link Styling', () => {
		it('uses native anchor tags for links', () => {
			expect(content).toContain('<a')
			expect(content).toContain('href={link.url}')
		})

		it('has hover effect on links', () => {
			expect(content).toContain('hover:text-white')
		})

		it('uses text-base-500 for link color', () => {
			expect(content).toContain('text-base-500')
		})

		it('uses text-sm for link size', () => {
			expect(content).toContain('text-sm')
		})

		it('has transition on links', () => {
			expect(content).toContain('transition-colors')
		})
	})

	describe('Accessibility', () => {
		it('uses proper heading hierarchy', () => {
			expect(content).toContain('tag="h1"')
			expect(content).toContain('tag="h2"')
			expect(content).toContain('tag="h3"')
		})

		it('has title attributes on links', () => {
			expect(content).toContain('title={link.name}')
		})

		it('has aria-label attributes on links', () => {
			expect(content).toContain('aria-label={link.name}')
		})
	})

	describe('TypeScript', () => {
		it('has typed interface for PageLink', () => {
			expect(content).toContain('interface PageLink {')
			expect(content).toContain('name: string')
			expect(content).toContain('url: string')
		})

		it('has typed interface for PageCategory', () => {
			expect(content).toContain('interface PageCategory {')
			expect(content).toContain('links: PageLink[]')
		})

		it('has typed interface for PageSection', () => {
			expect(content).toContain('interface PageSection {')
			expect(content).toContain('categories: PageCategory[]')
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
	})
})
