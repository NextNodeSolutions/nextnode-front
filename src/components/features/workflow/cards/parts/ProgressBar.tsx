import { cn } from '@/lib/core/utils'

interface ProgressBarProps {
	readonly index: number
	readonly stepKey: string
	readonly gradient: string
}

// Progress bar segments (fixed array for stable keys)
const PROGRESS_SEGMENTS = [0, 1, 2, 3, 4, 5] as const

/**
 * ProgressBar - 6-segment progress visualization
 * Fills segments up to current step index with gradient
 * Responsive sizing via Tailwind breakpoints
 */
export const ProgressBar = ({ index, stepKey, gradient }: ProgressBarProps) => {
	return (
		<div
			className={cn(
				'flex items-center space-x-1',
				'py-2', // xl: large baseline
				'md:py-1', // md: mini
			)}
		>
			{PROGRESS_SEGMENTS.map(segment => (
				<div
					key={`progress-${stepKey}-${segment}`}
					className={cn(
						'flex-1 rounded-full transition-all duration-700',
						'h-1', // xl: large baseline
						'md:h-0.5', // md: mini
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
