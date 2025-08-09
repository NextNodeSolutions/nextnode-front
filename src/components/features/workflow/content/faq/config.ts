import type { FAQDifficulty } from './types'

/**
 * Ordre de difficulté pour le tri des questions FAQ
 * Du plus simple au plus complexe
 */
export const DIFFICULTY_ORDER: readonly FAQDifficulty[] = [
	'beginner',
	'intermediate',
	'advanced',
] as const

/**
 * Get difficulty sort order (0 = first, higher = later)
 * Used for sorting questions by difficulty level
 */
export function getDifficultySortOrder(difficulty: FAQDifficulty): number {
	return DIFFICULTY_ORDER.indexOf(difficulty)
}
