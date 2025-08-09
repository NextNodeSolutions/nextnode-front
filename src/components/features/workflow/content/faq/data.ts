import { t } from '@/lib/i18n/i18n-server'

import type {
	FAQQuestion,
	FAQCategory,
	FAQCategoryId,
	FAQDifficulty,
} from './types'

// Configuration centralisée des catégories FAQ
const FAQ_CATEGORIES_CONFIG = {
	gettingStarted: {
		category: 'gettingStarted',
		icon: '🚀',
		difficulty: 'beginner',
	},
	business: { category: 'business', icon: '💼', difficulty: 'advanced' },
	design: { category: 'design', icon: '🎨', difficulty: 'intermediate' },
	performance: {
		category: 'performance',
		icon: '⚡',
		difficulty: 'advanced',
	},
	security: { category: 'security', icon: '🔒', difficulty: 'intermediate' },
	integrations: {
		category: 'integrations',
		icon: '🔗',
		difficulty: 'advanced',
	},
	marketing: {
		category: 'marketing',
		icon: '📈',
		difficulty: 'intermediate',
	},
} as const satisfies Record<
	string,
	{
		category: FAQCategoryId
		icon: string
		difficulty: FAQDifficulty
	}
>

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
				category: config.category,
				difficulty: config.difficulty,
				tags: [
					categoryKey === 'gettingStarted'
						? 'démarrage'
						: categoryKey,
					'development',
				],
			})
		})
	})

	// Trier par difficulté : beginner -> intermediate -> advanced
	const difficultyOrder: Record<FAQDifficulty, number> = {
		beginner: 0,
		intermediate: 1,
		advanced: 2,
	}

	allQuestions.sort(
		(a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty],
	)

	return allQuestions
}

export function getFAQCategories(): FAQCategory[] {
	return [
		{
			id: 'all',
			name: t('howWeWork.faqCategories.all'),
			icon: '📋',
			description: 'All questions',
		},
		{
			id: 'gettingStarted',
			name: t('howWeWork.faqCategories.gettingStarted'),
			icon: '🚀',
			description: 'Essential questions for starting your project',
		},
		{
			id: 'business',
			name: t('howWeWork.faqCategories.business'),
			icon: '💼',
			description: 'Costs, timelines, and business processes',
		},
		{
			id: 'design',
			name: t('howWeWork.faqCategories.design'),
			icon: '🎨',
			description: 'User experience and visual design',
		},
		{
			id: 'performance',
			name: t('howWeWork.faqCategories.performance'),
			icon: '⚡',
			description: 'Speed and technical optimization',
		},
		{
			id: 'security',
			name: t('howWeWork.faqCategories.security'),
			icon: '🔒',
			description: 'Data protection and compliance',
		},
		{
			id: 'integrations',
			name: t('howWeWork.faqCategories.integrations'),
			icon: '🔗',
			description: 'Third-party systems and migrations',
		},
		{
			id: 'marketing',
			name: t('howWeWork.faqCategories.marketing'),
			icon: '📈',
			description: 'SEO, analytics, and conversion tracking',
		},
	]
}
