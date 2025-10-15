import { motion } from 'motion/react'

import { cn } from '@/lib/core/utils'

interface InfiniteMarqueeProps {
	readonly items: readonly string[]
	readonly direction?: 'horizontal' | 'vertical'
}

/**
 * Infinite scrolling marquee component
 * Supports both horizontal and vertical directions
 */
const InfiniteMarquee = ({
	items,
	direction = 'horizontal',
}: InfiniteMarqueeProps) => {
	const itemsWithIds = items.map((item, idx) => ({
		id: `${item}-${idx}`,
		text: item,
	}))
	const duplicatedItems = [
		...itemsWithIds,
		...itemsWithIds.map(item => ({ ...item, id: `${item.id}-dup` })),
	]

	if (direction === 'vertical') {
		return (
			<div className="relative h-full overflow-hidden">
				<div className="from-brand-charcoal/50 absolute top-0 left-0 z-10 h-12 w-full bg-gradient-to-b to-transparent" />
				<div className="from-brand-charcoal/50 absolute bottom-0 left-0 z-10 h-12 w-full bg-gradient-to-t to-transparent" />
				<motion.div
					className="flex flex-col gap-3"
					animate={{
						y: [0, -40 * items.length],
					}}
					transition={{
						y: {
							repeat: Number.POSITIVE_INFINITY,
							repeatType: 'loop',
							duration: 15,
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
								'text-sm text-white',
							)}
						>
							<div className="bg-brand-green/20 h-1.5 w-1.5 rounded-full" />
							{item.text}
						</div>
					))}
				</motion.div>
			</div>
		)
	}

	return (
		<div className="relative w-full overflow-hidden">
			<div className="from-brand-charcoal/50 absolute top-0 left-0 z-10 h-full w-12 bg-gradient-to-r to-transparent" />
			<div className="from-brand-charcoal/50 absolute top-0 right-0 z-10 h-full w-12 bg-gradient-to-l to-transparent" />
			<motion.div
				className="flex gap-4"
				animate={{
					x: [0, -50 * items.length],
				}}
				transition={{
					x: {
						repeat: Number.POSITIVE_INFINITY,
						repeatType: 'loop',
						duration: 20,
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
						<div className="bg-brand-green/20 h-1.5 w-1.5 rounded-full" />
						{item.text}
					</div>
				))}
			</motion.div>
		</div>
	)
}

export default InfiniteMarquee
