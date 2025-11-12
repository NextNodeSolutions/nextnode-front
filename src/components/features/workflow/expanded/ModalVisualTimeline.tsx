import { CheckCircle2, Clock } from 'lucide-react'
import { motion } from 'motion/react'

import { cn } from '@/lib/core/utils'

interface ModalVisualTimelineProps {
	/** Section title (e.g., "Timeline") */
	title: string

	/** Duration label (e.g., "Duration:") */
	durationLabel: string

	/** Duration value (e.g., "2-3 weeks") */
	duration: string

	/** Array of milestone descriptions */
	milestones: readonly string[]

	/** Accent color for visual elements */
	accentColor: string
}

/**
 * ModalVisualTimeline - Simple clean timeline
 *
 * Features:
 * - Clean vertical timeline
 * - Simple badges with numbers
 * - Readable milestone cards
 * - Minimal animations
 */
export const ModalVisualTimeline = ({
	title,
	durationLabel,
	duration,
	milestones,
	accentColor,
}: ModalVisualTimelineProps) => {
	return (
		<motion.div className="space-y-6">
			{/* Section Header */}
			<div className="flex flex-wrap items-center justify-between gap-4">
				<div className="flex items-center gap-2.5">
					<Clock
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
							'text-gray-900',
						)}
					>
						{title}
					</h3>
				</div>

				{/* Duration Badge - Simple */}
				<div
					className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium"
					style={{
						backgroundColor: `${accentColor}10`,
						color: accentColor,
					}}
				>
					<Clock className="h-4 w-4" aria-hidden="true" />
					<span>
						{durationLabel} {duration}
					</span>
				</div>
			</div>

			{/* Timeline - Simple Vertical List */}
			<div className="space-y-4">
				{milestones.map((milestone, index) => (
					<MilestoneCard
						key={milestone}
						milestone={milestone}
						index={index}
						total={milestones.length}
						accentColor={accentColor}
					/>
				))}
			</div>
		</motion.div>
	)
}

/**
 * Individual Milestone Card - Minimal & Clean
 */
const MilestoneCard = ({
	milestone,
	index,
	total,
	accentColor,
}: {
	milestone: string
	index: number
	total: number
	accentColor: string
}) => {
	const isLast = index === total - 1

	return (
		<motion.div>
			<div className="flex gap-4">
				{/* Node & Line */}
				<div className="flex flex-col items-center">
					{/* Simple Badge - compact */}
					<div
						className={cn(
							'flex h-8 w-8 items-center justify-center rounded-full',
							'text-xs font-bold text-white',
						)}
						style={{ backgroundColor: accentColor }}
					>
						{isLast ? (
							<CheckCircle2
								className="h-4 w-4"
								aria-hidden="true"
							/>
						) : (
							<span>{index + 1}</span>
						)}
					</div>

					{/* Connecting Line */}
					{!isLast && (
						<div
							className="w-px flex-1 bg-gray-300"
							style={{ minHeight: '1.5rem' }}
							aria-hidden="true"
						/>
					)}
				</div>

				{/* Content */}
				<div className="flex-1 pb-4">
					<p
						className={cn(
							'text-xs leading-relaxed',
							'text-gray-700',
						)}
					>
						{milestone}
					</p>
				</div>
			</div>
		</motion.div>
	)
}
