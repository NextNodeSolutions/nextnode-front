import { cn } from '@/lib/core/utils'

import type { StepCardVariant } from '../step-card-variants'
import { getVariantClasses } from '../step-card-variants'

interface IconBadgeProps {
	readonly icon: string
	readonly variant: StepCardVariant
}

/**
 * IconBadge - Icon badge with backdrop blur
 * Used in StepCard header (bottom-left position)
 */
export const IconBadge = ({ icon, variant }: IconBadgeProps) => {
	return (
		<div
			className={cn(
				'absolute transform transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6',
				getVariantClasses(variant, 'iconPosition'),
			)}
		>
			<div
				className={cn(
					'flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-md',
					getVariantClasses(variant, 'icon'),
				)}
			>
				<span
					className={cn(
						'drop-shadow-lg filter',
						getVariantClasses(variant, 'iconText'),
					)}
				>
					{icon}
				</span>
			</div>
		</div>
	)
}
