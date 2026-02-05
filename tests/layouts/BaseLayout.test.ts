import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for BaseLayout.astro layout
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required patterns.
 */

const layoutPath = join(process.cwd(), 'src/layouts/BaseLayout.astro')
const layoutContent = readFileSync(layoutPath, 'utf-8')

describe('BaseLayout.astro', () => {
	describe('component structure', () => {
		it('has html element with lang attribute', () => {
			expect(layoutContent).toContain('<html')
			expect(layoutContent).toContain('lang={lang}')
		})

		it('has head element', () => {
			expect(layoutContent).toContain('<head>')
			expect(layoutContent).toContain('</head>')
		})

		it('has body element with flex layout', () => {
			expect(layoutContent).toContain('<body')
			expect(layoutContent).toContain('flex')
			expect(layoutContent).toContain('flex-col')
			expect(layoutContent).toContain('min-h-svh')
		})

		it('has main element with slot', () => {
			expect(layoutContent).toContain('<main')
			expect(layoutContent).toContain('<slot />')
			expect(layoutContent).toContain('</main>')
		})

		it('main has grow class for flex layout', () => {
			expect(layoutContent).toContain('grow')
		})
	})

	describe('Navigation integration', () => {
		it('imports Navigation component', () => {
			expect(layoutContent).toContain(
				"import Navigation from '@/components/global/Navigation.astro'",
			)
		})

		it('uses Navigation component', () => {
			expect(layoutContent).toContain('<Navigation')
		})

		it('passes navLinks prop to Navigation', () => {
			expect(layoutContent).toContain('links={navLinks}')
		})

		it('imports NavLink type', () => {
			expect(layoutContent).toContain(
				"import type { NavLink } from '@/components/global/Navigation.astro'",
			)
		})
	})

	describe('Footer integration', () => {
		it('imports Footer component', () => {
			expect(layoutContent).toContain(
				"import Footer from '@/components/global/Footer.astro'",
			)
		})

		it('uses Footer component', () => {
			expect(layoutContent).toContain('<Footer')
		})

		it('passes sections prop to Footer', () => {
			expect(layoutContent).toContain('sections={footerSections}')
		})

		it('passes socialLinks prop to Footer', () => {
			expect(layoutContent).toContain('socialLinks={footerSocialLinks}')
		})

		it('passes showNewsletter prop to Footer', () => {
			expect(layoutContent).toContain('showNewsletter={showNewsletter}')
		})

		it('imports FooterSection type', () => {
			expect(layoutContent).toContain('FooterSection')
		})

		it('imports SocialLink type', () => {
			expect(layoutContent).toContain('SocialLink')
		})
	})

	describe('BaseHead integration', () => {
		it('imports BaseHead component', () => {
			expect(layoutContent).toContain(
				"import BaseHead from '@/components/fundations/head/BaseHead.astro'",
			)
		})

		it('uses BaseHead component in head', () => {
			expect(layoutContent).toContain('<BaseHead />')
		})
	})

	describe('AOS scripts integration', () => {
		it('imports AosHead component', () => {
			expect(layoutContent).toContain(
				"import AosHead from '@/components/fundations/scripts/AosHead.astro'",
			)
		})

		it('imports AosBody component', () => {
			expect(layoutContent).toContain(
				"import AosBody from '@/components/fundations/scripts/AosBody.astro'",
			)
		})

		it('uses AosHead in head section', () => {
			expect(layoutContent).toContain('<AosHead />')
		})

		it('uses AosBody in body section', () => {
			expect(layoutContent).toContain('<AosBody />')
		})
	})

	describe('logger integration', () => {
		it('imports logger from @nextnode/logger', () => {
			expect(layoutContent).toContain(
				"import { logger } from '@nextnode/logger'",
			)
		})

		it('logs page load event', () => {
			expect(layoutContent).toContain("logger.info('Page loaded'")
		})

		it('uses details object for log data', () => {
			expect(layoutContent).toContain('details: {')
		})

		it('logs page title in details', () => {
			expect(layoutContent).toContain('title,')
		})

		it('logs page pathname in details', () => {
			expect(layoutContent).toContain('pathname: Astro.url.pathname')
		})
	})

	describe('TypeScript Props interface', () => {
		it('exports Props interface', () => {
			expect(layoutContent).toContain('export interface Props')
		})

		it('has title prop', () => {
			expect(layoutContent).toMatch(/title\??: string/)
		})

		it('has description prop', () => {
			expect(layoutContent).toMatch(/description\?: string/)
		})

		it('has lang prop', () => {
			expect(layoutContent).toMatch(/lang\?: string/)
		})

		it('has navLinks prop', () => {
			expect(layoutContent).toContain('navLinks?: NavLink[]')
		})

		it('has footerSections prop', () => {
			expect(layoutContent).toContain('footerSections?: FooterSection[]')
		})

		it('has footerSocialLinks prop', () => {
			expect(layoutContent).toContain('footerSocialLinks?: SocialLink[]')
		})

		it('has showNewsletter prop', () => {
			expect(layoutContent).toContain('showNewsletter?: boolean')
		})
	})

	describe('default values', () => {
		it('has default title', () => {
			expect(layoutContent).toContain("title = 'NextNode'")
		})

		it('has default description', () => {
			expect(layoutContent).toContain("description = '")
		})

		it('has default lang', () => {
			expect(layoutContent).toContain("lang = 'en'")
		})

		it('has default showNewsletter', () => {
			expect(layoutContent).toContain('showNewsletter = true')
		})
	})

	describe('meta tags', () => {
		it('has title tag', () => {
			expect(layoutContent).toContain('<title>{title}</title>')
		})

		it('has meta description', () => {
			expect(layoutContent).toContain('name="description"')
			expect(layoutContent).toContain('content={description}')
		})
	})

	describe('styling', () => {
		it('imports global.css', () => {
			expect(layoutContent).toContain("import '../styles/global.css'")
		})

		it('uses NextNode selection colors', () => {
			expect(layoutContent).toContain('selection:bg-nextnode-500')
		})

		it('has smooth scroll behavior', () => {
			expect(layoutContent).toContain('scroll-smooth')
		})

		it('uses light background', () => {
			expect(layoutContent).toContain('bg-[#f8fafc]')
		})
	})

	describe('component order', () => {
		it('has Navigation before main content', () => {
			const navIndex = layoutContent.indexOf('<Navigation')
			const mainIndex = layoutContent.indexOf('<main')
			expect(navIndex).toBeLessThan(mainIndex)
		})

		it('has main content before Footer', () => {
			const mainIndex = layoutContent.indexOf('<main')
			const footerIndex = layoutContent.indexOf('<Footer')
			expect(mainIndex).toBeLessThan(footerIndex)
		})

		it('has AosBody at end of body', () => {
			const aosBodyIndex = layoutContent.indexOf('<AosBody')
			const bodyCloseIndex = layoutContent.indexOf('</body>')
			expect(aosBodyIndex).toBeLessThan(bodyCloseIndex)
		})

		it('has AosHead in head section', () => {
			const aosHeadIndex = layoutContent.indexOf('<AosHead')
			const headCloseIndex = layoutContent.indexOf('</head>')
			expect(aosHeadIndex).toBeLessThan(headCloseIndex)
		})
	})
})
