/**
 * AnimatedList - Reusable component for staggered list animations
 * Eliminates repetitive animation-delay inline styles
 */

import { Children, cloneElement, isValidElement } from 'react'
import type React from 'react'

import { cn } from '@/lib/core/utils'

export interface AnimatedListProps {
	/** Items to render */
	children: React.ReactNode
	/** Animation delay between items in milliseconds */
	staggerDelay?: number
	/** Base animation class */
	animationClass?: string
	/** Container className */
	className?: string
	/** Container element type */
	as?: React.ElementType
}

export const AnimatedList: React.FC<AnimatedListProps> = ({
	children,
	staggerDelay = 100,
	animationClass = 'animate-fade-in-up',
	className,
	as: Component = 'div',
}) => (
	<Component className={className}>
		{Children.map(children, (child, index) => {
			if (!isValidElement(child)) return child

			// On utilise cloneElement proprement en typant le child
			const typedChild = child as React.ReactElement<
				React.HTMLAttributes<HTMLElement>
			>
			return cloneElement(typedChild, {
				className: cn(typedChild.props.className, animationClass),
				style: {
					...typedChild.props.style,
					animationDelay: `${index * staggerDelay}ms`,
				},
			})
		})}
	</Component>
)

/**
 * AnimatedGrid - Grid variant of AnimatedList
 */
export interface AnimatedGridProps extends AnimatedListProps {
	/** Grid columns configuration */
	cols?: {
		default?: number
		sm?: number
		md?: number
		lg?: number
	}
	/** Gap between items */
	gap?: number
}

export const AnimatedGrid: React.FC<AnimatedGridProps> = ({
	children,
	cols = { default: 1, md: 2, lg: 3 },
	gap = 8,
	className,
	...listProps
}) => {
	const gridClasses = cn(
		'grid',
		`gap-${gap}`,
		cols.default && `grid-cols-${cols.default}`,
		cols.sm && `sm:grid-cols-${cols.sm}`,
		cols.md && `md:grid-cols-${cols.md}`,
		cols.lg && `lg:grid-cols-${cols.lg}`,
		className,
	)

	return (
		<AnimatedList {...listProps} className={gridClasses} as="div">
			{children}
		</AnimatedList>
	)
}
