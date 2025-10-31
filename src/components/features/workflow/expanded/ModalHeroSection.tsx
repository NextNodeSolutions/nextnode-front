import { X } from 'lucide-react'
import { motion } from 'motion/react'
import type { ComponentType } from 'react'

import { cn } from '@/lib/core/utils'

import { HERO_VARIANTS } from '../workflow-animation-config'

interface ModalHeroSectionProps {
	/** Step title */
	title: string

	/** Short description */
	description: string

	/** Accent color for step (hex) */
	accentColor: string

	/** Illustration component */
	Illustration: ComponentType<{ color?: string }>

	/** Close button click handler */
	onClose: () => void

	/** Close button aria label */
	closeLabel: string
}

/**
 * ModalHeroSection - Minimal Hero with XXL Typography
 *
 * Features:
 * - Centered layout with generous spacing
 * - Giant typography (text-7xl to text-8xl)
 * - Simple clean close button
 * - Subtle background color
 * - Editorial style (Stripe/Notion inspired)
 */
export const ModalHeroSection = ({
	title,
	description,
	accentColor,
	Illustration,
	onClose,
	closeLabel,
}: ModalHeroSectionProps) => {
	return (
		<motion.div
			variants={HERO_VARIANTS}
			initial="hidden"
			animate="visible"
			className={cn(
				// Base: structure
				'relative',

				// Compact padding
				'px-6 pt-8 pb-6',
				'sm:px-8 sm:pt-10 sm:pb-8',
				'md:px-10 md:pt-12 md:pb-10',
				'lg:px-12 lg:pt-12 lg:pb-10',
			)}
			style={{
				// Subtle background color (5% tint only)
				backgroundColor: `${accentColor}05`,
			}}
		>
			{/* Close Button - Simple, Top Right */}
			<motion.button
				type="button"
				onClick={onClose}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className={cn(
					// Position
					'absolute top-4 right-4',
					'z-10',

					// Size & shape
					'flex h-8 w-8 items-center justify-center',
					'rounded-full',

					// Style - simple and clean
					'bg-gray-100 hover:bg-gray-200',
					'dark:bg-gray-800 dark:hover:bg-gray-700',

					// Icon color
					'text-gray-600 dark:text-gray-400',

					// Transition
					'transition-colors duration-200',

					// Focus
					'focus:ring-2 focus:ring-offset-2 focus:outline-none',
				)}
				style={{
					// @ts-expect-error - CSS custom property for focus ring
					'--tw-ring-color': accentColor,
				}}
				aria-label={closeLabel}
			>
				<X className="h-4 w-4" aria-hidden="true" />
			</motion.button>

			{/* Content: Centered, Vertical Stack */}
			<div className="mx-auto max-w-4xl space-y-4 text-center">
				{/* Illustration - Compact */}
				<motion.div
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ delay: 0.1, duration: 0.5 }}
					className={cn(
						'mx-auto',

						// Compact sizing
						'h-16 w-16',
						'sm:h-20 sm:w-20',
						'md:h-24 md:w-24',
					)}
				>
					<Illustration color={accentColor} />
				</motion.div>

				{/* Title - Balanced Size */}
				<motion.h2
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.5 }}
					className={cn(
						// Typography - bold but not excessive
						'leading-tight font-bold tracking-tight',

						// Balanced sizing
						'text-2xl',
						'sm:text-3xl',
						'md:text-4xl',
					)}
					style={{ color: accentColor }}
				>
					{title}
				</motion.h2>

				{/* Description - Readable Size */}
				<motion.p
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.3, duration: 0.5 }}
					className={cn(
						// Constrain width for readability
						'mx-auto max-w-2xl',

						// Typography - comfortable sizing
						'text-sm leading-relaxed',
						'sm:text-base sm:leading-relaxed',
						'md:text-lg md:leading-relaxed',

						// Colors - subtle text
						'text-gray-600 dark:text-gray-400',
					)}
				>
					{description}
				</motion.p>
			</div>
		</motion.div>
	)
}
