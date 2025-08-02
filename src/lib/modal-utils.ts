/**
 * Utilitaires pour la gestion des modales
 */

/**
 * Gère l'état d'ouverture/fermeture des modales
 */
export class ModalManager {
	private openModals = new Set<string>()

	/**
	 * Ouvre une modale
	 * @param id - Identifiant unique de la modale
	 */
	open(id: string): void {
		this.openModals.add(id)
		this.updateBodyScroll()
	}

	/**
	 * Ferme une modale
	 * @param id - Identifiant unique de la modale
	 */
	close(id: string): void {
		this.openModals.delete(id)
		this.updateBodyScroll()
	}

	/**
	 * Ferme toutes les modales
	 */
	closeAll(): void {
		this.openModals.clear()
		this.updateBodyScroll()
	}

	/**
	 * Vérifie si une modale est ouverte
	 * @param id - Identifiant de la modale
	 */
	isOpen(id: string): boolean {
		return this.openModals.has(id)
	}

	/**
	 * Vérifie si au moins une modale est ouverte
	 */
	hasOpenModals(): boolean {
		return this.openModals.size > 0
	}

	/**
	 * Met à jour le scroll du body selon l'état des modales
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
 * Instance globale du gestionnaire de modales
 */
export const modalManager = new ModalManager()

/**
 * Utilitaires pour les interactions DOM
 */
export const domUtils = {
	/**
	 * Attend que le DOM soit prêt
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
	 * Ajoute des event listeners sur des éléments
	 * @param selector - Sélecteur CSS
	 * @param event - Type d'événement
	 * @param handler - Gestionnaire d'événement
	 * @returns Fonction de nettoyage
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

		// Fonction de nettoyage
		return () => {
			listeners.forEach(({ element, handler }) => {
				element.removeEventListener(event, handler)
			})
		}
	},

	/**
	 * Crée un événement personnalisé
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
 * Configuration par défaut pour les modales
 */
export const DEFAULT_MODAL_CONFIG = {
	maxHeight: '85vh',
	maxWidth: '1200px',
	width: '90vw',
	borderRadius: '24px',
	animationDuration: 300,
} as const

/**
 * Classes CSS utilitaires pour les modales
 */
export const MODAL_CLASSES = {
	overlay: 'fixed inset-0 z-50 bg-black/10',
	container: 'relative z-50',
	content: 'overflow-y-auto border-0 p-0',
	closeButton: 'absolute right-4 top-4 z-10',
} as const
