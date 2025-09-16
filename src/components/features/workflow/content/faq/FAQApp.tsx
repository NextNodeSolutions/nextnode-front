import type { ReactNode } from 'react'

import { FAQCategoryFilter } from './FAQCategoryFilter'
import { FAQItem } from './FAQItem'
import { FAQSearchBar } from './FAQSearchBar'
import { useFAQState } from './hooks'
import type { FAQCategory, FAQQuestion } from './types'

interface FAQTranslations {
	placeholder: string
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
		paginatedResults,
		toggleCategory,
		setSearchQuery,
		toggleQuestion,
		clearFilters,
		loadMore,
		hasActiveFilters,
		hasMoreItems,
	} = useFAQState(questions)

	return (
		<div className="space-y-8">
			{/* Search Bar */}
			<FAQSearchBar
				searchQuery={state.searchQuery}
				onSearchChange={setSearchQuery}
				resultsCount={searchResults.length}
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
							<svg fill="currentColor" viewBox="0 0 20 20" aria-label="No results found">
								<path
									fillRule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<p className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
							{translations.noResults}
						</p>
						<p className="text-gray-600 dark:text-gray-400">
							{translations.helpText}
						</p>
					</div>
				) : (
					<>
						{searchResults.length > 0 && (
							<p className="mb-4 text-sm text-gray-500">
								{translations.showingTotal
									.replace('{{start}}', '1')
									.replace(
										'{{end}}',
										paginatedResults.length.toString(),
									)
									.replace(
										'{{total}}',
										searchResults.length.toString(),
									)}
							</p>
						)}
						{paginatedResults.map((result, index) => (
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

						{/* Load More Button */}
						{hasMoreItems && (
							<div className="mt-8 text-center">
								<button
									onClick={loadMore}
									className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-blue-300 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
								>
									<svg
										className="h-4 w-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										aria-label="Show more categories"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 9l-7 7-7-7"
										/>
									</svg>
									Load More (
									{searchResults.length -
										paginatedResults.length}{' '}
									remaining)
								</button>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	)
}

export default FAQApp
