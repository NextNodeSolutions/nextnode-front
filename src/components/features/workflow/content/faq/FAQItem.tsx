import { useMemo } from 'react'

import { cn } from '@/lib/core/utils'
import { useI18n } from '@/lib/i18n/react'
import { FAQ_I18N_KEYS } from '@/utils/faq-i18n-keys'

import { getDifficultyConfig } from './constants'

import type { ReactNode } from 'react'
import type { FAQQuestion } from './types'

interface FAQItemProps {
	question: FAQQuestion
	isExpanded?: boolean
	onToggle?: () => void
	highlightedQuestion?: string
	highlightedAnswer?: string
}

export const FAQItem = ({
	question,
	isExpanded = false,
	onToggle,
	highlightedQuestion,
	highlightedAnswer,
}: FAQItemProps): ReactNode => {
	const { t } = useI18n()

	// Optimized: shared helper with stable config objects
	const difficultyConfig = useMemo(
		() =>
			getDifficultyConfig(question.difficulty, difficulty =>
				t(FAQ_I18N_KEYS.difficulties[difficulty]),
			),
		[question.difficulty], // Removed t dependency - getLabel callback captures current t
	)

	// Optimized: pre-built i18n keys for performance
	const categoryName = useMemo(
		() => t(FAQ_I18N_KEYS.categories[question.category]),
		[question.category], // Removed t dependency - constant key lookup
	)

	const handleClick = (): void => {
		onToggle?.()
	}

	const handleKeyDown = (event: React.KeyboardEvent): void => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault()
			onToggle?.()
		}
	}

	return (
		<div
			className={cn(
				'faq-item group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 focus-within:-translate-y-0.5 focus-within:shadow-xl hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600',
				isExpanded && 'ring-2 ring-blue-500/20',
			)}
			data-category={question.category}
			data-difficulty={question.difficulty}
			data-faq-id={question.id}
		>
			{/* Question Header */}
			<button
				className="faq-header group/header flex w-full items-center justify-between px-6 py-6 text-left transition-all duration-200 hover:bg-gray-50 focus:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-inset dark:hover:bg-gray-700/50 dark:focus:bg-blue-900/20"
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				aria-expanded={isExpanded}
				type="button"
			>
				<div className="flex min-w-0 flex-1 items-start gap-4">
					{/* Category Icon */}
					<div
						className={cn(
							'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-xl transition-transform duration-200',
							'bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30',
							'group-focus-within:scale-110 group-hover:scale-110',
						)}
					>
						{question.icon}
					</div>

					<div className="min-w-0 flex-1">
						{/* Badges Row */}
						<div className="mb-3 flex flex-wrap items-center gap-2">
							{/* Category Badge */}
							<span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
								{categoryName}
							</span>

							{/* Difficulty Badge */}
							<span
								className={cn(
									'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium',
									difficultyConfig.bgClass,
								)}
							>
								<span className="text-xs">
									{difficultyConfig.icon}
								</span>
								{difficultyConfig.label}
							</span>
						</div>

						{/* Question */}
						<h3 className="text-lg leading-tight font-semibold text-gray-900 transition-colors duration-200 group-hover/header:text-blue-700 dark:text-white dark:group-hover/header:text-blue-300">
							{highlightedQuestion ? (
								<span
									dangerouslySetInnerHTML={{
										__html: highlightedQuestion,
									}}
								/>
							) : (
								question.question
							)}
						</h3>
					</div>
				</div>

				{/* Expansion Icon */}
				<div className="ml-4 flex-shrink-0">
					<svg
						className={cn(
							'h-6 w-6 transform text-gray-400 transition-all duration-300 group-hover/header:text-blue-500',
							isExpanded ? 'rotate-180' : 'rotate-0',
						)}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</div>
			</button>

			{/* Answer Content */}
			<div
				className={cn(
					'faq-content overflow-hidden transition-all duration-500 ease-out',
					isExpanded
						? 'max-h-[1000px] opacity-100'
						: 'max-h-0 opacity-0',
				)}
			>
				<div className="border-t border-gray-100 px-6 py-6 dark:border-gray-700">
					<div className="prose prose-sm dark:prose-invert ml-16 max-w-none text-gray-600 dark:text-gray-300">
						{highlightedAnswer ? (
							<div
								dangerouslySetInnerHTML={{
									__html: highlightedAnswer,
								}}
							/>
						) : (
							<div
								dangerouslySetInnerHTML={{
									__html: question.answer,
								}}
							/>
						)}
					</div>

					{/* Related Questions */}
					{question.relatedIds && question.relatedIds.length > 0 && (
						<div className="mt-6 ml-16 border-t border-gray-100 pt-4 dark:border-gray-700">
							<h4 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
								Related Questions:
							</h4>
							<div className="flex flex-wrap gap-2">
								{question.relatedIds.map(relatedId => (
									<button
										key={relatedId}
										className="text-xs text-blue-600 underline decoration-dotted underline-offset-2 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
										type="button"
										onClick={(e): void => {
											e.stopPropagation()
											// Handle related question click - in real app this would navigate
											// console.log('Navigate to related question:', relatedId)
										}}
									>
										View related →
									</button>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default FAQItem
