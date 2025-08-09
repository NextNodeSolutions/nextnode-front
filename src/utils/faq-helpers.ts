import { getDifficultySortOrder } from '@/components/features/workflow/content/faq/config'

import type { FAQDifficulty } from '@/components/features/workflow/content/faq/types'

/**
 * Sort questions by difficulty order
 * Uses the difficulty sort order configuration
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
