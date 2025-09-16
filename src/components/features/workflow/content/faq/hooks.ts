import { useCallback, useMemo, useState } from 'react'

import type { TextSegment } from './HighlightedText'
import type {
	FAQCategoryId,
	FAQQuestion,
	FAQSearchResult,
	FAQState,
} from './types'

export interface UseFAQStateReturn {
	state: FAQState
	filteredQuestions: FAQQuestion[]
	searchResults: FAQSearchResult[]
	paginatedResults: FAQSearchResult[]
	currentPage: number
	totalPages: number
	itemsPerPage: number
	toggleCategory: (categoryId: FAQCategoryId) => void
	setSearchQuery: (query: string) => void
	toggleQuestion: (questionId: string) => void
	clearFilters: () => void
	loadMore: () => void
	resetPagination: () => void
	hasActiveFilters: boolean
	hasMoreItems: boolean
}

const initialState: FAQState = {
	selectedCategories: ['all'],
	searchQuery: '',
	expandedQuestion: null,
}

// Responsive items per page
const getItemsPerPage = (): number => {
	if (typeof window !== 'undefined') {
		return window.innerWidth < 768 ? 10 : 20 // 10 on mobile, 20 on desktop
	}
	return 10 // SSR default
}

function highlightText(text: string, query: string): TextSegment[] {
	if (!query.trim()) {
		return [{ text, isHighlighted: false }]
	}

	const regex = new RegExp(
		`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
		'gi',
	)
	
	const segments: TextSegment[] = []
	let lastIndex = 0
	let match: RegExpExecArray | null
	
	match = regex.exec(text)
	while (match !== null) {
		// Add text before the match
		if (match.index > lastIndex) {
			segments.push({
				text: text.substring(lastIndex, match.index),
				isHighlighted: false,
			})
		}
		
		// Add the highlighted match
		segments.push({
			text: match[1],
			isHighlighted: true,
		})
		
		lastIndex = regex.lastIndex
		match = regex.exec(text)
	}
	
	// Add remaining text after last match
	if (lastIndex < text.length) {
		segments.push({
			text: text.substring(lastIndex),
			isHighlighted: false,
		})
	}
	
	return segments
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
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage] = useState(getItemsPerPage())

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
		setCurrentPage(1) // Reset to first page on category change
	}, [])

	const setSearchQuery = useCallback((query: string) => {
		setState(prev => ({ ...prev, searchQuery: query }))
		setCurrentPage(1) // Reset to first page on search
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
		setCurrentPage(1)
	}, [])

	const loadMore = useCallback(() => {
		setCurrentPage(prev => prev + 1)
	}, [])

	const resetPagination = useCallback(() => {
		setCurrentPage(1)
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
				highlightedQuestion: [{ text: question.question, isHighlighted: false }],
				highlightedAnswer: [{ text: question.answer, isHighlighted: false }],
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

	// Pagination calculations
	const totalPages = Math.ceil(searchResults.length / itemsPerPage)
	const paginatedResults = useMemo(() => {
		const endIndex = currentPage * itemsPerPage
		return searchResults.slice(0, endIndex)
	}, [searchResults, currentPage, itemsPerPage])

	const hasMoreItems = currentPage * itemsPerPage < searchResults.length

	return {
		state,
		filteredQuestions,
		searchResults,
		paginatedResults,
		currentPage,
		totalPages,
		itemsPerPage,
		toggleCategory,
		setSearchQuery,
		toggleQuestion,
		clearFilters,
		loadMore,
		resetPagination,
		hasActiveFilters,
		hasMoreItems,
	}
}
