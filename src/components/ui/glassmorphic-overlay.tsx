import React from 'react'

import {
	createColoredOverlay,
	createReadabilityOverlay,
} from '@/lib/glassmorphism'

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
		<div className={`relative ${className}`}>
			{/* Overlay coloré pour l'effet */}
			<div
				className="absolute inset-0 rounded-3xl"
				style={coloredOverlayStyle}
				aria-hidden="true"
			/>

			{/* Overlay blanc pour la lisibilité */}
			<div
				className="absolute inset-0 rounded-3xl"
				style={readabilityOverlayStyle}
				aria-hidden="true"
			/>

			{/* Contenu */}
			{children && <div className="relative z-10">{children}</div>}
		</div>
	)
}
