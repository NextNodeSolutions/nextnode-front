import React from 'react'

import { motion } from 'motion/react'

import { cn } from '@/lib/core/utils'
import { useI18n } from '@/lib/i18n/I18nReact'

import { getStepIllustration } from '../illustrations'

import type { ExpandedCardModalProps } from '@/types/workflow'

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

	const { accentColor, deliverables, timeline, ctaText, ctaLink } = stepData

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
					'bg-white dark:bg-gray-900',
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
						<div className="rounded-xl bg-gray-50 p-6 dark:bg-gray-800">
							<p
								className="mb-4 text-lg font-semibold"
								style={{ color: accentColor }}
							>
								{t('workflow.modal.duration')}:{' '}
								{timeline.duration}
							</p>
							<ul className="space-y-2">
								{timeline.milestones.map((milestone, index) => (
									<li
										key={milestone}
										className="flex items-start gap-3"
									>
										<span
											className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
											style={{
												backgroundColor: accentColor,
											}}
										>
											{index + 1}
										</span>
										<span className="text-gray-700 dark:text-gray-300">
											{milestone}
										</span>
									</li>
								))}
							</ul>
						</div>
					</Section>
				</div>

				{/* Footer CTA */}
				{ctaText && ctaLink && (
					<ModalFooter
						ctaText={ctaText}
						ctaLink={ctaLink}
						accentColor={accentColor}
					/>
				)}
			</motion.div>
		</>
	)
}

// Helper Components
const Section = ({ children }: { children: React.ReactNode }) => (
	<div className="space-y-4">{children}</div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
	<h3 className="text-xl font-bold text-gray-900 dark:text-white">
		{children}
	</h3>
)

const BenefitCard = ({
	benefit,
}: {
	benefit: { id?: string; title: string; description: string; icon: string }
}) => (
	<div className="flex gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
		<span className="text-3xl">{benefit.icon}</span>
		<div>
			<h4 className="font-semibold text-gray-900 dark:text-white">
				{benefit.title}
			</h4>
			<p className="text-sm text-gray-600 dark:text-gray-400">
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
}) => (
	<div
		className="rounded-lg border-2 p-4"
		style={{ borderColor: `${accentColor}30` }}
	>
		<div className="mb-2 flex items-center justify-between">
			<h4 className="font-semibold text-gray-900 dark:text-white">
				{deliverable.name}
			</h4>
			<span
				className="rounded-full px-3 py-1 text-xs font-medium text-white"
				style={{ backgroundColor: accentColor }}
			>
				{deliverable.type}
			</span>
		</div>
		<p className="text-sm text-gray-600 dark:text-gray-400">
			{deliverable.description}
		</p>
	</div>
)

const ModalFooter = ({
	ctaText,
	ctaLink,
	accentColor,
}: {
	ctaText: string
	ctaLink: string
	accentColor: string
}) => (
	<motion.div
		className="border-t border-gray-200 p-6 dark:border-gray-700"
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ delay: 0.2 }}
	>
		<a
			href={ctaLink}
			className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
			style={{
				backgroundColor: accentColor,
				boxShadow: `0 4px 12px ${accentColor}40`,
			}}
		>
			{ctaText}
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
					d="M17 8l4 4m0 0l-4 4m4-4H3"
				/>
			</svg>
		</a>
	</motion.div>
)
