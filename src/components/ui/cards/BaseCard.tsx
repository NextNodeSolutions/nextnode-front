/**
 * BaseCard - Consolidated card component with common patterns
 * Extracted from StepCard, TechCard for consistent card styling
 */

import React from 'react'

import { cn } from '@/lib/core/utils'

export type CardVariant = 'mini' | 'compact' | 'standard' | 'large'
export type CardLayout = 'simple' | 'with-header' | 'with-icon' | 'split'
export type CardHover = 'none' | 'lift-sm' | 'lift' | 'lift-lg'
export type CardPattern = 'dots' | 'geometric' | 'none'

export interface BaseCardProps {
	/** Layout variant */
	variant?: CardVariant
	/** Card layout type */
	layout?: CardLayout
	/** Additional className */
	className?: string
	/** Accent color for theming */
	color?: string
	/** Enable glassmorphic styling */
	glassmorphic?: boolean
	/** Background pattern type */
	pattern?: CardPattern
	/** Hover animation type */
	hover?: CardHover
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
	/** Make card clickable */
	clickable?: boolean
	/** Click handler */
	onClick?: () => void
	/** Disabled state */
	disabled?: boolean
	/** Children content */
	children?: React.ReactNode
}

const CARD_VARIANTS = {
	mini: {
		container: 'p-2',
		title: 'text-sm',
		description: 'text-xs',
		icon: 'text-base h-6 w-6',
		spacing: 'space-y-1',
	},
	compact: {
		container: 'p-3',
		title: 'text-base',
		description: 'text-sm',
		icon: 'text-lg h-8 w-8',
		spacing: 'space-y-2',
	},
	standard: {
		container: 'p-6',
		title: 'text-xl',
		description: 'text-base',
		icon: 'text-2xl h-12 w-12',
		spacing: 'space-y-4',
	},
	large: {
		container: 'p-8',
		title: 'text-2xl',
		description: 'text-lg',
		icon: 'text-3xl h-16 w-16',
		spacing: 'space-y-6',
	},
} as const

const HOVER_VARIANTS = {
	none: '',
	'lift-sm': 'hover-lift-sm',
	lift: 'hover-lift',
	'lift-lg': 'hover-lift-lg',
} as const

const LAYOUT_VARIANTS = {
	simple: 'flex flex-col',
	'with-header': 'overflow-hidden',
	'with-icon': 'flex items-start gap-4',
	split: 'grid grid-cols-1 md:grid-cols-2 gap-4',
} as const

