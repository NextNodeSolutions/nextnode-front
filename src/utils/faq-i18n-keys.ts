import type {
	FAQCategoryId,
	FAQDifficulty,
} from '@/components/features/workflow/content/faq/types'

/**
 * Type-safe i18n key builders for FAQ
 * Prevents typos and makes refactoring easier
 */

// Base paths
const FAQ_BASE = 'howWeWork' as const
const FAQ_CATEGORIES_BASE = `${FAQ_BASE}.faqCategories` as const
const FAQ_DIFFICULTY_BASE = `${FAQ_BASE}.faqDifficulty` as const

/**
 * Build type-safe category i18n key
 */
export function getFaqCategoryKey(
	category: FAQCategoryId,
): `${typeof FAQ_CATEGORIES_BASE}.${FAQCategoryId}` {
	return `${FAQ_CATEGORIES_BASE}.${category}` as const
}

/**
 * Build type-safe difficulty i18n key
 */
export function getFaqDifficultyKey(
	difficulty: FAQDifficulty,
): `${typeof FAQ_DIFFICULTY_BASE}.${FAQDifficulty}` {
	return `${FAQ_DIFFICULTY_BASE}.${difficulty}` as const
}

// Pre-built common keys for performance (avoid string concatenation)
export const FAQ_I18N_KEYS = {
	categories: {
		all: getFaqCategoryKey('all'),
		gettingStarted: getFaqCategoryKey('gettingStarted'),
		business: getFaqCategoryKey('business'),
		design: getFaqCategoryKey('design'),
		performance: getFaqCategoryKey('performance'),
		security: getFaqCategoryKey('security'),
		integrations: getFaqCategoryKey('integrations'),
		marketing: getFaqCategoryKey('marketing'),
	},
	difficulties: {
		beginner: getFaqDifficultyKey('beginner'),
		intermediate: getFaqDifficultyKey('intermediate'),
		advanced: getFaqDifficultyKey('advanced'),
	},
} as const
