/**
 * ProgressBar - Reusable progress indicator component
 * Consolidated from repeated progress bar patterns across workflow illustrations
 */

import React from 'react'

import { cn } from '@/lib/core/utils'

export interface ProgressBarProps {
	/** Current progress value (0-100) */
	progress: number
	/** Label text displayed with the progress */
	label: string
	/** CSS classes for the progress bar background */
	gradientClass?: string
	/** CSS classes for the indicator dot */
	dotClass?: string
	/** Show percentage text */
	showPercentage?: boolean
	/** Additional className for the container */
	className?: string
	/** Size variant */
	size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
	sm: {
		dot: 'h-4 w-4',
		bar: 'h-2',
		text: 'text-sm',
		percentage: 'text-sm',
	},
	md: {
		dot: 'h-6 w-6',
		bar: 'h-4',
		text: 'text-lg',
		percentage: 'text-lg',
	},
	lg: {
		dot: 'h-8 w-8',
		bar: 'h-6',
		text: 'text-xl',
		percentage: 'text-xl',
	},
} as const

export const ProgressBar: React.FC<ProgressBarProps> = ({
	progress,
	label,
	gradientClass = 'bg-gradient-to-r from-blue-500 to-blue-300',
	dotClass = 'bg-blue-500',
	showPercentage = true,
	className,
	size = 'md',
}) => {
	const sizeStyle = sizeClasses[size]

	return (
		<div className={cn('flex items-center justify-between', className)}>
			{/* Dot + Label */}
			<div className="flex items-center gap-4">
				<div
					className={cn(
						'rounded-full shadow-sm',
						sizeStyle.dot,
						dotClass,
					)}
				/>
				<span
					className={cn(
						'font-semibold text-gray-700 dark:text-gray-300',
						sizeStyle.text,
					)}
				>
					{label}
				</span>
			</div>

			{/* Progress Bar */}
			<div
				className={cn(
					'mx-6 flex-1 rounded-full shadow-sm',
					sizeStyle.bar,
					gradientClass,
				)}
				style={{
					background: `linear-gradient(to right, currentColor ${progress}%, transparent ${progress}%)`,
				}}
			/>

			{/* Percentage */}
			{showPercentage && (
				<span
					className={cn(
						'font-bold text-gray-600 dark:text-gray-400',
						sizeStyle.percentage,
					)}
				>
					{progress}%
				</span>
			)}
		</div>
	)
}
