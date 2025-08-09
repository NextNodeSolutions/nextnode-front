import { t } from '@/lib/i18n/i18n-server'
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

interface I18nQuestionData {
	question: string
	answer: string
}

/**
 * Helper type-safe pour accéder aux données i18n d'une catégorie FAQ
 * Throw une erreur explicite si les données n'existent pas (pas de fallback)
 */
function getFAQCategoryData(categoryKey: string): I18nQuestionData[] {
	try {
		// Accès aux données i18n avec un seul cast propre
		const categoryData = (t as unknown as (key: string) => unknown)(
			`howWeWork.faq.questions.${categoryKey}`,
		)

		if (!Array.isArray(categoryData)) {
			throw new Error(
				`FAQ category '${categoryKey}' is not an array in i18n data`,
			)
		}

		return categoryData as I18nQuestionData[]
	} catch (error) {
		throw new Error(
			`Failed to load FAQ data for category '${categoryKey}': ${error instanceof Error ? error.message : String(error)}`,
		)
	}
}

export function getFAQQuestions(): FAQQuestion[] {
	const allQuestions: FAQQuestion[] = []

	// Itération générique sur la configuration au lieu de duplication
	Object.entries(FAQ_CATEGORIES_CONFIG).forEach(([categoryKey, config]) => {
		const categoryQuestions = getFAQCategoryData(categoryKey)

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
