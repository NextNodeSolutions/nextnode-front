import type { HTMLMotionProps } from 'motion/react'
import { motion } from 'motion/react'

import { cn } from '@/lib/core/utils'

import type { GlassPanelVariants } from './glass-panel-variants'
import { glassPanelVariants } from './glass-panel-variants'

interface GlassPanelProps
	extends Omit<HTMLMotionProps<'div'>, 'children'>,
		GlassPanelVariants {
	/** Panel content */
	children: React.ReactNode

	/** Additional CSS classes */
	className?: string

	/** Optional Framer Motion layout ID for morphing animations */
	layoutId?: string

	/** Optional custom style object */
	style?: React.CSSProperties

	/** ARIA label for accessibility */
	'aria-label'?: string

	/** ARIA role for semantic HTML */
	role?: string
}

/**
 * GlassPanel - Reusable Glassmorphic Container
 *
 * A flexible glassmorphic panel component with multiple variants for:
 * - Blur intensity (subtle → strong)
 * - Shadow elevation (flat → floating)
 * - Padding sizes (tight → generous)
 * - Interactive behaviors (lift, glow, scale)
 *
 * Uses CVA for variant management and Framer Motion for animations.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <GlassPanel intensity="medium" elevation="lifted">
 *   Content here
 * </GlassPanel>
 *
 * // Interactive card
 * <GlassPanel
 *   intensity="strong"
 *   elevation="floating"
 *   interactive="lift"
 *   onClick={handleClick}
 * >
 *   Click me!
 * </GlassPanel>
 *
 * // With layout morphing
 * <GlassPanel layoutId="hero-card" layout>
 *   Morphing content
 * </GlassPanel>
 * ```
 */
export const GlassPanel = ({
	children,
	className,
	intensity,
	elevation,
	padding,
	borderStyle,
	interactive,
	layoutId,
	style,
	'aria-label': ariaLabel,
	role,
	...motionProps
}: GlassPanelProps) => {
	return (
		<motion.div
			layoutId={layoutId}
			className={cn(
				glassPanelVariants({
					intensity,
					elevation,
					padding,
					borderStyle,
					interactive,
				}),
				className,
			)}
			style={style}
			aria-label={ariaLabel}
			role={role}
			{...motionProps}
		>
			{children}
		</motion.div>
	)
}
