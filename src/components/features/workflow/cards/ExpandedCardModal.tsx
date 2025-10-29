import React from 'react'

import { AnimatePresence, motion } from 'motion/react'

import { cn } from '@/lib/core/utils'
import { useI18n } from '@/lib/i18n/I18nReact'

import { ModalBenefitsGrid } from '../expanded/ModalBenefitsGrid'
import { ModalDeliverablesList } from '../expanded/ModalDeliverablesList'
// Import extracted components
import { ModalHeroSection } from '../expanded/ModalHeroSection'
import { ModalOverviewPanel } from '../expanded/ModalOverviewPanel'
import { ModalVisualTimeline } from '../expanded/ModalVisualTimeline'
import { getStepIllustration } from '../illustrations'
import { MODAL_TRANSITIONS, STAGGER_CONFIG } from '../workflow-animation-config'

import type { ExpandedCardModalProps } from '@/types/workflow'

/**
 * ExpandedCardModal - Enhanced glassmorphic modal
 *
 * Redesigned with:
 * - Multi-layer glassmorphism
 * - Extracted component architecture
 * - Staggered content animations
 * - Enhanced visual hierarchy
 * - Better accessibility
 */
export const ExpandedCardModal = ({
	isOpen,
	onClose,
	stepData,
	stepKey,
}: ExpandedCardModalProps) => {
	const { t } = useI18n()
	const { accentColor, deliverables, timeline } = stepData

	// Close on Escape key + body scroll lock
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
		<AnimatePresence mode="wait">
			{isOpen && (
				<>
					{/* Simple Backdrop - Clean and Dark */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={MODAL_TRANSITIONS.backdropFade}
						className="fixed inset-0 z-50 bg-black/60"
						onClick={onClose}
						aria-hidden="true"
					/>

					{/* Modal Container - Minimal & Clean */}
					<motion.div
						initial={{ opacity: 0, scale: 0.98, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.98, y: 20 }}
						transition={MODAL_TRANSITIONS.modalSpring}
						className={cn(
							// Base: positioning
							'fixed top-1/2 left-1/2 z-50',
							'-translate-x-1/2 -translate-y-1/2',

							// Sizing - wider for generous spacing
							'w-[95vw] max-w-6xl',
							'max-h-[90vh]',

							// Simple clean background
							'rounded-2xl',
							'bg-white dark:bg-gray-950',

							// Subtle border
							'border border-gray-200 dark:border-gray-800',

							// Clean shadow
							'shadow-2xl',

							// Overflow
							'overflow-hidden',
						)}
						onClick={e => e.stopPropagation()}
						role="dialog"
						aria-modal="true"
						aria-labelledby="modal-title"
					>
						{/* Scrollable Content */}
						<div className="max-h-[90vh] overflow-y-auto">
							{/* Hero Section */}
							<ModalHeroSection
								title={stepData.title}
								description={stepData.shortDescription}
								accentColor={accentColor}
								Illustration={Illustration}
								onClose={onClose}
								closeLabel={t('workflow.modal.closeModal')}
							/>

							{/* Body Content - Compact Spacing */}
							<motion.div
								initial="hidden"
								animate="visible"
								variants={{
									visible: {
										transition: STAGGER_CONFIG.container,
									},
								}}
								className={cn(
									// Base: compact spacing between sections
									'space-y-8',
									'sm:space-y-10',
									'md:space-y-12',

									// Responsive padding - balanced
									'px-6 py-8',
									'sm:px-8 sm:py-10',
									'md:px-12 md:py-12',
									'lg:px-16 lg:py-14',

									// Max width for readability
									'mx-auto max-w-5xl',
								)}
							>
								{/* Overview Section */}
								<ModalOverviewPanel
									title={t('workflow.modal.overview')}
									description={stepData.fullDescription}
									accentColor={accentColor}
								/>

								{/* Benefits Grid */}
								{stepData.benefits.length > 0 && (
									<ModalBenefitsGrid
										title={t('workflow.modal.keyBenefits')}
										benefits={stepData.benefits}
										accentColor={accentColor}
									/>
								)}

								{/* Deliverables List */}
								{deliverables.length > 0 && (
									<ModalDeliverablesList
										title={t('workflow.modal.whatYouGet')}
										deliverables={deliverables}
										accentColor={accentColor}
									/>
								)}

								{/* Visual Timeline */}
								<ModalVisualTimeline
									title={t('workflow.modal.timeline')}
									durationLabel={t('workflow.modal.duration')}
									duration={timeline.duration}
									milestones={timeline.milestones}
									accentColor={accentColor}
								/>
							</motion.div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}
