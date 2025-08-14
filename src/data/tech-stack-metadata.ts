/**
 * Tech stack metadata that extends i18n data
 * This file contains only the additional data (icons, levels, colors)
 * that supplements the core content from i18n files
 */

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

export type TechColor = keyof typeof TECH_COLOR_CLASSES

/**
 * Technology metadata (icons and skill levels)
 * Indexed by category.technology index
 */
export const TECH_METADATA = {
	frontend: {
		icon: '⚡',
		color: 'blue' as TechColor,
		technologies: [
			{ icon: '⚛️', level: 95 }, // React & Next.js
			{ icon: '🚀', level: 90 }, // Astro
			{ icon: '📘', level: 98 }, // TypeScript
			{ icon: '🎨', level: 92 }, // Tailwind CSS
		],
	},
	backend: {
		icon: '🔧',
		color: 'purple' as TechColor,
		technologies: [
			{ icon: '🟢', level: 96 }, // Node.js
			{ icon: '🗄️', level: 88 }, // PostgreSQL & MongoDB
			{ icon: '🔗', level: 94 }, // GraphQL & REST APIs
			{ icon: '⚡', level: 85 }, // Redis
		],
	},
	deployment: {
		icon: '☁️',
		color: 'green' as TechColor,
		technologies: [
			{ icon: '☁️', level: 91 }, // AWS & Vercel
			{ icon: '🐳', level: 87 }, // Docker
			{ icon: '⚙️', level: 93 }, // GitHub Actions
			{ icon: '📊', level: 89 }, // Monitoring Tools
		],
	},
} as const

/**
 * Helper function to get color classes for a category
 */
export function getTechColorClasses(
	color: TechColor,
): (typeof TECH_COLOR_CLASSES)[TechColor] {
	return TECH_COLOR_CLASSES[color]
}

/**
 * Helper function to get metadata for a category
 */
export function getCategoryMetadata(
	categoryId: string,
): (typeof TECH_METADATA)[keyof typeof TECH_METADATA] | undefined {
	return TECH_METADATA[categoryId as keyof typeof TECH_METADATA]
}

/**
 * Helper function to get technology metadata
 */
export function getTechnologyMetadata(
	categoryId: string,
	techIndex: number,
): { icon: string; level: number } | undefined {
	const category = TECH_METADATA[categoryId as keyof typeof TECH_METADATA]
	return category?.technologies[techIndex]
}
