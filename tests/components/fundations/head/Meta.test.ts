import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for Meta.astro component
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required meta tags
 * and follows proper TypeScript patterns.
 */

const metaComponentPath = join(
	process.cwd(),
	'src/components/fundations/head/Meta.astro',
)
const metaContent = readFileSync(metaComponentPath, 'utf-8')

describe('Meta.astro', () => {
	describe('TypeScript interface', () => {
		it('exports Props interface', () => {
			expect(metaContent).toContain('export interface Props')
		})

		it('exports OpenGraphProps interface', () => {
			expect(metaContent).toContain('export interface OpenGraphProps')
		})

		it('exports TwitterProps interface', () => {
			expect(metaContent).toContain('export interface TwitterProps')
		})

		it('exports OpenGraphImage interface', () => {
			expect(metaContent).toContain('export interface OpenGraphImage')
		})

		it('has title prop in Props interface', () => {
			expect(metaContent).toMatch(
				/interface Props[\s\S]*?title\??: string/,
			)
		})

		it('has description prop in Props interface', () => {
			expect(metaContent).toMatch(
				/interface Props[\s\S]*?description\??: string/,
			)
		})

		it('has openGraph prop in Props interface', () => {
			expect(metaContent).toMatch(
				/interface Props[\s\S]*?openGraph\??: OpenGraphProps/,
			)
		})

		it('has twitter prop in Props interface', () => {
			expect(metaContent).toMatch(
				/interface Props[\s\S]*?twitter\??: TwitterProps/,
			)
		})
	})

	describe('basic meta tags', () => {
		it('includes title tag', () => {
			expect(metaContent).toContain('<title>')
		})

		it('includes description meta tag', () => {
			expect(metaContent).toContain('name="description"')
		})

		it('includes keywords meta tag', () => {
			expect(metaContent).toContain('name="keywords"')
		})

		it('includes author meta tag', () => {
			expect(metaContent).toContain('name="author"')
		})

		it('includes theme-color meta tag', () => {
			expect(metaContent).toContain('name="theme-color"')
		})

		it('includes IE compatibility meta tag', () => {
			expect(metaContent).toContain('http-equiv="X-UA-Compatible"')
			expect(metaContent).toContain('content="IE=edge"')
		})

		it('includes robots meta tag', () => {
			expect(metaContent).toContain('name="robots"')
		})

		it('includes googlebot meta tag', () => {
			expect(metaContent).toContain('name="googlebot"')
		})
	})

	describe('Open Graph meta tags', () => {
		it('includes og:type meta tag', () => {
			expect(metaContent).toContain('property="og:type"')
		})

		it('includes og:url meta tag', () => {
			expect(metaContent).toContain('property="og:url"')
		})

		it('includes og:title meta tag', () => {
			expect(metaContent).toContain('property="og:title"')
		})

		it('includes og:description meta tag', () => {
			expect(metaContent).toContain('property="og:description"')
		})

		it('includes og:site_name meta tag', () => {
			expect(metaContent).toContain('property="og:site_name"')
		})

		it('includes og:locale meta tag', () => {
			expect(metaContent).toContain('property="og:locale"')
		})

		it('includes og:image meta tag', () => {
			expect(metaContent).toContain('property="og:image"')
		})

		it('includes og:image:width meta tag', () => {
			expect(metaContent).toContain('property="og:image:width"')
		})

		it('includes og:image:height meta tag', () => {
			expect(metaContent).toContain('property="og:image:height"')
		})

		it('includes og:image:alt meta tag', () => {
			expect(metaContent).toContain('property="og:image:alt"')
		})

		it('includes og:image:type meta tag', () => {
			expect(metaContent).toContain('property="og:image:type"')
		})

		it('supports multiple og types', () => {
			expect(metaContent).toContain("'website'")
			expect(metaContent).toContain("'article'")
		})
	})

	describe('Twitter Card meta tags', () => {
		it('includes twitter:card meta tag', () => {
			expect(metaContent).toContain('name="twitter:card"')
		})

		it('includes twitter:site meta tag', () => {
			expect(metaContent).toContain('name="twitter:site"')
		})

		it('includes twitter:creator meta tag', () => {
			expect(metaContent).toContain('name="twitter:creator"')
		})

		it('includes twitter:title meta tag', () => {
			expect(metaContent).toContain('name="twitter:title"')
		})

		it('includes twitter:description meta tag', () => {
			expect(metaContent).toContain('name="twitter:description"')
		})

		it('includes twitter:image meta tag', () => {
			expect(metaContent).toContain('name="twitter:image"')
		})

		it('includes twitter:image:alt meta tag', () => {
			expect(metaContent).toContain('name="twitter:image:alt"')
		})

		it('supports summary_large_image card type', () => {
			expect(metaContent).toContain("'summary_large_image'")
		})

		it('supports summary card type', () => {
			expect(metaContent).toContain("'summary'")
		})
	})

	describe('default values', () => {
		it('defaults theme-color to white', () => {
			expect(metaContent).toContain("themeColor = '#ffffff'")
		})

		it('defaults robots to index, follow', () => {
			expect(metaContent).toContain("robots = 'index, follow'")
		})

		it('defaults og:type to website', () => {
			expect(metaContent).toContain("type: openGraph?.type ?? 'website'")
		})

		it('defaults og:locale to en_US', () => {
			expect(metaContent).toContain(
				"locale: openGraph?.locale ?? 'en_US'",
			)
		})

		it('defaults twitter:card to summary_large_image', () => {
			expect(metaContent).toContain(
				"card: twitter?.card ?? 'summary_large_image'",
			)
		})
	})

	describe('fallback behavior', () => {
		it('falls back og:title to page title', () => {
			expect(metaContent).toContain('openGraph?.title ?? title')
		})

		it('falls back og:description to page description', () => {
			expect(metaContent).toContain(
				'openGraph?.description ?? description',
			)
		})

		it('falls back twitter:title to og:title', () => {
			expect(metaContent).toContain('twitter?.title ?? og.title')
		})

		it('falls back twitter:description to og:description', () => {
			expect(metaContent).toContain(
				'twitter?.description ?? og.description',
			)
		})

		it('falls back twitter:image to first og:image', () => {
			expect(metaContent).toContain('twitter?.image ?? og.images[0]?.url')
		})
	})

	describe('documentation', () => {
		it('has JSDoc documentation', () => {
			expect(metaContent).toContain('* Meta.astro')
		})

		it('has usage example in documentation', () => {
			expect(metaContent).toContain('Usage:')
			expect(metaContent).toContain('<Meta')
		})
	})
})
