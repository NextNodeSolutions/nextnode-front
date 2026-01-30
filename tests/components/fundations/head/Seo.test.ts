import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for Seo.astro component
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required
 * patterns and follows proper TypeScript interfaces.
 */

const seoComponentPath = join(
	process.cwd(),
	'src/components/fundations/head/Seo.astro',
)
const seoContent = readFileSync(seoComponentPath, 'utf-8')

describe('Seo.astro', () => {
	describe('@astrolib/seo integration', () => {
		it('imports AstroSeo from @astrolib/seo', () => {
			expect(seoContent).toContain(
				"import { AstroSeo } from '@astrolib/seo'",
			)
		})

		it('uses AstroSeo component', () => {
			expect(seoContent).toContain('<AstroSeo')
		})
	})

	describe('TypeScript interfaces', () => {
		it('exports Props interface', () => {
			expect(seoContent).toContain('export interface Props')
		})

		it('exports OpenGraphProps interface', () => {
			expect(seoContent).toContain('export interface OpenGraphProps')
		})

		it('exports TwitterProps interface', () => {
			expect(seoContent).toContain('export interface TwitterProps')
		})

		it('exports OpenGraphImage interface', () => {
			expect(seoContent).toContain('export interface OpenGraphImage')
		})

		it('exports OpenGraphArticle interface', () => {
			expect(seoContent).toContain('export interface OpenGraphArticle')
		})

		it('exports OpenGraphProfile interface', () => {
			expect(seoContent).toContain('export interface OpenGraphProfile')
		})

		it('exports LanguageAlternate interface', () => {
			expect(seoContent).toContain('export interface LanguageAlternate')
		})
	})

	describe('Props interface properties', () => {
		it('has title prop', () => {
			expect(seoContent).toMatch(
				/interface Props[\s\S]*?title\??: string/,
			)
		})

		it('has titleTemplate prop', () => {
			expect(seoContent).toMatch(
				/interface Props[\s\S]*?titleTemplate\??: string/,
			)
		})

		it('has description prop', () => {
			expect(seoContent).toMatch(
				/interface Props[\s\S]*?description\??: string/,
			)
		})

		it('has canonical prop', () => {
			expect(seoContent).toMatch(
				/interface Props[\s\S]*?canonical\??: string/,
			)
		})

		it('has noindex prop', () => {
			expect(seoContent).toMatch(
				/interface Props[\s\S]*?noindex\??: boolean/,
			)
		})

		it('has nofollow prop', () => {
			expect(seoContent).toMatch(
				/interface Props[\s\S]*?nofollow\??: boolean/,
			)
		})

		it('has openGraph prop', () => {
			expect(seoContent).toMatch(
				/interface Props[\s\S]*?openGraph\??: OpenGraphProps/,
			)
		})

		it('has twitter prop', () => {
			expect(seoContent).toMatch(
				/interface Props[\s\S]*?twitter\??: TwitterProps/,
			)
		})

		it('has languageAlternates prop', () => {
			expect(seoContent).toMatch(
				/interface Props[\s\S]*?languageAlternates\??: ReadonlyArray<LanguageAlternate>/,
			)
		})
	})

	describe('OpenGraphProps interface', () => {
		it('has url prop', () => {
			expect(seoContent).toMatch(
				/interface OpenGraphProps[\s\S]*?url\??: string/,
			)
		})

		it('has type prop', () => {
			expect(seoContent).toMatch(
				/interface OpenGraphProps[\s\S]*?type\??: string/,
			)
		})

		it('has title prop', () => {
			expect(seoContent).toMatch(
				/interface OpenGraphProps[\s\S]*?title\??: string/,
			)
		})

		it('has description prop', () => {
			expect(seoContent).toMatch(
				/interface OpenGraphProps[\s\S]*?description\??: string/,
			)
		})

		it('has images prop', () => {
			expect(seoContent).toMatch(
				/interface OpenGraphProps[\s\S]*?images\??: ReadonlyArray<OpenGraphImage>/,
			)
		})

		it('has locale prop', () => {
			expect(seoContent).toMatch(
				/interface OpenGraphProps[\s\S]*?locale\??: string/,
			)
		})

		it('has site_name prop', () => {
			expect(seoContent).toMatch(
				/interface OpenGraphProps[\s\S]*?site_name\??: string/,
			)
		})
	})

	describe('TwitterProps interface', () => {
		it('has handle prop', () => {
			expect(seoContent).toMatch(
				/interface TwitterProps[\s\S]*?handle\??: string/,
			)
		})

		it('has site prop', () => {
			expect(seoContent).toMatch(
				/interface TwitterProps[\s\S]*?site\??: string/,
			)
		})

		it('has cardType prop', () => {
			expect(seoContent).toMatch(
				/interface TwitterProps[\s\S]*?cardType\??:/,
			)
		})

		it('supports summary card type', () => {
			expect(seoContent).toContain("'summary'")
		})

		it('supports summary_large_image card type', () => {
			expect(seoContent).toContain("'summary_large_image'")
		})

		it('supports app card type', () => {
			expect(seoContent).toContain("'app'")
		})

		it('supports player card type', () => {
			expect(seoContent).toContain("'player'")
		})
	})

	describe('OpenGraphImage interface', () => {
		it('has url prop', () => {
			expect(seoContent).toMatch(
				/interface OpenGraphImage[\s\S]*?url: string/,
			)
		})

		it('has width prop', () => {
			expect(seoContent).toMatch(
				/interface OpenGraphImage[\s\S]*?width\??: number/,
			)
		})

		it('has height prop', () => {
			expect(seoContent).toMatch(
				/interface OpenGraphImage[\s\S]*?height\??: number/,
			)
		})

		it('has alt prop', () => {
			expect(seoContent).toMatch(
				/interface OpenGraphImage[\s\S]*?alt\??: string/,
			)
		})
	})

	describe('AstroSeo props passthrough', () => {
		it('passes title to AstroSeo', () => {
			expect(seoContent).toContain('title={title}')
		})

		it('passes titleTemplate to AstroSeo', () => {
			expect(seoContent).toContain('titleTemplate={titleTemplate}')
		})

		it('passes description to AstroSeo', () => {
			expect(seoContent).toContain('description={description}')
		})

		it('passes canonical to AstroSeo', () => {
			expect(seoContent).toContain('canonical={canonical}')
		})

		it('passes noindex to AstroSeo', () => {
			expect(seoContent).toContain('noindex={noindex}')
		})

		it('passes nofollow to AstroSeo', () => {
			expect(seoContent).toContain('nofollow={nofollow}')
		})

		it('passes openGraph to AstroSeo', () => {
			expect(seoContent).toContain('openGraph={openGraph}')
		})

		it('passes twitter to AstroSeo', () => {
			expect(seoContent).toContain('twitter={twitter}')
		})

		it('passes languageAlternates to AstroSeo', () => {
			expect(seoContent).toContain(
				'languageAlternates={languageAlternates}',
			)
		})
	})

	describe('default values', () => {
		it('defaults noindex to false', () => {
			expect(seoContent).toContain('noindex = false')
		})

		it('defaults nofollow to false', () => {
			expect(seoContent).toContain('nofollow = false')
		})
	})

	describe('documentation', () => {
		it('has JSDoc documentation', () => {
			expect(seoContent).toContain('* Seo.astro')
		})

		it('has usage example in documentation', () => {
			expect(seoContent).toContain('Usage:')
			expect(seoContent).toContain('<Seo')
		})

		it('documents title prop', () => {
			expect(seoContent).toContain('Page title')
		})

		it('documents description prop', () => {
			expect(seoContent).toContain('Page meta description')
		})

		it('documents canonical prop', () => {
			expect(seoContent).toContain('Canonical URL')
		})
	})
})
