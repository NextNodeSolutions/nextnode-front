import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for MobileNav.astro component
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required patterns.
 */

const mobileNavComponentPath = join(
	process.cwd(),
	'src/components/global/MobileNav.astro',
)
const mobileNavContent = readFileSync(mobileNavComponentPath, 'utf-8')

describe('MobileNav.astro', () => {
	describe('component structure', () => {
		it('has mobile-only wrapper', () => {
			expect(mobileNavContent).toContain('md:hidden')
		})

		it('has menu toggle button with id', () => {
			expect(mobileNavContent).toContain('id="menu-toggle"')
		})

		it('has mobile menu container with id', () => {
			expect(mobileNavContent).toContain('id="mobile-menu"')
		})

		it('has nav element for menu', () => {
			expect(mobileNavContent).toContain('<nav')
		})
	})

	describe('icons integration', () => {
		it('imports Menu icon from fundations', () => {
			expect(mobileNavContent).toContain(
				"import Menu from '@/components/fundations/icons/Menu.astro'",
			)
		})

		it('imports Close icon from fundations', () => {
			expect(mobileNavContent).toContain(
				"import Close from '@/components/fundations/icons/Close.astro'",
			)
		})

		it('uses Menu icon with id', () => {
			expect(mobileNavContent).toContain('id="menu-icon"')
			expect(mobileNavContent).toContain('<Menu')
		})

		it('uses Close icon with id', () => {
			expect(mobileNavContent).toContain('id="close-icon"')
			expect(mobileNavContent).toContain('<Close')
		})

		it('Close icon is hidden by default', () => {
			expect(mobileNavContent).toMatch(/<Close[^>]*class="hidden"/)
		})
	})

	describe('CSS grid animation', () => {
		it('has initial collapsed state', () => {
			expect(mobileNavContent).toContain('grid-rows-[0fr]')
		})

		it('transitions grid-template-rows', () => {
			expect(mobileNavContent).toContain(
				'transition-[grid-template-rows]',
			)
		})

		it('has duration for smooth animation', () => {
			expect(mobileNavContent).toContain('duration-300')
		})

		it('has ease-in-out timing function', () => {
			expect(mobileNavContent).toContain('ease-in-out')
		})

		it('has overflow-hidden for animation', () => {
			expect(mobileNavContent).toContain('overflow-hidden')
		})
	})

	describe('TypeScript interface', () => {
		it('exports NavLink interface', () => {
			expect(mobileNavContent).toContain('export interface NavLink')
		})

		it('NavLink has label property', () => {
			expect(mobileNavContent).toContain('label: string')
		})

		it('NavLink has href property', () => {
			expect(mobileNavContent).toContain('href: string')
		})

		it('has Props interface', () => {
			expect(mobileNavContent).toContain('interface Props')
		})

		it('has navLinks prop', () => {
			expect(mobileNavContent).toContain('navLinks:')
		})
	})

	describe('navigation links', () => {
		it('maps over navLinks to render', () => {
			expect(mobileNavContent).toContain('navLinks.map')
		})

		it('renders links with href', () => {
			expect(mobileNavContent).toContain('href={link.href}')
		})

		it('renders links with label', () => {
			expect(mobileNavContent).toContain('{link.label}')
		})
	})

	describe('no auth buttons', () => {
		it('does not have sign in button', () => {
			expect(mobileNavContent).not.toContain('Sign in')
		})

		it('does not have sign up button', () => {
			expect(mobileNavContent).not.toContain('Sign up')
		})

		it('does not link to sign-in page', () => {
			expect(mobileNavContent).not.toContain('href="/sign-in"')
		})

		it('does not link to sign-up page', () => {
			expect(mobileNavContent).not.toContain('href="/sign-up"')
		})

		it('still uses Button component for toggle', () => {
			expect(mobileNavContent).toContain('import Button')
			expect(mobileNavContent).toContain('<Button')
		})
	})

	describe('styling', () => {
		it('uses NextNode color tokens for background', () => {
			expect(mobileNavContent).toContain('bg-base-900')
		})

		it('uses white text color', () => {
			expect(mobileNavContent).toContain('text-white')
		})

		it('has hover state on links', () => {
			expect(mobileNavContent).toContain('hover:text-base-400')
		})

		it('has rounded corners', () => {
			expect(mobileNavContent).toContain('rounded-xl')
		})

		it('has padding', () => {
			expect(mobileNavContent).toContain('p-8')
		})
	})

	describe('accessibility', () => {
		it('has aria-label on toggle button', () => {
			expect(mobileNavContent).toContain('aria-label="Toggle main menu"')
		})

		it('has aria-label on nav links', () => {
			expect(mobileNavContent).toContain('aria-label={link.label}')
		})

		it('has title attributes on links', () => {
			expect(mobileNavContent).toContain('title={link.label}')
		})
	})

	describe('script functionality', () => {
		it('has DOMContentLoaded event listener', () => {
			expect(mobileNavContent).toContain(
				"addEventListener('DOMContentLoaded'",
			)
		})

		it('gets menu toggle element', () => {
			expect(mobileNavContent).toContain("getElementById('menu-toggle')")
		})

		it('gets mobile menu element', () => {
			expect(mobileNavContent).toContain("getElementById('mobile-menu')")
		})

		it('has toggleMenu function', () => {
			expect(mobileNavContent).toContain('function toggleMenu()')
		})

		it('toggles grid-rows classes', () => {
			expect(mobileNavContent).toContain(
				"classList.remove('grid-rows-[0fr]')",
			)
			expect(mobileNavContent).toContain(
				"classList.add('grid-rows-[1fr]')",
			)
		})

		it('toggles icon visibility', () => {
			expect(mobileNavContent).toContain(
				"menuIcon.classList.toggle('hidden'",
			)
			expect(mobileNavContent).toContain(
				"closeIcon.classList.toggle('hidden'",
			)
		})

		it('handles click event on toggle', () => {
			expect(mobileNavContent).toContain(
				"addEventListener('click', toggleMenu)",
			)
		})
	})

	describe('resize handling', () => {
		it('has handleResize function', () => {
			expect(mobileNavContent).toContain('function handleResize()')
		})

		it('checks window width for md breakpoint', () => {
			expect(mobileNavContent).toContain('window.innerWidth >= 768')
		})

		it('listens for resize events', () => {
			expect(mobileNavContent).toContain(
				"addEventListener('resize', handleResize)",
			)
		})

		it('resets menu state on resize to desktop', () => {
			expect(mobileNavContent).toContain('isMenuOpen = false')
		})
	})

	describe('null safety', () => {
		it('checks for null elements in toggleMenu', () => {
			expect(mobileNavContent).toContain(
				'if (!mobileMenu || !menuIcon || !closeIcon)',
			)
		})

		it('uses optional chaining for click listener', () => {
			expect(mobileNavContent).toContain('menuToggle?.addEventListener')
		})
	})

	describe('no search functionality', () => {
		it('does not have search input', () => {
			expect(mobileNavContent).not.toMatch(/type=["']search["']/)
		})

		it('does not import Search icon', () => {
			expect(mobileNavContent).not.toContain('Search.astro')
		})

		it('does not have search-related content', () => {
			expect(mobileNavContent.toLowerCase()).not.toContain('search')
		})
	})
})
