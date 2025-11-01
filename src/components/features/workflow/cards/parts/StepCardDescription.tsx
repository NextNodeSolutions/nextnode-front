import { cn } from '@/lib/core/utils'

interface StepCardDescriptionProps {
	readonly description: string
}

/**
 * StepCardDescription - Card description with fixed grid height
 * Uses CSS custom property for uniform height and overflow handling
 * Note: Visibility controlled by parent wrapper (hidden on MD, visible on LG+)
 */
export const StepCardDescription = ({
	description,
}: StepCardDescriptionProps) => {
	return (
		<p
			className={cn(
				// Fixed height from grid + overflow handling
				'h-[var(--card-description-height)] overflow-hidden',
				// Typography and styling
				'leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-800 dark:text-gray-300 dark:group-hover:text-gray-200',
				// Line clamp for text overflow
				'line-clamp-4', // xl: large baseline
				'lg:line-clamp-3', // lg: compact
				// Responsive text sizes
				'text-sm', // xl: large baseline
				'lg:text-xs', // lg: compact
			)}
		>
			{description}
		</p>
	)
}
