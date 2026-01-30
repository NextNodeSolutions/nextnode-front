import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for SplashLayout.astro layout
 *
 * SplashLayout is a minimal layout without Navigation or Footer.
 * Used for standalone pages like coming soon, maintenance, or landing pages.
 */

const layoutPath = join(process.cwd(), 'src/layouts/SplashLayout.astro')
const layoutContent = readFileSync(layoutPath, 'utf-8')

describe('SplashLayout.astro', () => {
	describe('does NOT include Navigation', () => {
		it('does not import Navigation component', () => {
			expect(layoutContent).not.toContain('import Navigation')
		})

		it('does not use Navigation element', () => {
			expect(layoutContent).not.toContain('<Navigation')
		})
	})

	describe('does NOT include Footer', () => {
		it('does not import Footer component', () => {
			expect(layoutContent).not.toContain('import Footer')
		})

		it('does not use Footer element', () => {
			expect(layoutContent).not.toContain('<Footer')
		})
	})

	describe('includes BaseHead for proper head setup', () => {
		it('imports BaseHead component', () => {
			expect(layoutContent).toContain(
				"import BaseHead from '@/components/fundations/head/BaseHead.astro'",
			)
		})

		it('uses BaseHead in head section', () => {
			expect(layoutContent).toContain('<BaseHead />')
		})

		it('has head element', () => {
			expect(layoutContent).toContain('<head>')
			expect(layoutContent).toContain('</head>')
		})

		it('includes title tag', () => {
			expect(layoutContent).toContain('<title>')
			expect(layoutContent).toContain('</title>')
		})

		it('includes meta description', () => {
			expect(layoutContent).toContain('<meta name="description"')
			expect(layoutContent).toContain('content={description}')
		})
	})

	describe('minimal, centered layout', () => {
		it('has body with flex display', () => {
			expect(layoutContent).toMatch(/<body[^>]*class="[^"]*flex[^"]*"/)
		})

		it('has body with items-center for horizontal centering', () => {
			expect(layoutContent).toMatch(
				/<body[^>]*class="[^"]*items-center[^"]*"/,
			)
		})

		it('has body with justify-center for vertical centering', () => {
			expect(layoutContent).toMatch(
				/<body[^>]*class="[^"]*justify-center[^"]*"/,
			)
		})

		it('has body with min-h-svh for full viewport height', () => {
			expect(layoutContent).toMatch(
				/<body[^>]*class="[^"]*min-h-svh[^"]*"/,
			)
		})

		it('has body with flex-col for column layout', () => {
			expect(layoutContent).toMatch(
				/<body[^>]*class="[^"]*flex-col[^"]*"/,
			)
		})

		it('has main element for content', () => {
			expect(layoutContent).toContain('<main')
			expect(layoutContent).toContain('</main>')
		})

		it('has slot for content', () => {
			expect(layoutContent).toContain('<slot />')
		})

		it('main has full width', () => {
			expect(layoutContent).toMatch(/<main[^>]*class="[^"]*w-full[^"]*"/)
		})
	})

	describe('logger integration', () => {
		it('imports logger from @nextnode/logger', () => {
			expect(layoutContent).toContain(
				"import { logger } from '@nextnode/logger'",
			)
		})

		it('logs splash page load event', () => {
			expect(layoutContent).toContain("logger.info('Splash page loaded'")
		})

		it('uses details object for log data', () => {
			expect(layoutContent).toContain('details: {')
		})

		it('logs title in details', () => {
			const detailsMatch = layoutContent.match(/details:\s*\{[^}]+\}/s)
			expect(detailsMatch).toBeTruthy()
			expect(detailsMatch?.[0]).toContain('title,')
		})

		it('logs pathname in details', () => {
			expect(layoutContent).toContain('pathname: Astro.url.pathname')
		})
	})

	describe('TypeScript Props interface', () => {
		it('exports Props interface', () => {
			expect(layoutContent).toContain('export interface Props')
		})

		it('has optional title prop', () => {
			expect(layoutContent).toContain('title?: string')
		})

		it('has optional description prop', () => {
			expect(layoutContent).toContain('description?: string')
		})

		it('has optional lang prop', () => {
			expect(layoutContent).toContain('lang?: string')
		})
	})

	describe('default values', () => {
		it('has default title of NextNode', () => {
			expect(layoutContent).toContain("title = 'NextNode'")
		})

		it('has default description', () => {
			expect(layoutContent).toContain('description =')
		})

		it('has default lang of en', () => {
			expect(layoutContent).toContain("lang = 'en'")
		})
	})

	describe('HTML structure', () => {
		it('has html element with lang attribute', () => {
			expect(layoutContent).toContain('<html')
			expect(layoutContent).toContain('lang={lang}')
			expect(layoutContent).toContain('</html>')
		})

		it('has body element', () => {
			expect(layoutContent).toContain('<body')
			expect(layoutContent).toContain('</body>')
		})

		it('imports global.css', () => {
			expect(layoutContent).toContain("import '../styles/global.css'")
		})
	})

	describe('styling', () => {
		it('uses bg-base-950 for dark background', () => {
			expect(layoutContent).toMatch(
				/<body[^>]*class="[^"]*bg-base-950[^"]*"/,
			)
		})

		it('uses nextnode-500 for selection background', () => {
			expect(layoutContent).toMatch(
				/<html[^>]*class="[^"]*selection:bg-nextnode-500[^"]*"/,
			)
		})

		it('uses scroll-smooth', () => {
			expect(layoutContent).toMatch(
				/<html[^>]*class="[^"]*scroll-smooth[^"]*"/,
			)
		})

		it('uses white selection text', () => {
			expect(layoutContent).toMatch(
				/<html[^>]*class="[^"]*selection:text-white[^"]*"/,
			)
		})

		it('main has z-10 for stacking', () => {
			expect(layoutContent).toMatch(/<main[^>]*class="[^"]*z-10[^"]*"/)
		})

		it('main has relative positioning', () => {
			expect(layoutContent).toMatch(
				/<main[^>]*class="[^"]*relative[^"]*"/,
			)
		})
	})

	describe('component documentation', () => {
		it('has JSDoc comment describing the component', () => {
			expect(layoutContent).toContain('/**')
			expect(layoutContent).toContain('*/')
		})

		it('mentions it is for pages without navigation', () => {
			expect(layoutContent).toMatch(
				/without.*Navigation|without.*Footer/i,
			)
		})

		it('mentions use cases like coming soon', () => {
			expect(layoutContent).toMatch(/coming soon|maintenance|landing/i)
		})
	})

	describe('compared to BaseLayout', () => {
		it('does not import AosHead', () => {
			expect(layoutContent).not.toContain('import AosHead')
		})

		it('does not import AosBody', () => {
			expect(layoutContent).not.toContain('import AosBody')
		})

		it('does not use BaseLayout wrapper', () => {
			expect(layoutContent).not.toContain('import BaseLayout from')
			expect(layoutContent).not.toContain('<BaseLayout')
		})
	})

	describe('props destructuring', () => {
		it('destructures props from Astro.props', () => {
			expect(layoutContent).toContain('Astro.props')
		})

		it('destructures title', () => {
			expect(layoutContent).toMatch(/const\s*\{[^}]*title[^}]*\}\s*=/)
		})

		it('destructures description', () => {
			expect(layoutContent).toMatch(
				/const\s*\{[^}]*description[^}]*\}\s*=/,
			)
		})

		it('destructures lang', () => {
			expect(layoutContent).toMatch(/const\s*\{[^}]*lang[^}]*\}\s*=/)
		})
	})
})
