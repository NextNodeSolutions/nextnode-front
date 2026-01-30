import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Tests for JobsLayout.astro layout
 *
 * Since Astro components are compiled to HTML at build time,
 * we test the source file to ensure it contains the required patterns.
 */

const layoutPath = join(process.cwd(), 'src/layouts/JobsLayout.astro')
const layoutContent = readFileSync(layoutPath, 'utf-8')

describe('JobsLayout.astro', () => {
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

		it('has title prop', () => {
			expect(layoutContent).toContain('title: string')
		})

		it('has details prop', () => {
			expect(layoutContent).toContain('details: JobDetails')
		})

		it('has optional description prop', () => {
			expect(layoutContent).toContain('description?: string')
		})
	})

	describe('JobType type', () => {
		it('exports JobType type', () => {
			expect(layoutContent).toContain('export type JobType')
		})

		it('includes full-time type', () => {
			expect(layoutContent).toContain("'full-time'")
		})

		it('includes part-time type', () => {
			expect(layoutContent).toContain("'part-time'")
		})

		it('includes contract type', () => {
			expect(layoutContent).toContain("'contract'")
		})

		it('includes internship type', () => {
			expect(layoutContent).toContain("'internship'")
		})
	})

	describe('JobDetails interface', () => {
		it('exports JobDetails interface', () => {
			expect(layoutContent).toContain('export interface JobDetails')
		})

		it('has department property', () => {
			expect(layoutContent).toContain('department: string')
		})

		it('has location property', () => {
			expect(layoutContent).toContain('location: string')
		})

		it('has type property', () => {
			expect(layoutContent).toContain('type: JobType')
		})

		it('has index signature for additional properties', () => {
			expect(layoutContent).toContain('[key: string]: string | undefined')
		})
	})

	describe('logger integration', () => {
		it('imports logger from @nextnode/logger', () => {
			expect(layoutContent).toContain(
				"import { logger } from '@nextnode/logger'",
			)
		})

		it('logs jobs page load event', () => {
			expect(layoutContent).toContain("logger.info('Jobs page loaded'")
		})

		it('uses details object for log data', () => {
			expect(layoutContent).toContain('details: {')
		})

		it('logs title in details', () => {
			expect(layoutContent).toContain('title,')
		})

		it('logs department in details', () => {
			const detailsMatch = layoutContent.match(/details:\s*\{[^}]+\}/s)
			expect(detailsMatch).toBeTruthy()
			expect(detailsMatch?.[0]).toContain(
				'department: details.department',
			)
		})

		it('logs pathname in details', () => {
			expect(layoutContent).toContain('pathname: Astro.url.pathname')
		})
	})

	describe('job title display', () => {
		it('displays job title', () => {
			expect(layoutContent).toContain('{title}')
		})

		it('uses displayXL variant for job title heading', () => {
			expect(layoutContent).toContain('variant="displayXL"')
		})

		it('uses h1 tag for job title heading', () => {
			expect(layoutContent).toContain('tag="h1"')
		})
	})

	describe('job details section', () => {
		it('displays Department label', () => {
			expect(layoutContent).toContain('Department')
		})

		it('displays department value', () => {
			expect(layoutContent).toContain('{details.department}')
		})

		it('displays Location label', () => {
			expect(layoutContent).toContain('Location')
		})

		it('displays location value', () => {
			expect(layoutContent).toContain('{details.location}')
		})

		it('displays Type label', () => {
			// Type text is inside Text component with whitespace
			const typeMatch = layoutContent.match(
				/<Text[^>]*>\s*Type\s*<\/Text>/m,
			)
			expect(typeMatch).toBeTruthy()
		})

		it('displays type value with label mapping', () => {
			expect(layoutContent).toContain('jobTypeLabels[details.type]')
		})

		it('has job type labels mapping', () => {
			expect(layoutContent).toContain('jobTypeLabels')
			expect(layoutContent).toContain("'full-time': 'Full-time'")
			expect(layoutContent).toContain("'part-time': 'Part-time'")
			expect(layoutContent).toContain("contract: 'Contract'")
			expect(layoutContent).toContain("internship: 'Internship'")
		})
	})

	describe('job details styling', () => {
		it('uses vertical line before decoration', () => {
			expect(layoutContent).toContain('before:w-px')
		})

		it('uses vertical line after decoration', () => {
			expect(layoutContent).toContain('after:w-px')
		})

		it('has white background for line decorations', () => {
			expect(layoutContent).toContain('before:bg-white')
		})

		it('uses h3 tag for detail labels', () => {
			expect(layoutContent).toContain('tag="h3"')
		})

		it('uses textBase variant for detail labels', () => {
			expect(layoutContent).toContain('variant="textBase"')
		})

		it('uses textSM variant for detail values', () => {
			expect(layoutContent).toContain('variant="textSM"')
		})
	})

	describe('apply CTA section', () => {
		it('has Apply heading', () => {
			expect(layoutContent).toContain('>Apply</Text>')
		})

		it('has form element', () => {
			expect(layoutContent).toContain('<form')
			expect(layoutContent).toContain('</form>')
		})

		it('has name input field', () => {
			expect(layoutContent).toContain('id="name"')
			expect(layoutContent).toContain('name="name"')
		})

		it('has email input field', () => {
			expect(layoutContent).toContain('id="email"')
			expect(layoutContent).toContain('name="email"')
			expect(layoutContent).toContain('type="email"')
		})

		it('has comments textarea', () => {
			expect(layoutContent).toContain('id="comments"')
			expect(layoutContent).toContain('<textarea')
		})

		it('has file upload section', () => {
			expect(layoutContent).toContain('id="file-upload"')
			expect(layoutContent).toContain('type="file"')
		})

		it('has portfolio input field', () => {
			expect(layoutContent).toContain('id="portfolio"')
			expect(layoutContent).toContain('name="portfolio"')
		})

		it('has linkedin input field', () => {
			expect(layoutContent).toContain('id="linkedin"')
			expect(layoutContent).toContain('name="linkedin"')
		})

		it('has country input field', () => {
			expect(layoutContent).toContain('id="country"')
			expect(layoutContent).toContain('name="country"')
		})

		it('has submit button', () => {
			expect(layoutContent).toContain('type="submit"')
			// Submit text is inside Button component
			const buttonMatch = layoutContent.match(
				/<Button[^>]*type="submit"[^>]*>[\s\S]*?<\/Button>/m,
			)
			expect(buttonMatch).toBeTruthy()
			expect(buttonMatch?.[0]).toContain('Submit')
		})
	})

	describe('form accessibility', () => {
		it('has labels for all inputs', () => {
			expect(layoutContent).toContain('for="name"')
			expect(layoutContent).toContain('for="email"')
			expect(layoutContent).toContain('for="comments"')
			expect(layoutContent).toContain('for="portfolio"')
			expect(layoutContent).toContain('for="linkedin"')
			expect(layoutContent).toContain('for="country"')
		})

		it('has aria-describedby for comments', () => {
			expect(layoutContent).toContain('aria-describedby="comments-desc"')
		})

		it('uses sr-only class for hidden file input', () => {
			expect(layoutContent).toContain('class="sr-only"')
		})

		it('has cover photo label', () => {
			expect(layoutContent).toContain('for="cover-photo"')
		})

		it('shows required field indicators', () => {
			expect(layoutContent).toContain("after:content-['*']")
		})
	})

	describe('form styling', () => {
		it('uses peer class for input styling', () => {
			expect(layoutContent).toContain('class="peer')
		})

		it('uses focus state styling', () => {
			expect(layoutContent).toContain('focus:border-white')
			expect(layoutContent).toContain('focus:bg-base-950')
		})

		it('uses base-900 background for inputs', () => {
			expect(layoutContent).toContain('bg-base-900')
		})

		it('has border-l-white for input border', () => {
			expect(layoutContent).toContain('border-l-white')
		})

		it('uses placeholder styling', () => {
			expect(layoutContent).toContain('placeholder-base-500')
		})

		it('uses dashed border for file upload area', () => {
			expect(layoutContent).toContain('border-dashed')
		})
	})

	describe('fundation components', () => {
		it('imports Text component', () => {
			expect(layoutContent).toContain(
				"import Text from '@/components/fundations/elements/Text.astro'",
			)
		})

		it('imports Button component', () => {
			expect(layoutContent).toContain(
				"import Button from '@/components/fundations/elements/Button.astro'",
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

		it('uses Button component', () => {
			expect(layoutContent).toContain('<Button')
		})

		it('uses Wrapper component', () => {
			expect(layoutContent).toContain('<Wrapper')
		})

		it('uses prose wrapper for content', () => {
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

		it('has slot for content', () => {
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

		it('has md:col-span-2 for header section', () => {
			expect(layoutContent).toContain('md:col-span-2')
		})

		it('has md:col-span-full for content section', () => {
			expect(layoutContent).toContain('md:col-span-full')
		})

		it('uses md:grid-cols-2 for two-column layout', () => {
			expect(layoutContent).toContain('md:grid-cols-2')
		})

		it('uses md:grid-cols-3 for details section', () => {
			expect(layoutContent).toContain('md:grid-cols-3')
		})
	})

	describe('default values', () => {
		it('has default page title with Careers suffix', () => {
			expect(layoutContent).toContain('Careers')
			expect(layoutContent).toContain('${title}')
		})

		it('has default page description based on job details', () => {
			expect(layoutContent).toContain('description ??')
			expect(layoutContent).toContain('Join our team')
		})
	})

	describe('styling', () => {
		it('uses white text for job title heading', () => {
			expect(layoutContent).toContain('text-white')
		})

		it('uses text-balance for heading', () => {
			expect(layoutContent).toContain('text-balance')
		})

		it('uses font-display for heading', () => {
			expect(layoutContent).toContain('font-display')
		})

		it('uses base-400 text for detail values', () => {
			expect(layoutContent).toContain('text-base-400')
		})

		it('uses nextnode-400 for file upload hover state', () => {
			expect(layoutContent).toContain('hover:text-nextnode-400')
		})
	})

	describe('component order', () => {
		it('has job title before details section', () => {
			const titleIndex = layoutContent.indexOf('variant="displayXL"')
			// Department is inside Text component, search for the whole pattern
			const detailsIndex = layoutContent.indexOf('Department')
			expect(titleIndex).toBeLessThan(detailsIndex)
		})

		it('has details section before prose content', () => {
			const detailsIndex = layoutContent.indexOf('>Department<')
			const proseIndex = layoutContent.indexOf('variant="prose"')
			expect(detailsIndex).toBeLessThan(proseIndex)
		})

		it('has prose content before apply form', () => {
			const proseIndex = layoutContent.indexOf('variant="prose"')
			const applyIndex = layoutContent.indexOf('>Apply<')
			expect(proseIndex).toBeLessThan(applyIndex)
		})
	})

	describe('Button component usage', () => {
		it('uses base size for submit button', () => {
			expect(layoutContent).toContain('size="base"')
		})

		it('uses default variant for submit button', () => {
			expect(layoutContent).toContain('variant="default"')
		})

		it('button is aligned to right with ml-auto', () => {
			expect(layoutContent).toContain('ml-auto')
		})
	})

	describe('file upload area', () => {
		it('has upload icon SVG', () => {
			expect(layoutContent).toContain('<svg')
			expect(layoutContent).toContain('viewBox="0 0 24 24"')
		})

		it('has Upload a file text', () => {
			expect(layoutContent).toContain('Upload a file')
		})

		it('has drag and drop text', () => {
			expect(layoutContent).toContain('or drag and drop')
		})

		it('has file size limit text', () => {
			expect(layoutContent).toContain('PNG, JPG, GIF up to 10MB')
		})

		it('uses aria-hidden for decorative icon', () => {
			expect(layoutContent).toContain('aria-hidden="true"')
		})
	})
})
