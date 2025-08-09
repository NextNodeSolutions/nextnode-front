import { useMemo } from 'react'

import { cn } from '@/lib/core/utils'

import type { ReactNode } from 'react'

interface FAQTranslations {
	searchPlaceholder: string
	searchTips: string
	questionsCount: string
	showingResults: string
	showingTotal: string
	noResults: string
	helpText: string
}

interface FAQSearchBarProps {
	searchQuery: string
	onSearchChange: (query: string) => void
	resultsCount: number
	totalCount: number
	translations: FAQTranslations
	className?: string
}

export const FAQSearchBar = ({
	searchQuery,
	onSearchChange,
	resultsCount,
	totalCount,
	translations,
	className,
}: FAQSearchBarProps): ReactNode => {
	const showingResultsText = useMemo((): string => {
		if (searchQuery.trim() === '') {
			return translations.questionsCount
				.replace('{{count}}', totalCount.toString())
				.replace('{{plural}}', totalCount !== 1 ? 's' : '')
		}

		return translations.showingResults.replace(
			'{{count}}',
			resultsCount.toString(),
		)
	}, [searchQuery, resultsCount, totalCount, translations])

	const hasResults = resultsCount > 0 || searchQuery.trim() === ''
	const showNoResults = searchQuery.trim() !== '' && resultsCount === 0

	return (
		<div className={cn('mb-8', className)}>
			{/* Search Input */}
			<div className="relative mb-4">
				<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
					<svg
						className="h-5 w-5 text-gray-400 dark:text-gray-500"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</div>

				<input
					type="text"
					value={searchQuery}
					onChange={e => onSearchChange(e.target.value)}
					placeholder={translations.searchPlaceholder}
					className={cn(
						'block w-full rounded-xl border border-gray-200 bg-white py-3 pr-4 pl-11 text-sm text-gray-900 placeholder-gray-500 transition-all duration-200',
						'focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none',
						'dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400',
						'dark:focus:border-blue-400 dark:focus:ring-blue-400/20',
					)}
				/>

				{/* Clear Search Button */}
				{searchQuery.trim() !== '' && (
					<button
						onClick={() => onSearchChange('')}
						className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 focus:text-gray-600 focus:outline-none dark:hover:text-gray-300 dark:focus:text-gray-300"
					>
						<svg
							className="h-5 w-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				)}
			</div>

			{/* Results Summary */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
					<svg
						className={cn(
							'h-4 w-4',
							hasResults ? 'text-green-500' : 'text-amber-500',
						)}
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						{hasResults ? (
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clipRule="evenodd"
							/>
						) : (
							<path
								fillRule="evenodd"
								d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
								clipRule="evenodd"
							/>
						)}
					</svg>
					<span>{showingResultsText}</span>
				</div>

				{/* Search Tips */}
				{searchQuery.trim() === '' && (
					<div className="text-xs text-gray-500 dark:text-gray-500">
						{translations.searchTips}
					</div>
				)}
			</div>

			{/* No Results Message */}
			{showNoResults && (
				<div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800/50 dark:bg-amber-900/20">
					<div className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
						<svg
							className="h-5 w-5 flex-shrink-0"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
								clipRule="evenodd"
							/>
						</svg>
						<div>
							<p className="font-medium">
								{translations.noResults}
							</p>
							<p className="mt-1 text-sm">
								{translations.helpText}
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default FAQSearchBar
