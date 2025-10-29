import { FileText } from 'lucide-react'
import { motion } from 'motion/react'

import { cn } from '@/lib/core/utils'

import { PANEL_VARIANTS } from '../workflow-animation-config'

interface ModalOverviewPanelProps {
	/** Section title (e.g., "Overview") */
	title: string

	/** Full description content */
	description: string

	/** Accent color for visual elements */
	accentColor: string
}

/**
 * ModalOverviewPanel - Minimal overview section
 *
 * Features:
 * - Clean typography with icon
 * - Generous spacing
 * - Simple separator line
 * - Focus on readability
 */
export const ModalOverviewPanel = ({
	title,
	description,
	accentColor,
}: ModalOverviewPanelProps) => {
	return (
		<motion.div variants={PANEL_VARIANTS} className="space-y-4">
			{/* Section Header with Icon */}
			<div className="flex items-center gap-2.5">
				{/* Simple icon - smaller */}
				<FileText
					className="h-5 w-5 flex-shrink-0"
					style={{ color: accentColor }}
					aria-hidden="true"
				/>

				{/* Title - Balanced */}
				<h3
					className={cn(
						// Typography
						'font-bold tracking-tight',

						// Compact sizing
						'text-xl',
						'sm:text-2xl',
						'md:text-3xl',

						// Colors
						'text-gray-900 dark:text-gray-50',
					)}
				>
					{title}
				</h3>
			</div>

			{/* Description - Very Compact */}
			<p
				className={cn(
					// Typography - very small
					'text-xs leading-relaxed',
					'sm:text-sm sm:leading-relaxed',

					// Colors
					'text-gray-700 dark:text-gray-300',
				)}
			>
				{description}
			</p>

			{/* Simple separator */}
			<div
				className="h-px w-full bg-gray-200 dark:bg-gray-800"
				aria-hidden="true"
			/>
		</motion.div>
	)
}
