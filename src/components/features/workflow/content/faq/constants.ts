import type { FAQDifficulty } from './types'

/**
 * Configuration d'affichage pour les difficultés FAQ
 * Contient les icônes et classes CSS associées à chaque niveau
 */
export const DIFFICULTY_CONFIGS = {
	beginner: {
		icon: '🟢',
		bgClass:
			'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
	},
	intermediate: {
		icon: '🟡',
		bgClass:
			'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
	},
	advanced: {
		icon: '🔴',
		bgClass: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
	},
} as const satisfies Record<FAQDifficulty, { icon: string; bgClass: string }>

/**
 * Get difficulty display configuration
 * Returns icon and styling classes for a given difficulty level
 */
export function getDifficultyDisplayConfig(difficulty: FAQDifficulty): {
	icon: string
	bgClass: string
} {
	return DIFFICULTY_CONFIGS[difficulty] || DIFFICULTY_CONFIGS.beginner
}

/**
 * Get difficulty configuration with translated label
 * Compatible with the previous getDifficultyConfig interface
 */
export function getDifficultyConfig(
	difficulty: FAQDifficulty,
	getLabel: (difficulty: FAQDifficulty) => string,
): { icon: string; label: string; bgClass: string } {
	const config = DIFFICULTY_CONFIGS[difficulty] || DIFFICULTY_CONFIGS.beginner

	return {
		...config,
		label: getLabel(difficulty),
	}
}
