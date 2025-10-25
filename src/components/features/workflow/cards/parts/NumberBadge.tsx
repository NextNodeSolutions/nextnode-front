import { cn } from '@/lib/core/utils'

interface NumberBadgeProps {
	readonly number: string
}

/**
 * NumberBadge - Glassmorphism badge displaying step number
 * Used in StepCard header (top-right position)
 * Responsive sizing via Tailwind breakpoints
 */
export const NumberBadge = ({ number }: NumberBadgeProps) => {
	return (
		<div
			className={cn(
				'absolute transform transition-transform duration-500 group-hover:rotate-12',
				'top-1.5 right-1.5', // xl: large baseline
				'md:top-1 md:right-1', // md: mini
				'lg:top-1 lg:right-1', // lg: compact
			)}
		>
			<div
				className={cn(
					'flex items-center justify-center rounded-2xl bg-white/20 shadow-lg ring-1 ring-white/30 backdrop-blur-sm',
					'h-7 w-7', // xl: large baseline
					'md:h-5 md:w-5', // md: mini
					'lg:h-6 lg:w-6', // lg: compact
				)}
			>
				<span
					className={cn(
						'font-black text-white drop-shadow-sm',
						'text-sm', // xl: large baseline
						'md:text-xs', // md: mini
						'lg:text-sm', // lg: compact
					)}
				>
					{number}
				</span>
			</div>
		</div>
	)
}
