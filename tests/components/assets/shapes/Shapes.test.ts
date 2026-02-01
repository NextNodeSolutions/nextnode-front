import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for SVG Shape components (Shape1-6)
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source files to ensure they contain the required patterns.
 */

const shapesDir = join(process.cwd(), 'src/components/assets/shapes')

const shapeNumbers = [1, 2, 3, 4, 5, 6] as const

describe('Shape Components', () => {
	describe.each(shapeNumbers)('Shape%i.astro', num => {
		const shapePath = join(shapesDir, `Shape${num}.astro`)
		const shapeExists = existsSync(shapePath)
		const shapeContent = shapeExists ? readFileSync(shapePath, 'utf-8') : ''

		it('file exists', () => {
			expect(shapeExists).toBe(true)
		})

		describe('SVG structure', () => {
			it('contains an SVG element', () => {
				expect(shapeContent).toContain('<svg')
				expect(shapeContent).toContain('</svg>')
			})

			it('has viewBox attribute', () => {
				expect(shapeContent).toContain('viewBox="0 0 400 400"')
			})

			it('has xmlns attribute', () => {
				expect(shapeContent).toContain(
					'xmlns="http://www.w3.org/2000/svg"',
				)
			})
		})

		describe('TypeScript interface', () => {
			it('exports Props interface', () => {
				expect(shapeContent).toContain('export interface Props')
			})

			it('extends HTMLAttributes', () => {
				expect(shapeContent).toContain("HTMLAttributes<'div'>")
			})

			it('has class prop', () => {
				expect(shapeContent).toMatch(/class\??: string/)
			})
		})

		describe('animation styles', () => {
			it('contains CSS animations', () => {
				expect(shapeContent).toContain('@keyframes')
			})

			it('has transform-origin for rotation', () => {
				expect(shapeContent).toContain('transform-origin:')
			})

			it('has animation property', () => {
				expect(shapeContent).toContain('animation:')
			})
		})

		describe('theming', () => {
			it('uses CSS custom properties for colors', () => {
				expect(shapeContent).toContain('--stroke-color')
			})

			it('references base color tokens', () => {
				expect(shapeContent).toContain('--color-base-')
			})
		})

		describe('class handling', () => {
			it('uses class:list for class composition', () => {
				expect(shapeContent).toContain('class:list=')
			})

			it('accepts custom className', () => {
				expect(shapeContent).toContain('class: className')
			})

			it('uses rest props for additional attributes', () => {
				expect(shapeContent).toContain('...rest')
				expect(shapeContent).toContain('{...rest}')
			})
		})
	})
})

describe('BottomBlurLine.astro', () => {
	const componentPath = join(
		process.cwd(),
		'src/components/assets/BottomBlurLine.astro',
	)
	const exists = existsSync(componentPath)
	const content = exists ? readFileSync(componentPath, 'utf-8') : ''

	it('file exists', () => {
		expect(exists).toBe(true)
	})

	describe('structure', () => {
		it('exports Props interface', () => {
			expect(content).toContain('export interface Props')
		})

		it('uses fixed positioning', () => {
			expect(content).toContain('fixed')
		})

		it('positions at bottom', () => {
			expect(content).toContain('bottom-0')
		})

		it('uses backdrop-filter for blur', () => {
			expect(content).toContain('backdrop-filter:blur')
		})

		it('has multiple blur layers', () => {
			const blurMatches = content.match(/blur\(\d+px\)/g)
			expect(blurMatches?.length).toBeGreaterThanOrEqual(3)
		})
	})

	describe('class handling', () => {
		it('uses class:list for class composition', () => {
			expect(content).toContain('class:list=')
		})

		it('accepts custom className', () => {
			expect(content).toContain('class: className')
		})
	})
})

