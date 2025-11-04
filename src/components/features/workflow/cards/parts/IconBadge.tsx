import { cn } from '@/lib/core/utils'

interface IconBadgeProps {
	readonly icon: string
}

/**
 * IconBadge - Icon badge with backdrop blur
 * Used in StepCard header (bottom-left position)
 * Responsive sizing via Tailwind breakpoints
 */
export const IconBadge = ({ icon }: IconBadgeProps) => {
	return (
		<div
			className={cn(
				'absolute transform transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6',
				'bottom-1.5 left-1.5', // xl: large baseline
				'md:bottom-1 md:left-1', // md: mini
				'lg:bottom-1 lg:left-1', // lg: compact
			)}
		>
			<div
				className={cn(
					'flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-md',
					'h-10 w-10', // xl: large baseline
					'md:h-6 md:w-6', // md: mini
					'lg:h-8 lg:w-8', // lg: compact
				)}
			>
				<span
					className={cn(
						'drop-shadow-lg filter',
						'text-xl', // xl: large baseline
						'md:text-base', // md: mini
						'lg:text-lg', // lg: compact
					)}
				>
					{icon}
				</span>
			</div>
		</div>
	)
}
