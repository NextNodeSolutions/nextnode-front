import { useMemo } from 'react'

import { cn } from '@/lib/core/utils'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/forms/select'

import type { ReactNode } from 'react'
import type { FAQCategory, FAQCategoryId, FAQQuestion } from './types'

interface FAQCategoryFilterProps {
	categories: FAQCategory[]
	selectedCategories: FAQCategoryId[]
	questions: FAQQuestion[]
	onCategoryToggle: (categoryId: FAQCategoryId) => void
	onClearFilters: () => void
	hasActiveFilters: boolean
	className?: string
}

export const FAQCategoryFilter = ({
	categories,
	selectedCategories,
	questions,
	onCategoryToggle,
	onClearFilters,
	hasActiveFilters,
	className,
}: FAQCategoryFilterProps): ReactNode => {
	const categoryStats = useMemo((): Map<FAQCategoryId, number> => {
		const stats = new Map<FAQCategoryId, number>()

		categories.forEach(category => {
			if (category.id === 'all') {
				stats.set('all', questions.length)
			} else {
				const count = questions.filter(
					q => q.category === category.id,
				).length
				stats.set(category.id, count)
			}
		})

		return stats
	}, [categories, questions])

	const isSelected = (categoryId: FAQCategoryId): boolean =>
		selectedCategories.includes(categoryId)

	const isAllSelected = selectedCategories.includes('all')

	// Get current selected category for mobile dropdown
	const getSelectedCategoryId = (): FAQCategoryId => {
		if (isAllSelected || selectedCategories.length === 0) return 'all'
		// For mobile, show first selected category
		return selectedCategories[0] || 'all'
	}

	return (
		<div className={cn('mb-8', className)}>
			{/* Mobile Dropdown */}
			<div className="md:hidden">
				<label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
					Filter by Category
				</label>
				<Select
					value={getSelectedCategoryId()}
					onValueChange={value =>
						onCategoryToggle(value as FAQCategoryId)
					}
				>
					<SelectTrigger className="w-full shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400">
						<SelectValue>
							{((): string => {
								const selectedId = getSelectedCategoryId()
								const category = categories.find(
									c => c.id === selectedId,
								)
								const count = categoryStats.get(selectedId) || 0
								return category
									? `${category.icon} ${category.name} (${count})`
									: 'Select category...'
							})()}
						</SelectValue>
					</SelectTrigger>
					<SelectContent>
						{categories.map(category => {
							const count = categoryStats.get(category.id) || 0
							return (
								<SelectItem
									key={category.id}
									value={category.id}
								>
									{category.icon} {category.name} ({count})
								</SelectItem>
							)
						})}
					</SelectContent>
				</Select>
			</div>

			{/* Desktop Buttons */}
			<div className="mb-6 hidden flex-wrap items-center justify-between gap-4 md:flex">
				<div className="flex flex-wrap items-center gap-3">
					{categories.map(category => {
						const selected = isSelected(category.id)
						const count = categoryStats.get(category.id) || 0

						return (
							<button
								key={category.id}
								onClick={() => onCategoryToggle(category.id)}
								className={cn(
									'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none',
									selected ||
										(isAllSelected && category.id === 'all')
										? 'border-blue-500 bg-blue-500 text-white shadow-lg'
										: 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:shadow-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-blue-500',
								)}
								aria-pressed={selected}
							>
								<span className="text-base">
									{category.icon}
								</span>
								<span>{category.name}</span>
								<span
									className={cn(
										'rounded-full px-2 py-0.5 text-xs font-semibold',
										selected ||
											(isAllSelected &&
												category.id === 'all')
											? 'bg-blue-400 text-white'
											: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
									)}
								>
									{count}
								</span>
							</button>
						)
					})}
				</div>

				{/* Clear Filters Button */}
				{hasActiveFilters && !isAllSelected && (
					<button
						onClick={onClearFilters}
						className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
					>
						<svg
							className="h-4 w-4"
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
						Clear Filters
					</button>
				)}
			</div>

			{/* Active Filters Summary */}
			{!isAllSelected && selectedCategories.length > 0 && (
				<div className="flex flex-col gap-2 text-sm text-gray-600 md:flex-row md:items-center md:gap-2 dark:text-gray-400">
					<span>Active filters:</span>
					<div className="flex flex-wrap gap-1">
						{selectedCategories.map(categoryId => {
							const category = categories.find(
								c => c.id === categoryId,
							)
							if (!category) return null

							return (
								<span
									key={categoryId}
									className="inline-flex items-center gap-1 rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
								>
									{category.icon} {category.name}
								</span>
							)
						})}
					</div>
				</div>
			)}
		</div>
	)
}

export default FAQCategoryFilter
