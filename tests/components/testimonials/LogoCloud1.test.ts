import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for LogoCloud1.astro component
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required patterns.
 */

const logoCloud1ComponentPath = join(
	process.cwd(),
	'src/components/testimonials/LogoCloud1.astro',
)
const logoCloud1Content = readFileSync(logoCloud1ComponentPath, 'utf-8')

describe('LogoCloud1.astro', () => {
	describe('component structure', () => {
		it('exists at the expected path', () => {
			expect(logoCloud1Content).toBeTruthy()
		})

		it('is a section element', () => {
			expect(logoCloud1Content).toContain('<section')
		})

		it('uses Wrapper component for layout', () => {
			expect(logoCloud1Content).toContain('import Wrapper')
			expect(logoCloud1Content).toContain('<Wrapper')
		})

		it('has py-12 padding', () => {
			expect(logoCloud1Content).toContain('py-12')
		})
	})

	describe('foundation components', () => {
		it('imports Text component', () => {
			expect(logoCloud1Content).toContain(
				"import Text from '@/components/fundations/elements/Text.astro'",
			)
		})

		it('imports Wrapper component', () => {
			expect(logoCloud1Content).toContain(
				"import Wrapper from '@/components/fundations/containers/Wrapper.astro'",
			)
		})

		it('uses Text component for title', () => {
			expect(logoCloud1Content).toContain('<Text')
			expect(logoCloud1Content).toContain('tag="h2"')
		})
	})

	describe('grid layout', () => {
		it('has grid class', () => {
			expect(logoCloud1Content).toContain("'grid")
		})

		it('has mobile grid columns', () => {
			expect(logoCloud1Content).toContain('grid-cols-2')
			expect(logoCloud1Content).toContain('grid-cols-3')
			expect(logoCloud1Content).toContain('grid-cols-4')
		})

		it('has desktop grid columns', () => {
			expect(logoCloud1Content).toContain('md:grid-cols-2')
			expect(logoCloud1Content).toContain('md:grid-cols-3')
			expect(logoCloud1Content).toContain('md:grid-cols-4')
			expect(logoCloud1Content).toContain('md:grid-cols-5')
			expect(logoCloud1Content).toContain('md:grid-cols-6')
		})

		it('has gap-4 spacing', () => {
			expect(logoCloud1Content).toContain('gap-4')
		})

		it('has items-center alignment', () => {
			expect(logoCloud1Content).toContain('items-center')
		})
	})

	describe('AOS animations', () => {
		it('has data-aos attribute', () => {
			expect(logoCloud1Content).toContain('data-aos')
		})

		it('has data-aos-duration attribute', () => {
			expect(logoCloud1Content).toContain('data-aos-duration')
		})

		it('has animation prop', () => {
			expect(logoCloud1Content).toContain('animation')
		})

		it('has animationDuration prop', () => {
			expect(logoCloud1Content).toContain('animationDuration')
		})

		it('has default animation value', () => {
			expect(logoCloud1Content).toContain("animation = 'fade-up'")
		})

		it('has default animationDuration value', () => {
			expect(logoCloud1Content).toContain("animationDuration = '1500'")
		})

		it('applies staggered animation to logos', () => {
			expect(logoCloud1Content).toContain('index * 100')
		})
	})

	describe('NextNode color tokens', () => {
		it('uses slate-* color tokens', () => {
			expect(logoCloud1Content).toContain('slate-')
		})

		it('uses text-slate-900 for title', () => {
			expect(logoCloud1Content).toContain('text-slate-900')
		})

		it('uses slate-500 for highlighted text', () => {
			expect(logoCloud1Content).toContain('text-slate-500')
		})
	})

	describe('TypeScript interface', () => {
		it('exports LogoItem interface', () => {
			expect(logoCloud1Content).toContain('export interface LogoItem')
		})

		it('has Props interface', () => {
			expect(logoCloud1Content).toContain('interface Props')
		})

		it('has logos prop', () => {
			expect(logoCloud1Content).toContain('logos: LogoItem[]')
		})

		it('extends HTMLAttributes for section', () => {
			expect(logoCloud1Content).toContain("HTMLAttributes<'section'>")
		})
	})

	describe('LogoItem interface', () => {
		it('has id property', () => {
			expect(logoCloud1Content).toMatch(/LogoItem[\s\S]*id: string/)
		})

		it('has src property for image source', () => {
			expect(logoCloud1Content).toMatch(
				/LogoItem[\s\S]*src: ImageMetadata \| string/,
			)
		})

		it('has alt property', () => {
			expect(logoCloud1Content).toMatch(/LogoItem[\s\S]*alt: string/)
		})

		it('has optional href property', () => {
			expect(logoCloud1Content).toMatch(/LogoItem[\s\S]*href\?: string/)
		})
	})

	describe('Props interface', () => {
		it('has optional title prop', () => {
			expect(logoCloud1Content).toContain('title?:')
		})

		it('has optional highlightedText prop', () => {
			expect(logoCloud1Content).toContain('highlightedText?:')
		})

		it('has logos prop', () => {
			expect(logoCloud1Content).toContain('logos:')
		})

		it('has optional mobileColumns prop', () => {
			expect(logoCloud1Content).toContain('mobileColumns?:')
		})

		it('has optional desktopColumns prop', () => {
			expect(logoCloud1Content).toContain('desktopColumns?:')
		})
	})

	describe('typography', () => {
		it('uses textSM variant for title', () => {
			expect(logoCloud1Content).toContain('variant="textSM"')
		})

		it('has mb-4 margin on title', () => {
			expect(logoCloud1Content).toContain('mb-4')
		})
	})

	describe('logo rendering', () => {
		it('maps over logos array', () => {
			expect(logoCloud1Content).toContain('logos.map')
		})

		it('renders logo alt text', () => {
			expect(logoCloud1Content).toContain('alt={logo.alt}')
		})

		it('renders logo src', () => {
			expect(logoCloud1Content).toContain('src={logo.src}')
		})
	})

	describe('image handling', () => {
		it('imports Image from astro:assets', () => {
			expect(logoCloud1Content).toContain(
				"import { Image } from 'astro:assets'",
			)
		})

		it('supports ImageMetadata type for images', () => {
			expect(logoCloud1Content).toContain('ImageMetadata')
		})

		it('supports string URLs for images', () => {
			expect(logoCloud1Content).toContain("typeof logo.src === 'string'")
		})

		it('renders img tag for string URLs', () => {
			expect(logoCloud1Content).toContain('<img')
		})

		it('renders Image component for ImageMetadata', () => {
			expect(logoCloud1Content).toContain('<Image')
		})

		it('has max-w-32 class for image sizing', () => {
			expect(logoCloud1Content).toContain('max-w-32')
		})

		it('has opacity-50 class for default opacity', () => {
			expect(logoCloud1Content).toContain('opacity-50')
		})

		it('has hover opacity transition', () => {
			expect(logoCloud1Content).toContain('transition-opacity')
			expect(logoCloud1Content).toContain('hover:opacity-75')
		})

		it('sets image dimensions', () => {
			expect(logoCloud1Content).toContain('width={200}')
			expect(logoCloud1Content).toContain('height={50}')
		})
	})

	describe('link support', () => {
		it('conditionally renders link for logos with href', () => {
			expect(logoCloud1Content).toContain('logo.href ?')
		})

		it('uses anchor tag for linked logos', () => {
			expect(logoCloud1Content).toContain('<a')
			expect(logoCloud1Content).toContain('href={logo.href}')
		})

		it('opens links in new tab', () => {
			expect(logoCloud1Content).toContain('target="_blank"')
		})

		it('has security attributes for external links', () => {
			expect(logoCloud1Content).toContain('rel="noopener noreferrer"')
		})
	})

	describe('conditional rendering', () => {
		it('conditionally renders title', () => {
			expect(logoCloud1Content).toContain('title && (')
		})

		it('conditionally renders highlightedText', () => {
			expect(logoCloud1Content).toContain('highlightedText && (')
		})
	})

	describe('wrapper configuration', () => {
		it('uses standard variant', () => {
			expect(logoCloud1Content).toContain('variant="standard"')
		})
	})

	describe('grid configuration', () => {
		it('has mobileGridClasses mapping', () => {
			expect(logoCloud1Content).toContain('mobileGridClasses')
		})

		it('has desktopGridClasses mapping', () => {
			expect(logoCloud1Content).toContain('desktopGridClasses')
		})

		it('has default mobileColumns value', () => {
			expect(logoCloud1Content).toContain('mobileColumns = 2')
		})

		it('has default desktopColumns value', () => {
			expect(logoCloud1Content).toContain('desktopColumns = 4')
		})

		it('constructs gridClass from both mappings', () => {
			expect(logoCloud1Content).toContain(
				'mobileGridClasses[mobileColumns]',
			)
			expect(logoCloud1Content).toContain(
				'desktopGridClasses[desktopColumns]',
			)
		})
	})
})
