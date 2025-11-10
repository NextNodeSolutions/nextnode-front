import { cn } from '@/lib/core/utils'

interface StepCardGradientOverlayProps {
	readonly gradient: string
}

/**
 * StepCardGradientOverlay - Hover gradient blur effect
 * Positioned absolutely behind card container
 */
export const StepCardGradientOverlay = ({
	gradient,
}: StepCardGradientOverlayProps) => {
	return (
		<div
			className={cn(
				'absolute -inset-1 rounded-2xl bg-gradient-to-r opacity-0 blur transition-all duration-500 group-hover:opacity-20',
				gradient,
			)}
		/>
	)
}
