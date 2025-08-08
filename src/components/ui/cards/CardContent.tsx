import React from 'react'

import { cn } from '@/lib/core/utils'

import {
	titleVariants,
	descriptionVariants,
	iconVariants,
	spacingVariants,
	type TitleVariantsProps,
	type DescriptionVariantsProps,
	type IconVariantsProps,
	type SpacingVariantsProps,
} from './card-variants'

interface CardIconProps extends IconVariantsProps {
	icon?: React.ReactNode | string
	color?: string
	className?: string
}

export const CardIcon: React.FC<CardIconProps> = ({
	icon,
	variant,
	color,
	className,
}) => {
	if (!icon) return null

	const iconElement =
		typeof icon === 'string' ? (
			<span className="flex items-center justify-center">{icon}</span>
		) : (
			icon
		)

	return (
		<div
			className={cn(
				iconVariants({ variant }),
				'flex items-center justify-center rounded-lg',
				'bg-gradient-to-br from-gray-100 to-gray-200',
				'dark:from-gray-700 dark:to-gray-800',
				className,
			)}
			style={color ? { color } : undefined}
		>
			{iconElement}
		</div>
	)
}

interface CardTitleProps extends TitleVariantsProps {
	title?: string
	className?: string
}

export const CardTitle: React.FC<CardTitleProps> = ({
	title,
	variant,
	className,
}) => {
	if (!title) return null

	return (
		<h3 className={cn(titleVariants({ variant }), className)}>{title}</h3>
	)
}

interface CardDescriptionProps extends DescriptionVariantsProps {
	description?: string
	className?: string
}

export const CardDescription: React.FC<CardDescriptionProps> = ({
	description,
	variant,
	className,
}) => {
	if (!description) return null

	return (
		<p className={cn(descriptionVariants({ variant }), className)}>
			{description}
		</p>
	)
}

interface CardBadgeProps {
	badge?: { text: string; color: string }
	className?: string
}

export const CardBadge: React.FC<CardBadgeProps> = ({ badge, className }) => {
	if (!badge) return null

	return (
		<div
			className={cn(
				'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
				'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
				className,
			)}
			style={{ backgroundColor: `${badge.color}20`, color: badge.color }}
		>
			{badge.text}
		</div>
	)
}

interface CardHeaderProps {
	headerContent?: React.ReactNode
	className?: string
}

export const CardHeader: React.FC<CardHeaderProps> = ({
	headerContent,
	className,
}) => {
	if (!headerContent) return null

	return (
		<div
			className={cn(
				'border-b border-gray-100 pb-4 dark:border-gray-700',
				className,
			)}
		>
			{headerContent}
		</div>
	)
}

interface CardActionsProps {
	actions?: React.ReactNode
	className?: string
}

export const CardActions: React.FC<CardActionsProps> = ({
	actions,
	className,
}) => {
	if (!actions) return null

	return (
		<div
			className={cn(
				'border-t border-gray-100 pt-4 dark:border-gray-700',
				className,
			)}
		>
			{actions}
		</div>
	)
}

interface CardContentWrapperProps extends SpacingVariantsProps {
	children: React.ReactNode
	className?: string
}

export const CardContentWrapper: React.FC<CardContentWrapperProps> = ({
	children,
	variant,
	className,
}) => (
	<div className={cn(spacingVariants({ variant }), className)}>
		{children}
	</div>
)
