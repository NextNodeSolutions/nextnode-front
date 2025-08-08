/**
 * Utilities for modal management
 */

/**
 * Manages modal open/close state
 */
export class ModalManager {
	private openModals = new Set<string>()

	/**
	 * Opens a modal
	 * @param id - Identifiant unique de la modale
	 */
	open(id: string): void {
		this.openModals.add(id)
		this.updateBodyScroll()
	}

	/**
	 * Closes a modal
	 * @param id - Identifiant unique de la modale
	 */
	close(id: string): void {
		this.openModals.delete(id)
		this.updateBodyScroll()
	}

	/**
	 * Closes all modals
	 */
	closeAll(): void {
		this.openModals.clear()
		this.updateBodyScroll()
	}

	/**
	 * Checks if a modal is open
	 * @param id - Identifiant de la modale
	 */
	isOpen(id: string): boolean {
		return this.openModals.has(id)
	}

	/**
	 * Checks if at least one modal is open
	 */
	hasOpenModals(): boolean {
		return this.openModals.size > 0
	}

	/**
	 * Updates body scroll based on modal state
	 */
	private updateBodyScroll(): void {
		if (typeof document !== 'undefined') {
			if (this.hasOpenModals()) {
				document.body.style.overflow = 'hidden'
			} else {
				document.body.style.overflow = ''
			}
		}
	}
}

/**
 * Global instance of modal manager
 */
export const modalManager = new ModalManager()

/**
 * Utilities for DOM interactions
 */
export const domUtils = {
	/**
	 * Wait for DOM to be ready
	 * @param callback - Fonction à exécuter quand le DOM est prêt
	 */
	onDOMReady(callback: () => void): void {
		if (typeof document === 'undefined') return

		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', callback)
		} else {
			callback()
		}
	},

	/**
	 * Add event listeners to elements
	 * @param selector - Sélecteur CSS
	 * @param event - Type d'événement
	 * @param handler - Gestionnaire d'événement
	 * @returns Cleanup function
	 */
	addEventListeners(
		selector: string,
		event: string,
		handler: (element: Element, index: number) => void,
	): () => void {
		if (typeof document === 'undefined') return () => {}

		const elements = document.querySelectorAll(selector)
		const listeners: Array<{ element: Element; handler: EventListener }> =
			[]

		elements.forEach((element, index) => {
			const eventHandler = (): void => handler(element, index)
			element.addEventListener(event, eventHandler)
			listeners.push({ element, handler: eventHandler })
		})

		// Cleanup function
		return () => {
			listeners.forEach(({ element, handler }) => {
				element.removeEventListener(event, handler)
			})
		}
	},

	/**
	 * Create a custom event
	 * @param name - Nom de l'événement
	 * @param detail - Données à passer avec l'événement
	 */
	dispatchCustomEvent(name: string, detail?: unknown): void {
		if (typeof window === 'undefined') return

		const event = new CustomEvent(name, { detail })
		window.dispatchEvent(event)
	},
}

/**
 * Default configuration for modals
 */
export const DEFAULT_MODAL_CONFIG = {
	maxHeight: '85vh',
	maxWidth: '1200px',
	width: '90vw',
	borderRadius: '24px',
	animationDuration: 300,
} as const

/**
 * Utility CSS classes for modals
 */
export const MODAL_CLASSES = {
	overlay: 'fixed inset-0 z-50 bg-black/10',
	container: 'relative z-50',
	content: 'overflow-y-auto border-0 p-0',
	closeButton: 'absolute right-4 top-4 z-10',
} as const
