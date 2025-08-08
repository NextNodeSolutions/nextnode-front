/**
 * BaseCardOptimized - Refactored card component using CVA patterns
 * Much cleaner and more maintainable than the original BaseCard
 */

import React from 'react'

import { cn } from '@/lib/core/utils'

import { cardVariants, type CardVariantsProps } from './card-variants'
import { CardPatternBackground, type CardPattern } from './CardPattern'
import {
	CardIcon,
	CardTitle,
	CardDescription,
	CardBadge,
	CardHeader,
	CardActions,
	CardContentWrapper,
} from './CardContent'

export interface BaseCardOptimizedProps extends CardVariantsProps {
	/** Additional className */
	className?: string
	/** Accent color for theming */
	color?: string
	/** Background pattern type */
	pattern?: CardPattern
	/** Animation delay for staggered animations */
	animationDelay?: number
	/** Icon element */
	icon?: React.ReactNode | string
	/** Card title */
	title?: string
	/** Card description */
	description?: string
	/** Badge configuration */
	badge?: { text: string; color: string }
	/** Header content */
	headerContent?: React.ReactNode
	/** Actions/footer content */
	actions?: React.ReactNode
	/** Click handler */
	onClick?: () => void
	/** Children content */
	children?: React.ReactNode
}

export const BaseCardOptimized: React.FC<BaseCardOptimizedProps> = ({
	// CVA variants
	variant = 'standard',
	layout = 'simple',
	hover = 'lift',
	glassmorphic = false,
	clickable = false,
	disabled = false,
	// Custom props
	className,
	color,
	pattern = 'none',
	animationDelay = 0,
	icon,
	title,
	description,
	badge,
	headerContent,
	actions,
	onClick,
	children,
}) => {
	const handleClick = onClick && !disabled ? onClick : undefined
	const isClickable = clickable || !!onClick

	return (
		<div
			className={cn(
				cardVariants({
					variant,
					layout,
					hover: disabled ? 'none' : hover,
					glassmorphic,
					clickable: isClickable,
					disabled,
				}),
				className,
			)}
			onClick={handleClick}
			style={{ animationDelay: `${animationDelay}ms` }}
			role={isClickable ? 'button' : undefined}
			tabIndex={isClickable && !disabled ? 0 : undefined}
		>
			{/* Background Pattern */}
			<CardPatternBackground pattern={pattern} color={color} />

			{/* Header Section */}
			<CardHeader headerContent={headerContent} />

			{/* Main Content */}
			<CardContentWrapper variant={variant}>
				{/* Badge */}
				<CardBadge badge={badge} />

				{/* Icon & Title Layout */}
				{layout === 'with-icon' ? (
					<div className="flex items-start gap-4">
						<CardIcon icon={icon} variant={variant} color={color} />
						<div className="flex-1 space-y-2">
							<CardTitle title={title} variant={variant} />
							<CardDescription
								description={description}
								variant={variant}
							/>
						</div>
					</div>
				) : (
					<>
						<CardIcon icon={icon} variant={variant} color={color} />
						<CardTitle title={title} variant={variant} />
						<CardDescription
							description={description}
							variant={variant}
						/>
					</>
				)}

				{/* Custom Children */}
				{children}
			</CardContentWrapper>

			{/* Actions Section */}
			<CardActions actions={actions} />
		</div>
	)
}

// Re-export types for convenience
export type { CardPattern } from './CardPattern'
export type { CardVariantsProps } from './card-variants'

export default BaseCardOptimized
