import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for Navigation.astro component
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required patterns.
 */

const navigationComponentPath = join(
	process.cwd(),
	'src/components/global/Navigation.astro',
)
const navigationContent = readFileSync(navigationComponentPath, 'utf-8')

describe('Navigation.astro', () => {
	describe('component structure', () => {
		it('has a fixed navigation wrapper', () => {
			expect(navigationContent).toContain('id="nav-wrapper"')
			expect(navigationContent).toContain('fixed')
		})

		it('uses Wrapper component for layout', () => {
			expect(navigationContent).toContain('import Wrapper')
			expect(navigationContent).toContain('<Wrapper')
		})

		it('has desktop navigation section', () => {
			expect(navigationContent).toContain('class="hidden')
			expect(navigationContent).toContain('md:flex')
			expect(navigationContent).toContain('<nav')
		})

		it('includes MobileNav component', () => {
			expect(navigationContent).toContain('import MobileNav')
			expect(navigationContent).toContain('<MobileNav')
		})
	})

	describe('logo integration', () => {
		it('imports Logo component', () => {
			expect(navigationContent).toContain(
				"import Logo from '@/components/assets/Logo.astro'",
			)
		})

		it('uses Logo component instead of text', () => {
			expect(navigationContent).toContain('<Logo')
		})

		it('sets logo variant to light for dark background', () => {
			expect(navigationContent).toContain('variant="light"')
		})

		it('does not use buio text logo', () => {
			expect(navigationContent).not.toContain('buio®')
			expect(navigationContent).not.toContain('buio')
		})
	})

	describe('TypeScript interface', () => {
		it('exports NavLink interface', () => {
			expect(navigationContent).toContain('export interface NavLink')
		})

		it('NavLink has label property', () => {
			expect(navigationContent).toContain('label: string')
		})

		it('NavLink has href property', () => {
			expect(navigationContent).toContain('href: string')
		})

		it('has Props interface', () => {
			expect(navigationContent).toContain('interface Props')
		})

		it('has links prop', () => {
			expect(navigationContent).toContain('links?:')
		})
	})

	describe('configurable links', () => {
		it('has default navigation links', () => {
			expect(navigationContent).toContain('defaultLinks')
		})

		it('uses links prop with fallback to defaults', () => {
			expect(navigationContent).toContain('links = defaultLinks')
		})

		it('maps over links to render nav items', () => {
			expect(navigationContent).toContain('links.map')
		})
	})

	describe('no auth buttons', () => {
		it('does not have sign in button', () => {
			expect(navigationContent).not.toContain('Sign in')
		})

		it('does not have sign up button', () => {
			expect(navigationContent).not.toContain('Sign up')
		})

		it('does not link to sign-in page', () => {
			expect(navigationContent).not.toContain('href="/sign-in"')
		})

		it('does not link to sign-up page', () => {
			expect(navigationContent).not.toContain('href="/sign-up"')
		})

		it('does not import Button component (no auth buttons)', () => {
			expect(navigationContent).not.toContain(
				"import Button from '@/components/fundations/elements/Button.astro'",
			)
		})
	})

	describe('styling', () => {
		it('uses NextNode color tokens', () => {
			expect(navigationContent).toContain('base-')
		})

		it('has scroll-triggered background blur', () => {
			expect(navigationContent).toContain('backdrop-blur')
		})

		it('has scroll threshold check', () => {
			expect(navigationContent).toContain('scrollThreshold')
		})

		it('has transition classes', () => {
			expect(navigationContent).toContain('transition')
			expect(navigationContent).toContain('duration')
		})
	})

	describe('accessibility', () => {
		it('has aria-label on logo link', () => {
			expect(navigationContent).toContain('aria-label="Go to homepage"')
		})

		it('has aria-label on nav links', () => {
			expect(navigationContent).toContain('aria-label={link.label}')
		})

		it('has title attributes on links', () => {
			expect(navigationContent).toContain('title={link.label}')
		})
	})

	describe('scroll behavior', () => {
		it('has scroll event listener', () => {
			expect(navigationContent).toContain("addEventListener('scroll'")
		})

		it('toggles classes on scroll', () => {
			expect(navigationContent).toContain('classList.toggle')
		})

		it('handles initial scroll state', () => {
			expect(navigationContent).toContain('handleScroll()')
		})

		it('checks for null navWrapper', () => {
			expect(navigationContent).toContain('if (!navWrapper)')
		})
	})

	describe('no search functionality', () => {
		it('does not have search input', () => {
			expect(navigationContent).not.toMatch(/type=["']search["']/)
		})

		it('does not import Search icon', () => {
			expect(navigationContent).not.toContain('Search.astro')
		})

		it('does not have search button', () => {
			expect(navigationContent).not.toMatch(/search/i)
		})
	})
})
