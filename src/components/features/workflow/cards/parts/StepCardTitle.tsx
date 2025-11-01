import { cn } from '@/lib/core/utils'

interface StepCardTitleProps {
	readonly title: string
}

/**
 * StepCardTitle - Card title with fixed grid height
 * Uses CSS custom property for uniform height across all cards
 */
export const StepCardTitle = ({ title }: StepCardTitleProps) => {
	return (
		<h3
			className={cn(
				// Fixed height from grid + overflow handling
				'h-[var(--card-title-height)] overflow-hidden',
				// Typography and styling
				'leading-tight font-bold text-gray-900 transition-all duration-300 group-hover:scale-105 dark:text-white',
				// Line clamp for text overflow
				'line-clamp-2',
				// Responsive text sizes
				'text-lg', // xl: large baseline
				'md:text-sm', // md: mini
				'lg:text-base', // lg: compact
			)}
		>
			{title}
		</h3>
	)
}
