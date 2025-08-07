import { t } from '@/lib/i18n/i18n-server'

import type { FAQQuestion, FAQCategory } from './types'

export function getFAQQuestions(): FAQQuestion[] {
	return [
		{
			id: 'performance',
			question: t('howWeWork.faq.questions.0.question'),
			answer: t('howWeWork.faq.questions.0.answer'),
			icon: '⚡',
			category: 'performance',
		},
		{
			id: 'scalability',
			question: t('howWeWork.faq.questions.1.question'),
			answer: t('howWeWork.faq.questions.1.answer'),
			icon: '📈',
			category: 'architecture',
		},
		{
			id: 'security',
			question: t('howWeWork.faq.questions.2.question'),
			answer: t('howWeWork.faq.questions.2.answer'),
			icon: '🔒',
			category: 'security',
		},
		{
			id: 'integration',
			question: t('howWeWork.faq.questions.3.question'),
			answer: t('howWeWork.faq.questions.3.answer'),
			icon: '🔗',
			category: 'integration',
		},
		{
			id: 'quality',
			question: t('howWeWork.faq.questions.4.question'),
			answer: t('howWeWork.faq.questions.4.answer'),
			icon: '✅',
			category: 'quality',
		},
		{
			id: 'seo',
			question: t('howWeWork.faq.questions.5.question'),
			answer: t('howWeWork.faq.questions.5.answer'),
			icon: '🎯',
			category: 'seo',
		},
	]
}

export function getFAQCategories(): FAQCategory[] {
	return [
		{ id: 'all', name: t('howWeWork.faqCategories.all'), icon: '📋' },
		{
			id: 'performance',
			name: t('howWeWork.faqCategories.performance'),
			icon: '⚡',
		},
		{
			id: 'architecture',
			name: t('howWeWork.faqCategories.architecture'),
			icon: '📈',
		},
		{
			id: 'security',
			name: t('howWeWork.faqCategories.security'),
			icon: '🔒',
		},
		{
			id: 'integration',
			name: t('howWeWork.faqCategories.integration'),
			icon: '🔗',
		},
		{
			id: 'quality',
			name: t('howWeWork.faqCategories.quality'),
			icon: '✅',
		},
		{ id: 'seo', name: t('howWeWork.faqCategories.seo'), icon: '🎯' },
	]
}
