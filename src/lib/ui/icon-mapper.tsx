import type { LucideIcon, LucideProps } from 'lucide-react'
import {
	Activity,
	CheckCircle,
	Code,
	Eye,
	Gauge,
	Headphones,
	Lock,
	MousePointer,
	Package,
	Palette,
	Search,
	Shield,
	ShoppingCart,
	Smartphone,
	Zap,
} from 'lucide-react'
import type { ReactElement } from 'react'

/**
 * Centralized icon mapping for consistent icon usage across the application
 */

// All supported icon names
type IconName =
	// Quality icons
	| 'shield'
	| 'check'
	| 'activity'
	| 'lock'
	// SEO icons
	| 'zap'
	| 'smartphone'
	| 'code'
	| 'search'
	// Performance icons
	| 'eye'
	| 'mouse-pointer'
	| 'gauge'
	| 'package'
	// Service icons
	| 'shopping-cart'
	| 'palette'
	| 'headphones'

// Icon mapping record
const ICON_MAP: Record<IconName, LucideIcon> = {
	// Quality icons
	shield: Shield,
	check: CheckCircle,
	activity: Activity,
	lock: Lock,
	// SEO icons
	zap: Zap,
	smartphone: Smartphone,
	code: Code,
	search: Search,
	// Performance icons
	eye: Eye,
	'mouse-pointer': MousePointer,
	gauge: Gauge,
	package: Package,
	// Service icons
	'shopping-cart': ShoppingCart,
	palette: Palette,
	headphones: Headphones,
}

interface RenderIconOptions extends Omit<LucideProps, 'ref'> {
	fallback?: LucideIcon
}

/**
 * Renders an icon component from the icon map
 *
 * @param iconName - The name of the icon to render
 * @param options - Lucide icon props (className, size, color, etc.) and fallback icon
 * @returns JSX element of the icon
 *
 * @example
 * ```tsx
 * renderIcon('shield', { className: 'h-5 w-5 text-green-500' })
 * renderIcon('zap', { style: { color: '#00ff00' } })
 * renderIcon('unknown', { fallback: CheckCircle })
 * ```
 */
export const renderIcon = (
	iconName: IconName | string,
	options: RenderIconOptions = {},
): ReactElement => {
	const { fallback = CheckCircle, ...iconProps } = options
	const Icon = ICON_MAP[iconName as IconName] ?? fallback
	return <Icon {...iconProps} />
}

/**
 * Type-safe way to get an icon component from the map
 *
 * @param iconName - The name of the icon
 * @param fallback - Fallback icon if not found
 * @returns The icon component
 *
 * @example
 * ```tsx
 * const Icon = getIconComponent('shield')
 * return <Icon className="h-5 w-5" />
 * ```
 */
export const getIconComponent = (
	iconName: IconName | string,
	fallback: LucideIcon = CheckCircle,
): LucideIcon => {
	return ICON_MAP[iconName as IconName] ?? fallback
}

export type { IconName }
