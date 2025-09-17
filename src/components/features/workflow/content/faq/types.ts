import type { FAQCategoryId } from './data'
import type { TextSegment } from './HighlightedText'

export type { FAQCategoryId }

export type FAQDifficulty = 'beginner' | 'intermediate' | 'advanced'

export interface FAQQuestion {
	id: string
	question: string
	answer: string
	icon: string
	category: FAQCategoryId
	difficulty: FAQDifficulty
	tags?: string[]
	relatedIds?: string[]
}

export interface FAQCategory {
	id: FAQCategoryId
	name: string
	icon: string
}

export interface FAQState {
	selectedCategories: FAQCategoryId[]
	searchQuery: string
	expandedQuestion: string | null
}

export interface FAQSearchResult {
	question: FAQQuestion
	matchScore: number
	highlightedQuestion: TextSegment[]
	highlightedAnswer: TextSegment[]
}
