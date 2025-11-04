import type { ReactNode } from 'react'

import { cn } from '@/lib/core/utils'

interface StepCardContainerProps {
	readonly children: ReactNode
	readonly glow: string
}

/**
 * StepCardContainer - Card base with border and glow effect
 * Contains all card sections (header, content, footer, expanded)
 */
export const StepCardContainer = ({
	children,
	glow,
}: StepCardContainerProps) => {
	return (
		<div
			className={cn(
				'card-base relative overflow-hidden border border-gray-100 dark:border-gray-800',
				'grid h-full grid-rows-[auto_1fr]',
				glow,
			)}
		>
			{children}
		</div>
	)
}
