import React, { useState, useEffect } from 'react'

import StepModal from './StepModal'

interface Step {
	icon: string
	title: string
}

interface DetailedStep {
	title: string
	description: string
	details: string[]
	deliverables: string
	duration: string
}

interface WorkflowJourneyInteractiveProps {
	steps: Step[]
	detailedSteps: DetailedStep[]
	colors: string[]
}

export default function WorkflowJourneyInteractive({
	steps,
	detailedSteps,
	colors,
}: WorkflowJourneyInteractiveProps): React.ReactElement {
	const [openModalIndex, setOpenModalIndex] = useState<number | null>(null)

	const handleCloseModal = (): void => {
		setOpenModalIndex(null)
	}

	useEffect(() => {
		const handleOpenModal = (event: CustomEvent): void => {
			setOpenModalIndex(event.detail.index)
		}

		const initCardListeners = (): void => {
			const interactiveCards =
				document.querySelectorAll('.interactive-card')

			interactiveCards.forEach((card, index) => {
				card.addEventListener('click', (): void => {
					setOpenModalIndex(index)
				})
			})
		}

		// Attendre que le DOM soit prêt
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', initCardListeners)
		} else {
			initCardListeners()
		}

		window.addEventListener(
			'openStepModal',
			handleOpenModal as EventListener,
		)

		return (): void => {
			window.removeEventListener(
				'openStepModal',
				handleOpenModal as EventListener,
			)
		}
	}, [])

	return (
		<>
			{/* Modales */}
			{steps.map((step, index) => (
				<StepModal
					key={index}
					isOpen={openModalIndex === index}
					onClose={handleCloseModal}
					step={step}
					detailedStep={detailedSteps[index]}
					stepIndex={index}
					color={colors[index]}
				/>
			))}
		</>
	)
}
