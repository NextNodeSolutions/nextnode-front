import React from 'react'

import { motion } from 'motion/react'

import { cn } from '@/lib/core/utils'
import { useI18n } from '@/lib/i18n/I18nReact'

import { getStepIllustration } from '../illustrations'

import type { ExpandedCardModalProps } from '@/types/workflow'

// Type icon mapping for deliverables
const TYPE_ICONS: Record<string, string> = {
	document: '📄',
	code: '💻',
	asset: '🎨',
	service: '☁️',
}

/**
 * ExpandedCardModal - Full-screen modal with rich step content
 * Displays detailed information about a workflow step with:
 * - Animated entry/exit
 * - Rich descriptions and benefits
 * - Deliverables and timeline
 * - Custom illustration per step
 * - CTA button with link
 */
export const ExpandedCardModal = ({
	isOpen,
	onClose,
	stepData,
	stepKey,
}: ExpandedCardModalProps) => {
	// Use i18n hook for translations
	const { t } = useI18n()

	const { accentColor, deliverables, timeline } = stepData

	// Close on Escape key
	React.useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}
		if (isOpen) {
			window.addEventListener('keydown', handleEscape)
			document.body.style.overflow = 'hidden'
		}
		return () => {
			window.removeEventListener('keydown', handleEscape)
			document.body.style.overflow = ''
		}
	}, [isOpen, onClose])

	if (!isOpen) return null

	const Illustration = getStepIllustration(stepKey)

	return (
		<>
			{/* Backdrop */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
				onClick={onClose}
			/>

			{/* Modal Content */}
			<motion.div
				initial={{ opacity: 0, scale: 0.95, y: 20 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				exit={{ opacity: 0, scale: 0.95, y: 20 }}
				transition={{ type: 'spring', duration: 0.5 }}
				className={cn(
					'fixed top-1/2 left-1/2 z-50',
					'max-h-[90vh] w-[90vw] max-w-4xl -translate-x-1/2 -translate-y-1/2',
					'overflow-y-auto rounded-2xl',
					'bg-white/85 backdrop-blur-md dark:bg-gray-900/85',
					'shadow-2xl',
				)}
				onClick={e => e.stopPropagation()}
			>
				{/* Header with Illustration */}
				<div
					className="relative p-8"
					style={{
						background: `linear-gradient(135deg, ${accentColor}15 0%, ${accentColor}05 100%)`,
					}}
				>
					<div className="flex items-start gap-6">
						{/* Illustration */}
						<div className="h-32 w-32 flex-shrink-0">
							<Illustration />
						</div>

						{/* Title & Description */}
						<div className="flex-1">
							<h2
								className="mb-2 text-3xl font-bold"
								style={{ color: accentColor }}
							>
								{stepData.title}
							</h2>
							<p className="text-lg text-gray-600 dark:text-gray-300">
								{stepData.shortDescription}
							</p>
						</div>

						{/* Close Button */}
						<button
							type="button"
							onClick={onClose}
							className={cn(
								'flex h-10 w-10 items-center justify-center rounded-full',
								'transition-all hover:scale-110',
								'bg-gray-100 hover:bg-gray-200',
								'dark:bg-gray-800 dark:hover:bg-gray-700',
							)}
							style={
								{
									boxShadow: `0 2px 8px ${accentColor}30`,
								} as React.CSSProperties
							}
							aria-label={t('workflow.modal.closeModal')}
						>
							<svg
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
				</div>

				{/* Body Content */}
				<div className="space-y-8 p-8">
					{/* Full Description */}
					<Section>
						<SectionTitle>
							{t('workflow.modal.overview')}
						</SectionTitle>
						<p className="leading-relaxed text-gray-700 dark:text-gray-300">
							{stepData.fullDescription}
						</p>
					</Section>

					{/* Benefits */}
					{stepData.benefits.length > 0 && (
						<Section>
							<SectionTitle>
								{t('workflow.modal.keyBenefits')}
							</SectionTitle>
							<div className="space-y-4">
								{stepData.benefits.map(benefit => (
									<BenefitCard
										key={benefit.title}
										benefit={benefit}
										accentColor={accentColor}
									/>
								))}
							</div>
						</Section>
					)}

					{/* Deliverables */}
					{deliverables.length > 0 && (
						<Section>
							<SectionTitle>
								{t('workflow.modal.whatYouGet')}
							</SectionTitle>
							<div className="grid gap-4 md:grid-cols-2">
								{deliverables.map(deliverable => (
									<DeliverableCard
										key={deliverable.name}
										deliverable={deliverable}
										accentColor={accentColor}
									/>
								))}
							</div>
						</Section>
					)}

					{/* Timeline */}
					<Section>
						<SectionTitle>
							{t('workflow.modal.timeline')}
						</SectionTitle>
						<VisualTimeline
							duration={timeline.duration}
							milestones={timeline.milestones}
							accentColor={accentColor}
							durationLabel={t('workflow.modal.duration')}
						/>
					</Section>
				</div>
			</motion.div>
		</>
	)
}

// Helper Components
const Section = ({ children }: { children: React.ReactNode }) => (
	<div className="space-y-4">{children}</div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
	<h3 className="text-2xl font-bold text-gray-900 dark:text-white">
		{children}
	</h3>
)

const BenefitCard = ({
	benefit,
	accentColor,
}: {
	benefit: { id?: string; title: string; description: string; icon: string }
	accentColor: string
}) => (
	<div
		className={cn(
			'flex gap-4 rounded-lg p-5',
			'bg-gray-50/70 backdrop-blur-sm dark:bg-gray-800/70',
			'border-l-4 shadow-sm',
			'transition-all duration-200',
			'hover:scale-[1.01] hover:shadow-md',
		)}
		style={{ borderLeftColor: accentColor }}
	>
		<span className="flex-shrink-0 text-3xl">{benefit.icon}</span>
		<div className="flex-1">
			<h4 className="mb-1 font-semibold text-gray-900 dark:text-white">
				{benefit.title}
			</h4>
			<p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
				{benefit.description}
			</p>
		</div>
	</div>
)

const DeliverableCard = ({
	deliverable,
	accentColor,
}: {
	deliverable: { name: string; description: string; type: string }
	accentColor: string
}) => {
	const typeIcon = TYPE_ICONS[deliverable.type] || '📦'

	return (
		<div
			className={cn(
				'rounded-lg border-2 p-5',
				'bg-white/50 backdrop-blur-sm dark:bg-gray-900/50',
				'transition-all duration-200',
				'hover:scale-[1.02] hover:shadow-lg',
			)}
			style={{ borderColor: `${accentColor}30` }}
		>
			<div className="mb-3 flex items-start justify-between gap-3">
				<h4 className="font-semibold text-gray-900 dark:text-white">
					{deliverable.name}
				</h4>
				<span
					className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-white"
					style={{ backgroundColor: accentColor }}
				>
					<span>{typeIcon}</span>
					<span className="capitalize">{deliverable.type}</span>
				</span>
			</div>
			<p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
				{deliverable.description}
			</p>
		</div>
	)
}

const VisualTimeline = ({
	duration,
	milestones,
	accentColor,
	durationLabel,
}: {
	duration: string
	milestones: readonly string[]
	accentColor: string
	durationLabel: string
}) => (
	<div className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 dark:from-gray-800 dark:to-gray-900">
		<p
			className="mb-6 text-lg font-semibold"
			style={{ color: accentColor }}
		>
			{durationLabel}: {duration}
		</p>
		<div className="relative">
			{milestones.map((milestone, index) => (
				<div key={milestone} className="relative pb-8 last:pb-0">
					{/* Vertical line connecting milestones */}
					{index < milestones.length - 1 && (
						<div
							className="absolute top-8 left-3 h-full w-0.5"
							style={{
								backgroundColor: `${accentColor}30`,
							}}
						/>
					)}

					{/* Milestone card */}
					<div className="relative flex items-start gap-4">
						{/* Numbered badge */}
						<div
							className="relative z-10 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-md"
							style={{
								backgroundColor: accentColor,
							}}
						>
							{index + 1}
						</div>

						{/* Milestone content */}
						<div className="flex-1 rounded-lg bg-white/50 p-3 shadow-sm backdrop-blur-sm dark:bg-gray-700/50">
							<p className="text-sm leading-relaxed font-medium text-gray-800 dark:text-gray-200">
								{milestone}
							</p>
						</div>
					</div>
				</div>
			))}
		</div>
	</div>
)
