import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for contact.astro (contact page)
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required patterns.
 */

const pagePath = join(process.cwd(), 'src/pages/contact.astro')
const pageContent = readFileSync(pagePath, 'utf-8')

describe('contact.astro (contact page)', () => {
	describe('layout integration', () => {
		it('imports BaseLayout', () => {
			expect(pageContent).toContain(
				"import BaseLayout from '@/layouts/BaseLayout.astro'",
			)
		})

		it('uses BaseLayout as root element', () => {
			expect(pageContent).toContain('<BaseLayout>')
			expect(pageContent).toContain('</BaseLayout>')
		})
	})

	describe('component imports', () => {
		it('imports Text component', () => {
			expect(pageContent).toContain(
				"import Text from '@/components/fundations/elements/Text.astro'",
			)
		})

		it('imports Button component', () => {
			expect(pageContent).toContain(
				"import Button from '@/components/fundations/elements/Button.astro'",
			)
		})

		it('imports Wrapper component', () => {
			expect(pageContent).toContain(
				"import Wrapper from '@/components/fundations/containers/Wrapper.astro'",
			)
		})
	})

	describe('page structure', () => {
		it('has a section element', () => {
			expect(pageContent).toContain('<section')
		})

		it('uses Wrapper with standard variant', () => {
			expect(pageContent).toContain('<Wrapper')
			expect(pageContent).toContain('variant="standard"')
		})

		it('has page title', () => {
			expect(pageContent).toContain('Contact us')
		})

		it('has page description', () => {
			expect(pageContent).toContain('Get in touch with our team')
		})
	})

	describe('contact form', () => {
		it('has a form element', () => {
			expect(pageContent).toContain('<form')
		})

		it('has first name field with required attribute', () => {
			expect(pageContent).toContain('id="first_name"')
			expect(pageContent).toContain('name="first_name"')
			expect(pageContent).toMatch(/first_name[\s\S]*?required/)
		})

		it('has last name field with required attribute', () => {
			expect(pageContent).toContain('id="last_name"')
			expect(pageContent).toContain('name="last_name"')
			expect(pageContent).toMatch(/last_name[\s\S]*?required/)
		})

		it('has email field with proper type and required', () => {
			expect(pageContent).toContain('type="email"')
			expect(pageContent).toContain('id="email"')
			expect(pageContent).toContain('name="email"')
			expect(pageContent).toMatch(/id="email"[\s\S]*?required/)
		})

		it('has subject field', () => {
			expect(pageContent).toContain('id="subject"')
			expect(pageContent).toContain('name="subject"')
		})

		it('has message textarea with required attribute', () => {
			expect(pageContent).toContain('<textarea')
			expect(pageContent).toContain('id="message"')
			expect(pageContent).toContain('name="message"')
			expect(pageContent).toMatch(/id="message"[\s\S]*?required/)
		})

		it('has submit button', () => {
			expect(pageContent).toContain('<Button')
			expect(pageContent).toContain('Send message')
		})
	})

	describe('form validation attributes', () => {
		it('has autocomplete on first name', () => {
			expect(pageContent).toContain('autocomplete="given-name"')
		})

		it('has autocomplete on last name', () => {
			expect(pageContent).toContain('autocomplete="family-name"')
		})

		it('has autocomplete on email', () => {
			expect(pageContent).toContain('autocomplete="email"')
		})

		it('has aria-describedby on message', () => {
			expect(pageContent).toContain('aria-describedby="message-desc"')
		})
	})

	describe('form labels', () => {
		it('has label for first name', () => {
			expect(pageContent).toContain('for="first_name"')
			expect(pageContent).toContain('First name')
		})

		it('has label for last name', () => {
			expect(pageContent).toContain('for="last_name"')
			expect(pageContent).toContain('Last name')
		})

		it('has label for email', () => {
			expect(pageContent).toContain('for="email"')
			expect(pageContent).toMatch(/for="email"[\s\S]*?Email/)
		})

		it('has label for subject', () => {
			expect(pageContent).toContain('for="subject"')
			expect(pageContent).toContain('Subject')
		})

		it('has label for message', () => {
			expect(pageContent).toContain('for="message"')
			expect(pageContent).toContain('Message')
		})
	})

	describe('contact information', () => {
		it('has contact info section', () => {
			expect(pageContent).toContain('Contact information')
		})

		it('defines contact info object', () => {
			expect(pageContent).toContain('const contactInfo')
		})

		it('shows email address', () => {
			expect(pageContent).toContain('contactInfo.email')
			expect(pageContent).toContain("email: 'hello@nextnode.io'")
		})

		it('shows phone number', () => {
			expect(pageContent).toContain('contactInfo.phone')
			expect(pageContent).toContain("phone: '+1 (555) 123-4567'")
		})

		it('shows address', () => {
			expect(pageContent).toContain('contactInfo.address')
			expect(pageContent).toContain(
				"address: '123 Innovation Drive, San Francisco, CA 94102'",
			)
		})
	})

	describe('styling', () => {
		it('uses gradient background', () => {
			expect(pageContent).toContain('bggradient-up')
		})

		it('uses responsive grid layout', () => {
			expect(pageContent).toContain('grid-cols-1')
			expect(pageContent).toContain('md:grid-cols-4')
		})

		it('uses base color tokens for form fields', () => {
			expect(pageContent).toContain('bg-base-900')
			expect(pageContent).toContain('bg-base-950')
			expect(pageContent).toContain('text-base-500')
		})

		it('uses white text color', () => {
			expect(pageContent).toContain('text-white')
		})
	})

	describe('TypeScript', () => {
		it('has TypeScript frontmatter', () => {
			expect(pageContent).toMatch(/^---\n/)
			expect(pageContent).toContain('---')
		})

		it('uses path alias for imports', () => {
			expect(pageContent).toContain("from '@/")
		})
	})
})
