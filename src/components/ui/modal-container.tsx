import React from 'react'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { createModalGlassmorphism } from '@/lib/glassmorphism'
import { DEFAULT_MODAL_CONFIG } from '@/lib/modal-utils'

import GlassmorphicOverlay from './glassmorphic-overlay'

interface ModalContainerProps {
	isOpen: boolean
	onClose: () => void
	color: string
	children: React.ReactNode
	title?: string
	maxWidth?: string
	width?: string
	className?: string
	glassmorphismOptions?: {
		baseOpacity?: number
		blur?: number
		colorOpacity?: number
		readabilityOpacity?: number
	}
}

/**
 * Container modal réutilisable avec glassmorphisme intégré
 * Gère la structure de base et les styles communs
 */
export default function ModalContainer({
	isOpen,
	onClose,
	color,
	children,
	title,
	maxWidth = DEFAULT_MODAL_CONFIG.maxWidth,
	width = DEFAULT_MODAL_CONFIG.width,
	className = '',
	glassmorphismOptions = {},
}: ModalContainerProps): React.ReactElement {
	const glassmorphism = createModalGlassmorphism(color, glassmorphismOptions)

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent
				className={`max-h-[85vh] overflow-y-auto border-0 p-0 ${className}`}
				style={{
					...glassmorphism.container,
					width,
					maxWidth,
				}}
			>
				{/* Titre requis pour l'accessibilité - caché visuellement si non fourni */}
				<DialogTitle className="sr-only">
					{title || 'Modal Dialog'}
				</DialogTitle>

				<GlassmorphicOverlay
					color={color}
					colorOpacity={glassmorphismOptions.colorOpacity}
					readabilityOpacity={glassmorphismOptions.readabilityOpacity}
				>
					{children}
				</GlassmorphicOverlay>
			</DialogContent>
		</Dialog>
	)
}
