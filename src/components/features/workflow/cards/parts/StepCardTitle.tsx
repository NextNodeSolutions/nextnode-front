import { cn } from '@/lib/core/utils'

interface StepCardTitleProps {
	readonly title: string
}

/**
 * StepCardTitle - Card title with responsive sizing and line-clamp
 */
export const StepCardTitle = ({ title }: StepCardTitleProps) => {
	return (
		<h3
			className={cn(
				'leading-tight font-bold text-gray-900 transition-all duration-300 group-hover:scale-105 dark:text-white',
				'line-clamp-2 min-h-[3rem] text-lg', // xl: large baseline
				'md:line-clamp-2 md:min-h-[2rem] md:text-sm', // md: mini
				'lg:line-clamp-2 lg:min-h-[2.5rem] lg:text-base', // lg: compact
			)}
		>
			{title}
		</h3>
	)
}
