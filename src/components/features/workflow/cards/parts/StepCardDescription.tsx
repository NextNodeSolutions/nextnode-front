import { cn } from '@/lib/core/utils'

interface StepCardDescriptionProps {
	readonly description: string
}

/**
 * StepCardDescription - Card description with responsive visibility and line-clamp
 */
export const StepCardDescription = ({
	description,
}: StepCardDescriptionProps) => {
	return (
		<p
			className={cn(
				'leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-800 dark:text-gray-300 dark:group-hover:text-gray-200',
				'flex-1',
				'line-clamp-4 text-sm', // xl: large baseline
				'md:hidden', // md: mini (hidden)
				'lg:line-clamp-3 lg:block lg:text-xs', // lg: compact
			)}
		>
			{description}
		</p>
	)
}
