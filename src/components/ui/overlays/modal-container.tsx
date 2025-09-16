import type React from 'react'
import type { CSSProperties } from 'react'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from '@/components/ui/overlays/dialog'
import { cn } from '@/lib/core/utils'
import { createModalGlassmorphism } from '@/lib/ui/glassmorphism'
import { DEFAULT_MODAL_CONFIG } from '@/lib/ui/modal-utils'

import GlassmorphicOverlay from './glassmorphic-overlay'

// Type for CSS properties with custom variables
type ModalCSSProperties = CSSProperties & {
	'--modal-width': string
	'--modal-max-width': string
}

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
				className={cn(
					'max-h-[85vh] overflow-y-auto border-0 p-0',
					className,
				)}
				style={
					{
						...glassmorphism.container,
						'--modal-width': width,
						'--modal-max-width': maxWidth,
					} as ModalCSSProperties
				}
				data-modal-size="custom"
			>
				<DialogTitle className="sr-only">
					{title || 'Modal Dialog'}
				</DialogTitle>
				<DialogDescription className="sr-only">
					Modal content
				</DialogDescription>

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
