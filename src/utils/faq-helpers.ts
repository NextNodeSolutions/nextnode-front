import type { FAQDifficulty } from '@/components/features/workflow/content/faq/types'

// Configuration constante pour éviter les recreations d'objets
const DIFFICULTY_CONFIGS = {
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
} as const

// Ordre de difficulté pour le tri (plus simple qu'un Object)
const DIFFICULTY_ORDER: readonly FAQDifficulty[] = [
	'beginner',
	'intermediate',
	'advanced',
] as const

/**
 * Get difficulty configuration with translated label
 * Optimized: config object is constant, only label is computed
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

/**
 * Get difficulty sort order (0 = first, higher = later)
 * Optimized: uses array indexOf instead of object lookup
 */
export function getDifficultySortOrder(difficulty: FAQDifficulty): number {
	return DIFFICULTY_ORDER.indexOf(difficulty)
}

/**
 * Sort questions by difficulty order
 * Optimized: single comparison using indexOf
 */
export function sortQuestionsByDifficulty<
	T extends { difficulty: FAQDifficulty },
>(questions: T[]): T[] {
	return questions.sort(
		(a, b) =>
			getDifficultySortOrder(a.difficulty) -
			getDifficultySortOrder(b.difficulty),
	)
}

/**
 * Get pretty tag name for a category key
 * Optimized: simple switch instead of ternary
 */
export function getCategoryTag(categoryKey: string): string {
	switch (categoryKey) {
		case 'gettingStarted':
			return 'démarrage'
		default:
			return categoryKey
	}
}
