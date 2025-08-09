import { FAQCategoryFilter } from './FAQCategoryFilter'
import { FAQSearchBar } from './FAQSearchBar'
import { FAQItem } from './FAQItem'
import { useFAQState } from './hooks'

import type { ReactNode } from 'react'
import type { FAQQuestion, FAQCategory } from './types'

interface FAQTranslations {
	searchPlaceholder: string
	searchTips: string
	questionsCount: string
	showingResults: string
	showingTotal: string
	noResults: string
	helpText: string
}

interface FAQAppProps {
	questions: FAQQuestion[]
	categories: FAQCategory[]
	translations: FAQTranslations
}

export const FAQApp = ({
	questions,
	categories,
	translations,
}: FAQAppProps): ReactNode => {
	const {
		state,
		searchResults,
		toggleCategory,
		setSearchQuery,
		toggleQuestion,
		clearFilters,
		hasActiveFilters,
	} = useFAQState(questions)

	return (
		<div className="space-y-8">
			{/* Search Bar */}
			<FAQSearchBar
				searchQuery={state.searchQuery}
				onSearchChange={setSearchQuery}
				resultsCount={searchResults.length}
				totalCount={questions.length}
				translations={translations}
			/>

			{/* Category Filters */}
			<FAQCategoryFilter
				categories={categories}
				selectedCategories={state.selectedCategories}
				questions={questions}
				onCategoryToggle={toggleCategory}
				onClearFilters={clearFilters}
				hasActiveFilters={hasActiveFilters}
			/>

			{/* FAQ Results */}
			<div className="space-y-4">
				{searchResults.length === 0 ? (
					<div className="py-12 text-center">
						<div className="mx-auto mb-4 h-24 w-24 text-gray-300 dark:text-gray-600">
							<svg fill="currentColor" viewBox="0 0 20 20">
								<path
									fillRule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<p className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
							No questions found ({questions.length} total
							questions, {searchResults.length} results)
						</p>
						<p className="text-gray-600 dark:text-gray-400">
							Categories:{' '}
							{state.selectedCategories
								.map(
									id =>
										categories.find(c => c.id === id)
											?.name || id,
								)
								.join(', ')}{' '}
							| Search: "{state.searchQuery}"
						</p>
					</div>
				) : (
					<>
						<p className="mb-4 text-sm text-gray-500">
							{translations.showingTotal
								.replace(
									'{{results}}',
									searchResults.length.toString(),
								)
								.replace(
									'{{total}}',
									questions.length.toString(),
								)}
						</p>
						{searchResults.map((result, index) => (
							<div
								key={result.question.id}
								className="animate-fade-in opacity-0"
								style={{
									animationDelay: `${index * 50}ms`,
									animationFillMode: 'forwards',
								}}
							>
								<FAQItem
									question={result.question}
									isExpanded={
										state.expandedQuestion ===
										result.question.id
									}
									onToggle={() =>
										toggleQuestion(result.question.id)
									}
									highlightedQuestion={
										result.highlightedQuestion
									}
									highlightedAnswer={result.highlightedAnswer}
								/>
							</div>
						))}
					</>
				)}
			</div>
		</div>
	)
}

export default FAQApp