export const BaseCard: React.FC<BaseCardProps> = ({
	variant = 'standard',
	layout = 'simple',
	className,
	color,
	glassmorphic = false,
	pattern = 'none',
	hover = 'lift',
	animationDelay = 0,
	icon,
	title,
	description,
	badge,
	headerContent,
	actions,
	clickable = false,
	onClick,
	disabled = false,
	children,
}) => {
	const variantStyles = CARD_VARIANTS[variant]
	const hoverClass = HOVER_VARIANTS[hover]
	const layoutClass = LAYOUT_VARIANTS[layout]

	// Generate pattern background if specified
	const PatternBackground = pattern !== 'none' && (
		<div className="absolute inset-0 opacity-5 transition-opacity duration-500 group-hover:opacity-10">
			<svg viewBox="0 0 100 100" className="h-full w-full">
				<defs>
					<pattern
						id={`card-pattern-${pattern}-${Math.random()}`}
						x="0"
						y="0"
						width="10"
						height="10"
						patternUnits="userSpaceOnUse"
					>
						{pattern === 'dots' && (
							<circle cx="5" cy="5" r="1" fill="currentColor" />
						)}
						{pattern === 'geometric' && (
							<>
								<circle
									cx="2"
									cy="2"
									r="1"
									fill="currentColor"
								/>
								<circle
									cx="8"
									cy="8"
									r="1"
									fill="currentColor"
								/>
								<rect
									x="4"
									y="4"
									width="2"
									height="2"
									fill="currentColor"
								/>
							</>
						)}
					</pattern>
				</defs>
				<rect
					width="100"
					height="100"
					fill={`url(#card-pattern-${pattern}-${Math.random()})`}
				/>
			</svg>
		</div>
	)

	return (
		<div
			className={cn(
				// Base card styling
				glassmorphic ? 'card-container' : 'card-base',
				// Layout and spacing
				variantStyles.container,
				// Interaction states
				clickable && 'cursor-pointer',
				disabled && 'pointer-events-none opacity-50',
				// Hover effects
				!disabled && hoverClass,
				// Group for child hover effects
				'group relative',
				// Transition
				'transition-smooth',
				className,
			)}
			onClick={clickable ? onClick : undefined}
			style={{
				animationDelay:
					animationDelay > 0 ? `${animationDelay}ms` : undefined,
			}}
		>
			{/* Background Pattern */}
			{PatternBackground}

			{/* Color accent glow effect */}
			{color && (
				<div
					className="absolute -inset-1 rounded-2xl bg-gradient-to-r opacity-0 blur transition-all duration-500 group-hover:opacity-20"
					style={{
						background: `linear-gradient(135deg, ${color}40, ${color}20)`,
					}}
				/>
			)}

			{/* Header Section */}
			{layout === 'with-header' && headerContent && (
				<div
					className={cn(
						'relative overflow-hidden bg-gradient-to-br',
						color && `bg-gradient-to-br`,
					)}
					style={
						color
							? {
									background: `linear-gradient(135deg, ${color}10, ${color}05)`,
								}
							: undefined
					}
				>
					{PatternBackground}
					<div className="relative z-10">{headerContent}</div>
				</div>
			)}

			{/* Main Content */}
			<div
				className={cn(
					'relative z-10',
					layoutClass,
					variantStyles.spacing,
				)}
			>
				{/* Badge */}
				{badge && (
					<div className="mb-2 flex items-center">
						<span
							className="rounded-full px-2 py-1 text-xs font-bold text-white"
							style={{ backgroundColor: badge.color }}
						>
							{badge.text}
						</span>
					</div>
				)}

				{/* Icon & Content for with-icon layout */}
				{layout === 'with-icon' && icon && (
					<div
						className={cn(
							'flex-shrink-0 rounded-xl transition-transform duration-300 group-hover:scale-110',
							variantStyles.icon,
							color
								? 'flex items-center justify-center'
								: 'flex items-center justify-center bg-gray-50 dark:bg-gray-700',
						)}
						style={
							color
								? {
										backgroundColor: `${color}15`,
										color: color,
									}
								: undefined
						}
					>
						{typeof icon === 'string' ? (
							<span className={variantStyles.icon}>{icon}</span>
						) : (
							icon
						)}
					</div>
				)}

				{/* Content wrapper for with-icon layout */}
				<div className={layout === 'with-icon' ? 'min-w-0 flex-1' : ''}>
					{/* Icon for simple layout */}
					{layout === 'simple' && icon && (
						<div className="mb-3 flex justify-center">
							<div
								className={cn(
									'flex items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110',
									variantStyles.icon,
									color ? '' : 'bg-gray-50 dark:bg-gray-700',
								)}
								style={
									color
										? {
												backgroundColor: `${color}15`,
												color: color,
											}
										: undefined
								}
							>
								{typeof icon === 'string' ? (
									<span className={variantStyles.icon}>
										{icon}
									</span>
								) : (
									icon
								)}
							</div>
						</div>
					)}

					{/* Title */}
					{title && (
						<h3
							className={cn(
								'text-heading font-bold',
								variantStyles.title,
								layout === 'with-icon'
									? 'mb-1'
									: 'mb-2 text-center',
							)}
						>
							{title}
						</h3>
					)}

					{/* Description */}
					{description && (
						<p
							className={cn(
								'text-muted leading-relaxed',
								variantStyles.description,
								layout === 'simple' ? 'text-center' : '',
							)}
						>
							{description}
						</p>
					)}

					{/* Children content */}
					{children}
				</div>

				{/* Actions/Footer */}
				{actions && <div className="mt-auto">{actions}</div>}
			</div>

			{/* Hover indicator bar */}
			{color && (
				<div
					className="absolute right-0 bottom-0 left-0 h-1 origin-left scale-x-0 transform rounded-b-2xl transition-transform duration-300 group-hover:scale-x-100"
					style={{ backgroundColor: color }}
				/>
			)}
		</div>
	)
}

/**
 * Card variants as separate components for convenience
 */
export const MiniCard: React.FC<Omit<BaseCardProps, 'variant'>> = props => (
	<BaseCard {...props} variant="mini" />
)

export const CompactCard: React.FC<Omit<BaseCardProps, 'variant'>> = props => (
	<BaseCard {...props} variant="compact" />
)

export const StandardCard: React.FC<Omit<BaseCardProps, 'variant'>> = props => (
	<BaseCard {...props} variant="standard" />
)

export const LargeCard: React.FC<Omit<BaseCardProps, 'variant'>> = props => (
	<BaseCard {...props} variant="large" />
)
