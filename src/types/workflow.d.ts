// Centralized types for the workflow system
// Single source of truth for all workflow-related types

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

// Unified Step interface (formerly DetailedStep)
export interface Step {
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
	step: Step
	stepIndex: number
	color: string
}

// Types pour les composants interactifs
export interface WorkflowJourneyInteractiveProps {
	steps: Step[]
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
