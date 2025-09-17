import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/core/utils'

import type { GlassmorphicStyle, ModalOverlayStyle } from '@/types/workflow'

/**
 * Generates basic glassmorphic styles
 * @param opacity - Background opacity (default 0.05)
 * @param blur - Blur intensity (default 20px)
 * @returns Glassmorphic style
 */
export function createGlassmorphicStyle(
	opacity = 0.05,
	blur = 20,
): GlassmorphicStyle {
	return {
		background:
			opacity === 0.3
				? 'var(--glass-white-30)'
				: opacity === 0.5
					? 'var(--glass-white-50)'
					: `rgba(255,255,255,${opacity})`,
		backdropFilter: `blur(${blur}px)`,
		WebkitBackdropFilter: `blur(${blur}px)`,
		boxShadow:
			'0 25px 50px -12px var(--shadow-color-dark), 0 0 0 1px var(--glass-white-20)',
	}
}

/**
 * Generates colored overlay with gradient
 * @param color - Main color (hex or rgb format)
 * @param opacity - Color opacity (default 40 for 40%)
 * @returns Colored overlay style
 */
export function createColoredOverlay(
	color: string,
	opacity = 40,
): ModalOverlayStyle {
	return {
		background: `linear-gradient(135deg, rgba(255,255,255,0.3) 0%, ${color}${opacity} 100%)`,
	}
}

/**
 * Generates white overlay for readability
 * @param opacity - White overlay opacity (default 0.75)
 * @returns White overlay style
 */
export function createReadabilityOverlay(opacity = 0.75): ModalOverlayStyle {
	return {
		background:
			opacity === 0.75
				? 'var(--glass-white-75)'
				: `rgba(255,255,255,${opacity})`,
	}
}

/**
 * Complete glassmorphism configuration for modals
 * @param color - Main color
 * @param options - Configuration options
 * @returns Object with all necessary styles
 */
export function createModalGlassmorphism(
	color: string,
	options: {
		baseOpacity?: number
		blur?: number
		colorOpacity?: number
		readabilityOpacity?: number
	} = {},
): {
	container: GlassmorphicStyle
	coloredOverlay: ModalOverlayStyle
	readabilityOverlay: ModalOverlayStyle
} {
	const {
		baseOpacity = 0.05,
		blur = 20,
		colorOpacity = 40,
		readabilityOpacity = 0.75,
	} = options

	return {
		container: createGlassmorphicStyle(baseOpacity, blur),
		coloredOverlay: createColoredOverlay(color, colorOpacity),
		readabilityOverlay: createReadabilityOverlay(readabilityOpacity),
	}
}

/**
 * Glassmorphism variants using CVA
 */
export const glassmorphismVariants = cva(
	'backdrop-blur-sm border border-white/10',
	{
		variants: {
			intensity: {
				light: 'bg-white/10 dark:bg-white/5',
				medium: 'bg-white/20 dark:bg-white/10',
				strong: 'bg-white/30 dark:bg-white/15',
				intense: 'bg-white/40 dark:bg-white/20',
			},
			blur: {
				sm: 'backdrop-blur-sm',
				md: 'backdrop-blur-md',
				lg: 'backdrop-blur-lg',
				xl: 'backdrop-blur-xl',
			},
			shape: {
				rounded: 'rounded-lg',
				xl: 'rounded-xl',
				'2xl': 'rounded-2xl',
				full: 'rounded-full',
			},
			shadow: {
				none: '',
				sm: 'shadow-sm',
				md: 'shadow-md',
				lg: 'shadow-lg',
				xl: 'shadow-xl',
				'2xl': 'shadow-2xl',
			},
			ring: {
				none: 'ring-0',
				light: 'ring-1 ring-white/10',
				medium: 'ring-1 ring-white/20',
				strong: 'ring-1 ring-white/30',
			},
		},
		defaultVariants: {
			intensity: 'medium',
			blur: 'md',
			shape: 'xl',
			shadow: 'lg',
			ring: 'medium',
		},
	},
)

export type GlassmorphismProps = VariantProps<typeof glassmorphismVariants>

/**
 * Helper function to generate glassmorphism classes
 */
export function createGlassmorphismClass({
	intensity,
	blur,
	shape,
	shadow,
	ring,
	className,
}: GlassmorphismProps & { className?: string } = {}): string {
	return cn(
		glassmorphismVariants({
			intensity,
			blur,
			shape,
			shadow,
			ring,
		}),
		className,
	)
}

/**
 * Predefined glassmorphism presets
 */
export const GLASSMORPHISM_PRESETS = {
	modal: {
		intensity: 'strong' as const,
		blur: 'lg' as const,
		shape: '2xl' as const,
		shadow: '2xl' as const,
		ring: 'strong' as const,
	},
	card: {
		intensity: 'medium' as const,
		blur: 'md' as const,
		shape: 'xl' as const,
		shadow: 'lg' as const,
		ring: 'light' as const,
	},
	button: {
		intensity: 'light' as const,
		blur: 'sm' as const,
		shape: 'rounded' as const,
		shadow: 'md' as const,
		ring: 'medium' as const,
	},
	header: {
		intensity: 'medium' as const,
		blur: 'md' as const,
		shape: 'rounded' as const,
		shadow: 'sm' as const,
		ring: 'light' as const,
	},
} as const
