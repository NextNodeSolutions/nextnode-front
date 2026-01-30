import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for TeamLayout.astro layout
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required patterns.
 */

const layoutPath = join(process.cwd(), 'src/layouts/TeamLayout.astro')
const layoutContent = readFileSync(layoutPath, 'utf-8')

describe('TeamLayout.astro', () => {
	describe('BaseLayout integration', () => {
		it('imports BaseLayout', () => {
			expect(layoutContent).toContain(
				"import BaseLayout from '@/layouts/BaseLayout.astro'",
			)
		})

		it('uses BaseLayout as wrapper', () => {
			expect(layoutContent).toContain('<BaseLayout')
			expect(layoutContent).toContain('</BaseLayout>')
		})

		it('passes title to BaseLayout', () => {
			expect(layoutContent).toContain('title={pageTitle}')
		})

		it('passes description to BaseLayout', () => {
			expect(layoutContent).toContain('description={pageDescription}')
		})
	})

	describe('TypeScript Props interface', () => {
		it('exports Props interface', () => {
			expect(layoutContent).toContain('export interface Props')
		})

		it('has name prop', () => {
			expect(layoutContent).toContain('name: string')
		})

		it('has role prop', () => {
			expect(layoutContent).toContain('role: string')
		})

		it('has optional intro prop', () => {
			expect(layoutContent).toContain('intro?: string')
		})

		it('has optional avatar prop', () => {
			expect(layoutContent).toContain('avatar?: string')
		})

		it('has optional avatarAlt prop', () => {
			expect(layoutContent).toContain('avatarAlt?: string')
		})

		it('has optional education prop', () => {
			expect(layoutContent).toContain('education?: string[]')
		})

		it('has optional experience prop', () => {
			expect(layoutContent).toContain('experience?: string[]')
		})

		it('has optional socialLinks prop', () => {
			expect(layoutContent).toContain('socialLinks?: SocialLink[]')
		})

		it('has optional title prop', () => {
			expect(layoutContent).toContain('title?: string')
		})

		it('has optional description prop', () => {
			expect(layoutContent).toContain('description?: string')
		})
	})

	describe('SocialLink interface', () => {
		it('exports SocialLink interface', () => {
			expect(layoutContent).toContain('export interface SocialLink')
		})

		it('has platform property', () => {
			const interfaceMatch = layoutContent.match(
				/export interface SocialLink\s*\{[^}]+\}/s,
			)
			expect(interfaceMatch).toBeTruthy()
			expect(interfaceMatch?.[0]).toContain('platform: string')
		})

		it('has url property', () => {
			const interfaceMatch = layoutContent.match(
				/export interface SocialLink\s*\{[^}]+\}/s,
			)
			expect(interfaceMatch).toBeTruthy()
			expect(interfaceMatch?.[0]).toContain('url: string')
		})

		it('has optional label property', () => {
			const interfaceMatch = layoutContent.match(
				/export interface SocialLink\s*\{[^}]+\}/s,
			)
			expect(interfaceMatch).toBeTruthy()
			expect(interfaceMatch?.[0]).toContain('label?: string')
		})
	})

	describe('logger integration', () => {
		it('imports logger from @nextnode/logger', () => {
			expect(layoutContent).toContain(
				"import { logger } from '@nextnode/logger'",
			)
		})

		it('logs team member profile load event', () => {
			expect(layoutContent).toContain(
				"logger.info('Team member profile loaded'",
			)
		})

		it('uses details object for log data', () => {
			expect(layoutContent).toContain('details: {')
		})

		it('logs name in details', () => {
			const detailsMatch = layoutContent.match(
				/logger\.info[^}]+details:\s*\{[^}]+\}/s,
			)
			expect(detailsMatch).toBeTruthy()
			expect(detailsMatch?.[0]).toContain('name,')
		})

		it('logs role in details', () => {
			const detailsMatch = layoutContent.match(
				/logger\.info[^}]+details:\s*\{[^}]+\}/s,
			)
			expect(detailsMatch).toBeTruthy()
			expect(detailsMatch?.[0]).toContain('role,')
		})

		it('logs pathname in details', () => {
			expect(layoutContent).toContain('pathname: Astro.url.pathname')
		})
	})

	describe('member photo display', () => {
		it('has conditional avatar rendering', () => {
			expect(layoutContent).toContain('avatar &&')
		})

		it('has img element for avatar', () => {
			expect(layoutContent).toContain('<img')
		})

		it('has src attribute for avatar', () => {
			expect(layoutContent).toContain('src={avatar}')
		})

		it('has alt attribute for avatar', () => {
			expect(layoutContent).toContain('alt={')
		})

		it('uses default alt text with name', () => {
			expect(layoutContent).toContain('${name}')
		})

		it('supports custom alt text', () => {
			expect(layoutContent).toContain('avatarAlt ??')
		})

		it('has aspect ratio styling', () => {
			expect(layoutContent).toContain('aspect-')
		})

		it('has object-cover styling', () => {
			expect(layoutContent).toContain('object-cover')
		})

		it('has object-top styling for face visibility', () => {
			expect(layoutContent).toContain('object-top')
		})
	})

	describe('member name display', () => {
		it('displays member name', () => {
			expect(layoutContent).toContain('{name}')
		})

		it('uses h1 tag for name', () => {
			expect(layoutContent).toContain('tag="h1"')
		})

		it('uses display2XL variant for name', () => {
			expect(layoutContent).toContain('variant="display2XL"')
		})

		it('uses font-display for name', () => {
			expect(layoutContent).toContain('font-display')
		})

		it('uses text-balance for name', () => {
			expect(layoutContent).toContain('text-balance')
		})

		it('uses white text for name', () => {
			expect(layoutContent).toContain('text-white')
		})
	})

	describe('member role display', () => {
		it('displays member role', () => {
			expect(layoutContent).toContain('{role}')
		})

		it('uses span tag for role', () => {
			expect(layoutContent).toContain('tag="span"')
		})

		it('uses textSM variant for role', () => {
			expect(layoutContent).toContain('variant="textSM"')
		})
	})

	describe('intro display', () => {
		it('has conditional intro rendering', () => {
			expect(layoutContent).toContain('intro &&')
		})

		it('uses p tag for intro', () => {
			expect(layoutContent).toMatch(/tag="p"[\s\S]*?{intro}/)
		})

		it('uses textBase variant for intro', () => {
			expect(layoutContent).toContain('variant="textBase"')
		})
	})

	describe('education section', () => {
		it('has conditional education rendering', () => {
			expect(layoutContent).toContain('education.length > 0')
		})

		it('has Education heading', () => {
			expect(layoutContent).toContain('Education')
		})

		it('uses h3 tag for Education heading', () => {
			const educationSection = layoutContent.match(
				/tag="h3"[\s\S]*?Education/,
			)
			expect(educationSection).toBeTruthy()
		})

		it('iterates over education items', () => {
			expect(layoutContent).toContain('education.map')
		})

		it('uses vertical line decorations for education', () => {
			expect(layoutContent).toContain('before:h-6')
			expect(layoutContent).toContain('before:w-px')
		})
	})

	describe('experience section', () => {
		it('has conditional experience rendering', () => {
			expect(layoutContent).toContain('experience.length > 0')
		})

		it('has Experience heading', () => {
			expect(layoutContent).toContain('Experience')
		})

		it('iterates over experience items', () => {
			expect(layoutContent).toContain('experience.map')
		})

		it('uses vertical line decorations for experience', () => {
			expect(layoutContent).toContain('after:top-8')
			expect(layoutContent).toContain('after:w-px')
		})
	})

	describe('social links section', () => {
		it('has conditional social links rendering', () => {
			expect(layoutContent).toContain('socialLinks.length > 0')
		})

		it('iterates over social links', () => {
			expect(layoutContent).toContain('socialLinks.map')
		})

		it('has anchor element for links', () => {
			expect(layoutContent).toContain('<a')
			expect(layoutContent).toContain('href={link.url}')
		})

		it('opens links in new tab', () => {
			expect(layoutContent).toContain('target="_blank"')
		})

		it('has noopener noreferrer for security', () => {
			expect(layoutContent).toContain('rel="noopener noreferrer"')
		})

		it('has aria-label for accessibility', () => {
			expect(layoutContent).toContain('aria-label={')
		})

		it('uses platform name in aria-label', () => {
			expect(layoutContent).toContain('link.platform')
		})

		it('uses svg for social icons', () => {
			expect(layoutContent).toContain('<svg')
		})

		it('has social icon paths defined', () => {
			expect(layoutContent).toContain('socialIcons')
		})

		it('has twitter icon', () => {
			expect(layoutContent).toContain('twitter:')
		})

		it('has linkedin icon', () => {
			expect(layoutContent).toContain('linkedin:')
		})

		it('has github icon', () => {
			expect(layoutContent).toContain('github:')
		})

		it('has website icon as fallback', () => {
			expect(layoutContent).toContain('website:')
		})

		it('uses lowercase for platform matching', () => {
			expect(layoutContent).toContain('link.platform.toLowerCase()')
		})

		it('falls back to website icon for unknown platforms', () => {
			expect(layoutContent).toContain('?? socialIcons.website')
		})

		it('has hover color transition', () => {
			expect(layoutContent).toContain('hover:text-white')
		})
	})

	describe('fundation components', () => {
		it('imports Text component', () => {
			expect(layoutContent).toContain(
				"import Text from '@/components/fundations/elements/Text.astro'",
			)
		})

		it('imports Wrapper component', () => {
			expect(layoutContent).toContain(
				"import Wrapper from '@/components/fundations/containers/Wrapper.astro'",
			)
		})

		it('uses Text component', () => {
			expect(layoutContent).toContain('<Text')
		})

		it('uses Wrapper component', () => {
			expect(layoutContent).toContain('<Wrapper')
		})

		it('uses prose wrapper for content slot', () => {
			expect(layoutContent).toContain('variant="prose"')
		})

		it('uses standard wrapper for main container', () => {
			expect(layoutContent).toContain('variant="standard"')
		})
	})

	describe('layout structure', () => {
		it('has section element', () => {
			expect(layoutContent).toContain('<section>')
			expect(layoutContent).toContain('</section>')
		})

		it('has slot for bio content', () => {
			expect(layoutContent).toContain('<slot />')
		})

		it('uses grid layout', () => {
			expect(layoutContent).toContain('grid')
			expect(layoutContent).toContain('grid-cols-1')
			expect(layoutContent).toContain('lg:grid-cols-4')
		})

		it('has vertical padding', () => {
			expect(layoutContent).toContain('py-42')
		})

		it('has responsive column span for content', () => {
			expect(layoutContent).toContain('lg:col-span-2')
		})

		it('has row start for prose content on large screens', () => {
			expect(layoutContent).toContain('lg:row-start-2')
		})
	})

	describe('default values', () => {
		it('has default page title based on name and role', () => {
			expect(layoutContent).toContain('title ??')
			expect(layoutContent).toContain('${name}')
			expect(layoutContent).toContain('${role}')
		})

		it('has default page description', () => {
			expect(layoutContent).toContain('description ??')
			expect(layoutContent).toContain('Meet')
			expect(layoutContent).toContain('at NextNode')
		})

		it('has default empty array for education', () => {
			expect(layoutContent).toContain('education = []')
		})

		it('has default empty array for experience', () => {
			expect(layoutContent).toContain('experience = []')
		})

		it('has default empty array for socialLinks', () => {
			expect(layoutContent).toContain('socialLinks = []')
		})
	})

	describe('styling', () => {
		it('uses white text for headings', () => {
			expect(layoutContent).toContain('text-white')
		})

		it('uses base-400 text for muted content', () => {
			expect(layoutContent).toContain('text-base-400')
		})

		it('has gap between education and experience columns', () => {
			expect(layoutContent).toContain('gap-y-12')
			expect(layoutContent).toContain('lg:gap-y-24')
		})

		it('uses vertical line decorations', () => {
			expect(layoutContent).toContain('before:w-px')
			expect(layoutContent).toContain('after:w-px')
		})

		it('has flex gap for social links', () => {
			expect(layoutContent).toContain('flex')
			expect(layoutContent).toContain('gap-4')
		})

		it('uses transition for social link colors', () => {
			expect(layoutContent).toContain('transition-colors')
		})
	})

	describe('component order', () => {
		it('has role before name', () => {
			const roleIndex = layoutContent.indexOf('{role}')
			const nameH1Index = layoutContent.indexOf('tag="h1"')
			expect(roleIndex).toBeLessThan(nameH1Index)
		})

		it('has name before intro', () => {
			const nameIndex = layoutContent.indexOf('{name}')
			const introIndex = layoutContent.indexOf('{intro}')
			expect(nameIndex).toBeLessThan(introIndex)
		})

		it('has intro before avatar', () => {
			const introIndex = layoutContent.indexOf('intro &&')
			const avatarIndex = layoutContent.indexOf('avatar &&')
			expect(introIndex).toBeLessThan(avatarIndex)
		})

		it('has avatar before education/experience', () => {
			const avatarIndex = layoutContent.indexOf('avatar &&')
			const educationIndex = layoutContent.indexOf('education.length > 0')
			expect(avatarIndex).toBeLessThan(educationIndex)
		})

		it('has education/experience before social links', () => {
			const educationIndex = layoutContent.indexOf('Education')
			const socialIndex = layoutContent.indexOf('socialLinks.length > 0')
			expect(educationIndex).toBeLessThan(socialIndex)
		})

		it('has social links before prose content', () => {
			const socialIndex = layoutContent.indexOf('socialLinks.map')
			const proseIndex = layoutContent.indexOf('variant="prose"')
			expect(socialIndex).toBeLessThan(proseIndex)
		})
	})

	describe('accessibility', () => {
		it('has alt text for avatar image', () => {
			expect(layoutContent).toContain('alt={')
		})

		it('has aria-label for social links', () => {
			expect(layoutContent).toContain('aria-label={')
		})

		it('has aria-hidden on svg icons', () => {
			expect(layoutContent).toContain('aria-hidden="true"')
		})

		it('uses semantic heading hierarchy', () => {
			expect(layoutContent).toContain('tag="h1"')
			expect(layoutContent).toContain('tag="h3"')
		})
	})
})
