import { translateFAQCategory } from '@/lib/i18n/translate-utils'
import { t } from '@/lib/i18n'
import { sortQuestionsByDifficulty } from '@/utils/faq-helpers'

import type { FAQQuestion, FAQCategory } from './types'

// Configuration centralisée des catégories FAQ
export const FAQ_CATEGORIES_CONFIG = {
	gettingStarted: {
		icon: '🚀',
		difficulty: 'beginner' as const,
	},
	business: { icon: '💼', difficulty: 'advanced' as const },
	design: { icon: '🎨', difficulty: 'intermediate' as const },
	performance: {
		icon: '⚡',
		difficulty: 'advanced' as const,
	},
	security: { icon: '🔒', difficulty: 'intermediate' as const },
	integrations: {
		icon: '🔗',
		difficulty: 'advanced' as const,
	},
	marketing: {
		icon: '📈',
		difficulty: 'intermediate' as const,
	},
} as const

export type FAQCategoryId = 'all' | keyof typeof FAQ_CATEGORIES_CONFIG

export function getFAQQuestions(): FAQQuestion[] {
	const allQuestions: FAQQuestion[] = []

	// Itération générique sur la configuration au lieu de duplication
	Object.entries(FAQ_CATEGORIES_CONFIG).forEach(([categoryKey, config]) => {
		const categoryQuestions = translateFAQCategory(categoryKey)

		categoryQuestions.forEach((questionData, questionIndex) => {
			allQuestions.push({
				id: `faq-${categoryKey}-${questionIndex}`,
				question: questionData.question,
				answer: questionData.answer,
				icon: config.icon,
				category: categoryKey as keyof typeof FAQ_CATEGORIES_CONFIG,
				difficulty: config.difficulty,
				tags: [categoryKey, 'development'],
			})
		})
	})

	// Trier par difficulté : beginner -> intermediate -> advanced
	return sortQuestionsByDifficulty(allQuestions)
}

export function getFAQCategories(): FAQCategory[] {
	return [
		{
			id: 'all',
			name: t('howWeWork.faqCategories.all'),
			icon: '📋',
		},
		{
			id: 'gettingStarted',
			name: t('howWeWork.faqCategories.gettingStarted'),
			icon: '🚀',
		},
		{
			id: 'business',
			name: t('howWeWork.faqCategories.business'),
			icon: '💼',
		},
		{
			id: 'design',
			name: t('howWeWork.faqCategories.design'),
			icon: '🎨',
		},
		{
			id: 'performance',
			name: t('howWeWork.faqCategories.performance'),
			icon: '⚡',
		},
		{
			id: 'security',
			name: t('howWeWork.faqCategories.security'),
			icon: '🔒',
		},
		{
			id: 'integrations',
			name: t('howWeWork.faqCategories.integrations'),
			icon: '🔗',
		},
		{
			id: 'marketing',
			name: t('howWeWork.faqCategories.marketing'),
			icon: '📈',
		},
	]
}
