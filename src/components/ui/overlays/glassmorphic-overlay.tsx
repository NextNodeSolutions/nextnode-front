import type React from 'react'

import { cn } from '@/lib/core/utils'
import {
	createColoredOverlay,
	createReadabilityOverlay,
} from '@/lib/ui/glassmorphism'

interface GlassmorphicOverlayProps {
	color: string
	colorOpacity?: number
	readabilityOpacity?: number
	className?: string
	children?: React.ReactNode
}

/**
 * Composant réutilisable pour les overlays glassmorphiques
 * Crée les deux couches d'overlay nécessaires pour l'effet glassmorphisme
 */
export default function GlassmorphicOverlay({
	color,
	colorOpacity = 40,
	readabilityOpacity = 0.75,
	className = '',
	children,
}: GlassmorphicOverlayProps): React.ReactElement {
	const coloredOverlayStyle = createColoredOverlay(color, colorOpacity)
	const readabilityOverlayStyle = createReadabilityOverlay(readabilityOpacity)

	return (
		<div className={cn('relative', className)}>
			{/* Overlay coloré pour l'effet */}
			<div
				className="pointer-events-none absolute inset-0 -z-50 rounded-3xl"
				style={coloredOverlayStyle}
				aria-hidden="true"
			/>

			{/* Overlay blanc pour la lisibilité */}
			<div
				className="pointer-events-none absolute inset-0 -z-40 rounded-3xl"
				style={readabilityOverlayStyle}
				aria-hidden="true"
			/>

			{/* Contenu */}
			{children && <div className="relative">{children}</div>}
		</div>
	)
}
