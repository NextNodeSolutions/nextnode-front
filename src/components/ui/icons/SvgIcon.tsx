/**
 * LucideIcon - Reusable icon component using lucide-react
 * Consolidates icon patterns with better performance through object mapping
 */

import React from 'react'

import {
	ChevronDown,
	ChevronUp,
	ArrowRight,
	Check,
	X,
	Menu,
	Plus,
	Minus,
	MessageCircle,
	Zap,
	Lock,
	Link,
	CheckCircle,
	Target,
	Clipboard,
	TrendingUp,
	Mail,
	type LucideIcon as LucideIconType,
} from 'lucide-react'

import { cn } from '@/lib/core/utils'

export type IconName =
	| 'chevron-down'
	| 'chevron-up'
	| 'arrow-right'
	| 'check'
	| 'x'
	| 'menu'
	| 'plus'
	| 'minus'
	| 'message-circle'
	| 'zap'
	| 'lock'
	| 'link'
	| 'check-circle'
	| 'target'
	| 'clipboard'
	| 'trending-up'
	| 'mail'

export interface LucideIconProps {
	/** Icon name */
	name: IconName
	/** Icon size */
	size?: 'sm' | 'md' | 'lg' | 'xl'
	/** Additional className */
	className?: string
	/** Stroke width */
	strokeWidth?: number
}

const sizeClasses = {
	sm: 'h-4 w-4',
	md: 'h-6 w-6',
	lg: 'h-8 w-8',
	xl: 'h-10 w-10',
} as const

// Performance-optimized icon mapping object
const icons: Record<IconName, LucideIconType> = {
	'chevron-down': ChevronDown,
	'chevron-up': ChevronUp,
	'arrow-right': ArrowRight,
	check: Check,
	x: X,
	menu: Menu,
	plus: Plus,
	minus: Minus,
	'message-circle': MessageCircle,
	zap: Zap,
	lock: Lock,
	link: Link,
	'check-circle': CheckCircle,
	target: Target,
	clipboard: Clipboard,
	'trending-up': TrendingUp,
	mail: Mail,
}

export const LucideIcon: React.FC<LucideIconProps> = ({
	name,
	size = 'md',
	className,
	strokeWidth = 2,
}) => {
	const Icon = icons[name]

	return (
		<Icon
			className={cn(sizeClasses[size], className)}
			strokeWidth={strokeWidth}
		/>
	)
}

// Backward compatibility alias
export const SvgIcon = LucideIcon
export type SvgIconProps = LucideIconProps
