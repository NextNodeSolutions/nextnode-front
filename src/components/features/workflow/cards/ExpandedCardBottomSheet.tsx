import React from 'react'

import * as Accordion from '@radix-ui/react-accordion'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { cn } from '@/lib/core/utils'
import { useI18n } from '@/lib/i18n/I18nReact'

import { StepIllustration } from '../illustrations'
import { BOTTOM_SHEET_CONFIG } from '../workflow-animation-config'
import { AccordionBenefitItem } from './parts/AccordionBenefitItem'
import { AccordionDeliverableItem } from './parts/AccordionDeliverableItem'
import { DragHandle } from './parts/DragHandle'
import { MobileAccordionSection } from './parts/MobileAccordionSection'

import type { ExpandedCardModalProps } from '@/types/workflow'

/**
 * ExpandedCardBottomSheet - Mobile-optimized bottom sheet for workflow steps
 *
 * Features:
 * - Slides up from bottom (timeline visible behind)
 * - Drag handle with haptic feedback
 * - Swipe-down-to-close gesture (>100px offset or >500px/s velocity)
 * - Radix UI accordion for progressive disclosure
 * - Single-open accordion sections (Benefits, Deliverables, Timeline)
 * - 48px touch targets (WCAG AAA)
 * - Keyboard navigation (Escape to close)
 * - Focus trap and body scroll lock
 */
