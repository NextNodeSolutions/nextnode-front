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
		background: `rgba(255,255,255,${opacity})`,
		backdropFilter: `blur(${blur}px)`,
		WebkitBackdropFilter: `blur(${blur}px)`,
		boxShadow:
			'0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.2)',
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
		background: `rgba(255,255,255,${opacity})`,
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
 * Standard glassmorphism Tailwind classes
 */
export const GLASSMORPHIC_CLASSES = {
	container:
		'backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 ring-1 ring-white/20',
	light: 'backdrop-blur-sm bg-white/50 ring-1 ring-white/30',
	strong: 'backdrop-blur-md bg-white/20 ring-1 ring-white/10',
	rounded: 'rounded-xl',
	shadow: 'shadow-lg',
} as const