describe('GuidelinesGrid.astro', () => {
	const componentPath = join(
		process.cwd(),
		'src/components/assets/GuidelinesGrid.astro',
	)
	const exists = existsSync(componentPath)
	const content = exists ? readFileSync(componentPath, 'utf-8') : ''

	it('file exists', () => {
		expect(exists).toBe(true)
	})

	describe('structure', () => {
		it('exports Props interface', () => {
			expect(content).toContain('export interface Props')
		})

		it('uses fixed positioning', () => {
			expect(content).toContain('fixed')
		})

		it('uses grid layout', () => {
			expect(content).toContain('grid')
		})

		it('is non-interactive', () => {
			expect(content).toContain('pointer-events-none')
		})

		it('supports columns prop', () => {
			expect(content).toContain('columns')
		})
	})

	describe('class handling', () => {
		it('uses class:list for class composition', () => {
			expect(content).toContain('class:list=')
		})

		it('accepts custom className', () => {
			expect(content).toContain('class: className')
		})
	})
})

describe('DecorativeCode.astro', () => {
	const componentPath = join(
		process.cwd(),
		'src/components/assets/DecorativeCode.astro',
	)
	const exists = existsSync(componentPath)
	const content = exists ? readFileSync(componentPath, 'utf-8') : ''

	it('file exists', () => {
		expect(exists).toBe(true)
	})

	describe('structure', () => {
		it('exports Props interface', () => {
			expect(content).toContain('export interface Props')
		})

		it('imports Code component from Astro', () => {
			expect(content).toContain("import { Code } from 'astro:components'")
		})

		it('uses Code component', () => {
			expect(content).toContain('<Code')
		})

		it('supports code prop', () => {
			expect(content).toContain('code')
		})

		it('supports lang prop', () => {
			expect(content).toContain('lang')
		})

		it('uses css-variables theme', () => {
			expect(content).toContain('theme="css-variables"')
		})
	})

	describe('animations', () => {
		it('uses AOS data attributes', () => {
			expect(content).toContain('data-aos=')
		})
	})

	describe('class handling', () => {
		it('uses class:list for class composition', () => {
			expect(content).toContain('class:list=')
		})

		it('accepts custom className', () => {
			expect(content).toContain('class: className')
		})
	})
})

describe('Shine.astro', () => {
	const componentPath = join(
		process.cwd(),
		'src/components/assets/Shine.astro',
	)
	const exists = existsSync(componentPath)
	const content = exists ? readFileSync(componentPath, 'utf-8') : ''

	it('file exists', () => {
		expect(exists).toBe(true)
	})

	describe('structure', () => {
		it('exports Props interface', () => {
			expect(content).toContain('export interface Props')
		})

		it('uses iframe for shader effect', () => {
			expect(content).toContain('<iframe')
		})

		it('uses absolute positioning', () => {
			expect(content).toContain('absolute')
		})

		it('supports opacity prop', () => {
			expect(content).toContain('opacity')
		})

		it('uses data URI for iframe content', () => {
			expect(content).toContain('data:text/html;base64')
		})

		it('has lazy loading for performance', () => {
			expect(content).toContain('loading="lazy"')
		})

		it('has accessible title', () => {
			expect(content).toContain('title=')
		})
	})

	describe('class handling', () => {
		it('uses class:list for class composition', () => {
			expect(content).toContain('class:list=')
		})

		it('accepts custom className', () => {
			expect(content).toContain('class: className')
		})
	})
})

describe('shapes/index.ts', () => {
	const indexPath = join(shapesDir, 'index.ts')
	const exists = existsSync(indexPath)
	const content = exists ? readFileSync(indexPath, 'utf-8') : ''

	it('file exists', () => {
		expect(exists).toBe(true)
	})

	it('exports ShapeVariant type', () => {
		expect(content).toContain('export type ShapeVariant')
	})

	it('exports shapeDescriptions', () => {
		expect(content).toContain('export const shapeDescriptions')
	})

	it('documents all 6 shapes', () => {
		for (const num of shapeNumbers) {
			expect(content).toContain(`${num}:`)
		}
	})
})
