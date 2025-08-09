import { useState, useCallback, useMemo } from 'react'

import type {
	FAQState,
	FAQQuestion,
	FAQCategoryId,
	FAQSearchResult,
} from './types'

export interface UseFAQStateReturn {
	state: FAQState
	filteredQuestions: FAQQuestion[]
	searchResults: FAQSearchResult[]
	toggleCategory: (categoryId: FAQCategoryId) => void
	setSearchQuery: (query: string) => void
	toggleQuestion: (questionId: string) => void
	clearFilters: () => void
	hasActiveFilters: boolean
}

const initialState: FAQState = {
	selectedCategories: ['all'],
	searchQuery: '',
	expandedQuestion: null,
}

function highlightText(text: string, query: string): string {
	if (!query.trim()) return text

	const regex = new RegExp(
		`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
		'gi',
	)
	return text.replace(
		regex,
		'<mark class="bg-yellow-200 dark:bg-yellow-800/50">$1</mark>',
	)
}

function calculateMatchScore(question: FAQQuestion, query: string): number {
	const lowerQuery = query.toLowerCase()
	const questionText = question.question.toLowerCase()
	const answerText = question.answer.toLowerCase()

	let score = 0

	// Exact match in question title gets highest score
	if (questionText.includes(lowerQuery)) {
		score += 10
	}

	// Partial word matches in question
	const questionWords = questionText.split(' ')
	const queryWords = lowerQuery.split(' ')

	for (const queryWord of queryWords) {
		for (const questionWord of questionWords) {
			if (questionWord.includes(queryWord)) {
				score += 5
			}
		}
	}

	// Answer text matches (lower weight)
	if (answerText.includes(lowerQuery)) {
		score += 3
	}

	// Category match
	if (question.category.toLowerCase().includes(lowerQuery)) {
		score += 2
	}

	// Tags match
	if (question.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))) {
		score += 2
	}

	return score
}

export function useFAQState(questions: FAQQuestion[]): UseFAQStateReturn {
	const [state, setState] = useState<FAQState>(initialState)

	const toggleCategory = useCallback((categoryId: FAQCategoryId) => {
		setState(prev => {
			if (categoryId === 'all') {
				return { ...prev, selectedCategories: ['all'] }
			}

			const currentCategories = prev.selectedCategories.filter(
				cat => cat !== 'all',
			)
			const isSelected = currentCategories.includes(categoryId)

			let newCategories: FAQCategoryId[]
			if (isSelected) {
				newCategories = currentCategories.filter(
					cat => cat !== categoryId,
				)
				if (newCategories.length === 0) {
					newCategories = ['all']
				}
			} else {
				newCategories = [...currentCategories, categoryId]
			}

			return { ...prev, selectedCategories: newCategories }
		})
	}, [])

	const setSearchQuery = useCallback((query: string) => {
		setState(prev => ({ ...prev, searchQuery: query }))
	}, [])

	const toggleQuestion = useCallback((questionId: string) => {
		setState(prev => ({
			...prev,
			expandedQuestion:
				prev.expandedQuestion === questionId ? null : questionId,
		}))
	}, [])

	const clearFilters = useCallback(() => {
		setState(initialState)
	}, [])

	const filteredQuestions = useMemo(() => {
		let filtered = questions

		// Filter by category
		if (!state.selectedCategories.includes('all')) {
			filtered = filtered.filter(question =>
				state.selectedCategories.includes(question.category),
			)
		}

		// Filter by search query
		if (state.searchQuery.trim()) {
			filtered = filtered.filter(
				question =>
					calculateMatchScore(question, state.searchQuery) > 0,
			)
		}

		return filtered
	}, [questions, state.selectedCategories, state.searchQuery])

	const searchResults = useMemo((): FAQSearchResult[] => {
		if (!state.searchQuery.trim()) {
			return filteredQuestions.map(question => ({
				question,
				matchScore: 1,
				highlightedQuestion: question.question,
				highlightedAnswer: question.answer,
			}))
		}

		return filteredQuestions
			.map(question => ({
				question,
				matchScore: calculateMatchScore(question, state.searchQuery),
				highlightedQuestion: highlightText(
					question.question,
					state.searchQuery,
				),
				highlightedAnswer: highlightText(
					question.answer,
					state.searchQuery,
				),
			}))
			.filter(result => result.matchScore > 0)
			.sort((a, b) => b.matchScore - a.matchScore)
	}, [filteredQuestions, state.searchQuery])

	const hasActiveFilters = useMemo(
		(): boolean =>
			!state.selectedCategories.includes('all') ||
			state.searchQuery.trim() !== '',
		[state.selectedCategories, state.searchQuery],
	)

	return {
		state,
		filteredQuestions,
		searchResults,
		toggleCategory,
		setSearchQuery,
		toggleQuestion,
		clearFilters,
		hasActiveFilters,
	}
}
