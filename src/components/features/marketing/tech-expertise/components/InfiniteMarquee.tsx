import { cva } from 'class-variance-authority'
import { motion } from 'motion/react'

import { cn } from '@/lib/core/utils'

interface InfiniteMarqueeProps {
	readonly items: readonly string[]
}

// Animation configuration constants
const ANIMATION_CONFIG = {
	distance: 50,
	duration: 20,
} as const

// CVA variants for gradient overlays
const gradientVariants = cva(
	'from-brand-charcoal/50 absolute top-0 z-10 h-full w-12 to-transparent',
	{
		variants: {
			position: {
				left: 'left-0 bg-gradient-to-r',
				right: 'right-0 bg-gradient-to-l',
			},
		},
	},
)

// Reusable badge indicator component
const MarqueeBadge = () => (
	<div className="bg-brand-green/20 h-1.5 w-1.5 rounded-full" />
)

/**
 * Infinite horizontal scrolling marquee component
 * Displays items in a continuous loop with fade-out edges
 */
const InfiniteMarquee = ({ items }: InfiniteMarqueeProps) => {
	const itemsWithIds = items.map((item, idx) => ({
		id: `${item}-${idx}`,
		text: item,
	}))
	const duplicatedItems = [
		...itemsWithIds,
		...itemsWithIds.map(item => ({ ...item, id: `${item.id}-dup` })),
	]

	return (
		<div className="relative w-full overflow-hidden">
			{/* Left fade gradient */}
			<div className={gradientVariants({ position: 'left' })} />
			{/* Right fade gradient */}
			<div className={gradientVariants({ position: 'right' })} />

			{/* Animated marquee content */}
			<motion.div
				className="flex gap-4"
				animate={{
					x: [0, -ANIMATION_CONFIG.distance * items.length],
				}}
				transition={{
					x: {
						repeat: Number.POSITIVE_INFINITY,
						repeatType: 'loop',
						duration: ANIMATION_CONFIG.duration,
						ease: 'linear',
					},
				}}
			>
				{duplicatedItems.map(item => (
					<div
						key={item.id}
						className={cn(
							'flex shrink-0 items-center gap-2 rounded-lg px-4 py-2',
							'from-brand-blue/10 to-brand-green/10 bg-gradient-to-r',
							'border-brand-blue/20 border',
							'text-sm whitespace-nowrap text-white',
						)}
					>
						<MarqueeBadge />
						{item.text}
					</div>
				))}
			</motion.div>
		</div>
	)
}

export default InfiniteMarquee
