import { useKeyboardShortcuts } from './useKeyboardShortcuts'
import { useModalState } from './useModalState'

import type { UseWorkflowModalReturn } from '@/types/workflow'

/**
 * Hook composite pour la gestion des modales workflow
 * Combine la gestion d'état et les raccourcis clavier
 */
export function useWorkflowModal(): UseWorkflowModalReturn {
	const { openModalIndex, openModal, closeModal } = useModalState()

	// Gestion des raccourcis clavier
	useKeyboardShortcuts({
		onEscape: closeModal,
		enabled: openModalIndex !== null,
	})

	return {
		openModalIndex,
		openModal,
		closeModal,
	}
}
