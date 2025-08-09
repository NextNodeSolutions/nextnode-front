import { useEffect } from 'react'

import { useWorkflowModal, useCardEventListeners } from '@/hooks'

import StepModal from './StepModal'

import type { WorkflowJourneyInteractiveProps } from '@/types/workflow'

export default function WorkflowJourneyInteractive({
	steps,
	detailedSteps,
	colors,
}: WorkflowJourneyInteractiveProps): React.ReactElement {
	const { openModalIndex, openModal, closeModal } = useWorkflowModal()
	const { initializeListeners, cleanup } = useCardEventListeners(
		'[data-step-card]',
		openModal,
	)

	useEffect(() => {
		// Wait for DOM to be fully rendered before attaching listeners
		const initializeWhenReady = (): (() => void) | undefined => {
			// Check if target elements exist in DOM
			const cards = document.querySelectorAll('[data-step-card]')
			if (cards.length > 0) {
				initializeListeners()
				return undefined
			} else {
				// If not ready, use MutationObserver to watch for changes
				const observer = new MutationObserver(() => {
					const cards = document.querySelectorAll('[data-step-card]')
					if (cards.length > 0) {
						initializeListeners()
						observer.disconnect()
					}
				})

				observer.observe(document.body, {
					childList: true,
					subtree: true,
				})

				// Fallback timeout if DOM never updates
				const fallbackTimer = setTimeout(() => {
					observer.disconnect()
					initializeListeners()
				}, 2000)

				return (): void => {
					observer.disconnect()
					clearTimeout(fallbackTimer)
				}
			}
		}

		// Initialize immediately if DOM is ready, otherwise use requestAnimationFrame
		if (document.readyState === 'complete') {
			initializeWhenReady()
		} else {
			requestAnimationFrame(initializeWhenReady)
		}

		return cleanup
	}, [])

	return (
		<>
			{/* Modals */}
			{steps.map((step, index) => {
				const detailedStep = detailedSteps[index]
				const color = colors[index]

				if (!detailedStep || !color) {
					return null
				}

				return (
					<StepModal
						key={index}
						isOpen={openModalIndex === index}
						onClose={closeModal}
						step={step}
						detailedStep={detailedStep}
						stepIndex={index}
						color={color}
					/>
				)
			})}
		</>
	)
}