export const ExpandedCardBottomSheet = ({
	isOpen,
	onClose,
	stepData,
	stepKey,
}: ExpandedCardModalProps) => {
	const { t } = useI18n()
	const { accentColor, deliverables, benefits } = stepData

	// Generate unique ID for ARIA
	const titleId = React.useId()

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

	// Handle drag end - close if threshold exceeded
	const handleDragEnd = (
		_event: MouseEvent | TouchEvent | PointerEvent,
		info: { offset: { y: number }; velocity: { y: number } },
	) => {
		const { offset, velocity } = info
		const { dismissThreshold } = BOTTOM_SHEET_CONFIG

		// Close if dragged down beyond threshold or flicked down quickly
		if (
			offset.y > dismissThreshold.offset ||
			velocity.y > dismissThreshold.velocity
		) {
			// Haptic feedback on dismiss
			if ('vibrate' in navigator) {
				navigator.vibrate([10, 50, 10])
			}
			onClose()
		}
	}

	if (!isOpen) return null

	return (
		<AnimatePresence mode="wait">
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={BOTTOM_SHEET_CONFIG.backdropFade}
						className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
						onClick={onClose}
						aria-hidden="true"
					/>

					{/* Bottom Sheet Container */}
					<motion.div
						initial={{ y: '100%' }}
						animate={{ y: 0 }}
						exit={{ y: '100%' }}
						transition={BOTTOM_SHEET_CONFIG.spring}
						{...BOTTOM_SHEET_CONFIG.drag}
						onDragEnd={handleDragEnd}
						className={cn(
							'fixed right-0 bottom-0 left-0 z-50',
							'max-h-[85vh]',
							'overflow-hidden',
							'rounded-t-2xl',
							'border-t border-r border-l border-gray-200 dark:border-gray-800',
							'bg-white dark:bg-gray-950',
							'shadow-2xl',
						)}
						onClick={e => e.stopPropagation()}
						role="dialog"
						aria-modal="true"
						aria-labelledby={titleId}
					>
						{/* Drag Handle */}
						<DragHandle className="py-2" />

						{/* Scrollable Content */}
						<div
							className={cn(
								'max-h-[calc(85vh-24px)] overflow-y-auto',
								'pb-[env(safe-area-inset-bottom)]',
							)}
						>
							{/* Hero Section (Sticky) */}
							<div
								className={cn(
									'sticky top-0 z-10',
									'space-y-3',
									'px-4 py-3',
									'bg-white dark:bg-gray-950',
									'border-b border-gray-200 dark:border-gray-800',
								)}
							>
								{/* Row 1: Icon + Title + Close Button */}
								<div className="flex items-center justify-between">
									{/* Illustration Icon */}
									<div
										className={cn(
											'flex h-10 w-10 shrink-0 items-center justify-center',
											'rounded-lg',
											'bg-white dark:bg-gray-800',
											'shadow-sm',
										)}
										style={{
											borderColor: accentColor,
											borderWidth: '2px',
										}}
									>
										<StepIllustration
											stepKey={stepKey}
											color={accentColor}
										/>
									</div>

									{/* Title */}
									<h2
										id={titleId}
										className={cn(
											'text-center text-base font-extrabold',
											'text-gray-900 dark:text-white',
											'truncate',
										)}
									>
										{stepData.title}
									</h2>

									{/* Close Button (48x48px touch target) */}
									<button
										type="button"
										onClick={onClose}
										className={cn(
											'flex h-12 w-12 shrink-0 items-center justify-center',
											'rounded-lg',
											'transition-colors',
											'hover:bg-gray-100 dark:hover:bg-gray-800',
											'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
										)}
										style={
											{
												'--tw-ring-color': accentColor,
											} as React.CSSProperties
										}
										aria-label={t(
											'workflow.modal.closeModal',
										)}
									>
										<X
											className="h-5 w-5 text-gray-500 dark:text-gray-400"
											strokeWidth={2}
										/>
									</button>
								</div>

								{/* Row 2: Short Description */}
								<p
									className={cn(
										'text-sm',
										'text-gray-600 dark:text-gray-400',
									)}
								>
									{stepData.shortDescription}
								</p>

								{/* Row 3: Full Description (parsed bullets) */}
								{(() => {
									const descParts = stepData.fullDescription
										.split('•')
										.map(s => s.trim())
										.filter(Boolean)

									return descParts.length > 1 ? (
										<ul className="space-y-1.5 pl-4">
											{descParts.map((part, i) => (
												<li
													key={`desc-${part.slice(0, 20)}-${i}`}
													className={cn(
														'text-sm leading-relaxed',
														'text-gray-700 dark:text-gray-300',
														'list-disc',
													)}
												>
													{part}
												</li>
											))}
										</ul>
									) : (
										<p
											className={cn(
												'text-sm leading-relaxed',
												'text-gray-700 dark:text-gray-300',
											)}
										>
											{stepData.fullDescription}
										</p>
									)
								})()}
							</div>

							{/* Accordion Sections */}
							<Accordion.Root
								type="single"
								collapsible
								className="border-b border-gray-200 dark:border-gray-800"
							>
								{/* Benefits Section */}
								{benefits.length > 0 && (
									<MobileAccordionSection
										title={t('workflow.modal.keyBenefits')}
										value="benefits"
										count={benefits.length}
										accentColor={accentColor}
									>
										<div className="space-y-2">
											{benefits.map((benefit, index) => (
												<AccordionBenefitItem
													key={
														benefit.id ||
														`benefit-${benefit.title}-${index}`
													}
													title={benefit.title}
													description={
														benefit.description
													}
													icon={benefit.icon}
													accentColor={accentColor}
													index={index}
												/>
											))}
										</div>
									</MobileAccordionSection>
								)}

								{/* Deliverables Section */}
								{deliverables.length > 0 && (
									<MobileAccordionSection
										title={t('workflow.modal.whatYouGet')}
										value="deliverables"
										count={deliverables.length}
										accentColor={accentColor}
									>
										<div className="space-y-2">
											{deliverables.map(
												(deliverable, index) => (
													<AccordionDeliverableItem
														key={`deliverable-${deliverable.name}-${index}`}
														name={deliverable.name}
														description={
															deliverable.description
														}
														type={deliverable.type}
														accentColor={
															accentColor
														}
														index={index}
													/>
												),
											)}
										</div>
									</MobileAccordionSection>
								)}
							</Accordion.Root>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}
