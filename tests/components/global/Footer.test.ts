import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for Footer.astro component
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required patterns.
 */

const footerComponentPath = join(
	process.cwd(),
	'src/components/global/Footer.astro',
)
const footerContent = readFileSync(footerComponentPath, 'utf-8')

describe('Footer.astro', () => {
	describe('component structure', () => {
		it('has a footer element', () => {
			expect(footerContent).toContain('<footer')
		})

		it('uses Wrapper component for layout', () => {
			expect(footerContent).toContain('import Wrapper')
			expect(footerContent).toContain('<Wrapper')
		})

		it('uses grid layout', () => {
			expect(footerContent).toContain('grid')
			expect(footerContent).toContain('lg:grid-cols-12')
		})
	})

	describe('logo integration', () => {
		it('imports Logo component', () => {
			expect(footerContent).toContain(
				"import Logo from '@/components/assets/Logo.astro'",
			)
		})

		it('uses Logo component', () => {
			expect(footerContent).toContain('<Logo')
		})

		it('uses light variant for dark background', () => {
			expect(footerContent).toContain('variant="light"')
		})

		it('uses large size for footer logo', () => {
			expect(footerContent).toContain('size="lg"')
		})

		it('logo link has accessibility attributes', () => {
			expect(footerContent).toContain('aria-label="Go to homepage"')
		})
	})

	describe('newsletter signup form', () => {
		it('has newsletter form', () => {
			expect(footerContent).toContain('id="newsletter-form"')
		})

		it('has email input', () => {
			expect(footerContent).toContain('id="newsletter-email"')
			expect(footerContent).toContain('type="email"')
		})

		it('has required attribute on email input', () => {
			expect(footerContent).toContain('required')
		})

		it('has subscribe button', () => {
			expect(footerContent).toContain('Subscribe')
			expect(footerContent).toContain('type="submit"')
		})

		it('uses Button component for submit', () => {
			expect(footerContent).toContain('import Button')
			expect(footerContent).toContain('<Button')
		})

		it('uses orange variant for subscribe button', () => {
			expect(footerContent).toContain('variant="orange"')
		})

		it('has accessible label for email input', () => {
			expect(footerContent).toContain('<label')
			expect(footerContent).toContain('for="newsletter-email"')
			expect(footerContent).toContain('sr-only')
		})

		it('has showNewsletter prop to control visibility', () => {
			expect(footerContent).toContain('showNewsletter')
			expect(footerContent).toContain('showNewsletter && (')
		})
	})

	describe('TypeScript interfaces', () => {
		it('exports FooterLink interface', () => {
			expect(footerContent).toContain('export interface FooterLink')
		})

		it('FooterLink has label property', () => {
			expect(footerContent).toMatch(/FooterLink[\s\S]*?label: string/)
		})

		it('FooterLink has href property', () => {
			expect(footerContent).toMatch(/FooterLink[\s\S]*?href: string/)
		})

		it('exports FooterSection interface', () => {
			expect(footerContent).toContain('export interface FooterSection')
		})

		it('FooterSection has title property', () => {
			expect(footerContent).toMatch(/FooterSection[\s\S]*?title: string/)
		})

		it('FooterSection has links property', () => {
			expect(footerContent).toMatch(
				/FooterSection[\s\S]*?links: FooterLink\[\]/,
			)
		})

		it('exports SocialLink interface', () => {
			expect(footerContent).toContain('export interface SocialLink')
		})

		it('SocialLink has icon property', () => {
			expect(footerContent).toMatch(
				/SocialLink[\s\S]*?icon: ['"]twitter['"] \| ['"]github['"] \| ['"]linkedin['"] \| ['"]discord['"]/,
			)
		})

		it('has Props interface', () => {
			expect(footerContent).toContain('interface Props')
		})
	})

	describe('configurable links', () => {
		it('has default footer sections', () => {
			expect(footerContent).toContain('defaultSections')
		})

		it('has sections prop with fallback to defaults', () => {
			expect(footerContent).toContain('sections = defaultSections')
		})

		it('maps over sections to render link groups', () => {
			expect(footerContent).toContain('sections.map')
		})

		it('maps over links within sections', () => {
			expect(footerContent).toContain('section.links.map')
		})

		it('has Product section in defaults', () => {
			expect(footerContent).toContain("title: 'Product'")
		})

		it('has Resources section in defaults', () => {
			expect(footerContent).toContain("title: 'Resources'")
		})

		it('has Company section in defaults', () => {
			expect(footerContent).toContain("title: 'Company'")
		})
	})

	describe('social media links', () => {
		it('has default social links', () => {
			expect(footerContent).toContain('defaultSocialLinks')
		})

		it('has socialLinks prop with fallback to defaults', () => {
			expect(footerContent).toContain('socialLinks = defaultSocialLinks')
		})

		it('maps over social links', () => {
			expect(footerContent).toContain('socialLinks.map')
		})

		it('includes Twitter social link', () => {
			expect(footerContent).toContain("icon: 'twitter'")
		})

		it('includes GitHub social link', () => {
			expect(footerContent).toContain("icon: 'github'")
		})

		it('includes LinkedIn social link', () => {
			expect(footerContent).toContain("icon: 'linkedin'")
		})

		it('includes Discord social link', () => {
			expect(footerContent).toContain("icon: 'discord'")
		})

		it('has social icon SVG paths', () => {
			expect(footerContent).toContain('socialIcons')
			expect(footerContent).toContain('socialIcons[social.icon]')
		})

		it('social links open in new tab', () => {
			expect(footerContent).toContain('target="_blank"')
			expect(footerContent).toContain('rel="noopener noreferrer"')
		})
	})

	describe('NextNode color tokens', () => {
		it('uses base color tokens', () => {
			expect(footerContent).toContain('base-')
		})

		it('uses nextnode color tokens', () => {
			expect(footerContent).toContain('nextnode-')
		})

		it('uses dark background color', () => {
			expect(footerContent).toContain('bg-base-950')
		})

		it('uses muted text colors for secondary content', () => {
			expect(footerContent).toContain('text-base-400')
			expect(footerContent).toContain('text-base-500')
		})
	})

	describe('footer organization', () => {
		it('has links organized in columns', () => {
			expect(footerContent).toContain('grid-cols-2')
			expect(footerContent).toContain('sm:grid-cols-3')
		})

		it('has navigation element for link sections', () => {
			expect(footerContent).toContain('<nav')
			expect(footerContent).toContain('role="navigation"')
		})

		it('has list structure for links', () => {
			expect(footerContent).toContain('<ul')
			expect(footerContent).toContain('role="list"')
		})

		it('uses Text component for headings', () => {
			expect(footerContent).toContain('import Text')
			expect(footerContent).toContain('<Text')
		})
	})

	describe('copyright and bottom section', () => {
		it('has copyright text', () => {
			expect(footerContent).toContain('NextNode')
			expect(footerContent).toContain('All rights reserved')
		})

		it('has dynamic year', () => {
			expect(footerContent).toContain('currentYear')
			expect(footerContent).toContain('new Date().getFullYear()')
		})

		it('has border separator', () => {
			expect(footerContent).toContain('border-t')
			expect(footerContent).toContain('border-base-800')
		})
	})

	describe('accessibility', () => {
		it('has aria-label on navigation sections', () => {
			expect(footerContent).toContain('aria-label={')
			expect(footerContent).toContain('section.title')
			expect(footerContent).toContain('links`}')
		})

		it('has aria-label on footer links', () => {
			expect(footerContent).toContain('aria-label={link.label}')
		})

		it('has aria-label on social links', () => {
			expect(footerContent).toContain('aria-label={social.label}')
		})

		it('has title attributes on links', () => {
			expect(footerContent).toContain('title={link.label}')
			expect(footerContent).toContain('title={social.label}')
		})

		it('has aria-hidden on decorative SVGs', () => {
			expect(footerContent).toContain('aria-hidden="true"')
		})
	})

	describe('styling and transitions', () => {
		it('has transition classes for interactive elements', () => {
			expect(footerContent).toContain('transition-colors')
			expect(footerContent).toContain('duration-200')
		})

		it('has hover states for links', () => {
			expect(footerContent).toContain('hover:text-white')
		})

		it('has focus states for inputs', () => {
			expect(footerContent).toContain('focus:border-nextnode-500')
			expect(footerContent).toContain('focus:ring-nextnode-500')
		})

		it('has overflow hidden for layout', () => {
			expect(footerContent).toContain('overflow-hidden')
		})
	})
})
