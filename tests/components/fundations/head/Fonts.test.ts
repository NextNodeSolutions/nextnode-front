import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for Fonts.astro component
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required @font-face declarations.
 */

const fontsComponentPath = join(
	process.cwd(),
	'src/components/fundations/head/Fonts.astro',
)
const fontsContent = readFileSync(fontsComponentPath, 'utf-8')

describe('Fonts.astro', () => {
	describe('Geist font', () => {
		it('includes @font-face declaration for Geist', () => {
			expect(fontsContent).toContain("font-family: 'Geist'")
		})

		it('uses self-hosted font path', () => {
			expect(fontsContent).toContain('/fonts/geist/GeistVF.woff2')
		})

		it('uses font-display: swap', () => {
			expect(fontsContent).toMatch(
				/font-family:\s*'Geist'[\s\S]*?font-display:\s*swap/,
			)
		})

		it('supports variable font weight range', () => {
			expect(fontsContent).toMatch(
				/font-family:\s*'Geist'[\s\S]*?font-weight:\s*100\s*900/,
			)
		})
	})

	describe('Geist Mono font', () => {
		it('includes @font-face declaration for Geist Mono', () => {
			expect(fontsContent).toContain("font-family: 'Geist Mono'")
		})

		it('uses self-hosted font path', () => {
			expect(fontsContent).toContain(
				'/fonts/geist-mono/GeistMonoVF.woff2',
			)
		})

		it('uses font-display: swap', () => {
			expect(fontsContent).toMatch(
				/font-family:\s*'Geist Mono'[\s\S]*?font-display:\s*swap/,
			)
		})
	})

	describe('EB Garamond font', () => {
		it('includes @font-face declaration for EB Garamond', () => {
			expect(fontsContent).toContain("font-family: 'EB Garamond'")
		})

		it('uses self-hosted font path for regular variant', () => {
			expect(fontsContent).toContain(
				'/fonts/eb-garamond/EBGaramondVF.woff2',
			)
		})

		it('uses self-hosted font path for italic variant', () => {
			expect(fontsContent).toContain(
				'/fonts/eb-garamond/EBGaramondVF-Italic.woff2',
			)
		})

		it('uses font-display: swap', () => {
			expect(fontsContent).toMatch(
				/font-family:\s*'EB Garamond'[\s\S]*?font-display:\s*swap/,
			)
		})

		it('includes italic variant', () => {
			expect(fontsContent).toMatch(
				/font-family:\s*'EB Garamond'[\s\S]*?font-style:\s*italic/,
			)
		})
	})

	describe('no external CDN URLs', () => {
		it('does not contain Google Fonts URLs', () => {
			expect(fontsContent).not.toContain('fonts.googleapis.com')
			expect(fontsContent).not.toContain('fonts.gstatic.com')
		})

		it('does not contain CDN URLs', () => {
			expect(fontsContent).not.toContain('unpkg.com')
			expect(fontsContent).not.toContain('jsdelivr.net')
			expect(fontsContent).not.toContain('cdnjs.cloudflare.com')
		})
	})

	describe('woff2 format', () => {
		it('uses woff2 format for all fonts', () => {
			const fontFaceMatches = fontsContent.match(
				/@font-face\s*\{[^}]+\}/g,
			)
			expect(fontFaceMatches).not.toBeNull()

			for (const fontFace of fontFaceMatches!) {
				expect(fontFace).toContain("format('woff2')")
			}
		})
	})
})
