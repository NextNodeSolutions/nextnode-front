/**
 * Technology stack data configuration
 * Extracted from tech-stack-grid.astro for better maintainability and reusability
 */

import type { TranslationKey } from '@/lib/i18n/types'

/**
 * Technology item definition
 */
export interface Technology {
	name: string
	descriptionKey: TranslationKey // i18n key for description
	icon: string
	level: number // Skill/usage level (0-100)
}

/**
 * Technology category definition
 */
export interface TechCategory {
	id: string
	titleKey: TranslationKey // i18n key for title
	descriptionKey: TranslationKey // i18n key for description
	icon: string
	color: 'blue' | 'purple' | 'green' | 'orange' | 'red'
	technologies: Technology[]
}

/**
 * Color scheme configuration for tech categories
 */
export const TECH_COLOR_CLASSES = {
	blue: {
		bg: 'from-blue-500 to-blue-600',
		border: 'border-blue-200 dark:border-blue-800',
		bgLight: 'bg-blue-50 dark:bg-blue-900/20',
		text: 'text-blue-600 dark:text-blue-400',
		textDark: 'text-blue-900 dark:text-blue-100',
	},
	purple: {
		bg: 'from-purple-500 to-purple-600',
		border: 'border-purple-200 dark:border-purple-800',
		bgLight: 'bg-purple-50 dark:bg-purple-900/20',
		text: 'text-purple-600 dark:text-purple-400',
		textDark: 'text-purple-900 dark:text-purple-100',
	},
	green: {
		bg: 'from-green-500 to-green-600',
		border: 'border-green-200 dark:border-green-800',
		bgLight: 'bg-green-50 dark:bg-green-900/20',
		text: 'text-green-600 dark:text-green-400',
		textDark: 'text-green-900 dark:text-green-100',
	},
	orange: {
		bg: 'from-orange-500 to-orange-600',
		border: 'border-orange-200 dark:border-orange-800',
		bgLight: 'bg-orange-50 dark:bg-orange-900/20',
		text: 'text-orange-600 dark:text-orange-400',
		textDark: 'text-orange-900 dark:text-orange-100',
	},
	red: {
		bg: 'from-red-500 to-red-600',
		border: 'border-red-200 dark:border-red-800',
		bgLight: 'bg-red-50 dark:bg-red-900/20',
		text: 'text-red-600 dark:text-red-400',
		textDark: 'text-red-900 dark:text-red-100',
	},
} as const

/**
 * Technology categories configuration
 * Uses i18n keys for internationalization support
 */
export const TECH_CATEGORIES: TechCategory[] = [
	{
		id: 'frontend',
		titleKey: 'howWeWork.techStack.categories.frontend.title',
		descriptionKey: 'howWeWork.techStack.categories.frontend.description',
		icon: '⚡',
		color: 'blue',
		technologies: [
			{
				name: 'React & Next.js',
				descriptionKey:
					'howWeWork.techStack.categories.frontend.technologies.0.description',
				icon: '⚛️',
				level: 95,
			},
			{
				name: 'Astro',
				descriptionKey:
					'howWeWork.techStack.categories.frontend.technologies.1.description',
				icon: '🚀',
				level: 90,
			},
			{
				name: 'TypeScript',
				descriptionKey:
					'howWeWork.techStack.categories.frontend.technologies.2.description',
				icon: '📘',
				level: 98,
			},
			{
				name: 'Tailwind CSS',
				descriptionKey:
					'howWeWork.techStack.categories.frontend.technologies.3.description',
				icon: '🎨',
				level: 92,
			},
		],
	},
	{
		id: 'backend',
		titleKey: 'howWeWork.techStack.categories.backend.title',
		descriptionKey: 'howWeWork.techStack.categories.backend.description',
		icon: '🔧',
		color: 'purple',
		technologies: [
			{
				name: 'Node.js',
				descriptionKey:
					'howWeWork.techStack.categories.backend.technologies.0.description',
				icon: '🟢',
				level: 96,
			},
			{
				name: 'PostgreSQL & MongoDB',
				descriptionKey:
					'howWeWork.techStack.categories.backend.technologies.1.description',
				icon: '🗄️',
				level: 88,
			},
			{
				name: 'GraphQL & REST APIs',
				descriptionKey:
					'howWeWork.techStack.categories.backend.technologies.2.description',
				icon: '🔗',
				level: 94,
			},
			{
				name: 'Redis',
				descriptionKey:
					'howWeWork.techStack.categories.backend.technologies.3.description',
				icon: '⚡',
				level: 85,
			},
		],
	},
	{
		id: 'deployment',
		titleKey: 'howWeWork.techStack.categories.deployment.title',
		descriptionKey: 'howWeWork.techStack.categories.deployment.description',
		icon: '☁️',
		color: 'green',
		technologies: [
			{
				name: 'AWS & Vercel',
				descriptionKey:
					'howWeWork.techStack.categories.deployment.technologies.0.description',
				icon: '☁️',
				level: 91,
			},
			{
				name: 'Docker',
				descriptionKey:
					'howWeWork.techStack.categories.deployment.technologies.1.description',
				icon: '🐳',
				level: 87,
			},
			{
				name: 'GitHub Actions',
				descriptionKey:
					'howWeWork.techStack.categories.deployment.technologies.2.description',
				icon: '⚙️',
				level: 93,
			},
			{
				name: 'Monitoring Tools',
				descriptionKey:
					'howWeWork.techStack.categories.deployment.technologies.3.description',
				icon: '📊',
				level: 89,
			},
		],
	},
]

/**
 * Helper function to get color classes for a category
 */
export function getTechColorClasses(
	color: TechCategory['color'],
): (typeof TECH_COLOR_CLASSES)[TechCategory['color']] {
	return TECH_COLOR_CLASSES[color]
}

/**
 * Helper function to find category by id
 */
export function getTechCategory(id: string): TechCategory | undefined {
	return TECH_CATEGORIES.find(cat => cat.id === id)
}

/**
 * Helper function to get all category IDs
 */
export function getTechCategoryIds(): string[] {
	return TECH_CATEGORIES.map(cat => cat.id)
}
