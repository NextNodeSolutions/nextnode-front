import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for Fonts.astro component
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required @font-face declarations.
 *
 * NextNode font stack:
 * - Plus Jakarta Sans: Display/headers (variable, 200-800)
 * - DM Sans: Body text (variable, 100-1000)
 * - JetBrains Mono: Monospace (variable, 100-800)
 */

const fontsComponentPath = join(
	process.cwd(),
	'src/components/fundations/head/Fonts.astro',
)
const fontsContent = readFileSync(fontsComponentPath, 'utf-8')

describe('Fonts.astro', () => {
	describe('Plus Jakarta Sans font', () => {
		it('includes @font-face declaration for Plus Jakarta Sans', () => {
			expect(fontsContent).toContain("font-family: 'Plus Jakarta Sans'")
		})

		it('uses self-hosted font path for regular variant', () => {
			expect(fontsContent).toContain(
				'/fonts/plus-jakarta-sans/PlusJakartaSansVF.woff2',
			)
		})

		it('uses self-hosted font path for italic variant', () => {
			expect(fontsContent).toContain(
				'/fonts/plus-jakarta-sans/PlusJakartaSansVF-Italic.woff2',
			)
		})

		it('uses font-display: swap', () => {
			expect(fontsContent).toMatch(
				/font-family:\s*'Plus Jakarta Sans'[\s\S]*?font-display:\s*swap/,
			)
		})

		it('supports variable font weight range 200-800', () => {
			expect(fontsContent).toMatch(
				/font-family:\s*'Plus Jakarta Sans'[\s\S]*?font-weight:\s*200\s*800/,
			)
		})

		it('includes italic variant', () => {
			expect(fontsContent).toMatch(
				/font-family:\s*'Plus Jakarta Sans'[\s\S]*?font-style:\s*italic/,
			)
		})
	})

	describe('DM Sans font', () => {
		it('includes @font-face declaration for DM Sans', () => {
			expect(fontsContent).toContain("font-family: 'DM Sans'")
		})

		it('uses self-hosted font path for regular variant', () => {
			expect(fontsContent).toContain('/fonts/dm-sans/DMSansVF.woff2')
		})

		it('uses self-hosted font path for italic variant', () => {
			expect(fontsContent).toContain(
				'/fonts/dm-sans/DMSansVF-Italic.woff2',
			)
		})

		it('uses font-display: swap', () => {
			expect(fontsContent).toMatch(
				/font-family:\s*'DM Sans'[\s\S]*?font-display:\s*swap/,
			)
		})

		it('supports variable font weight range 100-1000', () => {
			expect(fontsContent).toMatch(
				/font-family:\s*'DM Sans'[\s\S]*?font-weight:\s*100\s*1000/,
			)
		})

		it('includes italic variant', () => {
			expect(fontsContent).toMatch(
				/font-family:\s*'DM Sans'[\s\S]*?font-style:\s*italic/,
			)
		})
	})

	describe('JetBrains Mono font', () => {
		it('includes @font-face declaration for JetBrains Mono', () => {
			expect(fontsContent).toContain("font-family: 'JetBrains Mono'")
		})

		it('uses self-hosted font path', () => {
			expect(fontsContent).toContain(
				'/fonts/jetbrains-mono/JetBrainsMonoVF.woff2',
			)
		})

		it('uses font-display: swap', () => {
			expect(fontsContent).toMatch(
				/font-family:\s*'JetBrains Mono'[\s\S]*?font-display:\s*swap/,
			)
		})

		it('supports variable font weight range 100-800', () => {
			expect(fontsContent).toMatch(
				/font-family:\s*'JetBrains Mono'[\s\S]*?font-weight:\s*100\s*800/,
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

	describe('no old buio fonts', () => {
		it('does not contain Geist font', () => {
			expect(fontsContent).not.toContain("font-family: 'Geist'")
		})

		it('does not contain Geist Mono font', () => {
			expect(fontsContent).not.toContain("font-family: 'Geist Mono'")
		})

		it('does not contain EB Garamond font', () => {
			expect(fontsContent).not.toContain("font-family: 'EB Garamond'")
		})
	})
})
