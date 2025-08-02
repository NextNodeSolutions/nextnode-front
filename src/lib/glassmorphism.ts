import type { GlassmorphicStyle, ModalOverlayStyle } from '@/types/workflow'

/**
 * Génère les styles glassmorphiques de base
 * @param opacity - Opacité du background (par défaut 0.05)
 * @param blur - Intensité du blur (par défaut 20px)
 * @returns Style glassmorphique
 */
export function createGlassmorphicStyle(
	opacity = 0.05,
	blur = 20,
): GlassmorphicStyle {
	return {
		background: `rgba(255,255,255,${opacity})`,
		backdropFilter: `blur(${blur}px)`,
		WebkitBackdropFilter: `blur(${blur}px)`,
		boxShadow:
			'0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.2)',
	}
}

/**
 * Génère l'overlay coloré avec gradient
 * @param color - Couleur principale (format hex ou rgb)
 * @param opacity - Opacité de la couleur (par défaut 40 pour 40%)
 * @returns Style d'overlay coloré
 */
export function createColoredOverlay(
	color: string,
	opacity = 40,
): ModalOverlayStyle {
	return {
		background: `linear-gradient(135deg, rgba(255,255,255,0.3) 0%, ${color}${opacity} 100%)`,
	}
}

/**
 * Génère l'overlay blanc pour la lisibilité
 * @param opacity - Opacité de l'overlay blanc (par défaut 0.75)
 * @returns Style d'overlay blanc
 */
export function createReadabilityOverlay(opacity = 0.75): ModalOverlayStyle {
	return {
		background: `rgba(255,255,255,${opacity})`,
	}
}

/**
 * Configuration complète de glassmorphisme pour les modales
 * @param color - Couleur principale
 * @param options - Options de configuration
 * @returns Objet avec tous les styles nécessaires
 */
export function createModalGlassmorphism(
	color: string,
	options: {
		baseOpacity?: number
		blur?: number
		colorOpacity?: number
		readabilityOpacity?: number
	} = {},
): {
	container: GlassmorphicStyle
	coloredOverlay: ModalOverlayStyle
	readabilityOverlay: ModalOverlayStyle
} {
	const {
		baseOpacity = 0.05,
		blur = 20,
		colorOpacity = 40,
		readabilityOpacity = 0.75,
	} = options

	return {
		container: createGlassmorphicStyle(baseOpacity, blur),
		coloredOverlay: createColoredOverlay(color, colorOpacity),
		readabilityOverlay: createReadabilityOverlay(readabilityOpacity),
	}
}

/**
 * Classes Tailwind pour glassmorphisme standard
 */
export const GLASSMORPHIC_CLASSES = {
	container:
		'backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 ring-1 ring-white/20',
	light: 'backdrop-blur-sm bg-white/50 ring-1 ring-white/30',
	strong: 'backdrop-blur-md bg-white/20 ring-1 ring-white/10',
	rounded: 'rounded-xl',
	shadow: 'shadow-lg',
} as const
