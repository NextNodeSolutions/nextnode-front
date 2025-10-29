import type { LucideIcon } from 'lucide-react'
import { Cloud, FileCode, Package, Palette } from 'lucide-react'
import { motion } from 'motion/react'

import { cn } from '@/lib/core/utils'

import { STAGGER_CONFIG, STAGGER_VARIANTS } from '../workflow-animation-config'

interface Deliverable {
	name: string
	description: string
	type: string
}

interface ModalDeliverablesListProps {
	/** Section title (e.g., "What You Get") */
	title: string

	/** Array of deliverables */
	deliverables: readonly Deliverable[]

	/** Accent color for visual elements */
	accentColor: string
}

/**
 * Icon mapping for deliverable types (replacing emojis)
 */
const TYPE_ICON_MAP: Record<string, LucideIcon> = {
	document: FileCode,
	code: FileCode,
	asset: Palette,
	service: Cloud,
}

/**
 * Get Lucide icon component for deliverable type
 */
const getDeliverableIcon = (type: string): LucideIcon => {
	return TYPE_ICON_MAP[type] ?? Package
}

/**
 * ModalDeliverablesList - Minimal deliverable cards
 *
 * Features:
 * - Clean 2-column grid
 * - Simple badges with icons
 * - Focus on content
 * - Smooth animations
 */
export const ModalDeliverablesList = ({
	title,
	deliverables,
	accentColor,
}: ModalDeliverablesListProps) => {
	return (
		<motion.div variants={STAGGER_VARIANTS} className="space-y-6">
			{/* Section Header */}
			<div className="flex items-center gap-2.5">
				<Package
					className="h-5 w-5 flex-shrink-0"
					style={{ color: accentColor }}
					aria-hidden="true"
				/>

				<h3
					className={cn(
						'font-bold tracking-tight',
						'text-xl',
						'sm:text-2xl',
						'md:text-3xl',
						'text-gray-900 dark:text-gray-50',
					)}
				>
					{title}
				</h3>
			</div>

			{/* Deliverables Grid */}
			<motion.div
				variants={{
					visible: {
						transition: STAGGER_CONFIG.fast,
					},
				}}
				className={cn(
					'grid gap-4 sm:gap-6',
					'grid-cols-1',
					'md:grid-cols-2',
				)}
			>
				{deliverables.map((deliverable, index) => (
					<DeliverableCard
						key={deliverable.name}
						deliverable={deliverable}
						accentColor={accentColor}
						index={index}
					/>
				))}
			</motion.div>
		</motion.div>
	)
}

/**
 * Individual Deliverable Card - Minimal & Clean
 */
const DeliverableCard = ({
	deliverable,
	accentColor,
	index,
}: {
	deliverable: Deliverable
	accentColor: string
	index: number
}) => {
	const Icon = getDeliverableIcon(deliverable.type)

	return (
		<motion.div variants={STAGGER_VARIANTS} custom={index}>
			<div
				className={cn(
					// Structure - compact
					'h-full rounded-lg p-4',
					'space-y-2.5',

					// Simple background
					'bg-white dark:bg-gray-900',

					// Border
					'border border-gray-200 dark:border-gray-800',

					// Hover
					'transition-all duration-200',
					'hover:border-gray-300 dark:hover:border-gray-700',
				)}
			>
				{/* Header with title and badge */}
				<div className="flex items-start justify-between gap-3">
					<h4
						className={cn(
							'flex-1 text-sm font-semibold',
							'text-gray-900 dark:text-gray-50',
						)}
					>
						{deliverable.name}
					</h4>

					{/* Simple badge */}
					<div
						className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium"
						style={{
							backgroundColor: `${accentColor}10`,
							color: accentColor,
						}}
					>
						<Icon className="h-3 w-3" aria-hidden="true" />
						<span className="capitalize">{deliverable.type}</span>
					</div>
				</div>

				{/* Description */}
				<p
					className={cn(
						'text-xs leading-relaxed',
						'text-gray-600 dark:text-gray-400',
					)}
				>
					{deliverable.description}
				</p>
			</div>
		</motion.div>
	)
}
