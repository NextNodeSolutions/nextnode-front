import React, { useEffect } from 'react'

import { useWorkflowModal, useWorkflowInteraction } from '@/hooks'

import StepModal from './StepModal'

import type { WorkflowJourneyInteractiveProps } from '@/types/workflow'

export default function WorkflowJourneyInteractive({
	steps,
	detailedSteps,
	colors,
}: WorkflowJourneyInteractiveProps): React.ReactElement {
	const { openModalIndex, openModal, closeModal } = useWorkflowModal()
	const { initializeCardListeners, cleanup } =
		useWorkflowInteraction(openModal)

	useEffect(() => {
		// Initialise les event listeners après que le DOM soit prêt
		const timer = setTimeout(() => {
			initializeCardListeners()
		}, 100)

		// Nettoie à la fois le timer et les listeners
		return (): void => {
			clearTimeout(timer)
			cleanup()
		}
	}, [])

	return (
		<>
			{/* Modales */}
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
