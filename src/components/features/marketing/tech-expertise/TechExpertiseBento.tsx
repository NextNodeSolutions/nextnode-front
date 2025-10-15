import { motion } from 'motion/react'
import type { ReactNode } from 'react'

import { cn } from '@/lib/core/utils'

interface TechExpertiseBentoProps {
	readonly title: string
	readonly subtitle: string
	readonly children: ReactNode
}

/**
 * TechExpertiseBento - Pure layout component
 * Provides the Bento grid structure and section wrapper
 * Content is passed via children for maximum flexibility
 */
const TechExpertiseBento = ({
	title,
	subtitle,
	children,
}: TechExpertiseBentoProps) => {
	return (
		<section
			className={cn(
				'relative py-12 sm:py-18 lg:py-24',
				'from-brand-black via-brand-charcoal to-brand-black bg-gradient-to-br',
			)}
		>
			{/* Background pattern */}
			<div className="absolute inset-0 opacity-5">
				<div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
			</div>

			<div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
				{/* Section Header */}
				<div className="mb-16 text-center">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className={cn(
							'text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl',
							'mb-4 text-white',
						)}
					>
						{title}
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="mx-auto max-w-3xl text-lg text-gray-400"
					>
						{subtitle}
					</motion.p>
				</div>

				{/* Bento Grid - Content provided via children */}
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
					{children}
				</div>
			</div>
		</section>
	)
}

export default TechExpertiseBento
