import { cn } from '@/lib/core/utils'

import type { StepCardVariant } from '../step-card-variants'
import { getVariantClasses } from '../step-card-variants'

interface NumberBadgeProps {
	readonly number: string
	readonly variant: StepCardVariant
}

/**
 * NumberBadge - Glassmorphism badge displaying step number
 * Used in StepCard header (top-right position)
 */
export const NumberBadge = ({ number, variant }: NumberBadgeProps) => {
	return (
		<div
			className={cn(
				'absolute transform transition-transform duration-500 group-hover:rotate-12',
				getVariantClasses(variant, 'position'),
			)}
		>
			<div
				className={cn(
					'flex items-center justify-center rounded-2xl bg-white/20 shadow-lg ring-1 ring-white/30 backdrop-blur-sm',
					getVariantClasses(variant, 'number'),
				)}
			>
				<span
					className={cn(
						'font-black text-white drop-shadow-sm',
						getVariantClasses(variant, 'numberText'),
					)}
				>
					{number}
				</span>
			</div>
		</div>
	)
}
