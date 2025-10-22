import { cn } from '@/lib/core/utils'

import type { StepCardVariant } from '../step-card-variants'

interface ProgressBarProps {
	readonly index: number
	readonly stepKey: string
	readonly variant: StepCardVariant
	readonly gradient: string
}

// Progress bar segments (fixed array for stable keys)
const PROGRESS_SEGMENTS = [0, 1, 2, 3, 4, 5] as const

/**
 * ProgressBar - 6-segment progress visualization
 * Fills segments up to current step index with gradient
 */
export const ProgressBar = ({
	index,
	stepKey,
	variant,
	gradient,
}: ProgressBarProps) => {
	return (
		<div
			className={cn(
				'flex items-center space-x-1',
				variant === 'mini' ? 'py-1' : 'py-2',
			)}
		>
			{PROGRESS_SEGMENTS.map(segment => (
				<div
					key={`progress-${stepKey}-${segment}`}
					className={cn(
						'flex-1 rounded-full transition-all duration-700',
						variant === 'mini' ? 'h-0.5' : 'h-1',
						segment <= index
							? cn('bg-gradient-to-r shadow-sm', gradient)
							: 'bg-gray-200 dark:bg-gray-700',
					)}
					style={{
						transitionDelay: `${segment * 50}ms`,
					}}
				/>
			))}
		</div>
	)
}
