/**
 * Content Collection Configuration
 *
 * Defines Zod schemas for all content collections used in the project.
 * These schemas validate MDX frontmatter and ensure type safety.
 */

import { defineCollection, z } from 'astro:content'

/**
 * Help Center Collection
 * For help articles organized by category
 */
const helpcenter = defineCollection({
	type: 'content',
	schema: z.object({
		/** Article title */
		title: z.string(),
		/** Article description for meta and preview */
		description: z.string(),
		/** Category this article belongs to */
		category: z.string(),
		/** Publication date */
		pubDate: z.coerce.date(),
		/** Last updated date (optional) */
		lastUpdated: z.coerce.date().optional(),
	}),
})

/**
 * Team Collection
 * For team member profile pages
 */
const team = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			/** Team member name */
			name: z.string(),
			/** Job title/role */
			role: z.string(),
			/** Short bio/introduction */
			bio: z.string(),
			/** Profile image */
			image: z
				.object({
					url: image(),
					alt: z.string(),
				})
				.optional(),
			/** Social media links */
			socialLinks: z
				.array(
					z.object({
						/** Platform name (twitter, linkedin, github, website) */
						platform: z.string(),
						/** URL to social profile */
						url: z.string().url(),
						/** Optional accessibility label */
						label: z.string().optional(),
					}),
				)
				.optional(),
			/** Education history (optional) */
			education: z.array(z.string()).optional(),
			/** Experience/work history (optional) */
			experience: z.array(z.string()).optional(),
		}),
})

/**
 * Jobs Collection
 * For job posting pages
 */
const jobs = defineCollection({
	type: 'content',
	schema: z.object({
		/** Job title */
		title: z.string(),
		/** Department (e.g., "Engineering", "Design") */
		department: z.string(),
		/** Location (e.g., "Remote", "New York, NY") */
		location: z.string(),
		/** Employment type */
		type: z.enum(['full-time', 'part-time', 'contract', 'internship']),
		/** Job description for meta */
		description: z.string(),
		/** Publication date (optional) */
		pubDate: z.coerce.date().optional(),
	}),
})

/**
 * Customers Collection
 * For customer case study pages
 */
const customers = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			/** Customer/company name */
			name: z.string(),
			/** Customer logo */
			logo: z
				.object({
					url: image(),
					alt: z.string(),
				})
				.optional(),
			/** Industry the customer operates in */
			industry: z.string(),
			/** Customer testimonial/quote */
			quote: z.string().optional(),
			/** Quote attribution (person name and title) */
			quoteAttribution: z.string().optional(),
			/** About the customer */
			about: z.string().optional(),
			/** Case study details */
			caseStudy: z
				.object({
					/** Challenges and solutions */
					challengesAndSolutions: z
						.array(
							z.object({
								title: z.string(),
								content: z.string(),
							}),
						)
						.optional(),
					/** Results achieved */
					results: z.array(z.string()).optional(),
				})
				.optional(),
			/** Additional customer details */
			details: z.record(z.string()).optional(),
		}),
})

/**
 * Changelog Collection
 * For release notes and version updates
 */
const changelog = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			/** Version number (e.g., "1.2.0") */
			version: z.string(),
			/** Release date */
			date: z.coerce.date(),
			/** Type of release */
			type: z.enum(['major', 'minor', 'patch', 'feature', 'fix']),
			/** Description for meta */
			description: z.string(),
			/** Optional featured image */
			image: z
				.object({
					url: image(),
					alt: z.string(),
				})
				.optional(),
		}),
})

/**
 * Legal Collection
 * For legal pages (privacy policy, terms of service, etc.)
 */
const legal = defineCollection({
	type: 'content',
	schema: z.object({
		/** Page title (e.g., "Privacy Policy") */
		title: z.string(),
		/** Date when the document was last updated */
		lastUpdated: z.coerce.date(),
		/** Content summary for meta (optional) */
		content: z.string().optional(),
	}),
})

export const collections = {
	helpcenter,
	team,
	jobs,
	customers,
	changelog,
	legal,
}
