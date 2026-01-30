import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for Favicons.astro component
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required favicon links.
 */

const faviconsComponentPath = join(
	process.cwd(),
	'src/components/fundations/head/Favicons.astro',
)
const faviconsContent = readFileSync(faviconsComponentPath, 'utf-8')

describe('Favicons.astro', () => {
	describe('standard favicon links', () => {
		it('includes favicon.ico with any size', () => {
			expect(faviconsContent).toContain('rel="icon"')
			expect(faviconsContent).toContain('href="/favicon.ico"')
			expect(faviconsContent).toContain('sizes="any"')
		})

		it('includes SVG favicon for modern browsers', () => {
			expect(faviconsContent).toContain('href="/icon.svg"')
			expect(faviconsContent).toContain('type="image/svg+xml"')
		})

		it('includes web app manifest link', () => {
			expect(faviconsContent).toContain('rel="manifest"')
			expect(faviconsContent).toContain('href="/manifest.webmanifest"')
		})
	})

	describe('apple touch icon', () => {
		it('includes apple-touch-icon link', () => {
			expect(faviconsContent).toContain('rel="apple-touch-icon"')
			expect(faviconsContent).toContain('href="/apple-touch-icon.png"')
		})

		it('includes apple-touch-icon with 180x180 size', () => {
			expect(faviconsContent).toMatch(
				/rel="apple-touch-icon"[\s\S]*?sizes="180x180"/,
			)
		})
	})

	describe('legacy IE support', () => {
		it('includes shortcut icon for IE', () => {
			expect(faviconsContent).toContain('rel="shortcut icon"')
			expect(faviconsContent).toContain('type="image/x-icon"')
		})
	})

	describe('multiple favicon sizes', () => {
		it('includes 16x16 PNG favicon', () => {
			expect(faviconsContent).toContain('sizes="16x16"')
			expect(faviconsContent).toContain('href="/favicon-16x16.png"')
		})

		it('includes 32x32 PNG favicon', () => {
			expect(faviconsContent).toContain('sizes="32x32"')
			expect(faviconsContent).toContain('href="/favicon-32x32.png"')
		})

		it('includes 48x48 PNG favicon', () => {
			expect(faviconsContent).toContain('sizes="48x48"')
			expect(faviconsContent).toContain('href="/favicon-48x48.png"')
		})

		it('uses PNG format for sized favicons', () => {
			expect(faviconsContent).toMatch(
				/sizes="16x16"[\s\S]*?type="image\/png"/,
			)
			expect(faviconsContent).toMatch(
				/type="image\/png"[\s\S]*?sizes="32x32"/,
			)
		})
	})
})
