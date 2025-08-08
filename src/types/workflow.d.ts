// Centralized types for the workflow system
// Merged from workflow-constants.ts and various components

export interface StepConfig {
	icon: string
	color: string
}

export interface WorkflowPosition {
	x: number
	y: number
	cardX: number
	cardY: number
	lineEndX: number
	lineEndY: number
}

export interface GradientStop {
	offset: string
	color: string
	opacity: string
}

export interface Step {
	key: string
	title: string
	number: string
	icon: string
}

export interface DetailedStep {
	id: string
	title: string
	number: string
	description: string
	details: readonly string[]
	deliverables: string
	duration: string
	icon: string
}

// Types pour les composants de modal
export interface StepModalProps {
	isOpen: boolean
	onClose: () => void
	step: {
		icon: string
		title: string
	}
	detailedStep: {
		title: string
		number: string
		description: string
		details: readonly string[]
		deliverables: string
		duration: string
	}
	stepIndex: number
	color: string
}

// Types pour les composants interactifs
export interface WorkflowJourneyInteractiveProps {
	steps: Step[]
	detailedSteps: DetailedStep[]
	colors: readonly string[]
}

// Types pour les utilitaires de style
export interface GlassmorphicStyle {
	background: string
	backdropFilter: string
	WebkitBackdropFilter: string
	boxShadow?: string
}

export interface ModalOverlayStyle {
	background: string
}

// Types pour les hooks
export interface UseWorkflowModalReturn {
	openModalIndex: number | null
	openModal: (index: number) => void
	closeModal: () => void
}

export interface UseWorkflowInteractionReturn {
	initializeCardListeners: () => void
	cleanup: () => void
}
